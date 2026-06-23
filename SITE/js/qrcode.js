/**
 * EvolveFit — QR Code
 * Gera um QR Code apontando para o app/PWA (URL central de app-config.js).
 */
document.addEventListener('DOMContentLoaded', function () {
    const container = document.getElementById('qrcode');
    if (!container) return;

    const appUrl = (typeof EVOLVEFIT_APP_URL !== 'undefined')
        ? EVOLVEFIT_APP_URL
        : 'https://evolve-fit-app.vercel.app';

    function render() {
        container.innerHTML = '';
        new QRCode(container, {
            text: appUrl,
            width: 200,
            height: 200,
            colorDark: '#0B1220',
            colorLight: '#ffffff',
            correctLevel: QRCode.CorrectLevel.H
        });
    }

    if (typeof QRCode !== 'undefined') {
        render();
        return;
    }

    // Espera a biblioteca carregar (CDN), com limite de tempo.
    const wait = setInterval(function () {
        if (typeof QRCode !== 'undefined') {
            clearInterval(wait);
            render();
        }
    }, 100);
    setTimeout(function () { clearInterval(wait); }, 5000);
});
