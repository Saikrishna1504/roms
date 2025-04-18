// Performance-optimized code with animations restored
document.addEventListener('DOMContentLoaded', function() {
    // Initialize the UI with optimized animations
    window.addEventListener('resize', debounce(checkMobileStatus, 250));
    
    // Apply optimized hover effects for desktop only
    if (!isMobile()) {
        applyDesktopHoverEffects();
    }
    
    // Initialize optimized particles (reduced count)
    if (!isMobile() && !checkLowPerformanceDevice()) {
        initializeParticles(5); // Reduced count for better performance
    }

    // Initialize ripple effects for buttons with better performance
    initializeRippleEffects();
    
    // Show scroll to top button on scroll
    window.addEventListener('scroll', handleScroll, { passive: true });
});

// Cache-optimized mobile detection
let _isMobile = null;
let _lastWindowWidth = window.innerWidth;

function isMobile() {
    // Use cached value if window size hasn't changed
    if (_isMobile !== null && window.innerWidth === _lastWindowWidth) {
        return _isMobile;
    }
    
    _lastWindowWidth = window.innerWidth;
    _isMobile = window.innerWidth <= 768 || 
        /Android|webOS|iPhone|iPad|iPod|BlackBerry|Windows Phone/i.test(navigator.userAgent);
    
    return _isMobile;
}

function debounce(func, wait) {
    let timeout;
    return function() {
        const context = this;
        const args = arguments;
        clearTimeout(timeout);
        timeout = setTimeout(() => func.apply(context, args), wait);
    };
}

function checkMobileStatus() {
    // Reset mobile detection cache
    _isMobile = null;
    
    // Apply or remove hover effects based on device type
    if (!isMobile()) {
        applyDesktopHoverEffects();
        if (!checkLowPerformanceDevice()) {
            initializeParticles(5);
        }
    } else {
        // If mobile, ensure we don't have hover effects
        removeDesktopHoverEffects();
    }
}

function applyDesktopHoverEffects() {
    // Use event delegation for better performance
    document.body.addEventListener('mouseenter', handleHoverEffects, true);
    document.body.addEventListener('mouseleave', handleHoverEffects, true);
}

function removeDesktopHoverEffects() {
    document.body.removeEventListener('mouseenter', handleHoverEffects, true);
    document.body.removeEventListener('mouseleave', handleHoverEffects, true);
}

function handleHoverEffects(event) {
    const target = event.target;
    
    if (target.classList.contains('device-card')) {
        if (event.type === 'mouseenter') {
            target.style.transform = 'translateY(-5px)';
        } else {
            target.style.transform = 'translateY(0)';
        }
    } else if (target.classList.contains('rom-card')) {
        if (event.type === 'mouseenter') {
            target.style.transform = 'translateY(-5px)';
        } else {
            target.style.transform = 'translateY(0)';
        }
    }
}

// Show ROM section with optimized animations
function showROM(device) {
    const isLowPerf = checkLowPerformanceDevice();
    
    // Add active class for fade-out animation
    document.querySelectorAll('.device-card').forEach(card => {
        card.classList.add('fade-out');
    });
    
    // Fade out device select with optimized animation
    const deviceSelect = document.getElementById('device-select');
    deviceSelect.classList.add('fade-out');
    
    // Use shorter transition time for low-performance devices
    const transitionTime = isLowPerf ? 150 : 300;
    setTimeout(() => {
        deviceSelect.style.display = 'none';
        
        // Hide all ROM sections first
        const romSections = document.querySelectorAll('.rom-section');
        romSections.forEach(section => {
            section.style.display = 'none';
        });
        
        // Show selected ROM section with animation
        const selectedRom = document.getElementById(`${device}-rom`);
        selectedRom.style.display = 'block';
        selectedRom.style.opacity = '0';
        selectedRom.style.transform = 'translateY(10px)';
        
        // Force a reflow to ensure the animations work properly
        void selectedRom.offsetWidth;
        
        // Animate in the selected ROM section
        selectedRom.style.opacity = '1';
        selectedRom.style.transform = 'translateY(0)';
        
        // Instant scroll to top
        window.scrollTo(0, 0);
    }, transitionTime);
}

// Show device selection with optimized animations
function showDevices() {
    const isLowPerf = checkLowPerformanceDevice();
    
    // Hide current ROM sections with animation
    const romSections = document.querySelectorAll('.rom-section');
    romSections.forEach(section => {
        if (section.style.display === 'block') {
            section.style.opacity = '0';
            section.style.transform = 'translateY(-10px)';
        }
    });
    
    // Use shorter transition time for low-performance devices
    const transitionTime = isLowPerf ? 150 : 300;
    setTimeout(() => {
        // Hide all ROM sections
        romSections.forEach(section => {
            section.style.display = 'none';
        });
        
        // Show device selection
        const deviceSelect = document.getElementById('device-select');
        deviceSelect.style.display = 'block';
        deviceSelect.style.opacity = '0';
        deviceSelect.style.transform = 'translateY(10px)';
        
        // Reset device cards to ensure animations work
        document.querySelectorAll('.device-card').forEach(card => {
            card.classList.remove('fade-out');
        });
        
        // Force a reflow to ensure animations work
        void deviceSelect.offsetWidth;
        
        // Animate in the device selection
        deviceSelect.style.opacity = '1';
        deviceSelect.style.transform = 'translateY(0)';
        
        // Instant scroll to top
        window.scrollTo(0, 0);
    }, transitionTime);
}

