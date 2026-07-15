
document.addEventListener('DOMContentLoaded', function () {
    'use strict';

    function animateCounters() {
        const counters = document.querySelectorAll('.stat-number[data-count]');

        counters.forEach((counter) => {
            const target = parseInt(counter.getAttribute('data-count'), 10);
            const duration = 1500;
            const stepTime = 16;
            const steps = duration / stepTime;
            const increment = target / steps;
            let current = 0;

            const updateCounter = () => {
                current += increment;
                if (current < target) {
                    counter.textContent = Math.floor(current);
                    requestAnimationFrame(updateCounter);
                } else {
                    counter.textContent = target;
                }
            };

            updateCounter();
        });
    }

    const heroSection = document.querySelector('.projects-hero');
    if (heroSection) {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    animateCounters();
                    observer.disconnect();
                }
            });
        }, { threshold: 0.3 });

        observer.observe(heroSection);
    }

    const filterButtons = document.querySelectorAll('.filter-btn');
    const searchInput = document.getElementById('projectSearch');
    const projectCards = document.querySelectorAll('.project-card-full');
    const loadMoreBtn = document.getElementById('loadMoreBtn');

    let visibleCount = 6;
    const loadMoreCount = 6;

    function initProjectVisibility() {
        projectCards.forEach((card, index) => {
            if (index < visibleCount) {
                card.style.display = 'block';
                card.style.animation = 'fadeIn 0.4s ease';
            } else {
                card.style.display = 'none';
            }
        });
        updateLoadMoreButton();
    }

    filterButtons.forEach((btn) => {
        btn.addEventListener('click', function () {
            filterButtons.forEach((b) => b.classList.remove('active'));
            this.classList.add('active');

            const filter = this.getAttribute('data-filter');
            const searchTerm = searchInput.value.toLowerCase().trim();

            filterProjects(filter, searchTerm);
        });
    });

    searchInput.addEventListener('input', function () {
        const searchTerm = this.value.toLowerCase().trim();
        const activeFilter = document.querySelector('.filter-btn.active');
        const filter = activeFilter ? activeFilter.getAttribute('data-filter') : 'all';

        filterProjects(filter, searchTerm);
    });

    function filterProjects(category, searchTerm) {
        let visible = 0;

        projectCards.forEach((card) => {
            const cardCategory = card.getAttribute('data-category');
            const cardTitle = card.querySelector('h3')?.textContent.toLowerCase() || '';
            const cardDesc = card.querySelector('p')?.textContent.toLowerCase() || '';

            const matchesCategory = category === 'all' || cardCategory === category;
            const matchesSearch =
                searchTerm === '' ||
                cardTitle.includes(searchTerm) ||
                cardDesc.includes(searchTerm);

            if (matchesCategory && matchesSearch) {
                card.style.display = 'block';
                card.style.animation = 'fadeIn 0.3s ease';
                visible++;
            } else {
                card.style.display = 'none';
            }
        });

        updateLoadMoreButton(visible);
    }

    function updateLoadMoreButton(visibleCountParam) {
        if (!loadMoreBtn) return;

        const total = projectCards.length;
        const visible = visibleCountParam !== undefined ? visibleCountParam : document.querySelectorAll('.project-card-full[style*="display: block"]').length;
        const hidden = document.querySelectorAll('.project-card-full[style*="display: none"]').length;

        if (visible === 0) {
            loadMoreBtn.innerHTML = '<i class="fas fa-search"></i> No projects found';
            loadMoreBtn.disabled = true;
        } else if (hidden === 0 && visible === total) {
            loadMoreBtn.innerHTML = '<i class="fas fa-check-circle"></i> All projects loaded';
            loadMoreBtn.disabled = true;
        } else {
            loadMoreBtn.innerHTML = `
                <i class="fas fa-plus-circle"></i>
                Load More Projects (${visible} of ${total})
            `;
            loadMoreBtn.disabled = false;
        }
    }

    if (loadMoreBtn) {
        initProjectVisibility();

        loadMoreBtn.addEventListener('click', function () {
            const hiddenCards = document.querySelectorAll(
                '.project-card-full[style*="display: none"]'
            );

            let loaded = 0;
            hiddenCards.forEach((card) => {
                if (loaded < loadMoreCount) {
                    card.style.display = 'block';
                    card.style.animation = 'fadeIn 0.4s ease';
                    loaded++;
                }
            });

            visibleCount += loaded;

            const remaining = document.querySelectorAll(
                '.project-card-full[style*="display: none"]'
            ).length;

            if (remaining === 0) {
                this.innerHTML = '<i class="fas fa-check-circle"></i> All projects loaded!';
                this.disabled = true;
            } else {
                const total = projectCards.length;
                const visible = total - remaining;
                this.innerHTML = `
                    <i class="fas fa-plus-circle"></i>
                    Load More Projects (${visible} of ${total})
                `;
            }
        });
    }

    const modal = document.getElementById('projectModal');
    const modalBody = document.getElementById('modalBody');
    const modalClose = document.getElementById('modalClose');
    const modalOverlay = document.querySelector('.modal-overlay');


    const imageBasePath = '/static/core/images/projects/';

    const projectData = {
        1: {
            title: '01 Shop',
            category: 'E-Commerce',
            description: 'Modern ecommerce platform with authentication, shopping cart, and admin dashboard.',
            tech: ['Python', 'Django', 'HTML5', 'CSS3', 'JavaScript', 'PostgreSQL'],
            image: 'online-shop.webp',
            demo: '#',
            github: '#'
        },
        2: {
            title: '02 Blog',
            category: 'CMS',
            description: 'Modern blog CMS with categories, rich text editor, comments system, and responsive design.',
            tech: ['Python', 'Django', 'HTML5', 'CSS3', 'JavaScript'],
            image: 'blog-platform.webp',
            demo: '#',
            github: '#'
        },
        3: {
            title: '03 Taskly',
            category: 'Productivity',
            description: 'Task management dashboard with organized categories including Development, Programming, Technology, and Lifestyle.',
            tech: ['Python', 'Django', 'HTML5', 'CSS3', 'JavaScript', 'Bootstrap'],
            image: 'task-manager.webp',
            demo: '#',
            github: '#'
        },
        4: {
            title: '04 Weather',
            category: 'Dashboard',
            description: 'Real-time weather dashboard showing temperature, humidity, wind speed, and feels-like temperature.',
            tech: ['Python', 'Django', 'HTML5', 'CSS3', 'JavaScript', 'API'],
            image: 'weather.webp',
            demo: '#',
            github: '#'
        },
        5: {
            title: '05 Chattiie',
            category: 'Social',
            description: 'Real-time chat application with user authentication, direct messaging, online status, and typing indicators.',
            tech: ['Python', 'Django', 'WebSocket', 'HTML5', 'CSS3', 'JavaScript'],
            image: 'chattiie.webp',
            demo: '#',
            github: '#'
        },
        6: {
            title: '06 Analytics',
            category: 'Dashboard',
            description: 'Advanced analytics dashboard with real-time metrics, user engagement tracking, session duration, and conversion rate analytics.',
            tech: ['Python', 'Django', 'HTML5', 'CSS3', 'JavaScript', 'Chart.js'],
            image: 'analytics.webp',
            demo: '#',
            github: '#'
        },
        7: {
            title: '07 PORTO',
            category: 'Portfolio',
            description: 'Professional portfolio website with Home, About, Projects, Skills, and Contact sections.',
            tech: ['Python', 'Django', 'HTML5', 'CSS3', 'JavaScript'],
            image: 'porto.webp',
            demo: '#',
            github: '#'
        },
        8: {
            title: '08 MovieFlix',
            category: 'CMS',
            description: 'Movie streaming platform with detailed movie information, ratings, duration, and watch functionality.',
            tech: ['Python', 'Django', 'HTML5', 'CSS3', 'JavaScript', 'API'],
            image: 'movieflix.webp',
            demo: '#',
            github: '#'
        },
        9: {
            title: '09 Notesy',
            category: 'Productivity',
            description: 'Note-taking application with organized categories: All Notes, Favorites, Work, Personal, Ideas, and Trash.',
            tech: ['Python', 'Django', 'HTML5', 'CSS3', 'JavaScript'],
            image: 'notesy.webp',
            demo: '#',
            github: '#'
        },
        10: {
            title: '10 Finance',
            category: 'Dashboard',
            description: 'Personal finance dashboard tracking total balance, income, expenses, and percentage analytics.',
            tech: ['Python', 'Django', 'HTML5', 'CSS3', 'JavaScript', 'Chart.js'],
            image: 'finance.webp',
            demo: '#',
            github: '#'
        },
        11: {
            title: '11 Portfolio Website',
            category: 'Portfolio',
            description: 'Modern portfolio website with Home, About, Projects, Skills, and Contact sections.',
            tech: ['Python', 'Django', 'HTML5', 'CSS3', 'JavaScript'],
            image: 'portfolio-website.webp',
            demo: '#',
            github: '#'
        },
        12: {
            title: '12 Analytics Dashboard',
            category: 'Dashboard',
            description: 'Comprehensive analytics dashboard with sections for Home, Projects, Work, Ideas, and Trash.',
            tech: ['Python', 'Django', 'HTML5', 'CSS3', 'JavaScript', 'React'],
            image: 'analytics-dashboard.webp',
            demo: '#',
            github: '#'
        },
        13: {
            title: '13 Portfolio Website v2',
            category: 'Portfolio',
            description: 'Redesigned portfolio website with improved UI, smooth animations, better project showcase, and dark mode support.',
            tech: ['Python', 'Django', 'HTML5', 'CSS3', 'JavaScript', 'GSAP'],
            image: 'portfolio-v2.webp',
            demo: '#',
            github: '#'
        },
        14: {
            title: '14 Portfolio Website v3',
            category: 'Portfolio',
            description: 'Latest portfolio website with modern design, interactive project cards, dark mode, and optimized performance.',
            tech: ['Python', 'Django', 'HTML5', 'CSS3', 'JavaScript', 'Tailwind'],
            image: 'portfolio-v3.webp',
            demo: '#',
            github: '#'
        }
    };

    // Open modal
    document.querySelectorAll('.btn-details').forEach((btn) => {
        btn.addEventListener('click', function () {
            const projectId = this.getAttribute('data-project');
            const data = projectData[projectId];

            if (data) {
                modalBody.innerHTML = `
                    <div style="position: relative; border-radius: 16px; overflow: hidden; margin-bottom: 24px; background: #0a0e17;">
                        <img src="${imageBasePath}${data.image}" alt="${data.title}" style="width: 100%; display: block; aspect-ratio: 16/9; object-fit: cover;" />
                        <div style="position: absolute; top: 16px; right: 16px; background: rgba(0,255,136,0.15); color: #00ff88; padding: 4px 14px; border-radius: 50px; font-size: 0.75rem; font-weight: 600; border: 1px solid rgba(0,255,136,0.2);">
                            ${data.category}
                        </div>
                    </div>
                    <h2 style="font-size: 2rem; font-weight: 800; color: #fff; margin-bottom: 8px;">${data.title}</h2>
                    <div style="display: flex; gap: 10px; flex-wrap: wrap; margin-bottom: 16px;">
                        <span style="color: var(--primary); font-size: 0.85rem; font-weight: 600; text-transform: uppercase; letter-spacing: 1px; background: rgba(0,255,136,0.08); padding: 4px 14px; border-radius: 50px;">${data.category}</span>
                    </div>
                    <p style="color: var(--text-muted); line-height: 1.8; font-size: 1.05rem; margin: 15px 0;">${data.description}</p>
                    <div style="margin: 20px 0;">
                        <h4 style="color: #fff; font-size: 0.9rem; margin-bottom: 12px; font-weight: 600;">Technologies Used</h4>
                        <div style="display: flex; gap: 10px; flex-wrap: wrap;">
                            ${data.tech.map(t => `<span style="background: rgba(0,255,136,0.08); color: var(--primary); padding: 6px 18px; border-radius: 50px; font-size: 0.85rem; border: 1px solid rgba(0,255,136,0.1);">${t}</span>`).join('')}
                        </div>
                    </div>
                    <div style="display: flex; gap: 12px; margin-top: 10px; flex-wrap: wrap;">
                        <a href="${data.demo}" class="btn-demo-sm" style="padding: 12px 28px; border-radius: 12px; text-decoration: none; background: var(--primary); color: #000; font-weight: 600; display: inline-flex; align-items: center; gap: 8px; transition: all 0.3s ease;">
                            <i class="fas fa-external-link-alt"></i> Live Demo
                        </a>
                        <a href="${data.github}" class="btn-github-sm" style="padding: 12px 28px; border-radius: 12px; text-decoration: none; border: 1px solid var(--border-light); color: var(--text-white); display: inline-flex; align-items: center; gap: 8px; transition: all 0.3s ease;">
                            <i class="fab fa-github"></i> View Code
                        </a>
                    </div>
                `;

                modal.classList.add('open');
                document.body.style.overflow = 'hidden';
            }
        });
    });

    function closeModal() {
        modal.classList.remove('open');
        document.body.style.overflow = '';
    }

    if (modalClose) {
        modalClose.addEventListener('click', closeModal);
    }

    if (modalOverlay) {
        modalOverlay.addEventListener('click', closeModal);
    }

    document.addEventListener('keydown', function (e) {
        if (e.key === 'Escape') {
            closeModal();
        }
    });


    const skillCards = document.querySelectorAll('.skill-card');

    skillCards.forEach((card) => {
        // Click to toggle tooltip on mobile
        card.addEventListener('click', function (e) {
            e.stopPropagation();
            const tooltip = this.querySelector('.skill-tooltip');
            if (tooltip) {
                const isVisible = tooltip.style.opacity === '1';
                // Close all other tooltips
                document.querySelectorAll('.skill-card .skill-tooltip').forEach(t => {
                    t.style.opacity = '0';
                    t.style.transform = 'scale(0.9)';
                });
                // Toggle current
                if (!isVisible) {
                    tooltip.style.opacity = '1';
                    tooltip.style.transform = 'scale(1)';
                }
            }
        });
    });

    document.addEventListener('click', function () {
        document.querySelectorAll('.skill-card .skill-tooltip').forEach(t => {
            t.style.opacity = '0';
            t.style.transform = 'scale(0.9)';
        });
    });


    filterButtons.forEach((btn) => {
        btn.setAttribute('tabindex', '0');
        btn.setAttribute('role', 'button');

        btn.addEventListener('keydown', function (e) {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                this.click();
            }
        });
    });

    projectCards.forEach((card) => {
        card.setAttribute('tabindex', '0');
        card.setAttribute('role', 'article');

        card.addEventListener('keydown', function (e) {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                const detailsBtn = this.querySelector('.btn-details');
                if (detailsBtn) {
                    detailsBtn.click();
                }
            }
        });
    });

    document.querySelectorAll('.filter-btn').forEach((btn) => {
        btn.addEventListener('click', function () {
            const grid = document.querySelector('.projects-grid-full');
            if (grid) {
                setTimeout(() => {
                    grid.scrollIntoView({ behavior: 'smooth', block: 'start' });
                }, 100);
            }
        });
    });

    const skillItems = document.querySelectorAll('.skill-card');

    if (skillItems.length > 0) {
        const skillObserver = new IntersectionObserver((entries) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';
                }
            });
        }, { threshold: 0.1 });

        skillItems.forEach((item, index) => {
            item.style.opacity = '0';
            item.style.transform = 'translateY(20px)';
            item.style.transition = `all 0.5s cubic-bezier(0.25, 0.46, 0.45, 0.94) ${index * 0.05}s`;
            skillObserver.observe(item);
        });
    }

    skillItems.forEach((item) => {
        item.addEventListener('click', function () {
            const skillName = this.querySelector('.skill-name')?.textContent || '';
            const skillIcon = this.querySelector('.skill-icon img')?.getAttribute('alt') || '';

            if (searchInput && (skillName || skillIcon)) {
                const searchText = skillName || skillIcon;
                searchInput.value = searchText;
                const event = new Event('input');
                searchInput.dispatchEvent(event);

                const grid = document.querySelector('.projects-grid-full');
                if (grid) {
                    setTimeout(() => {
                        grid.scrollIntoView({ behavior: 'smooth', block: 'start' });
                    }, 300);
                }
            }
        });
    });


    function getUrlParams() {
        const params = new URLSearchParams(window.location.search);
        const filter = params.get('filter');
        const search = params.get('search');

        if (filter) {
            const filterBtn = document.querySelector(`.filter-btn[data-filter="${filter}"]`);
            if (filterBtn) {
                filterBtn.click();
            }
        }

        if (search && searchInput) {
            searchInput.value = search;
            const event = new Event('input');
            searchInput.dispatchEvent(event);
        }
    }

    getUrlParams();

    console.log(`[Projects Page] Loaded ${projectCards.length} projects successfully ✅`);
    console.log(`[Projects Page] ${skillItems.length} skills loaded ✅`);

    window.ProjectsPage = {
        getProjects: () => projectCards,
        getSkills: () => skillItems,
        filter: (category) => {
            const btn = document.querySelector(`.filter-btn[data-filter="${category}"]`);
            if (btn) btn.click();
        },
        search: (term) => {
            if (searchInput) {
                searchInput.value = term;
                const event = new Event('input');
                searchInput.dispatchEvent(event);
            }
        },
        openModal: (projectId) => {
            const btn = document.querySelector(`.btn-details[data-project="${projectId}"]`);
            if (btn) btn.click();
        },
        closeModal: closeModal,
        refresh: () => {
            console.log('[Projects Page] Refreshed');
            initProjectVisibility();
        }
    };
});