// Main JavaScript - Core Functionality
class HatCraftApp {
    constructor() {
        this.init();
    }

    init() {
        this.setupLoadingScreen();
        this.setupCustomCursor();
        this.setupNavigation();
        this.setupScrollEffects();
        this.setupAnimations();
        this.setupFavoritesButtons();
        this.setupParallax();
        this.setupDynamicBackground();
        
        console.log('🎩 HATCRAFT - تم تحميل الموقع بنجاح');
    }

    setupLoadingScreen() {
        window.addEventListener('load', () => {
            setTimeout(() => {
                const loadingScreen = document.getElementById('loadingScreen');
                if (loadingScreen) {
                    loadingScreen.classList.add('hidden');
                }
            }, 2000);
        });
    }

    setupCustomCursor() {
        const cursor = document.getElementById('cursor');
        if (!cursor) return;

        const hoverElements = document.querySelectorAll('a, button, .collection-item, .nav-icons i');

        document.addEventListener('mousemove', (e) => {
            cursor.style.left = e.clientX + 'px';
            cursor.style.top = e.clientY + 'px';
        });

        hoverElements.forEach(element => {
            element.addEventListener('mouseenter', () => {
                cursor.classList.add('hover');
            });
            element.addEventListener('mouseleave', () => {
                cursor.classList.remove('hover');
            });
        });
    }

    setupNavigation() {
        const navbar = document.getElementById('navbar');
        
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

    setupScrollEffects() {
        // Intersection Observer for scroll animations
        const observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';
                    entry.target.classList.add('visible');
                }
            });
        }, observerOptions);

        // Observe elements for animation
        document.querySelectorAll('.collection-item, .story-content, .story-image, .fade-in-on-scroll').forEach(el => {
            el.style.opacity = '0';
            el.style.transform = 'translateY(30px)';
            el.style.transition = 'all 0.6s ease';
            observer.observe(el);
        });
    }

    setupAnimations() {
        // Collection item hover effects
        document.querySelectorAll('.collection-item').forEach(item => {
            item.addEventListener('mouseenter', function() {
                this.style.transform = 'translateY(-10px) scale(1.02)';
            });
            item.addEventListener('mouseleave', function() {
                this.style.transform = 'translateY(0) scale(1)';
            });
        });

        // Add stagger animation to collection grid
        const collectionGrid = document.querySelector('.collection-grid');
        if (collectionGrid) {
            collectionGrid.classList.add('stagger-animation');
        }
    }

    setupFavoritesButtons() {
        // Initialize favorites button states
        document.querySelectorAll('.favorite-btn').forEach(btn => {
            const productElement = btn.closest('.collection-item');
            if (productElement && window.cartManager) {
                const productId = productElement.dataset.productId;
                const isFavorite = window.cartManager.isFavorite(productId);
                window.cartManager.updateFavoriteButton(btn, isFavorite);
            }
        });
    }

    setupParallax() {
        // Parallax effect for hero video
        window.addEventListener('scroll', () => {
            const scrolled = window.pageYOffset;
            const rate = scrolled * -0.5;
            const heroVideo = document.querySelector('.hero-video');
            if (heroVideo) {
                heroVideo.style.transform = `translateY(${rate}px)`;
            }
        });
    }

    setupDynamicBackground() {
        // Dynamic background colors based on scroll position
        const sections = document.querySelectorAll('section');
        const colors = ['#0a0a0a', '#111111', '#1a1a1a', '#d4af37'];
        
        window.addEventListener('scroll', () => {
            const scrollPosition = window.scrollY;
            sections.forEach((section, index) => {
                const sectionTop = section.offsetTop;
                const sectionHeight = section.offsetHeight;
                
                if (scrollPosition >= sectionTop - window.innerHeight / 2 && 
                    scrollPosition < sectionTop + sectionHeight - window.innerHeight / 2) {
                    document.body.style.backgroundColor = colors[index % colors.length];
                }
            });
        });
    }
}

// Initialize the app when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    new HatCraftApp();
}); 