(function() {
    'use strict';

    var prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    // ===== NAV SCROLL EFFECT =====
    var nav = document.querySelector('.nav');
    if (nav) {
        window.addEventListener('scroll', function() {
            nav.classList.toggle('scrolled', window.scrollY > 40);
        });
    }

    // ===== HAMBURGER MENU =====
    var hamburger = document.querySelector('.hamburger');
    var navLinks = document.querySelector('.nav-links');
    if (hamburger && navLinks) {
        hamburger.addEventListener('click', function() {
            navLinks.classList.toggle('open');
        });
        navLinks.querySelectorAll('a').forEach(function(link) {
            link.addEventListener('click', function() {
                navLinks.classList.remove('open');
            });
        });
    }

    // ===== SCROLL TO TOP =====
    var scrollBtn = document.getElementById('scrollTop');
    if (scrollBtn) {
        window.addEventListener('scroll', function() {
            scrollBtn.classList.toggle('visible', window.scrollY > window.innerHeight);
        });
        scrollBtn.addEventListener('click', function() {
            window.scrollTo({ top: 0, behavior: 'smooth' });
        });
    }

    // ===== CURSOR GLOW =====
    var glow = document.querySelector('.cursor-glow');
    if (glow && window.innerWidth > 768) {
        document.addEventListener('mousemove', function(e) {
            glow.style.left = e.clientX + 'px';
            glow.style.top = e.clientY + 'px';
        });
        document.addEventListener('mouseenter', function() { glow.classList.add('active'); });
        document.addEventListener('mouseleave', function() { glow.classList.remove('active'); });
    }

    // ===== GSAP SCROLL REVEALS =====
    if (!prefersReducedMotion && typeof gsap !== 'undefined' && typeof ScrollTrigger !== 'undefined') {
        gsap.registerPlugin(ScrollTrigger);

        // Section labels
        document.querySelectorAll('.section-label').forEach(function(el) {
            gsap.to(el, {
                opacity: 1, y: 0, duration: 0.6, ease: 'power2.out',
                scrollTrigger: { trigger: el, start: 'top 90%' }
            });
        });

        // Section subtext
        document.querySelectorAll('.section-subtext').forEach(function(el) {
            gsap.to(el, {
                opacity: 1, y: 0, duration: 0.6, delay: 0.15, ease: 'power2.out',
                scrollTrigger: { trigger: el, start: 'top 90%' }
            });
        });

        // Generic reveal
        document.querySelectorAll('.gs-reveal').forEach(function(el) {
            gsap.to(el, {
                opacity: 1, y: 0, duration: 0.7, ease: 'power2.out',
                scrollTrigger: { trigger: el, start: 'top 88%' }
            });
        });

        // Staggered reveals
        document.querySelectorAll('.gs-stagger').forEach(function(container) {
            var children = container.children;
            gsap.fromTo(children,
                { opacity: 0, y: 30 },
                {
                    opacity: 1, y: 0, duration: 0.5, stagger: 0.1, ease: 'power2.out',
                    scrollTrigger: { trigger: container, start: 'top 88%' }
                }
            );
        });
    } else {
        // Show everything immediately if reduced motion or no GSAP
        document.querySelectorAll('.gs-reveal, .section-label, .section-subtext').forEach(function(el) {
            el.style.opacity = '1';
            el.style.transform = 'none';
        });
    }

    // ===== FAQ TOGGLE =====
    document.querySelectorAll('.faq-question').forEach(function(btn) {
        btn.addEventListener('click', function() {
            var item = this.closest('.faq-item');
            var wasOpen = item.classList.contains('open');
            // Close all
            document.querySelectorAll('.faq-item').forEach(function(faq) {
                faq.classList.remove('open');
            });
            // Toggle clicked
            if (!wasOpen) item.classList.add('open');
        });
    });

})();
