// Enhanced Portfolio JavaScript - Optimized and Feature-Ric

class PortfolioApp {
  constructor() {
    this.texts = [
      "Backend Developer", 
      "Bot Developer", 
      "System Architect", 
      "Low-Level Enthusiast"
    ];
    this.currentIndex = 0;
    this.charIndex = 0;
    this.typingElement = null;
    this.isDeleting = false;
    this.typeSpeed = 100;
    this.deleteSpeed = 50;
    this.pauseTime = 1700;
    
    // Performance optimization
    this.rafId = null;
    this.observers = new Map();
    
    this.init();
  }

  init() {
    // Wait for DOM to be ready
    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', () => this.setupApp());
    } else {
      this.setupApp();
    }
  }

  setupApp() {
    this.setupTypingAnimation();
    this.setupSmoothScrolling();
    this.setupMobileMenu();
    this.setupIntersectionObserver();
    this.setupPerformanceOptimizations();
    this.setupAccessibility();
    this.setupErrorHandling();
  }

  // Enhanced Typing Animation
  setupTypingAnimation() {
    this.typingElement = document.getElementById("typing-text");
    if (this.typingElement && this.texts.length) {
      // Add initial delay
      setTimeout(() => this.typeText(), 500);
    }
  }

  typeText() {
    if (!this.typingElement) return;

    const currentText = this.texts[this.currentIndex];
    
    if (!this.isDeleting) {
      // Typing
      if (this.charIndex < currentText.length) {
        this.typingElement.textContent = currentText.substring(0, this.charIndex + 1);
        this.charIndex++;
        setTimeout(() => this.typeText(), this.typeSpeed);
      } else {
        // Pause before deleting
        setTimeout(() => {
          this.isDeleting = true;
          this.typeText();
        }, this.pauseTime);
      }
    } else {
      // Deleting
      if (this.charIndex > 0) {
        this.typingElement.textContent = currentText.substring(0, this.charIndex - 1);
        this.charIndex--;
        setTimeout(() => this.typeText(), this.deleteSpeed);
      } else {
        // Move to next text
        this.isDeleting = false;
        this.currentIndex = (this.currentIndex + 1) % this.texts.length;
        setTimeout(() => this.typeText(), 350);
      }
    }
  }

  // Enhanced Smooth Scrolling
  setupSmoothScrolling() {
    const links = document.querySelectorAll('nav a[href^="#"], .hero-buttons a[href^="#"]');
    
    links.forEach(link => {
      link.addEventListener('click', (e) => {
        const targetId = link.getAttribute('href').slice(1);
        const target = document.getElementById(targetId);
        
        if (target) {
          e.preventDefault();
          
          // Close mobile menu if open
          this.closeMobileMenu();
          
          // Calculate offset for sticky nav
          const navHeight = document.querySelector('nav')?.offsetHeight || 0;
          const targetPosition = target.offsetTop - navHeight - 20;
          
          window.scrollTo({
            top: targetPosition,
            behavior: 'smooth'
          });
          
          // Update URL without triggering scroll
          history.pushState(null, null, `#${targetId}`);
          
          // Focus management for accessibility
          target.setAttribute('tabindex', '-1');
          target.focus();
          target.addEventListener('blur', () => target.removeAttribute('tabindex'), { once: true });
        }
      });
    });
  }

  // Enhanced Mobile Menu
  setupMobileMenu() {
    const burger = document.getElementById('burger-menu');
    const navList = document.querySelector('nav .nav-container ul');
    const navLinks = navList?.querySelectorAll('a');
    
    if (!burger || !navList) return;

    // Toggle menu
    burger.addEventListener('click', (e) => {
      e.stopPropagation();
      this.toggleMobileMenu(burger, navList);
    });

    // Close menu when clicking nav links
    navLinks?.forEach(link => {
      link.addEventListener('click', () => {
        this.closeMobileMenu(burger, navList);
      });
    });

    // Close menu when clicking outside
    document.addEventListener('click', (e) => {
      if (!navList.contains(e.target) && !burger.contains(e.target)) {
        this.closeMobileMenu(burger, navList);
      }
    });

    // Close menu on escape key
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') {
        this.closeMobileMenu(burger, navList);
      }
    });

    // Handle resize
    window.addEventListener('resize', () => {
      if (window.innerWidth > 800) {
        this.closeMobileMenu(burger, navList);
      }
    });
  }

  toggleMobileMenu(burger, navList) {
    const isOpen = burger.classList.contains('active');
    
    if (isOpen) {
      this.closeMobileMenu(burger, navList);
    } else {
      this.openMobileMenu(burger, navList);
    }
  }

  openMobileMenu(burger, navList) {
    burger = burger || document.getElementById('burger-menu');
    navList = navList || document.querySelector('nav .nav-container ul');
    
    if (!burger || !navList) return;

    burger.classList.add('active');
    navList.classList.add('open');
    document.body.style.overflow = 'hidden';
    
    // Focus first menu item
    const firstLink = navList.querySelector('a');
    if (firstLink) {
      setTimeout(() => firstLink.focus(), 300);
    }
  }

  closeMobileMenu(burger, navList) {
    burger = burger || document.getElementById('burger-menu');
    navList = navList || document.querySelector('nav .nav-container ul');
    
    if (!burger || !navList) return;

    burger.classList.remove('active');
    navList.classList.remove('open');
    document.body.style.overflow = '';
  }

  // Intersection Observer for Animations
  setupIntersectionObserver() {
    if (!('IntersectionObserver' in window)) return;

    const observerOptions = {
      threshold: 0.1,
      rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('animate-in');
          observer.unobserve(entry.target);
        }
      });
    }, observerOptions);

    // Observe elements for animation
    const animateElements = document.querySelectorAll(
      '.project-card, .tech-icon, .contact-item, .skills li'
    );
    
    animateElements.forEach(el => {
      el.style.opacity = '0';
      el.style.transform = 'translateY(30px)';
      el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
      observer.observe(el);
    });

    // Add CSS for animation
    const style = document.createElement('style');
    style.textContent = `
      .animate-in {
        opacity: 1 !important;
        transform: translateY(0) !important;
      }
    `;
    document.head.appendChild(style);

    this.observers.set('intersection', observer);
  }

  // Performance Optimizations
  setupPerformanceOptimizations() {
    // Lazy load images
    this.setupLazyLoading();
    
    // Debounce scroll events
    this.setupScrollOptimization();
    
    // Preload critical resources
    this.preloadCriticalResources();
  }

  setupLazyLoading() {
    if ('loading' in HTMLImageElement.prototype) {
      // Native lazy loading support
      const images = document.querySelectorAll('img[data-src]');
      images.forEach(img => {
        img.src = img.dataset.src;
        img.removeAttribute('data-src');
        img.loading = 'lazy';
      });
    } else {
      // Fallback for older browsers
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

      document.querySelectorAll('img[data-src]').forEach(img => {
        imageObserver.observe(img);
      });

      this.observers.set('images', imageObserver);
    }
  }

  setupScrollOptimization() {
    let ticking = false;
    
    const updateScrollEffects = () => {
      const scrollY = window.pageYOffset;
      const nav = document.querySelector('nav');
      
      if (nav) {
        if (scrollY > 100) {
          nav.classList.add('scrolled');
        } else {
          nav.classList.remove('scrolled');
        }
      }
      
      ticking = false;
    };

    window.addEventListener('scroll', () => {
      if (!ticking) {
        requestAnimationFrame(updateScrollEffects);
        ticking = true;
      }
    }, { passive: true });

    // Add CSS for scrolled nav
    const style = document.createElement('style');
    style.textContent = `
      nav.scrolled {
        background: rgba(255, 255, 255, 0.98);
        backdrop-filter: blur(20px);
        box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
      }
    `;
    document.head.appendChild(style);
  }

  preloadCriticalResources() {
    // Preload fonts
    const fontLink = document.createElement('link');
    fontLink.rel = 'preload';
    fontLink.href = 'https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap';
    fontLink.as = 'style';
    fontLink.onload = function() { this.rel = 'stylesheet'; };
    document.head.appendChild(fontLink);

    // Preload critical images
    const criticalImages = [
      'assets/avatar.jpg'
    ];

    criticalImages.forEach(src => {
      const link = document.createElement('link');
      link.rel = 'preload';
      link.href = src;
      link.as = 'image';
      document.head.appendChild(link);
    });
  }

  // Accessibility Enhancements
  setupAccessibility() {
    // Skip to main content link
    this.addSkipLink();
    
    // Keyboard navigation
    this.setupKeyboardNavigation();
    
    // ARIA labels and roles
    this.enhanceARIA();
    
    // Focus management
    this.setupFocusManagement();
  }

  addSkipLink() {
    const skipLink = document.createElement('a');
    skipLink.href = '#main';
    skipLink.textContent = 'Skip to main content';
    skipLink.className = 'sr-only';
    skipLink.style.cssText = `
      position: absolute;
      top: -40px;
      left: 6px;
      background: var(--accent-primary);
      color: var(--text-inverse);
      padding: 8px;
      text-decoration: none;
      border-radius: 4px;
      z-index: 1000;
      transition: top 0.3s;
    `;
    
    skipLink.addEventListener('focus', () => {
      skipLink.style.top = '6px';
    });
    
    skipLink.addEventListener('blur', () => {
      skipLink.style.top = '-40px';
    });
    
    document.body.insertBefore(skipLink, document.body.firstChild);
    
    // Add main landmark
    const main = document.querySelector('main') || document.querySelector('.container');
    if (main) {
      main.id = 'main';
      main.setAttribute('role', 'main');
    }
  }

  setupKeyboardNavigation() {
    // Tab trap for mobile menu
    const navList = document.querySelector('nav .nav-container ul');
    if (navList) {
      navList.addEventListener('keydown', (e) => {
        if (e.key === 'Tab' && navList.classList.contains('open')) {
          const focusableElements = navList.querySelectorAll('a');
          const firstElement = focusableElements[0];
          const lastElement = focusableElements[focusableElements.length - 1];
          
          if (e.shiftKey && document.activeElement === firstElement) {
            e.preventDefault();
            lastElement.focus();
          } else if (!e.shiftKey && document.activeElement === lastElement) {
            e.preventDefault();
            firstElement.focus();
          }
        }
      });
    }
  }

  enhanceARIA() {
    // Add ARIA labels to interactive elements
    const burger = document.getElementById('burger-menu');
    if (burger) {
      burger.setAttribute('aria-expanded', 'false');
      burger.setAttribute('aria-controls', 'navigation-menu');
    }

    const navList = document.querySelector('nav .nav-container ul');
    if (navList) {
      navList.id = 'navigation-menu';
      navList.setAttribute('role', 'menu');
      
      navList.querySelectorAll('a').forEach(link => {
        link.setAttribute('role', 'menuitem');
      });
    }

    // Update burger ARIA state
    const originalToggle = this.toggleMobileMenu;
    this.toggleMobileMenu = (burger, navList) => {
      originalToggle.call(this, burger, navList);
      const isOpen = burger.classList.contains('active');
      burger.setAttribute('aria-expanded', isOpen.toString());
    };
  }

  setupFocusManagement() {
    // Visible focus indicators
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Tab') {
        document.body.classList.add('keyboard-navigation');
      }
    });

    document.addEventListener('mousedown', () => {
      document.body.classList.remove('keyboard-navigation');
    });

    // Add CSS for keyboard navigation
    const style = document.createElement('style');
    style.textContent = `
      body:not(.keyboard-navigation) *:focus {
        outline: none;
      }
      
      .keyboard-navigation *:focus {
        outline: 2px solid var(--accent-primary);
        outline-offset: 2px;
      }
    `;
    document.head.appendChild(style);
  }

  // Error Handling
  setupErrorHandling() {
    window.addEventListener('error', (e) => {
      console.error('Portfolio App Error:', e.error);
      // Could send to analytics service
    });

    window.addEventListener('unhandledrejection', (e) => {
      console.error('Unhandled Promise Rejection:', e.reason);
      // Could send to analytics service
    });
  }

  // Cleanup method
  destroy() {
    // Cancel animation frame
    if (this.rafId) {
      cancelAnimationFrame(this.rafId);
    }

    // Disconnect observers
    this.observers.forEach(observer => {
      observer.disconnect();
    });
    this.observers.clear();

    // Remove event listeners
    // (In a real app, you'd store references to remove them)
  }
}

