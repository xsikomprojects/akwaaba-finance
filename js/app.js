// ============================================
// AKWAABA FINANCE – Main App Controller
// Mit XsiKOM-DIGITAL-Projects
// ============================================

let currentLanguage = 'de';

// === INITIALIZATION ===
document.addEventListener('DOMContentLoaded', () => {
    initSplashScreen();
    initNavigation();
    initCalculatorTabs();
    initLanguage();
    initRiskSlider();
    initQuantumPulse();
    generateNewTips();
    showDailyWisdom();
    updateDashboardStats();
});

// === SPLASH SCREEN ===
function initSplashScreen() {
    setTimeout(() => {
        const splash = document.getElementById('splash-screen');
        const app = document.getElementById('app');
        if (splash) splash.style.display = 'none';
        if (app) app.classList.remove('hidden');
    }, 4000);
}

// === NAVIGATION ===
function initNavigation() {
    const tabs = document.querySelectorAll('.tab-btn');
    tabs.forEach(tab => {
        tab.addEventListener('click', () => {
            // Remove active from all
            tabs.forEach(t => t.classList.remove('active'));
            document.querySelectorAll('.tab-content').forEach(c => c.classList.remove('active'));

            // Set active
            tab.classList.add('active');
            const tabId = tab.getAttribute('data-tab');
            const content = document.getElementById(tabId);
            if (content) content.classList.add('active');
        });
    });

    // Language button
    const langBtn = document.getElementById('langBtn');
    const langDropdown = document.getElementById('langDropdown');
    if (langBtn && langDropdown) {
        langBtn.addEventListener('click', () => {
            langDropdown.classList.toggle('hidden');
        });

        // Close dropdown on outside click
        document.addEventListener('click', (e) => {
            if (!langBtn.contains(e.target) && !langDropdown.contains(e.target)) {
                langDropdown.classList.add('hidden');
            }
        });
    }
}

// === CALCULATOR TABS ===
function initCalculatorTabs() {
    const calcTypes = document.querySelectorAll('.calc-type');
    calcTypes.forEach(btn => {
        btn.addEventListener('click', () => {
            calcTypes.forEach(b => b.classList.remove('active'));
            document.querySelectorAll('.calc-panel').forEach(p => p.classList.remove('active'));

            btn.classList.add('active');
            const calcId = btn.getAttribute('data-calc');
            const panel = document.getElementById('calc-' + calcId);
            if (panel) panel.classList.add('active');
        });
    });
}

// === LANGUAGE SYSTEM ===
function initLanguage() {
    const saved = localStorage.getItem('akwaaba-lang') || 'de';
    setLanguage(saved);
}

function setLanguage(lang) {
    currentLanguage = lang;
    localStorage.setItem('akwaaba-lang', lang);

    const langLabel = document.getElementById('currentLang');
    if (langLabel) langLabel.textContent = lang.toUpperCase();

    // Update all translatable elements
    document.querySelectorAll('[data-i18n]').forEach(el => {
        const key = el.getAttribute('data-i18n');
        if (translations[lang] && translations[lang][key]) {
            el.textContent = translations[lang][key];
        } else if (translations['en'] && translations['en'][key]) {
            el.textContent = translations['en'][key];
        }
    });

    // Close dropdown
    const dropdown = document.getElementById('langDropdown');
    if (dropdown) dropdown.classList.add('hidden');

    // Reload tips
    generateNewTips();
    showDailyWisdom();

    // Set document direction for Arabic
    document.body.dir = lang === 'ar' ? 'rtl' : 'ltr';
}

// === RISK SLIDER ===
function initRiskSlider() {
    const slider = document.getElementById('quantumRisk');
    const display = document.getElementById('riskValue');
    if (slider && display) {
        slider.addEventListener('input', () => {
            display.textContent = slider.value;
        });
    }
}

// === TIPS GENERATOR ===
function generateNewTips() {
    const container = document.getElementById('tipsContainer');
    if (!container) return;

    const lang = currentLanguage;
    const tips = financialTips[lang] || financialTips['en'] || financialTips['de'];

    // Shuffle and take 4
    const shuffled = [...tips].sort(() => Math.random() - 0.5).slice(0, 4);

    container.innerHTML = shuffled.map(tip => `
        <div class="tip-card">
            <div class="tip-category">${tip.category}</div>
            <div class="tip-title">${tip.title}</div>
            <div class="tip-text">${tip.text}</div>
            <div class="tip-rating">${tip.rating} Quantum Score</div>
        </div>
    `).join('');
}

// === DAILY WISDOM ===
function showDailyWisdom() {
    const el = document.getElementById('dailyTip');
    if (!el) return;

    const lang = currentLanguage;
    const quotes = wisdomQuotes[lang] || wisdomQuotes['en'] || wisdomQuotes['de'];
    const dayIndex = new Date().getDate() % quotes.length;
    el.textContent = quotes[dayIndex];
}

// === DASHBOARD STATS (live simulation) ===
function updateDashboardStats() {
    setInterval(() => {
        const trend = document.getElementById('marketTrend');
        const accuracy = document.getElementById('aiAccuracy');
        const speed = document.getElementById('quantumSpeed');

        if (trend) {
            const val = (Math.random() * 5 - 1).toFixed(1);
            trend.textContent = (val >= 0 ? '+' : '') + val + '%';
            trend.style.color = val >= 0 ? '#00ff88' : '#ff4466';
        }

        if (accuracy) {
            accuracy.textContent = (90 + Math.random() * 9).toFixed(1) + '%';
        }

        if (speed) {
            speed.textContent = (0.001 + Math.random() * 0.005).toFixed(3) + 's';
        }
    }, 3000);
}