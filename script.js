document.addEventListener('DOMContentLoaded', function() {
    // Mobile Navigation
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('nav ul');
    
    hamburger.addEventListener('click', function() {
        this.classList.toggle('active');
        navMenu.classList.toggle('active');
        document.body.classList.toggle('no-scroll');
    });
    
    // Close mobile menu when clicking a link
    document.querySelectorAll('nav ul li a').forEach(link => {
        link.addEventListener('click', () => {
            hamburger.classList.remove('active');
            navMenu.classList.remove('active');
            document.body.classList.remove('no-scroll');
        });
    });

    // Header scroll effect
    window.addEventListener('scroll', function() {
        const header = document.querySelector('header');
        header.classList.toggle('scrolled', window.scrollY > 50);
    });

    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 80,
                    behavior: 'smooth'
                });
            }
        });
    });

    // Active navigation link based on scroll position
    const sections = document.querySelectorAll('section');
    const navLinks = document.querySelectorAll('nav ul li a');
    
    function updateActiveNav() {
        let current = '';
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            
            if (pageYOffset >= (sectionTop - 300)) {
                current = section.getAttribute('id');
            }
        });
        
        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${current}`) {
                link.classList.add('active');
            }
        });
    }

    window.addEventListener('scroll', updateActiveNav);
    updateActiveNav(); // Run once on page load

    // Portfolio filtering
    const filterButtons = document.querySelectorAll('.filter-btn');
    const portfolioItems = document.querySelectorAll('.portfolio-item');
    
    filterButtons.forEach(button => {
        button.addEventListener('click', function() {
            // Remove active class from all buttons
            filterButtons.forEach(btn => btn.classList.remove('active'));   
            // Add active class to clicked button
            this.classList.add('active');
            
            const filterValue = this.getAttribute('data-filter');
            
            portfolioItems.forEach(item => {
                if (filterValue === 'all' || item.getAttribute('data-category') === filterValue) {
                    item.style.display = 'block';
                    setTimeout(() => {
                        item.style.opacity = '1';
                        item.style.transform = 'translateY(0)';
                    }, 50);
                } else {
                    item.style.opacity = '0';
                    item.style.transform = 'translateY(20px)';
                    setTimeout(() => {
                        item.style.display = 'none';
                    }, 300);
                }
            });
        });
    });

    // Current year in footer
    document.getElementById('year').textContent = new Date().getFullYear();

    // Form submission
    const contactForm = document.getElementById('contactForm');
    
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const submitBtn = this.querySelector('button[type="submit"]');
            const btnText = submitBtn.querySelector('.btn-text');
            const btnLoading = submitBtn.querySelector('.btn-loading');
            
            // Show loading state
            btnText.style.display = 'none';
            btnLoading.style.display = 'inline-block';
            submitBtn.disabled = true;
            
            // Initialize EmailJS (use your Public API Key)
            emailjs.init('wLmncoO05ux580cLn');

            // Send the email
            emailjs.send('service_1nke6f9', 'template_sycc3to', {
                name: document.getElementById('name').value,
                email: document.getElementById('email').value,
                subject: document.getElementById('subject').value,
                message: document.getElementById('message').value
            })
            .then(() => {
                // Show success message
                const successMessage = document.createElement('div');
                successMessage.className = 'success-message';                                                                   
                successMessage.innerHTML = `
                    <i class="fas fa-check-circle"></i>
                    <p>Mahadsanid fariintaada! Waanu helnay waanu kuu soo jawaabaynaa</p>
                `;
                contactForm.prepend(successMessage);
                contactForm.reset();
                
                // Remove message after 5 seconds
                setTimeout(() => {
                    successMessage.remove();
                }, 5000);
            }, (error) => {
                // Show error message
                const errorMessage = document.createElement('div');
                errorMessage.className = 'error-message';
                errorMessage.innerHTML = `
                    <i class="fas fa-exclamation-circle"></i>
                    <p>Qalad ayaa dhacay: ${error.text}</p>
                `;
                contactForm.prepend(errorMessage);
                
                // Remove message after 5 seconds
                setTimeout(() => {
                    errorMessage.remove();
                }, 5000);
            })
            .finally(() => {
                // Reset button state
                btnText.style.display = 'inline-block';
                btnLoading.style.display = 'none';
                submitBtn.disabled = false;
            });
        });
    }

    // Back to top button
    const backToTopBtn = document.querySelector('.back-to-top');
    
    window.addEventListener('scroll', function() {
        if (window.pageYOffset > 300) {
            backToTopBtn.classList.add('active');
        } else {
            backToTopBtn.classList.remove('active');
        }
    });
    
    backToTopBtn.addEventListener('click', function(e) {
        e.preventDefault();
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });

    // Animation on scroll
    const animateOnScroll = function() {
        const elements = document.querySelectorAll(
            '.skill-progress, .portfolio-item, .about-content, .contact-content, .testimonial-item, .blog-post'
        );
        
        elements.forEach(element => {
            const elementPosition = element.getBoundingClientRect().top;
            const windowHeight = window.innerHeight;
            
            if (elementPosition < windowHeight - 100) {
                element.classList.add('animate');
            }
        });
    };
    
    window.addEventListener('scroll', animateOnScroll);
    animateOnScroll(); // Run once on page load

    // Language switcher functionality
    const languageSwitcher = document.querySelectorAll('.language-switcher a');
    
    languageSwitcher.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            // Remove active class from all links
            languageSwitcher.forEach(l => l.classList.remove('active'));
            // Add active class to clicked link
            this.classList.add('active');
            // Here you would implement actual language switching
            console.log('Switching to:', this.getAttribute('data-lang'));
        });
    });

    // Project modal functionality
    const portfolioLinks = document.querySelectorAll('.portfolio-link');
    const portfolioShare = document.querySelectorAll('.portfolio-share');
    
    portfolioLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            // In a real implementation, this would open a project detail modal
            console.log('Opening project:', this.closest('.portfolio-item').querySelector('h3').textContent);
        });
    });
    
    portfolioShare.forEach(share => {
        share.addEventListener('click', function(e) {
            e.preventDefault();
            // In a real implementation, this would open share options
            console.log('Sharing project:', this.closest('.portfolio-item').querySelector('h3').textContent);
        });
    });
});

// Initialize animations when elements are in viewport
const observerOptions = {
    threshold: 0.1
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('in-view');
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

document.querySelectorAll('.animate-on-scroll').forEach(element => {
    observer.observe(element);
});