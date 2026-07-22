// ================================
// WealthBuilder Pro - Main Application
// ================================

// ====== DATA STORE ======
let appData = {
    expenses: [],
    income: [],
    investments: [],
    debts: [],
    goals: [],
    recurringExpenses: [],
    hustleEntries: [],
    categoryBudgets: {},
    settings: {
        currency: 'EUR',
        darkMode: false,
        monthlyBudget: 2000,
        notifications: true
    },
    streak: 0,
    lastVisit: null,
    completedLessons: [],
    completedChallenges: [],
    currentMonth: new Date().getMonth(),
    currentYear: new Date().getFullYear()
};

// ====== CATEGORY CONFIG ======
const CATEGORIES = {
    food: { name: 'Essen & Trinken', icon: '🍕', color: '#FF6B6B' },
    transport: { name: 'Transport', icon: '🚗', color: '#4ECDC4' },
    housing: { name: 'Wohnen', icon: '🏠', color: '#45B7D1' },
    entertainment: { name: 'Unterhaltung', icon: '🎮', color: '#96CEB4' },
    shopping: { name: 'Shopping', icon: '🛍️', color: '#FFEAA7' },
    health: { name: 'Gesundheit', icon: '💊', color: '#DDA0DD' },
    education: { name: 'Bildung', icon: '📚', color: '#98D8C8' },
    subscriptions: { name: 'Abos', icon: '📱', color: '#F7DC6F' },
    other: { name: 'Sonstiges', icon: '📦', color: '#AEB6BF' }
};

const INVEST_TYPES = {
    etf: { name: 'ETF', icon: '📊' },
    stock: { name: 'Aktie', icon: '📈' },
    crypto: { name: 'Krypto', icon: '₿' },
    bond: { name: 'Anleihe', icon: '📄' },
    realestate: { name: 'Immobilie', icon: '🏠' },
    other: { name: 'Sonstiges', icon: '📦' }
};

// ====== DAILY TIPS ======
const DAILY_TIPS = [
    "Spare mindestens 20% deines Einkommens - zahle dich selbst zuerst!",
    "Überprüfe deine Abos regelmäßig. Ungenutzte Abos kündigen spart hunderte Euro im Jahr.",
    "Nutze die 24-Stunden-Regel: Warte einen Tag vor größeren Käufen, um Impulskäufe zu vermeiden.",
    "Erstelle einen Notgroschen von 3-6 Monatsausgaben für finanzielle Sicherheit.",
    "Investiere in dich selbst: Neue Fähigkeiten = höheres Einkommen.",
    "Nutze Cashback-Apps und Bonusprogramme für alltägliche Einkäufe.",
    "Koche mehr selbst - das spart durchschnittlich 200-400€ pro Monat!",
    "Vergleiche Versicherungen jährlich - oft lassen sich 500€+ sparen.",
    "Starte mit ETF-Sparplänen - schon 25€ im Monat können durch Zinseszins zu einem Vermögen wachsen.",
    "Die 50/30/20 Regel: 50% Bedürfnisse, 30% Wünsche, 20% Sparen.",
    "Verhandle dein Gehalt! Die meisten Menschen könnten 10-20% mehr verdienen.",
    "Automatisiere deine Finanzen: Daueraufträge für Sparen und Investieren.",
    "Tracke jeden Cent für einen Monat - du wirst überrascht sein, wohin dein Geld fließt.",
    "Mehrere Einkommensquellen reduzieren das finanzielle Risiko erheblich.",
    "Schulden mit hohen Zinsen sollten oberste Priorität bei der Tilgung haben.",
    "Nutze Bibliotheken statt Bücher zu kaufen - spart 200€+ pro Jahr.",
    "Meal-Prep am Wochenende spart Zeit UND Geld unter der Woche.",
    "Energiekosten senken: LED-Lampen, Standby vermeiden, Vergleichsportale nutzen.",
    "Investiere früh! 10 Jahre früherer Start kann den Endwert verdoppeln.",
    "Setze dir konkrete Finanzziele mit Deadline - messbar und motivierend!"
];

// ====== LESSONS ======
const LESSONS = [
    { title: 'Budgetierung 101', desc: 'Lerne die Grundlagen des Budgetierens', content: 'Ein Budget ist der Grundstein deiner Finanzen. Die 50/30/20 Regel teilt dein Einkommen in: 50% für Bedürfnisse (Miete, Essen, Versicherungen), 30% für Wünsche (Entertainment, Shopping), 20% für Sparen & Investieren. Tracke jeden Euro und passe dein Budget monatlich an.' },
    { title: 'Notgroschen aufbauen', desc: 'Finanzielle Sicherheit schaffen', content: 'Ein Notgroschen ist dein finanzielles Sicherheitsnetz. Ziel: 3-6 Monatsausgaben auf einem Tagesgeldkonto. Starte mit 1.000€ als Mini-Notgroschen. Automatisiere monatliche Überweisungen. Nutze den Notgroschen NUR für echte Notfälle.' },
    { title: 'Schulden tilgen', desc: 'Strategien zur Schuldenfreiheit', content: 'Lawinenmethode: Höchste Zinsen zuerst tilgen (spart am meisten Geld). Schneeballmethode: Kleinste Schuld zuerst (schnelle Erfolge, mehr Motivation). Konsolidiere Schulden wenn möglich. Verhandle niedrigere Zinssätze.' },
    { title: 'ETFs verstehen', desc: 'Dein Einstieg in den Aktienmarkt', content: 'ETFs (Exchange Traded Funds) bilden einen Index wie den MSCI World ab. Vorteile: Diversifikation, niedrige Kosten, einfach zu handeln. Starte mit einem weltweiten ETF-Sparplan. Historische Rendite: ~7% p.a. langfristig.' },
    { title: 'Zinseszinseffekt', desc: 'Die mächtigste Kraft der Finanzen', content: 'Einstein nannte den Zinseszins das 8. Weltwunder. Beispiel: 200€/Monat bei 7% Rendite = nach 30 Jahren: ~235.000€ (eingezahlt nur 72.000€). Je früher du anfängst, desto stärker wirkt der Effekt.' },
    { title: 'Versicherungen optimieren', desc: 'Notwendig vs. überflüssig', content: 'Wichtig: Haftpflicht, Berufsunfähigkeit, Krankenversicherung. Oft überflüssig: Handy-Versicherung, Reisegepäck, Glasbruch. Vergleiche jährlich über Check24 oder Verivox. Selbstbeteiligung erhöhen senkt Beiträge.' },
    { title: 'Steuern optimieren', desc: 'Legal Steuern sparen', content: 'Nutze Werbungskosten (Pauschale 1.230€). Handwerkerkosten absetzen. Spenden absetzen. Riester/Rürup prüfen. Freibeträge nutzen (Sparerpauschbetrag 1.000€). Steuererklärung immer machen - im Schnitt 1.000€ Erstattung!' },
    { title: 'Nebeneinkommen aufbauen', desc: 'Mehrere Einkommensströme', content: 'Freelancing (Upwork, Fiverr), Online-Kurse erstellen, Affiliate Marketing, Content Creation, Nachhilfe, Handwerk. Starte mit deinen vorhandenen Skills. Investiere die Nebeneinkünfte direkt.' },
    { title: 'Konsum vs. Investition', desc: 'Geld für dich arbeiten lassen', content: 'Konsum: Wertverlust nach Kauf (Auto, Elektronik, Mode). Investition: Wertsteigerung über Zeit (Aktien, ETFs, Bildung). Regel: Kaufe Dinge, die Geld generieren, bevor du Luxus kaufst. Rich Dad, Poor Dad Prinzip.' },
    { title: 'Inflation verstehen', desc: 'Warum Sparen allein nicht reicht', content: 'Inflation: ~2-3% pro Jahr. Dein Geld verliert jährlich an Kaufkraft. 10.000€ auf dem Girokonto sind nach 10 Jahren nur noch ~8.000€ wert. Lösung: Investieren mit Rendite über der Inflation.' },
    { title: 'Diversifikation', desc: 'Nie alle Eier in einen Korb', content: 'Verteile Investments: verschiedene Anlageklassen (Aktien, Anleihen, Immobilien), verschiedene Regionen, verschiedene Branchen. Ein MSCI World ETF enthält bereits 1.500+ Unternehmen aus 23 Ländern.' },
    { title: 'Finanzielle Freiheit (FIRE)', desc: 'Der Weg zur Unabhängigkeit', content: 'FIRE = Financial Independence, Retire Early. Formel: 25x jährliche Ausgaben = FIRE-Zahl. 4% Entnahmeregel: Du kannst 4% deines Portfolios jährlich entnehmen. Beispiel: 30.000€ Ausgaben → FIRE-Zahl = 750.000€.' },
    { title: 'Gehaltsverhandlung', desc: 'Mehr verdienen im Job', content: 'Recherchiere Marktgehälter (Glassdoor, Kununu). Dokumentiere deine Erfolge. Wähle den richtigen Zeitpunkt. Nenne als Erstes eine (höhere) Zahl. Verhandle auch Benefits (Homeoffice, Weiterbildung). Mindestens alle 1-2 Jahre verhandeln.' },
    { title: 'Kreditkarten richtig nutzen', desc: 'Vorteile ohne Schulden', content: 'Immer den vollen Betrag monatlich bezahlen. Cashback und Punkte nutzen. Kreditrahmen nie ausreizen. Bonusprogramme vergleichen. Nie Kreditkartenschulden aufbauen - Zinsen von 15-25%!' },
    { title: 'Immobilien Investment', desc: 'Mieten oder Kaufen?', content: 'Kaufen lohnt bei: >10 Jahre Wohndauer, stabiler Job, niedrige Zinsen. Mieten lohnt bei: Flexibilität nötig, teurer Markt, unsichere Situation. Kaufnebenkosten: ~10-15% (Grunderwerbsteuer, Notar, Makler).' },
    { title: 'Krypto Basics', desc: 'Bitcoin, Ethereum & Co.', content: 'Krypto ist hochvolatil - nur investieren was du verlieren kannst. Maximal 5-10% des Portfolios. Bitcoin als digitales Gold. Ethereum als Plattform. DCA (Dollar Cost Averaging) statt Timing. Cold Wallet für sichere Aufbewahrung.' },
    { title: 'Psychologie des Geldes', desc: 'Dein Mindset verändern', content: 'Lifestyle Inflation vermeiden. Delayed Gratification üben. Vergleiche dich nicht mit anderen. Reichtum ist was du NICHT siehst (gespartes Geld). Finanzielle Bildung ist die beste Investition.' },
    { title: 'Automatisierung', desc: 'Finanzen auf Autopilot', content: 'Automatische Überweisungen: Sparen, Investieren, Rechnungen. Mehrere Konten (3-Konten-Modell: Alltag, Sparen, Spaß). ETF-Sparplan einrichten. Benachrichtigungen für große Ausgaben.' },
    { title: 'Altersvorsorge', desc: 'Heute für morgen planen', content: 'Gesetzliche Rente reicht oft nicht. Private Vorsorge: ETF-Sparplan, Riester/Rürup prüfen. Betriebliche Altersvorsorge mit Arbeitgeberzuschuss nutzen. Faustregel: 15-20% des Einkommens für Alter sparen.' },
    { title: 'Finanzplan erstellen', desc: 'Dein persönlicher Masterplan', content: 'Schritt 1: Status quo erfassen. Schritt 2: Ziele definieren (kurz/mittel/langfristig). Schritt 3: Strategie entwickeln. Schritt 4: Umsetzen und automatisieren. Schritt 5: Quartalsweise überprüfen und anpassen.' }
];

