document.addEventListener('DOMContentLoaded', () => {

    // ============================================
    // 1. NAVBAR SCROLL EFFECT
    // ============================================
    const navbar = document.querySelector('.navbar');
    if (navbar) {
        window.addEventListener('scroll', () => {
            if (window.scrollY > 50) {
                navbar.classList.add('scrolled');
            } else {
                navbar.classList.remove('scrolled');
            }
        });
    }

    // ============================================
    // 2. MOBILE MENU TOGGLE
    // ============================================
    const mobileToggle = document.getElementById('mobileToggle');
    const navLinks = document.getElementById('navLinks');
    const mobileOverlay = document.getElementById('mobileOverlay');

    function openMobileMenu() {
        if (navLinks) navLinks.classList.add('active');
        if (mobileOverlay) mobileOverlay.classList.add('active');
        if (mobileToggle) mobileToggle.innerHTML = '<i class="fas fa-times"></i>';
        document.body.style.overflow = 'hidden';
    }

    function closeMobileMenu() {
        if (navLinks) navLinks.classList.remove('active');
        if (mobileOverlay) mobileOverlay.classList.remove('active');
        if (mobileToggle) mobileToggle.innerHTML = '<i class="fas fa-bars"></i>';
        document.body.style.overflow = '';
    }

    if (mobileToggle && navLinks) {
        mobileToggle.addEventListener('click', () => {
            if (navLinks.classList.contains('active')) {
                closeMobileMenu();
            } else {
                openMobileMenu();
            }
        });

        // Close menu on link click (mobile)
        navLinks.querySelectorAll('a:not(.nav-dropdown > a)').forEach(link => {
            link.addEventListener('click', closeMobileMenu);
        });
    }

    if (mobileOverlay) {
        mobileOverlay.addEventListener('click', closeMobileMenu);
    }

    // ============================================
    // 3. SMOOTH SCROLLING
    // ============================================
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                const navHeight = navbar ? navbar.offsetHeight : 0;
                window.scrollTo({
                    top: targetElement.offsetTop - navHeight - 20,
                    behavior: 'smooth'
                });
            }
        });
    });

    
    // ============================================
    const promoBanner = document.getElementById('promoBanner');
    const promoClose = document.getElementById('promoClose');

    if (promoBanner && promoClose) {
        // Check if previously dismissed
        if (localStorage.getItem('promoBannerDismissed') === 'true') {
            promoBanner.classList.add('hidden');
        }

        promoClose.addEventListener('click', () => {
            promoBanner.classList.add('hidden');
            localStorage.setItem('promoBannerDismissed', 'true');
        });
    }

    
    // ============================================
    const cookieBanner = document.getElementById('cookieBanner');
    const cookieAccept = document.getElementById('cookieAccept');
    const cookieDecline = document.getElementById('cookieDecline');

    if (cookieBanner) {
        if (!localStorage.getItem('cookieConsent')) {
            setTimeout(() => {
                cookieBanner.classList.add('show');
            }, 2000);
        }

        if (cookieAccept) {
            cookieAccept.addEventListener('click', () => {
                localStorage.setItem('cookieConsent', 'accepted');
                cookieBanner.classList.remove('show');
            });
        }

        if (cookieDecline) {
            cookieDecline.addEventListener('click', () => {
                localStorage.setItem('cookieConsent', 'declined');
                cookieBanner.classList.remove('show');
            });
        }
    }

    // ============================================
    // 6. BACK TO TOP BUTTON
    // ============================================
    const backToTop = document.getElementById('backToTop');
    if (backToTop) {
        window.addEventListener('scroll', () => {
            if (window.scrollY > 500) {
                backToTop.classList.add('visible');
            } else {
                backToTop.classList.remove('visible');
            }
        });

        backToTop.addEventListener('click', () => {
            window.scrollTo({ top: 0, behavior: 'smooth' });
        });
    }

    // ============================================
    // 7. ANIMATED COUNTER ON SCROLL
    // ============================================
    const counters = document.querySelectorAll('.stat-number[data-count]');
    let countersAnimated = false;

    function animateCounters() {
        if (countersAnimated) return;

        counters.forEach(counter => {
            const target = parseFloat(counter.getAttribute('data-count'));
            const suffix = counter.getAttribute('data-suffix') || '';
            const isDecimal = target % 1 !== 0;
            const duration = 2000;
            const increment = target / (duration / 16);
            let current = 0;

            function updateCount() {
                current += increment;
                if (current >= target) {
                    current = target;
                    counter.textContent = (isDecimal ? target.toFixed(1) : Math.floor(target).toLocaleString('en-IN')) + suffix;
                    return;
                }
                counter.textContent = (isDecimal ? current.toFixed(1) : Math.floor(current).toLocaleString('en-IN')) + suffix;
                requestAnimationFrame(updateCount);
            }

            updateCount();
        });
        countersAnimated = true;
    }

    // Intersection Observer for counters
    if (counters.length > 0) {
        const statsSection = document.getElementById('stats');
        if (statsSection) {
            const observer = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        animateCounters();
                        observer.unobserve(entry.target);
                    }
                });
            }, { threshold: 0.3 });
            observer.observe(statsSection);
        }
    }

    // ============================================
    // 8. FADE-IN ON SCROLL (Intersection Observer)
    // ============================================
    const fadeElements = document.querySelectorAll('.fade-in');
    if (fadeElements.length > 0) {
        const fadeObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('visible');
                    fadeObserver.unobserve(entry.target);
                }
            });
        }, { threshold: 0.1, rootMargin: '0px 0px -50px 0px' });

        fadeElements.forEach(el => fadeObserver.observe(el));
    }

    // ============================================
    // 9. TESTIMONIAL SLIDER
    // ============================================
    const track = document.querySelector('.testimonial-track');
    if (track) {
        const slides = Array.from(track.children);
        const nextBtn = document.querySelector('.slider-next');
        const prevBtn = document.querySelector('.slider-prev');
        let slideIndex = 0;
        let autoSlideInterval;

        function updateSliderPosition() {
            track.style.transform = `translateX(-${slideIndex * 100}%)`;
        }

        function nextSlide() {
            slideIndex = (slideIndex + 1) % slides.length;
            updateSliderPosition();
        }

        function prevSlide() {
            slideIndex = (slideIndex - 1 + slides.length) % slides.length;
            updateSliderPosition();
        }

        function startAutoSlide() {
            autoSlideInterval = setInterval(nextSlide, 5000);
        }

        function stopAutoSlide() {
            clearInterval(autoSlideInterval);
        }

        if (nextBtn) {
            nextBtn.addEventListener('click', () => {
                stopAutoSlide();
                nextSlide();
                startAutoSlide();
            });
        }

        if (prevBtn) {
            prevBtn.addEventListener('click', () => {
                stopAutoSlide();
                prevSlide();
                startAutoSlide();
            });
        }

        startAutoSlide();

        // Touch support for slider
        let touchStartX = 0;
        let touchEndX = 0;

        track.addEventListener('touchstart', (e) => {
            touchStartX = e.changedTouches[0].screenX;
            stopAutoSlide();
        }, { passive: true });

        track.addEventListener('touchend', (e) => {
            touchEndX = e.changedTouches[0].screenX;
            const diff = touchStartX - touchEndX;
            if (Math.abs(diff) > 50) {
                if (diff > 0) nextSlide();
                else prevSlide();
            }
            startAutoSlide();
        }, { passive: true });
    }

    // ============================================
    // 10. FAQ ACCORDION
    // ============================================
    const faqItems = document.querySelectorAll('.faq-item');
    if (faqItems.length > 0) {
        faqItems.forEach(item => {
            const question = item.querySelector('.faq-question');
            if (question) {
                question.addEventListener('click', () => {
                    // Close other open items
                    faqItems.forEach(otherItem => {
                        if (otherItem !== item) {
                            otherItem.classList.remove('active');
                        }
                    });
                    item.classList.toggle('active');
                });
            }
        });
    }

    // ============================================
    // 11. FAQ TABS
    // ============================================
    const faqTabs = document.querySelectorAll('.faq-tab');
    if (faqTabs.length > 0) {
        faqTabs.forEach(tab => {
            tab.addEventListener('click', () => {
                const category = tab.getAttribute('data-category');
                
                // Update active tab
                faqTabs.forEach(t => t.classList.remove('active'));
                tab.classList.add('active');

                // Show/hide FAQ items
                const allFaqItems = document.querySelectorAll('.faq-item');
                let visibleCount = 0;
                allFaqItems.forEach(item => {
                    if (category === 'all' || item.getAttribute('data-category') === category) {
                        item.style.display = '';
                        visibleCount++;
                    } else {
                        item.style.display = 'none';
                        item.classList.remove('active');
                    }
                });

                // Show/hide no results
                const noResults = document.querySelector('.faq-no-results');
                if (noResults) {
                    noResults.style.display = visibleCount === 0 ? 'block' : 'none';
                }
            });
        });
    }

    // ============================================
    // 12. FAQ SEARCH
    // ============================================
    const faqSearch = document.querySelector('.faq-search input');
    if (faqSearch) {
        faqSearch.addEventListener('input', (e) => {
            const searchTerm = e.target.value.toLowerCase().trim();
            const allFaqItems = document.querySelectorAll('.faq-item');
            let visibleCount = 0;

            // Reset tabs to 'all'
            const allTab = document.querySelector('.faq-tab[data-category="all"]');
            if (allTab) {
                faqTabs.forEach(t => t.classList.remove('active'));
                allTab.classList.add('active');
            }

            allFaqItems.forEach(item => {
                const question = item.querySelector('.faq-question span');
                const answer = item.querySelector('.faq-answer p');
                const questionText = question ? question.textContent.toLowerCase() : '';
                const answerText = answer ? answer.textContent.toLowerCase() : '';

                if (searchTerm === '' || questionText.includes(searchTerm) || answerText.includes(searchTerm)) {
                    item.style.display = '';
                    visibleCount++;
                } else {
                    item.style.display = 'none';
                    item.classList.remove('active');
                }
            });

            const noResults = document.querySelector('.faq-no-results');
            if (noResults) {
                noResults.style.display = visibleCount === 0 ? 'block' : 'none';
            }
        });
    }

    // ============================================
    // 13. SERVICE CATEGORY TABS
    // ============================================
    const serviceTabs = document.querySelectorAll('.service-tab');
    if (serviceTabs.length > 0) {
        serviceTabs.forEach(tab => {
            tab.addEventListener('click', () => {
                const category = tab.getAttribute('data-category');
                
                // Update active tab
                serviceTabs.forEach(t => t.classList.remove('active'));
                tab.classList.add('active');

                // Show/hide categories
                const sections = document.querySelectorAll('.service-category-section');
                sections.forEach(section => {
                    if (category === 'all' || section.getAttribute('data-category') === category) {
                        section.style.display = '';
                    } else {
                        section.style.display = 'none';
                    }
                });
            });
        });
    }

    
    // ============================================
    const socialProof = document.getElementById('socialProof');
    const spText = document.getElementById('spText');
    const spTime = document.getElementById('spTime');
    const spClose = document.getElementById('spClose');

    if (socialProof && spText && spTime) {
        const proofMessages = [
            { name: 'Ramesh from Delhi', action: 'just booked Master Health Checkup', time: '2 minutes ago' },
            { name: 'Priya from Chennai', action: 'rated us 5 stars', time: '5 minutes ago' },
            { name: 'Arun from Bangalore', action: 'just booked MRI Brain Scan', time: '8 minutes ago' },
            { name: 'Sunita from Mumbai', action: 'booked Diabetes Care Package', time: '12 minutes ago' },
            { name: 'Karthik from Hyderabad', action: 'just completed Full Body Checkup', time: '15 minutes ago' },
        ];

        let proofIndex = 0;
        let proofTimeout;

        function showProof() {
            const msg = proofMessages[proofIndex];
            spText.innerHTML = `<strong>${msg.name}</strong> ${msg.action}`;
            spTime.textContent = msg.time;
            socialProof.classList.add('show');

            proofTimeout = setTimeout(() => {
                socialProof.classList.remove('show');
                proofIndex = (proofIndex + 1) % proofMessages.length;
                setTimeout(showProof, 10000 + Math.random() * 5000);
            }, 5000);
        }

        // Start after 8 seconds
        setTimeout(showProof, 8000);

        if (spClose) {
            spClose.addEventListener('click', () => {
                socialProof.classList.remove('show');
                clearTimeout(proofTimeout);
            });
        }
    }

    // ============================================
    // 15. FORM VALIDATION & SUBMISSION
    // ============================================
    const forms = document.querySelectorAll('form');
    forms.forEach(form => {
        form.addEventListener('submit', function (e) {
            e.preventDefault();
            
            let isValid = true;
            const requiredFields = this.querySelectorAll('[required]');
            
            requiredFields.forEach(field => {
                const formGroup = field.closest('.form-group');
                const errorEl = formGroup ? formGroup.querySelector('.form-error') : null;

                // Reset
                field.classList.remove('error');
                if (formGroup) formGroup.classList.remove('has-error');

                if (!field.value.trim()) {
                    isValid = false;
                    field.classList.add('error');
                    if (formGroup) formGroup.classList.add('has-error');
                    if (errorEl) errorEl.textContent = 'This field is required';
                }

                // Email validation
                if (field.type === 'email' && field.value.trim()) {
                    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                    if (!emailRegex.test(field.value)) {
                        isValid = false;
                        field.classList.add('error');
                        if (formGroup) formGroup.classList.add('has-error');
                        if (errorEl) errorEl.textContent = 'Please enter a valid email address';
                    }
                }

                // Phone validation (10 digits for Indian numbers)
                if (field.type === 'tel' && field.value.trim()) {
                    const phoneVal = field.value.replace(/\D/g, '');
                    if (phoneVal.length < 10) {
                        isValid = false;
                        field.classList.add('error');
                        if (formGroup) formGroup.classList.add('has-error');
                        if (errorEl) errorEl.textContent = 'Please enter a valid 10-digit phone number';
                    }
                }
            });

            if (isValid) {
                const btn = this.querySelector('button[type="submit"]');
                if (btn) {
                    btn.classList.add('btn-loading');
                    btn.disabled = true;
                }

                setTimeout(() => {
                    if (btn) {
                        btn.classList.remove('btn-loading');
                        btn.disabled = false;
                    }
                    this.reset();
                    
                    const successMsg = this.closest('.form-container') 
                        ? this.closest('.form-container').querySelector('#form-success')
                        : document.getElementById('form-success');
                    
                    if (successMsg) {
                        successMsg.style.display = 'block';
                        setTimeout(() => {
                            successMsg.style.display = 'none';
                        }, 5000);
                    } else {
                        alert('Your request has been submitted successfully! We will contact you soon.');
                    }
                }, 1500);
            }
        });

        // Remove error on input
        form.querySelectorAll('input, select, textarea').forEach(field => {
            field.addEventListener('input', () => {
                field.classList.remove('error');
                const formGroup = field.closest('.form-group');
                if (formGroup) formGroup.classList.remove('has-error');
            });
        });
    });

    // ============================================
    // 16. TABLE EXPANSION TOGGLE
    // ============================================
    const expandTableBtn = document.getElementById('expand-table-btn');
    if (expandTableBtn) {
        expandTableBtn.addEventListener('click', () => {
            const hiddenRows = document.querySelectorAll('.hidden-row');
            if (hiddenRows.length > 0) {
                hiddenRows.forEach(row => {
                    row.classList.remove('hidden-row');
                    row.classList.add('visible-row');
                    row.style.display = 'table-row';
                });
                expandTableBtn.textContent = 'Show Less Details';
            } else {
                const visibleRows = document.querySelectorAll('.visible-row');
                visibleRows.forEach(row => {
                    row.classList.add('hidden-row');
                    row.classList.remove('visible-row');
                    row.style.display = 'none';
                });
                expandTableBtn.textContent = 'View Full Details';
            }
        });
    }

    // ============================================
    // 17. LAZY LOADING IMAGES
    // ============================================
    if ('IntersectionObserver' in window) {
        const lazyImages = document.querySelectorAll('img[loading="lazy"]');
        const imageObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    if (img.dataset.src) {
                        img.src = img.dataset.src;
                        img.removeAttribute('data-src');
                    }
                    imageObserver.unobserve(img);
                }
            });
        });

        lazyImages.forEach(img => imageObserver.observe(img));
    }

    
    // ============================================
