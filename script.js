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
            }, 500);
        }, 3); // Show preloader for at least 3 seconds
    });

    // Mobile navigation
    const hamburger = document.querySelector('.hamburger');
    const navLinks = document.querySelector('.nav-links');
    
    hamburger.addEventListener('click', () => {
        hamburger.classList.toggle('active');
        navLinks.classList.toggle('active');
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
}); 