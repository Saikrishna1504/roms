// When the DOM is fully loaded
document.addEventListener('DOMContentLoaded', function() {
    // Initialize particles background
    initializeParticles();
    
    // Add mouse trail effect on device cards
    const deviceCards = document.querySelectorAll('.device-card');
    deviceCards.forEach(card => {
        card.addEventListener('mousemove', function(e) {
            const rect = this.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            
            // Create the glow effect following the cursor
            this.style.background = `
                radial-gradient(circle at ${x}px ${y}px, 
                rgba(40, 50, 80, 0.8) 0%, 
                var(--card-bg) 50%)
            `;
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.background = 'var(--card-bg)';
            this.style.transform = 'translateY(0)';
        });
        
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-8px) scale(1.02)';
        });
    });
    
    // Add ripple effect to buttons
    const buttons = document.querySelectorAll('.download-button, .back-button');
    buttons.forEach(button => {
        button.addEventListener('click', createRipple);
    });
    
    // Add hover effects to ROM cards
    const romCards = document.querySelectorAll('.rom-card');
    romCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-5px)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
        });
    });
    
    // Initialize with a fade-in effect
    setTimeout(() => {
        document.body.style.opacity = '1';
        
        // Stagger animation for device cards
        const deviceCards = document.querySelectorAll('.device-card');
        deviceCards.forEach((card, index) => {
            setTimeout(() => {
                card.style.transform = 'translateY(0)';
                card.style.opacity = '1';
            }, 100 + (index * 150));
        });
    }, 100);
    
    let scrollTimer;
    let lastScrollTop = 0;
    window.addEventListener('scroll', function() {
        clearTimeout(scrollTimer);
        
        const st = window.pageYOffset || document.documentElement.scrollTop;
        if (Math.abs(lastScrollTop - st) > 50) {
            createFallingElements(isMobile() ? 2 : 3);
            lastScrollTop = st;
        }
        
        scrollTimer = setTimeout(() => {
            if (Math.random() > 0.5) {
                createFallingElements(isMobile() ? 1 : 2);
            }
        }, 200);
    }, { passive: true });
});

function isMobile() {
    return window.innerWidth <= 768;
}

// Create ripple effect on buttons
function createRipple(event) {
    const button = event.currentTarget;
    
    const circle = document.createElement('span');
    const diameter = Math.max(button.clientWidth, button.clientHeight);
    const radius = diameter / 2;
    
    // Position the ripple
    circle.style.width = circle.style.height = `${diameter}px`;
    circle.style.left = `${event.clientX - button.getBoundingClientRect().left - radius}px`;
    circle.style.top = `${event.clientY - button.getBoundingClientRect().top - radius}px`;
    circle.classList.add('ripple');
    
    // Remove existing ripples
    const ripple = button.querySelector('.ripple');
    if (ripple) {
        ripple.remove();
    }
    
    button.appendChild(circle);
    
    // Remove the ripple after animation
    setTimeout(() => {
        circle.remove();
    }, 600);
}

// Initialize floating particles background
function initializeParticles() {
    const isMobile = window.innerWidth <= 768;
    const particleCount = isMobile ? 6 : 10;
    
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
        
        // Randomize particle size between 3 and 13 pixels for better variety
        const size = 3 + Math.random() * 10;
        
        // Position particles across window width and at different heights
        const posX = Math.random() * window.innerWidth;
        const posY = 100 + Math.random() * window.innerHeight;
        
        // Longer animation durations for slower, more peaceful movement
        const duration = isMobile ? 
            15 + Math.random() * 8 : 
            12 + Math.random() * 10;
            
        const delay = Math.random() * 5;
        
        particle.style.width = `${size}px`;
        particle.style.height = `${size}px`;
        particle.style.left = `${posX}px`;
        particle.style.top = `${posY}px`;
        particle.style.animationDuration = `${duration}s`;
        particle.style.animationDelay = `${delay}s`;
        
        // Adjust opacity and colors for better visibility and aesthetics
        const opacity = 0.1 + Math.random() * 0.3; // Slightly less opaque for subtle effect
        const hue = Math.random() > 0.5 ? 
            250 + Math.random() * 50 :  // Blues/purples
            170 + Math.random() * 30;   // Teals/cyans
        const saturation = 60 + Math.random() * 40;
        const lightness = 50 + Math.random() * 30;
        
        particle.style.backgroundColor = `hsla(${hue}, ${saturation}%, ${lightness}%, ${opacity})`;
        
        // Apply slightly different shadow effects to some particles
        if (Math.random() > 0.7) {
            particle.style.boxShadow = `0 0 ${Math.floor(size/2)}px hsla(${hue}, ${saturation}%, ${lightness}%, 0.8)`;
        }
        
        container.appendChild(particle);
    }
    
    // Reinitialize particles on window resize with debounce
    window.addEventListener('resize', debounce(() => {
        initializeParticles();
    }, 250));
}

