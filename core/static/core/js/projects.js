
document.addEventListener('DOMContentLoaded', function () {
    'use strict';

    const projectCards = document.querySelectorAll('.project-card');

    projectCards.forEach((card) => {
        const overlay = card.querySelector('.project-overlay');
        const image = card.querySelector('.project-image img');
        card.addEventListener('mouseenter', function () {
            // Add a slight delay for better UX
            if (overlay) {
                overlay.style.opacity = '1';
            }
        });

        card.addEventListener('mouseleave', function () {
            if (overlay) {
                overlay.style.opacity = '0';
            }
        });

        card.addEventListener('keydown', function (e) {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                const demoLink = card.querySelector('.btn-demo');
                if (demoLink && demoLink.href !== '#') {
                    window.open(demoLink.href, '_blank');
                }
            }
        });


        card.setAttribute('tabindex', '0');
        card.setAttribute('role', 'article');
        card.setAttribute('aria-label', card.querySelector('h3')?.textContent || 'Project card');
    });



    const techIcons = document.querySelectorAll('.tech-stack img');

    techIcons.forEach((icon) => {
        const techName = icon.getAttribute('alt') || icon.getAttribute('title') || 'Technology';

       icon.setAttribute('aria-label', techName);

\        if (!icon.hasAttribute('title')) {
            icon.setAttribute('title', techName);
        }
    });

    const allButtons = document.querySelectorAll('.btn-demo, .btn-github, .view-projects-btn');

    allButtons.forEach((button) => {
        button.addEventListener('click', function (e) {
            // If href is '#', prevent default
            if (this.getAttribute('href') === '#') {
                e.preventDefault();
                console.log(`[Projects] Button clicked: ${this.textContent.trim()}`);
                // You can add custom analytics here
                // Example: gtag('event', 'click', { 'event_category': 'Projects', 'event_label': this.textContent.trim() });
                return;
            }

            // Log for analytics
            const buttonType = this.classList.contains('btn-demo') ? 'Live Demo' :
                this.classList.contains('btn-github') ? 'GitHub' :
                'View All Projects';

            console.log(`[Projects] ${buttonType} clicked: ${this.href}`);
        });
    });

    if ('IntersectionObserver' in window) {
        const animatedElements = document.querySelectorAll(
            '.project-card, .section-header, .projects-footer'
        );

        const observerOptions = {
            root: null,
            rootMargin: '0px 0px -50px 0px',
            threshold: 0.1
        };

        const observer = new IntersectionObserver(function (entries) {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    const element = entry.target;

                    // Add animation class if using AOS or custom animations
                    if (element.dataset.aos) {
                        // If you're using AOS library
                        return;
                    }

                    // Custom fade-in animation
                    element.style.opacity = '1';
                    element.style.transform = 'translateY(0)';

                    observer.unobserve(element);
                }
            });
        }, observerOptions);

        animatedElements.forEach((el) => {
            el.style.opacity = '0';
            el.style.transform = 'translateY(30px)';
            el.style.transition = 'all 0.6s cubic-bezier(0.25, 0.46, 0.45, 0.94)';

            observer.observe(el);
        });
    }


    const projectCount = projectCards.length;
    const sectionSubtitle = document.querySelector('.section-subtitle');

    if (sectionSubtitle) {
        // Uncomment to show project count
        // const countSpan = document.createElement('span');
        // countSpan.className = 'project-count';
        // countSpan.textContent = `(${projectCount} projects)`;
        // sectionSubtitle.appendChild(countSpan);
    }

    console.log(`[Projects] Loaded ${projectCount} projects successfully ✅`);
});

window.ProjectsSection = {
    getCards: () => document.querySelectorAll('.project-card'),
    getCount: () => document.querySelectorAll('.project-card').length,
    refresh: () => {
        console.log('[Projects] Refreshed');
    }
};