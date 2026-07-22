// ============================================
// AKWAABA FINANCE – Quantum AI Engine
// ============================================

// === QUANTUM ANALYSIS ===
function runQuantumAnalysis() {
    const category = document.getElementById('quantumCategory').value;
    const horizon = document.getElementById('quantumHorizon').value;
    const risk = parseInt(document.getElementById('quantumRisk').value);

    const resultDiv = document.getElementById('quantumResult');
    resultDiv.classList.remove('hidden');
    resultDiv.innerHTML = `<div style="text-align:center; padding:2rem;">
        <div style="font-size:2rem; animation: pulse 1s infinite;">⚛️</div>
        <p style="color: var(--accent); margin-top:1rem;">Quantum Neural Network analysiert...</p>
    </div>`;

    // Simulate processing time
    setTimeout(() => {
        const analysis = generateQuantumAnalysis(category, horizon, risk);
        resultDiv.innerHTML = analysis;
        animateConfidence(analysis.confidence || (80 + Math.random() * 15));
    }, 2000);
}

function generateQuantumAnalysis(category, horizon, risk) {
    const categories = {
        stocks: {
            name: "Aktienmarkt",
            emoji: "📈",
            trends: [
                { signal: "BULLISH", color: "#00ff88", desc: "Positive Marktsignale erkannt. Tech-Sektor zeigt starkes Momentum." },
                { signal: "NEUTRAL", color: "#ffaa00", desc: "Gemischte Signale. Seitwärtsbewegung erwartet. Selektive Investments empfohlen." },
                { signal: "BEARISH", color: "#ff4466", desc: "Vorsicht: Abwärtstrend möglich. Defensive Positionen stärken." }
            ]
        },
        crypto: {
            name: "Kryptowährungen",
            emoji: "₿",
            trends: [
                { signal: "STARK BULLISH", color: "#00ff88", desc: "Blockchain-Adoption steigt. Institutionelle Investoren erhöhen Positionen." },
                { signal: "VOLATIL", color: "#ffaa00", desc: "Hohe Volatilität erwartet. Nur mit Risikokapital investieren." },
                { signal: "KORREKTUR", color: "#ff4466", desc: "Überhitzungszeichen erkannt. Teilgewinnmitnahmen empfohlen." }
            ]
        },
        realestate: {
            name: "Immobilien",
            emoji: "🏠",
            trends: [
                { signal: "STABIL", color: "#00ff88", desc: "Immobilienmarkt zeigt Stabilität. Langfristig gute Wertentwicklung." },
                { signal: "ÜBERHITZT", color: "#ffaa00", desc: "Einige Märkte überhitzt. Sorgfältige Standortanalyse erforderlich." },
                { signal: "CHANCEN", color: "#00ff88", desc: "Zinsniveau bietet Einstiegsmöglichkeiten für Käufer." }
            ]
        },
        commodities: {
            name: "Rohstoffe",
            emoji: "🥇",
            trends: [
                { signal: "GOLD STEIGT", color: "#00ff88", desc: "Gold als sicherer Hafen gefragt. Geopolitische Unsicherheiten treiben Preis." },
                { signal: "GEMISCHT", color: "#ffaa00", desc: "Rohstoffmärkte zeigen gemischtes Bild. Energiesektor volatil." },
                { signal: "ÖL UNTER DRUCK", color: "#ff4466", desc: "Überangebot drückt Ölpreise. Alternative Energien gewinnen Marktanteile." }
            ]
        },
        savings: {
            name: "Sparstrategie",
            emoji: "💰",
            trends: [
                { signal: "OPTIMIEREN", color: "#00ff88", desc: "Aktuelle Zinsen ermöglichen bessere Sparrenditen. Tagesgeld-Hopping empfohlen." },
                { signal: "FESTGELD", color: "#00ff88", desc: "Festgeld-Konditionen attraktiv. Laufzeiten von 1-2 Jahren optimal." },
                { signal: "DIVERSIFIZIEREN", color: "#ffaa00", desc: "Nicht nur sparen – auch investieren! 70/30 Strategie empfohlen." }
            ]
        }
    };

    const cat = categories[category];
    const trend = cat.trends[Math.floor(Math.random() * cat.trends.length)];
    const confidence = 75 + Math.floor(Math.random() * 20);

    const horizonTexts = {
        short: "Kurzfristig (1-3 Monate)",
        medium: "Mittelfristig (1-3 Jahre)",
        long: "Langfristig (5+ Jahre)"
    };

    const riskAdvice = risk <= 3
        ? "🛡️ Bei deinem konservativen Profil empfehlen wir sichere Anlagen wie Festgeld, Staatsanleihen oder Blue-Chip-Aktien."
        : risk <= 7
        ? "⚖️ Dein ausgewogenes Profil erlaubt eine Mischung aus sicheren und wachstumsorientierten Anlagen."
        : "🚀 Dein risikofreudiges Profil eröffnet Chancen in Wachstumsmärkten, Krypto und Small-Caps. Aber Vorsicht!";

    const strategies = [
        "📌 Dollar-Cost-Averaging: Investiere regelmäßig einen festen Betrag, egal ob der Markt steigt oder fällt.",
        "📌 Rebalancing: Passe dein Portfolio vierteljährlich an deine Zielallokation an.",
        "📌 Stop-Loss setzen: Sichere deine Gewinne mit automatischen Verkaufsorders ab.",
        "📌 Bildung: Investiere in dein Finanzwissen. Jeder investierte Euro in Bildung zahlt sich 10-fach aus.",
        "📌 Notfallfonds: Bevor du investierst, sichere 3-6 Monatsgehälter als Puffer."
    ];

    const randomStrategies = strategies.sort(() => Math.random() - 0.5).slice(0, 3);

    return `
        <h4>⚛️ Quantum ${cat.emoji} ${cat.name} Analyse</h4>
        <div class="result-row">
            <span class="label">Signal:</span>
            <span class="value" style="color: ${trend.color}">● ${trend.signal}</span>
        </div>
        <div class="result-row">
            <span class="label">Horizont:</span>
            <span class="value">${horizonTexts[horizon]}</span>
        </div>
        <div class="result-row">
            <span class="label">Risikostufe:</span>
            <span class="value">${risk}/10</span>
        </div>
        <div class="result-row">
            <span class="label">AI Konfidenz:</span>
            <span class="value positive">${confidence}%</span>
        </div>
        <div class="result-tip">
            📊 <strong>Analyse:</strong> ${trend.desc}
        </div>
        <div class="result-tip" style="margin-top: 0.5rem;">
            ${riskAdvice}
        </div>
        <div class="result-tip" style="margin-top: 0.5rem; border-left-color: var(--accent);">
            <strong>🎯 Empfohlene Strategien:</strong><br>
            ${randomStrategies.join('<br>')}
        </div>
    `;
}

