
/* 
 * SCRIPT.JS - JavaScript functionality for beginner-friendly landing page
 * This file contains all interactive features and form handling
 */

// ============================================
// INITIALIZATION - Run when page loads
// ============================================

document.addEventListener('DOMContentLoaded', function() {
    console.log('🚀 Landing page loaded successfully!');
    
    // Initialize all functionality when DOM is ready
    initializeLucideIcons();
    initializeFormHandling();
    initializeSmoothScrolling();
    initializeAnimations();
    
    console.log('✅ All features initialized');
});

// ============================================
// ICON INITIALIZATION
// ============================================

/**
 * Initialize Lucide icons
 * This function activates all the icons in the HTML
 */
function initializeLucideIcons() {
    try {
        // Check if Lucide is loaded
        if (typeof lucide !== 'undefined') {
            lucide.createIcons();
            console.log('✅ Lucide icons initialized');
        } else {
            console.warn('⚠️ Lucide library not found');
        }
    } catch (error) {
        console.error('❌ Error initializing icons:', error);
    }
}

// ============================================
// FORM HANDLING
// ============================================

/**
 * Initialize contact form functionality
 * Handles form submission and validation
 */
function initializeFormHandling() {
    const contactForm = document.getElementById('contactForm');
    
    if (!contactForm) {
        console.warn('⚠️ Contact form not found');
        return;
    }
    
    // Add event listener for form submission
    contactForm.addEventListener('submit', handleFormSubmission);
    
    // Add real-time validation for better UX
    const formInputs = contactForm.querySelectorAll('input, textarea');
    formInputs.forEach(input => {
        input.addEventListener('blur', validateInput);
        input.addEventListener('input', clearErrors);
    });
    
    console.log('✅ Form handling initialized');
}

/**
 * Handle form submission
 * @param {Event} event - The form submission event
 */
function handleFormSubmission(event) {
    // Prevent the default form submission behavior
    event.preventDefault();
    
    console.log('📝 Form submission attempted');
    
    // Get form data
    const formData = getFormData(event.target);
    
    // Validate the form
    if (!validateForm(formData)) {
        console.log('❌ Form validation failed');
        return;
    }
    
    // Simulate form processing
    showLoadingState();
    
    // Simulate server delay (remove this in real applications)
    setTimeout(() => {
        hideLoadingState();
        showSuccessMessage(formData);
        resetForm(event.target);
    }, 1500);
}

/**
 * Extract form data into an object
 * @param {HTMLFormElement} form - The form element
 * @returns {Object} Form data object
 */
function getFormData(form) {
    const formData = new FormData(form);
    const data = {};
    
    // Convert FormData to regular object
    for (let [key, value] of formData.entries()) {
        data[key] = value.trim();
    }
    
    console.log('📊 Form data collected:', data);
    return data;
}

/**
 * Validate form data
 * @param {Object} data - Form data to validate
 * @returns {boolean} Whether the form is valid
 */
function validateForm(data) {
    let isValid = true;
    const errors = [];
    
    // Validate name (required, min 2 characters)
    if (!data.name || data.name.length < 2) {
        showFieldError('name', 'Name must be at least 2 characters long');
        errors.push('Invalid name');
        isValid = false;
    }
    
    // Validate email (required, valid format)
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!data.email || !emailRegex.test(data.email)) {
        showFieldError('email', 'Please enter a valid email address');
        errors.push('Invalid email');
        isValid = false;
    }
    
    // Validate message (required, min 10 characters)
    if (!data.message || data.message.length < 10) {
        showFieldError('message', 'Message must be at least 10 characters long');
        errors.push('Invalid message');
        isValid = false;
    }
    
    if (errors.length > 0) {
        console.log('❌ Validation errors:', errors);
    }
    
    return isValid;
}

/**
 * Show error message for a specific field
 * @param {string} fieldName - Name of the field
 * @param {string} message - Error message to display
 */
function showFieldError(fieldName, message) {
    const field = document.getElementById(fieldName);
    if (!field) return;
    
    // Remove existing error
    clearFieldError(fieldName);
    
    // Add error styling
    field.style.borderColor = '#ef4444';
    field.style.boxShadow = '0 0 0 3px rgba(239, 68, 68, 0.1)';
    
    // Create and insert error message
    const errorDiv = document.createElement('div');
    errorDiv.className = 'error-message';
    errorDiv.style.cssText = 'color: #ef4444; font-size: 0.875rem; margin-top: 0.25rem;';
    errorDiv.textContent = message;
    
    field.parentNode.appendChild(errorDiv);
}

