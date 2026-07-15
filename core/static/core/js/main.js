document.addEventListener('DOMContentLoaded', function() {
    const counters = document.querySelectorAll('.counter');

    const animateCounter = (counter) => {
        const target = parseInt(counter.dataset.target);
        const increment = target / 60;
        let current = 0;

        const update = () => {
            current += increment;
            if (current >= target) {
                counter.textContent = target;
                return;
            }
            counter.textContent = Math.floor(current);
            requestAnimationFrame(update);
        };

        update();
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const counter = entry.target;
                animateCounter(counter);
                observer.unobserve(counter);
            }
        });
    }, { threshold: 0.5 });

    counters.forEach(counter => observer.observe(counter));
});