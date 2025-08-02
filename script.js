// Theme configuration
const themes = {
    theme1: {
        name: 'Default Theme',
        imageUrl: '', // Add your theme image URL here
        buttonText: 'Register Now',
        buttonClass: 'primary'
    }
};

// Theme selection functionality
function setupThemeSelection() {
    const themeButtons = document.querySelectorAll('.theme-button');
    
    themeButtons.forEach(button => {
        const themeId = button.dataset.theme;
        const theme = themes[themeId];
        const themeImage = document.getElementById(`${themeId}-image`);
        
        // Set initial theme preview
        if (theme.imageUrl) {
            themeImage.style.backgroundImage = `url('${theme.imageUrl}')`;
            themeImage.style.backgroundSize = 'cover';
            themeImage.style.backgroundPosition = 'center';
            themeImage.innerHTML = ''; // Remove placeholder text if image loads
        }
        
        // Handle theme button click
        button.addEventListener('click', function() {
            // Remove active class from all buttons
            themeButtons.forEach(btn => btn.classList.remove('active'));
            // Add active class to clicked button
            this.classList.add('active');
            
            // Here you can add code to apply the selected theme
            console.log(`Selected theme: ${themeId}`);
            // Example: document.body.className = themeId;
        });
        
        // Show placeholder if image fails to load
        themeImage.addEventListener('error', function() {
            this.innerHTML = `<span>${theme.name} Preview</span>`;
            this.style.backgroundImage = 'none';
        });
    });
}

// Create money rain effect
function createMoneyRain(container) {
    const moneyIcons = ['💰', '💵', '💴', '💶', '💷'];
    const containerRect = container.getBoundingClientRect();
    const moneyRain = container.querySelector('.money-rain');
    
    // Clear any existing money elements
    moneyRain.innerHTML = '';
    
    // Create multiple money elements
    for (let i = 0; i < 10; i++) {
        const money = document.createElement('div');
        money.className = 'money';
        money.textContent = moneyIcons[Math.floor(Math.random() * moneyIcons.length)];
        
        // Random position across the width of the container
        const left = Math.random() * 100;
        const delay = Math.random() * 2; // Staggered start
        const duration = 1.5 + Math.random(); // Random duration between 1.5-2.5s
        const size = 16 + Math.random() * 12; // Random size between 16-28px
        
        // Set initial position and styles
        money.style.cssText = `
            position: absolute;
            left: ${left}%;
            top: -30px;
            font-size: ${size}px;
            opacity: 0;
            transform: translateY(0) rotate(0deg);
            animation: moneyFall ${duration}s ease-in ${delay}s forwards;
            z-index: 1;
            pointer-events: none;
        `;
        
        moneyRain.appendChild(money);
    }
}

// Create particles for the background
document.addEventListener('DOMContentLoaded', function() {
    const particlesContainer = document.createElement('div');
    particlesContainer.className = 'particles';
    document.querySelector('.landing-container').appendChild(particlesContainer);

    // Create particles
    const particleCount = 50;
    for (let i = 0; i < particleCount; i++) {
        createParticle();
    }

    // Handle window resize
    let resizeTimer;
    window.addEventListener('resize', function() {
        clearTimeout(resizeTimer);
        resizeTimer = setTimeout(function() {
            const particles = document.querySelectorAll('.particle');
            particles.forEach(particle => {
                particle.style.left = Math.random() * 100 + 'vw';
                particle.style.animationDuration = (Math.random() * 20 + 10) + 's';
                particle.style.animationDelay = '-' + (Math.random() * 20) + 's';
            });
        }, 250);
    });

    // Create a single particle
    function createParticle() {
        const particle = document.createElement('div');
        particle.className = 'particle';
        
        // Random size between 2px and 6px
        const size = Math.random() * 4 + 2;
        
        // Random position
        const posX = Math.random() * 100;
        const posY = Math.random() * 100;
        
        // Random animation duration between 10s and 30s
        const duration = Math.random() * 20 + 10;
        
        // Random delay to stagger animations
        const delay = -Math.random() * 20;
        
        // Apply styles
        particle.style.width = `${size}px`;
        particle.style.height = `${size}px`;
        particle.style.left = `${posX}vw`;
        particle.style.top = `${posY}vh`;
        particle.style.opacity = Math.random() * 0.5 + 0.1;
        particle.style.animation = `float ${duration}s infinite linear ${delay}s`;
        
        // Random color from a gradient
        const hue = Math.floor(Math.random() * 60) + 200; // Blue/purple range
        particle.style.background = `hsla(${hue}, 80%, 70%, 0.5)`;
        
        // Add to container
        particlesContainer.appendChild(particle);
    }

    // Initialize money rain effects for both offer sections
    const offerSections = [
        { selector: '.left-offer', interval: 3000 },   // Bonus offer
        { selector: '.right-offer', interval: 3500 }   // Daily rewards (slightly different timing)
    ];

    offerSections.forEach(({ selector, interval }) => {
        const offer = document.querySelector(selector);
        if (offer) {
            // Create initial money rain
            createMoneyRain(offer);
            
            // Set up Intersection Observer to trigger animation when in view
            const observer = new IntersectionObserver((entries) => {
                let rainInterval;
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        // Create new money rain at specified interval while in view
                        rainInterval = setInterval(() => {
                            if (entry.isIntersecting) {
                                createMoneyRain(offer);
                            } else {
                                clearInterval(rainInterval);
                            }
                        }, interval);
                    } else {
                        // Clear interval when not intersecting
                        if (rainInterval) {
                            clearInterval(rainInterval);
                        }
                    }
                });
            }, {
                threshold: 0.5 // Trigger when 50% of the element is visible
            });
            
            observer.observe(offer);
        }
    });

    // Add scroll to next section functionality
    const scrollIndicator = document.querySelector('.scroll-indicator');
    if (scrollIndicator) {
        scrollIndicator.addEventListener('click', function() {
            window.scrollTo({
                top: window.innerHeight,
                behavior: 'smooth'
            });
        });
    }
    
    // Initialize theme selection
    setupThemeSelection();
});
