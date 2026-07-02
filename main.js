// Enhanced Buswings JavaScript with animations and interactivity
document.addEventListener('DOMContentLoaded', function() {
    // Initialize all components
    initPreloader();
    initNavigation();
    initScrollEffects();
    initAnimations();
    initBookingForm();
    initFAB();
    initToast();
    initTiltEffect();
    initCounters();
});

// Preloader functionality
function initPreloader() {
    const preloader = document.getElementById('preloader');
    
    window.addEventListener('load', () => {
        setTimeout(() => {
            preloader.classList.add('hidden');
            setTimeout(() => {
                preloader.style.display = 'none';
            }, 300);
        }, 1000);
    });
}

// Navigation functionality
function initNavigation() {
    const menuBtn = document.getElementById("menu-btn");
    const navLinks = document.getElementById("nav-links");
    const navbar = document.querySelector('.navbar');
    const navLinksItems = navLinks.querySelectorAll('a');

    // Mobile menu toggle
    menuBtn.addEventListener("click", (e) => {
        e.preventDefault();
        navLinks.classList.toggle("open");
        menuBtn.classList.toggle("active");
        
        // Animate hamburger menu
        const spans = menuBtn.querySelectorAll('span');
        spans.forEach((span, index) => {
            if (menuBtn.classList.contains('active')) {
                span.style.transform = index === 0 ? 'rotate(45deg) translate(5px, 5px)' :
                                    index === 1 ? 'opacity(0)' :
                                    'rotate(-45deg) translate(7px, -6px)';
            } else {
                span.style.transform = 'none';
                span.style.opacity = '1';
            }
        });
    });

    // Close mobile menu when clicking on a link
    navLinksItems.forEach(link => {
        link.addEventListener('click', () => {
            navLinks.classList.remove("open");
            menuBtn.classList.remove("active");
            const spans = menuBtn.querySelectorAll('span');
            spans.forEach(span => {
                span.style.transform = 'none';
                span.style.opacity = '1';
            });
        });
    });

    // Navbar scroll effect
    window.addEventListener('scroll', () => {
        if (window.scrollY > 100) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });

    // Smooth scrolling for navigation links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
}

// Scroll effects and animations
function initScrollEffects() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-in');
                
                // Special handling for different animation types
                if (entry.target.classList.contains('slide-up')) {
                    entry.target.style.transform = 'translateY(0)';
                    entry.target.style.opacity = '1';
                }
                if (entry.target.classList.contains('slide-right')) {
                    entry.target.style.transform = 'translateX(0)';
                    entry.target.style.opacity = '1';
                }
                if (entry.target.classList.contains('slide-left')) {
                    entry.target.style.transform = 'translateX(0)';
                    entry.target.style.opacity = '1';
                }
                if (entry.target.classList.contains('fade-in')) {
                    entry.target.style.opacity = '1';
                }
                if (entry.target.classList.contains('scale-in')) {
                    entry.target.style.transform = 'scale(1)';
                    entry.target.style.opacity = '1';
                }
            }
        });
    }, observerOptions);

    // Observe all elements with animation classes
    document.querySelectorAll('.slide-up, .slide-right, .slide-left, .fade-in, .scale-in').forEach(el => {
        // Set initial states
        if (el.classList.contains('slide-up')) {
            el.style.transform = 'translateY(50px)';
            el.style.opacity = '0';
        }
        if (el.classList.contains('slide-right')) {
            el.style.transform = 'translateX(-50px)';
            el.style.opacity = '0';
        }
        if (el.classList.contains('slide-left')) {
            el.style.transform = 'translateX(50px)';
            el.style.opacity = '0';
        }
        if (el.classList.contains('fade-in')) {
            el.style.opacity = '0';
        }
        if (el.classList.contains('scale-in')) {
            el.style.transform = 'scale(0.8)';
            el.style.opacity = '0';
        }
        
        el.style.transition = 'all 0.6s ease-out';
        observer.observe(el);
    });
}

