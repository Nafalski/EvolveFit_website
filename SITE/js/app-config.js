/**
 * EvolveFit — Configuração do link do app/PWA
 * Fonte ÚNICA da URL do aplicativo. Para trocar o destino dos botões
 * e do QR Code, altere apenas as constantes abaixo.
 */
const EVOLVEFIT_APP_URL = 'https://evolve-fit-app.vercel.app';
const EVOLVEFIT_APP_DISPLAY = 'evolve-fit-app.vercel.app';

function initEvolveFitAppLinks() {
    // Qualquer <a data-app-link> aponta para o app/PWA.
    document.querySelectorAll('a[data-app-link]').forEach(function (el) {
        el.setAttribute('href', EVOLVEFIT_APP_URL);
        el.setAttribute('target', '_blank');
        el.setAttribute('rel', 'noopener');
    });

    // Qualquer elemento [data-app-display] mostra a URL legível.
    document.querySelectorAll('[data-app-display]').forEach(function (el) {
        el.textContent = EVOLVEFIT_APP_DISPLAY;
    });
}

if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initEvolveFitAppLinks);
} else {
    initEvolveFitAppLinks();
}
