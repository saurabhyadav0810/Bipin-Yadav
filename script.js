



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

    // ── Roles orbit: position nodes in a circle & draw SVG arrows ──
    const rolesOrbit = document.querySelector('.roles-orbit');
    if (rolesOrbit) {
        const nodes = rolesOrbit.querySelectorAll('.role-node');
        const svg = rolesOrbit.querySelector('.roles-arrows');
        const nodeCount = nodes.length;

        function layoutOrbit() {
            // Skip circular layout on very small screens
            if (window.innerWidth <= 540) return;

            const rect = rolesOrbit.getBoundingClientRect();
            const w = rolesOrbit.offsetWidth;
            const h = rolesOrbit.offsetHeight;
            const cx = w / 2;
            const cy = h / 2;
            const radius = Math.min(cx, cy) * 0.72; // match the dashed ring

            // SVG coordinate scale
            const svgW = 600;
            const svgH = 600;

            // Clear old arrows
            svg.querySelectorAll('line').forEach(l => l.remove());

            nodes.forEach((node, i) => {
                const angle = (2 * Math.PI * i / nodeCount) - Math.PI / 2; // start from top
                const nx = cx + radius * Math.cos(angle);
                const ny = cy + radius * Math.sin(angle);

                // CSS position (% of container)
                node.style.left = (nx / w * 100) + '%';
                node.style.top = (ny / h * 100) + '%';

                // SVG arrow from node toward center, stopping short
                const svgNx = nx / w * svgW;
                const svgNy = ny / h * svgH;
                const svgCx = svgW / 2;
                const svgCy = svgH / 2;

                // Shorten both ends
                const dx = svgCx - svgNx;
                const dy = svgCy - svgNy;
                const dist = Math.sqrt(dx * dx + dy * dy);
                const ux = dx / dist;
                const uy = dy / dist;
                const startOffset = 62; // away from node edge
                const endOffset = 80;   // away from center title
                const x1 = svgNx + ux * startOffset;
                const y1 = svgNy + uy * startOffset;
                const x2 = svgCx - ux * endOffset;
                const y2 = svgCy - uy * endOffset;

                const line = document.createElementNS('http://www.w3.org/2000/svg', 'line');
                line.setAttribute('x1', x1);
                line.setAttribute('y1', y1);
                line.setAttribute('x2', x2);
                line.setAttribute('y2', y2);
                svg.appendChild(line);
            });
        }

        layoutOrbit();
        window.addEventListener('resize', layoutOrbit);
    }

  
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
