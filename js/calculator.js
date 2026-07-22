// ============================================
// AKWAABA FINANCE – Calculator Engine
// ============================================

function formatCurrency(amount) {
    return new Intl.NumberFormat('de-DE', {
        style: 'currency',
        currency: 'EUR'
    }).format(amount);
}

// === COMPOUND INTEREST CALCULATOR ===
function calculateCompound() {
    const initial = parseFloat(document.getElementById('compInitial').value) || 0;
    const rate = parseFloat(document.getElementById('compRate').value) / 100;
    const years = parseInt(document.getElementById('compYears').value) || 1;
    const monthly = parseFloat(document.getElementById('compMonthly').value) || 0;

    const monthlyRate = rate / 12;
    const months = years * 12;

    // Compound interest formula with monthly contributions
    let total = initial * Math.pow(1 + monthlyRate, months);
    if (monthlyRate > 0) {
        total += monthly * ((Math.pow(1 + monthlyRate, months) - 1) / monthlyRate);
    } else {
        total += monthly * months;
    }

    const totalInvested = initial + (monthly * months);
    const profit = total - totalInvested;
    const roi = totalInvested > 0 ? ((profit / totalInvested) * 100) : 0;

    // Quantum fluctuation simulation (adds realism)
    const quantumFactor = 1 + (Math.random() * 0.02 - 0.01);
    const quantumTotal = total * quantumFactor;

    const resultDiv = document.getElementById('compResult');
    resultDiv.classList.remove('hidden');
    resultDiv.innerHTML = `
        <h4>⚛️ Quantum Berechnungsergebnis</h4>
        <div class="result-row">
            <span class="label">Eingezahlt:</span>
            <span class="value">${formatCurrency(totalInvested)}</span>
        </div>
        <div class="result-row">
            <span class="label">Endkapital:</span>
            <span class="value positive">${formatCurrency(total)}</span>
        </div>
        <div class="result-row">
            <span class="label">Gewinn:</span>
            <span class="value positive">+${formatCurrency(profit)}</span>
        </div>
        <div class="result-row">
            <span class="label">Rendite:</span>
            <span class="value positive">+${roi.toFixed(1)}%</span>
        </div>
        <div class="result-row">
            <span class="label">⚛️ Quantum-Prognose:</span>
            <span class="value">${formatCurrency(quantumTotal)}</span>
        </div>
        <div class="result-tip">
            💡 <strong>Quantum AI Tipp:</strong> ${getCompoundTip(profit, years, monthly)}
        </div>
    `;

    animateConfidence(85 + Math.random() * 10);
}

function getCompoundTip(profit, years, monthly) {
    if (monthly === 0) {
        return "Schon kleine monatliche Einzahlungen können deinen Gewinn vervielfachen! Versuche 50-100€ pro Monat.";
    }
    if (years < 5) {
        return "Langfristiges Investieren verstärkt den Zinseszinseffekt enorm. Erwäge einen längeren Zeitraum.";
    }
    if (profit > 10000) {
        return "Exzellent! Dein Geld arbeitet hart für dich. Überprüfe regelmäßig deine Anlagestrategie.";
    }
    return "Konsistenz ist der Schlüssel! Bleib dran und erhöhe deine Sparrate, wenn möglich.";
}