// Initialize the app
const portfolioApp = new PortfolioApp();

// Export for potential module usage
if (typeof module !== 'undefined' && module.exports) {
  module.exports = PortfolioApp;
}

// Additional utility functions
const utils = {
  // Debounce function
  debounce(func, wait, immediate) {
    let timeout;
    return function executedFunction(...args) {
      const later = () => {
        timeout = null;
        if (!immediate) func(...args);
      };
      const callNow = immediate && !timeout;
      clearTimeout(timeout);
      timeout = setTimeout(later, wait);
      if (callNow) func(...args);
    };
  },

  // Throttle function
  throttle(func, limit) {
    let inThrottle;
    return function(...args) {
      if (!inThrottle) {
        func.apply(this, args);
        inThrottle = true;
        setTimeout(() => inThrottle = false, limit);
      }
    };
  },

  // Check if element is in viewport
  isInViewport(element) {
    const rect = element.getBoundingClientRect();
    return (
      rect.top >= 0 &&
      rect.left >= 0 &&
      rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
      rect.right <= (window.innerWidth || document.documentElement.clientWidth)
    );
  },

  // Smooth scroll to element
  scrollToElement(element, offset = 0) {
    const elementPosition = element.offsetTop - offset;
    window.scrollTo({
      top: elementPosition,
      behavior: 'smooth'
    });
  }
};

// Make utils available globally
window.portfolioUtils = utils;
