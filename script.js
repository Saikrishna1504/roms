// When the DOM is fully loaded
document.addEventListener('DOMContentLoaded', function() {
    // Make content visible immediately
    document.body.style.opacity = '1';
    
    // Show device cards instantly
    const deviceCards = document.querySelectorAll('.device-card');
    deviceCards.forEach((card) => {
        card.style.opacity = '1';
        card.style.transform = 'translateY(0)';
    });
    
    // Basic hover effects for desktop only
    if (!isMobile()) {
        deviceCards.forEach(card => {
            card.addEventListener('mouseenter', function() {
                this.style.transform = 'translateY(-5px)';
            });
            
            card.addEventListener('mouseleave', function() {
                this.style.background = 'var(--card-bg)';
                this.style.transform = 'translateY(0)';
            });
        });
        
        // Basic hover for ROM cards on desktop
        const romCards = document.querySelectorAll('.rom-card');
        romCards.forEach(card => {
            card.addEventListener('mouseenter', function() {
                this.style.transform = 'translateY(-5px)';
            });
            
            card.addEventListener('mouseleave', function() {
                this.style.transform = 'translateY(0)';
            });
        });
    }
});

// Simple mobile detection
function isMobile() {
    return window.innerWidth <= 768 || 
           navigator.userAgent.match(/Android/i) ||
           navigator.userAgent.match(/webOS/i) ||
           navigator.userAgent.match(/iPhone/i) ||
           navigator.userAgent.match(/iPad/i) ||
           navigator.userAgent.match(/iPod/i) ||
           navigator.userAgent.match(/BlackBerry/i) ||
           navigator.userAgent.match(/Windows Phone/i);
}

// Show ROM section without animations
function showROM(device) {
    // Hide device selection
    const deviceSelect = document.getElementById('device-select');
    deviceSelect.style.display = 'none';
    
    // Hide all ROM sections first
    document.getElementById('begonia-rom').style.display = 'none';
    document.getElementById('duchamp-rom').style.display = 'none';
    
    // Show selected ROM section
    const selectedRom = document.getElementById(`${device}-rom`);
    selectedRom.style.display = 'block';
    selectedRom.style.opacity = '1';
    
    // Make all ROM cards visible immediately
    const romCards = selectedRom.querySelectorAll('.rom-card');
    romCards.forEach(card => {
        card.style.opacity = '1';
        card.style.transform = 'none';
    });
    
    // Instant scroll to top
    window.scrollTo(0, 0);
}

// Show device selection without animations
function showDevices() {
    // Hide ROM sections
    document.getElementById('begonia-rom').style.display = 'none';
    document.getElementById('duchamp-rom').style.display = 'none';
    
    // Show device selection
    const deviceSelect = document.getElementById('device-select');
    deviceSelect.style.display = 'block';
    deviceSelect.style.opacity = '1';
    
    // Make all device cards visible immediately
    const deviceCards = document.querySelectorAll('.device-card');
    deviceCards.forEach(card => {
        card.classList.remove('fade-out');
        card.style.opacity = '1';
        card.style.transform = 'none';
    });
    
    // Instant scroll to top
    window.scrollTo(0, 0);
}