// ====== SIDE HUSTLE IDEAS ======
const HUSTLE_IDEAS = [
    { name: 'Freelance Writing', icon: '✍️', category: 'online', earning: '500-3000€/Monat', desc: 'Texte, Blogs, Copywriting' },
    { name: 'Web Development', icon: '💻', category: 'tech', earning: '1000-5000€/Monat', desc: 'Websites & Apps entwickeln' },
    { name: 'Grafikdesign', icon: '🎨', category: 'creative', earning: '500-3000€/Monat', desc: 'Logos, Flyer, Social Media' },
    { name: 'Online Tutoring', icon: '📚', category: 'online', earning: '20-60€/Stunde', desc: 'Nachhilfe & Sprachunterricht' },
    { name: 'Dropshipping', icon: '📦', category: 'online', earning: '500-5000€/Monat', desc: 'Online-Shop ohne Lager' },
    { name: 'YouTube Kanal', icon: '📹', category: 'creative', earning: '100-10000€/Monat', desc: 'Videos erstellen & monetarisieren' },
    { name: 'Affiliate Marketing', icon: '🔗', category: 'passive', earning: '200-5000€/Monat', desc: 'Produkte empfehlen & verdienen' },
    { name: 'Fotografie', icon: '📸', category: 'creative', earning: '300-2000€/Monat', desc: 'Events, Stock Photos, Portraits' },
    { name: 'Social Media Management', icon: '📱', category: 'online', earning: '500-3000€/Monat', desc: 'Social Media für Unternehmen' },
    { name: 'Umzugshilfe', icon: '🏠', category: 'offline', earning: '15-25€/Stunde', desc: 'Beim Umzug helfen' },
    { name: 'Hundesitting', icon: '🐕', category: 'offline', earning: '10-20€/Stunde', desc: 'Hunde betreuen & ausführen' },
    { name: 'Online Kurse', icon: '🎓', category: 'passive', earning: '500-10000€/Monat', desc: 'Wissen digitalisieren & verkaufen' },
    { name: 'App Entwicklung', icon: '📲', category: 'tech', earning: '1000-10000€/Projekt', desc: 'Mobile Apps programmieren' },
    { name: 'Virtuelle Assistenz', icon: '👨‍💼', category: 'online', earning: '15-40€/Stunde', desc: 'Administrative Unterstützung' },
    { name: 'Print on Demand', icon: '👕', category: 'passive', earning: '200-3000€/Monat', desc: 'T-Shirts & Merch designen' },
    { name: 'Handwerk & Reparatur', icon: '🔧', category: 'offline', earning: '20-50€/Stunde', desc: 'Reparaturen & Montage' },
    { name: 'E-Books schreiben', icon: '📖', category: 'passive', earning: '100-2000€/Monat', desc: 'Digitale Bücher auf Amazon' },
    { name: 'Übersetzungen', icon: '🌍', category: 'online', earning: '0.05-0.15€/Wort', desc: 'Texte übersetzen' },
    { name: 'Data Entry', icon: '⌨️', category: 'online', earning: '10-20€/Stunde', desc: 'Daten erfassen & verwalten' },
    { name: 'Flohmarkt/eBay', icon: '🏪', category: 'offline', earning: '100-1000€/Monat', desc: 'Gebrauchtes verkaufen' }
];

// ====== DAILY CHALLENGES ======
const DAILY_CHALLENGES = [
    { title: 'Kein-Ausgaben-Tag', desc: 'Gib heute nichts aus. Nutze was du hast!', reward: '🏆 Sparmeister' },
    { title: 'Abo-Check', desc: 'Überprüfe alle deine Abos. Kündige mindestens eines.', reward: '💰 Abo-Jäger' },
    { title: 'Preisvergleich', desc: 'Vergleiche die Preise deiner 3 häufigsten Einkäufe.', reward: '🔍 Schnäppchenjäger' },
    { title: 'Finanz-Artikel lesen', desc: 'Lies einen Artikel über Finanzen/Investieren.', reward: '📚 Wissensdurst' },
    { title: 'Mahlzeit vorbereiten', desc: 'Bereite Essen für 3 Tage vor (Meal Prep).', reward: '🍱 Meal-Prep-König' },
    { title: 'Investitions-Check', desc: 'Überprüfe dein Portfolio und rebalanciere wenn nötig.', reward: '📊 Portfolio-Manager' },
    { title: 'Einnahme-Brainstorm', desc: 'Schreibe 5 Ideen auf, wie du mehr verdienen könntest.', reward: '💡 Ideengeber' },
    { title: 'Danke sagen', desc: 'Sei dankbar für was du hast. Schreibe 3 Dinge auf.', reward: '🙏 Dankbarkeit' },
    { title: 'Verkaufe etwas', desc: 'Finde einen Gegenstand den du nicht brauchst und verkaufe ihn.', reward: '💸 Entrümpeler' },
    { title: 'Budget-Review', desc: 'Überprüfe dein Budget und passe es an.', reward: '📋 Budget-Boss' }
];

// ====== QUIZ QUESTIONS ======
const QUIZ_QUESTIONS = [
    {
        question: 'Wie viel Zeit hast du pro Woche übrig?',
        options: ['< 5 Stunden', '5-10 Stunden', '10-20 Stunden', '20+ Stunden']
    },
    {
        question: 'Was sind deine stärksten Skills?',
        options: ['Schreiben & Kommunikation', 'Technik & Programmierung', 'Kreativität & Design', 'Handwerk & Praktisches']
    },
    {
        question: 'Wie schnell brauchst du das Geld?',
        options: ['Sofort', 'In 1-3 Monaten', 'Langfristig aufbauen', 'Egal, Hauptsache passiv']
    },
    {
        question: 'Wie viel möchtest du investieren?',
        options: ['Nichts (0€)', 'Wenig (< 100€)', 'Mittel (100-500€)', 'Mehr (500€+)']
    },
    {
        question: 'Wo möchtest du arbeiten?',
        options: ['Von zu Hause', 'Draußen/Unterwegs', 'Egal', 'Online mit Kunden']
    }
];

let quizStep = 0;
let quizAnswers = [];

// ====== INITIALIZATION ======
document.addEventListener('DOMContentLoaded', () => {
    loadData();
    
    setTimeout(() => {
        document.getElementById('splashScreen').classList.add('hidden');
        document.getElementById('app').classList.remove('hidden');
        initApp();
    }, 2000);
});

function initApp() {
    updateStreak();
    setupTabs();
    setDefaultDates();
    renderDashboard();
    renderBudget();
    renderIncome();
    renderInvestments();
    renderSideHustles();
    renderDebt();
    renderGoals();
    renderLessons();
    calculateCompound();
    calculateFIRE();
    showDailyTip();
    showDailyChallenge();
    generateAIInsights();
    updateNetWorth();
    updateHealthScore();
    
    if (appData.settings.darkMode) {
        document.documentElement.setAttribute('data-theme', 'dark');
        document.getElementById('darkModeSetting').checked = true;
    }
    
    document.getElementById('monthlyBudgetSetting').value = appData.settings.monthlyBudget;
}

// ====== DATA PERSISTENCE ======
function saveData() {
    localStorage.setItem('wealthBuilderData', JSON.stringify(appData));
}

function loadData() {
    const saved = localStorage.getItem('wealthBuilderData');
    if (saved) {
        const parsed = JSON.parse(saved);
        appData = { ...appData, ...parsed };
    }
}

// ====== TAB NAVIGATION ======
function setupTabs() {
    document.querySelectorAll('.tab-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            document.querySelectorAll('.tab-btn').forEach(b => b.classList.remove('active'));
            document.querySelectorAll('.tab-content').forEach(c => c.classList.remove('active'));
            btn.classList.add('active');
            document.getElementById(btn.dataset.tab).classList.add('active');
        });
    });
}

// ====== STREAK ======
function updateStreak() {
    const today = new Date().toDateString();
    if (appData.lastVisit) {
        const lastVisit = new Date(appData.lastVisit);
        const yesterday = new Date();
        yesterday.setDate(yesterday.getDate() - 1);
        
        if (lastVisit.toDateString() === yesterday.toDateString()) {
            appData.streak++;
        } else if (lastVisit.toDateString() !== today) {
            appData.streak = 1;
        }
    } else {
        appData.streak = 1;
    }
    appData.lastVisit = today;
    document.getElementById('streakCount').textContent = appData.streak;
    saveData();
}

// ====== DAILY TIP ======
function showDailyTip() {
    const dayOfYear = Math.floor((new Date() - new Date(new Date().getFullYear(), 0, 0)) / 86400000);
    const tipIndex = dayOfYear % DAILY_TIPS.length;
    document.getElementById('dailyTip').textContent = DAILY_TIPS[tipIndex];
}

