/**
 * ⚙️ PRICING CAROUSEL SLIDER
 * INTISARI-CLIPS LANDING SYSTEM
 */

document.addEventListener('DOMContentLoaded', () => {
    const carousel = document.querySelector('.pricing-carousel');
    const cards = document.querySelectorAll('.pricing-card');
    const prevBtn = document.querySelector('.carousel-prev');
    const nextBtn = document.querySelector('.carousel-next');
    const indicators = document.querySelectorAll('.indicator');

    if (!carousel || cards.length === 0) return;

    let currentIndex = 2; // Default focused slide is Batch 3 (Index 2)

    // Center to specific slide index
    function scrollToSlide(index) {
        if (index < 0 || index >= cards.length) return;
        currentIndex = index;

        const card = cards[index];
        const containerWidth = carousel.clientWidth;
        const cardWidth = card.clientWidth;
        const cardOffset = card.offsetLeft;

        // Calculate position to center the card
        const scrollToX = cardOffset - (containerWidth / 2) + (cardWidth / 2);

        carousel.scrollTo({
            left: scrollToX,
            behavior: 'smooth'
        });

        updateIndicators(index);
    }

    // Update active state of dots indicator
    function updateIndicators(activeIndex) {
        indicators.forEach((indicator, index) => {
            indicator.classList.remove('active', 'active-special');
            if (index === activeIndex) {
                // Batch 3 (index 2) gets a special highlight
                if (index === 2) {
                    indicator.classList.add('active-special');
                } else {
                    indicator.classList.add('active');
                }
            }
        });
    }

    // Auto-scroll handler detection (when user manual swipes)
    let isScrolling;
    carousel.addEventListener('scroll', () => {
        window.clearTimeout(isScrolling);
        isScrolling = setTimeout(() => {
            const containerCenter = carousel.scrollLeft + (carousel.clientWidth / 2);
            let closestIndex = 0;
            let minDistance = Infinity;

            cards.forEach((card, index) => {
                const cardCenter = card.offsetLeft + (card.clientWidth / 2);
                const distance = Math.abs(containerCenter - cardCenter);
                if (distance < minDistance) {
                    minDistance = distance;
                    closestIndex = index;
                }
            });

            if (currentIndex !== closestIndex) {
                currentIndex = closestIndex;
                updateIndicators(closestIndex);
            }
        }, 100);
    });

    // Prev Button Click
    if (prevBtn) {
        prevBtn.addEventListener('click', () => {
            let nextIndex = currentIndex - 1;
            if (nextIndex < 0) nextIndex = cards.length - 1; // loop to end
            scrollToSlide(nextIndex);
        });
    }

    // Next Button Click
    if (nextBtn) {
        nextBtn.addEventListener('click', () => {
            let nextIndex = currentIndex + 1;
            if (nextIndex >= cards.length) nextIndex = 0; // loop to start
            scrollToSlide(nextIndex);
        });
    }

    // Indicators Click Handler
    indicators.forEach((indicator) => {
        indicator.addEventListener('click', (e) => {
            const slideIndex = parseInt(e.target.getAttribute('data-slide'), 10);
            if (!isNaN(slideIndex)) {
                scrollToSlide(slideIndex);
            }
        });
    });

    // Initial position: center slide on Batch 3
    // Wait a little bit for rendering layouts to settle
    setTimeout(() => {
        scrollToSlide(2);
    }, 300);
});
