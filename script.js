// Enhanced Name Animation - Full name visible then slowly vanishes
        const nameElement = document.getElementById('nameElement');
        let animationCycle = 0;
        
        function startNameAnimation() {
            // Start fully visible
            nameElement.style.opacity = '1';
            nameElement.style.transition = 'opacity 4s ease-in-out';
            
            // Wait 3 seconds, then fade out over 3 seconds
            setTimeout(() => {
                nameElement.style.opacity = '0';
                
                // Wait 1 second, then fade back in
                setTimeout(() => {
                    nameElement.style.opacity = '1';
                    
                    // Restart the cycle after 2 seconds
                    setTimeout(startNameAnimation, 2000);
                }, 1000);
            }, 3000);
        }
        
        // Start animation
        window.addEventListener('load', () => {
            setTimeout(startNameAnimation, 1000);
        });
        
        // Feature Notification System (Middle of screen)
        const featureNotification = document.getElementById('featureNotification');
        const featureNotificationClose = document.getElementById('featureNotificationClose');
        const featureTitle = document.getElementById('featureTitle');
        const featureMessage = document.getElementById('featureMessage');
        
        // Feature descriptions for different sections
        const featureDescriptions = {
            home: {
                title: "Welcome to My Portfolio",
                message: "Hi, I'm Shubhankar Jana - a Senior Full Stack Developer & Technical Lead with 7+ years of experience creating cutting-edge web applications."
            },
            about: {
                title: "About Me",
                message: "I'm a passionate developer based in Kolkata, India, specializing in full-stack development with expertise across the entire tech stack."
            },
            experience: {
                title: "Professional Experience",
                message: "With experience at top tech companies including Google and Microsoft, I've led teams and built scalable solutions for millions of users."
            },
            skills: {
                title: "Technical Skills",
                message: "Proficient in modern web technologies including React, Node.js, TypeScript, AWS, and DevOps tools. Continuously learning and adapting to new technologies."
            },
            projects: {
                title: "Featured Projects",
                message: "Check out my portfolio of enterprise-grade applications including analytics platforms, e-commerce systems, and fintech solutions."
            },
            contact: {
                title: "Let's Connect",
                message: "Open to new opportunities and collaborations. Feel free to reach out for project discussions, consulting, or just to say hello!"
            },
            resume: {
                title: "Resume Download",
                message: "Download my detailed resume to learn more about my professional experience, skills, and accomplishments."
            }
        };
        
        // Show feature notification
        function showFeatureNotification(section) {
            if (featureDescriptions[section]) {
                featureTitle.textContent = featureDescriptions[section].title;
                featureMessage.textContent = featureDescriptions[section].message;
                featureNotification.classList.add('show');
                
                // Auto-hide after 5 seconds
                setTimeout(() => {
                    featureNotification.classList.remove('show');
                }, 5000);
            }
        }
        
        // Close notification
        featureNotificationClose.addEventListener('click', () => {
            featureNotification.classList.remove('show');
        });
        
        // Mobile Menu Toggle
        const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
        const navLinks = document.querySelector('.nav-links');
        
        mobileMenuBtn.addEventListener('click', () => {
            navLinks.classList.toggle('active');
            const icon = mobileMenuBtn.querySelector('i');
            icon.classList.toggle('fa-bars');
            icon.classList.toggle('fa-times');
        });
        
        // Close mobile menu when clicking on a link
        document.querySelectorAll('.nav-links a').forEach(link => {
            link.addEventListener('click', (e) => {
                // Get section from href
                const href = link.getAttribute('href');
                if (href === '#') {
                    showFeatureNotification('resume');
                } else if (href.startsWith('#')) {
                    const section = href.substring(1);
                    if (featureDescriptions[section]) {
                        showFeatureNotification(section);
                    }
                }
                
                if (window.innerWidth <= 768) {
                    navLinks.classList.remove('active');
                    const icon = mobileMenuBtn.querySelector('i');
                    icon.classList.remove('fa-times');
                    icon.classList.add('fa-bars');
                }
            });
        });
        
        // Experience Tabs
        const tabButtons = document.querySelectorAll('.tab-button');
        const tabPanels = document.querySelectorAll('.tab-panel');
        
        tabButtons.forEach(button => {
            button.addEventListener('click', () => {
                // Remove active class from all buttons and panels
                tabButtons.forEach(btn => btn.classList.remove('active'));
                tabPanels.forEach(panel => panel.classList.remove('active'));
                
                // Add active class to clicked button
                button.classList.add('active');
                
                // Show corresponding panel
                const tabId = button.getAttribute('data-tab');
                document.getElementById(tabId).classList.add('active');
                
                // Show notification for experience section
                showFeatureNotification('experience');
            });
        });
        
        // Animated Particles Background
        function createParticles() {
            const particlesContainer = document.getElementById('particles');
            const particleCount = 50;
            
            for (let i = 0; i < particleCount; i++) {
                const particle = document.createElement('div');
                particle.className = 'particle';
                
                // Random properties
                const size = Math.random() * 4 + 1;
                const posX = Math.random() * 100;
                const posY = Math.random() * 100;
                const duration = Math.random() * 20 + 10;
                const delay = Math.random() * 5;
                const opacity = Math.random() * 0.3 + 0.1;
                
                particle.style.width = `${size}px`;
                particle.style.height = `${size}px`;
                particle.style.left = `${posX}%`;
                particle.style.top = `${posY}%`;
                particle.style.opacity = opacity;
                particle.style.animation = `float ${duration}s ease-in-out ${delay}s infinite`;
                
                particlesContainer.appendChild(particle);
            }
        }
        
        // Initialize particles
        createParticles();
        
        // Animate skill bars on scroll
        function animateSkillBars() {
            const skillBars = document.querySelectorAll('.skill-progress');
            
            skillBars.forEach(bar => {
                const width = bar.getAttribute('data-width');
                bar.style.width = '0%';
                
                setTimeout(() => {
                    bar.style.width = `${width}%`;
                }, 100);
            });
            
            // Show notification for skills section
            showFeatureNotification('skills');
        }
        
        // Observe skill section
        const skillsSection = document.getElementById('skills');
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    animateSkillBars();
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.3 });
        
        if (skillsSection) {
            observer.observe(skillsSection);
        }
        
        // Show notification on click events for CTA buttons
        document.querySelectorAll('.cta-button, .email-link, .project-link, .social-link, .resume-btn').forEach(element => {
            element.addEventListener('click', (e) => {
                // Get appropriate message based on element
                let section = 'home';
                
                if (element.classList.contains('cta-button')) {
                    if (element.classList.contains('primary')) {
                        section = 'projects';
                    } else {
                        section = 'contact';
                    }
                } else if (element.classList.contains('email-link')) {
                    section = 'contact';
                } else if (element.classList.contains('project-link')) {
                    section = 'projects';
                } else if (element.classList.contains('social-link')) {
                    section = 'contact';
                } else if (element.classList.contains('resume-btn')) {
                    section = 'resume';
                }
                
                showFeatureNotification(section);
                
                // Prevent default for demo purposes (except for actual links)
                if (element.getAttribute('href') === '#') {
                    e.preventDefault();
                }
            });
        });
        
        // Navbar scroll effect
        window.addEventListener('scroll', () => {
            const nav = document.querySelector('nav');
            const backToTop = document.getElementById('backToTop');
            
            // Navbar effect
            if (window.scrollY > 100) {
                nav.style.backgroundColor = 'rgba(10, 25, 47, 0.97)';
                nav.style.backdropFilter = 'blur(20px) saturate(200%)';
                nav.style.boxShadow = '0 10px 30px -10px rgba(2, 12, 27, 0.8)';
            } else {
                nav.style.backgroundColor = 'rgba(10, 25, 47, 0.9)';
                nav.style.backdropFilter = 'blur(15px) saturate(180%)';
                nav.style.boxShadow = '0 10px 30px -10px rgba(2, 12, 27, 0.7)';
            }
            
            // Back to top button
            if (window.scrollY > 500) {
                backToTop.classList.add('visible');
            } else {
                backToTop.classList.remove('visible');
            }
        });
        
        // Smooth scroll for anchor links
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', function (e) {
                const targetId = this.getAttribute('href');
                if (targetId === '#') return;
                
                const targetElement = document.querySelector(targetId);
                if (targetElement) {
                    e.preventDefault();
                    
                    // Show feature notification for the section
                    const section = targetId.substring(1);
                    if (featureDescriptions[section]) {
                        showFeatureNotification(section);
                    }
                    
                    window.scrollTo({
                        top: targetElement.offsetTop - 100,
                        behavior: 'smooth'
                    });
                }
            });
        });
        
        // Scroll reveal animation
        const scrollObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';
                }
            });
        }, {
            threshold: 0.1,
            rootMargin: '0px 0px -100px 0px'
        });
        
        // Observe elements for animation
        document.querySelectorAll('section, .project-card, .skill-category, .contact-card').forEach(el => {
            el.style.opacity = '0';
            el.style.transform = 'translateY(30px)';
            el.style.transition = 'opacity 0.8s ease, transform 0.8s ease';
            scrollObserver.observe(el);
        });
        
        // Initialize
        window.addEventListener('DOMContentLoaded', () => {
            // Add loaded class for initial animations
            document.body.classList.add('loaded');
        });