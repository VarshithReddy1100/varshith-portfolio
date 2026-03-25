document.addEventListener('DOMContentLoaded', () => {
    // Premium Smooth Scrolling for navigation links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            if(targetId === '#') return;
            const targetElement = document.querySelector(targetId);
            
            if(targetElement) {
                const navHeight = 80;
                const targetPosition = targetElement.getBoundingClientRect().top + window.pageYOffset - navHeight;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });

    // Scroll Reveal Animation (Apple-style smooth fade up)
    const revealElements = document.querySelectorAll('.reveal');
    const revealOptions = {
        threshold: 0.1,
        rootMargin: "0px 0px -50px 0px"
    };

    const revealOnScroll = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
            } else {
                entry.target.classList.remove('active');
            }
        });
    }, revealOptions);

    revealElements.forEach(el => {
        revealOnScroll.observe(el);
    });
    
    // Trigger scroll to catch elements already in viewport on load
    setTimeout(() => {
        window.dispatchEvent(new Event('scroll'));
        // Fallback for elements in viewport immediately
        revealElements.forEach(el => {
            const rect = el.getBoundingClientRect();
            if(rect.top < window.innerHeight) {
                el.classList.add('active');
            }
        });
    }, 100);

    // Advanced Magnetic Buttons
    const magneticElements = document.querySelectorAll('.btn, .social-icon, .floating-contact-btn');
    magneticElements.forEach((el) => {
        el.addEventListener('mousemove', (e) => {
            const rect = el.getBoundingClientRect();
            const x = (e.clientX - rect.left - rect.width / 2) * 0.4;
            const y = (e.clientY - rect.top - rect.height / 2) * 0.4;
            
            el.style.transform = `translate(${x}px, ${y}px)`;
            
            const inner = el.querySelector('span') || el.querySelector('i');
            if (inner) {
                inner.style.transform = `translate(${x * 0.5}px, ${y * 0.5}px)`;
            }
        });

        el.addEventListener('mouseleave', () => {
            el.style.transform = `translate(0px, 0px)`;
            const inner = el.querySelector('span') || el.querySelector('i');
            if (inner) {
                inner.style.transform = `translate(0px, 0px)`;
            }
        });
    });

    // Profile Image 3D Parallax Tracking
    const profileImage = document.querySelector('.profile-photo');
    if (profileImage) {
        document.addEventListener('mousemove', (e) => {
            const x = (window.innerWidth / 2 - e.clientX) / 40;
            const y = (window.innerHeight / 2 - e.clientY) / 40;
            profileImage.style.transform = `rotateY(${x}deg) rotateX(${y}deg)`;
        });
    }
});