// General animations
function initAnimations() {
    // Parallax effect for hero section
    const hero = document.querySelector('.hero');
    if (hero) {
        window.addEventListener('scroll', () => {
            const scrolled = window.pageYOffset;
            const parallax = scrolled * 0.5;
            hero.style.transform = `translateY(${parallax}px)`;
        });
    }

    // Floating animation for cards
    const cards = document.querySelectorAll('.card, .service-card, .feature-card');
    cards.forEach(card => {
        card.addEventListener('mouseenter', () => {
            card.style.transform = 'translateY(-10px) scale(1.02)';
            card.style.boxShadow = '0 20px 40px rgba(0,0,0,0.1)';
        });
        
        card.addEventListener('mouseleave', () => {
            card.style.transform = 'translateY(0) scale(1)';
            card.style.boxShadow = '0 10px 30px rgba(0,0,0,0.1)';
        });
    });

    // Button hover effects
    const buttons = document.querySelectorAll('.btn, .cta-btn');
    buttons.forEach(btn => {
        btn.addEventListener('mouseenter', () => {
            btn.style.transform = 'translateY(-2px)';
        });
        
        btn.addEventListener('mouseleave', () => {
            btn.style.transform = 'translateY(0)';
        });
    });
}

// Booking form functionality
function initBookingForm() {
    const bookingForm = document.getElementById('booking-form');
    const bookingModal = document.getElementById('booking-modal');
    const closeModalBtns = document.querySelectorAll('.close-modal');
    const bookNowBtns = document.querySelectorAll('.book-now-btn');

    // Open booking modal
    bookNowBtns.forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.preventDefault();
            bookingModal.classList.add('active');
            document.body.style.overflow = 'hidden';
        });
    });

    // Close booking modal
    closeModalBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            bookingModal.classList.remove('active');
            document.body.style.overflow = 'auto';
        });
    });

    // Close modal when clicking outside
    bookingModal.addEventListener('click', (e) => {
        if (e.target === bookingModal) {
            bookingModal.classList.remove('active');
            document.body.style.overflow = 'auto';
        }
    });

    // Form validation and submission
    if (bookingForm) {
        bookingForm.addEventListener('submit', (e) => {
            e.preventDefault();
            
            const formData = new FormData(bookingForm);
            const formObject = {};
            formData.forEach((value, key) => {
                formObject[key] = value;
            });

            // Validate form
            if (validateBookingForm(formObject)) {
                // Simulate booking process
                showLoading();
                setTimeout(() => {
                    hideLoading();
                    showToast('Booking successful! Confirmation details sent to your email.', 'success');
                    bookingForm.reset();
                    bookingModal.classList.remove('active');
                    document.body.style.overflow = 'auto';
                }, 2000);
            }
        });
    }
}

// Form validation
function validateBookingForm(data) {
    const errors = [];
    
    if (!data.from || data.from.trim() === '') {
        errors.push('Please select departure city');
    }
    if (!data.to || data.to.trim() === '') {
        errors.push('Please select destination city');
    }
    if (!data.date || data.date === '') {
        errors.push('Please select travel date');
    }
    if (!data.passengers || data.passengers < 1) {
        errors.push('Please select number of passengers');
    }
    if (!data.name || data.name.trim() === '') {
        errors.push('Please enter your name');
    }
    if (!data.email || !isValidEmail(data.email)) {
        errors.push('Please enter a valid email address');
    }
    if (!data.phone || data.phone.trim() === '') {
        errors.push('Please enter your phone number');
    }

    if (errors.length > 0) {
        showToast(errors.join(', '), 'error');
        return false;
    }
    
    return true;
}

// Email validation
function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

// Floating Action Button
function initFAB() {
    const fab = document.querySelector('.fab');
    const fabMenu = document.querySelector('.fab-menu');
    
    if (fab) {
        fab.addEventListener('click', () => {
            fabMenu.classList.toggle('active');
            fab.classList.toggle('active');
        });

        // Close FAB menu when clicking outside
        document.addEventListener('click', (e) => {
            if (!fab.contains(e.target) && !fabMenu.contains(e.target)) {
                fabMenu.classList.remove('active');
                fab.classList.remove('active');
            }
        });

        // Show/hide FAB based on scroll position
        window.addEventListener('scroll', () => {
            if (window.scrollY > 300) {
                fab.classList.add('visible');
            } else {
                fab.classList.remove('visible');
            }
        });
    }
}

// Toast notifications
function initToast() {
    // Create toast container if it doesn't exist
    if (!document.querySelector('.toast-container')) {
        const toastContainer = document.createElement('div');
        toastContainer.className = 'toast-container';
        document.body.appendChild(toastContainer);
    }
}

