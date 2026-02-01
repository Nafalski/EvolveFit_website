/**
 * EvolveFit - QR Code Generator
 * Gera QR Code dinamicamente para download do app
 */

document.addEventListener('DOMContentLoaded', function() {
    const qrcodeContainer = document.getElementById('qrcode');
    const downloadLinkElement = document.getElementById('download-link');
    
    if (qrcodeContainer) {
        // URL para download (pode ser alterada depois)
        const downloadUrl = window.location.href + '#download';
        const fullDownloadUrl = window.location.origin + '/download';
        
        // Atualiza o link exibido
        if (downloadLinkElement) {
            downloadLinkElement.textContent = fullDownloadUrl;
        }
        
        // Verifica se a biblioteca QRCode está carregada
        if (typeof QRCode !== 'undefined') {
            // Limpa o container
            qrcodeContainer.innerHTML = '';
            // Cria o QR Code
            new QRCode(qrcodeContainer, {
                text: fullDownloadUrl,
                width: 200,
                height: 200,
                colorDark: '#6C63FF',
                colorLight: '#ffffff',
                correctLevel: QRCode.CorrectLevel.H
            });
        } else {
            // Fallback caso a biblioteca não carregue
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
            
            // Tenta carregar novamente após um tempo
            const checkLibrary = setInterval(() => {
                if (typeof QRCode !== 'undefined') {
                    clearInterval(checkLibrary);
                    qrcodeContainer.innerHTML = '';
                    new QRCode(qrcodeContainer, {
                        text: fullDownloadUrl,
                        width: 200,
                        height: 200,
                        colorDark: '#6C63FF',
                        colorLight: '#ffffff',
                        correctLevel: QRCode.CorrectLevel.H
                    });
                }
            }, 100);
            
            // Timeout após 5 segundos
            setTimeout(() => clearInterval(checkLibrary), 5000);
        }
    }
});