// ====== DAILY CHALLENGE ======
function showDailyChallenge() {
    const dayOfYear = Math.floor((new Date() - new Date(new Date().getFullYear(), 0, 0)) / 86400000);
    const challengeIndex = dayOfYear % DAILY_CHALLENGES.length;
    const challenge = DAILY_CHALLENGES[challengeIndex];
    const today = new Date().toDateString();
    const isCompleted = appData.completedChallenges.includes(today);
    
    document.getElementById('dailyChallenge').innerHTML = `
        <h4>${challenge.title}</h4>
        <p>${challenge.desc}</p>
        <p><strong>Belohnung: ${challenge.reward}</strong></p>
        <button class="challenge-btn ${isCompleted ? 'completed' : ''}" onclick="completeChallenge()">
            ${isCompleted ? '✅ Erledigt!' : '💪 Challenge annehmen'}
        </button>
    `;
}

function completeChallenge() {
    const today = new Date().toDateString();
    if (!appData.completedChallenges.includes(today)) {
        appData.completedChallenges.push(today);
        saveData();
        showDailyChallenge();
        showToast('🏆 Challenge abgeschlossen!');
    }
}

// ====== SET DEFAULT DATES ======
function setDefaultDates() {
    const today = new Date().toISOString().split('T')[0];
    document.querySelectorAll('input[type="date"]').forEach(input => {
        if (!input.value) input.value = today;
    });
    updateMonthDisplay();
}

// ====== MONTH NAVIGATION ======
function changeMonth(delta) {
    appData.currentMonth += delta;
    if (appData.currentMonth > 11) {
        appData.currentMonth = 0;
        appData.currentYear++;
    } else if (appData.currentMonth < 0) {
        appData.currentMonth = 11;
        appData.currentYear--;
    }
    updateMonthDisplay();
    renderBudget();
}

function updateMonthDisplay() {
    const months = ['Januar', 'Februar', 'März', 'April', 'Mai', 'Juni',
        'Juli', 'August', 'September', 'Oktober', 'November', 'Dezember'];
    document.getElementById('currentMonth').textContent = 
        `${months[appData.currentMonth]} ${appData.currentYear}`;
}

// ====== NET WORTH ======
function updateNetWorth() {
    const totalIncome = appData.income.reduce((sum, i) => sum + parseFloat(i.amount), 0);
    const totalExpenses = appData.expenses.reduce((sum, e) => sum + parseFloat(e.amount), 0);
    const totalInvestments = appData.investments.reduce((sum, i) => sum + parseFloat(i.currentValue), 0);
    const totalDebt = appData.debts.reduce((sum, d) => sum + (parseFloat(d.amount) - parseFloat(d.paid)), 0);
    const totalGoalsSaved = appData.goals.reduce((sum, g) => sum + parseFloat(g.current), 0);
    
    const netWorth = totalIncome - totalExpenses + totalInvestments - totalDebt + totalGoalsSaved;
    
    document.getElementById('netWorth').textContent = formatMoney(netWorth);
    document.getElementById('totalIncome').textContent = formatMoney(totalIncome);
    document.getElementById('totalExpenses').textContent = formatMoney(totalExpenses);
    
    const savingsRate = totalIncome > 0 ? ((totalIncome - totalExpenses) / totalIncome * 100) : 0;
    document.getElementById('savingsRate').textContent = savingsRate.toFixed(0) + '%';
    
    // Calculate monthly change
    const thisMonth = new Date().getMonth();
    const thisYear = new Date().getFullYear();
    const monthIncome = appData.income
        .filter(i => { const d = new Date(i.date); return d.getMonth() === thisMonth && d.getFullYear() === thisYear; })
        .reduce((sum, i) => sum + parseFloat(i.amount), 0);
    const monthExpenses = appData.expenses
        .filter(e => { const d = new Date(e.date); return d.getMonth() === thisMonth && d.getFullYear() === thisYear; })
        .reduce((sum, e) => sum + parseFloat(e.amount), 0);
    const monthChange = monthIncome - monthExpenses;
    
    const changeEl = document.getElementById('netWorthChange');
    changeEl.innerHTML = `
        <i class="fas fa-arrow-${monthChange >= 0 ? 'up' : 'down'}"></i> 
        ${monthChange >= 0 ? '+' : ''}${formatMoney(monthChange)} diesen Monat
    `;
    changeEl.style.color = monthChange >= 0 ? 'rgba(255,255,255,0.9)' : '#FFB3B3';
}

// ====== HEALTH SCORE ======
function updateHealthScore() {
    let score = 50; // Base score
    const details = [];
    
    const totalIncome = appData.income.reduce((sum, i) => sum + parseFloat(i.amount), 0);
    const totalExpenses = appData.expenses.reduce((sum, e) => sum + parseFloat(e.amount), 0);
    
    // Savings rate
    if (totalIncome > 0) {
        const savingsRate = (totalIncome - totalExpenses) / totalIncome;
        if (savingsRate >= 0.2) { score += 15; details.push({ text: 'Gute Sparquote', class: 'good' }); }
        else if (savingsRate >= 0.1) { score += 8; details.push({ text: 'OK Sparquote', class: 'warning' }); }
        else { score -= 5; details.push({ text: 'Sparquote niedrig', class: 'bad' }); }
    }
    
    // Has investments
    if (appData.investments.length > 0) {
        score += 10;
        details.push({ text: 'Investiert', class: 'good' });
    } else {
        details.push({ text: 'Nicht investiert', class: 'warning' });
    }
    
    // Has goals
    if (appData.goals.length > 0) {
        score += 5;
        details.push({ text: 'Ziele gesetzt', class: 'good' });
    }
    
    // Budget tracking
    if (appData.expenses.length > 5) {
        score += 10;
        details.push({ text: 'Trackt Ausgaben', class: 'good' });
    }
    
    // Debt situation
    const totalDebt = appData.debts.reduce((sum, d) => sum + (parseFloat(d.amount) - parseFloat(d.paid)), 0);
    if (totalDebt > 0) {
        score -= 10;
        details.push({ text: 'Hat Schulden', class: 'bad' });
    } else {
        score += 10;
        details.push({ text: 'Schuldenfrei', class: 'good' });
    }
    
    // Multiple income
    const incomeTypes = new Set(appData.income.map(i => i.type));
    if (incomeTypes.size >= 2) {
        score += 10;
        details.push({ text: 'Mehrere Einkommensquellen', class: 'good' });
    }
    
    score = Math.max(0, Math.min(100, score));
    
    document.getElementById('healthScore').textContent = score;
    
    // Animate circle
    const circle = document.getElementById('healthCircle');
    const circumference = 2 * Math.PI * 54; // r=54
    const offset = circumference - (score / 100) * circumference;
    
    // Add gradient def to SVG if not exists
    const svg = circle.closest('svg');
    if (!svg.querySelector('defs')) {
        const defs = document.createElementNS('http://www.w3.org/2000/svg', 'defs');
        const gradient = document.createElementNS('http://www.w3.org/2000/svg', 'linearGradient');
        gradient.id = 'scoreGradient';
        const stop1 = document.createElementNS('http://www.w3.org/2000/svg', 'stop');
        stop1.setAttribute('offset', '0%');
        stop1.setAttribute('stop-color', '#6C5CE7');
        const stop2 = document.createElementNS('http://www.w3.org/2000/svg', 'stop');
        stop2.setAttribute('offset', '100%');
        stop2.setAttribute('stop-color', '#00B894');
        gradient.appendChild(stop1);
        gradient.appendChild(stop2);
        defs.appendChild(gradient);
        svg.insertBefore(defs, svg.firstChild);
    }
    
    circle.style.stroke = `url(#scoreGradient)`;
    setTimeout(() => {
        circle.style.strokeDashoffset = offset;
    }, 500);
    
    document.getElementById('scoreDetails').innerHTML = details
        .map(d => `<span class="score-detail ${d.class}">${d.text}</span>`)
        .join('');
}

// ====== AI INSIGHTS ======
function generateAIInsights() {
    const insights = [];
    const totalIncome = appData.income.reduce((sum, i) => sum + parseFloat(i.amount), 0);
    const totalExpenses = appData.expenses.reduce((sum, e) => sum + parseFloat(e.amount), 0);
    
    // Spending analysis
    if (appData.expenses.length > 0) {
        const categoryTotals = {};
        appData.expenses.forEach(e => {
            categoryTotals[e.category] = (categoryTotals[e.category] || 0) + parseFloat(e.amount);
        });
        
        const topCategory = Object.entries(categoryTotals).sort((a, b) => b[1] - a[1])[0];
        if (topCategory) {
            insights.push({
                icon: '📊',
                text: `Deine größte Ausgabenkategorie ist <strong>${CATEGORIES[topCategory[0]]?.name || topCategory[0]}</strong> mit ${formatMoney(topCategory[1])}. Überlege, ob du hier sparen kannst.`
            });
        }
    }
    
    // Savings suggestion
    if (totalIncome > 0 && totalExpenses > 0) {
        const savingsRate = ((totalIncome - totalExpenses) / totalIncome * 100).toFixed(0);
        if (savingsRate < 20) {
            insights.push({
                icon: '💡',
                text: `Deine Sparquote liegt bei <strong>${savingsRate}%</strong>. Versuche auf mindestens 20% zu kommen. Tipp: Automatisiere deine Sparrate direkt nach Gehaltseingang.`
            });
        } else {
            insights.push({
                icon: '🎉',
                text: `Toll! Deine Sparquote liegt bei <strong>${savingsRate}%</strong>. Du sparst mehr als der Durchschnitt. Weiter so!`
            });
        }
    }
    
    // Investment tip
    if (appData.investments.length === 0) {
        insights.push({
            icon: '📈',
            text: `Du hast noch keine Investments. <strong>Starte mit einem ETF-Sparplan</strong> - schon ab 25€/Monat kannst du langfristig Vermögen aufbauen.`
        });
    }
    
    // Debt warning
    if (appData.debts.length > 0) {
        const highInterestDebt = appData.debts.find(d => parseFloat(d.interest) > 10);
        if (highInterestDebt) {
            insights.push({
                icon: '⚠️',
                text: `Du hast Schulden mit <strong>${highInterestDebt.interest}% Zinsen</strong>. Priorisiere die Tilgung! Hohe Zinsen fressen dein Vermögen auf.`
            });
        }
    }
    
    // Emergency fund
    const hasEmergencyGoal = appData.goals.find(g => g.name.toLowerCase().includes('notgroschen') || g.name.toLowerCase().includes('notfall'));
    if (!hasEmergencyGoal && appData.goals.length > 0) {
        insights.push({
            icon: '🛡️',
            text: `Hast du einen <strong>Notgroschen</strong>? 3-6 Monatsausgaben auf einem Tagesgeldkonto geben dir finanzielle Sicherheit.`
        });
    }
    
    // Recurring expenses
    if (appData.recurringExpenses.length > 0) {
        const monthlyRecurring = appData.recurringExpenses
            .filter(r => r.interval === 'monthly')
            .reduce((sum, r) => sum + parseFloat(r.amount), 0);
        insights.push({
            icon: '🔄',
            text: `Deine wiederkehrenden monatlichen Kosten betragen <strong>${formatMoney(monthlyRecurring)}</strong>. Überprüfe regelmäßig, ob alle noch nötig sind.`
        });
    }
    
    // Default insight
    if (insights.length === 0) {
        insights.push({
            icon: '🚀',
            text: `Starte jetzt! Trage deine <strong>Einnahmen und Ausgaben</strong> ein, um personalisierte Tipps zu erhalten. Jeder Cent zählt!`
        });
    }
    
    document.getElementById('aiInsights').innerHTML = insights
        .map(i => `
            <div class="insight-item">
                <span class="insight-icon">${i.icon}</span>
                <p class="insight-text">${i.text}</p>
            </div>
        `).join('');
}