function showToast(message, type = 'info') {
    const toastContainer = document.querySelector('.toast-container');
    const toast = document.createElement('div');
    toast.className = `toast toast-${type}`;
    toast.innerHTML = `
        <div class="toast-content">
            <span class="toast-message">${message}</span>
            <button class="toast-close">&times;</button>
        </div>
    `;

    toastContainer.appendChild(toast);

    // Show toast
    setTimeout(() => {
        toast.classList.add('show');
    }, 100);

    // Auto remove toast
    setTimeout(() => {
        removeToast(toast);
    }, 5000);

    // Manual close
    toast.querySelector('.toast-close').addEventListener('click', () => {
        removeToast(toast);
    });
}

function removeToast(toast) {
    toast.classList.remove('show');
    setTimeout(() => {
        if (toast.parentNode) {
            toast.parentNode.removeChild(toast);
        }
    }, 300);
}

// Loading indicator
function showLoading() {
    const loading = document.createElement('div');
    loading.id = 'loading-overlay';
    loading.innerHTML = `
        <div class="loading-spinner">
            <div class="spinner"></div>
            <p>Processing your booking...</p>
        </div>
    `;
    document.body.appendChild(loading);
}

function hideLoading() {
    const loading = document.getElementById('loading-overlay');
    if (loading) {
        loading.remove();
    }
}

