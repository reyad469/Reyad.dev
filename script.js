document.addEventListener('DOMContentLoaded', function() {
    // Preloader handling
    const preloader = document.getElementById('preloader');
    const preloaderFrame = preloader.querySelector('iframe');
    
    // Hide preloader after content is loaded
    window.addEventListener('load', () => {
        setTimeout(() => {
            preloader.classList.add('hidden');
            setTimeout(() => {
                preloader.style.display = 'none';
            }, 5);
        }, 3); // Show preloader for at least 0.1 seconds
    });

    // Mobile navigation
    const hamburger = document.querySelector('.hamburger');
    const navLinks = document.querySelector('.nav-links');
    
    // Create particle container and canvas for mobile navigation
    const particleContainer = document.createElement('div');
    particleContainer.className = 'particle-container';
    navLinks.appendChild(particleContainer);

    const canvas = document.createElement('canvas');
    canvas.className = 'particle-canvas';
    particleContainer.appendChild(canvas);
    const ctx = canvas.getContext('2d');

    const particles = [];
    const particleCount = 80; // Number of particles
    const connectionDistance = 100; // Max distance for particles to connect with a line

    class Particle {
        constructor(canvasWidth, canvasHeight) {
            this.canvasWidth = canvasWidth;
            this.canvasHeight = canvasHeight;
            this.reset();
        }

        reset() {
            this.x = Math.random() * this.canvasWidth;
            this.y = Math.random() * this.canvasHeight;
            this.size = Math.random() * 2 + 1; // Particle size
            this.speedX = Math.random() * 0.8 - 0.4; // Slower movement
            this.speedY = Math.random() * 0.8 - 0.4; // Slower movement
            this.opacity = Math.random() * 0.3 + 0.1; // Particle opacity
        }

        update() {
            this.x += this.speedX;
            this.y += this.speedY;

            // Bounce off edges
            if (this.x < 0 || this.x > this.canvasWidth) this.speedX *= -1;
            if (this.y < 0 || this.y > this.canvasHeight) this.speedY *= -1;
        }

        draw(ctx) {
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
            ctx.fillStyle = `rgba(0, 255, 255, ${this.opacity})`; // Cyan particles
            ctx.fill();
        }
    }

    function initParticles() {
        canvas.width = navLinks.offsetWidth;
        canvas.height = navLinks.offsetHeight;
        particles.length = 0;
        for (let i = 0; i < particleCount; i++) {
            particles.push(new Particle(canvas.width, canvas.height));
        }
    }

    function animateParticles() {
        if (!navLinks.classList.contains('active')) {
            // Stop animation if menu is not active
            return;
        }
        
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        for (let i = 0; i < particles.length; i++) {
            particles[i].update();
            particles[i].draw(ctx);

            for (let j = i + 1; j < particles.length; j++) {
                const dx = particles[i].x - particles[j].x;
                const dy = particles[i].y - particles[j].y;
                const distance = Math.sqrt(dx * dx + dy * dy);

                // Connect particles if they are close enough
                if (distance < connectionDistance) {
                    ctx.beginPath();
                    ctx.moveTo(particles[i].x, particles[i].y);
                    ctx.lineTo(particles[j].x, particles[j].y);
                    // Adjust line opacity based on distance
                    const lineOpacity = 1 - (distance / connectionDistance);
                    ctx.strokeStyle = `rgba(0, 255, 255, ${lineOpacity * 0.3})`; // Cyan lines, max opacity 0.3
                    ctx.lineWidth = 0.5;
                    ctx.stroke();
                }
            }
        }
        requestAnimationFrame(animateParticles);
    }

    // Update canvas size on window resize
    window.addEventListener('resize', () => {
        if (navLinks.classList.contains('active')) {
            initParticles();
        }
    });

    hamburger.addEventListener('click', () => {
        hamburger.classList.toggle('active');
        navLinks.classList.toggle('active');
        
        if (navLinks.classList.contains('active')) {
            initParticles();
            animateParticles();
        }
    });

    // Close menu when clicking outside
    document.addEventListener('click', (e) => {
        if (!hamburger.contains(e.target) && !navLinks.contains(e.target)) {
            hamburger.classList.remove('active');
            navLinks.classList.remove('active');
        }
    });

    // Close menu when clicking on a link
    document.querySelectorAll('.nav-links a').forEach(link => {
        link.addEventListener('click', () => {
            hamburger.classList.remove('active');
            navLinks.classList.remove('active');
        });
    });

    // Page transitions
    const mainContent = document.querySelector('main');
    if (mainContent) {
        mainContent.classList.add('page-transition');
        setTimeout(() => {
            mainContent.classList.add('active');
        }, 100);
    }

    // Active link highlighting
    const currentPage = window.location.pathname.split('/').pop() || 'index.html';
    const navItems = document.querySelectorAll('.nav-links a');
    
    navItems.forEach(item => {
        if (item.getAttribute('href') === currentPage) {
            item.classList.add('active');
        }
    });

    // Make Hero Section visible with fade-in animation
    const heroSection = document.getElementById('hero');
    if (heroSection) {
        // Delay to allow CSS to render initial state before animation
        setTimeout(() => {
            heroSection.classList.add('is-visible');
        }, 100);
    }

    // Particle system for Hero Section
    const heroCanvas = document.getElementById('particle-canvas');
    if (heroCanvas) {
        const heroCtx = heroCanvas.getContext('2d');
        const heroParticles = [];
        const heroParticleCount = 60; // Adjust as needed for density
        const heroConnectionDistance = 150; // Adjust as needed for connection density

        class HeroParticle {
            constructor(canvasWidth, canvasHeight) {
                this.canvasWidth = canvasWidth;
                this.canvasHeight = canvasHeight;
                this.reset();
            }

            reset() {
                this.x = Math.random() * this.canvasWidth;
                this.y = Math.random() * this.canvasHeight;
                this.size = Math.random() * 2 + 1; // Particle size
                this.speedX = Math.random() * 0.5 - 0.25; // Slower movement
                this.speedY = Math.random() * 0.5 - 0.25; // Slower movement
                this.opacity = Math.random() * 0.3 + 0.1; // Particle opacity
            }

            update() {
                this.x += this.speedX;
                this.y += this.speedY;

                // Bounce off edges
                if (this.x < 0 || this.x > this.canvasWidth) this.speedX *= -1;
                if (this.y < 0 || this.y > this.canvasHeight) this.speedY *= -1;
            }

            draw(ctx) {
                ctx.beginPath();
                ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
                ctx.fillStyle = `rgba(0, 255, 255, ${this.opacity})`; // Cyan particles
                ctx.fill();
            }
        }

        function initHeroParticles() {
            heroCanvas.width = heroCanvas.offsetWidth;
            heroCanvas.height = heroCanvas.offsetHeight;
            heroParticles.length = 0;
            for (let i = 0; i < heroParticleCount; i++) {
                heroParticles.push(new HeroParticle(heroCanvas.width, heroCanvas.height));
            }
        }

        function animateHeroParticles() {
            heroCtx.clearRect(0, 0, heroCanvas.width, heroCanvas.height);

            for (let i = 0; i < heroParticles.length; i++) {
                heroParticles[i].update();
                heroParticles[i].draw(heroCtx);

                for (let j = i + 1; j < heroParticles.length; j++) {
                    const dx = heroParticles[i].x - heroParticles[j].x;
                    const dy = heroParticles[i].y - heroParticles[j].y;
                    const distance = Math.sqrt(dx * dx + dy * dy);

                    if (distance < heroConnectionDistance) {
                        heroCtx.beginPath();
                        heroCtx.moveTo(heroParticles[i].x, heroParticles[i].y);
                        heroCtx.lineTo(heroParticles[j].x, heroParticles[j].y);
                        const lineOpacity = 1 - (distance / heroConnectionDistance);
                        heroCtx.strokeStyle = `rgba(0, 255, 255, ${lineOpacity * 0.15})`; // Cyan lines, max opacity 0.15
                        heroCtx.lineWidth = 0.5;
                        heroCtx.stroke();
                    }
                }
            }
            requestAnimationFrame(animateHeroParticles);
        }

        // Initialize and start animation when the page loads
        window.addEventListener('load', () => {
            initHeroParticles();
            animateHeroParticles();
        });

        // Update canvas size on window resize
        window.addEventListener('resize', () => {
            initHeroParticles();
        });
    }
});