// Smooth scroll to top function with performance check
function scrollToTop() {
    window.scrollTo({
        top: 0,
        behavior: checkLowPerformanceDevice() ? 'auto' : 'smooth'
    });
}

// Handle scroll events with passive flag for better performance
function handleScroll() {
    const scrollButton = document.getElementById('scroll-top');
    if (scrollButton) {
        if (window.scrollY > 300) {
            scrollButton.style.display = 'flex';
        } else {
            scrollButton.style.display = 'none';
        }
    }
}

// Check for low-performance devices - optimized
function checkLowPerformanceDevice() {
    const ua = navigator.userAgent.toLowerCase();
    const isAndroid = ua.indexOf('android') > -1;
    const isMobileDevice = isMobile();
    
    // Check for Android with likely lower performance
    if (isAndroid && isMobileDevice) {
        return true;
    }
    
    // Check for low memory conditions
    if (navigator.deviceMemory && navigator.deviceMemory <= 4) {
        return true;
    }
    
    // Check for older browsers that typically run on older hardware
    if (typeof window.requestAnimationFrame !== 'function') {
        return true;
    }
    
    return false;
}

// Initialize optimized ripple effects
function initializeRippleEffects() {
    // Apply ripple effect to buttons when clicked, with performance check
    const buttons = document.querySelectorAll('.download-button, .back-button');
    
    buttons.forEach(button => {
        button.addEventListener('click', function(event) {
            // Skip effect on low-performance devices
            if (checkLowPerformanceDevice()) return;
            
            const circle = document.createElement('span');
            const diameter = Math.max(this.clientWidth, this.clientHeight);
            
            circle.style.width = circle.style.height = `${diameter}px`;
            circle.style.left = `${event.clientX - this.getBoundingClientRect().left - diameter/2}px`;
            circle.style.top = `${event.clientY - this.getBoundingClientRect().top - diameter/2}px`;
            circle.classList.add('ripple');
            
            // Remove any existing ripple
            const ripple = this.querySelector('.ripple');
            if (ripple) {
                ripple.remove();
            }
            
            this.appendChild(circle);
            
            // Clean up ripple after animation completes
            setTimeout(() => {
                circle.remove();
            }, 500);
        });
    });
}

// Initialize optimized floating particles
function initializeParticles(count = 8) {
    if (checkLowPerformanceDevice()) return;
    
    const isMobileDevice = isMobile();
    const particleCount = isMobileDevice ? Math.min(count, 3) : count;
    
    // Check if container exists, create it if not
    let container = document.querySelector('.particles-container');
    if (!container) {
        container = document.createElement('div');
        container.className = 'particles-container';
        container.style.position = 'fixed';
        container.style.top = '0';
        container.style.left = '0';
        container.style.width = '100%';
        container.style.height = '100%';
        container.style.zIndex = '-1';
        container.style.pointerEvents = 'none';
        document.body.appendChild(container);
    }
    
    // Clear existing particles to prevent accumulation
    container.innerHTML = '';
    
    // Create optimized particles
    for (let i = 0; i < particleCount; i++) {
        const particle = document.createElement('div');
        particle.className = 'particle';
        
        // Smaller particle size for better performance
        const size = isMobileDevice ? 
            (3 + Math.random() * 5) : 
            (4 + Math.random() * 8);
        
        const posX = Math.random() * window.innerWidth;
        const posY = 100 + Math.random() * window.innerHeight;
        
        // Longer animation duration for smoother motion and reduced CPU usage
        const duration = isMobileDevice ? 
            (20 + Math.random() * 10) : 
            (20 + Math.random() * 15);
            
        const delay = Math.random() * 5;
        
        particle.style.width = `${size}px`;
        particle.style.height = `${size}px`;
        particle.style.left = `${posX}px`;
        particle.style.top = `${posY}px`;
        particle.style.animationDuration = `${duration}s`;
        particle.style.animationDelay = `${delay}s`;
        
        // Keep opacity low for subtle effect and better performance
        const hue = Math.random() > 0.5 ? 250 : 170;
        
        particle.style.backgroundColor = `hsla(${hue}, 70%, 50%, 0.1)`;
        
        container.appendChild(particle);
    }
}
