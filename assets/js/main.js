// Initialize AOS with enhanced settings
document.addEventListener('DOMContentLoaded', function() {
    // Initialize AOS
    AOS.init({
        duration: 800,
        once: true,
        offset: 100,
        easing: 'ease-out-cubic'
    });

    // Smooth scrolling
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            document.querySelector(this.getAttribute('href')).scrollIntoView({
                behavior: 'smooth'
            });
        });
    });

    // Enhanced navbar scroll effect
    window.addEventListener('scroll', function() {
        const nav = document.querySelector('.nav-bar');
        if (window.scrollY > 50) {
            nav.style.backgroundColor = 'rgba(0, 0, 0, 0.95)';
            nav.style.boxShadow = '0 10px 30px -10px rgba(0, 0, 0, 0.3)';
        } else {
            nav.style.backgroundColor = 'rgba(0, 0, 0, 0.85)';
            nav.style.boxShadow = 'none';
        }
    });

    // Mobile menu toggle
    const mobileMenuToggle = document.querySelector('.mobile-menu-toggle');
    const navLinks = document.querySelector('.nav-links');
    
    if (mobileMenuToggle) {
        mobileMenuToggle.addEventListener('click', function() {
            navLinks.classList.toggle('active');
        });
    }

    // Close mobile menu when clicking outside
    document.addEventListener('click', function(event) {
        if (!event.target.closest('.nav-bar')) {
            if (navLinks.classList.contains('active')) {
                navLinks.classList.remove('active');
            }
        }
    });

    // Contact form submission
    const contactForm = document.getElementById('contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', async function(e) {
            e.preventDefault();
            
            const formMessage = document.getElementById('form-message');
            const name = document.getElementById('name').value.trim();
            const email = document.getElementById('email').value.trim();
            const message = document.getElementById('message').value.trim();

            // Email validation regex
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

            // Validate input
            if (!name || !email || !message) {
                formMessage.textContent = 'All fields are required!';
                formMessage.className = 'form-message error';
                formMessage.style.display = 'block';
                return;
            }

            if (!emailRegex.test(email)) {
                formMessage.textContent = 'Invalid email format!';
                formMessage.className = 'form-message error';
                formMessage.style.display = 'block';
                return;
            }

            const formData = { name, email, message };

            try {
                // Send data to Flask backend
                const response = await fetch('https://portfolio-backend-441b.onrender.com/api/contact', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(formData)
                });

                const result = await response.json();

                if (!response.ok) {
                    throw new Error(result.error || 'Something went wrong! Try again later.');
                }

                // Success message
                formMessage.textContent = 'Message sent successfully!';
                formMessage.className = 'form-message success';
                formMessage.style.display = 'block';
                contactForm.reset();
                
            } catch (error) {
                formMessage.textContent = `Error: ${error.message}`;
                formMessage.className = 'form-message error';
                formMessage.style.display = 'block';
            }

            // Hide message after 5 seconds
            setTimeout(() => {
                formMessage.style.display = 'none';
            }, 5000);
        });
    }
});
