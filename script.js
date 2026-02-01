// ============================================
// LANGUAGE SWITCHING
// ============================================
let currentLang = 'ar'; // Default language is Arabic
let currentCurrency = 'egp'; // Default currency

function toggleLanguage() {
    currentLang = currentLang === 'ar' ? 'en' : 'ar';

    const html = document.documentElement;
    const langText = document.getElementById('langText');

    // Update HTML attributes
    html.setAttribute('lang', currentLang);
    html.setAttribute('dir', currentLang === 'ar' ? 'rtl' : 'ltr');

    // Update language button text
    langText.textContent = currentLang === 'ar' ? 'English' : 'العربية';

    // Update all elements with data-ar and data-en attributes
    const elements = document.querySelectorAll('[data-ar][data-en]');
    elements.forEach(element => {
        const text = currentLang === 'ar' ? element.getAttribute('data-ar') : element.getAttribute('data-en');
        element.textContent = text;
    });

    // Update WhatsApp links with appropriate language
    updateWhatsAppLinks();

    // Save language preference
    localStorage.setItem('preferredLanguage', currentLang);
}

function updateWhatsAppLinks() {
    const message = currentLang === 'ar'
        ? 'مرحباً DUBLEN، أنا مهتم بخدماتكم'
        : 'Hello DUBLEN, I am interested in your services';

    const encodedMessage = encodeURIComponent(message);
    const whatsappLinks = document.querySelectorAll('a[href*="wa.me"]');

    whatsappLinks.forEach(link => {
        link.href = `https://wa.me/201017323187?text=${encodedMessage}`;
    });
}

// Load saved language preference on page load
function loadLanguagePreference() {
    const savedLang = localStorage.getItem('preferredLanguage');
    if (savedLang && savedLang !== currentLang) {
        toggleLanguage();
    }
}

// ============================================
// CURRENCY DETECTION & SWITCHING
// ============================================

// Detect user's country and set currency accordingly
async function detectUserCountry() {
    try {
        // Try to get user's country using IP geolocation API
        const response = await fetch('https://ipapi.co/json/');
        const data = await response.json();

        // Check if user is in Egypt
        if (data.country_code === 'EG') {
            currentCurrency = 'egp';
        } else {
            currentCurrency = 'usd';
        }

        // Update prices based on detected currency
        updatePrices();

    } catch (error) {
        // If geolocation fails, default to EGP
        console.log('Could not detect location, defaulting to EGP');
        currentCurrency = 'egp';
        updatePrices();
    }
}

// Update all prices based on current currency
function updatePrices() {
    const priceElements = document.querySelectorAll('.price-value');

    priceElements.forEach(element => {
        const egpPrice = element.getAttribute('data-egp');
        const usdPrice = element.getAttribute('data-usd');

        if (currentCurrency === 'egp') {
            element.textContent = egpPrice;
        } else {
            element.textContent = usdPrice;
        }
    });
}

function updateWhatsAppLinks() {
    const message = currentLang === 'ar'
        ? 'مرحباً DUBLEN، أنا مهتم بخدماتكم'
        : 'Hello DUBLEN, I am interested in your services';

    const encodedMessage = encodeURIComponent(message);
    const whatsappLinks = document.querySelectorAll('a[href*="wa.me"]');

    whatsappLinks.forEach(link => {
        link.href = `https://wa.me/201017323187?text=${encodedMessage}`;
    });
}

// Load saved language preference on page load
function loadLanguagePreference() {
    const savedLang = localStorage.getItem('preferredLanguage');
    if (savedLang && savedLang !== currentLang) {
        toggleLanguage();
    }
}

// ============================================
// NAVBAR SCROLL EFFECT
// ============================================
function handleNavbarScroll() {
    const navbar = document.getElementById('navbar');

    if (window.scrollY > 50) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
}

// ============================================
// MOBILE MENU TOGGLE
// ============================================
function setupMobileMenu() {
    const mobileMenuToggle = document.getElementById('mobileMenuToggle');
    const navMenu = document.getElementById('navMenu');

    mobileMenuToggle.addEventListener('click', () => {
        navMenu.classList.toggle('active');

        // Toggle icon
        const icon = mobileMenuToggle.querySelector('i');
        if (navMenu.classList.contains('active')) {
            icon.classList.remove('fa-bars');
            icon.classList.add('fa-times');
        } else {
            icon.classList.remove('fa-times');
            icon.classList.add('fa-bars');
        }
    });

    // Close menu when clicking on a link
    const navLinks = document.querySelectorAll('.nav-link');
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            navMenu.classList.remove('active');
            const icon = mobileMenuToggle.querySelector('i');
            icon.classList.remove('fa-times');
            icon.classList.add('fa-bars');
        });
    });
}