/**
 * Clear error message for a specific field
 * @param {string} fieldName - Name of the field
 */
function clearFieldError(fieldName) {
    const field = document.getElementById(fieldName);
    if (!field) return;
    
    // Reset field styling
    field.style.borderColor = '';
    field.style.boxShadow = '';
    
    // Remove error message
    const existingError = field.parentNode.querySelector('.error-message');
    if (existingError) {
        existingError.remove();
    }
}

/**
 * Validate individual input on blur
 * @param {Event} event - The blur event
 */
function validateInput(event) {
    const field = event.target;
    const value = field.value.trim();
    
    clearFieldError(field.id);
    
    // Field-specific validation
    switch (field.id) {
        case 'name':
            if (value && value.length < 2) {
                showFieldError('name', 'Name must be at least 2 characters long');
            }
            break;
        case 'email':
            if (value && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) {
                showFieldError('email', 'Please enter a valid email address');
            }
            break;
        case 'message':
            if (value && value.length < 10) {
                showFieldError('message', 'Message must be at least 10 characters long');
            }
            break;
    }
}

/**
 * Clear errors when user starts typing
 * @param {Event} event - The input event
 */
function clearErrors(event) {
    clearFieldError(event.target.id);
}

/**
 * Show loading state on form submission
 */
function showLoadingState() {
    const submitButton = document.querySelector('.contact-form button[type="submit"]');
    if (submitButton) {
        submitButton.textContent = 'Sending...';
        submitButton.disabled = true;
        submitButton.style.opacity = '0.7';
    }
}

/**
 * Hide loading state
 */
function hideLoadingState() {
    const submitButton = document.querySelector('.contact-form button[type="submit"]');
    if (submitButton) {
        submitButton.textContent = 'Send Message';
        submitButton.disabled = false;
        submitButton.style.opacity = '1';
    }
}

/**
 * Show success message with form data
 * @param {Object} formData - The submitted form data
 */
function showSuccessMessage(formData) {
    // Create success message with submitted data
    const message = `
🎉 Thank you, ${formData.name}!

Your message has been received successfully!

Here's what you submitted:
• Name: ${formData.name}
• Email: ${formData.email}
• Message: ${formData.message.substring(0, 100)}${formData.message.length > 100 ? '...' : ''}

We'll get back to you soon! 📧
    `;
    
    // Show alert with the message
    alert(message);
    
    console.log('✅ Form submitted successfully:', formData);
}

/**
 * Reset the form after successful submission
 * @param {HTMLFormElement} form - The form to reset
 */
function resetForm(form) {
    form.reset();
    console.log('🔄 Form reset completed');
}

// ============================================
// SMOOTH SCROLLING
// ============================================

/**
 * Initialize smooth scrolling for anchor links
 */
function initializeSmoothScrolling() {
    // Find all anchor links that point to sections on the same page
    const anchorLinks = document.querySelectorAll('a[href^="#"]');
    
    anchorLinks.forEach(link => {
        link.addEventListener('click', handleSmoothScroll);
    });
    
    if (anchorLinks.length > 0) {
        console.log(`✅ Smooth scrolling initialized for ${anchorLinks.length} links`);
    }
}

/**
 * Handle smooth scrolling to anchor targets
 * @param {Event} event - The click event
 */
function handleSmoothScroll(event) {
    const targetId = event.target.getAttribute('href');
    
    // Check if it's a valid anchor link
    if (!targetId || targetId === '#') return;
    
    const targetElement = document.querySelector(targetId);
    
    if (targetElement) {
        event.preventDefault();
        
        // Smooth scroll to target
        targetElement.scrollIntoView({
            behavior: 'smooth',
            block: 'start'
        });
        
        console.log(`🔗 Smooth scrolled to: ${targetId}`);
    }
}

// ============================================
// ANIMATIONS & EFFECTS
// ============================================

/**
 * Initialize scroll-based animations
 */