// ====== EXPENSE MANAGEMENT ======
function addExpense(e) {
    e.preventDefault();
    const expense = {
        id: Date.now(),
        amount: document.getElementById('expenseAmount').value,
        description: document.getElementById('expenseDesc').value,
        category: document.getElementById('expenseCategory').value,
        date: document.getElementById('expenseDate').value
    };
    
    appData.expenses.push(expense);
    saveData();
    closeModal('addExpenseModal');
    e.target.reset();
    setDefaultDates();
    
    renderAll();
    showToast('Ausgabe hinzugefügt: -' + formatMoney(expense.amount));
}

function deleteExpense(id) {
    appData.expenses = appData.expenses.filter(e => e.id !== id);
    saveData();
    renderAll();
    showToast('Ausgabe gelöscht');
}

// ====== INCOME MANAGEMENT ======
function addIncome(e) {
    e.preventDefault();
    const income = {
        id: Date.now(),
        amount: document.getElementById('incomeAmount').value,
        source: document.getElementById('incomeSource').value,
        type: document.getElementById('incomeType').value,
        recurring: document.getElementById('incomeRecurring').value,
        date: document.getElementById('incomeDate').value
    };
    
    appData.income.push(income);
    saveData();
    closeModal('addIncomeModal');
    e.target.reset();
    setDefaultDates();
    
    renderAll();
    showToast('Einnahme hinzugefügt: +' + formatMoney(income.amount));
}

function deleteIncome(id) {
    appData.income = appData.income.filter(i => i.id !== id);
    saveData();
    renderAll();
    showToast('Einnahme gelöscht');
}

// ====== INVESTMENT MANAGEMENT ======
function addInvestment(e) {
    e.preventDefault();
    const investment = {
        id: Date.now(),
        name: document.getElementById('investName').value,
        type: document.getElementById('investType').value,
        amount: document.getElementById('investAmount').value,
        currentValue: document.getElementById('investCurrentValue').value,
        date: new Date().toISOString().split('T')[0]
    };
    
    appData.investments.push(investment);
    saveData();
    closeModal('addInvestModal');
    e.target.reset();
    
    renderAll();
    showToast('Investment hinzugefügt');
}

function deleteInvestment(id) {
    appData.investments = appData.investments.filter(i => i.id !== id);
    saveData();
    renderAll();
    showToast('Investment gelöscht');
}

// ====== DEBT MANAGEMENT ======
function addDebt(e) {
    e.preventDefault();
    const debt = {
        id: Date.now(),
        name: document.getElementById('debtName').value,
        amount: document.getElementById('debtAmount').value,
        paid: document.getElementById('debtPaid').value || 0,
        interest: document.getElementById('debtInterest').value,
        monthlyPayment: document.getElementById('debtMonthlyPayment').value
    };
    
    appData.debts.push(debt);
    saveData();
    closeModal('addDebtModal');
    e.target.reset();
    
    renderAll();
    showToast('Schuld hinzugefügt');
}

function deleteDebt(id) {
    appData.debts = appData.debts.filter(d => d.id !== id);
    saveData();
    renderAll();
    showToast('Schuld gelöscht');
}

function makeDebtPayment(id) {
    const debt = appData.debts.find(d => d.id === id);
    if (debt) {
        const payment = prompt('Wie viel möchtest du zahlen (€)?', debt.monthlyPayment);
        if (payment && !isNaN(payment)) {
            debt.paid = parseFloat(debt.paid) + parseFloat(payment);
            if (debt.paid >= parseFloat(debt.amount)) {
                debt.paid = parseFloat(debt.amount);
                showToast('🎉 Schuld vollständig getilgt!');
            } else {
                showToast('Zahlung von ' + formatMoney(payment) + ' verbucht');
            }
            saveData();
            renderAll();
        }
    }
}

// ====== GOAL MANAGEMENT ======
function addGoal(e) {
    e.preventDefault();
    const goal = {
        id: Date.now(),
        name: document.getElementById('goalName').value,
        target: document.getElementById('goalTarget').value,
        current: document.getElementById('goalCurrent').value || 0,
        deadline: document.getElementById('goalDeadline').value,
        icon: document.getElementById('goalIcon').value
    };
    
    appData.goals.push(goal);
    saveData();
    closeModal('addGoalModal');
    e.target.reset();
    
    renderAll();
    showToast('Ziel erstellt: ' + goal.name);
}

function addMoneyToGoal(id) {
    const goal = appData.goals.find(g => g.id === id);
    if (goal) {
        const amount = prompt('Wie viel möchtest du einzahlen (€)?');
        if (amount && !isNaN(amount)) {
            goal.current = parseFloat(goal.current) + parseFloat(amount);
            if (parseFloat(goal.current) >= parseFloat(goal.target)) {
                goal.current = goal.target;
                showToast('🎉 Ziel erreicht: ' + goal.name + '!');
            } else {
                showToast(formatMoney(amount) + ' zu ' + goal.name + ' hinzugefügt');
            }
            saveData();
            renderAll();
        }
    }
}

function deleteGoal(id) {
    appData.goals = appData.goals.filter(g => g.id !== id);
    saveData();
    renderAll();
    showToast('Ziel gelöscht');
}

// ====== RECURRING EXPENSES ======
function addRecurringExpense(e) {
    e.preventDefault();
    const recurring = {
        id: Date.now(),
        description: document.getElementById('recurringDesc').value,
        amount: document.getElementById('recurringAmount').value,
        category: document.getElementById('recurringCategory').value,
        interval: document.getElementById('recurringInterval').value
    };
    
    appData.recurringExpenses.push(recurring);
    saveData();
    closeModal('addRecurringModal');
    e.target.reset();
    
    renderBudget();
    showToast('Wiederkehrende Ausgabe hinzugefügt');
}

function deleteRecurring(id) {
    appData.recurringExpenses = appData.recurringExpenses.filter(r => r.id !== id);
    saveData();
    renderBudget();
    showToast('Wiederkehrende Ausgabe gelöscht');
}

// ====== CATEGORY BUDGET ======
function setCategoryBudget(e) {
    e.preventDefault();
    const category = document.getElementById('budgetCategory').value;
    const amount = document.getElementById('budgetAmount').value;
    
    appData.categoryBudgets[category] = parseFloat(amount);
    saveData();
    closeModal('addCategoryModal');
    
    renderBudget();
    showToast('Budget für ' + CATEGORIES[category].name + ' gesetzt');
}

// ====== HUSTLE ENTRY ======
function addHustleEntry(e) {
    e.preventDefault();
    const entry = {
        id: Date.now(),
        activity: document.getElementById('hustleActivity').value,
        earnings: document.getElementById('hustleEarnings').value,
        hours: document.getElementById('hustleHours').value,
        date: document.getElementById('hustleDate').value
    };
    
    appData.hustleEntries.push(entry);
    saveData();
    closeModal('addHustleEntryModal');
    e.target.reset();
    setDefaultDates();
    
    renderSideHustles();
    showToast('Nebenjob-Eintrag gespeichert');
}

// ====== RENDER FUNCTIONS ======
function renderAll() {
    renderDashboard();
    renderBudget();
    renderIncome();
    renderInvestments();
    renderDebt();
    renderGoals();
    updateNetWorth();
    updateHealthScore();
    generateAIInsights();
}

function renderDashboard() {
    // Recent Transactions
    const allTransactions = [
        ...appData.expenses.map(e => ({ ...e, type: 'expense' })),
        ...appData.income.map(i => ({ ...i, type: 'income', description: i.source }))
    ].sort((a, b) => new Date(b.date) - new Date(a.date)).slice(0, 10);
    
    const recentEl = document.getElementById('recentTransactions');
    if (allTransactions.length === 0) {
        recentEl.innerHTML = '<p class="empty-state">Noch keine Transaktionen</p>';
    } else {
        recentEl.innerHTML = allTransactions.map(t => {
            const isExpense = t.type === 'expense';
            const cat = CATEGORIES[t.category];
            return `
                <div class="transaction-item">
                    <div class="transaction-icon" style="background: ${isExpense ? (cat?.color || '#AEB6BF') + '22' : 'rgba(0,184,148,0.15)'}">
                        ${isExpense ? (cat?.icon || '📦') : '💰'}
                    </div>
                    <div class="transaction-info">
                        <div class="transaction-desc">${t.description}</div>
                        <div class="transaction-date">${formatDate(t.date)}</div>
                    </div>
                    <div class="transaction-amount ${isExpense ? 'red' : 'green'}">
                        ${isExpense ? '-' : '+'}${formatMoney(t.amount)}
                    </div>
                </div>
            `;
        }).join('');
    }
    
    renderCharts();
}

