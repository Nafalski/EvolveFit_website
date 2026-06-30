/**
 * EvolveFit — Troca de idioma (PT/EN)
 * Aplica as traduções de translations.js por id e guarda a preferência.
 */

const DEFAULT_LANGUAGE = 'pt';

function getCurrentLanguage() {
    try { return localStorage.getItem('evolvefit-language') || DEFAULT_LANGUAGE; }
    catch (e) { return DEFAULT_LANGUAGE; }
}

function saveLanguage(lang) {
    try { localStorage.setItem('evolvefit-language', lang); } catch (e) {}
}

function updatePageContent(lang) {
    if (typeof textos === 'undefined') { return; }
    const dict = textos[lang] || textos[DEFAULT_LANGUAGE];

    Object.keys(dict).forEach(function (key) {
        const el = document.getElementById(key);
        if (!el) return;
        if (el.tagName === 'INPUT' || el.tagName === 'TEXTAREA') {
            el.setAttribute('placeholder', dict[key]);
        } else {
            el.textContent = dict[key];
        }
    });

    document.documentElement.lang = (lang === 'pt') ? 'pt-BR' : 'en';

    const meta = document.querySelector('meta[name="description"]');
    if (meta) {
        meta.setAttribute('content', lang === 'pt'
            ? 'EvolveFit é um app de treino que ajuda você a treinar com mais direção: crie seu plano, registre cargas e repetições e acompanhe sua evolução. Funciona no navegador e no celular (PWA).'
            : 'EvolveFit is a training app that helps you train with more direction: build your plan, log your sets and reps and track your progress. Works in the browser and on mobile (PWA).');
    }
}

function initLanguage() {
    const lang = getCurrentLanguage();
    updatePageContent(lang);

    const select = document.getElementById('language-select');
    if (select) {
        select.value = lang;
        select.addEventListener('change', function (e) {
            const newLang = e.target.value;
            saveLanguage(newLang);
            updatePageContent(newLang);
        });
    }
}

if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initLanguage);
} else {
    initLanguage();
}
