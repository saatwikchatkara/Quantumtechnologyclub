
// Particle System
class ParticleSystem {
    constructor() {
        this.particles = [];
        this.container = document.getElementById('particles');
        this.maxParticles = 50;
        this.init();
    }

    init() {
        for (let i = 0; i < this.maxParticles; i++) {
            this.createParticle();
        }
        this.animate();
    }

    createParticle() {
        const particle = document.createElement('div');
        particle.className = 'particle';
        
        const size = Math.random() * 4 + 1;
        const x = Math.random() * window.innerWidth;
        const y = Math.random() * window.innerHeight;
        const opacity = Math.random() * 0.5 + 0.2;
        
        particle.style.width = size + 'px';
        particle.style.height = size + 'px';
        particle.style.left = x + 'px';
        particle.style.top = y + 'px';
        particle.style.opacity = opacity;
        particle.style.animationDelay = Math.random() * 6 + 's';
        particle.style.animationDuration = (Math.random() * 4 + 4) + 's';
        
        this.container.appendChild(particle);
        this.particles.push({
            element: particle,
            x: x,
            y: y,
            vx: (Math.random() - 0.5) * 0.5,
            vy: (Math.random() - 0.5) * 0.5
        });
    }

    animate() {
        this.particles.forEach(particle => {
            particle.x += particle.vx;
            particle.y += particle.vy;

            if (particle.x < 0 || particle.x > window.innerWidth) {
                particle.vx *= -1;
            }
            if (particle.y < 0 || particle.y > window.innerHeight) {
                particle.vy *= -1;
            }

            particle.element.style.left = particle.x + 'px';
            particle.element.style.top = particle.y + 'px';
        });

        requestAnimationFrame(() => this.animate());
    }
}

// Navigation Functionality
class Navigation {
    constructor() {
        this.navbar = document.getElementById('navbar');
        this.hamburger = document.getElementById('hamburger');
        this.navMenu = document.getElementById('navMenu');
        this.navLinks = document.querySelectorAll('.nav-link');
        this.init();
    }

    init() {
        this.hamburger.addEventListener('click', () => this.toggleMenu());
        this.navLinks.forEach(link => {
            link.addEventListener('click', (e) => this.handleNavClick(e));
        });
        
        window.addEventListener('scroll', () => this.handleScroll());
    }

    toggleMenu() {
        this.navMenu.classList.toggle('active');
        this.hamburger.classList.toggle('active');
    }

    handleNavClick(e) {
        e.preventDefault();
        const targetId = e.target.getAttribute('href');
        const targetSection = document.querySelector(targetId);
        
        if (targetSection) {
            targetSection.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
        
        // Close mobile menu
        this.navMenu.classList.remove('active');
        this.hamburger.classList.remove('active');
    }

    handleScroll() {
        if (window.scrollY > 100) {
            this.navbar.style.background = 'rgba(10, 10, 15, 0.98)';
            this.navbar.style.backdropFilter = 'blur(30px)';
        } else {
            this.navbar.style.background = 'rgba(10, 10, 15, 0.95)';
            this.navbar.style.backdropFilter = 'blur(20px)';
        }
    }
}

// Theme Toggle
class ThemeToggle {
    constructor() {
        this.toggle = document.getElementById('themeToggle');
        this.body = document.body;
        this.icon = this.toggle.querySelector('i');
        this.init();
    }

    init() {
        // Check for saved theme
        const savedTheme = localStorage.getItem('theme');
        if (savedTheme === 'light') {
            this.enableLightTheme();
        }

        this.toggle.addEventListener('click', () => this.toggleTheme());
    }

    toggleTheme() {
        if (this.body.classList.contains('light-theme')) {
            this.enableDarkTheme();
        } else {
            this.enableLightTheme();
        }
    }

    enableLightTheme() {
        this.body.classList.add('light-theme');
        this.icon.className = 'fas fa-moon';
        localStorage.setItem('theme', 'light');
    }

    enableDarkTheme() {
        this.body.classList.remove('light-theme');
        this.icon.className = 'fas fa-sun';
        localStorage.setItem('theme', 'dark');
    }
}

// Projects Carousel
class ProjectsCarousel {
    constructor() {
        this.slides = document.querySelectorAll('.project-slide');
        this.indicators = document.querySelectorAll('.indicator');
        this.currentSlide = 0;
        this.init();
    }

    init() {
        this.showSlide(0);
        setInterval(() => this.nextSlide(), 5000); // Auto-advance every 5 seconds
    }

    showSlide(index) {
        this.slides.forEach((slide, i) => {
            slide.classList.remove('active');
            if (i === index) {
                slide.classList.add('active');
            }
        });

        this.indicators.forEach((indicator, i) => {
            indicator.classList.remove('active');
            if (i === index) {
                indicator.classList.add('active');
            }
        });

        this.currentSlide = index;
    }

    nextSlide() {
        const next = (this.currentSlide + 1) % this.slides.length;
        this.showSlide(next);
    }

    prevSlide() {
        const prev = (this.currentSlide - 1 + this.slides.length) % this.slides.length;
        this.showSlide(prev);
    }
}

// Animation Observer
class AnimationObserver {
    constructor() {
        this.observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        };
        this.init();
    }

