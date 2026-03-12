



document.addEventListener('DOMContentLoaded', () => {
    document.title = "Bipin Yadav";
    
    const nav = document.querySelector('nav');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            nav.style.padding = '10px 0';
            nav.style.background = 'rgba(10, 10, 10, 0.95)';
        } else {
            nav.style.padding = '20px 0';
            nav.style.background = 'rgba(10, 10, 10, 0.8)';
        }
    });

    const revealElements = document.querySelectorAll('.reveal');
    const revealOnScroll = () => {
        const windowHeight = window.innerHeight;
        const elementVisible = 150;

        revealElements.forEach((reveal) => {
            const elementTop = reveal.getBoundingClientRect().top;
            if (elementTop < windowHeight - elementVisible) {
                reveal.classList.add('active');
            }
        });
    };
    window.addEventListener('scroll', revealOnScroll);
    revealOnScroll(); 

  
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-links a');

    const highlightNav = () => {
        const scrollY = window.scrollY + 200;

        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.offsetHeight;
            const sectionId = section.getAttribute('id');

            if (scrollY >= sectionTop && scrollY < sectionTop + sectionHeight) {
                navLinks.forEach(link => {
                    link.classList.remove('active');
                    if (link.getAttribute('href') === '#' + sectionId) {
                        link.classList.add('active');
                    }
                });
            }
        });
    };

    window.addEventListener('scroll', highlightNav);
    highlightNav();

   
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            document.querySelector(this.getAttribute('href')).scrollIntoView({
                behavior: 'smooth'
            });
        });
    });

    
    const typingText = document.querySelector('.typing-text');
    if (typingText) {
        const words = ['Sr. Design Engineer', 'Mechanical Engineer', 'Ex-Equipment Expert', 'Project Manager'];
        let wordIndex = 0;
        let charIndex = 0;
        let isDeleting = false;
        
        const typeProperties = {
            typingSpeed: 100,
            deletingSpeed: 50,
            delayBetweenWords: 2000
        };

        const type = () => {
            const currentWord = words[wordIndex];
            
            if (isDeleting) {
                typingText.textContent = currentWord.substring(0, charIndex - 1);
                charIndex--;
            } else {
                typingText.textContent = currentWord.substring(0, charIndex + 1);
                charIndex++;
            }

            let typeSpeed = typeProperties.typingSpeed;

            if (isDeleting) {
                typeSpeed = typeProperties.deletingSpeed;
            }

            if (!isDeleting && charIndex === currentWord.length) {
                typeSpeed = typeProperties.delayBetweenWords;
                isDeleting = true;
            } else if (isDeleting && charIndex === 0) {
                isDeleting = false;
                wordIndex = (wordIndex + 1) % words.length;
                typeSpeed = 500;
            }

            setTimeout(type, typeSpeed);
        };

        type();
    }

    const seeMoreBtn = document.getElementById('see-more-certs');

    // Fetch dynamic stats
    const fetchStats = async () => {
        // Count-up animation helper
        const animateCount = (el, target) => {
            const duration = 1500; // ms
            const startTime = performance.now();
            const startVal = 0;

            const step = (currentTime) => {
                const elapsed = currentTime - startTime;
                const progress = Math.min(elapsed / duration, 1);
                // Ease-out cubic
                const eased = 1 - Math.pow(1 - progress, 3);
                const current = Math.round(startVal + (target - startVal) * eased);
                el.textContent = current + '+';
                if (progress < 1) {
                    requestAnimationFrame(step);
                }
            };
            requestAnimationFrame(step);
        };

        // Static stats for Bipin
        const experienceEl = document.getElementById('stat-experience');
        if (experienceEl) animateCount(experienceEl, 6);

        const designsEl = document.getElementById('stat-designs');
        if (designsEl) animateCount(designsEl, 50);

        const certsEl = document.getElementById('stat-certs');
        if (certsEl) animateCount(certsEl, 5);
    };

    // Trigger stats count-up only when the .stats section scrolls into view
    const statsSection = document.querySelector('.stats');
    if (statsSection) {
        let statsFetched = false;
        const statsObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting && !statsFetched) {
                    statsFetched = true;
                    fetchStats();
                    statsObserver.disconnect();
                }
            });
        }, { threshold: 0.3 });
        statsObserver.observe(statsSection);
    }

    if (seeMoreBtn) {
        seeMoreBtn.addEventListener('click', () => {
            const hiddenCerts = document.querySelectorAll('.hidden-cert');
            const isHidden = hiddenCerts[0].style.display === 'none';
            
            hiddenCerts.forEach(cert => {
                if (isHidden) {
                    cert.style.display = 'flex';
                    
                } else {
                    cert.style.display = 'none';
                }
            });
            
            if (isHidden) {
                seeMoreBtn.textContent = 'Show Less';
            } else {
                seeMoreBtn.textContent = 'See More';
            
                document.getElementById('certificates').scrollIntoView({ behavior: 'smooth' });
            }
        });
    }
});
