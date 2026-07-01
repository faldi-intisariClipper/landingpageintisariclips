// ==========================================
// CLIENT-SIDE LOGIC UNTUK INTISARICLIPS V10
// ==========================================

document.addEventListener('DOMContentLoaded', () => {
    // 1. Mobile Menu Toggle & Drawer
    const menuToggle = document.getElementById('menuToggle');
    const menuDrawer = document.getElementById('menuDrawer');
    const drawerLinks = document.querySelectorAll('.drawer-link, .drawer-menu button, .drawer-menu a');

    if (menuToggle && menuDrawer) {
        menuToggle.addEventListener('click', () => {
            menuToggle.classList.toggle('active');
            menuDrawer.classList.toggle('active');
        });

        // Close drawer when any link is clicked
        drawerLinks.forEach(link => {
            link.addEventListener('click', () => {
                menuToggle.classList.remove('active');
                menuDrawer.classList.remove('active');
            });
        });
    }

    // 2. Checkout Modal & E-payment Handler
    const checkoutForm = document.getElementById('checkoutForm');
    const checkoutAlert = document.getElementById('checkoutAlert');
    const checkoutAlertText = document.getElementById('checkoutAlertText');
    const btnSubmit = document.getElementById('btnProcessCheckout');
    const btnText = document.getElementById('btnProcessText');
    const btnIcon = document.getElementById('btnProcessIcon');
    const btnSpinner = document.getElementById('btnProcessSpinner');

    // Trigger Modal Form Checkout
    window.openCheckoutModal = function() {
        const modal = document.getElementById('checkoutModal');
        if (modal) {
            modal.classList.remove('hidden');
            modal.classList.add('flex');
            document.body.style.overflow = 'hidden'; // Lock body scroll
        }
    };

    window.closeCheckoutModal = function() {
        const modal = document.getElementById('checkoutModal');
        if (modal) {
            modal.classList.add('hidden');
            modal.classList.remove('flex');
            document.body.style.overflow = 'auto'; // Unlock body scroll
        }
    };

    // Close modal when clicking outside form
    const modalBg = document.getElementById('checkoutModal');
    if (modalBg) {
        modalBg.addEventListener('click', (e) => {
            if (e.target === modalBg) {
                closeCheckoutModal();
            }
        });
    }

    function showAlert(message) {
        if (checkoutAlertText && checkoutAlert) {
            checkoutAlertText.textContent = message;
            checkoutAlert.classList.remove('hidden');
        }
    }

    function hideAlert() {
        if (checkoutAlert) {
            checkoutAlert.classList.add('hidden');
        }
    }

    function setLoadingState(isLoading) {
        if (!btnSubmit) return;
        if (isLoading) {
            if (btnText) btnText.textContent = 'Memproses...';
            if (btnIcon) btnIcon.classList.add('hidden');
            if (btnSpinner) btnSpinner.classList.remove('hidden');
            btnSubmit.disabled = true;
            btnSubmit.classList.add('opacity-80', 'cursor-not-allowed');
        } else {
            if (btnText) btnText.textContent = 'BAYAR SEKARANG';
            if (btnIcon) btnIcon.classList.remove('hidden');
            if (btnSpinner) btnSpinner.classList.add('hidden');
            btnSubmit.disabled = false;
            btnSubmit.classList.remove('opacity-80', 'cursor-not-allowed');
        }
    }

    // 2b. Interactive Payment Method Cards Selector
    const paymentMethodCards = document.querySelectorAll('.payment-method-card');
    paymentMethodCards.forEach(card => {
        card.addEventListener('click', () => {
            // Uncheck all other radio inputs & reset their styles
            paymentMethodCards.forEach(c => {
                const dot = c.querySelector('.payment-dot');
                
                c.classList.remove('border-neon-cyan-mid', 'border-neon-pink', 'shadow-[0_0_10px_rgba(0,217,255,0.15)]', 'shadow-[0_0_10px_rgba(255,0,128,0.15)]');
                c.classList.add('border-neon-border');
                
                if (dot) {
                    dot.classList.remove('border-neon-cyan-mid', 'border-neon-pink');
                    dot.classList.add('border-slate-600');
                    dot.classList.remove('after:bg-neon-cyan-mid', 'after:bg-neon-pink');
                    dot.classList.add('after:bg-transparent');
                }
            });

            // Check this card's radio input & apply active styles
            const radio = card.querySelector('input[type="radio"]');
            if (radio) {
                radio.checked = true;
                const value = radio.value;
                const isAlfamart = value === 'AL';
                const dot = card.querySelector('.payment-dot');
                
                card.classList.remove('border-neon-border');
                if (isAlfamart) {
                    card.classList.add('border-neon-pink', 'shadow-[0_0_10px_rgba(255,0,128,0.15)]');
                    if (dot) {
                        dot.classList.remove('border-slate-600');
                        dot.classList.add('border-neon-pink', 'after:bg-neon-pink');
                    }
                } else {
                    card.classList.add('border-neon-cyan-mid', 'shadow-[0_0_10px_rgba(0,217,255,0.15)]');
                    if (dot) {
                        dot.classList.remove('border-slate-600');
                        dot.classList.add('border-neon-cyan-mid', 'after:bg-neon-cyan-mid');
                    }
                }
            }
        });
    });

    if (checkoutForm) {
        checkoutForm.addEventListener('submit', async (event) => {
            event.preventDefault();
            hideAlert();
            
            const nameInput = document.getElementById('custName');
            const emailInput = document.getElementById('custEmail');
            const phoneInput = document.getElementById('custPhone');
            const paymentMethodInput = document.querySelector('input[name="paymentMethod"]:checked');

            if (!nameInput || !emailInput || !phoneInput) return;

            const name = nameInput.value.trim();
            const email = emailInput.value.trim();
            const phone = phoneInput.value.trim();
            const paymentMethod = paymentMethodInput ? paymentMethodInput.value : 'M1';
            
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
                    body: JSON.stringify({ name, email, phone, paymentMethod })
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
        });
    }

    // 3. FAQ Accordion Handler
    const faqQuestions = document.querySelectorAll('.faq-question');
    faqQuestions.forEach(question => {
        question.addEventListener('click', () => {
            const answer = question.nextElementSibling;
            const icon = question.querySelector('.faq-icon');
            
            // Close other accordions
            faqQuestions.forEach(otherQuestion => {
                if (otherQuestion !== question) {
                    const otherAnswer = otherQuestion.nextElementSibling;
                    const otherIcon = otherQuestion.querySelector('.faq-icon');
                    if (otherAnswer) {
                        otherAnswer.classList.add('max-h-0', 'opacity-0');
                        otherAnswer.classList.remove('max-h-96', 'opacity-100', 'mt-4');
                    }
                    if (otherIcon) {
                        otherIcon.style.transform = 'rotate(0deg)';
                    }
                }
            });

            // Toggle active accordion
            if (answer) {
                if (answer.classList.contains('max-h-0')) {
                    answer.classList.remove('max-h-0', 'opacity-0');
                    answer.classList.add('max-h-96', 'opacity-100', 'mt-4');
                    if (icon) icon.style.transform = 'rotate(180deg)';
                } else {
                    answer.classList.add('max-h-0', 'opacity-0');
                    answer.classList.remove('max-h-96', 'opacity-100', 'mt-4');
                    if (icon) icon.style.transform = 'rotate(0deg)';
                }
            }
        });
    });

    // 4. Video Audio Toggle
    window.toggleVideoAudio = function(container) {
        const video = container.querySelector('video');
        if (!video) return;
        
        if (video.muted) {
            video.muted = false;
            container.classList.add('is-playing');
            if (video.paused) {
                video.play().catch(err => console.log("Play failed:", err));
            }
        } else {
            video.muted = true;
            container.classList.remove('is-playing');
        }
    };
});