function renderBudget() {
    updateMonthDisplay();
    
    // Filter expenses for current month
    const monthExpenses = appData.expenses.filter(e => {
        const d = new Date(e.date);
        return d.getMonth() === appData.currentMonth && d.getFullYear() === appData.currentYear;
    });
    
    const totalSpent = monthExpenses.reduce((sum, e) => sum + parseFloat(e.amount), 0);
    const budget = appData.settings.monthlyBudget;
    const percentage = Math.min((totalSpent / budget) * 100, 100);
    
    document.getElementById('budgetSpent').textContent = formatMoney(totalSpent);
    document.getElementById('budgetTotal').textContent = formatMoney(budget);
    
    const barFill = document.getElementById('budgetBarFill');
    barFill.style.width = percentage + '%';
    barFill.className = 'budget-bar-fill';
    if (percentage > 90) barFill.classList.add('danger');
    else if (percentage > 70) barFill.classList.add('warning');
    
    // Category Budgets
    const categoryTotals = {};
    monthExpenses.forEach(e => {
        categoryTotals[e.category] = (categoryTotals[e.category] || 0) + parseFloat(e.amount);
    });
    
    const catBudgets = document.getElementById('categoryBudgets');
    const categories = Object.keys({ ...CATEGORIES, ...appData.categoryBudgets });
    const uniqueCats = [...new Set(categories)].filter(c => CATEGORIES[c]);
    
    catBudgets.innerHTML = uniqueCats
        .filter(c => appData.categoryBudgets[c] || categoryTotals[c])
        .map(c => {
            const spent = categoryTotals[c] || 0;
            const catBudget = appData.categoryBudgets[c] || 0;
            const pct = catBudget > 0 ? Math.min((spent / catBudget) * 100, 100) : 0;
            const color = CATEGORIES[c]?.color || '#AEB6BF';
            
            return `
                <div class="category-item">
                    <div class="category-header">
                        <span class="category-name">${CATEGORIES[c]?.icon || ''} ${CATEGORIES[c]?.name || c}</span>
                        <span class="category-amounts">${formatMoney(spent)} / ${formatMoney(catBudget)}</span>
                    </div>
                    <div class="category-bar">
                        <div class="category-bar-fill" style="width: ${pct}%; background: ${color}"></div>
                    </div>
                </div>
            `;
        }).join('') || '<p class="empty-state">Noch keine Kategorien-Budgets gesetzt</p>';
    
    // Expense List
    const expenseList = document.getElementById('expenseList');
    expenseList.innerHTML = monthExpenses.length === 0
        ? '<p class="empty-state">Keine Ausgaben in diesem Monat</p>'
        : monthExpenses.sort((a, b) => new Date(b.date) - new Date(a.date)).map(e => {
            const cat = CATEGORIES[e.category];
            return `
                <div class="transaction-item">
                    <div class="transaction-icon" style="background: ${(cat?.color || '#AEB6BF')}22">
                        ${cat?.icon || '📦'}
                    </div>
                    <div class="transaction-info">
                        <div class="transaction-desc">${e.description}</div>
                        <div class="transaction-date">${formatDate(e.date)} • ${cat?.name || e.category}</div>
                    </div>
                    <div class="transaction-amount red">-${formatMoney(e.amount)}</div>
                    <button class="transaction-delete" onclick="deleteExpense(${e.id})">
                        <i class="fas fa-trash"></i>
                    </button>
                </div>
            `;
        }).join('');
    
    // Recurring Expenses
    const recurringEl = document.getElementById('recurringExpenses');
    recurringEl.innerHTML = appData.recurringExpenses.length === 0
        ? '<p class="empty-state">Keine wiederkehrenden Ausgaben</p>'
        : appData.recurringExpenses.map(r => {
            const cat = CATEGORIES[r.category];
            const intervalText = { monthly: 'Monatlich', yearly: 'Jährlich', quarterly: 'Vierteljährlich' };
            return `
                <div class="transaction-item">
                    <div class="transaction-icon" style="background: ${(cat?.color || '#AEB6BF')}22">
                        ${cat?.icon || '🔄'}
                    </div>
                    <div class="transaction-info">
                        <div class="transaction-desc">${r.description}</div>
                        <div class="transaction-date">${intervalText[r.interval] || r.interval}</div>
                    </div>
                    <div class="transaction-amount red">-${formatMoney(r.amount)}</div>
                    <button class="transaction-delete" onclick="deleteRecurring(${r.id})">
                        <i class="fas fa-trash"></i>
                    </button>
                </div>
            `;
        }).join('');
    
    // Update filter options
    const filter = document.getElementById('expenseFilter');
    const currentFilter = filter.value;
    filter.innerHTML = '<option value="all">Alle Kategorien</option>';
    Object.entries(CATEGORIES).forEach(([key, cat]) => {
        filter.innerHTML += `<option value="${key}">${cat.icon} ${cat.name}</option>`;
    });
    filter.value = currentFilter;
}

function renderIncome() {
    const thisMonth = new Date().getMonth();
    const thisYear = new Date().getFullYear();
    
    const monthIncome = appData.income.filter(i => {
        const d = new Date(i.date);
        return d.getMonth() === thisMonth && d.getFullYear() === thisYear;
    });
    
    const total = monthIncome.reduce((sum, i) => sum + parseFloat(i.amount), 0);
    const mainJob = monthIncome.filter(i => i.type === 'salary').reduce((sum, i) => sum + parseFloat(i.amount), 0);
    const side = monthIncome.filter(i => ['freelance', 'sidehustle'].includes(i.type)).reduce((sum, i) => sum + parseFloat(i.amount), 0);
    const passive = monthIncome.filter(i => ['passive', 'investment'].includes(i.type)).reduce((sum, i) => sum + parseFloat(i.amount), 0);
    
    document.getElementById('monthlyIncome').textContent = formatMoney(total);
    document.getElementById('mainJobIncome').textContent = formatMoney(mainJob);
    document.getElementById('sideIncome').textContent = formatMoney(side);
    document.getElementById('passiveIncome').textContent = formatMoney(passive);
    
    // Income Streams
    const streamEl = document.getElementById('incomeStreams');
    streamEl.innerHTML = appData.income.length === 0
        ? '<p class="empty-state">Noch keine Einnahmen erfasst</p>'
        : appData.income.sort((a, b) => new Date(b.date) - new Date(a.date)).slice(0, 20).map(i => {
            const typeIcons = { salary: '💼', freelance: '💻', sidehustle: '🚀', passive: '💰', investment: '📈', other: '📦' };
            return `
                <div class="transaction-item">
                    <div class="transaction-icon" style="background: rgba(0,184,148,0.15)">
                        ${typeIcons[i.type] || '💰'}
                    </div>
                    <div class="transaction-info">
                        <div class="transaction-desc">${i.source}</div>
                        <div class="transaction-date">${formatDate(i.date)}</div>
                    </div>
                    <div class="transaction-amount green">+${formatMoney(i.amount)}</div>
                    <button class="transaction-delete" onclick="deleteIncome(${i.id})">
                        <i class="fas fa-trash"></i>
                    </button>
                </div>
            `;
        }).join('');
    
    // Income Ideas
    const ideasEl = document.getElementById('incomeIdeas');
    const incomeIdeas = [
        { icon: 'fas fa-laptop-code', title: 'Freelancing', desc: 'Skills verkaufen' },
        { icon: 'fas fa-book', title: 'E-Books', desc: 'Wissen monetarisieren' },
        { icon: 'fas fa-camera', title: 'Stock Fotos', desc: 'Fotos online verkaufen' },
        { icon: 'fas fa-chalkboard-teacher', title: 'Online-Kurse', desc: 'Expertise teilen' },
        { icon: 'fas fa-shopping-cart', title: 'E-Commerce', desc: 'Produkte verkaufen' },
        { icon: 'fas fa-blog', title: 'Blogging', desc: 'Content monetarisieren' }
    ];
    
    ideasEl.innerHTML = incomeIdeas.map(idea => `
        <div class="idea-card" onclick="showIncomeIdea('${idea.title}')">
            <i class="${idea.icon}"></i>
            <h4>${idea.title}</h4>
            <p>${idea.desc}</p>
        </div>
    `).join('');
}

function renderInvestments() {
    const totalValue = appData.investments.reduce((sum, i) => sum + parseFloat(i.currentValue), 0);
    const totalInvested = appData.investments.reduce((sum, i) => sum + parseFloat(i.amount), 0);
    const change = totalInvested > 0 ? ((totalValue - totalInvested) / totalInvested * 100).toFixed(2) : 0;
    
    document.getElementById('portfolioValue').textContent = formatMoney(totalValue);
    const changeEl = document.getElementById('portfolioChange');
    changeEl.textContent = (change >= 0 ? '+' : '') + change + '%';
    changeEl.className = 'portfolio-change ' + (change < 0 ? 'negative' : '');
    
    // Investment List
    const listEl = document.getElementById('investmentList');
    listEl.innerHTML = appData.investments.length === 0
        ? '<p class="empty-state">Noch keine Investments</p>'
        : appData.investments.map(inv => {
            const invType = INVEST_TYPES[inv.type] || INVEST_TYPES.other;
            const invChange = ((parseFloat(inv.currentValue) - parseFloat(inv.amount)) / parseFloat(inv.amount) * 100).toFixed(1);
            return `
                <div class="invest-item">
                    <div class="invest-icon">${invType.icon}</div>
                    <div class="invest-info">
                        <div class="invest-name">${inv.name}</div>
                        <div class="invest-type">${invType.name} • Investiert: ${formatMoney(inv.amount)}</div>
                    </div>
                    <div class="invest-values">
                        <div class="invest-current">${formatMoney(inv.currentValue)}</div>
                        <div class="invest-change ${invChange >= 0 ? 'positive' : 'negative'}">
                            ${invChange >= 0 ? '+' : ''}${invChange}%
                        </div>
                    </div>
                    <button class="transaction-delete" onclick="deleteInvestment(${inv.id})">
                        <i class="fas fa-trash"></i>
                    </button>
                </div>
            `;
        }).join('');
    
    // Render portfolio chart
    renderPortfolioChart();
}

