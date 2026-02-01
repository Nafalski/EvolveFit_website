/**
 * EvolveFit - Sistema de Troca de Idiomas
 * Gerencia a troca de idioma e salva a preferência no localStorage
 */

// Idioma padrão
const DEFAULT_LANGUAGE = 'pt';

/**
 * Obtém o idioma atual do localStorage ou retorna o padrão
 */
function getCurrentLanguage() {
    const savedLanguage = localStorage.getItem('evolvefit-language');
    return savedLanguage || DEFAULT_LANGUAGE;
}

/**
 * Salva o idioma no localStorage
 */
function saveLanguage(lang) {
    localStorage.setItem('evolvefit-language', lang);
}

/**
 * Atualiza o conteúdo dos elementos com base no idioma selecionado
 */
function updatePageContent(lang) {
    // Verifica se o objeto de traduções existe
    if (typeof textos === 'undefined') {
        console.warn('Traduções não carregadas');
        return;
    }
    
    // Obtém os textos do idioma selecionado
    const currentTexts = textos[lang] || textos[DEFAULT_LANGUAGE];
    
    // Percorre todos os textos e atualiza os elementos correspondentes
    Object.keys(currentTexts).forEach(key => {
        const element = document.getElementById(key);
        if (element) {
            // Verifica se é um elemento de input ou textarea
            if (element.tagName === 'INPUT' || element.tagName === 'TEXTAREA') {
                element.value = currentTexts[key];
            } else {
                element.textContent = currentTexts[key];
            }
        }
    });

    // Download link usa origem dinâmica (sem domínio hardcoded)
    const downloadLinkEl = document.getElementById('download-link');
    if (downloadLinkEl) {
        downloadLinkEl.textContent = window.location.origin + '/download';
    }
    
    // Atualiza o atributo lang do HTML
    document.documentElement.lang = lang === 'pt' ? 'pt-BR' : 'en';
    
    // Atualiza o título da página (meta tag)
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
        if (lang === 'pt') {
            metaDescription.content = 'EvolveFit - Treino, nutrição e motivação personalizados para a sua jornada de evolução. Para qualquer pessoa que queira evoluir.';
        } else {
            metaDescription.content = 'EvolveFit - Personalized training, nutrition and motivation for your evolution journey. For everyone who wants to evolve.';
        }
    }
}

/**
 * Inicializa o sistema de idioma
 */
function initLanguage() {
    const currentLang = getCurrentLanguage();
    const languageSelect = document.getElementById('language-select');
    
    // Atualiza o conteúdo da página com o idioma salvo
    updatePageContent(currentLang);
    
    // Define o valor do select
    if (languageSelect) {
        languageSelect.value = currentLang;
        
        // Adiciona listener para mudanças no select
        languageSelect.addEventListener('change', function(e) {
            const newLang = e.target.value;
            saveLanguage(newLang);
            updatePageContent(newLang);
            
            // Atualiza as frases motivacionais se necessário
            if (typeof updateMotivationalPhrase === 'function') {
                updateMotivationalPhrase();
            }
        });
    }
}

// Inicializa quando o DOM estiver pronto
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initLanguage);
} else {
    // DOM já está pronto
    initLanguage();
}