// Debounce helper function to prevent multiple executions
function debounce(func, wait) {
    let timeout;
    return function() {
        const context = this;
        const args = arguments;
        clearTimeout(timeout);
        timeout = setTimeout(() => func.apply(context, args), wait);
    };
}

function createFallingElements(count) {
    const isMobile = window.innerWidth <= 768;
    // Higher threshold for creating elements (less frequent)
    
    const container = document.querySelector('body');
    const elementsToCreate = count || (isMobile ? 1 : 2);
    
    for (let i = 0; i < elementsToCreate; i++) {
        setTimeout(() => {
            // Create a falling star
            if (Math.random() > 0.6) {
                const star = document.createElement('div');
                star.className = 'falling-star';
                
                const posX = Math.random() * window.innerWidth;
                star.style.left = `${posX}px`;
                star.style.top = '0';
                
                // Slower animation duration for stars
                const duration = isMobile ? 
                    Math.floor(Math.random() * 4) + 8 : 
                    Math.floor(Math.random() * 3) + 6;
                    
                star.style.animationDuration = `${duration}s`;
                
                container.appendChild(star);
                
                // Remove element after animation completes
                setTimeout(() => {
                    star.remove();
                }, duration * 1000);
            } 
            // Create a falling leaf
            else {
                const leaf = document.createElement('div');
                leaf.className = 'falling-leaf';
                
                const posX = Math.random() * window.innerWidth;
                const size = 5 + Math.random() * 5;  // Slightly smaller for better performance
                
                const baseHue = Math.random() > 0.5 ? '40, 100%, 50%' : '120, 60%, 70%';
                leaf.style.backgroundColor = `hsl(${baseHue})`;
                
                leaf.style.left = `${posX}px`;
                leaf.style.top = '0';
                leaf.style.width = `${size}px`;
                leaf.style.height = `${size}px`;
                
                // Slower animation for leaves
                const fallingDuration = isMobile ? 
                    Math.floor(Math.random() * 5) + 10 : 
                    Math.floor(Math.random() * 4) + 8;
                    
                leaf.style.animationDuration = `${fallingDuration}s, 8s`;
                
                container.appendChild(leaf);
                
                // Remove element after animation completes
                setTimeout(() => {
                    leaf.remove();
                }, fallingDuration * 1000);
            }
        }, i * 400); // Increased delay between elements
    }
}

// Show the selected ROM section with animation
function showROM(device) {
    // Add active class for animation
    document.querySelectorAll('.device-card').forEach(card => {
        card.classList.add('fade-out');
    });
    
    // Fade out device select
    const deviceSelect = document.getElementById('device-select');
    deviceSelect.style.opacity = '0';
    deviceSelect.style.transform = 'translateY(-20px)';
    
    createFallingElements(isMobile() ? 3 : 5);
    
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
                }, 100 + (index * 100));
            });
        }, 50);
    }, 300);
}

// Show device selection with animation
function showDevices() {
    // Fade out current ROM section
    const begoniaRom = document.getElementById('begonia-rom');
    const duchampRom = document.getElementById('duchamp-rom');
    const deviceSelect = document.getElementById('device-select');
    
    createFallingElements(isMobile() ? 3 : 5);
    
    if (begoniaRom.style.display === 'block') {
        begoniaRom.style.opacity = '0';
        begoniaRom.style.transform = 'translateY(-20px)';
    }
    
    if (duchampRom.style.display === 'block') {
        duchampRom.style.opacity = '0';
        duchampRom.style.transform = 'translateY(-20px)';
    }
    
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
                }, 100 + (index * 150));
            });
        }, 50);
    }, 300);
}

// Add a smooth scroll-to-top when changing sections
function scrollToTop() {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
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