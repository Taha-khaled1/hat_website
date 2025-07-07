// Advanced Animations Controller
class AnimationController {
    constructor() {
        this.animationQueue = [];
        this.isAnimating = false;
        this.init();
    }

    init() {
        this.setupScrollTriggers();
        this.setupHoverAnimations();
        this.setupTextAnimations();
        this.setupImageAnimations();
    }

    setupScrollTriggers() {
        // Advanced scroll-triggered animations
        const scrollTriggers = document.querySelectorAll('[data-animate]');
        
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const animationType = entry.target.dataset.animate;
                    this.triggerAnimation(entry.target, animationType);
                }
            });
        }, {
            threshold: 0.2,
            rootMargin: '0px 0px -100px 0px'
        });

        scrollTriggers.forEach(trigger => {
            observer.observe(trigger);
        });
    }

    triggerAnimation(element, type) {
        switch(type) {
            case 'fadeInUp':
                this.fadeInUp(element);
                break;
            case 'slideInRight':
                this.slideInRight(element);
                break;
            case 'slideInLeft':
                this.slideInLeft(element);
                break;
            case 'zoomIn':
                this.zoomIn(element);
                break;
            case 'rotateIn':
                this.rotateIn(element);
                break;
            default:
                this.fadeInUp(element);
        }
    }

    fadeInUp(element) {
        element.style.opacity = '0';
        element.style.transform = 'translateY(50px)';
        element.style.transition = 'all 0.8s cubic-bezier(0.25, 0.46, 0.45, 0.94)';
        
        setTimeout(() => {
            element.style.opacity = '1';
            element.style.transform = 'translateY(0)';
        }, 100);
    }

    slideInRight(element) {
        element.style.opacity = '0';
        element.style.transform = 'translateX(-100px)';
        element.style.transition = 'all 0.8s cubic-bezier(0.25, 0.46, 0.45, 0.94)';
        
        setTimeout(() => {
            element.style.opacity = '1';
            element.style.transform = 'translateX(0)';
        }, 100);
    }

    slideInLeft(element) {
        element.style.opacity = '0';
        element.style.transform = 'translateX(100px)';
        element.style.transition = 'all 0.8s cubic-bezier(0.25, 0.46, 0.45, 0.94)';
        
        setTimeout(() => {
            element.style.opacity = '1';
            element.style.transform = 'translateX(0)';
        }, 100);
    }

    zoomIn(element) {
        element.style.opacity = '0';
        element.style.transform = 'scale(0.8)';
        element.style.transition = 'all 0.8s cubic-bezier(0.25, 0.46, 0.45, 0.94)';
        
        setTimeout(() => {
            element.style.opacity = '1';
            element.style.transform = 'scale(1)';
        }, 100);
    }

    rotateIn(element) {
        element.style.opacity = '0';
        element.style.transform = 'rotate(-10deg) scale(0.9)';
        element.style.transition = 'all 0.8s cubic-bezier(0.25, 0.46, 0.45, 0.94)';
        
        setTimeout(() => {
            element.style.opacity = '1';
            element.style.transform = 'rotate(0deg) scale(1)';
        }, 100);
    }

    setupHoverAnimations() {
        // Enhanced hover effects
        const hoverElements = document.querySelectorAll('.hover-effect');
        
        hoverElements.forEach(element => {
            element.addEventListener('mouseenter', () => {
                this.addHoverEffect(element);
            });
            
            element.addEventListener('mouseleave', () => {
                this.removeHoverEffect(element);
            });
        });
    }

    addHoverEffect(element) {
        element.style.transform = 'translateY(-10px) scale(1.05)';
        element.style.boxShadow = '0 20px 40px rgba(212, 175, 55, 0.3)';
        element.style.transition = 'all 0.3s cubic-bezier(0.25, 0.46, 0.45, 0.94)';
    }

    removeHoverEffect(element) {
        element.style.transform = 'translateY(0) scale(1)';
        element.style.boxShadow = 'none';
    }

    setupTextAnimations() {
        // Typewriter effect for Arabic text
        const typewriterElements = document.querySelectorAll('.typewriter-arabic');
        
        typewriterElements.forEach(element => {
            this.typewriterEffect(element);
        });
    }

    typewriterEffect(element) {
        const text = element.textContent;
        element.textContent = '';
        element.style.borderRight = '2px solid #d4af37';
        
        let i = 0;
        const timer = setInterval(() => {
            if (i < text.length) {
                element.textContent += text.charAt(i);
                i++;
            } else {
                clearInterval(timer);
                // Remove cursor after animation
                setTimeout(() => {
                    element.style.borderRight = 'none';
                }, 1000);
            }
        }, 100);
    }

    setupImageAnimations() {
        // Parallax effect for images
        const parallaxImages = document.querySelectorAll('.parallax-image');
        
        window.addEventListener('scroll', () => {
            const scrolled = window.pageYOffset;
            
            parallaxImages.forEach(image => {
                const rate = scrolled * -0.3;
                image.style.transform = `translateY(${rate}px)`;
            });
        });
    }

    // Utility function to animate elements in sequence
    animateSequence(elements, delay = 200) {
        elements.forEach((element, index) => {
            setTimeout(() => {
                this.fadeInUp(element);
            }, index * delay);
        });
    }

    // Utility function to create custom animations
    createCustomAnimation(element, keyframes, options = {}) {
        const defaultOptions = {
            duration: 1000,
            easing: 'ease-out',
            fill: 'forwards'
        };
        
        const animationOptions = { ...defaultOptions, ...options };
        
        return element.animate(keyframes, animationOptions);
    }
}

// Initialize animations when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    new AnimationController();
}); 