    init() {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('aos-animate');
                }
            });
        }, this.observerOptions);

        // Observe all elements with data-aos attribute
        document.querySelectorAll('[data-aos]').forEach(el => {
            observer.observe(el);
        });
    }
}

// Contact Form Handler
class ContactForm {
    constructor() {
        this.form = document.getElementById('contactForm');
        this.init();
    }

    init() {
        this.form.addEventListener('submit', (e) => this.handleSubmit(e));
    }

    handleSubmit(e) {
        e.preventDefault();
        
        // Get form data
        const formData = new FormData(this.form);
        const data = Object.fromEntries(formData);
        
        // Simulate form submission
        this.showSuccess();
        this.form.reset();
    }

    showSuccess() {
        const submitBtn = this.form.querySelector('.submit-btn');
        const originalText = submitBtn.innerHTML;
        
        submitBtn.innerHTML = '<span>Message Sent!</span> <i class="fas fa-check"></i>';
        submitBtn.style.background = 'linear-gradient(45deg, #10b981, #059669)';
        
        setTimeout(() => {
            submitBtn.innerHTML = originalText;
            submitBtn.style.background = 'linear-gradient(45deg, var(--primary-color), var(--secondary-color))';
        }, 3000);
    }
}

// Utility Functions
function scrollToSection(sectionId) {
    const section = document.getElementById(sectionId);
    if (section) {
        section.scrollIntoView({
            behavior: 'smooth',
            block: 'start'
        });
    }
}

function changeSlide(direction) {
    const carousel = window.projectsCarousel;
    if (direction === 1) {
        carousel.nextSlide();
    } else {
        carousel.prevSlide();
    }
}

function currentSlide(index) {
    const carousel = window.projectsCarousel;
    carousel.showSlide(index - 1);
}

// Loading Animation
function showLoading() {
    document.body.style.overflow = 'hidden';
    
    setTimeout(() => {
        document.body.style.overflow = 'auto';
    }, 1000);
}

// Smooth Scroll Polyfill for older browsers
function smoothScrollPolyfill() {
    if (!('scrollBehavior' in document.documentElement.style)) {
        const links = document.querySelectorAll('a[href^="#"]');
        links.forEach(link => {
            link.addEventListener('click', function(e) {
                e.preventDefault();
                const target = document.querySelector(this.getAttribute('href'));
                if (target) {
                    const targetTop = target.offsetTop - 80;
                    window.scrollTo({
                        top: targetTop,
                        behavior: 'smooth'
                    });
                }
            });
        });
    }
}

// Performance Optimization
function optimizePerformance() {
    // Lazy load images
    const images = document.querySelectorAll('img[data-src]');
    const imageObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.removeAttribute('data-src');
                imageObserver.unobserve(img);
            }
        });
    });

    images.forEach(img => imageObserver.observe(img));

    // Debounce scroll events
    let scrollTimeout;
    window.addEventListener('scroll', () => {
        if (scrollTimeout) {
            clearTimeout(scrollTimeout);
        }
        scrollTimeout = setTimeout(() => {
            // Scroll event handling
        }, 10);
    });
}

// Easter Eggs
function addEasterEggs() {
    // Konami Code
    let konamiCode = [];
    const konamiSequence = [
        'ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown',
        'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight',
        'KeyB', 'KeyA'
    ];

    document.addEventListener('keydown', (e) => {
        konamiCode.push(e.code);
        konamiCode = konamiCode.slice(-konamiSequence.length);

        if (konamiCode.join(',') === konamiSequence.join(',')) {
            activateQuantumMode();
        }
    });
}

function activateQuantumMode() {
    document.body.style.animation = 'quantumPulse 0.5s ease-in-out infinite';
    setTimeout(() => {
        document.body.style.animation = '';
    }, 5000);
}

// Initialize everything when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    // Show loading animation
    showLoading();

    // Initialize all components
    window.particleSystem = new ParticleSystem();
    window.navigation = new Navigation();
    window.themeToggle = new ThemeToggle();
    window.projectsCarousel = new ProjectsCarousel();
    window.animationObserver = new AnimationObserver();
    window.contactForm = new ContactForm();

    // Initialize utilities
    smoothScrollPolyfill();
    optimizePerformance();
    addEasterEggs();

    // Add some dynamic effects
    setTimeout(() => {
        document.querySelectorAll('.glow-btn').forEach(btn => {
            btn.addEventListener('mouseenter', () => {
                btn.style.boxShadow = '0 0 30px var(--glow-color)';
            });
            btn.addEventListener('mouseleave', () => {
                btn.style.boxShadow = '';
            });
        });
    }, 1000);

    console.log('🚀 Quantum Technology Club website initialized successfully!');
    console.log('🌌 Exploring the quantum realm...');
});

// Handle window resize
window.addEventListener('resize', () => {
    // Reinitialize particle system on resize
    if (window.particleSystem) {
        window.particleSystem.container.innerHTML = '';
        window.particleSystem.particles = [];
        window.particleSystem.init();
    }
});

// Service Worker for offline functionality (optional)
if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
        navigator.serviceWorker.register('/sw.js')
            .then(registration => {
                console.log('SW registered: ', registration);
            })
            .catch(registrationError => {
                console.log('SW registration failed: ', registrationError);
            });
    });
}
