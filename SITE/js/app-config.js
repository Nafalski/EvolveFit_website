/**
 * EvolveFit - Configuração central do app PWA
 * Altere apenas aqui a URL do aplicativo.
 */
const EVOLVEFIT_APP_URL = 'https://evolve-fit-app.vercel.app';
const EVOLVEFIT_APP_DISPLAY = 'evolve-fit-app.vercel.app';

/** IDs de links <a> que devem apontar para o PWA */
const EVOLVEFIT_APP_LINK_IDS = [
    'btn-conheca',
    'download-pwa-button',
    'cta-button'
];

function initEvolveFitAppLinks() {
    EVOLVEFIT_APP_LINK_IDS.forEach(function (id) {
        const el = document.getElementById(id);
        if (el && el.tagName === 'A') {
            el.href = EVOLVEFIT_APP_URL;
            el.removeAttribute('onclick');
        }
    });

    document.querySelectorAll('[data-evolvefit-app]').forEach(function (el) {
        if (el.tagName === 'A') {
            el.href = EVOLVEFIT_APP_URL;
        }
    });

    const downloadLinkEl = document.getElementById('download-link');
    if (downloadLinkEl) {
        downloadLinkEl.textContent = EVOLVEFIT_APP_DISPLAY;
    }

    const apkBtn = document.getElementById('download-android-button');
    if (apkBtn) {
        apkBtn.href = '#';
        apkBtn.classList.add('is-coming-soon');
        apkBtn.setAttribute('aria-disabled', 'true');
        apkBtn.addEventListener('click', function (e) {
            e.preventDefault();
        });
    }
}

if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initEvolveFitAppLinks);
} else {
    initEvolveFitAppLinks();
}