// === LOAN CALCULATOR ===
function calculateLoan() {
    const amount = parseFloat(document.getElementById('loanAmount').value) || 0;
    const rate = parseFloat(document.getElementById('loanRate').value) / 100;
    const term = parseInt(document.getElementById('loanTerm').value) || 1;

    const monthlyRate = rate / 12;
    const months = term * 12;

    let monthlyPayment;
    if (monthlyRate > 0) {
        monthlyPayment = amount * (monthlyRate * Math.pow(1 + monthlyRate, months)) /
                         (Math.pow(1 + monthlyRate, months) - 1);
    } else {
        monthlyPayment = amount / months;
    }

    const totalCost = monthlyPayment * months;
    const totalInterest = totalCost - amount;

    const resultDiv = document.getElementById('loanResult');
    resultDiv.classList.remove('hidden');
    resultDiv.innerHTML = `
        <h4>⚛️ Kredit-Analyse</h4>
        <div class="result-row">
            <span class="label">Kreditbetrag:</span>
            <span class="value">${formatCurrency(amount)}</span>
        </div>
        <div class="result-row">
            <span class="label">Monatliche Rate:</span>
            <span class="value negative">${formatCurrency(monthlyPayment)}</span>
        </div>
        <div class="result-row">
            <span class="label">Gesamtkosten:</span>
            <span class="value negative">${formatCurrency(totalCost)}</span>
        </div>
        <div class="result-row">
            <span class="label">Gesamtzinsen:</span>
            <span class="value negative">${formatCurrency(totalInterest)}</span>
        </div>
        <div class="result-tip">
            💡 <strong>Quantum AI Tipp:</strong> ${getLoanTip(totalInterest, amount, term)}
        </div>
    `;

    animateConfidence(90 + Math.random() * 8);
}

function getLoanTip(interest, amount, term) {
    const interestRatio = interest / amount;
    if (interestRatio > 0.3) {
        return "⚠️ Die Zinsen machen über 30% des Kredits aus. Versuche eine kürzere Laufzeit oder bessere Konditionen.";
    }
    if (term > 7) {
        return "Lange Laufzeiten bedeuten mehr Zinsen. Prüfe ob Sondertilgungen möglich sind.";
    }
    return "Gute Konditionen! Achte auf mögliche Sondertilgungen um schneller schuldenfrei zu sein.";
}

// === SAVINGS GOAL CALCULATOR ===
function calculateSavings() {
    const goal = parseFloat(document.getElementById('savingsGoal').value) || 0;
    const have = parseFloat(document.getElementById('savingsHave').value) || 0;
    const months = parseInt(document.getElementById('savingsMonths').value) || 1;

    const remaining = goal - have;
    const monthlyNeeded = remaining / months;
    const dailyNeeded = remaining / (months * 30);
    const weeklyNeeded = remaining / (months * 4.33);
    const progress = (have / goal) * 100;

    const resultDiv = document.getElementById('savingsResult');
    resultDiv.classList.remove('hidden');
    resultDiv.innerHTML = `
        <h4>⚛️ Sparziel-Analyse</h4>
        <div class="result-row">
            <span class="label">Sparziel:</span>
            <span class="value">${formatCurrency(goal)}</span>
        </div>
        <div class="result-row">
            <span class="label">Noch benötigt:</span>
            <span class="value negative">${formatCurrency(remaining)}</span>
        </div>
        <div class="result-row">
            <span class="label">Monatlich sparen:</span>
            <span class="value">${formatCurrency(monthlyNeeded)}</span>
        </div>
        <div class="result-row">
            <span class="label">Wöchentlich sparen:</span>
            <span class="value">${formatCurrency(weeklyNeeded)}</span>
        </div>
        <div class="result-row">
            <span class="label">Täglich sparen:</span>
            <span class="value">${formatCurrency(dailyNeeded)}</span>
        </div>
        <div class="result-row">
            <span class="label">Fortschritt:</span>
            <span class="value positive">${progress.toFixed(1)}%</span>
        </div>
        <div class="result-tip">
            💡 <strong>Quantum AI Tipp:</strong> ${getSavingsTip(dailyNeeded, progress)}
        </div>
    `;

    animateConfidence(92 + Math.random() * 7);
}

function getSavingsTip(daily, progress) {
    if (progress > 50) return "Super! Du hast schon über die Hälfte geschafft. Bleib am Ball! 🎯";
    if (daily < 5) return "Weniger als ein Kaffee pro Tag! Das ist absolut machbar. Du schaffst das! ☕";
    if (daily > 20) return "Das ist ambitioniert. Überlege, ob du den Zeitraum verlängern oder das Ziel anpassen kannst.";
    return "Ein gutes Ziel! Richte einen Dauerauftrag ein, damit das Sparen automatisch läuft.";
}

