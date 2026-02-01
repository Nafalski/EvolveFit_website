/**
 * EvolveFit - JavaScript Principal
 * Gerencia funcionalidades gerais do site
 */

// ===================================
// Navegação Mobile
// ===================================
document.addEventListener('DOMContentLoaded', function() {
    const mobileMenuToggle = document.querySelector('.mobile-menu-toggle');
    const navMenu = document.querySelector('.nav-menu');
    
    if (mobileMenuToggle && navMenu) {
        mobileMenuToggle.addEventListener('click', function() {
            navMenu.classList.toggle('active');
            
            // Animação do botão hambúrguer
            const spans = mobileMenuToggle.querySelectorAll('span');
            if (navMenu.classList.contains('active')) {
                spans[0].style.transform = 'rotate(45deg) translate(5px, 5px)';
                spans[1].style.opacity = '0';
                spans[2].style.transform = 'rotate(-45deg) translate(7px, -6px)';
            } else {
                spans[0].style.transform = 'none';
                spans[1].style.opacity = '1';
                spans[2].style.transform = 'none';
            }
        });
        
        // Fechar menu ao clicar em um link
        const navLinks = navMenu.querySelectorAll('a');
        navLinks.forEach(link => {
            link.addEventListener('click', function() {
                navMenu.classList.remove('active');
                const spans = mobileMenuToggle.querySelectorAll('span');
                spans[0].style.transform = 'none';
                spans[1].style.opacity = '1';
                spans[2].style.transform = 'none';
            });
        });
    }
});

// ===================================
// Frase Motivacional do Dia (atualizado)
// ===================================
const motivationalPhrases = {
    pt: [
        // 💥 Tapa na Cara
        "Pare de reclamar e comece a agir. 💪",
        "Você não está cansado, está sem disciplina. 🧠",
        "O mundo não vai parar pra você se arrumar. ⏰",
        "A dor de hoje evita o arrependimento de amanhã. 🔥",
        "Se quer respeito, pare de se tratar como qualquer um. ⚔️",
        "Enquanto você pensa, alguém tá fazendo. 🚀",
        "Você não precisa de motivação, precisa de vergonha na cara. 🥶",
        "Seu corpo ouve tudo o que sua mente aceita. 💭",
        "A desculpa mais bonita ainda é uma desculpa. 🎭",
        "Quer resultado? Trabalhe quando ninguém tá olhando. 🌙",
        "Se você quer resultados diferentes, pare de fazer a mesma coisa. 🔁",
        "Dor é alerta; desculpa é conforto. Escolha um. ⚡",
        "Amanhã é só desculpa disfarçada de esperança. 🕓",
        "Sucesso não é sorte — é cobrança diária com ação. 🧩",
        "Você quer fácil ou quer valer a pena? Escolha. 🎯",
        "Resultado pede sacrifício. Conforto pede desculpa. 🧱",
        "Sonho sem prazo vira memória. 📅",
        "Tempo não poupa quem o desperdiça. ⏳",

        // 🌟 Autoestima / Encorajamento
        "Você pode mais do que imagina. 🌱",
        "Cada passo pequeno ainda é progresso. 🦶",
        "Continue firme — o resultado vem pra quem fica. 🧩",
        "A disciplina te leva onde o talento não chega. 🏁",
        "Você é a prova de que dá pra recomeçar. 🔁",
        "Acredite no processo, confie na jornada. 🌄",
        "Seu esforço de hoje é o orgulho de amanhã. 🏋️",
        "Você é seu maior investimento. 💎",
        "Fracasso não é o fim, é o ensaio da vitória. 🎯",
        "Um passo de coragem muda tudo. 🚶‍♂️",
        "Pequenos avanços diários viram grandes vitórias. 📈",
        "Você é mais forte do que acredita. 💥",
        "O progresso real é invisível na hora — confie no acúmulo. 🧠",
        "Seja gentil com você — o caminho é longo. 💫",
        "Acreditar em si é o primeiro treino que ninguém vê. 💭",
        "Sua identidade é feita de ações repetidas. 🔂",
        "Você merece seu próprio esforço. ❤️",
        "Cada vez que você tenta, fica mais perto. 🏆"
    ],

    en: [
        // 💥 Slap of Reality
        "Stop complaining and start acting. 💪",
        "You’re not tired, you’re undisciplined. 🧠",
        "The world won’t wait for you to get ready. ⏰",
        "The pain of today saves the regret of tomorrow. 🔥",
        "If you want respect, stop treating yourself like anyone else. ⚔️",
        "While you’re thinking, someone’s doing. 🚀",
        "You don’t need motivation, you need accountability. 🥶",
        "Your body hears everything your mind allows. 💭",
        "The prettiest excuse is still an excuse. 🎭",
        "Want results? Work when no one’s watching. 🌙",
        "If you want different results, stop doing the same thing. 🔁",
        "Pain warns; excuses comfort. Choose one. ⚡",
        "Tomorrow is just an excuse disguised as hope. 🕓",
        "Success isn’t luck — it’s daily self-demand. 🧩",
        "Do you want it easy or worth it? Choose. 🎯",
        "Results require sacrifice. Comfort requires excuses. 🧱",
        "A dream without a deadline becomes a memory. 📅",
        "Time won’t spare those who waste it. ⏳",

        // 🌟 Motivation & Confidence
        "You’re capable of more than you think. 🌱",
        "Every small step is still progress. 🦶",
        "Stay consistent — results come to those who stay. 🧩",
        "Discipline takes you where talent can’t. 🏁",
        "You are proof that starting over works. 🔁",
        "Trust the process, believe in the journey. 🌄",
        "Your effort today is tomorrow’s pride. 🏋️",
        "You are your greatest investment. 💎",
        "Failure isn’t the end — it’s the rehearsal for victory. 🎯",
        "One brave step changes everything. 🚶‍♂️",
        "Small daily progress builds big results. 📈",
        "You’re stronger than you think. 💥",
        "Real progress is invisible at first — trust it. 🧠",
        "Be kind to yourself — the path is long. 💫",
        "Believing in yourself is the first workout. 💭",
        "Your identity is built by repeated actions. 🔂",
        "You owe yourself your best effort. ❤️",
        "Every try brings you closer. 🏆"
    ]
};

