document.addEventListener('DOMContentLoaded', function () {
    const overlay = document.getElementById('onboarding-overlay');
    if (!overlay) return;

    const STORAGE_KEY = 'evolvefit-onboarding-data';
    const COMPLETED_KEY = 'evolvefit-onboarding-completed';

    const nextBtn = document.getElementById('onboarding-next');
    const backBtn = document.getElementById('onboarding-back');
    const content = document.getElementById('onboarding-step-content');
    const stepLabel = document.getElementById('onboarding-step-label');
    const progressFill = document.getElementById('onboarding-progress-fill');
    const kicker = document.getElementById('onboarding-kicker');
    const title = document.getElementById('onboarding-title');
    const subtitle = document.getElementById('onboarding-subtitle');

    let step = 0;

    let data = {
        language: localStorage.getItem('evolvefit-language') || 'pt',
        name: '',
        goal: '',
        level: ''
    };

    const steps = ['language', 'name', 'goal', 'level', 'final'];

    const texts = {
        pt: {
            introKicker: 'Bem-vindo',
            introTitle: 'Antes de começar',
            introSubtitle: 'isso leva menos de 30 segundos.',
            step: 'Etapa {current} de 3',
            back: 'Voltar',
            next: 'Continuar',
            finish: 'Entrar no EvolveFit',
            lockedWarning: 'Pense com calma antes de responder. Depois de concluir, isso não poderá ser trocado.',

            languageQuestion: 'Escolha o idioma',
            languageOptions: [
                { value: 'pt', label: 'Português 🇧🇷', description: 'continuar em português' },
                { value: 'en', label: 'English 🇺🇸', description: 'continue in english' }
            ],

            nameQuestion: 'Como gostaria de ser chamado?',
            namePlaceholder: 'Digite seu primeiro nome',

            goalQuestion: 'qual é o seu objetivo atual?',
            goalOptions: [
                { value: 'lose', label: 'Perder peso', description: 'Mais saúde e menos gordura'},
                { value: 'gain', label: 'Ganhar massa', description: 'Mais força e físico'},
                { value: 'recomp', label: 'Ganhar massa e perder gordura', description: 'Mais força e físico e menos gordura'},
                { value: 'cond', label: 'Melhorar condicionamento', description: 'Mais saúde e performance'}
            ],

            levelQuestion: 'Seu nível',
            levelOptions: [
                { value: 'init', label: 'Iniciante', description: '	estou começando agora' },
                { value: 'inter', label: 'Intermediário', description: 'treino de vez em quando' },
                { value: 'adv', label: 'Avançado', description: 'já tenho experiência' }
            ],

            finalTitle: 'Perfeito, {name}.',
            finalMessageDefault: 'Analisando suas respostas, você está exatamente no lugar certo. <br> Seu perfil é ideal para evoluir — e nós sabemos como encurtar o caminho até o seu resultado.',
            errors: {
                name: 'Digite seu primeiro nome.',
                goal: 'Escolha um objetivo.',
                level: 'Escolha um nível.'
            }
        },

        en: {
            introKicker: 'Welcome',
            introTitle: 'Before starting',
            introSubtitle: 'it takes less than 30 seconds.',
            step: 'Step {current} of 3',
            back: 'Back',
            next: 'Continue',
            finish: 'Access full site',
            lockedWarning: 'Think carefully before answering. After finishing, this cannot be changed.',

            languageQuestion: 'Choose your language',
            languageOptions: [
                { value: 'pt', label: 'Português 🇧🇷' },
                { value: 'en', label: 'English 🇺🇸' }
            ],

            nameQuestion: 'what should we call you?',
            namePlaceholder: 'Enter your first name',

            goalQuestion: 'Your goal',
            goalOptions: [
                { value: 'lose', label: 'Lose weight', description: 'More health and less fat' },
                { value: 'gain', label: 'Gain muscle', description: 'More strength and physique' },
                { value: 'recomp', label: 'Gain muscle and lose fat', description: 'More strength and physique and less fat' },
                { value: 'cond', label: 'Improve conditioning', description: 'More health and performance' }
            ],

            levelQuestion: 'Your level',
            levelOptions: [
                { value: 'init', label: 'Beginner', description: 'I’m starting now' },
                { value: 'inter', label: 'Intermediate', description: 'I train sometimes' },
                { value: 'adv', label: 'Advanced', description: 'I already have experience' }
            ],

            finalTitle: 'Perfect, {name}.',
            finalMessageDefault: 'After analyzing your answers, you are in the perfect place. <br> Your profile is ideal to evolve — and we know how to shorten the path to your result.',
            errors: {
                name: 'Enter your first name.',
                goal: 'Choose a goal.',
                level: 'Choose a level.'
            }
        }
    };

    function getLang() {
        return data.language === 'en' ? 'en' : 'pt';
    }

    function t() {
        return texts[getLang()];
    }

    function saveData() {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
    }

    function loadData() {
        const saved = localStorage.getItem(STORAGE_KEY);
        if (!saved) return;

        try {
            const parsed = JSON.parse(saved);
            data = {
                ...data,
                ...parsed
            };
        } catch (error) {
            console.warn('Erro ao ler onboarding salvo:', error);
        }
    }

    function markCompleted() {
        localStorage.setItem(COMPLETED_KEY, 'true');
        saveData();
    }

    function isCompleted() {
        return localStorage.getItem(COMPLETED_KEY) === 'true';
    }

    function showOverlay() {
        overlay.classList.add('is-visible');
        overlay.setAttribute('aria-hidden', 'false');
        document.body.classList.add('onboarding-locked');
    }

    function hideOverlay() {
        overlay.classList.remove('is-visible');
        overlay.setAttribute('aria-hidden', 'true');
        document.body.classList.remove('onboarding-locked');
    }

    function clearError() {
        const oldError = document.getElementById('onboarding-error');
        if (oldError) oldError.remove();
    }

    function showError(message) {
        clearError();
        const error = document.createElement('p');
        error.id = 'onboarding-error';
        error.className = 'onboarding-error';
        error.textContent = message;
        content.appendChild(error);
    }

    function getGoalText(value) {
        const item = t().goalOptions.find(option => option.value === value);
        return item ? item.label : '';
    }

    function getLevelText(value) {
        const item = t().levelOptions.find(option => option.value === value);
        return item ? item.label : '';
    }

    function getFinalMessage() {
        const lang = getLang();
        const name = data.name || (lang === 'pt' ? 'você' : 'you');

        if (lang === 'pt') {
            if (data.goal === 'lose' && data.level === 'init') {
                return `${name}, começar já te coloca na frente de muita gente. O importante agora é construir constância e dar o primeiro passo com clareza.`;
            }
            if (data.goal === 'gain' && data.level === 'inter') {
                return `${name}, você já tem uma base. Agora o próximo nível vem de mais direção, consistência e disciplina no processo.`;
            }
            if (data.goal === 'recomp') {
                return `${name}, seu objetivo exige estratégia e consistência. Isso combina muito com a proposta do EvolveFit.`;
            }
            if (data.goal === 'cond' && data.level === 'adv') {
                return `${name}, você já tem experiência. Agora é hora de refinar, sustentar ritmo e evoluir performance com inteligência.`;
            }
        } else {
            if (data.goal === 'lose' && data.level === 'init') {
                return `${name}, starting already puts you ahead of many people. What matters now is building consistency and taking the first step with clarity.`;
            }
            if (data.goal === 'gain' && data.level === 'inter') {
                return `${name}, you already have a base. The next level comes from more direction, consistency and discipline.`;
            }
            if (data.goal === 'recomp') {
                return `${name}, your goal requires strategy and consistency. That fits EvolveFit really well.`;
            }
            if (data.goal === 'cond' && data.level === 'adv') {
                return `${name}, you already have experience. Now it is time to refine, sustain rhythm and improve performance intelligently.`;
            }
        }

        return t().finalMessageDefault;
    }

    function buildLockedWarning() {
        return `
            <div class="onboarding-locked-warning">
                <span class="onboarding-locked-warning-icon">!</span>
                <span>${t().lockedWarning}</span>
            </div>
        `;
    }

    function updateHeader() {
        const currentStep = steps[step];
        const isIntroStep = currentStep === 'language';
        const isFinalStep = currentStep === 'final';
    
        if (isIntroStep) {
            kicker.textContent = t().introKicker;
            title.textContent = t().introTitle;
            subtitle.textContent = t().introSubtitle;
            kicker.style.display = '';
            title.style.display = '';
            subtitle.style.display = '';
    
            stepLabel.style.display = 'none';
            progressFill.style.width = '0%';
        } else {
            kicker.style.display = 'none';
            title.style.display = 'none';
            subtitle.style.display = 'none';
    
            stepLabel.style.display = '';
    
            let currentStepNumber = 1;
            let progressPercent = 33.3333;
    
            if (currentStep === 'name') {
                currentStepNumber = 1;
                progressPercent = 33.3333;
            }
    
            if (currentStep === 'goal') {
                currentStepNumber = 2;
                progressPercent = 66.6666;
            }
    
            if (currentStep === 'level') {
                currentStepNumber = 3;
                progressPercent = 100;
            }
    
            if (isFinalStep) {
                stepLabel.style.display = 'none';
                progressPercent = 100;
            } else {
                stepLabel.textContent = getLang() === 'pt'
                    ? `Etapa ${currentStepNumber} de 3`
                    : `Step ${currentStepNumber} of 3`;
            }
    
            progressFill.style.width = progressPercent + '%';
        }
    
        backBtn.textContent = t().back;
        nextBtn.textContent = isFinalStep ? t().finish : t().next;
    }
    
    function renderLanguageStep() {
        content.innerHTML = `
            <p class="onboarding-field-label">${t().languageQuestion}</p>
            <div class="onboarding-options">
                ${t().languageOptions.map(option => `
                    <button class="onboarding-option ${data.language === option.value ? 'is-selected' : ''}" data-type="language" data-value="${option.value}">
                        <span class="onboarding-option-title">${option.label}</span>
                    </button>
                `).join('')}
            </div>
        `;
    }

    function renderNameStep() {
        content.innerHTML = `
            ${buildLockedWarning()}
            <p class="onboarding-field-label">${t().nameQuestion}</p>
            <input
                id="name-input"
                class="onboarding-name-input"
                type="text"
                maxlength="24"
                placeholder="${t().namePlaceholder}"
                value="${data.name || ''}"
                autocomplete="given-name"
            >
        `;
    
        const input = document.getElementById('name-input');
        if (input) {
            setTimeout(() => input.focus(), 50);
            input.addEventListener('input', function () {
                data.name = this.value.trimStart();
                saveData();
            });
    
            input.addEventListener('keydown', function (e) {
                if (e.key === 'Enter') {
                    nextBtn.click();
                }
            });
        }
    }

    function renderGoalStep() {
        content.innerHTML = `
            ${buildLockedWarning()}
            <p class="onboarding-field-label">${t().goalQuestion}</p>
            <div class="onboarding-options">
                ${t().goalOptions.map(option => `
                    <button class="onboarding-option ${data.goal === option.value ? 'is-selected' : ''}" data-type="goal" data-value="${option.value}">
                        <span class="onboarding-option-title">${option.label}</span>
                    </button>
                `).join('')}
            </div>
        `;
    }

    function renderLevelStep() {
        content.innerHTML = `
            ${buildLockedWarning()}
            <p class="onboarding-field-label">${t().levelQuestion}</p>
            <div class="onboarding-options">
                ${t().levelOptions.map(option => `
                    <button class="onboarding-option ${data.level === option.value ? 'is-selected' : ''}" data-type="level" data-value="${option.value}">
                        <span class="onboarding-option-title">${option.label}</span>
                    </button>
                `).join('')}
            </div>
        `;
    }

    function renderFinalStep() {
        content.innerHTML = `
            <div class="onboarding-summary">
                <p class="onboarding-summary-name">${t().finalTitle.replace('{name}', data.name || 'User')}</p>
                <p class="onboarding-summary-message">${getFinalMessage()}</p>
                <div class="onboarding-summary-tags">
                    <span class="onboarding-tag">${getGoalText(data.goal)}</span>
                    <span class="onboarding-tag">${getLevelText(data.level)}</span>
                </div>
            </div>
        `;
    }

    function bindOptionEvents() {
        document.querySelectorAll('.onboarding-option').forEach(button => {
            button.addEventListener('click', function () {
                const type = this.dataset.type;
                const value = this.dataset.value;

                clearError();

                if (type === 'language') {
                    data.language = value;
                    localStorage.setItem('evolvefit-language', value);

                    const languageSelect = document.getElementById('language-select');
                    if (languageSelect) {
                        languageSelect.value = value;
                    }

                    if (typeof updatePageContent === 'function') {
                        updatePageContent(value);
                    }
                }

                if (type === 'goal') {
                    data.goal = value;
                }

                if (type === 'level') {
                    data.level = value;
                }

                saveData();
                render();
            });
        });
    }

    function render() {
        updateHeader();

        if (steps[step] === 'language') renderLanguageStep();
        if (steps[step] === 'name') renderNameStep();
        if (steps[step] === 'goal') renderGoalStep();
        if (steps[step] === 'level') renderLevelStep();
        if (steps[step] === 'final') renderFinalStep();

        bindOptionEvents();
        backBtn.hidden = step === 0;
    }

    function validateStep() {
        clearError();

        if (steps[step] === 'name') {
            const input = document.getElementById('name-input');
            const value = input ? input.value.trim() : data.name.trim();

            if (!value) {
                showError(t().errors.name);
                return false;
            }

            data.name = value;
            saveData();
        }

        if (steps[step] === 'goal' && !data.goal) {
            showError(t().errors.goal);
            return false;
        }

        if (steps[step] === 'level' && !data.level) {
            showError(t().errors.level);
            return false;
        }

        return true;
    }

    nextBtn.addEventListener('click', function () {
        if (steps[step] !== 'final' && !validateStep()) return;

        if (steps[step] === 'final') {
            markCompleted();
            hideOverlay();
            return;
        }

        if (step < steps.length - 1) {
            step++;
            render();
        }
    });

    backBtn.addEventListener('click', function () {
        if (step > 0) {
            step--;
            render();
        }
    });

    loadData();

    if (!isCompleted()) {
        showOverlay();
        render();
    } else {
        hideOverlay();
    }
}); 

// BOTÃO DE TESTE (RESET)
const debugResetBtn = document.getElementById('debug-reset-onboarding');

if (debugResetBtn) {
    debugResetBtn.addEventListener('click', function () {
        localStorage.removeItem('evolvefit-onboarding-completed');
        localStorage.removeItem('evolvefit-onboarding-data');

        location.reload(); // recarrega a página pra aparecer onboarding
    });
}