// === INVESTMENT CALCULATOR ===
function calculateInvestment() {
    const amount = parseFloat(document.getElementById('investAmount').value) || 0;
    const risk = document.getElementById('investRisk').value;
    const years = parseInt(document.getElementById('investYears').value) || 1;

    const riskProfiles = {
        low: { min: 3, max: 5, name: "Konservativ", emoji: "🛡️" },
        medium: { min: 5, max: 8, name: "Ausgewogen", emoji: "⚖️" },
        high: { min: 8, max: 15, name: "Aggressiv", emoji: "🚀" }
    };

    const profile = riskProfiles[risk];

    // Quantum simulation: multiple scenarios
    const scenarios = {
        pessimistic: amount * Math.pow(1 + profile.min / 100, years),
        expected: amount * Math.pow(1 + (profile.min + profile.max) / 200, years),
        optimistic: amount * Math.pow(1 + profile.max / 100, years)
    };

    // Monte Carlo simulation (simplified)
    let simResults = [];
    for (let i = 0; i < 1000; i++) {
        let simTotal = amount;
        for (let y = 0; y < years; y++) {
            const randomReturn = profile.min + Math.random() * (profile.max - profile.min);
            simTotal *= (1 + randomReturn / 100);
        }
        simResults.push(simTotal);
    }
    simResults.sort((a, b) => a - b);
    const median = simResults[500];
    const percentile5 = simResults[50];
    const percentile95 = simResults[950];

    const resultDiv = document.getElementById('investResult');
    resultDiv.classList.remove('hidden');
    resultDiv.innerHTML = `
        <h4>⚛️ Quantum Investment Analyse</h4>
        <div class="result-row">
            <span class="label">${profile.emoji} Profil:</span>
            <span class="value">${profile.name} (${profile.min}-${profile.max}%)</span>
        </div>
        <div class="result-row">
            <span class="label">📉 Pessimistisch:</span>
            <span class="value">${formatCurrency(scenarios.pessimistic)}</span>
        </div>
        <div class="result-row">
            <span class="label">📊 Erwartet:</span>
            <span class="value positive">${formatCurrency(scenarios.expected)}</span>
        </div>
        <div class="result-row">
            <span class="label">📈 Optimistisch:</span>
            <span class="value positive">${formatCurrency(scenarios.optimistic)}</span>
        </div>
        <hr style="border-color: rgba(0,240,255,0.1); margin: 1rem 0;">
        <div class="result-row">
            <span class="label">⚛️ Quantum Median:</span>
            <span class="value positive">${formatCurrency(median)}</span>
        </div>
        <div class="result-row">
            <span class="label">⚛️ 90% Konfidenz:</span>
            <span class="value">${formatCurrency(percentile5)} - ${formatCurrency(percentile95)}</span>
        </div>
        <div class="result-tip">
            💡 <strong>Quantum AI Tipp:</strong> ${getInvestTip(risk, years, scenarios.expected - amount)}
        </div>
    `;

    animateConfidence(88 + Math.random() * 10);
}

function getInvestTip(risk, years, expectedProfit) {
    if (risk === 'high' && years < 5) {
        return "⚠️ Aggressives Investieren braucht Zeit. Bei kurzen Zeiträumen ist das Risiko hoch. Erwäge mindestens 5+ Jahre.";
    }
    if (risk === 'low' && years > 10) {
        return "Bei so langer Laufzeit könntest du etwas mehr Risiko eingehen – die Zeit gleicht Schwankungen aus.";
    }
    return `Bei ${years} Jahren könntest du ca. ${formatCurrency(expectedProfit)} Gewinn erwarten. Diversifiziere über verschiedene Anlagen!`;
}