function renderDebt() {
    const totalDebt = appData.debts.reduce((sum, d) => sum + (parseFloat(d.amount) - parseFloat(d.paid)), 0);
    document.getElementById('totalDebt').textContent = formatMoney(totalDebt);
    
    // Sort by strategy
    const strategy = document.getElementById('debtStrategy').value;
    let sortedDebts = [...appData.debts];
    if (strategy === 'avalanche') {
        sortedDebts.sort((a, b) => parseFloat(b.interest) - parseFloat(a.interest));
    } else {
        sortedDebts.sort((a, b) => (parseFloat(a.amount) - parseFloat(a.paid)) - (parseFloat(b.amount) - parseFloat(b.paid)));
    }
    
    // Calculate debt-free date
    if (appData.debts.length > 0) {
        const totalMonthlyPayments = appData.debts.reduce((sum, d) => sum + parseFloat(d.monthlyPayment), 0);
        if (totalMonthlyPayments > 0) {
            const months = Math.ceil(totalDebt / totalMonthlyPayments);
            const freeDate = new Date();
            freeDate.setMonth(freeDate.getMonth() + months);
            document.getElementById('debtFreeDate').textContent = 
                freeDate.toLocaleDateString('de-DE', { month: 'long', year: 'numeric' });
        }
    } else {
        document.getElementById('debtFreeDate').textContent = 'Schuldenfrei! 🎉';
    }
    
    // Debt List
    const listEl = document.getElementById('debtList');
    listEl.innerHTML = sortedDebts.length === 0
        ? '<p class="empty-state">Keine Schulden - super! 🎉</p>'
        : sortedDebts.map(d => {
            const remaining = parseFloat(d.amount) - parseFloat(d.paid);
            const percentage = (parseFloat(d.paid) / parseFloat(d.amount) * 100).toFixed(0);
            return `
                <div class="debt-item">
                    <div class="debt-item-header">
                        <span class="debt-item-name">${d.name}</span>
                        <span class="debt-item-rate">${d.interest}% Zinsen</span>
                    </div>
                    <div class="debt-item-bar">
                        <div class="debt-item-bar-fill" style="width: ${percentage}%"></div>
                    </div>
                    <div class="debt-item-details">
                        <span>Bezahlt: ${formatMoney(d.paid)} (${percentage}%)</span>
                        <span>Restschuld: ${formatMoney(remaining)}</span>
                    </div>
                    <div class="debt-item-actions">
                        <button class="btn btn-primary" style="padding:5px 10px;font-size:0.75rem" onclick="makeDebtPayment(${d.id})">
                            💳 Zahlung leisten
                        </button>
                        <button class="btn btn-outline" style="padding:5px 10px;font-size:0.75rem" onclick="deleteDebt(${d.id})">
                            🗑️ Löschen
                        </button>
                    </div>
                </div>
            `;
        }).join('');
    
    renderDebtChart();
}

function renderGoals() {
    const listEl = document.getElementById('goalsList');
    listEl.innerHTML = appData.goals.length === 0
        ? '<p class="empty-state" style="padding:40px">Noch keine Ziele gesetzt. Erstelle dein erstes finanzielles Ziel!</p>'
        : appData.goals.map(g => {
            const percentage = (parseFloat(g.current) / parseFloat(g.target) * 100).toFixed(0);
            const remaining = parseFloat(g.target) - parseFloat(g.current);
            const deadline = new Date(g.deadline);
            const today = new Date();
            const daysLeft = Math.ceil((deadline - today) / (1000 * 60 * 60 * 24));
            const monthsLeft = Math.max(1, Math.ceil(daysLeft / 30));
            const monthlySaving = remaining / monthsLeft;
            
            return `
                <div class="goal-card">
                    <div class="goal-header">
                        <div style="display:flex;align-items:center;gap:12px">
                            <span class="goal-icon">${g.icon}</span>
                            <div class="goal-info">
                                <h4>${g.name}</h4>
                                <span class="goal-deadline">
                                    ${daysLeft > 0 ? daysLeft + ' Tage übrig' : 'Fällig!'}
                                    ${remaining > 0 ? ' • ' + formatMoney(monthlySaving) + '/Monat nötig' : ''}
                                </span>
                            </div>
                        </div>
                    </div>
                    <div class="goal-progress">
                        <div class="goal-bar">
                            <div class="goal-bar-fill" style="width: ${Math.min(percentage, 100)}%"></div>
                        </div>
                        <div class="goal-amounts">
                            <span class="goal-current">${formatMoney(g.current)}</span>
                            <span>${percentage}%</span>
                            <span class="goal-target">${formatMoney(g.target)}</span>
                        </div>
                    </div>
                    <div class="goal-actions">
                        <button class="btn-add-money" onclick="addMoneyToGoal(${g.id})">
                            💰 Einzahlen
                        </button>
                        <button class="btn-delete-goal" onclick="deleteGoal(${g.id})">
                            🗑️ Löschen
                        </button>
                    </div>
                </div>
            `;
        }).join('');
}

function renderSideHustles() {
    // Hustle Ideas
    const ideasEl = document.getElementById('hustleIdeas');
    ideasEl.innerHTML = HUSTLE_IDEAS.map(h => `
        <div class="hustle-card" data-category="${h.category}" onclick="showHustleDetail('${h.name}')">
            <div class="hustle-card-icon">${h.icon}</div>
            <h4>${h.name}</h4>
            <p>${h.desc}</p>
            <div class="earning-potential">💰 ${h.earning}</div>
        </div>
    `).join('');
    
    // Tracker Summary
    const now = new Date();
    const weekAgo = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);
    const weekEntries = appData.hustleEntries.filter(e => new Date(e.date) >= weekAgo);
    const weekEarnings = weekEntries.reduce((sum, e) => sum + parseFloat(e.earnings), 0);
    const weekHours = weekEntries.reduce((sum, e) => sum + parseFloat(e.hours), 0);
    
    document.getElementById('weeklyHustleEarnings').textContent = formatMoney(weekEarnings);
    document.getElementById('weeklyHustleHours').textContent = weekHours.toFixed(1) + 'h';
    document.getElementById('hustleHourlyRate').textContent = weekHours > 0 ? formatMoney(weekEarnings / weekHours) : '€0';
}

function renderLessons() {
    const listEl = document.getElementById('lessonList');
    const completedCount = appData.completedLessons.length;
    
    document.getElementById('learnProgress').style.width = (completedCount / LESSONS.length * 100) + '%';
    document.getElementById('learnProgressText').textContent = `${completedCount}/${LESSONS.length} Lektionen`;
    
    listEl.innerHTML = LESSONS.map((lesson, i) => {
        const isCompleted = appData.completedLessons.includes(i);
        return `
            <div class="lesson-card ${isCompleted ? 'completed' : ''}" onclick="openLesson(${i})">
                <div class="lesson-number">${isCompleted ? '✓' : i + 1}</div>
                <div class="lesson-info">
                    <h4>${lesson.title}</h4>
                    <p>${lesson.desc}</p>
                </div>
                <span class="lesson-check"><i class="fas fa-check-circle"></i></span>
            </div>
        `;
    }).join('');
}

// ====== CHARTS ======
let monthlyChartInstance = null;
let expenseChartInstance = null;
let portfolioChartInstance = null;
let compoundChartInstance = null;
let debtChartInstance = null;
let incomeChartInstance = null;

function renderCharts() {
    renderMonthlyChart();
    renderExpenseChart();
    renderIncomeChart();
}

function renderMonthlyChart() {
    const ctx = document.getElementById('monthlyChart');
    if (!ctx) return;
    
    if (monthlyChartInstance) monthlyChartInstance.destroy();
    
    const months = ['Jan', 'Feb', 'Mär', 'Apr', 'Mai', 'Jun', 'Jul', 'Aug', 'Sep', 'Okt', 'Nov', 'Dez'];
    const year = new Date().getFullYear();
    
    const incomeData = months.map((_, i) => 
        appData.income.filter(inc => { const d = new Date(inc.date); return d.getMonth() === i && d.getFullYear() === year; })
            .reduce((sum, inc) => sum + parseFloat(inc.amount), 0)
    );
    
    const expenseData = months.map((_, i) => 
        appData.expenses.filter(exp => { const d = new Date(exp.date); return d.getMonth() === i && d.getFullYear() === year; })
            .reduce((sum, exp) => sum + parseFloat(exp.amount), 0)
    );
    
    monthlyChartInstance = new Chart(ctx, {
        type: 'bar',
        data: {
            labels: months,
            datasets: [
                {
                    label: 'Einnahmen',
                    data: incomeData,
                    backgroundColor: 'rgba(0, 184, 148, 0.7)',
                    borderRadius: 6
                },
                {
                    label: 'Ausgaben',
                    data: expenseData,
                    backgroundColor: 'rgba(255, 118, 117, 0.7)',
                    borderRadius: 6
                }
            ]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: { legend: { position: 'top' } },
            scales: {
                y: { beginAtZero: true, ticks: { callback: v => '€' + v } }
            }
        }
    });
}

function renderExpenseChart() {
    const ctx = document.getElementById('expenseChart');
    if (!ctx) return;
    
    if (expenseChartInstance) expenseChartInstance.destroy();
    
    const categoryTotals = {};
    appData.expenses.forEach(e => {
        const catName = CATEGORIES[e.category]?.name || e.category;
        categoryTotals[catName] = (categoryTotals[catName] || 0) + parseFloat(e.amount);
    });
    
    const labels = Object.keys(categoryTotals);
    const data = Object.values(categoryTotals);
    const colors = labels.map(l => {
        const cat = Object.values(CATEGORIES).find(c => c.name === l);
        return cat?.color || '#AEB6BF';
    });
    
    if (labels.length === 0) {
        labels.push('Keine Daten');
        data.push(1);
        colors.push('#DFE6E9');
    }
    
    expenseChartInstance = new Chart(ctx, {
        type: 'doughnut',
        data: {
            labels,
            datasets: [{ data, backgroundColor: colors, borderWidth: 2, borderColor: '#fff' }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: { position: 'bottom', labels: { padding: 15, font: { size: 11 } } }
            }
        }
    });
}

