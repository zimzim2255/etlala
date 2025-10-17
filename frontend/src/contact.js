// Contact Page JavaScript

(function() {
    'use strict';

    // FAQ Accordion
    function initFAQ() {
        const faqItems = document.querySelectorAll('.faq-item');
        
        faqItems.forEach(item => {
            const question = item.querySelector('.faq-question');
            
            question.addEventListener('click', () => {
                const isActive = item.classList.contains('active');
                
                // Close all other items
                faqItems.forEach(otherItem => {
                    if (otherItem !== item) {
                        otherItem.classList.remove('active');
                    }
                });
                
                // Toggle current item
                if (isActive) {
                    item.classList.remove('active');
                } else {
                    item.classList.add('active');
                }
            });
        });
    }

    // Form Validation
    function validateEmail(email) {
        const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return re.test(email);
    }

    function validatePhone(phone) {
        // Allow empty phone (it's optional)
        if (!phone) return true;
        // Basic phone validation (digits, spaces, +, -, ())
        const re = /^[\d\s\+\-\(\)]+$/;
        return re.test(phone) && phone.replace(/\D/g, '').length >= 8;
    }

    // Form Submission
    function initContactForm() {
        const form = document.getElementById('contactForm');
        const submitBtn = form.querySelector('.form-submit-btn');
        const btnText = submitBtn.querySelector('.btn-text');
        const btnLoader = submitBtn.querySelector('.btn-loader');
        const formMessage = document.getElementById('formMessage');

        form.addEventListener('submit', async (e) => {
            e.preventDefault();

            // Get form data
            const formData = {
                firstName: form.firstName.value.trim(),
                lastName: form.lastName.value.trim(),
                email: form.email.value.trim(),
                phone: form.phone.value.trim(),
                subject: form.subject.value,
                message: form.message.value.trim(),
                newsletter: form.newsletter.checked
            };

            // Validate
            if (!formData.firstName || !formData.lastName) {
                showMessage('Please enter your full name.', 'error');
                return;
            }

            if (!validateEmail(formData.email)) {
                showMessage('Please enter a valid email address.', 'error');
                return;
            }

            if (!validatePhone(formData.phone)) {
                showMessage('Please enter a valid phone number.', 'error');
                return;
            }

            if (!formData.subject) {
                showMessage('Please select a subject.', 'error');
                return;
            }

            if (!formData.message || formData.message.length < 10) {
                showMessage('Please enter a message (at least 10 characters).', 'error');
                return;
            }

            // Show loading state
            submitBtn.disabled = true;
            btnText.style.display = 'none';
            btnLoader.style.display = 'block';
            formMessage.style.display = 'none';

            // Simulate API call (replace with actual API endpoint)
            try {
                await simulateFormSubmission(formData);
                
                // Success
                showMessage('Thank you for your message! We\'ll get back to you within 24 hours.', 'success');
                form.reset();
                
                // Store in localStorage for demo purposes
                saveContactSubmission(formData);
                
            } catch (error) {
                // Error
                showMessage('Sorry, something went wrong. Please try again or email us directly at info@etlala.com', 'error');
            } finally {
                // Reset button state
                submitBtn.disabled = false;
                btnText.style.display = 'block';
                btnLoader.style.display = 'none';
            }
        });

        function showMessage(message, type) {
            formMessage.textContent = message;
            formMessage.className = 'form-message ' + type;
            formMessage.style.display = 'block';
            
            // Scroll to message
            formMessage.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
            
            // Auto-hide after 8 seconds
            setTimeout(() => {
                formMessage.style.display = 'none';
            }, 8000);
        }

        function simulateFormSubmission(data) {
            // Simulate network delay
            return new Promise((resolve, reject) => {
                setTimeout(() => {
                    // Simulate 95% success rate
                    if (Math.random() > 0.05) {
                        resolve(data);
                    } else {
                        reject(new Error('Network error'));
                    }
                }, 1500);
            });
        }

        function saveContactSubmission(data) {
            try {
                const submissions = JSON.parse(localStorage.getItem('contactSubmissions') || '[]');
                submissions.push({
                    ...data,
                    timestamp: new Date().toISOString()
                });
                // Keep only last 10 submissions
                if (submissions.length > 10) {
                    submissions.shift();
                }
                localStorage.setItem('contactSubmissions', JSON.stringify(submissions));
            } catch (e) {
                console.log('Could not save to localStorage:', e);
            }
        }
    }

    // Real-time input validation feedback
    function initInputValidation() {
        const emailInput = document.getElementById('email');
        const phoneInput = document.getElementById('phone');

        if (emailInput) {
            emailInput.addEventListener('blur', () => {
                if (emailInput.value && !validateEmail(emailInput.value)) {
                    emailInput.style.borderColor = '#dc3545';
                } else {
                    emailInput.style.borderColor = '';
                }
            });

            emailInput.addEventListener('input', () => {
                if (emailInput.style.borderColor === 'rgb(220, 53, 69)') {
                    emailInput.style.borderColor = '';
                }
            });
        }

        if (phoneInput) {
            phoneInput.addEventListener('blur', () => {
                if (phoneInput.value && !validatePhone(phoneInput.value)) {
                    phoneInput.style.borderColor = '#dc3545';
                } else {
                    phoneInput.style.borderColor = '';
                }
            });

            phoneInput.addEventListener('input', () => {
                if (phoneInput.style.borderColor === 'rgb(220, 53, 69)') {
                    phoneInput.style.borderColor = '';
                }
            });
        }
    }

    // Character counter for message textarea
    function initCharacterCounter() {
        const messageTextarea = document.getElementById('message');
        if (!messageTextarea) return;

        const formGroup = messageTextarea.closest('.form-group');
        const label = formGroup.querySelector('.form-label');
        
        const counter = document.createElement('span');
        counter.className = 'char-counter';
        counter.style.cssText = 'font-size: 12px; color: #8A8A8A; margin-left: 8px;';
        label.appendChild(counter);

        function updateCounter() {
            const length = messageTextarea.value.length;
            counter.textContent = `(${length} characters)`;
            
            if (length > 0 && length < 10) {
                counter.style.color = '#dc3545';
            } else if (length >= 10) {
                counter.style.color = '#6E8B72';
            } else {
                counter.style.color = '#8A8A8A';
            }
        }

        messageTextarea.addEventListener('input', updateCounter);
        updateCounter();
    }

    // Smooth scroll for anchor links
    function initSmoothScroll() {
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', function (e) {
                const href = this.getAttribute('href');
                if (href === '#') return;
                
                e.preventDefault();
                const target = document.querySelector(href);
                if (target) {
                    target.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                }
            });
        });
    }

    // Initialize everything when DOM is ready
    document.addEventListener('DOMContentLoaded', () => {
        initFAQ();
        initContactForm();
        initInputValidation();
        initCharacterCounter();
        initSmoothScroll();
    });

})();