// Check if the device is likely a low-performance Android device
function checkLowPerformanceDevice() {
    const ua = navigator.userAgent.toLowerCase();
    const isAndroid = ua.indexOf('android') > -1;
    const isMobileDevice = isMobile();
    
    // Check for Android device with low memory or processor indicators
    // This is a simplistic check, you might want to refine it
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

// Create ripple effect on buttons
function createRipple(event) {
    // Check if we should skip fancy effects for performance
    if (checkLowPerformanceDevice()) {
        return;
    }
    
    const button = event.currentTarget;
    
    const circle = document.createElement('span');
    const diameter = Math.max(button.clientWidth, button.clientHeight);
    const radius = diameter / 2;
    
    circle.style.width = circle.style.height = `${diameter}px`;
    circle.style.left = `${event.clientX - button.getBoundingClientRect().left - radius}px`;
    circle.style.top = `${event.clientY - button.getBoundingClientRect().top - radius}px`;
    circle.classList.add('ripple');
    
    const ripple = button.querySelector('.ripple');
    if (ripple) {
        ripple.remove();
    }
    
    button.appendChild(circle);
    
    setTimeout(() => {
        circle.remove();
    }, 600);
}

// Initialize floating particles background
function initializeParticles() {
    // Skip particles on low-performance devices
    if (checkLowPerformanceDevice()) return;
    
    const isMobileDevice = isMobile();
    const particleCount = isMobileDevice ? 4 : 10;
    
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
    
    // Clear existing particles
    container.innerHTML = '';
    
    for (let i = 0; i < particleCount; i++) {
        const particle = document.createElement('div');
        particle.className = 'particle';
        
        // Reduced particle size for better performance
        const size = isMobileDevice ? 
            (2 + Math.random() * 6) : 
            (3 + Math.random() * 10);
        
        const posX = Math.random() * window.innerWidth;
        const posY = 100 + Math.random() * window.innerHeight;
        
        // Simplified animation for better performance
        const duration = isMobileDevice ? 
            (20 + Math.random() * 10) : 
            (15 + Math.random() * 10);
            
        const delay = Math.random() * 5;
        
        particle.style.width = `${size}px`;
        particle.style.height = `${size}px`;
        particle.style.left = `${posX}px`;
        particle.style.top = `${posY}px`;
        particle.style.animationDuration = `${duration}s`;
        particle.style.animationDelay = `${delay}s`;
        
        // Lower opacity for less visual intensity
        const opacity = 0.05 + Math.random() * 0.15;
        const hue = Math.random() > 0.5 ? 250 : 170;
        const saturation = 60;
        const lightness = 50;
        
        particle.style.backgroundColor = `hsla(${hue}, ${saturation}%, ${lightness}%, ${opacity})`;
        
        // Remove box shadow for better performance
        container.appendChild(particle);
    }
}

// This function is not used anymore to improve performance
function createFallingElements() {
    // Function disabled to improve performance
}

// Show the selected ROM section with animation
function showROM(device) {
    const isLowPerf = checkLowPerformanceDevice();
    
    // Add active class for animation
    document.querySelectorAll('.device-card').forEach(card => {
        card.classList.add('fade-out');
    });
    
    // Fade out device select
    const deviceSelect = document.getElementById('device-select');
    deviceSelect.style.opacity = '0';
    deviceSelect.style.transform = 'translateY(-20px)';
    
    // No falling elements for better performance
    
    const transitionTime = isLowPerf ? 100 : 300;
    setTimeout(() => {
        deviceSelect.style.display = 'none';
        
        // Hide all ROM sections first
        document.getElementById('begonia-rom').style.display = 'none';
        document.getElementById('duchamp-rom').style.display = 'none';
        
        // Show selected ROM section
        const selectedRom = document.getElementById(`${device}-rom`);
        selectedRom.style.display = 'block';
        selectedRom.style.opacity = '0';
        selectedRom.style.transform = 'translateY(20px)';
        
        // Trigger reflow for animation
        void selectedRom.offsetWidth;
        
        // Fade in the selected ROM section
        setTimeout(() => {
            selectedRom.style.opacity = '1';
            selectedRom.style.transform = 'translateY(0)';
            
            // Stagger animation for ROM cards
            const romCards = selectedRom.querySelectorAll('.rom-card');
            romCards.forEach((card, index) => {
                card.style.opacity = '0';
                card.style.transform = 'translateY(20px)';
                
                setTimeout(() => {
                    card.style.opacity = '1';
                    card.style.transform = 'translateY(0)';
                }, isLowPerf ? 50 : (100 + (index * 100)));
            });
        }, isLowPerf ? 25 : 50);
    }, transitionTime);
}

// Show device selection with animation
function showDevices() {
    const isLowPerf = checkLowPerformanceDevice();
    
    // Fade out current ROM section
    const begoniaRom = document.getElementById('begonia-rom');
    const duchampRom = document.getElementById('duchamp-rom');
    const deviceSelect = document.getElementById('device-select');
    
    // No falling elements for better performance
    
    if (begoniaRom.style.display === 'block') {
        begoniaRom.style.opacity = '0';
        begoniaRom.style.transform = 'translateY(-20px)';
    }
    
    if (duchampRom.style.display === 'block') {
        duchampRom.style.opacity = '0';
        duchampRom.style.transform = 'translateY(-20px)';
    }
    
    const transitionTime = isLowPerf ? 100 : 300;
    setTimeout(() => {
        // Hide ROM sections
        begoniaRom.style.display = 'none';
        duchampRom.style.display = 'none';
        
        // Show device selection
        deviceSelect.style.display = 'block';
        deviceSelect.style.opacity = '0';
        deviceSelect.style.transform = 'translateY(20px)';
        
        // Reset device cards
        document.querySelectorAll('.device-card').forEach(card => {
            card.classList.remove('fade-out');
            card.style.opacity = '0';
            card.style.transform = 'translateY(20px)';
        });
        
        // Trigger reflow for animation
        void deviceSelect.offsetWidth;
        
        // Fade in the device selection
        setTimeout(() => {
            deviceSelect.style.opacity = '1';
            deviceSelect.style.transform = 'translateY(0)';
            
            // Stagger animation for device cards
            const deviceCards = document.querySelectorAll('.device-card');
            deviceCards.forEach((card, index) => {
                setTimeout(() => {
                    card.style.opacity = '1';
                    card.style.transform = 'translateY(0)';
                }, isLowPerf ? 50 : (100 + (index * 150)));
            });
        }, isLowPerf ? 25 : 50);
    }, transitionTime);
}

// Add a smooth scroll-to-top when changing sections
function scrollToTop() {
    window.scrollTo({
        top: 0,
        behavior: checkLowPerformanceDevice() ? 'auto' : 'smooth'
    });
}
// Enhance the original functions to include scroll to top
const originalShowROM = showROM;
showROM = function(device) {
    originalShowROM(device);
    scrollToTop();
};

const originalShowDevices = showDevices;
showDevices = function() {
    originalShowDevices();
    scrollToTop();
};
