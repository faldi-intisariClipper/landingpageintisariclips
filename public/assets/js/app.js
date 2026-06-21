// ==========================================
// CLIENT-SIDE LOGIC UNTUK INTISARICLIPS V10
// ==========================================

const alertBox = document.getElementById('checkoutAlert');
const alertText = document.getElementById('checkoutAlertText');
const btnSubmit = document.getElementById('btnProcessCheckout');
const btnText = document.getElementById('btnProcessText');
const btnIcon = document.getElementById('btnProcessIcon');
const btnSpinner = document.getElementById('btnProcessSpinner');

function showAlert(message) {
    alertText.textContent = message;
    alertBox.classList.remove('hidden');
}

function hideAlert() {
    alertBox.classList.add('hidden');
}

function setLoadingState(isLoading) {
    if (isLoading) {
        btnText.textContent = 'Memproses...';
        btnIcon.classList.add('hidden');
        btnSpinner.classList.remove('hidden');
        btnSubmit.disabled = true;
        btnSubmit.classList.add('opacity-80', 'cursor-not-allowed');
    } else {
        btnText.textContent = 'BAYAR SEKARANG';
        btnIcon.classList.remove('hidden');
        btnSpinner.classList.add('hidden');
        btnSubmit.disabled = false;
        btnSubmit.classList.remove('opacity-80', 'cursor-not-allowed');
    }
}

async function processCheckout(event) {
    event.preventDefault();
    hideAlert();
    
    const name = document.getElementById('custName').value.trim();
    const email = document.getElementById('custEmail').value.trim();
    const phone = document.getElementById('custPhone').value.trim();
    
    // Basic Client-side Validation
    if (name.length < 3) {
        return showAlert('Nama lengkap minimal 3 karakter.');
    }
    
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
        return showAlert('Format email tidak valid.');
    }
    
    if (phone.length < 9) {
        return showAlert('Nomor WhatsApp minimal 9 digit.');
    }

    setLoadingState(true);

    try {
        const response = await fetch('/api/checkout', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ name, email, phone })
        });

        const data = await response.json();

        if (response.ok && data.status === 'success' && data.paymentUrl) {
            // Redirect to Duitku Payment Page
            window.location.href = data.paymentUrl;
        } else {
            showAlert(data.message || 'Terjadi kesalahan pada server pembayaran.');
            setLoadingState(false);
        }

    } catch (error) {
        showAlert('Gagal terhubung ke server. Periksa koneksi internet Anda.');
        setLoadingState(false);
        console.error('Checkout Error:', error);
    }
}