function initializeAnimations() {
    // Create intersection observer for fade-in animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver(handleIntersection, observerOptions);
    
    // Observe elements that should animate on scroll
    const animatedElements = document.querySelectorAll('.feature-card, .section-header');
    animatedElements.forEach(element => {
        observer.observe(element);
    });
    
    console.log(`✅ Animation observer initialized for ${animatedElements.length} elements`);
}

/**
 * Handle intersection observer callback
 * @param {IntersectionObserverEntry[]} entries - Observed elements
 */
function handleIntersection(entries) {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            // Add animation class when element comes into view
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
            entry.target.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        }
    });
}

// ============================================
// BUTTON INTERACTIONS
// ============================================

/**
 * Initialize button interactions and effects
 */
document.addEventListener('DOMContentLoaded', function() {
    // Add click handler for primary CTA button
    const primaryCta = document.getElementById('primaryCta');
    if (primaryCta) {
        primaryCta.addEventListener('click', handlePrimaryCta);
    }
    
    // Add ripple effect to all buttons
    const buttons = document.querySelectorAll('.btn');
    buttons.forEach(button => {
        button.addEventListener('click', createRippleEffect);
    });
});

/**
 * Handle primary CTA button click
 * @param {Event} event - The click event
 */
function handlePrimaryCta(event) {
    console.log('🎯 Primary CTA clicked');
    
    // Scroll to contact form
    const contactSection = document.getElementById('contact');
    if (contactSection) {
        contactSection.scrollIntoView({
            behavior: 'smooth',
            block: 'start'
        });
    }
    
    // Focus on the name field after a short delay
    setTimeout(() => {
        const nameField = document.getElementById('name');
        if (nameField) {
            nameField.focus();
        }
    }, 800);
}

/**
 * Create ripple effect on button click
 * @param {Event} event - The click event
 */
function createRippleEffect(event) {
    const button = event.currentTarget;
    const rect = button.getBoundingClientRect();
    const size = Math.max(rect.width, rect.height);
    const x = event.clientX - rect.left - size / 2;
    const y = event.clientY - rect.top - size / 2;
    
    const ripple = document.createElement('span');
    ripple.style.cssText = `
        position: absolute;
        width: ${size}px;
        height: ${size}px;
        left: ${x}px;
        top: ${y}px;
        background: rgba(255, 255, 255, 0.3);
        border-radius: 50%;
        transform: scale(0);
        animation: ripple 0.6s linear;
        pointer-events: none;
    `;
    
    // Add ripple animation keyframes if not already added
    if (!document.querySelector('#ripple-style')) {
        const style = document.createElement('style');
        style.id = 'ripple-style';
        style.textContent = `
            @keyframes ripple {
                to {
                    transform: scale(4);
                    opacity: 0;
                }
            }
        `;
        document.head.appendChild(style);
    }
    
    button.style.position = 'relative';
    button.style.overflow = 'hidden';
    button.appendChild(ripple);
    
    // Remove ripple after animation
    setTimeout(() => {
        ripple.remove();
    }, 600);
}

// ============================================
// UTILITY FUNCTIONS
// ============================================

/**
 * Debounce function to limit how often a function can be called
 * @param {Function} func - Function to debounce
 * @param {number} wait - Wait time in milliseconds
 * @returns {Function} Debounced function
 */
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

/**
 * Check if user prefers reduced motion
 * @returns {boolean} Whether user prefers reduced motion
 */
function prefersReducedMotion() {
    return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
}

// ============================================
// ERROR HANDLING
// ============================================

/**
 * Global error handler for unhandled errors
 */
window.addEventListener('error', function(event) {
    console.error('❌ Global error caught:', event.error);
    
    // In a production app, you might want to send this to an error tracking service
    // For learning purposes, we'll just log it
});

/**
 * Handle unhandled promise rejections
 */
window.addEventListener('unhandledrejection', function(event) {
    console.error('❌ Unhandled promise rejection:', event.reason);
    
    // Prevent the default browser behavior
    event.preventDefault();
});

// ============================================
// DEVELOPMENT HELPERS
// ============================================

/**
 * Log performance information (for learning purposes)
 */
if (window.performance) {
    window.addEventListener('load', function() {
        const loadTime = window.performance.timing.loadEventEnd - window.performance.timing.navigationStart;
        console.log(`⚡ Page loaded in ${loadTime}ms`);
    });
}

console.log('📜 Script.js loaded and ready!');