/* ======================================================================== */
/* 📁 FILE   : checkout.js (Lokasi: functions/api/checkout.js)              */
/* ⚙️ VERSI  = 2.2 (Duitku Sandbox Integration & Member Area Redirect)      */
/* ======================================================================== */

// Fungsi bantuan untuk membuat Signature MD5 (Native Cloudflare Crypto)
async function generateMD5(string) {
    const msgUint8 = new TextEncoder().encode(string);
    const hashBuffer = await crypto.subtle.digest('MD5', msgUint8);
    const hashArray = Array.from(new Uint8Array(hashBuffer));
    return hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
}

export async function onRequestPost(context) {
    try {
        const body = await context.request.json();
        const { name, email, phone } = body;

        // Validasi input dari sisi server
        if (!name || !email || !phone) {
            return new Response(JSON.stringify({ 
                status: "error", 
                message: "Data pemesan tidak lengkap." 
            }), { status: 400, headers: { 'Content-Type': 'application/json' } });
        }

        console.log(`[INFO] Memulai proses checkout untuk: ${email}`);

        // =================================================================
        // KREDENSIAL DUITKU (SANDBOX / PRODUCTION VIA ENV)
        // =================================================================
        // Menggunakan environment variables Cloudflare agar aman.
        // Membersihkan spasi terselubung menggunakan .trim() untuk mencegah 'Invalid API Key' akibat human-error copy-paste.
        // Jika Cloudflare Dashboard gagal membaca ENV, kita akan gunakan Fallback Kredensial Sandbox Sah (bukan string dummy).
        const merchantCode = (context.env.DUITKU_MERCHANT_CODE || "DS32033").trim(); 
        const apiKey = (context.env.DUITKU_API_KEY || "83afbae747ea45b155427183097d9492").trim(); 
        
        // Memaksa mode Sandbox secara default (untuk proses uji coba tim admin Duitku)
        // Ubah variabel env DUITKU_ENV menjadi 'production' ketika sudah lolos review.
        const envVal = (context.env.DUITKU_ENV || "sandbox").trim().toLowerCase();
        const isProduction = envVal === "production"; 
        
        // Atur URL API berdasarkan environment
        const apiUrl = isProduction 
            ? "https://passport.duitku.com/webapi/api/merchant/v2/inquiry" 
            : "https://sandbox.duitku.com/webapi/api/merchant/v2/inquiry";

        // =================================================================
        // DATA TRANSAKSI
        // =================================================================
        const paymentAmount = 190000; // Harga produk (Rp 190.000) sesuai penawaran di landing page
        const merchantOrderId = "INTISARI-" + Date.now(); // ID Order Unik

        console.log(`[INFO] Membuat tagihan Duitku (Order ID: ${merchantOrderId}) di Env: ${isProduction ? 'Live' : 'Sandbox'}`);

        // 1. Buat Signature Duitku (Formula: merchantCode + merchantOrderId + paymentAmount + apiKey)
        const signatureString = merchantCode + merchantOrderId + paymentAmount + apiKey;
        const signature = await generateMD5(signatureString);

        // 2. Susun Payload (Body Request)
        const payload = {
            merchantCode: merchantCode,
            paymentAmount: paymentAmount,
            merchantOrderId: merchantOrderId,
            productDetails: "Lisensi Lifetime IntisariClips V10 & Bonus VIP",
            email: email,
            phoneNumber: phone,
            customerVaName: name,
            itemDetails: [{
                name: "Lisensi Lifetime IntisariClips",
                price: paymentAmount,
                quantity: 1
            }],
            paymentMethod: "VC", // Menggunakan default VC (Credit Card) karena Duitku API Sandbox v2 mewajibkan parameter ini
            // ⚠️ PENGALIHAN SETELAH SUKSES PEMBAYARAN: Arahkan ke Halaman Sukses Lokal
            returnUrl: `${new URL(context.request.url).origin}/success.html`, 
            // ⚠️ EXTERNAL CALLBACK URL (Webhooks ke Backend Terpusat)
            callbackUrl: "https://api.intisariapps.com/v1/webhook/duitku",
            signature: signature,
            expiryPeriod: 60 // Waktu kadaluarsa (1 jam)
        };

        // 3. Tembak API Duitku
        const duitkuResponse = await fetch(apiUrl, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
            body: JSON.stringify(payload)
        });

        const rawText = await duitkuResponse.text();
        console.log(`[DEBUG] Raw Duitku Response: ${rawText}`);
        
        const duitkuData = JSON.parse(rawText);
        console.log(`[DEBUG] Duitku Response Code: ${duitkuData.statusCode}`);

        // 4. Evaluasi Respons Duitku
        if (duitkuData.statusCode === "00") {
            console.log(`[SUCCESS] URL Pembayaran didapatkan: ${duitkuData.paymentUrl}`);
            return new Response(JSON.stringify({ 
                status: "success", 
                paymentUrl: duitkuData.paymentUrl 
            }), {
                headers: { 'Content-Type': 'application/json' }
            });
        } else {
            console.error(`[ERROR] Duitku menolak request: ${duitkuData.statusMessage}`);
            return new Response(JSON.stringify({ 
                status: "error", 
                message: duitkuData.statusMessage || "Konfigurasi merchant/API key Duitku tidak valid."
            }), {
                status: 400,
                headers: { 'Content-Type': 'application/json' }
            });
        }

    } catch (error) {
        console.error(`[FATAL] Kesalahan internal server Cloudflare: ${error.message}`);
        return new Response(JSON.stringify({ 
            status: "error", 
            message: "Kesalahan internal pada server. Silakan coba beberapa saat lagi." 
        }), {
            status: 500,
            headers: { 'Content-Type': 'application/json' }
        });
    }
}