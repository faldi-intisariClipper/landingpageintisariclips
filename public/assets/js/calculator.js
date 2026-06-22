/**
 * ⚙️ INTERACTIVE EARNING CALCULATOR
 * INTISARI-CLIPS LANDING SYSTEM
 */

document.addEventListener('DOMContentLoaded', () => {
    // Ambil semua element input slider
    const clipSlider = document.getElementById('clipSlider');
    const viewsSlider = document.getElementById('viewsSlider');
    const rpmSlider = document.getElementById('rpmSlider');
    const monthSlider = document.getElementById('monthSlider');

    // Ambil element text value indicator
    const clipValue = document.getElementById('clipValue');
    const viewsValue = document.getElementById('viewsValue');
    const rpmValue = document.getElementById('rpmValue');
    const monthValue = document.getElementById('monthValue');

    // Ambil element output hasil
    const totalResult = document.getElementById('totalResult');

    // Fungsi format angka ke mata uang Indonesia (titik desimal ribuan)
    function formatRupiah(number) {
        return new Intl.NumberFormat('id-ID').format(number);
    }

    // Fungsi utama hitung earning
    function calculateEarning() {
        if (!clipSlider || !viewsSlider || !rpmSlider || !monthSlider || !totalResult) return;

        const clips = parseInt(clipSlider.value, 10);
        const views = parseInt(viewsSlider.value, 10);
        const rpm = parseInt(rpmSlider.value, 10);
        const months = parseInt(monthSlider.value, 10);

        // Rumus Earning: clips * views * (rpm / 1000) * months
        const total = clips * views * (rpm / 1000) * months;

        // Tampilkan hasil yang sudah diformat
        totalResult.textContent = formatRupiah(total);
    }

    // Fungsi update value teks indikator secara real-time
    function setupSliderEvent(slider, valueDisplay, isRupiah = false) {
        if (!slider || !valueDisplay) return;

        slider.addEventListener('input', () => {
            const val = parseInt(slider.value, 10);
            valueDisplay.textContent = isRupiah ? formatRupiah(val) : val;
            calculateEarning();
        });
    }

    // Inisialisasi event listener untuk masing-masing slider
    setupSliderEvent(clipSlider, clipValue, false);
    setupSliderEvent(viewsSlider, viewsValue, false);
    setupSliderEvent(rpmSlider, rpmValue, true);
    setupSliderEvent(monthSlider, monthValue, false);

    // Hitung pertama kali saat halaman dimuat
    calculateEarning();
});