// ============================================
    const bookingSteps = document.querySelectorAll('.booking-step');
    const progressDots = document.querySelectorAll('.progress-step-dot');
    const progressLines = document.querySelectorAll('.progress-line');
    let currentStep = 0;

    function showBookingStep(step) {
        bookingSteps.forEach((s, i) => {
            s.classList.toggle('active', i === step);
        });

        progressDots.forEach((dot, i) => {
            dot.classList.remove('active', 'completed');
            if (i < step) dot.classList.add('completed');
            if (i === step) dot.classList.add('active');
        });

        progressLines.forEach((line, i) => {
            line.classList.toggle('completed', i < step);
        });

        currentStep = step;
    }

    // Next/Previous step buttons
    document.querySelectorAll('.booking-next').forEach(btn => {
        btn.addEventListener('click', () => {
            if (currentStep < bookingSteps.length - 1) {
                showBookingStep(currentStep + 1);
            }
        });
    });

    document.querySelectorAll('.booking-prev').forEach(btn => {
        btn.addEventListener('click', () => {
            if (currentStep > 0) {
                showBookingStep(currentStep - 1);
            }
        });
    });

    // Service option cards (click to select)
    document.querySelectorAll('.service-option-card').forEach(card => {
        card.addEventListener('click', () => {
            const radio = card.querySelector('input[type="radio"]');
            if (radio) {
                radio.checked = true;
                card.closest('.form-group').querySelectorAll('.service-option-card').forEach(c => {
                    c.classList.remove('selected');
                });
                card.classList.add('selected');
            }
        });
    });

    // Time slot selection
    document.querySelectorAll('.time-slot:not(.booked)').forEach(slot => {
        slot.addEventListener('click', () => {
            slot.closest('.time-slots-grid').querySelectorAll('.time-slot').forEach(s => {
                s.classList.remove('selected');
            });
            slot.classList.add('selected');
        });
    });

    // ============================================
    // 19. FILE UPLOAD
    // ============================================
    document.querySelectorAll('.file-upload').forEach(upload => {
        const input = upload.querySelector('input[type="file"]');
        const label = upload.querySelector('p');

        upload.addEventListener('click', () => {
            if (input) input.click();
        });

        if (input) {
            input.addEventListener('change', () => {
                if (input.files.length > 0) {
                    label.textContent = input.files[0].name;
                    upload.style.borderColor = 'var(--teal)';
                }
            });
        }
    });

    // ============================================
    // 20. SERVICE CATALOG SEARCH & FILTER
    // ============================================
    const catalogSearch = document.querySelector('.catalog-search input');
    if (catalogSearch) {
        catalogSearch.addEventListener('input', (e) => {
            const term = e.target.value.toLowerCase().trim();
            const cards = document.querySelectorAll('.service-card-mini, .test-listing-card');
            
            cards.forEach(card => {
                const title = card.querySelector('h4');
                const desc = card.querySelector('.service-mini-desc, .test-desc');
                const textContent = (title ? title.textContent : '') + ' ' + (desc ? desc.textContent : '');
                
                card.style.display = textContent.toLowerCase().includes(term) || term === '' ? '' : 'none';
            });
        });
    }

    // Filter checkboxes
    document.querySelectorAll('.filter-option input[type="checkbox"], .filter-option input[type="radio"]').forEach(filter => {
        filter.addEventListener('change', () => {
            // Collect active filters
            const activeFilters = {};
            document.querySelectorAll('.filter-group').forEach(group => {
                const filterType = group.getAttribute('data-filter');
                if (filterType) {
                    const checked = group.querySelectorAll('input:checked');
                    if (checked.length > 0) {
                        activeFilters[filterType] = Array.from(checked).map(c => c.value);
                    }
                }
            });

            // Apply filters
            const cards = document.querySelectorAll('.test-listing-card');
            cards.forEach(card => {
                let show = true;
                Object.keys(activeFilters).forEach(filterType => {
                    const cardValue = card.getAttribute(`data-${filterType}`);
                    if (cardValue && !activeFilters[filterType].includes(cardValue)) {
                        show = false;
                    }
                });
                card.style.display = show ? '' : 'none';
            });
        });
    });

    // ============================================
    // 21. PORTAL LOGIN TABS
    // ============================================
    const portalTabs = document.querySelectorAll('.portal-login-tab');
    if (portalTabs.length > 0) {
        portalTabs.forEach(tab => {
            tab.addEventListener('click', () => {
                const target = tab.getAttribute('data-tab');
                portalTabs.forEach(t => t.classList.remove('active'));
                tab.classList.add('active');

                document.querySelectorAll('.portal-login-form').forEach(form => {
                    form.style.display = form.getAttribute('data-tab') === target ? 'block' : 'none';
                });
            });
        });
    }

    // ============================================
    // 22. PACKAGE COMPARISON
    // ============================================
    const compareCheckboxes = document.querySelectorAll('.compare-checkbox');
    if (compareCheckboxes.length > 0) {
        compareCheckboxes.forEach(checkbox => {
            checkbox.addEventListener('change', () => {
                const checked = document.querySelectorAll('.compare-checkbox:checked');
                if (checked.length > 3) {
                    checkbox.checked = false;
                    alert('You can compare up to 3 packages at a time.');
                }

                const compareBtn = document.getElementById('compareBtn');
                if (compareBtn) {
                    compareBtn.disabled = checked.length < 2;
                    compareBtn.textContent = `Compare (${checked.length} selected)`;
                }
            });
        });
    }

    // ============================================
    // 23. EXPANDABLE TEST DETAILS
    // ============================================
    document.querySelectorAll('.view-details-toggle').forEach(toggle => {
        toggle.addEventListener('click', (e) => {
            e.preventDefault();
            const card = toggle.closest('.service-card-mini, .test-listing-card');
            if (card) {
                const detail = card.querySelector('.test-detail-expandable');
                if (detail) {
                    detail.classList.toggle('show');
                    toggle.textContent = detail.classList.contains('show') ? 'Hide Details ↑' : 'View Details →';
                }
            }
        });
    });
    
});

    // ============================================
    // WHATSAPP INQUIRY FORM
    // ============================================
    const waForm = document.getElementById('inquiryWhatsAppForm');
    if (waForm) {
        waForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const name = document.getElementById('inqName').value.trim();
            const phone = document.getElementById('inqPhone').value.trim();
            const email = document.getElementById('inqEmail').value.trim();
            const date = document.getElementById('inqDate').value;
            const message = document.getElementById('inqMessage').value.trim();
            
            if(!name || !phone || !date || !message) {
                alert("Please fill in all required fields.");
                return;
            }

            const text = `Hi, I would like to book an appointment.
*Name*: ${name}
*Phone*: ${phone}
*Email*: ${email ? email : 'N/A'}
*Date*: ${date}
*Message*: ${message}`;
            
            const encodedText = encodeURIComponent(text);
            const targetPhone = "919094112869"; // Placeholder
            
            const url = `https://wa.me/${targetPhone}?text=${encodedText}`;
            window.open(url, '_blank');
        });
    }

