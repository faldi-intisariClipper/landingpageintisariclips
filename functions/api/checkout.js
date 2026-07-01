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
        const { name, email, phone, paymentMethod } = body;

        // Validasi input dari sisi server
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!name || name.trim().length < 3 || !email || !emailRegex.test(email) || !phone || phone.trim().length < 9) {
            return new Response(JSON.stringify({ 
                status: "error", 
                message: "Data pemesan tidak lengkap atau tidak valid." 
            }), { status: 400, headers: { 'Content-Type': 'application/json' } });
        }

        console.log(`[INFO] Memulai proses checkout untuk: ${email}`);

        // =================================================================
        // KREDENSIAL & ENVIRONMENT SWITICHING DUITKU (DYNAMIC & MULTI-MERCHANT)
        // =================================================================
        // Menentukan mode lingkungan (production vs sandbox) secara dinamis via env
        const envVal = (context.env.DUITKU_ENV || "sandbox").trim().toLowerCase();
        const isProduction = envVal === "production";
        
        let merchantCode = "";
        let apiKey = "";
        
        if (isProduction) {
            // 1. Kredensial khusus produk CLIPS
            const rawClipsCode = context.env.DUITKU_MERCHANT_CLIPS;
            const rawClipsKey = context.env.DUITKU_API_KEY_CLIPS;
            
            // 2. Fallback ke kredensial global default
            const rawGlobalCode = context.env.DUITKU_MERCHANT_CODE;
            const rawGlobalKey = context.env.DUITKU_API_KEY;
            
            if (rawClipsCode && rawClipsCode.trim() && rawClipsKey && rawClipsKey.trim()) {
                merchantCode = rawClipsCode.trim();
                apiKey = rawClipsKey.trim();
                console.log("[INFO] Menggunakan Kredensial Produksi Khusus CLIPS");
            } else if (rawGlobalCode && rawGlobalCode.trim() && rawGlobalKey && rawGlobalKey.trim()) {
                merchantCode = rawGlobalCode.trim();
                apiKey = rawGlobalKey.trim();
                console.log("[INFO] Menggunakan Kredensial Produksi Global Default");
            } else {
                // Fallback darurat jika diset production tetapi env vars kosong
                merchantCode = "DS32033";
                apiKey = "83afbae747ea45b155427183097d9492";
                console.warn("[WARNING] DUITKU_ENV=production tetapi tidak ada kredensial produksi yang dikonfigurasi. Fallback ke Sandbox.");
            }
        } else {
            // Mode Sandbox: Paksa kredensial sandbox resmi (DS32033)
            merchantCode = "DS32033";
            apiKey = "83afbae747ea45b155427183097d9492";
            console.log("[INFO] Menggunakan Kredensial Duitku Sandbox");
        }

        // Atur URL API berdasarkan environment
        const apiUrl = isProduction 
            ? "https://passport.duitku.com/webapi/api/merchant/v2/inquiry" 
            : "https://sandbox.duitku.com/webapi/api/merchant/v2/inquiry";

        // =================================================================
        // DATA TRANSAKSI & PAYLOAD
        // =================================================================
        const paymentAmount = 190000; // Harga produk (Rp 190.000) sesuai penawaran di landing page
        const productPrefix = (context.env.PRODUCT_PREFIX || "INV-CLIPS").trim();
        const merchantOrderId = `${productPrefix}-${Date.now()}`; // ID Order Unik dinamis dari env sesuai aturan emas SRS


        console.log(`[INFO] Membuat tagihan Duitku (Order ID: ${merchantOrderId}) di Env: ${isProduction ? 'Live' : 'Sandbox'}`);

        // 1. Buat Signature Duitku (Formula: merchantCode + merchantOrderId + paymentAmount + apiKey)
        const signatureString = merchantCode + merchantOrderId + paymentAmount + apiKey;
        const signature = await generateMD5(signatureString);

        // 2. Dapatkan URL Webhook secara dinamis
        const callbackUrl = (context.env.LICENSE_BACKEND_CALLBACK_URL || "https://api.intisariapps.com/v1/webhook/duitku").trim();

        // 3. Susun Payload (Body Request)
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
            customerDetail: {
                firstName: name,
                email: email,
                phoneNumber: phone
            },
            paymentMethod: paymentMethod || "M1", // Menggunakan metode pembayaran terpilih dengan fallback Mandiri VA (M1)
            // ⚠️ PENGALIHAN SETELAH SUKSES PEMBAYARAN: Arahkan ke Halaman Sukses Lokal
            returnUrl: `${new URL(context.request.url).origin}/success.html`, 
            // ⚠️ EXTERNAL CALLBACK URL (Webhooks ke Backend Terpusat)
            callbackUrl: callbackUrl,
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