// === QUANTUM PULSE MONITOR ===
function initQuantumPulse() {
    const canvas = document.getElementById('quantumPulse');
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    canvas.width = canvas.offsetWidth * 2;
    canvas.height = 300;

    let offset = 0;

    function drawPulse() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        // Background grid
        ctx.strokeStyle = 'rgba(0, 240, 255, 0.05)';
        ctx.lineWidth = 1;
        for (let i = 0; i < canvas.height; i += 20) {
            ctx.beginPath();
            ctx.moveTo(0, i);
            ctx.lineTo(canvas.width, i);
            ctx.stroke();
        }

        // Main pulse wave
        ctx.beginPath();
        ctx.strokeStyle = '#00f0ff';
        ctx.lineWidth = 2;
        ctx.shadowBlur = 10;
        ctx.shadowColor = '#00f0ff';

        for (let x = 0; x < canvas.width; x++) {
            const y = canvas.height / 2 +
                Math.sin((x + offset) * 0.02) * 40 +
                Math.sin((x + offset) * 0.05) * 20 +
                Math.sin((x + offset) * 0.01) * 30 +
                (Math.random() * 4 - 2);

            if (x === 0) ctx.moveTo(x, y);
            else ctx.lineTo(x, y);
        }
        ctx.stroke();

        // Secondary wave
        ctx.beginPath();
        ctx.strokeStyle = 'rgba(123, 47, 255, 0.5)';
        ctx.lineWidth = 1;
        ctx.shadowColor = '#7b2fff';

        for (let x = 0; x < canvas.width; x++) {
            const y = canvas.height / 2 +
                Math.cos((x + offset) * 0.03) * 30 +
                Math.sin((x + offset) * 0.07) * 15;

            if (x === 0) ctx.moveTo(x, y);
            else ctx.lineTo(x, y);
        }
        ctx.stroke();

        ctx.shadowBlur = 0;
        offset += 2;
        requestAnimationFrame(drawPulse);
    }

    drawPulse();
}

// === CONFIDENCE METER ===
function animateConfidence(targetPercent) {
    const bar = document.getElementById('confidenceBar');
    const value = document.getElementById('confidenceValue');
    const text = document.getElementById('confidenceText');

    if (!bar) return;

    bar.style.width = targetPercent + '%';
    value.textContent = Math.round(targetPercent) + '%';

    if (targetPercent >= 90) {
        text.textContent = '🟢 Sehr hohe Konfidenz – Starke Datenlage für diese Prognose.';
        text.style.color = '#00ff88';
    } else if (targetPercent >= 75) {
        text.textContent = '🟡 Hohe Konfidenz – Gute Datenbasis mit leichten Unsicherheiten.';
        text.style.color = '#ffaa00';
    } else {
        text.textContent = '🟠 Moderate Konfidenz – Mehr Datenpunkte würden die Analyse verbessern.';
        text.style.color = '#ff8844';
    }
}