// Tilt effect for cards
function initTiltEffect() {
    const tiltElements = document.querySelectorAll('.tilt-effect');
    
    tiltElements.forEach(element => {
        element.addEventListener('mousemove', (e) => {
            const rect = element.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;
            
            const rotateX = (y - centerY) / centerY * -10;
            const rotateY = (x - centerX) / centerX * 10;
            
            element.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.05, 1.05, 1.05)`;
        });
        
        element.addEventListener('mouseleave', () => {
            element.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)';
        });
    });
}

// Counter animation
function initCounters() {
    const counters = document.querySelectorAll('.counter');
    
    const countObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const counter = entry.target;
                const target = parseInt(counter.getAttribute('data-target'));
                const duration = 2000; // 2 seconds
                const increment = target / (duration / 16); // 60fps
                let current = 0;
                
                const updateCounter = () => {
                    current += increment;
                    if (current < target) {
                        counter.textContent = Math.floor(current);
                        requestAnimationFrame(updateCounter);
                    } else {
                        counter.textContent = target;
                    }
                };
                
                updateCounter();
                countObserver.unobserve(counter);
            }
        });
    });
    
    counters.forEach(counter => {
        countObserver.observe(counter);
    });
}

// Utility functions
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

function throttle(func, limit) {
    let inThrottle;
    return function() {
        const args = arguments;
        const context = this;
        if (!inThrottle) {
            func.apply(context, args);
            inThrottle = true;
            setTimeout(() => inThrottle = false, limit);
        }
    };
}

// Lazy loading for images
function initLazyLoading() {
    const images = document.querySelectorAll('img[data-src]');
    
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.classList.remove('lazy');
                imageObserver.unobserve(img);
            }
        });
    });
    
    images.forEach(img => {
        imageObserver.observe(img);
    });
}

// Initialize lazy loading
document.addEventListener('DOMContentLoaded', initLazyLoading);

// Smooth scroll to top
function scrollToTop() {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
}

// Search functionality
function initSearch() {
    const searchBtn = document.querySelector('.search-btn');
    const searchModal = document.querySelector('.search-modal');
    const searchInput = document.querySelector('.search-input');
    const searchResults = document.querySelector('.search-results');
    
    if (searchBtn && searchModal) {
        searchBtn.addEventListener('click', () => {
            searchModal.classList.add('active');
            searchInput.focus();
        });
        
        searchInput.addEventListener('input', debounce((e) => {
            const query = e.target.value.trim();
            if (query.length > 2) {
                performSearch(query);
            } else {
                searchResults.innerHTML = '';
            }
        }, 300));
    }
}

function performSearch(query) {
    // Simulate search functionality
    const searchResults = document.querySelector('.search-results');
    const mockResults = [
        { title: 'Jakarta to Bali', description: 'Daily bus service from Jakarta to Bali' },
        { title: 'Surabaya to Yogyakarta', description: 'Comfortable journey with AC bus' },
        { title: 'Bandung to Semarang', description: 'Express service available' }
    ];
    
    const filteredResults = mockResults.filter(result => 
        result.title.toLowerCase().includes(query.toLowerCase()) ||
        result.description.toLowerCase().includes(query.toLowerCase())
    );
    
    searchResults.innerHTML = filteredResults.map(result => `
        <div class="search-result-item">
            <h4>${result.title}</h4>
            <p>${result.description}</p>
        </div>
    `).join('');
}

// Error handling
window.addEventListener('error', (e) => {
    console.error('JavaScript Error:', e.error);
    // You could send this to a logging service
});

// Performance monitoring
if ('performance' in window) {
    window.addEventListener('load', () => {
        setTimeout(() => {
            const perfData = performance.getEntriesByType('navigation')[0];
            console.log('Page Load Time:', perfData.loadEventEnd - perfData.loadEventStart);
        }, 0);
    });
}

// Add some interactive functionality
        document.addEventListener('DOMContentLoaded', function() {
            // Add focus effects to form inputs
            const inputs = document.querySelectorAll('input, select');
            inputs.forEach(input => {
                input.addEventListener('focus', function() {
                    this.parentElement.classList.add('focused');
                });
                
                input.addEventListener('blur', function() {
                    this.parentElement.classList.remove('focused');
                });
            });

            // Add loading animation to buttons
            const buttons = document.querySelectorAll('button');
            buttons.forEach(button => {
                button.addEventListener('click', function() {
                    if (this.type === 'submit') {
                        this.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Processing...';
                    }
                });
            });
        });

        // Your existing JavaScript functions would go here
        // Note: processForm and generateSeatSelections are defined in script.js

        let isProcessing = false;

        // Add some interactive functionality
        document.addEventListener('DOMContentLoaded', function() {
            // Add focus effects to form inputs
            const inputs = document.querySelectorAll('input, select');
            inputs.forEach(input => {
                input.addEventListener('focus', function() {
                    this.parentElement.classList.add('focused');
                });
                
                input.addEventListener('blur', function() {
                    this.parentElement.classList.remove('focused');
                });
            });

            // Enhanced form submission handling
            const form = document.querySelector('form');
            const submitButton = document.querySelector('button[type="submit"]');
            
            form.addEventListener('submit', function(e) {
                e.preventDefault(); // Prevent immediate submission
                
                if (isProcessing) {
                    return false; // Prevent double submission
                }
                
                if (processForm()) {
                    showProcessingState();
                    
                    // Simulate processing time (remove this in production)
                    setTimeout(() => {
                        // After validation and processing, submit the form
                        submitForm();
                    }, 2000); // 2 second delay for demo
                }
            });
        });

        function showProcessingState() {
            isProcessing = true;
            const submitButton = document.querySelector('button[type="submit"]');
            const formWrapper = document.querySelector('.form-wrapper');
            
            // Update button
            submitButton.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Processing...';
            submitButton.disabled = true;
            
            // Add loading class to form
            formWrapper.classList.add('loading');
            
            // Disable all form inputs
            const inputs = document.querySelectorAll('input, select');
            inputs.forEach(input => {
                input.disabled = true;
            });
        }

        function submitForm() {
            const form = document.querySelector('form');
            const formData = new FormData(form);
            
            // Here you would normally send the data to your server
            // For now, we'll just show a success message
            
            // Uncomment the line below to actually submit to your PHP file
            // form.submit();
            
            showSuccessMessage();
        }

        function showSuccessMessage() {
            const submitButton = document.querySelector('button[type="submit"]');
            const formWrapper = document.querySelector('.form-wrapper');
            
            submitButton.innerHTML = '<i class="fas fa-check"></i> Berhasil!';
            submitButton.style.background = 'linear-gradient(135deg, #28a745 0%, #20c997 100%)';
            
            formWrapper.classList.remove('loading');
            formWrapper.classList.add('success-animation');
            
            // Reset after 3 seconds (optional)
            setTimeout(() => {
                resetForm();
            }, 3000);
        }

        function resetForm() {
            isProcessing = false;
            const submitButton = document.querySelector('button[type="submit"]');
            const formWrapper = document.querySelector('.form-wrapper');
            
            // Reset button
            submitButton.innerHTML = '<i class="fas fa-check"></i> Pesan Tiket';
            submitButton.disabled = false;
            submitButton.style.background = '';
            
            // Re-enable all form inputs
            const inputs = document.querySelectorAll('input, select');
            inputs.forEach(input => {
                input.disabled = false;
            });
            
            formWrapper.classList.remove('success-animation');
        }

        // Form validation and processing
        // Note: processForm is already defined in script.js
        // This function is kept for reference but not used to avoid conflicts

document.addEventListener('DOMContentLoaded', function() {
            // Terminal Asal Dropdown
            const selectDisplayAsal = document.getElementById('selectDisplayAsal');
            const selectOptionsAsal = document.getElementById('selectOptionsAsal');
            const hiddenInputAsal = document.getElementById('terminal_asal');
            const placeholderAsal = selectDisplayAsal ? selectDisplayAsal.querySelector('.placeholder') : null;
            const arrowAsal = selectDisplayAsal ? selectDisplayAsal.querySelector('.arrow') : null;

            // Terminal Tujuan Dropdown
            const selectDisplayTujuan = document.getElementById('selectDisplayTujuan');
            const selectOptionsTujuan = document.getElementById('selectOptionsTujuan');
            const hiddenInputTujuan = document.getElementById('terminal_tujuan');
            const placeholderTujuan = selectDisplayTujuan ? selectDisplayTujuan.querySelector('.placeholder') : null;
            const arrowTujuan = selectDisplayTujuan ? selectDisplayTujuan.querySelector('.arrow') : null;

            // Check if elements exist before proceeding
            if (!selectDisplayAsal || !selectOptionsAsal || !hiddenInputAsal) {
                console.error('Terminal Asal elements not found');
                return;
            }

            if (!selectDisplayTujuan || !selectOptionsTujuan || !hiddenInputTujuan) {
                console.error('Terminal Tujuan elements not found');
                return;
            }

            // Function to handle dropdown toggle
            function toggleDropdown(display, options, arrow) {
                try {
                    // Close other dropdowns first
                    document.querySelectorAll('.select-options').forEach(opt => {
                        if (opt !== options) {
                            opt.classList.remove('show');
                        }
                    });
                    document.querySelectorAll('.arrow').forEach(arr => {
                        if (arr !== arrow) {
                            arr.classList.remove('rotate');
                        }
                    });

                    // Toggle current dropdown
                    options.classList.toggle('show');
                    if (arrow) arrow.classList.toggle('rotate');
                } catch (error) {
                    console.error('Error in toggleDropdown:', error);
                }
            }

            // Function to handle option selection
            function selectOption(value, text, placeholder, hiddenInput, options, arrow) {
                try {
                    if (placeholder) {
                        placeholder.textContent = text;
                        placeholder.classList.add('selected');
                    }
                    if (hiddenInput) hiddenInput.value = value;
                    
                    options.classList.remove('show');
                    if (arrow) arrow.classList.remove('rotate');

                    // Update other dropdown options
                    updateAvailableOptions();
                } catch (error) {
                    console.error('Error in selectOption:', error);
                }
            }

            // Function to update available options
            function updateAvailableOptions() {
                try {
                    const asalValue = hiddenInputAsal ? hiddenInputAsal.value : '';
                    const tujuanValue = hiddenInputTujuan ? hiddenInputTujuan.value : '';

                    // Update Tujuan options
                    if (selectOptionsTujuan) {
                        selectOptionsTujuan.querySelectorAll('.option').forEach(option => {
                            if (option.dataset.value === asalValue && asalValue !== '') {
                                option.style.display = 'none';
                            } else {
                                option.style.display = 'block';
                            }
                        });
                    }

                    // Update Asal options
                    if (selectOptionsAsal) {
                        selectOptionsAsal.querySelectorAll('.option').forEach(option => {
                            if (option.dataset.value === tujuanValue && tujuanValue !== '') {
                                option.style.display = 'none';
                            } else {
                                option.style.display = 'block';
                            }
                        });
                    }
                } catch (error) {
                    console.error('Error in updateAvailableOptions:', error);
                }
            }

            // Terminal Asal Event Listeners
            if (selectDisplayAsal) {
                selectDisplayAsal.addEventListener('click', function(e) {
                    e.preventDefault();
                    e.stopPropagation();
                    toggleDropdown(selectDisplayAsal, selectOptionsAsal, arrowAsal);
                });
            }

            if (selectOptionsAsal) {
                selectOptionsAsal.addEventListener('click', function(e) {
                    e.preventDefault();
                    e.stopPropagation();
                    if (e.target.classList.contains('option')) {
                        const value = e.target.getAttribute('data-value');
                        const text = e.target.textContent;
                        selectOption(value, text, placeholderAsal, hiddenInputAsal, selectOptionsAsal, arrowAsal);
                    }
                });
            }

            // Terminal Tujuan Event Listeners
            if (selectDisplayTujuan) {
                selectDisplayTujuan.addEventListener('click', function(e) {
                    e.preventDefault();
                    e.stopPropagation();
                    toggleDropdown(selectDisplayTujuan, selectOptionsTujuan, arrowTujuan);
                });
            }

            if (selectOptionsTujuan) {
                selectOptionsTujuan.addEventListener('click', function(e) {
                    e.preventDefault();
                    e.stopPropagation();
                    if (e.target.classList.contains('option')) {
                        const value = e.target.getAttribute('data-value');
                        const text = e.target.textContent;
                        selectOption(value, text, placeholderTujuan, hiddenInputTujuan, selectOptionsTujuan, arrowTujuan);
                    }
                });
            }

            // Close dropdown when clicking outside
            document.addEventListener('click', function(e) {
                if (!e.target.closest('.custom-select')) {
                    document.querySelectorAll('.select-options').forEach(options => {
                        options.classList.remove('show');
                    });
                    document.querySelectorAll('.arrow').forEach(arrow => {
                        arrow.classList.remove('rotate');
                    });
                }
            });

            // Form validation
            function validateForm() {
                try {
                    const asalValue = hiddenInputAsal ? hiddenInputAsal.value : '';
                    const tujuanValue = hiddenInputTujuan ? hiddenInputTujuan.value : '';

                    if (!asalValue) {
                        alert('Silakan pilih Terminal Asal');
                        return false;
                    }

                    if (!tujuanValue) {
                        alert('Silakan pilih Terminal Tujuan');
                        return false;
                    }

                    if (asalValue === tujuanValue) {
                        alert('Terminal Asal dan Terminal Tujuan tidak boleh sama');
                        return false;
                    }

                    return true;
                } catch (error) {
                    console.error('Error in validateForm:', error);
                    return false;
                }
            }

            // Add form submit handler if there's a form
            const form = document.querySelector('form');
            if (form) {
                form.addEventListener('submit', function(e) {
                    if (!validateForm()) {
                        e.preventDefault();
                    }
                });
            }
        });

// Add this to your main.js or create a separate connection.js file

// Function to handle the "Pesan Tiket" button click
function handlePesanTiket() {
    // Get form data from your booking interface
    const bookingData = {
        terminalAsal: document.getElementById('terminal_asal')?.value || document.querySelector('[name="terminal_asal"]')?.value,
        terminalTujuan: document.getElementById('terminal_tujuan')?.value || document.querySelector('[name="terminal_tujuan"]')?.value,
        jenisKelamin: document.getElementById('jenis_kelamin')?.value || document.querySelector('[name="jenis_kelamin"]')?.value,
        umur: document.getElementById('umur')?.value || document.querySelector('[name="umur"]')?.value,
        waktu: document.getElementById('waktu')?.value || document.querySelector('[name="waktu"]')?.value,
        jumlahTiket: document.getElementById('jumlah')?.value || document.querySelector('[name="jumlah"]')?.value
    };

    // Basic validation
    if (!validateBookingData(bookingData)) {
        return false;
    }

    // Store data in sessionStorage to pass to confirm.html
    sessionStorage.setItem('bookingData', JSON.stringify(bookingData));
    
    // Redirect to confirm.html
    window.location.href = 'confirm.html';
}

// Validation function
function validateBookingData(data) {
    const errors = [];

    if (!data.terminalAsal) {
        errors.push('Silakan pilih terminal asal');
    }
    
    if (!data.terminalTujuan) {
        errors.push('Silakan pilih terminal tujuan');
    }
    
    if (data.terminalAsal === data.terminalTujuan) {
        errors.push('Terminal asal dan tujuan tidak boleh sama');
    }
    
    if (!data.jenisKelamin) {
        errors.push('Silakan pilih jenis kelamin');
    }
    
    if (!data.umur || data.umur < 1) {
        errors.push('Silakan masukkan umur yang valid');
    }
    
    if (!data.waktu) {
        errors.push('Silakan pilih waktu pemberangkatan');
    }
    
    if (!data.jumlahTiket || data.jumlahTiket < 1 || data.jumlahTiket > 10) {
        errors.push('Jumlah tiket harus antara 1-10');
    }

    if (errors.length > 0) {
        showValidationErrors(errors);
        return false;
    }

    return true;
}

// Function to show validation errors
function showValidationErrors(errors) {
    const errorMessage = errors.join('\n');
    
    // Create or update error display
    let errorDiv = document.getElementById('validation-errors');
    if (!errorDiv) {
        errorDiv = document.createElement('div');
        errorDiv.id = 'validation-errors';
        errorDiv.className = 'validation-errors';
        document.body.appendChild(errorDiv);
    }
    
    errorDiv.innerHTML = `
        <div class="error-content">
            <i class="fas fa-exclamation-triangle"></i>
            <div class="error-messages">
                ${errors.map(error => `<div class="error-item">${error}</div>`).join('')}
            </div>
            <button onclick="closeValidationErrors()" class="close-error">
                <i class="fas fa-times"></i>
            </button>
        </div>
    `;
    
    errorDiv.style.display = 'block';
    
    // Auto-hide after 5 seconds
    setTimeout(() => {
        closeValidationErrors();
    }, 5000);
}

// Function to close validation errors
function closeValidationErrors() {
    const errorDiv = document.getElementById('validation-errors');
    if (errorDiv) {
        errorDiv.style.display = 'none';
    }
}

// Event listener setup
document.addEventListener('DOMContentLoaded', function() {
    // Find the "Pesan Tiket" button and attach the handler
    const pesanTiketBtn = document.querySelector('.btn-success, [onclick*="Pesan"], button[type="submit"]');
    
    if (pesanTiketBtn) {
        // Remove any existing onclick handlers
        pesanTiketBtn.removeAttribute('onclick');
        
        // Add new click handler
        pesanTiketBtn.addEventListener('click', function(e) {
            e.preventDefault(); // Prevent default form submission
            handlePesanTiket();
        });
    }
    
    // Alternative: If the button is inside a form
    const bookingForm = document.querySelector('form');
    if (bookingForm) {
        bookingForm.addEventListener('submit', function(e) {
            e.preventDefault();
            handlePesanTiket();
        });
    }
});

// Function to be used in confirm.html to retrieve booking data
function getBookingData() {
    const storedData = sessionStorage.getItem('bookingData');
    if (storedData) {
        return JSON.parse(storedData);
    }
    return null;
}

// Function to clear booking data (call this after successful booking)
function clearBookingData() {
    sessionStorage.removeItem('bookingData');
}

// Add CSS for validation errors (you can move this to your CSS file)
const errorStyles = `
<style>
.validation-errors {
    position: fixed;
    top: 20px;
    right: 20px;
    z-index: 9999;
    max-width: 400px;
    background: linear-gradient(135deg, #ff6b6b, #ff8e8e);
    color: white;
    border-radius: 12px;
    box-shadow: 0 10px 30px rgba(255, 107, 107, 0.3);
    animation: slideInRight 0.3s ease-out;
    display: none;
}

.error-content {
    padding: 20px;
    position: relative;
}

.error-content i.fa-exclamation-triangle {
    font-size: 24px;
    margin-bottom: 10px;
    display: block;
}

.error-messages {
    margin: 10px 0;
}

.error-item {
    margin: 5px 0;
    padding: 5px 0;
    border-bottom: 1px solid rgba(255, 255, 255, 0.2);
}

.error-item:last-child {
    border-bottom: none;
}

.close-error {
    position: absolute;
    top: 10px;
    right: 10px;
    background: none;
    border: none;
    color: white;
    font-size: 18px;
    cursor: pointer;
    padding: 5px;
    border-radius: 50%;
    width: 30px;
    height: 30px;
    display: flex;
    align-items: center;
    justify-content: center;
}

.close-error:hover {
    background: rgba(255, 255, 255, 0.2);
}

@keyframes slideInRight {
    from {
        transform: translateX(100%);
        opacity: 0;
    }
    to {
        transform: translateX(0);
        opacity: 1;
    }
}

@media (max-width: 768px) {
    .validation-errors {
        top: 10px;
        right: 10px;
        left: 10px;
        max-width: none;
    }
}
</style>
`;

// Inject styles
document.head.insertAdjacentHTML('beforeend', errorStyles);