function renderPortfolioChart() {
    const ctx = document.getElementById('portfolioChart');
    if (!ctx) return;
    
    if (portfolioChartInstance) portfolioChartInstance.destroy();
    
    const typeTotals = {};
    appData.investments.forEach(inv => {
        const typeName = INVEST_TYPES[inv.type]?.name || inv.type;
        typeTotals[typeName] = (typeTotals[typeName] || 0) + parseFloat(inv.currentValue);
    });
    
    const labels = Object.keys(typeTotals);
    const data = Object.values(typeTotals);
    const colors = ['#6C5CE7', '#00CEC9', '#FDCB6E', '#FF7675', '#00B894', '#E17055'];
    
    if (labels.length === 0) {
        labels.push('Kein Portfolio');
        data.push(1);
    }
    
    portfolioChartInstance = new Chart(ctx, {
        type: 'doughnut',
        data: {
            labels,
            datasets: [{ data, backgroundColor: colors.slice(0, labels.length), borderWidth: 2, borderColor: '#fff' }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: { legend: { position: 'bottom' } }
        }
    });
}

function renderIncomeChart() {
    const ctx = document.getElementById('incomeChart');
    if (!ctx) return;
    
    if (incomeChartInstance) incomeChartInstance.destroy();
    
    const months = ['Jan', 'Feb', 'Mär', 'Apr', 'Mai', 'Jun', 'Jul', 'Aug', 'Sep', 'Okt', 'Nov', 'Dez'];
    const year = new Date().getFullYear();
    
    const data = months.map((_, i) => 
        appData.income.filter(inc => { const d = new Date(inc.date); return d.getMonth() === i && d.getFullYear() === year; })
            .reduce((sum, inc) => sum + parseFloat(inc.amount), 0)
    );
    
    incomeChartInstance = new Chart(ctx, {
        type: 'line',
        data: {
            labels: months,
            datasets: [{
                label: 'Einnahmen',
                data,
                borderColor: '#00B894',
                backgroundColor: 'rgba(0, 184, 148, 0.1)',
                fill: true,
                tension: 0.4,
                pointRadius: 4,
                pointBackgroundColor: '#00B894'
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: { legend: { display: false } },
            scales: {
                y: { beginAtZero: true, ticks: { callback: v => '€' + v } }
            }
        }
    });
}

function renderDebtChart() {
    const ctx = document.getElementById('debtChart');
    if (!ctx) return;
    
    if (debtChartInstance) debtChartInstance.destroy();
    
    if (appData.debts.length === 0) {
        debtChartInstance = new Chart(ctx, {
            type: 'bar',
            data: { labels: ['Keine Schulden 🎉'], datasets: [{ data: [0], backgroundColor: '#00B894' }] },
            options: { responsive: true, maintainAspectRatio: false }
        });
        return;
    }
    
    const labels = appData.debts.map(d => d.name);
    const remaining = appData.debts.map(d => parseFloat(d.amount) - parseFloat(d.paid));
    const paid = appData.debts.map(d => parseFloat(d.paid));
    
    debtChartInstance = new Chart(ctx, {
        type: 'bar',
        data: {
            labels,
            datasets: [
                { label: 'Bezahlt', data: paid, backgroundColor: 'rgba(0, 184, 148, 0.7)', borderRadius: 6 },
                { label: 'Restschuld', data: remaining, backgroundColor: 'rgba(255, 118, 117, 0.7)', borderRadius: 6 }
            ]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: { legend: { position: 'top' } },
            scales: {
                x: { stacked: true },
                y: { stacked: true, ticks: { callback: v => '€' + v } }
            }
        }
    });
}

// ====== COMPOUND INTEREST CALCULATOR ======
function calculateCompound() {
    const start = parseFloat(document.getElementById('calcStart').value) || 0;
    const monthly = parseFloat(document.getElementById('calcMonthly').value) || 0;
    const rate = parseFloat(document.getElementById('calcRate').value) || 0;
    const years = parseInt(document.getElementById('calcYears').value) || 0;
    
    const monthlyRate = rate / 100 / 12;
    let total = start;
    const deposited = start + (monthly * 12 * years);
    
    const yearlyData = [start];
    const depositedData = [start];
    
    for (let y = 1; y <= years; y++) {
        for (let m = 0; m < 12; m++) {
            total = total * (1 + monthlyRate) + monthly;
        }
        yearlyData.push(Math.round(total));
        depositedData.push(start + monthly * 12 * y);
    }
    
    document.getElementById('calcResult').textContent = formatMoney(total);
    document.getElementById('calcDeposited').textContent = formatMoney(deposited);
    document.getElementById('calcProfit').textContent = formatMoney(total - deposited);
    
    // Chart
    const ctx = document.getElementById('compoundChart');
    if (!ctx) return;
    
    if (compoundChartInstance) compoundChartInstance.destroy();
    
    const labels = Array.from({ length: years + 1 }, (_, i) => 'Jahr ' + i);
    
    compoundChartInstance = new Chart(ctx, {
        type: 'line',
        data: {
            labels,
            datasets: [
                {
                    label: 'Gesamtwert',
                    data: yearlyData,
                    borderColor: '#6C5CE7',
                    backgroundColor: 'rgba(108, 92, 231, 0.1)',
                    fill: true,
                    tension: 0.4
                },
                {
                    label: 'Eingezahlt',
                    data: depositedData,
                    borderColor: '#00CEC9',
                    backgroundColor: 'rgba(0, 206, 201, 0.1)',
                    fill: true,
                    tension: 0
                }
            ]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: { legend: { position: 'top' } },
            scales: {
                y: { ticks: { callback: v => '€' + (v >= 1000 ? (v / 1000).toFixed(0) + 'k' : v) } }
            }
        }
    });
}

// ====== FIRE CALCULATOR ======
function calculateFIRE() {
    const expenses = parseFloat(document.getElementById('fireExpenses').value) || 0;
    const wealth = parseFloat(document.getElementById('fireWealth').value) || 0;
    const savings = parseFloat(document.getElementById('fireSavings').value) || 0;
    const returnRate = parseFloat(document.getElementById('fireReturn').value) || 0;
    
    const fireNumber = expenses * 25;
    document.getElementById('fireNumber').textContent = formatMoney(fireNumber);
    
    if (savings <= 0 || returnRate <= 0) {
        document.getElementById('fireYears').textContent = '∞';
        return;
    }
    
    let current = wealth;
    let years = 0;
    const monthlyReturn = returnRate / 100 / 12;
    
    while (current < fireNumber && years < 100) {
        for (let m = 0; m < 12; m++) {
            current = current * (1 + monthlyReturn) + savings;
        }
        years++;
    }
    
    document.getElementById('fireYears').textContent = years >= 100 ? '100+' : years;
}

// ====== SIDE HUSTLE QUIZ ======
function startHustleQuiz() {
    quizStep = 0;
    quizAnswers = [];
    showQuizQuestion();
}

function showQuizQuestion() {
    if (quizStep >= QUIZ_QUESTIONS.length) {
        showQuizResults();
        return;
    }
    
    const q = QUIZ_QUESTIONS[quizStep];
    document.getElementById('quizQuestion').textContent = q.question;
    document.getElementById('quizOptions').innerHTML = q.options.map((opt, i) => `
        <div class="quiz-option" onclick="selectQuizOption(${i})">${opt}</div>
    `).join('');
    document.getElementById('quizProgress').style.width = (quizStep / QUIZ_QUESTIONS.length * 100) + '%';
}

function selectQuizOption(index) {
    quizAnswers.push(index);
    quizStep++;
    showQuizQuestion();
}

function showQuizResults() {
    document.getElementById('quizProgress').style.width = '100%';
    
    // Simple recommendation based on answers
    let recommendations = [];
    
    if (quizAnswers[1] === 1) recommendations.push('Web Development', 'App Entwicklung');
    else if (quizAnswers[1] === 2) recommendations.push('Grafikdesign', 'YouTube Kanal', 'Fotografie');
    else if (quizAnswers[1] === 0) recommendations.push('Freelance Writing', 'Online Tutoring', 'Blogging');
    else recommendations.push('Handwerk & Reparatur', 'Umzugshilfe');
    
    if (quizAnswers[3] === 0) recommendations.push('Freelancing', 'Nachhilfe');
    if (quizAnswers[2] === 3) recommendations.push('Affiliate Marketing', 'Online Kurse', 'E-Books schreiben');
    
    const uniqueRecs = [...new Set(recommendations)].slice(0, 4);
    const matchedHustles = HUSTLE_IDEAS.filter(h => uniqueRecs.some(r => h.name.includes(r) || r.includes(h.name)));
    const displayHustles = matchedHustles.length > 0 ? matchedHustles : HUSTLE_IDEAS.slice(0, 4);
    
    document.getElementById('quizQuestion').textContent = '🎯 Deine Top-Empfehlungen:';
    document.getElementById('quizOptions').innerHTML = displayHustles.map(h => `
        <div class="quiz-option selected" style="cursor:default">
            ${h.icon} <strong>${h.name}</strong> - ${h.earning}<br>
            <small>${h.desc}</small>
        </div>
    `).join('');
}

// ====== FILTER FUNCTIONS ======
function filterHustles(category) {
    document.querySelectorAll('.filter-tags .tag').forEach(t => t.classList.remove('active'));
    event.target.classList.add('active');
    
    document.querySelectorAll('.hustle-card').forEach(card => {
        if (category === 'all' || card.dataset.category === category) {
            card.style.display = '';
        } else {
            card.style.display = 'none';
        }
    });
}

function filterExpenses() {
    const category = document.getElementById('expenseFilter').value;
    const sort = document.getElementById('expenseSort').value;
    
    let filtered = [...appData.expenses].filter(e => {
        const d = new Date(e.date);
        return d.getMonth() === appData.currentMonth && d.getFullYear() === appData.currentYear;
    });
    
    if (category !== 'all') {
        filtered = filtered.filter(e => e.category === category);
    }
    
    if (sort === 'amount') {
        filtered.sort((a, b) => parseFloat(b.amount) - parseFloat(a.amount));
    } else {
        filtered.sort((a, b) => new Date(b.date) - new Date(a.date));
    }
    
    const expenseList = document.getElementById('expenseList');
    expenseList.innerHTML = filtered.length === 0
        ? '<p class="empty-state">Keine Ausgaben gefunden</p>'
        : filtered.map(e => {
            const cat = CATEGORIES[e.category];
            return `
                <div class="transaction-item">
                    <div class="transaction-icon" style="background: ${(cat?.color || '#AEB6BF')}22">
                        ${cat?.icon || '📦'}
                    </div>
                    <div class="transaction-info">
                        <div class="transaction-desc">${e.description}</div>
                        <div class="transaction-date">${formatDate(e.date)}</div>
                    </div>
                    <div class="transaction-amount red">-${formatMoney(e.amount)}</div>
                    <button class="transaction-delete" onclick="deleteExpense(${e.id})">
                        <i class="fas fa-trash"></i>
                    </button>
                </div>
            `;
        }).join('');
}

// ====== LESSONS ======
function openLesson(index) {
    const lesson = LESSONS[index];
    const isCompleted = appData.completedLessons.includes(index);
    
    document.getElementById('infoModalTitle').textContent = '📚 ' + lesson.title;
    document.getElementById('infoModalBody').innerHTML = `
        <p style="line-height:1.8;margin-bottom:20px">${lesson.content}</p>
        <button class="btn ${isCompleted ? 'btn-outline' : 'btn-primary'} full-width" 
                onclick="completeLesson(${index})">
            ${isCompleted ? '✅ Bereits abgeschlossen' : '✅ Als gelesen markieren'}
        </button>
    `;
    openModal('infoModal');
}

function completeLesson(index) {
    if (!appData.completedLessons.includes(index)) {
        appData.completedLessons.push(index);
        saveData();
        renderLessons();
        showToast('🎓 Lektion abgeschlossen!');
    }
    closeModal('infoModal');
}

// ====== INVESTMENT INFO ======
function showInvestInfo(type) {
    const infos = {
        etf: {
            title: '📊 ETFs (Exchange Traded Funds)',
            content: `
                <h4>Was sind ETFs?</h4>
                <p>ETFs sind börsengehandelte Fonds, die einen Index abbilden (z.B. MSCI World, S&P 500).</p>
                <h4>Vorteile</h4>
                <ul>
                    <li>Breite Diversifikation</li>
                    <li>Niedrige Kosten (0.1-0.5% TER)</li>
                    <li>Einfach per Sparplan zu kaufen</li>
                    <li>Historische Rendite: ~7% p.a.</li>
                </ul>
                <h4>Top ETFs für Einsteiger</h4>
                <ul>
                    <li>MSCI World (1.500+ Unternehmen weltweit)</li>
                    <li>MSCI All Country World (inkl. Schwellenländer)</li>
                    <li>S&P 500 (500 größte US-Unternehmen)</li>
                </ul>
                <h4>Tipp</h4>
                <p>Starte mit einem Sparplan ab 25€/Monat. Langfristig investieren und nicht panisch verkaufen!</p>
            `
        },
        stocks: {
            title: '📈 Aktien',
            content: `
                <h4>Was sind Aktien?</h4>
                <p>Aktien sind Anteile an einem Unternehmen. Du wirst Miteigentümer.</p>
                <h4>Vorteile</h4>
                <ul>
                    <li>Hohe Renditechancen</li>
                    <li>Dividendenzahlungen</li>
                    <li>Inflationsschutz</li>
                </ul>
                <h4>Risiken</h4>
                <ul>
                    <li>Höhere Volatilität als ETFs</li>
                    <li>Einzelaktienrisiko</li>
                    <li>Erfordert mehr Research</li>
                </ul>
                <h4>Tipp</h4>
                <p>Für Anfänger: Erst ETFs, dann Einzelaktien als Ergänzung. Nie mehr als 5-10% in eine Aktie!</p>
            `
        },
        crypto: {
            title: '₿ Kryptowährungen',
            content: `
                <h4>Was ist Krypto?</h4>
                <p>Digitale Währungen basierend auf Blockchain-Technologie.</p>
                <h4>Die Größten</h4>
                <ul>
                    <li>Bitcoin (BTC) - Digitales Gold</li>
                    <li>Ethereum (ETH) - Smart Contract Plattform</li>
                </ul>
                <h4>Risiken</h4>
                <ul>
                    <li>Extrem volatil (50%+ Schwankungen)</li>
                    <li>Regulierungsrisiken</li>
                    <li>Technisches Wissen nötig</li>
                </ul>
                <h4>Tipp</h4>
                <p>Maximal 5-10% des Portfolios. Nur investieren was du verlieren kannst. DCA-Strategie nutzen.</p>
            `
        },
        realestate: {
            title: '🏠 Immobilien',
            content: `
                <h4>Immobilien als Investment</h4>
                <p>Physische Immobilien oder REITs (Immobilien-ETFs).</p>
                <h4>Vorteile</h4>
                <ul>
                    <li>Stabile Wertentwicklung</li>
                    <li>Mieteinnahmen</li>
                    <li>Inflationsschutz</li>
                    <li>Hebeleffekt durch Kredit</li>
                </ul>
                <h4>Alternativen ohne Eigentum</h4>
                <ul>
                    <li>REITs (börsengehandelte Immobilienfonds)</li>
                    <li>Crowdinvesting (ab 100€)</li>
                </ul>
                <h4>Tipp</h4>
                <p>Kaufnebenkosten beachten (~10-15%). Lage, Lage, Lage!</p>
            `
        },
        bonds: {
            title: '📄 Anleihen',
            content: `
                <h4>Was sind Anleihen?</h4>
                <p>Du leihst einem Staat oder Unternehmen Geld und bekommst Zinsen.</p>
                <h4>Vorteile</h4>
                <ul>
                    <li>Stabilere Rendite als Aktien</li>
                    <li>Regelmäßige Zinszahlungen</li>
                    <li>Diversifikation</li>
                </ul>
                <h4>Rendite</h4>
                <p>Staatsanleihen: 2-4%, Unternehmensanleihen: 3-6%</p>
                <h4>Tipp</h4>
                <p>Als Beimischung im Portfolio. Besonders wichtig je näher die Rente kommt.</p>
            `
        },
        diversify: {
            title: '🔄 Diversifikation',
            content: `
                <h4>Warum Diversifizieren?</h4>
                <p>Verschiedene Anlagen reagieren unterschiedlich auf Marktbedingungen.</p>
                <h4>Portfolio-Beispiel</h4>
                <ul>
                    <li>60% Aktien-ETFs (Wachstum)</li>
                    <li>20% Anleihen (Stabilität)</li>
                    <li>10% Immobilien-REITs (Einkommen)</li>
                    <li>5% Rohstoffe/Gold (Absicherung)</li>
                    <li>5% Krypto (Spekulation)</li>
                </ul>
                <h4>Tipp</h4>
                <p>Jährlich rebalancieren. Mit dem Alter mehr Richtung Anleihen verschieben.</p>
            `
        }
    };
    
    const info = infos[type];
    if (info) {
        document.getElementById('infoModalTitle').textContent = info.title;
        document.getElementById('infoModalBody').innerHTML = info.content;
        openModal('infoModal');
    }
}

// ====== HUSTLE DETAIL ======
function showHustleDetail(name) {
    const hustle = HUSTLE_IDEAS.find(h => h.name === name);
    if (hustle) {
        document.getElementById('infoModalTitle').textContent = hustle.icon + ' ' + hustle.name;
        document.getElementById('infoModalBody').innerHTML = `
            <p><strong>Verdienst:</strong> ${hustle.earning}</p>
            <p><strong>Kategorie:</strong> ${hustle.category}</p>
            <p style="margin-top:15px">${hustle.desc}</p>
            <h4>So startest du:</h4>
            <ul>
                <li>Recherchiere die Plattformen und Möglichkeiten</li>
                <li>Erstelle ein Portfolio oder Profil</li>
                <li>Starte mit kleinen Projekten</li>
                <li>Baue Erfahrung und Bewertungen auf</li>
                <li>Skaliere dein Einkommen</li>
            </ul>
        `;
        openModal('infoModal');
    }
}

function showIncomeIdea(title) {
    document.getElementById('infoModalTitle').textContent = '💡 ' + title;
    document.getElementById('infoModalBody').innerHTML = `
        <p>Starte noch heute mit <strong>${title}</strong>!</p>
        <h4>Erste Schritte:</h4>
        <ul>
            <li>Definiere dein Angebot</li>
            <li>Erstelle eine Online-Präsenz</li>
            <li>Finde deine ersten Kunden</li>
            <li>Liefere exzellente Qualität</li>
            <li>Skaliere durch Empfehlungen</li>
        </ul>
        <p style="margin-top:15px">💪 Jeder zusätzliche Euro bringt dich deiner finanziellen Freiheit näher!</p>
    `;
    openModal('infoModal');
}

// ====== MODAL FUNCTIONS ======
function openModal(id) {
    document.getElementById(id).classList.add('active');
}

function closeModal(id) {
    document.getElementById(id).classList.remove('active');
}

function openQuickAdd() {
    openModal('quickAddModal');
}

function openSettings() {
    openModal('settingsModal');
}

// Close modal on backdrop click
document.addEventListener('click', (e) => {
    if (e.target.classList.contains('modal')) {
        e.target.classList.remove('active');
    }
});

// ====== SETTINGS ======
function toggleDarkMode() {
    const isDark = document.getElementById('darkModeSetting').checked;
    appData.settings.darkMode = isDark;
    document.documentElement.setAttribute('data-theme', isDark ? 'dark' : '');
    saveData();
}

function updateMonthlyBudget() {
    appData.settings.monthlyBudget = parseFloat(document.getElementById('monthlyBudgetSetting').value) || 2000;
    saveData();
    renderBudget();
}

function updateDebtPlan() {
    renderDebt();
}

function exportData() {
    const dataStr = JSON.stringify(appData, null, 2);
    const blob = new Blob([dataStr], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'wealthbuilder-backup-' + new Date().toISOString().split('T')[0] + '.json';
    a.click();
    URL.revokeObjectURL(url);
    showToast('Daten exportiert!');
}

function importData() {
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = '.json';
    input.onchange = (e) => {
        const file = e.target.files[0];
        const reader = new FileReader();
        reader.onload = (event) => {
            try {
                const imported = JSON.parse(event.target.result);
                appData = { ...appData, ...imported };
                saveData();
                renderAll();
                showToast('Daten importiert!');
                closeModal('settingsModal');
            } catch (err) {
                showToast('Fehler beim Importieren!');
            }
        };
        reader.readAsText(file);
    };
    input.click();
}

function resetAllData() {
    if (confirm('⚠️ Alle Daten werden gelöscht! Bist du sicher?')) {
        localStorage.removeItem('wealthBuilderData');
        location.reload();
    }
}

// ====== UTILITY FUNCTIONS ======
function formatMoney(amount) {
    return '€' + parseFloat(amount).toLocaleString('de-DE', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
}

function formatDate(dateStr) {
    return new Date(dateStr).toLocaleDateString('de-DE', { day: '2-digit', month: 'short', year: 'numeric' });
}

function showToast(message) {
    const toast = document.getElementById('toast');
    document.getElementById('toastMessage').textContent = message;
    toast.classList.add('show');
    setTimeout(() => toast.classList.remove('show'), 3000);
}

// ====== SERVICE WORKER for PWA ======
if ('serviceWorker' in navigator) {
    // PWA-ready
}