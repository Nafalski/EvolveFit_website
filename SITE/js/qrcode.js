/**
 * EvolveFit - QR Code Generator
 * Gera QR Code dinamicamente apontando para o PWA
 */

document.addEventListener('DOMContentLoaded', function () {
    const qrcodeContainer = document.getElementById('qrcode');
    const downloadLinkElement = document.getElementById('download-link');
    const appUrl = typeof EVOLVEFIT_APP_URL !== 'undefined'
        ? EVOLVEFIT_APP_URL
        : 'https://evolve-fit-app.vercel.app';

    if (downloadLinkElement) {
        downloadLinkElement.textContent = typeof EVOLVEFIT_APP_DISPLAY !== 'undefined'
            ? EVOLVEFIT_APP_DISPLAY
            : 'evolve-fit-app.vercel.app';
    }

    if (!qrcodeContainer) return;

    function createQRCode() {
        qrcodeContainer.innerHTML = '';
        new QRCode(qrcodeContainer, {
            text: appUrl,
            width: 200,
            height: 200,
            colorDark: '#6C63FF',
            colorLight: '#ffffff',
            correctLevel: QRCode.CorrectLevel.H
        });
    }

    if (typeof QRCode !== 'undefined') {
        createQRCode();
    } else {
        qrcodeContainer.innerHTML = `
            <div style="
                width: 200px;
                height: 200px;
                background: #f0f0f0;
                display: flex;
                align-items: center;
                justify-content: center;
                border-radius: 8px;
                border: 2px dashed #6C63FF;
            ">
                <p style="text-align: center; color: #6C63FF; font-weight: bold;">
                    QR Code<br>
                    (Carregando...)
                </p>
            </div>
        `;

        const checkLibrary = setInterval(function () {
            if (typeof QRCode !== 'undefined') {
                clearInterval(checkLibrary);
                createQRCode();
            }
        }, 100);

        setTimeout(function () {
            clearInterval(checkLibrary);
        }, 5000);
    }
});
