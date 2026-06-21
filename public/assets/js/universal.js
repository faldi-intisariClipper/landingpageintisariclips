/**
 * ⚙️ VERSI : 1.0 (Universal Inti-Logic)
 * Fungsi-fungsi pembantu global untuk landing page.
 */

const IntiUtils = {
    // Fungsi untuk mengganti teks elemen secara periodik (Dynamic CTA)
    setupTextSwitcher: function(elementId, textArray, interval = 3000) {
        const el = document.getElementById(elementId);
        if (!el) return;

        let currentIndex = 0;
        setInterval(() => {
            el.style.opacity = '0';
            setTimeout(() => {
                currentIndex = (currentIndex + 1) % textArray.length;
                el.innerText = textArray[currentIndex];
                el.style.opacity = '1';
            }, 300); // Sinkron dengan durasi transisi CSS
        }, interval);
    }
};

// Inisialisasi Fitur
document.addEventListener('DOMContentLoaded', () => {
    // Jalankan switcher untuk tombol checkout
    IntiUtils.setupTextSwitcher('cta-main-text', [
        "YA! SAYA MAU AKSES SEKARANG",
        "⚠️ PROMO AKAN SEGERA BERAKHIR!",
        "DAPATKAN DISKON 50% HARI INI"
    ], 4000);
});