/**
 * Obtém uma frase motivacional baseada no dia do ano
 * Isso garante que a mesma frase apareça durante todo o dia
 */
function getDailyPhrase() {
    // Obtém o idioma atual
    const currentLang = localStorage.getItem('evolvefit-language') || 'pt';
    const phrases = motivationalPhrases[currentLang] || motivationalPhrases.pt;
    
    const today = new Date();
    const dayOfYear = Math.floor((today - new Date(today.getFullYear(), 0, 0)) / 1000 / 60 / 60 / 24);
    const phraseIndex = dayOfYear % phrases.length;
    return phrases[phraseIndex];
}

/**
 * Atualiza a frase motivacional na página
 */
function updateMotivationalPhrase() {
    const phraseElement = document.getElementById('daily-phrase');
    if (phraseElement) {
        phraseElement.textContent = getDailyPhrase();
    }
}

/**
 * Event listener para o botão de atualizar frase
 */
document.addEventListener('DOMContentLoaded', function() {
    // Atualiza a frase ao carregar a página
    updateMotivationalPhrase();
    
    // Botão para atualizar manualmente
    const refreshButton = document.getElementById('refresh-phrase');
    if (refreshButton) {
        refreshButton.addEventListener('click', function() {
            // Obtém o idioma atual
            const currentLang = localStorage.getItem('evolvefit-language') || 'pt';
            const phrases = motivationalPhrases[currentLang] || motivationalPhrases.pt;
            
            // Seleciona uma frase aleatória diferente da atual
            let newPhrase;
            const currentPhrase = document.getElementById('daily-phrase').textContent;
            do {
                const randomIndex = Math.floor(Math.random() * phrases.length);
                newPhrase = phrases[randomIndex];
            } while (newPhrase === currentPhrase && phrases.length > 1);
            
            document.getElementById('daily-phrase').textContent = newPhrase;
            
            // Animação visual
            const phraseElement = document.getElementById('daily-phrase');
            phraseElement.style.opacity = '0.5';
            setTimeout(() => {
                phraseElement.style.opacity = '1';
            }, 300);
        });
    }
});

// ===================================
// Scroll Suave
// ===================================
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// ===================================
// Animação ao Scroll (Intersection Observer)
// ===================================
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver(function(entries) {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Aplica animação aos cards
document.addEventListener('DOMContentLoaded', function() {
    const animatedElements = document.querySelectorAll('.feature-card, .benefit-card, .download-card, .step-card');
    
    animatedElements.forEach(element => {
        element.style.opacity = '0';
        element.style.transform = 'translateY(20px)';
        element.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(element);
    });
});

// ===================================
// Console Message
// ===================================
console.log('%c💪 EvolveFit', 'font-size: 20px; font-weight: bold; color: #6C63FF;');
console.log('%cSeu treino. Sua motivação. Sua evolução.', 'font-size: 14px; color: #4ECDC4;');

// ===================================
// Tema Claro/Escuro (Dia/Noite) - Botão Moderno
// ===================================
document.addEventListener('DOMContentLoaded', function() {
    const themeBtn = document.getElementById('theme-toggle');
    if (!themeBtn) return;
  
    const currentTheme = localStorage.getItem('theme');
    if (currentTheme === 'dark') document.body.classList.add('dark-mode');
  
    themeBtn.addEventListener('click', () => {
      document.body.classList.toggle('dark-mode');
      const isDark = document.body.classList.contains('dark-mode');
      localStorage.setItem('theme', isDark ? 'dark' : 'light');
    });
  });
  