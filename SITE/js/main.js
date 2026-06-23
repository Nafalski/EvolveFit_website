/**
 * EvolveFit — JavaScript principal do site
 * Navegação mobile · tema claro/escuro · reveal no scroll · navbar com sombra
 */

document.addEventListener('DOMContentLoaded', function () {

    /* ---------- Menu mobile ---------- */
    const toggle = document.querySelector('.nav__toggle');
    const menu = document.getElementById('nav-menu');

    if (toggle && menu) {
        const closeMenu = function () {
            menu.classList.remove('is-open');
            toggle.classList.remove('is-open');
            toggle.setAttribute('aria-expanded', 'false');
        };

        toggle.addEventListener('click', function () {
            const open = menu.classList.toggle('is-open');
            toggle.classList.toggle('is-open', open);
            toggle.setAttribute('aria-expanded', String(open));
        });

        // Fecha ao clicar num link de navegação
        menu.querySelectorAll('a').forEach(function (link) {
            link.addEventListener('click', closeMenu);
        });

        // Fecha com Esc
        document.addEventListener('keydown', function (e) {
            if (e.key === 'Escape') closeMenu();
        });
    }

    /* ---------- Tema claro/escuro (escuro é o padrão) ---------- */
    const root = document.documentElement;
    const themeBtn = document.getElementById('theme-toggle');

    if (themeBtn) {
        themeBtn.addEventListener('click', function () {
            const isLight = root.classList.toggle('light');
            const theme = isLight ? 'light' : 'dark';
            try { localStorage.setItem('evolvefit-theme', theme); } catch (e) {}
            const meta = document.querySelector('meta[name="theme-color"]');
            if (meta) meta.setAttribute('content', isLight ? '#F4F7FC' : '#070B12');
        });
    }

    /* ---------- Navbar ganha borda ao rolar ---------- */
    const nav = document.querySelector('.nav');
    if (nav) {
        const onScroll = function () {
            nav.classList.toggle('is-scrolled', window.scrollY > 8);
        };
        onScroll();
        window.addEventListener('scroll', onScroll, { passive: true });
    }

    /* ---------- Reveal suave ao entrar na viewport ---------- */
    const revealEls = document.querySelectorAll('[data-reveal]');
    if (revealEls.length) {
        if (!('IntersectionObserver' in window)) {
            revealEls.forEach(function (el) { el.classList.add('is-visible'); });
        } else {
            const io = new IntersectionObserver(function (entries) {
                entries.forEach(function (entry) {
                    if (entry.isIntersecting) {
                        entry.target.classList.add('is-visible');
                        io.unobserve(entry.target);
                    }
                });
            }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });

            revealEls.forEach(function (el, i) {
                // pequeno stagger entre vizinhos
                el.style.transitionDelay = (Math.min(i % 6, 5) * 60) + 'ms';
                io.observe(el);
            });
        }
    }
});