// ============================================
// SMOOTH SCROLL FOR NAVIGATION LINKS
// ============================================
function setupSmoothScroll() {
    const navLinks = document.querySelectorAll('.nav-link');

    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const targetId = link.getAttribute('href');
            const targetSection = document.querySelector(targetId);

            if (targetSection) {
                const navbarHeight = document.getElementById('navbar').offsetHeight;
                const targetPosition = targetSection.offsetTop - navbarHeight;

                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
}

// ============================================
// SCROLL ANIMATIONS (AOS - Animate On Scroll)
// ============================================
function setupScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -100px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('aos-animate');
            }
        });
    }, observerOptions);

    // Observe all elements with data-aos attribute
    const animatedElements = document.querySelectorAll('[data-aos]');
    animatedElements.forEach(element => {
        observer.observe(element);
    });
}

// ============================================
// ACTIVE NAVIGATION LINK HIGHLIGHTING
// ============================================
function setupActiveNavigation() {
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-link');

    window.addEventListener('scroll', () => {
        let current = '';
        const navbarHeight = document.getElementById('navbar').offsetHeight;

        sections.forEach(section => {
            const sectionTop = section.offsetTop - navbarHeight - 100;
            const sectionHeight = section.offsetHeight;

            if (window.scrollY >= sectionTop && window.scrollY < sectionTop + sectionHeight) {
                current = section.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${current}`) {
                link.classList.add('active');
            }
        });
    });
}

// ============================================
// GRADIENT ORB MOUSE TRACKING (OPTIONAL)
// ============================================
function setupMouseTracking() {
    const orbs = document.querySelectorAll('.gradient-orb');

    document.addEventListener('mousemove', (e) => {
        const mouseX = e.clientX;
        const mouseY = e.clientY;

        orbs.forEach((orb, index) => {
            const speed = (index + 1) * 0.02;
            const x = (mouseX - window.innerWidth / 2) * speed;
            const y = (mouseY - window.innerHeight / 2) * speed;

            orb.style.transform = `translate(${x}px, ${y}px)`;
        });
    });
}

// ============================================
// SERVICE CARD TILT EFFECT (OPTIONAL)
// ============================================
function setupCardTiltEffect() {
    const cards = document.querySelectorAll('.service-card');

    cards.forEach(card => {
        card.addEventListener('mousemove', (e) => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;

            const centerX = rect.width / 2;
            const centerY = rect.height / 2;

            const rotateX = (y - centerY) / 10;
            const rotateY = (centerX - x) / 10;

            card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-10px)`;
        });

        card.addEventListener('mouseleave', () => {
            card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) translateY(0)';
        });
    });
}

// ============================================
// PERFORMANCE OPTIMIZATION - DEBOUNCE
// ============================================
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

// ============================================
// INITIALIZE ALL FEATURES
// ============================================
document.addEventListener('DOMContentLoaded', () => {
    // Load language preference
    loadLanguagePreference();

    // Detect user's country and set currency
    detectUserCountry();

    // Setup mobile menu
    setupMobileMenu();

    // Setup smooth scroll
    setupSmoothScroll();

    // Setup scroll animations
    setupScrollAnimations();

    // Setup active navigation
    setupActiveNavigation();

    // Setup mouse tracking for gradient orbs (optional - can be disabled for performance)
    // setupMouseTracking();

    // Setup card tilt effect (optional - can be disabled for performance)
    setupCardTiltEffect();

    // Add scroll event listener with debounce for performance
    window.addEventListener('scroll', debounce(handleNavbarScroll, 10));

    // Initial navbar check
    handleNavbarScroll();
});

// ============================================
// PAGE LOAD ANIMATION
// ============================================
window.addEventListener('load', () => {
    document.body.style.opacity = '0';
    setTimeout(() => {
        document.body.style.transition = 'opacity 0.5s ease';
        document.body.style.opacity = '1';
    }, 100);
});

// ============================================
// PREVENT HORIZONTAL SCROLL
// ============================================
document.addEventListener('DOMContentLoaded', () => {
    document.body.style.overflowX = 'hidden';
    document.documentElement.style.overflowX = 'hidden';
});

// ============================================
// CONSOLE BRANDING (OPTIONAL)
// ============================================
console.log('%c DUBLEN ', 'background: linear-gradient(135deg, #7D2AE8 0%, #9D4FFF 100%); color: white; font-size: 20px; font-weight: bold; padding: 10px 20px; border-radius: 5px;');
console.log('%c Professional Software Solutions ', 'color: #7D2AE8; font-size: 14px; font-weight: bold;');
console.log('%c Contact: 01017323187 ', 'color: #b0b0b0; font-size: 12px;');
