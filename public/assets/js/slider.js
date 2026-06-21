/**
 * ⚙️ VERSI : 2.0 (Dual-Track Infinite Seamless Slider + Pause on Hover)
 * INTISARI-CLIPS LANDING SYSTEM
 */

document.addEventListener('DOMContentLoaded', () => {
    // 1. Ambil kedua track yang baru saja kita buat di HTML
    const trackTop = document.querySelector('.testimonial-track-top');
    const trackBottom = document.querySelector('.testimonial-track-bottom');
    
    // 2. Buat elemen Style global untuk menampung keyframes
    const style = document.createElement('style');
    style.innerHTML = `
        @keyframes scrollTestimonialsLeft {
            0% { transform: translateX(0); }
            100% { transform: translateX(-50%); }
        }
        
        /* Fitur Pause saat container disentuh/di-hover */
        .slider-container-group:hover > div {
            animation-play-state: paused !important;
        }
    `;
    document.head.appendChild(style);

    // 3. Fungsi Universal untuk Setup Track
    function setupInfiniteSlider(trackElement, animationName, speedMultiplier = 4) {
        if (!trackElement) return;

        // Ambil elemen asli
        const originalItems = Array.from(trackElement.children);
        const itemCount = originalItems.length;
        
        // Clone elemen untuk efek seamless loop
        originalItems.forEach(item => {
            const clone = item.cloneNode(true);
            clone.setAttribute('aria-hidden', 'true'); // Aksesibilitas
            trackElement.appendChild(clone);
        });

        // Hitung durasi berdasarkan jumlah gambar asli agar stabil
        // (contoh: 5 gambar * 4 detik = 20 detik untuk 1 siklus)
        const duration = itemCount * speedMultiplier;
        
        // Aplikasikan animasi via inline CSS
        trackElement.style.animation = `${animationName} ${duration}s linear infinite`;
        
        console.log(`[SLIDER] Track Setup: ${itemCount} items x 2 (cloned), Duration: ${duration}s.`);
    }

    // 4. Inisialisasi Masing-masing Track
    // Track Atas (Kecepatan Normal: 4 detik per item)
    setupInfiniteSlider(trackTop, 'scrollTestimonialsLeft', 4);
    
    // Track Bawah (Sedikit lebih cepat: 3.5 detik per item untuk efek offset/paralaks)
    setupInfiniteSlider(trackBottom, 'scrollTestimonialsLeft', 3.5);

});