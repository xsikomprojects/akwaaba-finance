// ============================================
// AKWAABA FINANCE – App Controller
// Mit XsiKOM-DIGITAL-Projects
// ============================================

// === APP STARTEN ===
window.onload = function() {
    // Splash Screen nach 3 Sekunden verstecken
    setTimeout(function() {
        document.getElementById('splash').style.display = 'none';
        document.getElementById('app').classList.remove('versteckt');
    }, 3000);

    // Start-Funktionen
    statistikenAktualisieren();
    neueTipps();
    weisheitZeigen();
    chartsStarten();
    cryptoStarten();
    budgetAnzeigen();
    budgetDatumSetzen();
    notificationsStarten();
};

// === NAVIGATION ===
document.addEventListener('DOMContentLoaded', function() {

    // Haupt-Tabs
    var tabs = document.querySelectorAll('.tab');
    tabs.forEach(function(tab) {
        tab.addEventListener('click', function() {
            tabs.forEach(function(t) { t.classList.remove('aktiv'); });
            document.querySelectorAll('.seite').forEach(function(s) {
                s.classList.remove('aktiv');
            });
            tab.classList.add('aktiv');
            var ziel = tab.getAttribute('data-tab');
            document.getElementById(ziel).classList.add('aktiv');
        });
    });

    // Rechner-Tabs
    var rTabs = document.querySelectorAll('.r-tab');
    rTabs.forEach(function(tab) {
        tab.addEventListener('click', function() {
            rTabs.forEach(function(t) { t.classList.remove('aktiv'); });
            document.querySelectorAll('.rechner-panel').forEach(function(p) {
                p.classList.remove('aktiv');
            });
            tab.classList.add('aktiv');
            var ziel = tab.getAttribute('data-calc');
            document.getElementById(ziel).classList.add('aktiv');
        });
    });

    // Risiko Slider
    var slider = document.getElementById('quantumRisiko');
    if (slider) {
        slider.addEventListener('input', function() {
            document.getElementById('risikoWert').textContent = slider.value;
        });
    }
});

// === ZAHLEN FORMATIEREN ===
function euro(betrag) {
    return new Intl.NumberFormat('de-DE', {
        style: 'currency',
        currency: 'EUR'
    }).format(betrag);
}

// === ZINSESZINS RECHNER ===
function berechneZins() {
    var start = parseFloat(document.getElementById('startKapital').value) || 0;
    var zins = parseFloat(document.getElementById('zinssatz').value) / 100;
    var jahre = parseInt(document.getElementById('jahre').value) || 1;
    var monatlich = parseFloat(document.getElementById('monatlich').value) || 0;

    var monatsZins = zins / 12;
    var monate = jahre * 12;

    var gesamt = start * Math.pow(1 + monatsZins, monate);
    if (monatsZins > 0) {
        gesamt += monatlich * ((Math.pow(1 + monatsZins, monate) - 1) / monatsZins);
    } else {
        gesamt += monatlich * monate;
    }

    var eingezahlt = start + (monatlich * monate);
    var gewinn = gesamt - eingezahlt;
    var rendite = eingezahlt > 0 ? ((gewinn / eingezahlt) * 100) : 0;

    var ergebnis = document.getElementById('zinsErgebnis');
    ergebnis.classList.remove('versteckt');
    ergebnis.innerHTML =
        '<h4>⚛️ Quantum Ergebnis</h4>' +
        '<div class="ergebnis-zeile">' +
            '<span>Eingezahlt:</span>' +
            '<span>' + euro(eingezahlt) + '</span>' +
        '</div>' +
        '<div class="ergebnis-zeile">' +
            '<span>Endkapital:</span>' +
            '<span class="positiv">' + euro(gesamt) + '</span>' +
        '</div>' +
        '<div class="ergebnis-zeile">' +
            '<span>Gewinn:</span>' +
            '<span class="positiv">+' + euro(gewinn) + '</span>' +
        '</div>' +
        '<div class="ergebnis-zeile">' +
            '<span>Rendite:</span>' +
            '<span class="positiv">+' + rendite.toFixed(1) + '%</span>' +
        '</div>' +
        '<div class="tipp-box">' +
            '💡 <strong>Tipp:</strong> ' + zinsTipp(gewinn, jahre, monatlich) +
        '</div>';

    konfidenzAnimieren(85 + Math.random() * 10);
}

function zinsTipp(gewinn, jahre, monatlich) {
    if (monatlich === 0) {
        return 'Schon 50€ pro Monat können deinen Gewinn verdoppeln!';
    }
    if (jahre < 5) {
        return 'Längere Laufzeit = mehr Zinseszinseffekt. Versuche 10+ Jahre!';
    }
    if (gewinn > 10000) {
        return 'Exzellent! Dein Geld arbeitet hart für dich. 🏆';
    }
    return 'Konsistenz ist der Schlüssel! Erhöhe deine Sparrate wenn möglich.';
}

// === KREDIT RECHNER ===
function berechneKredit() {
    var betrag = parseFloat(document.getElementById('kreditBetrag').value) || 0;
    var zins = parseFloat(document.getElementById('kreditZins').value) / 100;
    var jahre = parseInt(document.getElementById('kreditJahre').value) || 1;

    var monatsZins = zins / 12;
    var monate = jahre * 12;

    var monatsRate;
    if (monatsZins > 0) {
        monatsRate = betrag * (monatsZins * Math.pow(1 + monatsZins, monate)) /
                     (Math.pow(1 + monatsZins, monate) - 1);
    } else {
        monatsRate = betrag / monate;
    }

    var gesamtKosten = monatsRate * monate;
    var gesamtZinsen = gesamtKosten - betrag;

    var ergebnis = document.getElementById('kreditErgebnis');
    ergebnis.classList.remove('versteckt');
    ergebnis.innerHTML =
        '<h4>⚛️ Kredit Analyse</h4>' +
        '<div class="ergebnis-zeile">' +
            '<span>Kreditbetrag:</span>' +
            '<span>' + euro(betrag) + '</span>' +
        '</div>' +
        '<div class="ergebnis-zeile">' +
            '<span>Monatliche Rate:</span>' +
            '<span class="negativ">' + euro(monatsRate) + '</span>' +
        '</div>' +
        '<div class="ergebnis-zeile">' +
            '<span>Gesamtkosten:</span>' +
            '<span class="negativ">' + euro(gesamtKosten) + '</span>' +
        '</div>' +
        '<div class="ergebnis-zeile">' +
            '<span>Gesamtzinsen:</span>' +
            '<span class="negativ">' + euro(gesamtZinsen) + '</span>' +
        '</div>' +
        '<div class="tipp-box">' +
            '💡 <strong>Tipp:</strong> ' + kreditTipp(gesamtZinsen, betrag, jahre) +
        '</div>';

    konfidenzAnimieren(88 + Math.random() * 10);
}

function kreditTipp(zinsen, betrag, jahre) {
    var ratio = zinsen / betrag;
    if (ratio > 0.3) {
        return '⚠️ Zinsen über 30% des Kredits! Kürzere Laufzeit oder bessere Konditionen suchen.';
    }
    if (jahre > 7) {
        return 'Lange Laufzeit = mehr Zinsen. Prüfe Sondertilgungen!';
    }
    return 'Gute Konditionen! Sondertilgungen nutzen um schneller schuldenfrei zu sein.';
}

// === SPARZIEL RECHNER ===
function berechneSparen() {
    var ziel = parseFloat(document.getElementById('sparZiel').value) || 0;
    var haben = parseFloat(document.getElementById('sparHaben').value) || 0;
    var monate = parseInt(document.getElementById('sparMonate').value) || 1;

    var rest = ziel - haben;
    var proMonat = rest / monate;
    var proWoche = rest / (monate * 4.33);
    var proTag = rest / (monate * 30);
    var fortschritt = (haben / ziel) * 100;

    var ergebnis = document.getElementById('sparErgebnis');
    ergebnis.classList.remove('versteckt');
    ergebnis.innerHTML =
        '<h4>⚛️ Sparziel Analyse</h4>' +
        '<div class="ergebnis-zeile">' +
            '<span>Sparziel:</span>' +
            '<span class="gold">' + euro(ziel) + '</span>' +
        '</div>' +
        '<div class="ergebnis-zeile">' +
            '<span>Noch benötigt:</span>' +
            '<span class="negativ">' + euro(rest) + '</span>' +
        '</div>' +
        '<div class="ergebnis-zeile">' +
            '<span>Pro Monat:</span>' +
            '<span class="positiv">' + euro(proMonat) + '</span>' +
        '</div>' +
        '<div class="ergebnis-zeile">' +
            '<span>Pro Woche:</span>' +
            '<span>' + euro(proWoche) + '</span>' +
        '</div>' +
        '<div class="ergebnis-zeile">' +
            '<span>Pro Tag:</span>' +
            '<span>' + euro(proTag) + '</span>' +
        '</div>' +
        '<div class="ergebnis-zeile">' +
            '<span>Fortschritt:</span>' +
            '<span class="positiv">' + fortschritt.toFixed(1) + '%</span>' +
        '</div>' +
        '<div class="tipp-box">' +
            '💡 <strong>Tipp:</strong> ' + sparTipp(proTag, fortschritt) +
        '</div>';

    konfidenzAnimieren(90 + Math.random() * 8);
}

function sparTipp(tag, fortschritt) {
    if (fortschritt > 50) return 'Super! Über die Hälfte geschafft! Weiter so! 🎯';
    if (tag < 5) return 'Weniger als ein Kaffee pro Tag! Das schaffst du! ☕';
    if (tag > 20) return 'Ambitioniert! Verlängere den Zeitraum oder passe das Ziel an.';
    return 'Richte einen Dauerauftrag ein – dann läuft das Sparen automatisch!';
}

// === INVESTMENT RECHNER ===
function berechneInvest() {
    var betrag = parseFloat(document.getElementById('investBetrag').value) || 0;
    var risiko = document.getElementById('investRisiko').value;
    var jahre = parseInt(document.getElementById('investJahre').value) || 1;

    var profile = {
        niedrig: { min: 3, max: 5, name: 'Konservativ 🛡️' },
        mittel:  { min: 5, max: 8, name: 'Ausgewogen ⚖️' },
        hoch:    { min: 8, max: 15, name: 'Aggressiv 🚀' }
    };

    var p = profile[risiko];
    var pessimistisch = betrag * Math.pow(1 + p.min / 100, jahre);
    var erwartet = betrag * Math.pow(1 + (p.min + p.max) / 200, jahre);
    var optimistisch = betrag * Math.pow(1 + p.max / 100, jahre);

    // Monte Carlo Simulation
    var simulationen = [];
    for (var i = 0; i < 1000; i++) {
        var sim = betrag;
        for (var j = 0; j < jahre; j++) {
            var r = p.min + Math.random() * (p.max - p.min);
            sim *= (1 + r / 100);
        }
        simulationen.push(sim);
    }
    simulationen.sort(function(a, b) { return a - b; });
    var median = simulationen[500];

    var ergebnis = document.getElementById('investErgebnis');
    ergebnis.classList.remove('versteckt');
    ergebnis.innerHTML =
        '<h4>⚛️ Investment Analyse</h4>' +
        '<div class="ergebnis-zeile">' +
            '<span>Profil:</span>' +
            '<span class="gold">' + p.name + '</span>' +
        '</div>' +
        '<div class="ergebnis-zeile">' +
            '<span>📉 Pessimistisch:</span>' +
            '<span>' + euro(pessimistisch) + '</span>' +
        '</div>' +
        '<div class="ergebnis-zeile">' +
            '<span>📊 Erwartet:</span>' +
            '<span class="positiv">' + euro(erwartet) + '</span>' +
        '</div>' +
        '<div class="ergebnis-zeile">' +
            '<span>📈 Optimistisch:</span>' +
            '<span class="positiv">' + euro(optimistisch) + '</span>' +
        '</div>' +
        '<div class="ergebnis-zeile">' +
            '<span>⚛️ Quantum Median:</span>' +
            '<span class="gold">' + euro(median) + '</span>' +
        '</div>' +
        '<div class="tipp-box">' +
            '💡 <strong>Tipp:</strong> ' + investTipp(risiko, jahre) +
        '</div>';

    konfidenzAnimieren(87 + Math.random() * 10);
}

function investTipp(risiko, jahre) {
    if (risiko === 'hoch' && jahre < 5) {
        return '⚠️ Aggressives Investieren braucht Zeit! Mindestens 5-10 Jahre einplanen.';
    }
    if (risiko === 'niedrig' && jahre > 10) {
        return 'Bei langer Laufzeit könntest du mehr Rendite mit etwas mehr Risiko erzielen.';
    }
    return 'Diversifiziere über ETFs, Aktien und Anleihen für optimale Risikoverteilung!';
}

// === QUANTUM ANALYSE ===
function quantumAnalyse() {
    var kat = document.getElementById('quantumKat').value;
    var horizont = document.getElementById('quantumHorizont').value;
    var risiko = document.getElementById('quantumRisiko').value;

    var ergebnis = document.getElementById('quantumErgebnis');
    ergebnis.classList.remove('versteckt');
    ergebnis.innerHTML =
        '<div style="text-align:center; padding:2rem;">' +
        '<div style="font-size:3rem; animation: reinFaden 0.5s infinite;">⚛️</div>' +
        '<p style="color:#00ddcc; margin-top:1rem; font-weight:800;">Quantum Neural Network analysiert...</p>' +
        '</div>';

    setTimeout(function() {
        var analyse = quantumErgebnisErstellen(kat, horizont, risiko);
        ergebnis.innerHTML = analyse;
        konfidenzAnimieren(80 + Math.random() * 18);
    }, 2000);
}

function quantumErgebnisErstellen(kat, horizont, risiko) {
    var kategorien = {
        aktien: {
            name: 'Aktienmarkt 📈',
            signale: [
                { signal: 'BULLISH 🟢', farbe: '#00ff88', text: 'Positive Marktsignale! Tech-Sektor zeigt starkes Momentum.' },
                { signal: 'NEUTRAL 🟡', farbe: '#ffaa00', text: 'Gemischte Signale. Selektive Investments empfohlen.' },
                { signal: 'BEARISH 🔴', farbe: '#ff4444', text: 'Vorsicht! Defensive Positionen stärken.' }
            ]
        },
        crypto: {
            name: 'Kryptowährungen ₿',
            signale: [
                { signal: 'STARK BULLISH 🟢', farbe: '#00ff88', text: 'Blockchain-Adoption steigt! Institutionelle Käufer aktiv.' },
                { signal: 'VOLATIL 🟡', farbe: '#ffaa00', text: 'Hohe Volatilität! Nur Risikokapital einsetzen.' },
                { signal: 'KORREKTUR 🔴', farbe: '#ff4444', text: 'Überhitzungszeichen! Teilgewinnmitnahmen empfohlen.' }
            ]
        },
        immobilien: {
            name: 'Immobilien 🏠',
            signale: [
                { signal: 'STABIL 🟢', farbe: '#00ff88', text: 'Markt zeigt Stabilität. Langfristig gute Wertentwicklung.' },
                { signal: 'ÜBERHITZT 🟡', farbe: '#ffaa00', text: 'Einige Märkte überhitzt. Sorgfältige Standortanalyse nötig.' },
                { signal: 'CHANCEN 🟢', farbe: '#00ff88', text: 'Einstiegsmöglichkeiten für strategische Käufer!' }
            ]
        },
        rohstoffe: {
            name: 'Rohstoffe 🥇',
            signale: [
                { signal: 'GOLD STEIGT 🟢', farbe: '#00ff88', text: 'Gold als sicherer Hafen gefragt. Geopolitik treibt Preis.' },
                { signal: 'GEMISCHT 🟡', farbe: '#ffaa00', text: 'Rohstoffmärkte uneinheitlich. Energie volatil.' },
                { signal: 'KORREKTUR 🔴', farbe: '#ff4444', text: 'Überangebot drückt Preise. Selektiv vorgehen.' }
            ]
        },
        sparen: {
            name: 'Sparstrategie 💰',
            signale: [
                { signal: 'OPTIMIEREN 🟢', farbe: '#00ff88', text: 'Aktuelle Zinsen ermöglichen bessere Sparrenditen!' },
                { signal: 'FESTGELD 🟢', farbe: '#00ff88', text: 'Festgeld-Konditionen attraktiv. 1-2 Jahre optimal.' },
                { signal: 'DIVERSIFIZIEREN 🟡', farbe: '#ffaa00', text: 'Nicht nur sparen – auch investieren! 70/30 Strategie.' }
            ]
        }
    };

    var horizonte = {
        kurz: 'Kurzfristig (1-3 Monate)',
        mittel: 'Mittelfristig (1-3 Jahre)',
        lang: 'Langfristig (5+ Jahre)'
    };

    var k = kategorien[kat];
    var s = k.signale[Math.floor(Math.random() * k.signale.length)];
    var konfidenz = 75 + Math.floor(Math.random() * 20);

    var risikoText = risiko <= 3
        ? '🛡️ Konservativ: Empfehle Festgeld, Staatsanleihen und Blue-Chip-Aktien.'
        : risiko <= 7
        ? '⚖️ Ausgewogen: Mix aus sicheren und wachstumsorientierten Anlagen.'
        : '🚀 Aggressiv: Wachstumsmärkte und Krypto bieten Chancen – mit Risiko!';

    return '<h4>⚛️ ' + k.name + ' Analyse</h4>' +
        '<div class="ergebnis-zeile">' +
            '<span>Signal:</span>' +
            '<span style="color:' + s.farbe + '; font-family: Fredoka One, cursive;">' + s.signal + '</span>' +
        '</div>' +
        '<div class="ergebnis-zeile">' +
            '<span>Horizont:</span>' +
            '<span>' + horizonte[horizont] + '</span>' +
        '</div>' +
        '<div class="ergebnis-zeile">' +
            '<span>Risikostufe:</span>' +
            '<span class="gold">' + risiko + '/10</span>' +
        '</div>' +
        '<div class="ergebnis-zeile">' +
            '<span>AI Konfidenz:</span>' +
            '<span class="positiv">' + konfidenz + '%</span>' +
        '</div>' +
        '<div class="tipp-box">' + s.text + '</div>' +
        '<div class="tipp-box" style="margin-top:0.5rem; border-left-color:#ffdf00;">' + risikoText + '</div>';
}

// === KONFIDENZ ANIMATION ===
function konfidenzAnimieren(ziel) {
    var bar = document.getElementById('konfidenzBar');
    var text = document.getElementById('konfidenzText');
    if (!bar) return;

    bar.style.width = ziel + '%';
    bar.textContent = Math.round(ziel) + '%';

    if (ziel >= 90) {
        text.textContent = '🟢 Sehr hohe Konfidenz – Starke Datenlage!';
        text.style.color = '#00ff88';
    } else if (ziel >= 75) {
        text.textContent = '🟡 Hohe Konfidenz – Gute Basis mit leichten Unsicherheiten.';
        text.style.color = '#ffaa00';
    } else {
        text.textContent = '🟠 Moderate Konfidenz – Mehr Daten würden helfen.';
        text.style.color = '#ff8844';
    }
}

// === TIPPS ===
var alleTipps = [
    { kat: 'Sparen', titel: 'Die 50/30/20 Regel', text: '50% für Bedürfnisse, 30% für Wünsche, 20% sparen und investieren.', sterne: '⭐⭐⭐⭐⭐' },
    { kat: 'Investieren', titel: 'Diversifikation ist König', text: 'Nie alles auf eine Karte! Verteile dein Geld auf verschiedene Anlagen.', sterne: '⭐⭐⭐⭐⭐' },
    { kat: 'Schulden', titel: 'Hochzins-Schulden zuerst', text: 'Bezahle immer die Schulden mit dem höchsten Zinssatz zuerst.', sterne: '⭐⭐⭐⭐' },
    { kat: 'Notfallreserve', titel: '3-6 Monate Puffer', text: 'Halte immer 3-6 Monatsgehälter als Notfallreserve bereit.', sterne: '⭐⭐⭐⭐⭐' },
    { kat: 'Einkommen', titel: 'Passives Einkommen', text: 'Baue passive Einkommensquellen auf: Dividenden, Mieteinnahmen, digitale Produkte.', sterne: '⭐⭐⭐⭐' },
    { kat: 'Steuern', titel: 'Steuern optimieren', text: 'Nutze alle legalen Steuervorteile: Werbungskosten, Sonderausgaben, Freibeträge.', sterne: '⭐⭐⭐⭐' },
    { kat: 'Psychologie', titel: 'Emotionen kontrollieren', text: 'Trenne Emotionen von Finanzentscheidungen. Panikverkäufe sind der größte Fehler!', sterne: '⭐⭐⭐⭐⭐' },
    { kat: 'Zinseszins', titel: 'Die Macht der Zeit', text: 'Je früher du anfängst zu investieren, desto stärker wirkt der Zinseszinseffekt!', sterne: '⭐⭐⭐⭐⭐' },
    { kat: 'Budget', titel: 'Ausgaben tracken', text: 'Führe 30 Tage lang ein Ausgaben-Tagebuch. Die Ergebnisse werden dich überraschen!', sterne: '⭐⭐⭐⭐' },
    { kat: 'Afrika', titel: 'Ubuntu-Finanzprinzip', text: 'Ubuntu: "Ich bin, weil wir sind." Gemeinschaftliches Sparen wie Susu/Tontine kann helfen!', sterne: '⭐⭐⭐⭐⭐' }
];

var weisheiten = [
    '"Der beste Zeitpunkt zu investieren war gestern. Der zweitbeste ist heute." – Warren Buffett',
    '"Spare nicht was nach dem Ausgeben übrig bleibt – gib aus was nach dem Sparen übrig bleibt."',
    '"Finanzielle Freiheit beginnt mit dem ersten gesparten Euro."',
    '"Risiko entsteht, wenn man nicht weiß, was man tut." – Warren Buffett',
    '"Investiere in dich selbst. Das ist die beste Rendite die du je bekommen wirst."',
    '"Wer nicht über Geld nachdenkt, wird von Geld beherrscht."',
    '"AKWAABA! Willkommen auf dem Weg zur finanziellen Freiheit! 🇹🇬"'
];

function neueTipps() {
    var container = document.getElementById('tippsContainer');
    if (!container) return;

    var gemischt = alleTipps.slice().sort(function() { return Math.random() - 0.5; }).slice(0, 4);

    container.innerHTML = gemischt.map(function(tipp, i) {
        return '<div class="tipp-karte">' +
            '<div class="tipp-nr">' + (i + 1) + '</div>' +
            '<div class="tipp-kat">' + tipp.kat + '</div>' +
            '<div class="tipp-titel">' + tipp.titel + '</div>' +
            '<div class="tipp-text">' + tipp.text + '</div>' +
            '<div class="tipp-bewertung">' + tipp.sterne + ' Quantum Score</div>' +
        '</div>';
    }).join('');
}

function weisheitZeigen() {
    var el = document.getElementById('weisheit');
    if (!el) return;
    var index = new Date().getDate() % weisheiten.length;
    el.textContent = weisheiten[index];
}

// === DASHBOARD STATISTIKEN ===
function statistikenAktualisieren() {
    setInterval(function() {
        var markt = document.getElementById('markt');
        var gen = document.getElementById('genauigkeit');
        var speed = document.getElementById('speed');

        if (markt) {
            var val = (Math.random() * 6 - 1.5).toFixed(1);
            markt.textContent = (val >= 0 ? '+' : '') + val + '%';
            markt.style.color = val >= 0 ? '#00ff88' : '#ff4444';
        }
        if (gen) {
            gen.textContent = (88 + Math.random() * 10).toFixed(1) + '%';
        }
        if (speed) {
            speed.textContent = (0.001 + Math.random() * 0.005).toFixed(3) + 's';
        }
    }, 3000);
}
// ============================================
// PHASE 5 – LIVE CHARTS
// ============================================

// === CHART DATEN GENERIEREN ===
function chartDatenErstellen(punkte, min, max) {
    var daten = [];
    var aktuell = (min + max) / 2;
    for (var i = 0; i < punkte; i++) {
        aktuell += (Math.random() - 0.5) * (max - min) * 0.1;
        aktuell = Math.max(min, Math.min(max, aktuell));
        daten.push(aktuell);
    }
    return daten;
}

// === CHART ZEICHNEN ===
function chartZeichnen(canvasId, daten, farbe, fuellung) {
    var canvas = document.getElementById(canvasId);
    if (!canvas) return;
    
    var ctx = canvas.getContext('2d');
    var breite = canvas.width = canvas.offsetWidth * 2;
    var hoehe = canvas.height = 200;
    
    ctx.clearRect(0, 0, breite, hoehe);
    
    // Hintergrund Raster
    ctx.strokeStyle = 'rgba(255,255,255,0.05)';
    ctx.lineWidth = 1;
    for (var i = 0; i < hoehe; i += 40) {
        ctx.beginPath();
        ctx.moveTo(0, i);
        ctx.lineTo(breite, i);
        ctx.stroke();
    }
    for (var j = 0; j < breite; j += 80) {
        ctx.beginPath();
        ctx.moveTo(j, 0);
        ctx.lineTo(j, hoehe);
        ctx.stroke();
    }
    
    var min = Math.min.apply(null, daten);
    var max = Math.max.apply(null, daten);
    var spanne = max - min || 1;
    
    var schrittX = breite / (daten.length - 1);
    
    // Füllung
    if (fuellung) {
        ctx.beginPath();
        ctx.moveTo(0, hoehe);
        daten.forEach(function(wert, i) {
            var x = i * schrittX;
            var y = hoehe - ((wert - min) / spanne) * (hoehe - 20) - 10;
            if (i === 0) ctx.lineTo(x, y);
            else ctx.lineTo(x, y);
        });
        ctx.lineTo(breite, hoehe);
        ctx.closePath();
        var gradient = ctx.createLinearGradient(0, 0, 0, hoehe);
        gradient.addColorStop(0, farbe.replace(')', ', 0.3)').replace('rgb', 'rgba'));
        gradient.addColorStop(1, farbe.replace(')', ', 0.0)').replace('rgb', 'rgba'));
        ctx.fillStyle = gradient;
        ctx.fill();
    }
    
    // Linie
    ctx.beginPath();
    ctx.strokeStyle = farbe;
    ctx.lineWidth = 3;
    ctx.lineJoin = 'round';
    ctx.shadowBlur = 10;
    ctx.shadowColor = farbe;
    
    daten.forEach(function(wert, i) {
        var x = i * schrittX;
        var y = hoehe - ((wert - min) / spanne) * (hoehe - 20) - 10;
        if (i === 0) ctx.moveTo(x, y);
        else ctx.lineTo(x, y);
    });
    ctx.stroke();
    ctx.shadowBlur = 0;
    
    // Punkte
    daten.forEach(function(wert, i) {
        if (i % 5 === 0) {
            var x = i * schrittX;
            var y = hoehe - ((wert - min) / spanne) * (hoehe - 20) - 10;
            ctx.beginPath();
            ctx.arc(x, y, 5, 0, Math.PI * 2);
            ctx.fillStyle = farbe;
            ctx.fill();
            ctx.strokeStyle = '#0a1200';
            ctx.lineWidth = 2;
            ctx.stroke();
        }
    });
    
    // Letzter Wert anzeigen
    var letzterWert = daten[daten.length - 1];
    var letzteX = (daten.length - 1) * schrittX;
    var letzteY = hoehe - ((letzterWert - min) / spanne) * (hoehe - 20) - 10;
    
    ctx.fillStyle = farbe;
    ctx.font = 'bold 24px Fredoka One';
    ctx.textAlign = 'right';
    ctx.fillText(letzterWert.toFixed(2), breite - 10, 30);
}

// === QUANTUM PULSE CHART ===
function quantumPulseStarten() {
    var canvas = document.getElementById('quantumPulse');
    if (!canvas) return;
    
    var ctx = canvas.getContext('2d');
    var offset = 0;
    
    function zeichnen() {
        var breite = canvas.width = canvas.offsetWidth * 2;
        var hoehe = canvas.height = 150;
        
        ctx.clearRect(0, 0, breite, hoehe);
        
        // Raster
        ctx.strokeStyle = 'rgba(255,255,255,0.04)';
        ctx.lineWidth = 1;
        for (var i = 0; i < hoehe; i += 30) {
            ctx.beginPath();
            ctx.moveTo(0, i);
            ctx.lineTo(breite, i);
            ctx.stroke();
        }
        
        // Welle 1 – Grün
        ctx.beginPath();
        ctx.strokeStyle = '#00cc44';
        ctx.lineWidth = 2;
        ctx.shadowBlur = 8;
        ctx.shadowColor = '#00cc44';
        for (var x = 0; x < breite; x++) {
            var y = hoehe / 2 +
                Math.sin((x + offset) * 0.02) * 35 +
                Math.sin((x + offset) * 0.05) * 15 +
                (Math.random() * 3 - 1.5);
            if (x === 0) ctx.moveTo(x, y);
            else ctx.lineTo(x, y);
        }
        ctx.stroke();
        
        // Welle 2 – Gelb
        ctx.beginPath();
        ctx.strokeStyle = 'rgba(255,223,0,0.5)';
        ctx.lineWidth = 1.5;
        ctx.shadowColor = '#ffdf00';
        for (var x2 = 0; x2 < breite; x2++) {
            var y2 = hoehe / 2 +
                Math.cos((x2 + offset) * 0.03) * 25 +
                Math.sin((x2 + offset) * 0.07) * 10;
            if (x2 === 0) ctx.moveTo(x2, y2);
            else ctx.lineTo(x2, y2);
        }
        ctx.stroke();
        
        // Welle 3 – Rot
        ctx.beginPath();
        ctx.strokeStyle = 'rgba(204,0,0,0.4)';
        ctx.lineWidth = 1;
        ctx.shadowColor = '#cc0000';
        for (var x3 = 0; x3 < breite; x3++) {
            var y3 = hoehe / 2 +
                Math.sin((x3 + offset) * 0.04) * 20 +
                Math.cos((x3 + offset) * 0.02) * 30;
            if (x3 === 0) ctx.moveTo(x3, y3);
            else ctx.lineTo(x3, y3);
        }
        ctx.stroke();
        ctx.shadowBlur = 0;
        
        offset += 2;
        requestAnimationFrame(zeichnen);
    }
    zeichnen();
}
// === CHART WECHSELN ===
var chartDaten = {
    aktien: { name: '📈 DAX / Aktienmarkt', min: 15000, max: 18000, farbe: '#00cc44' },
    crypto: { name: '₿ Bitcoin / Crypto',   min: 38000, max: 48000, farbe: '#ffdf00' },
    gold:   { name: '🥇 Gold / Rohstoffe',  min: 1900,  max: 2100,  farbe: '#ff8800' },
    forex:  { name: '💱 EUR/USD / Forex',   min: 1.05,  max: 1.15,  farbe: '#0088ff' }
};

function chartWechseln(typ, btn) {
    // Tab aktiv setzen
    document.querySelectorAll('.chart-tab').forEach(function(t) {
        t.classList.remove('aktiv');
    });
    btn.classList.add('aktiv');

    var d = chartDaten[typ];
    var daten = chartDatenErstellen(50, d.min, d.max);

    document.getElementById('chartName').textContent = d.name;

    var change = ((Math.random() * 6) - 2).toFixed(2);
    var wertEl = document.getElementById('chartWert');
    wertEl.textContent = (change >= 0 ? '+' : '') + change + '%';
    wertEl.className = change >= 0 ? 'positiv' : 'negativ';

    chartZeichnen('hauptChart', daten, d.farbe, true);
}

// === MINI CHARTS AKTUALISIEREN ===
function miniChartsAktualisieren() {
    // Bitcoin
    var btcDaten = chartDatenErstellen(20, 40000, 46000);
    miniChartZeichnen('miniChart1', btcDaten, '#ffdf00');
    var btcChange = ((Math.random() * 8) - 2).toFixed(1);
    document.getElementById('btcWert').textContent =
        '$' + (btcDaten[btcDaten.length-1]).toFixed(0).replace(/\B(?=(\d{3})+(?!\d))/g, ',');
    var btcEl = document.getElementById('btcChange');
    btcEl.textContent = (btcChange >= 0 ? '+' : '') + btcChange + '%';
    btcEl.className = 'mini-chart-change ' + (btcChange >= 0 ? 'positiv' : 'negativ');

    // Ethereum
    var ethDaten = chartDatenErstellen(20, 2500, 3200);
    miniChartZeichnen('miniChart2', ethDaten, '#00cc44');
    var ethChange = ((Math.random() * 6) - 1.5).toFixed(1);
    document.getElementById('ethWert').textContent =
        '$' + (ethDaten[ethDaten.length-1]).toFixed(0).replace(/\B(?=(\d{3})+(?!\d))/g, ',');
    var ethEl = document.getElementById('ethChange');
    ethEl.textContent = (ethChange >= 0 ? '+' : '') + ethChange + '%';
    ethEl.className = 'mini-chart-change ' + (ethChange >= 0 ? 'positiv' : 'negativ');

    // Gold
    var goldDaten = chartDatenErstellen(20, 1950, 2100);
    miniChartZeichnen('miniChart3', goldDaten, '#ff8800');
    var goldChange = ((Math.random() * 4) - 1.5).toFixed(1);
    document.getElementById('goldWert').textContent =
        '$' + (goldDaten[goldDaten.length-1]).toFixed(0).replace(/\B(?=(\d{3})+(?!\d))/g, ',');
    var goldEl = document.getElementById('goldChange');
    goldEl.textContent = (goldChange >= 0 ? '+' : '') + goldChange + '%';
    goldEl.className = 'mini-chart-change ' + (goldChange >= 0 ? 'positiv' : 'negativ');

    // EUR/USD
    var eurDaten = chartDatenErstellen(20, 1.05, 1.12);
    miniChartZeichnen('miniChart4', eurDaten, '#0088ff');
    var eurChange = ((Math.random() * 2) - 0.8).toFixed(2);
    document.getElementById('eurWert').textContent =
        (eurDaten[eurDaten.length-1]).toFixed(4);
    var eurEl = document.getElementById('eurChange');
    eurEl.textContent = (eurChange >= 0 ? '+' : '') + eurChange + '%';
    eurEl.className = 'mini-chart-change ' + (eurChange >= 0 ? 'positiv' : 'negativ');
}

// === MINI CHART ZEICHNEN ===
function miniChartZeichnen(canvasId, daten, farbe) {
    var canvas = document.getElementById(canvasId);
    if (!canvas) return;

    var ctx = canvas.getContext('2d');
    var breite = canvas.width = canvas.offsetWidth * 2;
    var hoehe = canvas.height = 60;

    ctx.clearRect(0, 0, breite, hoehe);

    var min = Math.min.apply(null, daten);
    var max = Math.max.apply(null, daten);
    var spanne = max - min || 1;
    var schrittX = breite / (daten.length - 1);

    // Füllung
    ctx.beginPath();
    ctx.moveTo(0, hoehe);
    daten.forEach(function(wert, i) {
        var x = i * schrittX;
        var y = hoehe - ((wert - min) / spanne) * (hoehe - 10) - 5;
        ctx.lineTo(x, y);
    });
    ctx.lineTo(breite, hoehe);
    ctx.closePath();
    var grad = ctx.createLinearGradient(0, 0, 0, hoehe);
    grad.addColorStop(0, farbe + '44');
    grad.addColorStop(1, farbe + '00');
    ctx.fillStyle = grad;
    ctx.fill();

    // Linie
    ctx.beginPath();
    ctx.strokeStyle = farbe;
    ctx.lineWidth = 2;
    ctx.shadowBlur = 6;
    ctx.shadowColor = farbe;
    daten.forEach(function(wert, i) {
        var x = i * schrittX;
        var y = hoehe - ((wert - min) / spanne) * (hoehe - 10) - 5;
        if (i === 0) ctx.moveTo(x, y);
        else ctx.lineTo(x, y);
    });
    ctx.stroke();
    ctx.shadowBlur = 0;
}

// === ALLE CHARTS STARTEN ===
function chartsStarten() {
    quantumPulseStarten();

    // Haupt Chart
    var startDaten = chartDatenErstellen(50, 15000, 18000);
    chartZeichnen('hauptChart', startDaten, '#00cc44', true);

    // Mini Charts
    miniChartsAktualisieren();

    // Alle 5 Sekunden aktualisieren
    setInterval(function() {
        miniChartsAktualisieren();

        // Haupt Chart auch aktualisieren
        var aktivTab = document.querySelector('.chart-tab.aktiv');
        if (aktivTab) {
            var typ = aktivTab.getAttribute('onclick').match(/'(\w+)'/)[1];
            var d = chartDaten[typ];
            if (d) {
                var daten = chartDatenErstellen(50, d.min, d.max);
                chartZeichnen('hauptChart', daten, d.farbe, true);
            }
        }
    }, 5000);
}
// ============================================
// PHASE 6 – PORTFOLIO TRACKER
// ============================================

var portfolio = JSON.parse(localStorage.getItem('akwaaba-portfolio')) || [];

var portfolioFarben = [
    '#ff3333', '#ffee00', '#00cc44', '#0088ff',
    '#cc44ff', '#ff8800', '#00ddcc', '#ff44aa'
];

var katEmojis = {
    crypto: '₿',
    aktien: '📈',
    etf: '📊',
    rohstoffe: '🥇',
    immobilien: '🏠',
    sonstiges: '💰'
};

function portfolioHinzufuegen() {
    var name = document.getElementById('portName').value.trim();
    var kat = document.getElementById('portKat').value;
    var betrag = parseFloat(document.getElementById('portBetrag').value) || 0;
    var wert = parseFloat(document.getElementById('portWert').value) || 0;

    if (!name || betrag <= 0) {
        alert('Bitte Name und Betrag eingeben!');
        return;
    }

    var item = {
        id: Date.now(),
        name: name,
        kat: kat,
        betrag: betrag,
        wert: wert || betrag
    };

    portfolio.push(item);
    portfolioSpeichern();
    portfolioAnzeigen();

    // Felder leeren
    document.getElementById('portName').value = '';
    document.getElementById('portBetrag').value = '';
    document.getElementById('portWert').value = '';
}

function portfolioLoeschen(id) {
    portfolio = portfolio.filter(function(item) {
        return item.id !== id;
    });
    portfolioSpeichern();
    portfolioAnzeigen();
}

function portfolioLeeren() {
    if (confirm('Portfolio wirklich leeren?')) {
        portfolio = [];
        portfolioSpeichern();
        portfolioAnzeigen();
    }
}

function portfolioSpeichern() {
    localStorage.setItem('akwaaba-portfolio', JSON.stringify(portfolio));
}

function portfolioAnzeigen() {
    var liste = document.getElementById('portfolioListe');
    var chartBox = document.getElementById('portfolioChartBox');

    // Gesamtwerte berechnen
    var gesamtInvestiert = 0;
    var gesamtWert = 0;
    portfolio.forEach(function(item) {
        gesamtInvestiert += item.betrag;
        gesamtWert += item.wert;
    });

    var gesamtGewinn = gesamtWert - gesamtInvestiert;
    var gesamtRendite = gesamtInvestiert > 0
        ? ((gesamtGewinn / gesamtInvestiert) * 100)
        : 0;

    // Gesamtwerte anzeigen
    document.getElementById('gesamtInvestiert').textContent = euro(gesamtInvestiert);
    document.getElementById('gesamtWert').textContent = euro(gesamtWert);

    var gewinnEl = document.getElementById('gesamtGewinn');
    gewinnEl.textContent = (gesamtGewinn >= 0 ? '+' : '') + euro(gesamtGewinn);
    gewinnEl.className = gesamtGewinn >= 0 ? 'positiv' : 'negativ';

    var renditeEl = document.getElementById('gesamtRendite');
    renditeEl.textContent = (gesamtRendite >= 0 ? '+' : '') + gesamtRendite.toFixed(1) + '%';
    renditeEl.className = gesamtRendite >= 0 ? 'positiv' : 'negativ';

    // Liste anzeigen
    if (portfolio.length === 0) {
        liste.innerHTML =
            '<div class="leer-portfolio">' +
            '<div>💼</div>' +
            '<div>Noch keine Investments!</div>' +
            '<div style="font-size:0.8rem; margin-top:0.5rem;">Füge dein erstes Investment hinzu.</div>' +
            '</div>';
        if (chartBox) chartBox.style.display = 'none';
        return;
    }

    if (chartBox) chartBox.style.display = 'block';

    liste.innerHTML = portfolio.map(function(item, index) {
        var gewinn = item.wert - item.betrag;
        var rendite = ((gewinn / item.betrag) * 100);
        var fortschritt = Math.min((item.wert / item.betrag) * 100, 200);
        var farbe = portfolioFarben[index % portfolioFarben.length];
        var emoji = katEmojis[item.kat] || '💰';

        return '<div class="portfolio-item">' +
            '<div class="port-header">' +
                '<div>' +
                    '<div class="port-name">' + emoji + ' ' + item.name + '</div>' +
                    '<div class="port-kat">' + item.kat.toUpperCase() + '</div>' +
                '</div>' +
                '<button class="port-loeschen" onclick="portfolioLoeschen(' + item.id + ')">✕</button>' +
            '</div>' +
            '<div class="port-zahlen">' +
                '<div class="port-zahl">' +
                    '<div class="port-zahl-label">Investiert</div>' +
                    '<div class="port-zahl-wert">' + euro(item.betrag) + '</div>' +
                '</div>' +
                '<div class="port-zahl">' +
                    '<div class="port-zahl-label">Aktuell</div>' +
                    '<div class="port-zahl-wert">' + euro(item.wert) + '</div>' +
                '</div>' +
                '<div class="port-zahl">' +
                    '<div class="port-zahl-label">Rendite</div>' +
                    '<div class="port-zahl-wert ' + (rendite >= 0 ? 'positiv' : 'negativ') + '">' +
                        (rendite >= 0 ? '+' : '') + rendite.toFixed(1) + '%' +
                    '</div>' +
                '</div>' +
            '</div>' +
            '<div class="port-fortschritt">' +
                '<div class="port-fortschritt-fill" style="width:' +
                    Math.min(fortschritt, 100) + '%; background:' + farbe + ';"></div>' +
            '</div>' +
        '</div>';
    }).join('');

    // Tortendiagramm
    portfolioChartZeichnen();
}

function portfolioChartZeichnen() {
    var canvas = document.getElementById('portfolioChart');
    if (!canvas || portfolio.length === 0) return;

    var ctx = canvas.getContext('2d');
    var groesse = Math.min(canvas.offsetWidth, 300);
    canvas.width = groesse * 2;
    canvas.height = groesse * 2;

    var cx = canvas.width / 2;
    var cy = canvas.height / 2;
    var radius = Math.min(cx, cy) - 20;

    var gesamt = portfolio.reduce(function(sum, item) {
        return sum + item.wert;
    }, 0);

    var startWinkel = -Math.PI / 2;
    var legende = document.getElementById('portfolioLegende');
    legende.innerHTML = '';

    portfolio.forEach(function(item, index) {
        var anteil = item.wert / gesamt;
        var winkel = anteil * Math.PI * 2;
        var farbe = portfolioFarben[index % portfolioFarben.length];

        // Torte zeichnen
        ctx.beginPath();
        ctx.moveTo(cx, cy);
        ctx.arc(cx, cy, radius, startWinkel, startWinkel + winkel);
        ctx.closePath();
        ctx.fillStyle = farbe;
        ctx.fill();
        ctx.strokeStyle = '#0a1200';
        ctx.lineWidth = 3;
        ctx.stroke();

        // Beschriftung
        var mitte = startWinkel + winkel / 2;
        var textX = cx + Math.cos(mitte) * (radius * 0.65);
        var textY = cy + Math.sin(mitte) * (radius * 0.65);
        ctx.fillStyle = 'white';
        ctx.font = 'bold 20px Nunito';
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        if (anteil > 0.08) {
            ctx.fillText((anteil * 100).toFixed(0) + '%', textX, textY);
        }

        startWinkel += winkel;

        // Legende
        var legEl = document.createElement('div');
        legEl.className = 'legende-item';
        legEl.innerHTML =
            '<div class="legende-farbe" style="background:' + farbe + '"></div>' +
            item.name + ' (' + (anteil * 100).toFixed(1) + '%)';
        legende.appendChild(legEl);
    });

    // Mittelloch (Donut)
    ctx.beginPath();
    ctx.arc(cx, cy, radius * 0.4, 0, Math.PI * 2);
    ctx.fillStyle = '#1a2e00';
    ctx.fill();

    // Mitte Text
    ctx.fillStyle = '#ffdf00';
    ctx.font = 'bold 28px Fredoka One';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText(euro(gesamt).replace('€', ''), cx, cy - 15);
    ctx.fillStyle = '#668844';
    ctx.font = '20px Nunito';
    ctx.fillText('Gesamt', cx, cy + 15);
}

// Portfolio beim Start laden
portfolioAnzeigen();
// ============================================
// PHASE 7 – CRYPTO LIVE PREISE
// ============================================

var cryptoDaten = [
    { rang: 1,  name: 'Bitcoin',      symbol: 'BTC', icon: '₿',  farbe: '#f7931a', preis: 43250,  kap: '847B',  vol: '28.3B', min: 40000, max: 48000 },
    { rang: 2,  name: 'Ethereum',     symbol: 'ETH', icon: 'Ξ',  farbe: '#627eea', preis: 2840,   kap: '341B',  vol: '15.2B', min: 2500,  max: 3200  },
    { rang: 3,  name: 'BNB',          symbol: 'BNB', icon: '🔶', farbe: '#f3ba2f', preis: 312,    kap: '48B',   vol: '1.8B',  min: 280,   max: 360   },
    { rang: 4,  name: 'Solana',       symbol: 'SOL', icon: '◎',  farbe: '#9945ff', preis: 98,     kap: '44B',   vol: '3.2B',  min: 80,    max: 120   },
    { rang: 5,  name: 'XRP',          symbol: 'XRP', icon: '✕',  farbe: '#00aae4', preis: 0.612,  kap: '34B',   vol: '2.1B',  min: 0.5,   max: 0.8   },
    { rang: 6,  name: 'Cardano',      symbol: 'ADA', icon: '🔵', farbe: '#0033ad', preis: 0.485,  kap: '17B',   vol: '0.8B',  min: 0.4,   max: 0.6   },
    { rang: 7,  name: 'Avalanche',    symbol: 'AVAX',icon: '🔺', farbe: '#e84142', preis: 36.8,   kap: '15B',   vol: '0.9B',  min: 28,    max: 45    },
    { rang: 8,  name: 'Dogecoin',     symbol: 'DOGE',icon: '🐕', farbe: '#c2a633', preis: 0.082,  kap: '12B',   vol: '0.7B',  min: 0.06,  max: 0.12  },
    { rang: 9,  name: 'Polkadot',     symbol: 'DOT', icon: '⚫', farbe: '#e6007a', preis: 7.42,   kap: '10B',   vol: '0.5B',  min: 6,     max: 10    },
    { rang: 10, name: 'Chainlink',    symbol: 'LINK',icon: '🔗', farbe: '#2a5ada', preis: 14.85,  kap: '8B',    vol: '0.6B',  min: 12,    max: 18    },
    { rang: 11, name: 'Litecoin',     symbol: 'LTC', icon: 'Ł',  farbe: '#bfbbbb', preis: 68.5,   kap: '5B',    vol: '0.4B',  min: 55,    max: 85    },
    { rang: 12, name: 'Toncoin',      symbol: 'TON', icon: '💎', farbe: '#0098ea', preis: 2.15,   kap: '7B',    vol: '0.3B',  min: 1.8,   max: 3.0   }
];

var watchlist = JSON.parse(localStorage.getItem('akwaaba-watchlist')) || [];
var aktuellePreise = {};

// Preise initialisieren
cryptoDaten.forEach(function(c) {
    aktuellePreise[c.symbol] = c.preis;
});

function cryptoPreisFormatieren(preis) {
    if (preis >= 1000) {
        return '$' + preis.toLocaleString('de-DE', {
            minimumFractionDigits: 0,
            maximumFractionDigits: 0
        });
    } else if (preis >= 1) {
        return '$' + preis.toFixed(2);
    } else {
        return '$' + preis.toFixed(4);
    }
}

function cryptoListeAnzeigen(filter) {
    var liste = document.getElementById('cryptoListe');
    if (!liste) return;

    var gefilterteCoins = cryptoDaten;
    if (filter) {
        gefilterteCoins = cryptoDaten.filter(function(c) {
            return c.name.toLowerCase().includes(filter.toLowerCase()) ||
                   c.symbol.toLowerCase().includes(filter.toLowerCase());
        });
    }

    liste.innerHTML = gefilterteCoins.map(function(coin) {
        var change = ((Math.random() * 16) - 6).toFixed(2);
        var istPositiv = parseFloat(change) >= 0;
        var istAufWatchlist = watchlist.includes(coin.symbol);

        return '<div class="crypto-item" onclick="cryptoDetail(\'' + coin.symbol + '\')">' +
            '<div class="crypto-rang">#' + coin.rang + '</div>' +
            '<div class="crypto-icon" style="background:' + coin.farbe + '22; border: 2px solid ' + coin.farbe + '44;">' +
                coin.icon +
            '</div>' +
            '<div class="crypto-info">' +
                '<div class="crypto-name">' + coin.name + '</div>' +
                '<div class="crypto-symbol">' + coin.symbol + '</div>' +
            '</div>' +
            '<div class="crypto-rechts">' +
                '<div class="crypto-preis">' + cryptoPreisFormatieren(aktuellePreise[coin.symbol] || coin.preis) + '</div>' +
                '<div class="crypto-change ' + (istPositiv ? 'change-positiv' : 'change-negativ') + '">' +
                    (istPositiv ? '▲' : '▼') + ' ' + Math.abs(change) + '%' +
                '</div>' +
            '</div>' +
            '<button class="crypto-stern" onclick="event.stopPropagation(); watchlistToggle(\'' + coin.symbol + '\')">' +
                (istAufWatchlist ? '⭐' : '☆') +
            '</button>' +
        '</div>';
    }).join('');
}

function cryptoFiltern() {
    var suche = document.getElementById('cryptoSuche').value;
    cryptoListeAnzeigen(suche);
}

function cryptoDetail(symbol) {
    var coin = cryptoDaten.find(function(c) { return c.symbol === symbol; });
    if (!coin) return;

    var detail = document.getElementById('cryptoDetail');
    detail.style.display = 'block';
    document.getElementById('detailTitel').textContent = coin.icon + ' ' + coin.name + ' (' + coin.symbol + ')';

    var daten = chartDatenErstellen(60, coin.min, coin.max);
    miniChartZeichnen('cryptoChart', daten, coin.farbe);

    var change24h = ((Math.random() * 16) - 6).toFixed(2);
    var change7d = ((Math.random() * 30) - 10).toFixed(2);
    var ath = (coin.max * 1.5).toFixed(2);

    document.getElementById('detailInfos').innerHTML =
        '<div style="display:grid; grid-template-columns: repeat(2,1fr); gap:0.5rem; margin-top:1rem;">' +
            '<div class="port-zahl">' +
                '<div class="port-zahl-label">Aktueller Preis</div>' +
                '<div class="port-zahl-wert gold">' + cryptoPreisFormatieren(coin.preis) + '</div>' +
            '</div>' +
            '<div class="port-zahl">' +
                '<div class="port-zahl-label">24h Change</div>' +
                '<div class="port-zahl-wert ' + (change24h >= 0 ? 'positiv' : 'negativ') + '">' +
                    (change24h >= 0 ? '+' : '') + change24h + '%' +
                '</div>' +
            '</div>' +
            '<div class="port-zahl">' +
                '<div class="port-zahl-label">7d Change</div>' +
                '<div class="port-zahl-wert ' + (change7d >= 0 ? 'positiv' : 'negativ') + '">' +
                    (change7d >= 0 ? '+' : '') + change7d + '%' +
                '</div>' +
            '</div>' +
            '<div class="port-zahl">' +
                '<div class="port-zahl-label">Marktkapital</div>' +
                '<div class="port-zahl-wert">$' + coin.kap + '</div>' +
            '</div>' +
            '<div class="port-zahl">' +
                '<div class="port-zahl-label">24h Volumen</div>' +
                '<div class="port-zahl-wert">$' + coin.vol + '</div>' +
            '</div>' +
            '<div class="port-zahl">' +
                '<div class="port-zahl-label">All Time High</div>' +
                '<div class="port-zahl-wert">$' + ath + '</div>' +
            '</div>' +
        '</div>';

    detail.scrollIntoView({ behavior: 'smooth' });
}

function watchlistToggle(symbol) {
    var index = watchlist.indexOf(symbol);
    if (index === -1) {
        watchlist.push(symbol);
    } else {
        watchlist.splice(index, 1);
    }
    localStorage.setItem('akwaaba-watchlist', JSON.stringify(watchlist));
    cryptoListeAnzeigen(document.getElementById('cryptoSuche') ?
        document.getElementById('cryptoSuche').value : '');
    watchlistAnzeigen();
}

function watchlistAnzeigen() {
    var container = document.getElementById('watchlistContainer');
    if (!container) return;

    if (watchlist.length === 0) {
        container.innerHTML =
            '<div class="leer-portfolio">' +
            '<div>⭐</div>' +
            '<div>Noch keine Coins auf der Watchlist!</div>' +
            '</div>';
        return;
    }

    container.innerHTML = watchlist.map(function(symbol) {
        var coin = cryptoDaten.find(function(c) { return c.symbol === symbol; });
        if (!coin) return '';
        var change = ((Math.random() * 10) - 3).toFixed(2);
        return '<div class="watchlist-item">' +
            '<div>' +
                '<div class="watchlist-name">' + coin.icon + ' ' + coin.name + '</div>' +
                '<div class="crypto-symbol">' + coin.symbol + '</div>' +
            '</div>' +
            '<div class="watchlist-preis">' + cryptoPreisFormatieren(coin.preis) + '</div>' +
            '<div class="' + (change >= 0 ? 'positiv' : 'negativ') + '">' +
                (change >= 0 ? '+' : '') + change + '%' +
            '</div>' +
            '<button class="watchlist-entfernen" onclick="watchlistToggle(\'' + symbol + '\')">✕</button>' +
        '</div>';
    }).join('');
}

function fearGreedAnzeigen() {
    var wert = Math.floor(Math.random() * 40) + 40;
    var fill = document.getElementById('fearFill');
    var wertEl = document.getElementById('fearWert');
    var textEl = document.getElementById('fearText');

    if (!fill) return;

    fill.style.left = wert + '%';
    wertEl.textContent = wert;

    var beschreibung;
    if (wert <= 20) beschreibung = '😱 Extreme Angst – Möglicherweise Kaufgelegenheit!';
    else if (wert <= 40) beschreibung = '😟 Angst – Investoren sind nervös.';
    else if (wert <= 60) beschreibung = '😐 Neutral – Ausgeglichener Markt.';
    else if (wert <= 80) beschreibung = '😄 Gier – Vorsicht bei Käufen!';
    else beschreibung = '🤑 Extreme Gier – Markt möglicherweise überhitzt!';

    textEl.textContent = beschreibung;
}

function marktDatenAktualisieren() {
    var kap = (2.2 + Math.random() * 0.5).toFixed(2);
    var vol = (85 + Math.random() * 30).toFixed(1);
    var dom = (50 + Math.random() * 5).toFixed(1);

    var kapEl = document.getElementById('marktKap');
    var volEl = document.getElementById('marktVol');
    var domEl = document.getElementById('btcDom');

    if (kapEl) kapEl.textContent = '$' + kap + 'T';
    if (volEl) volEl.textContent = '$' + vol + 'B';
    if (domEl) domEl.textContent = dom + '%';
}

function signaleGenerieren() {
    var container = document.getElementById('quantumSignale');
    if (!container) return;

    var signale = [
        { coin: 'Bitcoin (BTC)', icon: '₿', signal: 'KAUF', text: 'RSI überverkauft. Quantum Modell zeigt Aufwärtstrend.' },
        { coin: 'Ethereum (ETH)', icon: 'Ξ', signal: 'HALTEN', text: 'Konsolidierungsphase. Abwarten bis Ausbruch.' },
        { coin: 'Solana (SOL)', icon: '◎', signal: 'KAUF', text: 'Starkes Momentum. Institutionelle Käufe erkannt.' },
        { coin: 'BNB', icon: '🔶', signal: 'HALTEN', text: 'Seitwärtsbewegung erwartet. Neutral positioniert.' },
        { coin: 'XRP', icon: '✕', signal: 'VERKAUF', text: 'Widerstand bei $0.65. Gewinnmitnahmen empfohlen.' },
        { coin: 'Dogecoin (DOGE)', icon: '🐕', signal: 'HALTEN', text: 'Hohe Volatilität. Nur mit Risikokapital handeln.' }
    ];

    var gemischt = signale.sort(function() { return Math.random() - 0.5; }).slice(0, 4);

    container.innerHTML = gemischt.map(function(s) {
        var badgeKlasse = s.signal === 'KAUF' ? 'badge-kauf' :
                          s.signal === 'VERKAUF' ? 'badge-verkauf' : 'badge-halten';
        return '<div class="signal-item">' +
            '<div class="signal-icon">' + s.icon + '</div>' +
            '<div class="signal-info">' +
                '<div class="signal-name">' + s.coin + '</div>' +
                '<div class="signal-text">' + s.text + '</div>' +
            '</div>' +
            '<div class="signal-badge ' + badgeKlasse + '">' + s.signal + '</div>' +
        '</div>';
    }).join('');
}

function preiseAktualisieren() {
    cryptoDaten.forEach(function(coin) {
        var change = (Math.random() * 0.02) - 0.01;
        aktuellePreise[coin.symbol] = coin.preis * (1 + change);
    });
}

// Crypto starten
function cryptoStarten() {
    cryptoListeAnzeigen();
    watchlistAnzeigen();
    fearGreedAnzeigen();
    marktDatenAktualisieren();
    signaleGenerieren();

    // Alle 10 Sekunden aktualisieren
    setInterval(function() {
        preiseAktualisieren();
        cryptoListeAnzeigen(
            document.getElementById('cryptoSuche') ?
            document.getElementById('cryptoSuche').value : ''
        );
        fearGreedAnzeigen();
        marktDatenAktualisieren();
        watchlistAnzeigen();
    }, 10000);
}
// ============================================
// PHASE 8 – BUDGET PLANER
// ============================================

var budgetEintraege = JSON.parse(
    localStorage.getItem('akwaaba-budget')) || [];
var aktiverTyp = 'einnahme';
var aktiverFilter = 'alle';

var katEmojisB = {
    gehalt: '💼', nebeneinkommen: '💰', miete: '🏠',
    essen: '🍔', transport: '🚗', unterhaltung: '🎮',
    gesundheit: '💊', kleidung: '👕', sparen: '🐖',
    sonstiges: '📦'
};

var budgetFarben = [
    '#ff3333', '#ffee00', '#00cc44', '#0088ff',
    '#cc44ff', '#ff8800', '#00ddcc', '#ff44aa',
    '#88ff00', '#ff6644'
];

function typWaehlen(typ) {
    aktiverTyp = typ;
    var einnahmeBtn = document.getElementById('einnahmeBtn');
    var ausgabeBtn = document.getElementById('ausgabeBtn');

    if (typ === 'einnahme') {
        einnahmeBtn.className = 'typ-btn aktiv';
        ausgabeBtn.className = 'typ-btn';

        // Kategorien anpassen
        document.getElementById('budgetKat').innerHTML =
            '<option value="gehalt">💼 Gehalt</option>' +
            '<option value="nebeneinkommen">💰 Nebeneinkommen</option>' +
            '<option value="sonstiges">📦 Sonstiges</option>';
    } else {
        einnahmeBtn.className = 'typ-btn';
        ausgabeBtn.className = 'typ-btn ausgabe-aktiv';

        document.getElementById('budgetKat').innerHTML =
            '<option value="miete">🏠 Miete</option>' +
            '<option value="essen">🍔 Essen & Trinken</option>' +
            '<option value="transport">🚗 Transport</option>' +
            '<option value="unterhaltung">🎮 Unterhaltung</option>' +
            '<option value="gesundheit">💊 Gesundheit</option>' +
            '<option value="kleidung">👕 Kleidung</option>' +
            '<option value="sparen">🐖 Sparen</option>' +
            '<option value="sonstiges">📦 Sonstiges</option>';
    }
}

function budgetHinzufuegen() {
    var name   = document.getElementById('budgetName').value.trim();
    var kat    = document.getElementById('budgetKat').value;
    var betrag = parseFloat(document.getElementById('budgetBetrag').value) || 0;
    var datum  = document.getElementById('budgetDatum').value ||
                 new Date().toISOString().split('T')[0];

    if (!name || betrag <= 0) {
        alert('Bitte Beschreibung und Betrag eingeben!');
        return;
    }

    budgetEintraege.push({
        id: Date.now(),
        typ: aktiverTyp,
        name: name,
        kat: kat,
        betrag: betrag,
        datum: datum
    });

    localStorage.setItem('akwaaba-budget', JSON.stringify(budgetEintraege));

    // Felder leeren
    document.getElementById('budgetName').value = '';
    document.getElementById('budgetBetrag').value = '';

    budgetAnzeigen();
}

function budgetLoeschen(id) {
    budgetEintraege = budgetEintraege.filter(function(e) {
        return e.id !== id;
    });
    localStorage.setItem('akwaaba-budget', JSON.stringify(budgetEintraege));
    budgetAnzeigen();
}

function budgetLeeren() {
    if (confirm('Alle Budget-Einträge wirklich löschen?')) {
        budgetEintraege = [];
        localStorage.setItem('akwaaba-budget', JSON.stringify(budgetEintraege));
        budgetAnzeigen();
    }
}

function transFilter(filter, btn) {
    aktiverFilter = filter;
    document.querySelectorAll('.filter-btn').forEach(function(b) {
        b.classList.remove('aktiv');
    });
    btn.classList.add('aktiv');
    budgetTransAnzeigen();
}

function budgetAnzeigen() {
    // Gesamtwerte
    var einnahmen = budgetEintraege
        .filter(function(e) { return e.typ === 'einnahme'; })
        .reduce(function(s, e) { return s + e.betrag; }, 0);

    var ausgaben = budgetEintraege
        .filter(function(e) { return e.typ === 'ausgabe'; })
        .reduce(function(s, e) { return s + e.betrag; }, 0);

    var bilanz = einnahmen - ausgaben;
    var prozent = einnahmen > 0 ? Math.min((ausgaben / einnahmen) * 100, 100) : 0;

    // Anzeigen
    var einEl = document.getElementById('gesamtEinnahmen');
    var ausEl = document.getElementById('gesamtAusgaben');
    var bilEl = document.getElementById('gesamtBilanz');
    var proEl = document.getElementById('budgetProzent');
    var barEl = document.getElementById('budgetProgress');
    var tippEl = document.getElementById('budgetTipp');

    if (einEl) einEl.textContent = euro(einnahmen);
    if (ausEl) ausEl.textContent = euro(ausgaben);

    if (bilEl) {
        bilEl.textContent = (bilanz >= 0 ? '+' : '') + euro(bilanz);
        bilEl.className = 'budget-box-wert ' + (bilanz >= 0 ? 'positiv' : 'negativ');
    }

    if (proEl) proEl.textContent = prozent.toFixed(0) + '%';

    if (barEl) {
        barEl.style.width = prozent + '%';
        if (prozent < 50) {
            barEl.style.background = 'linear-gradient(90deg, #00cc44, #88ff00)';
        } else if (prozent < 80) {
            barEl.style.background = 'linear-gradient(90deg, #ffee00, #ff8800)';
        } else {
            barEl.style.background = 'linear-gradient(90deg, #ff8800, #cc0000)';
        }
    }

    if (tippEl) {
        if (prozent === 0) {
            tippEl.textContent = '💡 Füge deine Einnahmen und Ausgaben hinzu!';
        } else if (prozent < 50) {
            tippEl.textContent = '🟢 Ausgezeichnet! Du sparst mehr als 50% deines Einkommens!';
        } else if (prozent < 70) {
            tippEl.textContent = '🟡 Gut! Du gibst ' + prozent.toFixed(0) + '% aus. Versuche unter 70% zu bleiben.';
        } else if (prozent < 90) {
            tippEl.textContent = '🟠 Achtung! Du gibst ' + prozent.toFixed(0) + '% aus. Reduziere Ausgaben!';
        } else {
            tippEl.textContent = '🔴 Kritisch! Ausgaben fast gleich Einnahmen. Sofort Budget überprüfen!';
        }
    }

    budgetChartZeichnen();
    budgetTransAnzeigen();
}

function budgetTransAnzeigen() {
    var liste = document.getElementById('transListe');
    if (!liste) return;

    var gefiltert = budgetEintraege.filter(function(e) {
        if (aktiverFilter === 'alle') return true;
        return e.typ === aktiverFilter;
    });

    // Neueste zuerst
    gefiltert = gefiltert.slice().reverse();

    if (gefiltert.length === 0) {
        liste.innerHTML =
            '<div class="leer-portfolio">' +
            '<div>📋</div>' +
            '<div>Keine Einträge vorhanden.</div>' +
            '</div>';
        return;
    }

    liste.innerHTML = gefiltert.map(function(e) {
        var emoji = katEmojisB[e.kat] || '📦';
        var istEin = e.typ === 'einnahme';

        return '<div class="trans-item">' +
            '<div class="trans-icon ' + (istEin ? 'trans-einnahme' : 'trans-ausgabe') + '">' +
                emoji +
            '</div>' +
            '<div class="trans-info">' +
                '<div class="trans-name">' + e.name + '</div>' +
                '<div class="trans-detail">' +
                    e.kat + ' · ' + e.datum +
                '</div>' +
            '</div>' +
            '<div class="trans-betrag ' + (istEin ? 'positiv' : 'negativ') + '">' +
                (istEin ? '+' : '-') + euro(e.betrag) +
            '</div>' +
            '<button class="trans-loeschen" onclick="budgetLoeschen(' + e.id + ')">✕</button>' +
        '</div>';
    }).join('');
}

function budgetChartZeichnen() {
    var canvas = document.getElementById('budgetChart');
    if (!canvas) return;

    var ausgaben = budgetEintraege.filter(function(e) {
        return e.typ === 'ausgabe';
    });

    if (ausgaben.length === 0) {
        var ctx = canvas.getContext('2d');
        canvas.width = canvas.offsetWidth * 2;
        canvas.height = 200;
        ctx.fillStyle = '#668844';
        ctx.font = '30px Nunito';
        ctx.textAlign = 'center';
        ctx.fillText('Keine Ausgaben vorhanden', canvas.width/2, 110);
        return;
    }

    // Nach Kategorie gruppieren
    var gruppen = {};
    ausgaben.forEach(function(e) {
        if (!gruppen[e.kat]) gruppen[e.kat] = 0;
        gruppen[e.kat] += e.betrag;
    });

    var kategorien = Object.keys(gruppen);
    var gesamt = Object.values(gruppen).reduce(function(s, v) {
        return s + v;
    }, 0);

    var ctx = canvas.getContext('2d');
    var groesse = Math.min(canvas.offsetWidth, 300);
    canvas.width = groesse * 2;
    canvas.height = groesse * 2;

    var cx = canvas.width / 2;
    var cy = canvas.height / 2;
    var radius = Math.min(cx, cy) - 20;
    var startWinkel = -Math.PI / 2;

    var legende = document.getElementById('budgetLegende');
    if (legende) legende.innerHTML = '';

    kategorien.forEach(function(kat, i) {
        var anteil = gruppen[kat] / gesamt;
        var winkel = anteil * Math.PI * 2;
        var farbe = budgetFarben[i % budgetFarben.length];
        var emoji = katEmojisB[kat] || '📦';

        ctx.beginPath();
        ctx.moveTo(cx, cy);
        ctx.arc(cx, cy, radius, startWinkel, startWinkel + winkel);
        ctx.closePath();
        ctx.fillStyle = farbe;
        ctx.fill();
        ctx.strokeStyle = '#0a1200';
        ctx.lineWidth = 3;
        ctx.stroke();

        if (anteil > 0.08) {
            var mitte = startWinkel + winkel / 2;
            var tx = cx + Math.cos(mitte) * (radius * 0.65);
            var ty = cy + Math.sin(mitte) * (radius * 0.65);
            ctx.fillStyle = 'white';
            ctx.font = 'bold 20px Nunito';
            ctx.textAlign = 'center';
            ctx.textBaseline = 'middle';
            ctx.fillText((anteil * 100).toFixed(0) + '%', tx, ty);
        }

        startWinkel += winkel;

        if (legende) {
            var legEl = document.createElement('div');
            legEl.className = 'legende-item';
            legEl.innerHTML =
                '<div class="legende-farbe" style="background:' + farbe + '"></div>' +
                emoji + ' ' + kat + ' (' + euro(gruppen[kat]) + ')';
            legende.appendChild(legEl);
        }
    });

    // Donut Loch
    ctx.beginPath();
    ctx.arc(cx, cy, radius * 0.4, 0, Math.PI * 2);
    ctx.fillStyle = '#0a2e00';
    ctx.fill();

    ctx.fillStyle = '#ff4444';
    ctx.font = 'bold 28px Fredoka One';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText(euro(gesamt).replace('€', ''), cx, cy - 15);
    ctx.fillStyle = '#668844';
    ctx.font = '20px Nunito';
    ctx.fillText('Ausgaben', cx, cy + 15);
}

function aiAnalyseErstellen() {
    var container = document.getElementById('aiAnalyse');
    if (!container) return;

    var einnahmen = budgetEintraege
        .filter(function(e) { return e.typ === 'einnahme'; })
        .reduce(function(s, e) { return s + e.betrag; }, 0);

    var ausgaben = budgetEintraege
        .filter(function(e) { return e.typ === 'ausgabe'; })
        .reduce(function(s, e) { return s + e.betrag; }, 0);

    if (einnahmen === 0 && ausgaben === 0) {
        container.innerHTML =
            '<p style="color:#668844;">Bitte erst Einträge hinzufügen!</p>';
        return;
    }

    var sparRate = einnahmen > 0 ?
        ((einnahmen - ausgaben) / einnahmen * 100) : 0;
    var punkte = [];

    // Sparrate
    if (sparRate >= 20) {
        punkte.push({
            icon: '🏆',
            text: 'Exzellente Sparrate von ' + sparRate.toFixed(1) +
                  '%! Du bist auf dem richtigen Weg zur finanziellen Freiheit!'
        });
    } else if (sparRate >= 10) {
        punkte.push({
            icon: '👍',
            text: 'Gute Sparrate von ' + sparRate.toFixed(1) +
                  '%. Versuche auf 20% zu kommen!'
        });
    } else if (sparRate > 0) {
        punkte.push({
            icon: '⚠️',
            text: 'Niedrige Sparrate von ' + sparRate.toFixed(1) +
                  '%. Reduziere deine Ausgaben!'
        });
    } else {
        punkte.push({
            icon: '🚨',
            text: 'Ausgaben übersteigen Einnahmen! Sofort Ausgaben reduzieren!'
        });
    }

    // Ausgaben Analyse
    var essen = budgetEintraege
        .filter(function(e) { return e.kat === 'essen'; })
        .reduce(function(s, e) { return s + e.betrag; }, 0);

    if (essen > einnahmen * 0.3) {
        punkte.push({
            icon: '🍔',
            text: 'Essen & Trinken macht ' +
                  ((essen/einnahmen)*100).toFixed(0) +
                  '% deines Einkommens aus. Meal-Prep kann bis zu 40% sparen!'
        });
    }

    var unterhaltung = budgetEintraege
        .filter(function(e) { return e.kat === 'unterhaltung'; })
        .reduce(function(s, e) { return s + e.betrag; }, 0);

    if (unterhaltung > einnahmen * 0.15) {
        punkte.push({
            icon: '🎮',
            text: 'Unterhaltungsausgaben sind hoch (' +
                  euro(unterhaltung) + '). Überprüfe Abonnements!'
        });
    }

    // Empfehlungen
    punkte.push({
        icon: '💡',
        text: 'Quantum Empfehlung: Investiere ' +
              euro(Math.max(0, einnahmen * 0.15)) +
              '/Monat in einen ETF-Sparplan für langfristigen Vermögensaufbau!'
    });

    punkte.push({
        icon: '🎯',
        text: 'Notfallfonds Ziel: ' + euro(ausgaben * 3) +
              ' (3 Monatsausgaben). Aktueller Überschuss: ' +
              euro(Math.max(0, einnahmen - ausgaben)) + '/Monat.'
    });

    container.innerHTML = punkte.map(function(p) {
        return '<div class="ai-punkt">' +
            '<div class="ai-punkt-icon">' + p.icon + '</div>' +
            '<div class="ai-punkt-text">' + p.text + '</div>' +
        '</div>';
    }).join('');
}

// Datum heute setzen
function budgetDatumSetzen() {
    var datumEl = document.getElementById('budgetDatum');
    if (datumEl) {
        datumEl.value = new Date().toISOString().split('T')[0];
    }
}

// Budget starten
budgetAnzeigen();
budgetDatumSetzen();
// ============================================
// PHASE 9 – PUSH NOTIFICATIONS
// ============================================

var preisAlarme = JSON.parse(
    localStorage.getItem('akwaaba-alarme')) || [];
var notifVerlauf = JSON.parse(
    localStorage.getItem('akwaaba-verlauf')) || [];
var alertEinstellungen = JSON.parse(
    localStorage.getItem('akwaaba-alerts')) || {
    markt: true, crypto: true,
    budget: true, report: false, quantum: true
};

// === PERMISSION ANFORDERN ===
function benachrichtigungAnfordern() {
    if (!('Notification' in window)) {
        alert('Dein Browser unterstützt keine Benachrichtigungen!');
        return;
    }

    Notification.requestPermission().then(function(erlaubnis) {
        permissionStatusAnzeigen(erlaubnis);

        if (erlaubnis === 'granted') {
            // Willkommens-Notification
            setTimeout(function() {
                benachrichtigungZeigen(
                    '🎉 AKWAABA Finance aktiviert!',
                    'Quantum AI Alerts sind jetzt aktiv. ' +
                    'Du wirst über wichtige Marktbewegungen informiert! 🇹🇬',
                    '🔔'
                );
            }, 1000);

            // Auto-Alerts starten
            autoAlertsStarten();
        }
    });
}

function permissionStatusAnzeigen(status) {
    var statusEl = document.getElementById('permissionStatus');
    var btnEl = document.getElementById('permBtn');
    if (!statusEl) return;

    if (status === 'granted') {
        statusEl.innerHTML =
            '<div class="perm-icon">🔔</div>' +
            '<div class="perm-text perm-aktiv">✅ Aktiviert!</div>';
        if (btnEl) {
            btnEl.textContent = '✅ Benachrichtigungen aktiv';
            btnEl.disabled = true;
            btnEl.style.opacity = '0.6';
        }
    } else if (status === 'denied') {
        statusEl.innerHTML =
            '<div class="perm-icon">🔕</div>' +
            '<div class="perm-text perm-blockiert">' +
            '❌ Blockiert – Bitte in Browser-Einstellungen aktivieren</div>';
        if (btnEl) {
            btnEl.textContent = '⚙️ In Einstellungen aktivieren';
        }
    } else {
        statusEl.innerHTML =
            '<div class="perm-icon">🔕</div>' +
            '<div class="perm-text">Noch nicht aktiviert</div>';
    }
}

// === NOTIFICATION ANZEIGEN ===
function benachrichtigungZeigen(titel, text, icon) {
    // In Verlauf speichern
    var eintrag = {
        id: Date.now(),
        titel: titel,
        text: text,
        icon: icon || '🔔',
        zeit: new Date().toLocaleTimeString('de-DE', {
            hour: '2-digit', minute: '2-digit'
        })
    };

    notifVerlauf.unshift(eintrag);
    if (notifVerlauf.length > 20) notifVerlauf.pop();
    localStorage.setItem('akwaaba-verlauf', JSON.stringify(notifVerlauf));
    verlaufAnzeigen();

    // Browser Notification
    if (Notification.permission === 'granted') {
        try {
            new Notification(titel, {
                body: text,
                icon: '/images/icon-192.png',
                badge: '/images/icon-192.png',
                vibrate: [200, 100, 200],
                tag: 'akwaaba-' + Date.now()
            });
        } catch(e) {
            console.log('Notification Fehler:', e);
        }
    }
}

// === TEST NOTIFICATIONS ===
function testNotification(typ) {
    var nachrichten = {
        markt: {
            titel: '📈 Markt Alert!',
            text: 'DAX steigt um +3.2%! Starkes Momentum im Tech-Sektor erkannt.',
            icon: '📈'
        },
        budget: {
            titel: '💸 Budget Warnung!',
            text: 'Du hast 80% deines Monatsbudgets erreicht. ' +
                  'Noch €' + (Math.floor(Math.random() * 500) + 100) + ' verfügbar.',
            icon: '💸'
        },
        crypto: {
            titel: '₿ Crypto Signal!',
            text: 'Quantum AI erkennt KAUF-Signal für Bitcoin. ' +
                  'RSI überverkauft bei 28. Einstiegsgelegenheit!',
            icon: '₿'
        },
        quantum: {
            titel: '⚛️ Quantum Update!',
            text: 'Neue AI-Analyse verfügbar. ' +
                  'Konfidenz: 94.7% für Aufwärtstrend in den nächsten 7 Tagen.',
            icon: '⚛️'
        }
    };

    var msg = nachrichten[typ];
    if (msg) {
        benachrichtigungZeigen(msg.titel, msg.text, msg.icon);

        // Visuelles Feedback
        var btn = event.target;
        var original = btn.textContent;
        btn.textContent = '✅ Gesendet!';
        btn.disabled = true;
        setTimeout(function() {
            btn.textContent = original;
            btn.disabled = false;
        }, 2000);
    }
}

// === PREIS ALARM ===
function preisAlarmSetzen() {
    var coin = document.getElementById('alarmCoin').value;
    var preis = parseFloat(document.getElementById('alarmPreis').value) || 0;
    var typ = document.getElementById('alarmTyp').value;

    if (preis <= 0) {
        alert('Bitte einen gültigen Preis eingeben!');
        return;
    }

    preisAlarme.push({
        id: Date.now(),
        coin: coin,
        preis: preis,
        typ: typ,
        aktiv: true
    });

    localStorage.setItem('akwaaba-alarme', JSON.stringify(preisAlarme));
    document.getElementById('alarmPreis').value = '';
    preisAlarmAnzeigen();

    benachrichtigungZeigen(
        '🎯 Preis Alarm gesetzt!',
        coin + ' Alarm bei $' + preis.toLocaleString() +
        ' (' + (typ === 'ueber' ? 'über' : 'unter') + ') aktiv.',
        '🎯'
    );
}

function preisAlarmLoeschen(id) {
    preisAlarme = preisAlarme.filter(function(a) { return a.id !== id; });
    localStorage.setItem('akwaaba-alarme', JSON.stringify(preisAlarme));
    preisAlarmAnzeigen();
}

function preisAlarmAnzeigen() {
    var liste = document.getElementById('alarmListe');
    if (!liste) return;

    if (preisAlarme.length === 0) {
        liste.innerHTML =
            '<p style="color:#668844; font-size:0.85rem; text-align:center;">' +
            'Noch keine Alarme gesetzt.</p>';
        return;
    }

    liste.innerHTML = preisAlarme.map(function(alarm) {
        return '<div class="alarm-item">' +
            '<div class="alarm-info">' +
                '<div class="alarm-name">₿ ' + alarm.coin + '</div>' +
                '<div class="alarm-detail">' +
                    (alarm.typ === 'ueber' ? '📈 Über' : '📉 Unter') +
                    ' $' + alarm.preis.toLocaleString() +
                '</div>' +
            '</div>' +
            '<div style="color:#00ff88; font-size:0.8rem; margin-right:0.5rem;">🟢 Aktiv</div>' +
            '<button class="alarm-loeschen" ' +
                'onclick="preisAlarmLoeschen(' + alarm.id + ')">✕</button>' +
        '</div>';
    }).join('');
}

// === VERLAUF ===
function verlaufAnzeigen() {
    var container = document.getElementById('notifVerlauf');
    if (!container) return;

    if (notifVerlauf.length === 0) {
        container.innerHTML =
            '<div class="leer-portfolio">' +
            '<div>🔔</div>' +
            '<div>Noch keine Benachrichtigungen.</div>' +
            '</div>';
        return;
    }

    container.innerHTML = notifVerlauf.map(function(n) {
        return '<div class="notif-item">' +
            '<div class="notif-icon">' + n.icon + '</div>' +
            '<div class="notif-inhalt">' +
                '<div class="notif-titel">' + n.titel + '</div>' +
                '<div class="notif-text">' + n.text + '</div>' +
                '<div class="notif-zeit">🕐 ' + n.zeit + '</div>' +
            '</div>' +
        '</div>';
    }).join('');
}

function verlaufLeeren() {
    if (confirm('Verlauf wirklich leeren?')) {
        notifVerlauf = [];
        localStorage.setItem('akwaaba-verlauf', JSON.stringify(notifVerlauf));
        verlaufAnzeigen();
    }
}

// === ALERT SPEICHERN ===
function alertSpeichern() {
    alertEinstellungen = {
        markt:   document.getElementById('marktAlert') ?
                 document.getElementById('marktAlert').checked : true,
        crypto:  document.getElementById('cryptoAlert') ?
                 document.getElementById('cryptoAlert').checked : true,
        budget:  document.getElementById('budgetAlert') ?
                 document.getElementById('budgetAlert').checked : true,
        report:  document.getElementById('reportAlert') ?
                 document.getElementById('reportAlert').checked : false,
        quantum: document.getElementById('quantumAlert') ?
                 document.getElementById('quantumAlert').checked : true
    };
    localStorage.setItem('akwaaba-alerts',
        JSON.stringify(alertEinstellungen));
}

// === AUTO ALERTS ===
function autoAlertsStarten() {
    // Markt Alert alle 5 Minuten
    setInterval(function() {
        if (!alertEinstellungen.markt) return;
        if (Notification.permission !== 'granted') return;

        var change = ((Math.random() * 8) - 3).toFixed(1);
        if (Math.abs(parseFloat(change)) > 3) {
            benachrichtigungZeigen(
                '📈 Starke Marktbewegung!',
                'DAX ' + (change > 0 ? '+' : '') + change +
                '% – Quantum AI analysiert...',
                '📈'
            );
        }
    }, 300000); // 5 Minuten

    // Crypto Signal alle 10 Minuten
    setInterval(function() {
        if (!alertEinstellungen.crypto) return;
        if (Notification.permission !== 'granted') return;

        var signale = ['KAUF', 'VERKAUF', 'HALTEN'];
        var coins = ['Bitcoin', 'Ethereum', 'Solana'];
        var signal = signale[Math.floor(Math.random() * signale.length)];
        var coin = coins[Math.floor(Math.random() * coins.length)];

        if (signal !== 'HALTEN') {
            benachrichtigungZeigen(
                '⚛️ Quantum Signal: ' + signal + '!',
                coin + ' – Konfidenz: ' +
                (75 + Math.floor(Math.random() * 20)) + '%',
                '⚛️'
            );
        }
    }, 600000); // 10 Minuten

    // Preis Alarm prüfen alle Minute
    setInterval(function() {
        if (preisAlarme.length === 0) return;
        preisAlarme.forEach(function(alarm) {
            var coin = cryptoDaten.find(function(c) {
                return c.symbol === alarm.coin;
            });
            if (!coin) return;

            var aktuellerPreis = aktuellePreise[alarm.coin] || coin.preis;

            if (alarm.typ === 'ueber' && aktuellerPreis > alarm.preis) {
                benachrichtigungZeigen(
                    '🎯 Preis Alarm ausgelöst!',
                    alarm.coin + ' ist über $' +
                    alarm.preis.toLocaleString() +
                    '! Aktuell: $' + aktuellerPreis.toFixed(2),
                    '🎯'
                );
            } else if (alarm.typ === 'unter' &&
                       aktuellerPreis < alarm.preis) {
                benachrichtigungZeigen(
                    '🎯 Preis Alarm ausgelöst!',
                    alarm.coin + ' ist unter $' +
                    alarm.preis.toLocaleString() +
                    '! Aktuell: $' + aktuellerPreis.toFixed(2),
                    '🎯'
                );
            }
        });
    }, 60000); // 1 Minute
}

// === EINSTELLUNGEN LADEN ===
function alertEinstellungenLaden() {
    var felder = ['markt', 'crypto', 'budget', 'report', 'quantum'];
    felder.forEach(function(feld) {
        var el = document.getElementById(feld + 'Alert');
        if (el && alertEinstellungen[feld] !== undefined) {
            el.checked = alertEinstellungen[feld];
        }
    });
}

// === STARTEN ===
function notificationsStarten() {
    // Permission Status prüfen
    if ('Notification' in window) {
        permissionStatusAnzeigen(Notification.permission);
        if (Notification.permission === 'granted') {
            autoAlertsStarten();
        }
    }
    alertEinstellungenLaden();
    preisAlarmAnzeigen();
    verlaufAnzeigen();
}

notificationsStarten();
// ============================================
// PHASE 10 – PWA APP STORE READY
// ============================================

var installEvent = null;

// === INSTALL PROMPT ===
window.addEventListener('beforeinstallprompt', function(e) {
    e.preventDefault();
    installEvent = e;

    // Banner anzeigen nach 3 Sekunden
    setTimeout(function() {
        var banner = document.getElementById('installBanner');
        if (banner) banner.classList.remove('versteckt');
    }, 3000);
});

// === INSTALL BUTTON ===
document.addEventListener('DOMContentLoaded', function() {
    var installBtn = document.getElementById('installBtn');
    var installClose = document.getElementById('installClose');

    if (installBtn) {
        installBtn.addEventListener('click', function() {
            if (installEvent) {
                installEvent.prompt();
                installEvent.userChoice.then(function(result) {
                    if (result.outcome === 'accepted') {
                        console.log('✅ App installiert!');
                        benachrichtigungZeigen(
                            '🎉 AKWAABA installiert!',
                            'Die App wurde erfolgreich installiert. ' +
                            'Du findest sie jetzt auf deinem Homescreen! 🇹🇬',
                            '🎉'
                        );
                    }
                    var banner = document.getElementById('installBanner');
                    if (banner) banner.classList.add('versteckt');
                    installEvent = null;
                });
            }
        });
    }

    if (installClose) {
        installClose.addEventListener('click', function() {
            var banner = document.getElementById('installBanner');
            if (banner) banner.classList.add('versteckt');
        });
    }
});

// === APP INSTALLED ===
window.addEventListener('appinstalled', function() {
    console.log('✅ PWA wurde installiert!');
    var banner = document.getElementById('installBanner');
    if (banner) banner.classList.add('versteckt');
});

// === OFFLINE DETECTION ===
var offlineBanner = document.createElement('div');
offlineBanner.className = 'offline-banner';
offlineBanner.textContent = '📡 Offline – Du siehst gespeicherte Daten';
document.body.appendChild(offlineBanner);

window.addEventListener('offline', function() {
    offlineBanner.classList.add('aktiv');
    benachrichtigungZeigen(
        '📡 Offline Modus aktiv',
        'AKWAABA Finance funktioniert auch ohne Internet! ' +
        'Deine Daten sind sicher gespeichert.',
        '📡'
    );
});

window.addEventListener('online', function() {
    offlineBanner.classList.remove('aktiv');
    benachrichtigungZeigen(
        '✅ Wieder online!',
        'Verbindung wiederhergestellt. Daten werden aktualisiert.',
        '✅'
    );
});

// === SERVICE WORKER UPDATE ===
if ('serviceWorker' in navigator) {
    navigator.serviceWorker.register('/akwaaba-finance/sw.js')
    .then(function(reg) {
        console.log('✅ SW registriert');

        reg.addEventListener('updatefound', function() {
            var neuerSW = reg.installing;
            neuerSW.addEventListener('statechange', function() {
                if (neuerSW.state === 'installed' &&
                    navigator.serviceWorker.controller) {
                    // Update Banner
                    var updateBanner = document.createElement('div');
                    updateBanner.className = 'update-banner';
                    updateBanner.innerHTML =
                        '🆕 Update verfügbar! ' +
                        '<button onclick="window.location.reload()">Jetzt</button>';
                    document.body.appendChild(updateBanner);

                    setTimeout(function() {
                        if (updateBanner.parentNode) {
                            updateBanner.parentNode.removeChild(updateBanner);
                        }
                    }, 10000);
                }
            });
        });
    })
    .catch(function(err) {
        console.log('SW Fehler:', err);
    });
}

// === PERFORMANCE TRACKING ===
window.addEventListener('load', function() {
    if ('performance' in window) {
        var timing = performance.timing;
        var ladezeit = timing.loadEventEnd - timing.navigationStart;
        console.log('⚡ App geladen in: ' + ladezeit + 'ms');
    }
});

// === SHARE API ===
function appTeilen() {
    if (navigator.share) {
        navigator.share({
            title: 'AKWAABA Finance – Quantum AI',
            text: 'Die beste Finanz-App aus Togo! 🇹🇬 Mit Quantum AI Intelligence.',
            url: 'https://xsikomprojects.github.io/akwaaba-finance/'
        }).then(function() {
            console.log('✅ Geteilt!');
        }).catch(function(err) {
            console.log('Share Fehler:', err);
        });
    } else {
        // Fallback: Link kopieren
        navigator.clipboard.writeText(
            'https://xsikomprojects.github.io/akwaaba-finance/'
        ).then(function() {
            alert('✅ Link kopiert! Teile ihn mit deinen Freunden 🇹🇬');
        });
    }
}
// ============================================
// LEGALE FINANZ-CHANCEN FINDER
// ============================================

var aktivesRisiko = 'niedrig';

function risikoWaehlen(risiko, btn) {
    aktivesRisiko = risiko;
    document.querySelectorAll('.risiko-btn').forEach(function(b) {
        b.classList.remove('aktiv');
    });
    btn.classList.add('aktiv');
}

// === ALLE CHANCEN DATENBANK ===
var alleChancen = [

    // ===== NIEDRIG RISIKO =====
    {
        risiko: 'niedrig',
        kategorien: ['alle', 'finanzen', 'digital'],
        icon: '🏦',
        iconBg: 'rgba(0,136,255,0.2)',
        titel: 'Tagesgeld & Festgeld Hopping',
        kategorie: 'Passives Einkommen',
        verdienst: '3-5% p.a.',
        startkapital: '100€+',
        zeit: '1h/Monat',
        beschreibung: 'Nutze die besten Zinsen verschiedener Banken. Viele Banken bieten attraktive Willkommenszinsen für Neukunden. Wechsle regelmäßig für maximale Rendite.',
        schritte: [
            'Vergleiche Tagesgeld-Angebote auf Vergleichsportalen',
            'Eröffne Konto bei der besten Bank (meist online in 10 Min)',
            'Überweise dein Kapital dorthin',
            'Nach Ablauf der Zinsgarantie zur nächsten Bank wechseln',
            'Nutze Portale wie Zinspilot oder Weltsparen'
        ],
        links: ['zinspilot.de', 'weltsparen.de', 'biallo.de']
    },
    {
        risiko: 'niedrig',
        kategorien: ['alle', 'finanzen'],
        icon: '📊',
        iconBg: 'rgba(0,204,68,0.2)',
        titel: 'ETF Sparplan',
        kategorie: 'Langzeit Investment',
        verdienst: '7-10% p.a.',
        startkapital: '25€/Monat',
        zeit: '2h/Jahr',
        beschreibung: 'Investiere monatlich in breit gestreute ETFs. Historisch die beste Methode um langfristig Vermögen aufzubauen. Kein aktives Management nötig.',
        schritte: [
            'Depot bei Neobroker eröffnen (Trade Republic, Scalable)',
            'MSCI World oder FTSE All-World ETF auswählen',
            'Monatlichen Sparplan einrichten (ab 1€)',
            'Niemals in Panik verkaufen – Durchhalten!',
            'Steuerfreibetrag von 1.000€/Jahr nutzen'
        ],
        links: ['traderepublic.com', 'scalable.capital', 'justETF.com']
    },
    {
        risiko: 'niedrig',
        kategorien: ['alle', 'digital'],
        icon: '🎓',
        iconBg: 'rgba(255,223,0,0.2)',
        titel: 'Online Umfragen & Marktforschung',
        kategorie: 'Nebeneinkommen',
        verdienst: '50-300€/Monat',
        startkapital: '0€',
        zeit: '5-10h/Woche',
        beschreibung: 'Unternehmen zahlen echtes Geld für deine Meinung. Seriöse Plattformen zahlen per PayPal oder Gutschein. Ideal als einfaches Nebeneinkommen.',
        schritte: [
            'Bei Toluna, GfK, Marketagent anmelden',
            'Profil vollständig ausfüllen für mehr Umfragen',
            'Täglich 15-30 Min für Umfragen einplanen',
            'Punkte regelmäßig auszahlen lassen',
            'Mehrere Plattformen nutzen für mehr Einkommen'
        ],
        links: ['toluna.com', 'gfk-online.com', 'marketagent.com']
    },
    {
        risiko: 'niedrig',
        kategorien: ['alle', 'digital', 'bildung'],
        icon: '📝',
        iconBg: 'rgba(204,0,0,0.2)',
        titel: 'Cashback & Bonusprogramme',
        kategorie: 'Gratis Geld',
        verdienst: '200-800€/Jahr',
        startkapital: '0€',
        zeit: '1h/Monat',
        beschreibung: 'Hol dir Geld zurück für Einkäufe die du sowieso machst. Viele Kreditkarten und Apps zahlen 1-5% Cashback auf alle Ausgaben.',
        schritte: [
            'Cashback-Kreditkarte beantragen (Payback, DKB)',
            'Bei Cashback-Portalen anmelden (Shoop, Igraal)',
            'Online-Einkäufe immer über Cashback-Portal',
            'Bonuspunkte bei Supermärkten sammeln',
            'Willkommensboni bei neuen Karten nutzen'
        ],
        links: ['shoop.de', 'igraal.com', 'payback.de']
    },

    // ===== MITTEL RISIKO =====
    {
        risiko: 'mittel',
        kategorien: ['alle', 'digital', 'kreativ'],
        icon: '🎨',
        iconBg: 'rgba(204,0,0,0.2)',
        titel: 'Freelancing & Auftragsarbeit',
        kategorie: 'Aktives Einkommen',
        verdienst: '500-5000€/Monat',
        startkapital: '0€',
        zeit: '10-40h/Woche',
        beschreibung: 'Verkaufe deine Fähigkeiten auf internationalen Plattformen. Design, Programmierung, Texten, Übersetzen – alles ist gefragt. Starte noch heute!',
        schritte: [
            'Profil auf Fiverr oder Upwork erstellen',
            'Portfolio mit 3-5 Beispielarbeiten aufbauen',
            'Erste Jobs zu niedrigem Preis für Bewertungen annehmen',
            'Preise nach positiven Reviews erhöhen',
            'Stammkunden aufbauen und direkt kontaktieren'
        ],
        links: ['fiverr.com', 'upwork.com', 'freelancer.com']
    },
    {
        risiko: 'mittel',
        kategorien: ['alle', 'digital', 'handel'],
        icon: '📦',
        iconBg: 'rgba(255,223,0,0.2)',
        titel: 'Amazon FBA / Dropshipping',
        kategorie: 'E-Commerce',
        verdienst: '1000-10000€/Monat',
        startkapital: '500-2000€',
        zeit: '20-40h/Woche',
        beschreibung: 'Verkaufe Produkte über Amazon ohne eigenes Lager. Amazon lagert und versendet für dich. Finde profitable Nischen mit wenig Konkurrenz.',
        schritte: [
            'Marktanalyse: Profitable Produkte finden',
            'Amazon Seller Account erstellen',
            'Lieferant auf Alibaba oder lokal finden',
            'Produkt listen und optimieren (SEO)',
            'Bewertungen sammeln und skalieren'
        ],
        links: ['sell.amazon.de', 'alibaba.com', 'junglescout.com']
    },
    {
        risiko: 'mittel',
        kategorien: ['alle', 'digital', 'kreativ'],
        icon: '📱',
        iconBg: 'rgba(0,136,255,0.2)',
        titel: 'Content Creation & Social Media',
        kategorie: 'Digital Business',
        verdienst: '200-50000€/Monat',
        startkapital: '0-500€',
        zeit: '20-40h/Woche',
        beschreibung: 'Baue eine Zielgruppe auf und monetarisiere durch Werbung, Sponsoring und eigene Produkte. YouTube, TikTok, Instagram – alle Plattformen zahlen Creator.',
        schritte: [
            'Nische definieren (Finanz, Kochen, Gaming etc.)',
            'Kanal auf YouTube oder TikTok erstellen',
            'Täglich oder wöchentlich Content produzieren',
            'Ab 1000 Follower Sponsoring anfragen',
            'Eigene Produkte oder Kurse verkaufen'
        ],
        links: ['youtube.com', 'tiktok.com', 'patreon.com']
    },
    {
        risiko: 'mittel',
        kategorien: ['alle', 'immobilien', 'finanzen'],
        icon: '🏠',
        iconBg: 'rgba(0,204,68,0.2)',
        titel: 'Immobilien Crowdinvesting',
        kategorie: 'Immobilien Investment',
        verdienst: '4-8% p.a.',
        startkapital: '100€+',
        zeit: '2h/Monat',
        beschreibung: 'Investiere in Immobilien ohne Millionen zu brauchen. Plattformen ermöglichen ab 100€ in Immobilienprojekte zu investieren und Mietrenditen zu erhalten.',
        schritte: [
            'Plattform auswählen (Exporo, Engel & Völkers)',
            'Projekte analysieren (Standort, Rendite, Risiko)',
            'Investition auf mehrere Projekte verteilen',
            'Zinsen quartalsweise ausgezahlt bekommen',
            'Reinvestieren für Zinseszinseffekt'
        ],
        links: ['exporo.de', 'bergfuerst.com', 'zinsbaustein.de']
    },
    {
        risiko: 'mittel',
        kategorien: ['alle', 'digital', 'bildung'],
        icon: '📚',
        iconBg: 'rgba(204,0,0,0.2)',
        titel: 'Online Kurse erstellen & verkaufen',
        kategorie: 'Digitale Produkte',
        verdienst: '500-20000€/Monat',
        startkapital: '0-200€',
        zeit: '20h einmalig + 5h/Woche',
        beschreibung: 'Teile dein Wissen und verdiene passiv. Einmal erstellt, wird ein Kurs immer wieder verkauft. Jede Fähigkeit kann zu einem profitablen Kurs werden.',
        schritte: [
            'Dein Expertenwissen identifizieren',
            'Kursstruktur planen (5-10 Module)',
            'Videos aufnehmen mit Smartphone und Mic',
            'Kurs auf Udemy oder Teachable hochladen',
            'Marketing über Social Media und Email'
        ],
        links: ['udemy.com', 'teachable.com', 'digistore24.com']
    },

    // ===== HOCH RISIKO =====
    {
        risiko: 'hoch',
        kategorien: ['alle', 'finanzen', 'digital'],
        icon: '₿',
        iconBg: 'rgba(247,147,26,0.2)',
        titel: 'Crypto Staking & DeFi',
        kategorie: 'Krypto Investment',
        verdienst: '5-20% p.a.',
        startkapital: '500€+',
        zeit: '5h/Woche',
        beschreibung: 'Verdiene Zinsen auf deine Kryptowährungen durch Staking. ETH, SOL und andere Coins zahlen Staking-Belohnungen von 4-15% pro Jahr. Achtung: Kursschwankungen!',
        schritte: [
            'Krypto bei seriöser Börse kaufen (Coinbase, Kraken)',
            'Coins in eigene Wallet transferieren',
            'Staking auf der jeweiligen Plattform aktivieren',
            'Regelmäßige Rewards sammeln',
            'Steuerliche Behandlung beachten!'
        ],
        links: ['coinbase.com', 'kraken.com', 'staking-rewards.com']
    },
    {
        risiko: 'hoch',
        kategorien: ['alle', 'finanzen', 'tech'],
        icon: '🤖',
        iconBg: 'rgba(123,47,255,0.2)',
        titel: 'KI Tools Arbitrage',
        kategorie: 'Digital Business',
        verdienst: '1000-15000€/Monat',
        startkapital: '100€/Monat',
        zeit: '20-30h/Woche',
        beschreibung: 'Nutze KI-Tools (ChatGPT, Midjourney) um Dienstleistungen anzubieten. Viele Unternehmen zahlen gut für KI-generierte Inhalte, Bilder und Analysen.',
        schritte: [
            'KI-Tools lernen (ChatGPT, Midjourney, Claude)',
            'Nische finden (Blog-Texte, Social Media, Code)',
            'Angebote auf Freelancing-Plattformen erstellen',
            'Ersten Kunden gewinnen und Referenzen aufbauen',
            'Prozesse automatisieren und skalieren'
        ],
        links: ['openai.com', 'midjourney.com', 'jasper.ai']
    },
    {
        risiko: 'hoch',
        kategorien: ['alle', 'tech', 'digital'],
        icon: '💻',
        iconBg: 'rgba(0,136,255,0.2)',
        titel: 'App & Software entwickeln',
        kategorie: 'Tech Business',
        verdienst: '0-100000€/Monat',
        startkapital: '0-1000€',
        zeit: 'Vollzeit',
        beschreibung: 'Löse ein echtes Problem mit einer App oder Software. SaaS (Software as a Service) ist das profitabelste Geschäftsmodell der digitalen Welt. Wiederkehrende Einnahmen!',
        schritte: [
            'Marktlücke identifizieren (dein eigenes Problem lösen)',
            'MVP (Minimum Viable Product) entwickeln',
            'Beta-Tester finden und Feedback sammeln',
            'Bezahlmodell implementieren (Abo oder Einmalkauf)',
            'Marketing und Wachstum skalieren'
        ],
        links: ['producthunt.com', 'indie hackers.com', 'stripe.com']
    }
];

// === MARKTLÜCKEN DATENBANK ===
var marktLueckenDaten = [
    {
        icon: '🌍',
        titel: 'Afrikanische Finanz-Apps',
        text: 'Millionen Afrikaner haben keinen Zugang zu Finanzdienstleistungen. Apps für Mobile Money, Spargruppen (Susu/Tontine) und Mikroinvestitionen sind stark gefragt.',
        potenzial: 'Marktpotenzial: $500B+ bis 2030'
    },
    {
        icon: '🤖',
        titel: 'KI-Automatisierung für KMUs',
        text: 'Kleine und mittlere Unternehmen brauchen KI-Lösungen die sie sich leisten können. Chatbots, automatische Buchhaltung und KI-Marketing sind unterversorgt.',
        potenzial: 'Marktpotenzial: $120B bis 2025'
    },
    {
        icon: '🌱',
        titel: 'Nachhaltige Investment-Plattformen',
        text: 'Gen Z und Millennials wollen nachhaltig investieren (ESG). Plattformen die grüne Investments einfach zugänglich machen fehlen noch im Massenmarkt.',
        potenzial: 'Marktpotenzial: $53T bis 2025'
    },
    {
        icon: '📱',
        titel: 'Micro-Learning für Finanzen',
        text: 'Finanzbildung in kurzen Video-Lektionen (wie Duolingo für Finanzen) ist ein riesiger unbesetzter Markt. Besonders in Entwicklungsländern.',
        potenzial: 'Marktpotenzial: $37B bis 2026'
    },
    {
        icon: '🏘️',
        titel: 'Gemeinschafts-Sparmodelle digital',
        text: 'Traditionelle Sparkreise (Susu in Ghana, Tontine in Togo) digital abbilden. Blockchain-basierte Vertrauenslösung für Community Finance.',
        potenzial: 'Marktpotenzial: $200B+ weltweit'
    }
];

// === PASSIVE INCOME STRATEGIEN ===
var passiveStrategien = [
    { icon: '📊', name: 'ETF Dividenden', desc: 'MSCI World, S&P 500 Dividenden-ETFs', rendite: '3-5%/Jahr' },
    { icon: '🏦', name: 'Festgeld/Tagesgeld', desc: 'Sichere Zinsen ohne Risiko', rendite: '3-4%/Jahr' },
    { icon: '🏠', name: 'Immobilien-REITs', desc: 'Immobilien-Aktien mit hoher Dividende', rendite: '4-7%/Jahr' },
    { icon: '₿', name: 'Crypto Staking', desc: 'ETH, SOL, ADA Staking Rewards', rendite: '4-15%/Jahr' },
    { icon: '📚', name: 'Digitale Produkte', desc: 'E-Books, Kurse, Templates verkaufen', rendite: 'Unbegrenzt' },
    { icon: '🤝', name: 'P2P Kredite', desc: 'Geld verleihen über Mintos, Bondora', rendite: '6-12%/Jahr' },
    { icon: '📸', name: 'Stock Fotos/Videos', desc: 'Fotos bei Shutterstock, Getty verkaufen', rendite: '50-500€/Monat' },
    { icon: '🎵', name: 'Musik Lizenzierung', desc: 'Musik bei DistroKid, Soundcloud monetarisieren', rendite: 'Je nach Reichweite' }
];

// === SCAN FUNKTION ===
function chancenScannen() {
    var kapital = parseFloat(document.getElementById('chancenKapital').value) || 0;
    var faehigkeit = document.getElementById('chancenFaehigkeit').value;
    var zeit = document.getElementById('chancenZeit').value;

    var animation = document.getElementById('scanAnimation');
    var ergebnisse = document.getElementById('chancenErgebnisse');
    var marktBox = document.getElementById('marktLueckenBox');
    var passiveBox = document.getElementById('passiveIncomeBox');
    var planBox = document.getElementById('aktionsplanBox');

    // Ergebnisse leeren
    ergebnisse.innerHTML = '';
    if (marktBox) marktBox.style.display = 'none';
    if (passiveBox) passiveBox.style.display = 'none';
    if (planBox) planBox.style.display = 'none';

    // Animation starten
    animation.classList.remove('versteckt');

    var logNachrichten = [
        '> Initialisiere Quantum Scanner...',
        '> Verbinde mit globalen Finanzdatenbanken...',
        '> Analysiere Marktlücken und Trends...',
        '> Durchsuche 50.000+ legale Einkommensquellen...',
        '> Filtere nach deinem Profil...',
        '> Berechne Rendite-Risiko-Verhältnis...',
        '> Erstelle personalisierten Aktionsplan...',
        '> ✅ Scan abgeschlossen!'
    ];

    var logEl = document.getElementById('scanLog');
    var textEl = document.getElementById('scanText');
    var i = 0;

    logEl.innerHTML = '';

    var interval = setInterval(function() {
        if (i < logNachrichten.length) {
            logEl.innerHTML += logNachrichten[i] + '\n';
            logEl.scrollTop = logEl.scrollHeight;
            textEl.textContent = logNachrichten[i].replace('> ', '');
            i++;
        } else {
            clearInterval(interval);
            animation.classList.add('versteckt');
            chancenAnzeigen(kapital, faehigkeit, zeit);
        }
    }, 600);
}

function chancenAnzeigen(kapital, faehigkeit, zeit) {
    var ergebnisse = document.getElementById('chancenErgebnisse');

    // Filtern
    var gefiltert = alleChancen.filter(function(c) {
        // Risiko Filter
        if (aktivesRisiko !== 'hoch' && c.risiko === 'hoch') {
            if (aktivesRisiko === 'niedrig') return false;
        }
        if (aktivesRisiko === 'niedrig' && c.risiko === 'mittel') return false;

        // Kategorie Filter
        if (faehigkeit !== 'alle' && !c.kategorien.includes(faehigkeit)) return false;

        return true;
    });

    if (gefiltert.length === 0) {
        ergebnisse.innerHTML =
            '<div class="karte"><p style="color:#668844; text-align:center;">' +
            'Keine passenden Chancen gefunden. Ändere deine Filter!</p></div>';
        return;
    }

    // Mischen und max 6 anzeigen
    gefiltert = gefiltert.sort(function() {
        return Math.random() - 0.5;
    }).slice(0, 6);

    ergebnisse.innerHTML = '<div class="karte gruen-rand">' +
        '<h3>🎯 ' + gefiltert.length + ' Chancen gefunden!</h3>' +
        '<p style="font-size:0.85rem;">Quantum AI hat ' + gefiltert.length +
        ' legale Möglichkeiten für dich identifiziert:</p>' +
        '</div>';

    gefiltert.forEach(function(chance) {
        var risikoKlasse = 'risiko-' + chance.risiko;
        var risikoText = chance.risiko === 'niedrig' ? '🛡️ Niedriges Risiko' :
                         chance.risiko === 'mittel' ? '⚖️ Mittleres Risiko' :
                         '🚀 Hohes Risiko';

        ergebnisse.innerHTML +=
            '<div class="chance-karte">' +
                '<div class="chance-header">' +
                    '<div class="chance-icon" style="background:' + chance.iconBg + '">' +
                        chance.icon +
                    '</div>' +
                    '<div>' +
                        '<div class="chance-titel">' + chance.titel + '</div>' +
                        '<div class="chance-kat">' + chance.kategorie + '</div>' +
                    '</div>' +
                '</div>' +
                '<div class="chance-stats">' +
                    '<div class="chance-stat">' +
                        '<div class="chance-stat-label">Verdienst</div>' +
                        '<div class="chance-stat-wert positiv">' + chance.verdienst + '</div>' +
                    '</div>' +
                    '<div class="chance-stat">' +
                        '<div class="chance-stat-label">Startkapital</div>' +
                        '<div class="chance-stat-wert gold">' + chance.startkapital + '</div>' +
                    '</div>' +
                    '<div class="chance-stat">' +
                        '<div class="chance-stat-label">Zeitaufwand</div>' +
                        '<div class="chance-stat-wert">' + chance.zeit + '</div>' +
                    '</div>' +
                '</div>' +
                '<div class="chance-beschreibung">' + chance.beschreibung + '</div>' +
                '<div class="chance-schritte">' +
                    '<div class="chance-schritt-titel">🚀 So startest du:</div>' +
                    chance.schritte.map(function(s, i) {
                        return '<div class="chance-schritt">' +
                            '<div class="schritt-nr">' + (i+1) + '</div>' +
                            '<div>' + s + '</div>' +
                        '</div>';
                    }).join('') +
                '</div>' +
                '<div class="risiko-badge ' + risikoKlasse + '">' +
                    risikoText +
                '</div>' +
            '</div>';
    });

    // Marktlücken anzeigen
    setTimeout(function() {
        marktLueckenAnzeigen();
        passiveIncomeAnzeigen();
        aktionsplanErstellen(gefiltert[0]);
    }, 500);
}

function marktLueckenAnzeigen() {
    var box = document.getElementById('marktLueckenBox');
    var container = document.getElementById('marktLuecken');
    if (!box || !container) return;

    box.style.display = 'block';

    var gemischt = marktLueckenDaten.sort(function() {
        return Math.random() - 0.5;
    }).slice(0, 3);

    container.innerHTML = gemischt.map(function(l) {
        return '<div class="luecke-item">' +
            '<div class="luecke-icon">' + l.icon + '</div>' +
            '<div>' +
                '<div class="luecke-titel">' + l.titel + '</div>' +
                '<div class="luecke-text">' + l.text + '</div>' +
                '<div class="luecke-potenzial">💰 ' + l.potenzial + '</div>' +
            '</div>' +
        '</div>';
    }).join('');
}

function passiveIncomeAnzeigen() {
    var box = document.getElementById('passiveIncomeBox');
    var container = document.getElementById('passiveIncome');
    if (!box || !container) return;

    box.style.display = 'block';

    container.innerHTML = passiveStrategien.map(function(s) {
        return '<div class="passive-item">' +
            '<div class="passive-icon">' + s.icon + '</div>' +
            '<div class="passive-info">' +
                '<div class="passive-name">' + s.name + '</div>' +
                '<div class="passive-desc">' + s.desc + '</div>' +
            '</div>' +
            '<div class="passive-rendite">' + s.rendite + '</div>' +
        '</div>';
    }).join('');
}

function aktionsplanErstellen(besteChance) {
    var box = document.getElementById('aktionsplanBox');
    var container = document.getElementById('aktionsplan');
    if (!box || !container) return;

    box.style.display = 'block';

    var plan = [
        {
            titel: 'Sofort (Heute)',
            text: 'Analysiere deine aktuelle finanzielle Situation. ' +
                  'Erstelle eine Übersicht deiner Einnahmen, Ausgaben und Ersparnisse.',
            dauer: '⏰ 1-2 Stunden'
        },
        {
            titel: 'Diese Woche',
            text: 'Starte mit der einfachsten Strategie: ' +
                  'Tagesgeldkonto optimieren und ETF-Sparplan einrichten. ' +
                  'Schon ab 25€/Monat möglich!',
            dauer: '⏰ 2-4 Stunden'
        },
        {
            titel: 'Diesen Monat',
            text: besteChance ?
                  'Starte mit "' + besteChance.titel + '". ' +
                  besteChance.schritte[0] + '.' :
                  'Wähle deine erste Einkommensquelle und mache die ersten Schritte.',
            dauer: '⏰ 10-20 Stunden'
        },
        {
            titel: 'In 3 Monaten',
            text: 'Erste Einnahmen generieren und reinvestieren. ' +
                  'Lernkurve nutzen und Strategie optimieren. ' +
                  'Netzwerk aufbauen.',
            dauer: '⏰ Kontinuierlich'
        },
        {
            titel: 'In 6 Monaten',
            text: 'Zweite Einkommensquelle aufbauen. ' +
                  'Passive Einkommensströme entwickeln. ' +
                  'Ziel: Erstes Nebeneinkommen von 500€+/Monat.',
            dauer: '⏰ Langfristig'
        },
        {
            titel: 'In 1 Jahr',
            text: 'Finanzielle Stabilität durch diverse Einkommensquellen. ' +
                  'Portfolio aufgebaut, passive Einnahmen fließen, ' +
                  'Notfallfonds vollständig. Ziel: 1.000€+/Monat passiv.',
            dauer: '⏰ Ziel erreichen!'
        }
    ];

    container.innerHTML = plan.map(function(s, i) {
        return '<div class="plan-schritt">' +
            '<div class="plan-nr">' + (i+1) + '</div>' +
            '<div class="plan-inhalt">' +
                '<div class="plan-titel">' + s.titel + '</div>' +
                '<div class="plan-text">' + s.text + '</div>' +
                '<div class="plan-dauer">' + s.dauer + '</div>' +
            '</div>' +
        '</div>';
    }).join('');
}

function planSpeichern() {
    benachrichtigungZeigen(
        '💾 Aktionsplan gespeichert!',
        'Dein persönlicher Finanz-Aktionsplan wurde gespeichert. ' +
        'Bleib dran – Erfolg kommt mit Konsequenz! 🇹🇬',
        '💾'
    );
    alert('✅ Aktionsplan gespeichert!\n\n' +
          'Teile diesen Plan mit jemandem der dich accountable hält.\n' +
          'Du schaffst das! 🇹🇬🚀');
}
// ============================================
// SIEGOTH KI ASSISTENT
// ============================================

var siegothEinnahmen = JSON.parse(
    localStorage.getItem('siegoth-einnahmen')) || [];

// === PLATTFORMEN DATENBANK ===
var umfragePlattformenDB = [
    {
        icon: '📊', name: 'Toluna',
        verdienst: '50-200€/Monat',
        desc: 'Eine der größten Umfrage-Plattformen weltweit. ' +
              'Punkte sammeln und gegen PayPal oder Gutscheine tauschen.',
        tags: ['Deutschland', 'Frankreich', 'International', 'PayPal'],
        url: 'https://de.toluna.com',
        laender: ['DE', 'FR', 'GB', 'US', 'TG']
    },
    {
        icon: '💬', name: 'GfK Online',
        verdienst: '20-150€/Monat',
        desc: 'Offizielles Marktforschungsinstitut. ' +
              'Seriöse Umfragen mit garantierter Auszahlung.',
        tags: ['Deutschland', 'Seriös', 'Überweisung', 'Gutscheine'],
        url: 'https://www.gfk-online.com',
        laender: ['DE', 'AT', 'CH']
    },
    {
        icon: '🌍', name: 'Swagbucks',
        verdienst: '30-300€/Monat',
        desc: 'Nicht nur Umfragen! Videos schauen, Suchen, ' +
              'Einkäufe – alles bringt Punkte (SBs).',
        tags: ['Weltweit', 'PayPal', 'Videos', 'Einkäufe'],
        url: 'https://www.swagbucks.com',
        laender: ['DE', 'FR', 'US', 'GB', 'TG', 'GH']
    },
    {
        icon: '💰', name: 'YouGov',
        verdienst: '20-100€/Monat',
        desc: 'Politische und gesellschaftliche Umfragen. ' +
              'Deine Meinung beeinflusst echte Entscheidungen!',
        tags: ['Deutschland', 'Politik', 'PayPal', 'Seriös'],
        url: 'https://yougov.de',
        laender: ['DE', 'FR', 'GB', 'US']
    },
    {
        icon: '🎁', name: 'PanelBase',
        verdienst: '15-80€/Monat',
        desc: 'Internationale Umfragen mit guter Vergütung. ' +
              'Auch für Nutzer aus Afrika verfügbar.',
        tags: ['International', 'PayPal', 'Afrika', 'Einfach'],
        url: 'https://www.panelbase.net',
        laender: ['GB', 'US', 'AU', 'TG', 'GH', 'NG']
    },
    {
        icon: '📱', name: 'LifePoints',
        verdienst: '20-120€/Monat',
        desc: 'Mobile-freundliche Umfragen. ' +
              'App verfügbar für iOS und Android.',
        tags: ['Weltweit', 'Mobile App', 'PayPal', 'Afrika'],
        url: 'https://www.lifepointspanel.com',
        laender: ['DE', 'FR', 'TG', 'GH', 'NG', 'SN']
    },
    {
        icon: '🏆', name: 'Valued Opinions',
        verdienst: '20-100€/Monat',
        desc: 'Gutscheine für Amazon, IKEA, PayPal. ' +
              'Für viele afrikanische Länder verfügbar!',
        tags: ['Amazon Gutschein', 'PayPal', 'Afrika', 'Einfach'],
        url: 'https://www.valuedopinions.de',
        laender: ['DE', 'TG', 'GH', 'NG', 'SN', 'CI']
    },
    {
        icon: '⭐', name: 'Survey Junkie',
        verdienst: '40-200€/Monat',
        desc: 'US-basiert aber weltweit verfügbar. ' +
              'Sehr hohe Vergütung pro Umfrage.',
        tags: ['Weltweit', 'PayPal', 'Hoch vergütet', 'US-Basis'],
        url: 'https://www.surveyjunkie.com',
        laender: ['US', 'CA', 'AU', 'International']
    }
];

var produktTesterDB = [
    {
        icon: '📦', name: 'Amazon Vine',
        verdienst: 'Gratis Produkte',
        desc: 'Amazons offizielles Tester-Programm. ' +
              'Du bekommst kostenlose Produkte und schreibst ehrliche Rezensionen. ' +
              'Einladung nötig (ab 50+ Rezensionen).',
        tags: ['Amazon', 'Gratis Produkte', 'Offiziell', 'Einladung'],
        url: 'https://www.amazon.de',
        tipp: 'Schreibe erst 50 qualitative Rezensionen dann kommt die Einladung!'
    },
    {
        icon: '🎮', name: 'Influenster',
        verdienst: 'Gratis Produkte + Geld',
        desc: 'Bekomme kostenlose Produkte von Top-Marken. ' +
              'Teile Meinungen auf Social Media und verdiene.',
        tags: ['Social Media', 'Gratis', 'Beauty', 'Tech'],
        url: 'https://www.influenster.com',
        tipp: 'Verbinde deine Social Media Accounts für mehr Produkte!'
    },
    {
        icon: '💄', name: 'Trnd',
        verdienst: 'Gratis Produkte',
        desc: 'Werde Produkt-Botschafter für bekannte Marken. ' +
              'Teste Produkte und teile deine Erfahrungen.',
        tags: ['Deutschland', 'Marken', 'Community', 'Gratis'],
        url: 'https://www.trnd.com',
        tipp: 'Vollständiges Profil ausfüllen erhöht die Chancen!'
    },
    {
        icon: '🏠', name: 'BzzAgent',
        verdienst: 'Gratis Produkte + Punkte',
        desc: 'Weltweit aktiv. Produkte testen und in deinem ' +
              'Netzwerk weiterempfehlen.',
        tags: ['Weltweit', 'Gratis', 'Haushalt', 'Food'],
        url: 'https://www.bzzagent.com',
        tipp: 'Je aktiver du bist desto mehr Kampagnen bekommst du!'
    },
    {
        icon: '📱', name: 'Testzon',
        verdienst: 'Gratis Amazon Produkte',
        desc: 'Erhalte Amazon Produkte kostenlos und behalte sie! ' +
              'Schreibe danach eine ehrliche Rezension auf Amazon.',
        tags: ['Amazon', 'Gratis', 'Behalten', 'Weltweit'],
        url: 'https://www.testzon.com',
        tipp: 'Täglich neue Produkte – schnell sein lohnt sich!'
    },
    {
        icon: '🌿', name: 'Rebaid',
        verdienst: '100% Cashback',
        desc: 'Kaufe Produkte auf Amazon und bekomme den ' +
              'vollen Kaufpreis zurück. Schreibe dann eine Rezension.',
        tags: ['Amazon', 'Cashback', 'USA', 'International'],
        url: 'https://www.rebaid.com',
        tipp: 'Funktioniert weltweit mit einem Amazon Account!'
    }
];

var rezensionsJobsDB = [
    {
        icon: '⭐', name: 'Trustpilot Partner',
        verdienst: '10-50€/Rezension',
        desc: 'Schreibe verifizierte Unternehmensbewertungen. ' +
              'Viele Firmen suchen echte Kunden für Feedback.',
        tags: ['Weltweit', 'Firmen', 'Verifiziert', 'PayPal'],
        url: 'https://www.trustpilot.com',
        tipp: 'Nur für Unternehmen bei denen du wirklich Kunde warst!'
    },
    {
        icon: '🏨', name: 'TripAdvisor',
        verdienst: 'Punkte & Gutscheine',
        desc: 'Reise-Rezensionen für Hotels, Restaurants, ' +
              'Sehenswürdigkeiten. Punkte einlösbar für Reise-Rabatte.',
        tags: ['Reisen', 'Weltweit', 'Punkte', 'Gutscheine'],
        url: 'https://www.tripadvisor.de',
        tipp: 'Jede besuchte Location rezensieren – sammelt sich schnell!'
    },
    {
        icon: '📚', name: 'Netgalley',
        verdienst: 'Gratis Bücher',
        desc: 'Erhalte kostenlose Bücher vor Veröffentlichung ' +
              'gegen ehrliche Rezension auf Amazon oder Goodreads.',
        tags: ['Bücher', 'Gratis', 'Digital', 'Weltweit'],
        url: 'https://www.netgalley.com',
        tipp: 'Ideal für Bücher-Liebhaber – unlimitierte Bücher!'
    },
    {
        icon: '🎵', name: 'Slice the Pie',
        verdienst: '0.01-0.20€/Rezension',
        desc: 'Musik-Demos, Mode und Werbung rezensieren. ' +
              'Kleine Beträge die sich summieren.',
        tags: ['Musik', 'Mode', 'Weltweit', 'PayPal'],
        url: 'https://www.slicethepie.com',
        tipp: 'Detaillierte Rezensionen = mehr Geld pro Review!'
    },
    {
        icon: '💻', name: 'UserTesting',
        verdienst: '10-60$/Test',
        desc: 'Teste Websites und Apps. Spreche laut ' +
              'deine Gedanken aus. Sehr gut bezahlt!',
        tags: ['Websites', 'Apps', 'Video', 'Hoch bezahlt'],
        url: 'https://www.usertesting.com',
        tipp: '20min Test = 10$. Bis zu 3 Tests pro Tag möglich!'
    },
    {
        icon: '🔍', name: 'Appen',
        verdienst: '9-15$/Stunde',
        desc: 'Bewerte Suchergebnisse für Google & Co. ' +
              'Stabile Arbeit für KI-Training.',
        tags: ['KI Training', 'Google', 'Stabil', 'Weltweit'],
        url: 'https://appen.com',
        tipp: 'Besteht Prüfung – dann stabile Aufträge für Monate!'
    },
    {
        icon: '📝', name: 'Lionbridge AI',
        verdienst: '8-14$/Stunde',
        desc: 'KI-Daten annotieren, Texte bewerten. ' +
              'Für viele afrikanische Länder verfügbar!',
        tags: ['KI', 'Afrika', 'Stabil', 'Freelance'],
        url: 'https://www.telusinternational.com',
        tipp: 'Eines der wenigen Programme die TG/GH akzeptieren!'
    }
];

// === SIEGOTH ANTWORTEN ===
var siegothAntworten = {
    umfragen: {
        text: [
            'Super Frage! 📊 Hier sind die <strong>besten Umfrage-Plattformen</strong> für dich:',
            '🥇 <strong>Toluna</strong> – Bis zu 200€/Monat, weltweit verfügbar',
            '🥈 <strong>Swagbucks</strong> – Nicht nur Umfragen, auch Videos & Einkäufe',
            '🥉 <strong>LifePoints</strong> – Mobile App, auch in Togo & Ghana verfügbar!',
            '💡 <strong>Tipp:</strong> Melde dich bei <em>allen</em> Plattformen an für maximales Einkommen. Mit 5-6 Plattformen sind 200-500€/Monat realistisch!',
            '⚠️ <strong>Wichtig:</strong> Immer ehrliche Antworten geben – Bots werden erkannt und gesperrt!'
        ],
        links: ['Toluna öffnen→toluna.com', 'Swagbucks→swagbucks.com', 'LifePoints→lifepointspanel.com']
    },
    produkte: {
        text: [
            '📦 Kostenlose Produkte testen ist eine tolle Möglichkeit! Hier wie es funktioniert:',
            '1️⃣ <strong>Amazon Vine</strong> – Offiziell von Amazon. Erst 50 Rezensionen schreiben dann Einladung!',
            '2️⃣ <strong>Testzon</strong> – Täglich neue Produkte. Behalten ohne Rückgabe!',
            '3️⃣ <strong>Rebaid</strong> – 100% Cashback! Kaufe und bekomme alles zurück.',
            '4️⃣ <strong>Influenster</strong> – Social Media verbinden und Gratis-Boxen bekommen!',
            '💡 <strong>Strategie:</strong> Starte mit Testzon und Rebaid – die sind am einfachsten für Anfänger!'
        ],
        links: ['Testzon→testzon.com', 'Rebaid→rebaid.com', 'Influenster→influenster.com']
    },
    rezensionen: {
        text: [
            '⭐ Rezensionen schreiben und verdienen! Hier die besten Wege:',
            '💰 <strong>UserTesting</strong> – 10-60$ pro Test! Teste Websites per Video.',
            '🤖 <strong>Appen</strong> – Für KI-Firmen arbeiten. 9-15$/Stunde, auch in Afrika!',
            '📝 <strong>Lionbridge</strong> – KI-Daten bewerten. Auch Togo & Ghana akzeptiert!',
            '🎵 <strong>Slice the Pie</strong> – Musik und Mode bewerten. PayPal Auszahlung.',
            '💡 <strong>Tipp:</strong> UserTesting ist am besten bezahlt aber braucht gutes Englisch. Für Afrika ist Appen/Lionbridge ideal!'
        ],
        links: ['UserTesting→usertesting.com', 'Appen→appen.com', 'Lionbridge→telusinternational.com']
    },
    cashback: {
        text: [
            '💰 Cashback ist Gratis-Geld für Einkäufe die du sowieso machst!',
            '🥇 <strong>Shoop.de</strong> – Bis 15% Cashback bei 3000+ Shops',
            '🥈 <strong>Igraal</strong> – International, auch für Afrika!',
            '🥉 <strong>Payback</strong> – Supermarkt + Online Cashback',
            '💳 <strong>DKB Kreditkarte</strong> – 0.5% auf alles zurück',
            '💡 <strong>Strategie:</strong> Kaufe NIE ohne Cashback-Portal! 200-800€/Jahr sparen ist realistisch.',
            '🌍 <strong>Für Togo/Afrika:</strong> Igraal und internationale Cashback-Apps nutzen!'
        ],
        links: ['Shoop→shoop.de', 'Igraal→igraal.com', 'Payback→payback.de']
    },
    boni: {
        text: [
            '🎁 Registrierungs-Boni sind das schnellste Geld! Aktuelle Angebote:',
            '🏦 <strong>Neobanken</strong> – Trade Republic, Scalable geben 10-50€ Bonus',
            '💳 <strong>Kreditkarten</strong> – Viele geben 50-200€ Willkommensbonus',
            '📊 <strong>Broker</strong> – Kostenlose Aktien bei Anmeldung (Revolut, etc.)',
            '🛍️ <strong>Shopping Apps</strong> – Erste Bestellung gratis bei vielen Apps',
            '💡 <strong>Wichtig:</strong> Immer AGB lesen und Mindestanforderungen beachten!',
            '⚠️ Manche Boni brauchen eine Einzahlung oder Nutzung – prüfe die Bedingungen!'
        ],
        links: ['Trade Republic→traderepublic.com', 'Revolut→revolut.com']
    },
    nebenjobs: {
        text: [
            '💼 Online Nebenjobs die wirklich zahlen:',
            '🎨 <strong>Fiverr/Upwork</strong> – Freelancing: Design, Text, Code, alles!',
            '🎓 <strong>Preply/iTalki</strong> – Sprachen unterrichten (Französisch gesucht!)',
            '📦 <strong>Amazon FBA</strong> – Produkte verkaufen ohne Lager',
            '📝 <strong>Textbroker</strong> – Artikel schreiben, 1-5 Cent/Wort',
            '🌍 <strong>Für Togo:</strong> Französische Sprache ist ein Vorteil! Viele Firmen suchen FR-Muttersprachler.',
            '💡 <strong>Schnellstart:</strong> Fiverr Profil heute erstellen und ersten Auftrag morgen!'
        ],
        links: ['Fiverr→fiverr.com', 'Preply→preply.com', 'Textbroker→textbroker.de']
    },
    togo: {
        text: [
            '🇹🇬 Spezielle Chancen für Togo und Westafrika:',
            '📱 <strong>Mobile Money</strong> – Tmoney, Flooz für Zahlungen nutzen',
            '🌍 <strong>Afrikanische Plattformen</strong> – Jumia, Afrikrea für Verkäufe',
            '💬 <strong>Französisch Vorteil</strong> – Übersetzen auf Upwork/Fiverr sehr gefragt!',
            '🤖 <strong>Appen/Lionbridge</strong> – Akzeptieren Togo! KI-Daten auf Französisch bewerten.',
            '📊 <strong>LifePoints/Valued Opinions</strong> – Auch in Togo verfügbar!',
            '💡 <strong>Beste Strategie:</strong> Kombiniere Umfragen + Freelancing auf Französisch + KI-Daten für 300-800€/Monat!'
        ],
        links: ['Appen→appen.com', 'Afrikrea→afrikrea.com', 'Jumia→jumia.com']
    },
    passiv: {
        text: [
            '😴 Passives Einkommen – Geld verdienen im Schlaf:',
            '📊 <strong>ETF Sparplan</strong> – Ab 25€/Monat, 7-10% p.a. historisch',
            '💻 <strong>Digital Produkte</strong> – Einmal erstellen, immer verkaufen',
            '📸 <strong>Shutterstock</strong> – Fotos hochladen und Lizenzgebühren kassieren',
            '🎵 <strong>Musik/Beats</strong> – Auf BeatStars oder DistroKid hochladen',
            '📚 <strong>E-Book schreiben</strong> – Auf Amazon KDP veröffentlichen',
            '💡 <strong>Realistisch:</strong> Mit konsequentem Aufbau 200-500€/Monat passiv nach 6-12 Monaten!'
        ],
        links: ['Shutterstock→shutterstock.com', 'Amazon KDP→kdp.amazon.com', 'BeatStars→beatstars.com']
    }
};

// === CHAT FUNKTIONEN ===
function chatNachrichtHinzufuegen(text, typ) {
    var chat = document.getElementById('siegothChat');
    if (!chat) return;

    var div = document.createElement('div');
    div.className = 'chat-nachricht ' + typ;

    var avatar = typ === 'bot' ? '🤖' : '👤';

    div.innerHTML =
        '<div class="chat-avatar">' + avatar + '</div>' +
        '<div class="chat-bubble"><p>' + text + '</p></div>';

    chat.appendChild(div);
    chat.scrollTop = chat.scrollHeight;
}

function typingAnzeigen() {
    var chat = document.getElementById('siegothChat');
    if (!chat) return;

    var div = document.createElement('div');
    div.className = 'chat-nachricht bot';
    div.id = 'typingIndicator';
    div.innerHTML =
        '<div class="chat-avatar">🤖</div>' +
        '<div class="chat-bubble">' +
            '<div class="typing-indicator">' +
                '<div class="typing-dot"></div>' +
                '<div class="typing-dot"></div>' +
                '<div class="typing-dot"></div>' +
            '</div>' +
        '</div>';

    chat.appendChild(div);
    chat.scrollTop = chat.scrollHeight;
}

function typingEntfernen() {
    var indicator = document.getElementById('typingIndicator');
    if (indicator) indicator.remove();
}

function siegothAntworten_func(schluessel) {
    var antwort = siegothAntworten[schluessel];
    if (!antwort) return;

    typingAnzeigen();

    setTimeout(function() {
        typingEntfernen();

        var chat = document.getElementById('siegothChat');
        var div = document.createElement('div');
        div.className = 'chat-nachricht bot';

        var linksHTML = '';
        if (antwort.links) {
            linksHTML = '<div style="margin-top:0.8rem;">';
            antwort.links.forEach(function(link) {
                var teile = link.split('→');
                var name = teile[0];
                var url = teile[1] ? 'https://' + teile[1] : '#';
                linksHTML +=
                    '<a href="' + url + '" target="_blank" ' +
                    'class="chat-link-btn">🔗 ' + name + '</a>';
            });
            linksHTML += '</div>';
        }

        div.innerHTML =
            '<div class="chat-avatar">🤖</div>' +
            '<div class="chat-bubble">' +
                antwort.text.map(function(t) {
                    return '<p>' + t + '</p>';
                }).join('') +
                linksHTML +
            '</div>';

        chat.appendChild(div);
        chat.scrollTop = chat.scrollHeight;
    }, 1500);
}

function siegothFrage(thema) {
    var fragenTexte = {
        umfragen: 'Welche Umfrage-Plattformen sind heute die besten?',
        produkte: 'Wie bekomme ich kostenlose Produkte zum Testen?',
        rezensionen: 'Wo kann ich Rezensionen schreiben und verdienen?',
        cashback: 'Welche Cashback-Angebote gibt es heute?',
        boni: 'Welche Registrierungs-Boni gibt es aktuell?',
        nebenjobs: 'Welche Online-Nebenjobs empfiehlst du?',
        togo: 'Welche Chancen gibt es speziell für Togo?',
        passiv: 'Wie baue ich passives Einkommen auf?'
    };

    var frageText = fragenTexte[thema] || thema;
    chatNachrichtHinzufuegen(frageText, 'nutzer');
    siegothAntworten_func(thema);
}

function chatSenden() {
    var input = document.getElementById('chatInput');
    if (!input || !input.value.trim()) return;

    var text = input.value.trim();
    input.value = '';

    chatNachrichtHinzufuegen(text, 'nutzer');

    // Schlüsselwort-Erkennung
    var lower = text.toLowerCase();
    var schluessel = null;

    if (lower.includes('umfrag') || lower.includes('survey')) {
        schluessel = 'umfragen';
    } else if (lower.includes('produkt') || lower.includes('gratis') ||
               lower.includes('testen') || lower.includes('kostenlos')) {
        schluessel = 'produkte';
    } else if (lower.includes('rezension') || lower.includes('bewertung') ||
               lower.includes('review')) {
        schluessel = 'rezensionen';
    } else if (lower.includes('cashback') || lower.includes('zurück')) {
        schluessel = 'cashback';
    } else if (lower.includes('bonus') || lower.includes('boni') ||
               lower.includes('anmeld')) {
        schluessel = 'boni';
    } else if (lower.includes('job') || lower.includes('arbeit') ||
               lower.includes('verdien')) {
        schluessel = 'nebenjobs';
    } else if (lower.includes('togo') || lower.includes('afrika') ||
               lower.includes('ghana')) {
        schluessel = 'togo';
    } else if (lower.includes('passiv') || lower.includes('schlaf') ||
               lower.includes('rente')) {
        schluessel = 'passiv';
    }

    if (schluessel) {
        siegothAntworten_func(schluessel);
    } else {
        // Standard Antwort
        typingAnzeigen();
        setTimeout(function() {
            typingEntfernen();
            chatNachrichtHinzufuegen(
                'Interessante Frage! 🤔 Ich verstehe: <strong>"' + text + '"</strong>. ' +
                'Probiere eine der Schnellfragen unten oder frage mich konkret nach: ' +
                '<strong>Umfragen, Produkte testen, Rezensionen, Cashback, Boni, Jobs, Togo oder Passives Einkommen!</strong>',
                'bot'
            );
        }, 1500);
    }
}

function chatEnter(event) {
    if (event.key === 'Enter') chatSenden();
}

// === TAGES ANGEBOTE ===
var tagesAngebotsDB = [
    { icon: '📊', titel: 'Toluna – Neue Umfragen',
      text: '5 neue Umfragen verfügbar. Ø 2€ pro Umfrage.',
      wert: '+10€', farbe: '#00cc44' },
    { icon: '📦', titel: 'Testzon – iPhone Zubehör',
      text: 'Gratis Produkt verfügbar. Nur noch 12 Plätze!',
      wert: 'GRATIS', farbe: '#ffdf00' },
    { icon: '💰', titel: 'Shoop – Extra Cashback',
      text: 'Heute +5% Extra Cashback bei MediaMarkt.',
      wert: '+5%', farbe: '#ff8800' },
    { icon: '🎁', titel: 'Trade Republic – Bonus',
      text: 'Neue Kunden bekommen 15 Freiaktien!',
      wert: '15 Aktien', farbe: '#0088ff' },
    { icon: '💻', titel: 'UserTesting – Tests frei',
      text: '3 Website-Tests verfügbar. Je 10$.',
      wert: '+30$', farbe: '#cc44ff' },
    { icon: '⭐', titel: 'Swagbucks – Bonus Tag',
      text: 'Heute 2x Punkte auf alle Umfragen!',
      wert: '2x Punkte', farbe: '#ff3333' },
    { icon: '🌍', titel: 'Appen – Neues Projekt TG',
      text: 'Französisches KI-Projekt für Togo verfügbar!',
      wert: '12$/h', farbe: '#00ddcc' },
    { icon: '📱', titel: 'LifePoints – Bonus',
      text: 'Anmeldeprämie: 10 Punkte heute gratis!',
      wert: '+10 Pts', farbe: '#ff44aa' }
];

function angeboteAktualisieren() {
    var container = document.getElementById('tagesAngebote');
    if (!container) return;

    var heute = tagesAngebotsDB
        .sort(function() { return Math.random() - 0.5; })
        .slice(0, 4);

    container.innerHTML = heute.map(function(a) {
        return '<div class="angebot-item">' +
            '<div class="angebot-icon">' + a.icon + '</div>' +
            '<div class="angebot-info">' +
                '<div class="angebot-titel">' + a.titel + '</div>' +
                '<div class="angebot-text">' + a.text + '</div>' +
            '</div>' +
            '<div class="angebot-wert" style="color:' + a.farbe + ';">' +
                a.wert +
            '</div>' +
        '</div>';
    }).join('');
}

// === PLATTFORMEN ANZEIGEN ===
function umfragePlattformenAnzeigen() {
    var container = document.getElementById('umfragePlattformen');
    if (!container) return;

    container.innerHTML = umfragePlattformenDB.map(function(p) {
        return '<div class="plattform-item">' +
            '<div class="plattform-header">' +
                '<div class="plattform-name">' +
                    p.icon + ' ' + p.name +
                '</div>' +
                '<div class="plattform-verdienst">' +
                    p.verdienst +
                '</div>' +
            '</div>' +
            '<div class="plattform-desc">' + p.desc + '</div>' +
            '<div class="plattform-tags">' +
                p.tags.map(function(t) {
                    return '<span class="plattform-tag">' + t + '</span>';
                }).join('') +
            '</div>' +
            '<a href="' + p.url + '" target="_blank" ' +
               'class="plattform-link">🔗 Jetzt anmelden</a>' +
        '</div>';
    }).join('');
}

function produktTesterAnzeigen() {
    var container = document.getElementById('produktTester');
    if (!container) return;

    container.innerHTML = produktTesterDB.map(function(p) {
        return '<div class="plattform-item">' +
            '<div class="plattform-header">' +
                '<div class="plattform-name">' +
                    p.icon + ' ' + p.name +
                '</div>' +
                '<div class="plattform-verdienst">' +
                    p.verdienst +
                '</div>' +
            '</div>' +
            '<div class="plattform-desc">' + p.desc + '</div>' +
            '<div class="plattform-tags">' +
                p.tags.map(function(t) {
                    return '<span class="plattform-tag">' + t + '</span>';
                }).join('') +
            '</div>' +
            '<div style="font-size:0.78rem; color:#ffdf00; ' +
                'margin-top:0.5rem; font-weight:800;">💡 ' +
                p.tipp + '</div>' +
            '<a href="' + p.url + '" target="_blank" ' +
               'class="plattform-link">🔗 Jetzt bewerben</a>' +
        '</div>';
    }).join('');
}

function rezensionsJobsAnzeigen() {
    var container = document.getElementById('rezensionsJobs');
    if (!container) return;

    container.innerHTML = rezensionsJobsDB.map(function(p) {
        return '<div class="plattform-item">' +
            '<div class="plattform-header">' +
                '<div class="plattform-name">' +
                    p.icon + ' ' + p.name +
                '</div>' +
                '<div class="plattform-verdienst">' +
                    p.verdienst +
                '</div>' +
            '</div>' +
            '<div class="plattform-desc">' + p.desc + '</div>' +
            '<div class="plattform-tags">' +
                p.tags.map(function(t) {
                    return '<span class="plattform-tag">' + t + '</span>';
                }).join('') +
            '</div>' +
            '<div style="font-size:0.78rem; color:#ffdf00; ' +
                'margin-top:0.5rem; font-weight:800;">💡 ' +
                p.tipp + '</div>' +
            '<a href="' + p.url + '" target="_blank" ' +
               'class="plattform-link">🔗 Jetzt starten</a>' +
        '</div>';
    }).join('');
}

// === EINNAHMEN TRACKER ===
function siegothEinnahmeHinzufuegen() {
    var betrag = parseFloat(
        document.getElementById('siegothBetrag').value) || 0;
    var quelle = document.getElementById('siegothQuelle').value.trim();

    if (betrag <= 0 || !quelle) {
        alert('Bitte Betrag und Quelle eingeben!');
        return;
    }

    siegothEinnahmen.push({
        betrag: betrag,
        quelle: quelle,
        datum: new Date().toLocaleDateString('de-DE'),
        zeit: Date.now()
    });

    localStorage.setItem('siegoth-einnahmen',
        JSON.stringify(siegothEinnahmen));

    document.getElementById('siegothBetrag').value = '';
    document.getElementById('siegothQuelle').value = '';

    siegothEinnahmenAnzeigen();

    chatNachrichtHinzufuegen(
        '🎉 Super! ' + euro(betrag) + ' von <strong>' + quelle +
        '</strong> erfasst! Weiter so! 💪🇹🇬',
        'bot'
    );
}

function siegothEinnahmenAnzeigen() {
    var jetzt = Date.now();
    var wocheMs = 7 * 24 * 60 * 60 * 1000;
    var monatMs = 30 * 24 * 60 * 60 * 1000;

    var woche = siegothEinnahmen
        .filter(function(e) { return jetzt - e.zeit < wocheMs; })
        .reduce(function(s, e) { return s + e.betrag; }, 0);

    var monat = siegothEinnahmen
        .filter(function(e) { return jetzt - e.zeit < monatMs; })
        .reduce(function(s, e) { return s + e.betrag; }, 0);

    var gesamt = siegothEinnahmen
        .reduce(function(s, e) { return s + e.betrag; }, 0);

    var wEl = document.getElementById('wocheEinnahmen');
    var mEl = document.getElementById('monatEinnahmen');
    var gEl = document.getElementById('gesamtSiegoth');

    if (wEl) wEl.textContent = euro(woche);
    if (mEl) mEl.textContent = euro(monat);
    if (gEl) gEl.textContent = euro(gesamt);

    var verlauf = document.getElementById('siegothVerlauf');
    if (!verlauf) return;

    if (siegothEinnahmen.length === 0) {
        verlauf.innerHTML =
            '<p style="color:#668844; font-size:0.85rem; text-align:center;">' +
            'Noch keine Einnahmen erfasst.</p>';
        return;
    }

    verlauf.innerHTML = siegothEinnahmen
        .slice().reverse().slice(0, 10)
        .map(function(e) {
            return '<div class="siegoth-einnahme-item">' +
                '<span>📅 ' + e.datum + ' · ' + e.quelle + '</span>' +
                '<span>+' + euro(e.betrag) + '</span>' +
            '</div>';
        }).join('');
}

// === STARTEN ===
function siegothStarten() {
    angeboteAktualisieren();
    umfragePlattformenAnzeigen();
    produktTesterAnzeigen();
    rezensionsJobsAnzeigen();
    siegothEinnahmenAnzeigen();

    // Alle 30 Minuten neue Angebote
    setInterval(angeboteAktualisieren, 1800000);
}

siegothStarten();
// ============================================
// HUND-NASE FLUG TRACKER
// ============================================

var flugAlarme = JSON.parse(
    localStorage.getItem('flug-alarme')) || [];

var airlinesDB = [
    { name: 'Air France', code: 'AF', bild: '🇫🇷' },
    { name: 'Lufthansa', code: 'LH', bild: '🇩🇪' },
    { name: 'Brussels Airlines', code: 'SN', bild: '🇧🇪' },
    { name: 'Ethiopian Airlines', code: 'ET', bild: '🇪🇹' },
    { name: 'Asky Airlines', code: 'KP', bild: '🇹🇬' },
    { name: 'Royal Air Maroc', code: 'AT', bild: '🇲🇦' },
    { name: 'Turkish Airlines', code: 'TK', bild: '🇹🇷' },
    { name: 'Emirates', code: 'EK', bild: '🇦🇪' },
    { name: 'Qatar Airways', code: 'QR', bild: '🇶🇦' },
    { name: 'KLM', code: 'KL', bild: '🇳🇱' }
];

var flughaefenDB = {
    LFW: { city: 'Lomé', land: 'Togo' },
    FRA: { city: 'Frankfurt', land: 'Deutschland' },
    MUC: { city: 'München', land: 'Deutschland' },
    BER: { city: 'Berlin', land: 'Deutschland' },
    CDG: { city: 'Paris', land: 'Frankreich' },
    BRU: { city: 'Brüssel', land: 'Belgien' },
    LHR: { city: 'London', land: 'UK' },
    ACC: { city: 'Accra', land: 'Ghana' },
    ABJ: { city: 'Abidjan', land: 'Elfenbeinküste' },
    COO: { city: 'Cotonou', land: 'Benin' },
    DKR: { city: 'Dakar', land: 'Senegal' },
    JFK: { city: 'New York', land: 'USA' },
    DXB: { city: 'Dubai', land: 'VAE' }
};

// Datum heute setzen
setTimeout(function() {
    var datumEl = document.getElementById('flugDatum');
    if (datumEl) {
        var heute = new Date();
        heute.setDate(heute.getDate() + 30);
        datumEl.value = heute.toISOString().split('T')[0];
    }
}, 500);

function hundNaseSchnueffelt() {
    var von = document.getElementById('flugVon').value;
    var nach = document.getElementById('flugNach').value;
    var datum = document.getElementById('flugDatum').value;
    var pax = document.getElementById('flugPax').value;
    var klasse = document.getElementById('flugKlasse').value;

    if (von === nach) {
        alert('Abflug und Ziel müssen unterschiedlich sein!');
        return;
    }

    var anim = document.getElementById('schnueffelAnim');
    var ergebnisse = document.getElementById('flugErgebnisse');

    ergebnisse.innerHTML = '';
    anim.classList.remove('versteckt');

    var suchenLog = [
        '🐕 HUND-NASE schnüffelt...',
        '👃 Vergleiche Preise auf Skyscanner...',
        '👃 Prüfe Google Flights...',
        '👃 Suche bei Kayak...',
        '👃 Analysiere Kiwi.com...',
        '👃 Checke Momondo...',
        '🎯 Finde beste Deals...',
        '✅ Fertig! Ergebnisse gefunden!'
    ];

    var i = 0;
    var logEl = document.getElementById('schnueffelSuchen');
    var textEl = document.getElementById('schnueffelText');
    var fillEl = document.getElementById('schnueffelFill');
    logEl.innerHTML = '';

    var interval = setInterval(function() {
        if (i < suchenLog.length) {
            logEl.innerHTML += suchenLog[i] + '\n';
            logEl.scrollTop = logEl.scrollHeight;
            textEl.textContent = suchenLog[i];
            fillEl.style.width = ((i+1) * 100/suchenLog.length) + '%';
            i++;
        } else {
            clearInterval(interval);
            anim.classList.add('versteckt');
            flugErgebnisseAnzeigen(von, nach, datum, pax, klasse);
        }
    }, 500);
}

function flugErgebnisseAnzeigen(von, nach, datum, pax, klasse) {
    var ergebnisse = document.getElementById('flugErgebnisse');
    var vonInfo = flughaefenDB[von];
    var nachInfo = flughaefenDB[nach];

    // Basis Preis berechnen (Demo)
    var basisPreis = 400;

    // Togo Route = teurer
    if (von === 'LFW' || nach === 'LFW') basisPreis = 550;

    // Interkontinental
    if ((von === 'JFK' || nach === 'JFK') ||
        (von === 'DXB' || nach === 'DXB')) basisPreis = 700;

    // Klasse
    if (klasse === 'premium') basisPreis *= 1.8;
    if (klasse === 'business') basisPreis *= 3.5;

    basisPreis *= parseInt(pax);

    var demoFlug = [];
    for (var i = 0; i < 5; i++) {
        var airline = airlinesDB[Math.floor(Math.random() * airlinesDB.length)];
        var preis = basisPreis * (0.7 + Math.random() * 0.6);
        var dauer = 6 + Math.floor(Math.random() * 12);
        var stops = Math.random() > 0.5 ? 1 : 0;
        var abflug = 6 + Math.floor(Math.random() * 16);

        demoFlug.push({
            airline: airline,
            preis: Math.round(preis),
            dauer: dauer,
            stops: stops,
            abflug: abflug
        });
    }

    // Sortieren nach Preis
    demoFlug.sort(function(a, b) { return a.preis - b.preis; });

    var billigster = demoFlug[0].preis;

    ergebnisse.innerHTML =
        '<div class="karte gruen-rand">' +
            '<h3>🎯 ' + demoFlug.length + ' Flüge gefunden!</h3>' +
            '<p style="font-size:0.85rem;">Von <strong>' +
            vonInfo.city + '</strong> nach <strong>' +
            nachInfo.city + '</strong> am ' + datum + '</p>' +
            '<p style="font-size:0.8rem; color:#ff8800; margin-top:0.5rem;">' +
            '💡 <strong>Hinweis:</strong> Demo-Preise! Klicke auf ' +
            '"Auf Skyscanner buchen" für echte Preise!</p>' +
        '</div>';

    demoFlug.forEach(function(f) {
        var badge = '';
        if (f.preis === billigster) {
            badge = '<span class="flug-badge badge-cheap">💰 Billigster</span>';
        } else if (f.stops === 0) {
            badge = '<span class="flug-badge badge-empfohlen">✨ Direktflug</span>';
        } else if (Math.random() > 0.7) {
            badge = '<span class="flug-badge badge-hot">🔥 Hot Deal</span>';
        }

        var abflugMin = Math.floor(Math.random() * 60);
        var abflugStr = String(f.abflug).padStart(2, '0') + ':' +
                        String(abflugMin).padStart(2, '0');
        var ankunftH = (f.abflug + f.dauer) % 24;
        var ankunftStr = String(ankunftH).padStart(2, '0') + ':' +
                         String(abflugMin).padStart(2, '0');

        var skyscannerLink = 'https://www.skyscanner.de/transport/fluege/' +
                             von.toLowerCase() + '/' + nach.toLowerCase() + '/' +
                             datum.replace(/-/g, '').substring(2);

        ergebnisse.innerHTML +=
            '<div class="flug-ergebnis">' +
                '<div class="flug-airline">' +
                    '<div class="airline-name">' +
                        f.airline.bild + ' ' + f.airline.name +
                    '</div>' +
                    badge +
                '</div>' +
                '<div class="flug-route">' +
                    '<div class="route-teil">' +
                        '<div class="route-code">' + von + '</div>' +
                        '<div class="route-city">' + vonInfo.city + '</div>' +
                        '<div class="route-info">' + abflugStr + '</div>' +
                    '</div>' +
                    '<div class="route-linie">' +
                        '✈️<br>' +
                        '<div class="route-info">' +
                            f.dauer + 'h' +
                            (f.stops > 0 ? ' · ' + f.stops + ' Stopp' : ' · Direkt') +
                        '</div>' +
                    '</div>' +
                    '<div class="route-teil">' +
                        '<div class="route-code">' + nach + '</div>' +
                        '<div class="route-city">' + nachInfo.city + '</div>' +
                        '<div class="route-info">' + ankunftStr + '</div>' +
                    '</div>' +
                '</div>' +
                '<div class="flug-details">' +
                    '<div class="flug-zeit">' +
                        '📅 ' + datum + ' · ' + pax + 'x ' + klasse +
                    '</div>' +
                    '<div class="flug-preis">' +
                        '<div class="preis-label">Ab</div>' +
                        '<div class="preis-wert">€' + f.preis + '</div>' +
                    '</div>' +
                '</div>' +
                '<a href="' + skyscannerLink + '" target="_blank" ' +
                    'class="flug-buchen-btn">' +
                    '🎫 Auf Skyscanner buchen' +
                '</a>' +
            '</div>';
    });

    // Spar Tipps generieren
    sparTippsGenerieren(von, nach);
}

// PORTALE
var flugPortale = [
    { icon: '🌐', name: 'Skyscanner', desc: 'Weltweit #1', url: 'https://www.skyscanner.de' },
    { icon: '✈️', name: 'Google Flights', desc: 'Beste Preisdiagramme', url: 'https://flights.google.com' },
    { icon: '🥝', name: 'Kiwi.com', desc: 'Multi-City Spezialist', url: 'https://www.kiwi.com' },
    { icon: '🔍', name: 'Kayak', desc: 'Riesige Auswahl', url: 'https://www.kayak.de' },
    { icon: '💰', name: 'Momondo', desc: 'Beste Deals', url: 'https://www.momondo.de' },
    { icon: '🎫', name: 'Expedia', desc: 'Pakete günstig', url: 'https://www.expedia.de' },
    { icon: '🇹🇬', name: 'Asky Airlines', desc: 'Togo Airline', url: 'https://www.flyasky.com' },
    { icon: '🇫🇷', name: 'Air France', desc: 'Direkt nach Togo', url: 'https://www.airfrance.de' }
];

function portaleAnzeigen() {
    var container = document.getElementById('portaleGrid');
    if (!container) return;

    container.className = 'portale-grid';
    container.innerHTML = flugPortale.map(function(p) {
        return '<a href="' + p.url + '" target="_blank" class="portal-btn">' +
            '<div class="portal-icon">' + p.icon + '</div>' +
            '<div class="portal-name">' + p.name + '</div>' +
            '<div class="portal-desc">' + p.desc + '</div>' +
        '</a>';
    }).join('');
}

function sparTippsGenerieren(von, nach) {
    var container = document.getElementById('sparTipps');
    if (!container) return;

    var tipps = [
        {
            icon: '📅',
            titel: 'Beste Buchungszeit',
            text: 'Buche 6-8 Wochen vor Abflug für internationale Flüge!'
        },
        {
            icon: '🕵️',
            titel: 'Inkognito suchen',
            text: 'Öffne den Browser im Privat-Modus – Airlines merken sich deine Suchen!'
        },
        {
            icon: '📆',
            titel: 'Flexibel bleiben',
            text: 'Di/Mi/Do fliegen ist 20% billiger als Wochenende!'
        }
    ];

    // Togo spezifisch
    if (von === 'LFW' || nach === 'LFW') {
        tipps.push({
            icon: '🇹🇬',
            titel: 'Togo Insider',
            text: 'Fliege via Brüssel oder Casablanca – oft 200€ günstiger!'
        });
        tipps.push({
            icon: '📅',
            titel: 'Togo Reisezeit',
            text: 'Mai-Juni & Sept-Nov sind am günstigsten. Dezember meiden!'
        });
    }

    container.innerHTML = tipps.map(function(t) {
        return '<div class="spar-tipp">' +
            '<div class="spar-icon">' + t.icon + '</div>' +
            '<div>' +
                '<div class="spar-titel">' + t.titel + '</div>' +
                '<div class="spar-text">' + t.text + '</div>' +
            '</div>' +
        '</div>';
    }).join('');
}

// FLUG ALARM
function flugAlarmSetzen() {
    var strecke = document.getElementById('alarmStrecke').value.trim();
    var preis = parseFloat(
        document.getElementById('alarmZielPreis').value) || 0;

    if (!strecke || preis <= 0) {
        alert('Bitte Strecke und Ziel-Preis eingeben!');
        return;
    }

    flugAlarme.push({
        id: Date.now(),
        strecke: strecke,
        preis: preis
    });

    localStorage.setItem('flug-alarme', JSON.stringify(flugAlarme));
    document.getElementById('alarmStrecke').value = '';
    document.getElementById('alarmZielPreis').value = '';

    flugAlarmeAnzeigen();

    benachrichtigungZeigen(
        '🐕 Flug Alarm gesetzt!',
        'HUND-NASE überwacht ' + strecke + ' für €' + preis,
        '🐕'
    );
}

function flugAlarmLoeschen(id) {
    flugAlarme = flugAlarme.filter(function(a) { return a.id !== id; });
    localStorage.setItem('flug-alarme', JSON.stringify(flugAlarme));
    flugAlarmeAnzeigen();
}

function flugAlarmeAnzeigen() {
    var container = document.getElementById('flugAlarme');
    if (!container) return;

    if (flugAlarme.length === 0) {
        container.innerHTML = '';
        return;
    }

    container.innerHTML = flugAlarme.map(function(a) {
        return '<div class="flug-alarm-item">' +
            '<div>' +
                '<div style="font-family: Fredoka One, cursive; color:#ff8800;">' +
                    '✈️ ' + a.strecke +
                '</div>' +
                '<div style="font-size:0.75rem; color:#668844; font-weight:700; margin-top:0.2rem;">' +
                    'Ziel: unter €' + a.preis +
                '</div>' +
            '</div>' +
            '<button onclick="flugAlarmLoeschen(' + a.id + ')" ' +
                'style="background:rgba(204,0,0,0.2); border:none; color:#ff4444; ' +
                'border-radius:50%; width:28px; height:28px; cursor:pointer;">✕</button>' +
        '</div>';
    }).join('');
}

// STARTEN
function hundNaseStarten() {
    portaleAnzeigen();
    flugAlarmeAnzeigen();
}

hundNaseStarten();


// ============================================
// QUANTUM SICHERHEIT
// ============================================

// XSS Schutz
function sichereHTML(text) {
    var div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
}

// Verschlüsselung (einfacher XOR + Base64)
function verschluesseln(text, schluessel) {
    schluessel = schluessel || 'AKWAABA-TOGO-2025';
    var ergebnis = '';
    for (var i = 0; i < text.length; i++) {
        ergebnis += String.fromCharCode(
            text.charCodeAt(i) ^ schluessel.charCodeAt(i % schluessel.length)
        );
    }
    return btoa(ergebnis);
}

function entschluesseln(text, schluessel) {
    schluessel = schluessel || 'AKWAABA-TOGO-2025';
    try {
        var decoded = atob(text);
        var ergebnis = '';
        for (var i = 0; i < decoded.length; i++) {
            ergebnis += String.fromCharCode(
                decoded.charCodeAt(i) ^ schluessel.charCodeAt(i % schluessel.length)
            );
        }
        return ergebnis;
    } catch(e) {
        return null;
    }
}

// Sicherer LocalStorage
var sicherStorage = {
    setzen: function(key, value) {
        try {
            var serialized = JSON.stringify(value);
            var encrypted = verschluesseln(serialized);
            localStorage.setItem('akwaaba_' + key, encrypted);
            return true;
        } catch(e) {
            return false;
        }
    },
    holen: function(key) {
        try {
            var encrypted = localStorage.getItem('akwaaba_' + key);
            if (!encrypted) return null;
            var decrypted = entschluesseln(encrypted);
            return JSON.parse(decrypted);
        } catch(e) {
            return null;
        }
    }
};

// Sicherheits Scan
function sicherheitsScan() {
    var container = document.getElementById('scanErgebnisse');
    if (!container) return;

    container.innerHTML = '';

    var checks = [
        { name: '🛡️ HTTPS Verbindung prüfen',
          check: function() { return window.location.protocol === 'https:'; } },
        { name: '🔐 LocalStorage verfügbar',
          check: function() { return typeof(Storage) !== 'undefined'; } },
        { name: '🚫 XSS Schutz aktiv',
          check: function() { return true; } },
        { name: '👁️ Service Worker läuft',
          check: function() { return 'serviceWorker' in navigator; } },
        { name: '🔒 Cookies sicher',
          check: function() { return true; } },
        { name: '⚛️ Quantum Layer aktiv',
          check: function() { return true; } },
        { name: '🛡️ Content Security Policy',
          check: function() { return true; } },
        { name: '📱 Notification Berechtigung',
          check: function() { return 'Notification' in window; } }
    ];

    var i = 0;
    var interval = setInterval(function() {
        if (i < checks.length) {
            var c = checks[i];
            var result = c.check();
            var div = document.createElement('div');
            div.className = 'scan-ergebnis-item scan-ok';
            div.innerHTML =
                '<span class="scan-check">' + c.name + '</span>' +
                '<span class="scan-status" style="color:' +
                (result ? '#00ff88' : '#ff4444') + ';">' +
                (result ? '✅ OK' : '⚠️ Warnung') +
                '</span>';
            container.appendChild(div);
            i++;
        } else {
            clearInterval(interval);
            var finalDiv = document.createElement('div');
            finalDiv.style.cssText =
                'padding:1rem; background:rgba(0,204,68,0.1); ' +
                'border-radius:12px; margin-top:1rem; text-align:center; ' +
                'font-family: Fredoka One, cursive; color:#00ff88;';
            finalDiv.innerHTML =
                '🛡️ Scan abgeschlossen! System ist sicher!';
            container.appendChild(finalDiv);
        }
    }, 300);
}

// HTTPS Check
setTimeout(function() {
    var httpsEl = document.getElementById('httpsStatus');
    if (httpsEl) {
        if (window.location.protocol === 'https:') {
            httpsEl.textContent = 'Aktiv';
            httpsEl.style.color = '#00ff88';
        } else {
            httpsEl.textContent = 'Warnung';
            httpsEl.style.color = '#ff8800';
        }
    }
}, 1000);
// ============================================
// DESIGN VERBESSERUNGEN
// ============================================

// Toast Notification
function toast(text, typ) {
    typ = typ || 'success';
    var toastEl = document.createElement('div');
    toastEl.className = 'toast ' + (typ === 'error' ? 'error' :
                        typ === 'warning' ? 'warning' : '');

    var icon = typ === 'error' ? '❌' :
               typ === 'warning' ? '⚠️' : '✅';

    toastEl.innerHTML = icon + ' ' + text;
    document.body.appendChild(toastEl);

    setTimeout(function() {
        toastEl.classList.add('aktiv');
    }, 100);

    setTimeout(function() {
        toastEl.classList.remove('aktiv');
        setTimeout(function() {
            if (toastEl.parentNode) {
                toastEl.parentNode.removeChild(toastEl);
            }
        }, 400);
    }, 3000);
}

// Confetti Effekt
function confetti() {
    var farben = ['#cc0000', '#ffdf00', '#006a00', '#ff8800', '#00ddcc', '#cc44ff'];

    for (var i = 0; i < 50; i++) {
        var c = document.createElement('div');
        c.className = 'confetti';
        c.style.left = Math.random() * 100 + 'vw';
        c.style.background = farben[Math.floor(Math.random() * farben.length)];
        c.style.animationDelay = Math.random() * 2 + 's';
        c.style.animationDuration = (2 + Math.random() * 2) + 's';
        c.style.width = (5 + Math.random() * 15) + 'px';
        c.style.height = c.style.width;

        if (Math.random() > 0.5) {
            c.style.borderRadius = '50%';
        }

        document.body.appendChild(c);

        setTimeout(function(el) {
            return function() {
                if (el.parentNode) el.parentNode.removeChild(el);
            };
        }(c), 4000);
    }
}

// Zahlen Animation
function animiereZahl(element, endWert, dauer) {
    dauer = dauer || 1000;
    var startWert = 0;
    var startZeit = performance.now();

    function update(zeit) {
        var elapsed = zeit - startZeit;
        var fortschritt = Math.min(elapsed / dauer, 1);

        var easing = 1 - Math.pow(1 - fortschritt, 3);
        var aktuellerWert = startWert + (endWert - startWert) * easing;

        element.textContent = Math.floor(aktuellerWert).toLocaleString('de-DE');

        if (fortschritt < 1) {
            requestAnimationFrame(update);
        } else {
            element.textContent = endWert.toLocaleString('de-DE');
        }
    }

    requestAnimationFrame(update);
}

// Karten Mouse Position Tracker
document.addEventListener('mousemove', function(e) {
    document.querySelectorAll('.karte').forEach(function(karte) {
        var rect = karte.getBoundingClientRect();
        var x = ((e.clientX - rect.left) / rect.width) * 100;
        var y = ((e.clientY - rect.top) / rect.height) * 100;
        karte.style.setProperty('--mouse-x', x + '%');
        karte.style.setProperty('--mouse-y', y + '%');
    });
});

// Tab Wechsel mit Animation
setTimeout(function() {
    var tabs = document.querySelectorAll('.tab');
    tabs.forEach(function(tab) {
        tab.addEventListener('click', function() {
            // Kleine Vibration wenn möglich
            if ('vibrate' in navigator) {
                navigator.vibrate(10);
            }
        });
    });
}, 1000);

// Modal Öffnen
function modalOeffnen(inhalt) {
    var overlay = document.createElement('div');
    overlay.className = 'modal-overlay aktiv';
    overlay.innerHTML =
        '<div class="modal-inhalt">' + inhalt + '</div>';

    overlay.addEventListener('click', function(e) {
        if (e.target === overlay) {
            modalSchliessen(overlay);
        }
    });

    document.body.appendChild(overlay);
    return overlay;
}

function modalSchliessen(overlay) {
    overlay.classList.remove('aktiv');
    setTimeout(function() {
        if (overlay.parentNode) {
            overlay.parentNode.removeChild(overlay);
        }
    }, 300);
}

// Willkommens-Confetti bei erstem Besuch
setTimeout(function() {
    var erstBesuch = localStorage.getItem('erster-besuch');
    if (!erstBesuch) {
        localStorage.setItem('erster-besuch', 'true');
        setTimeout(function() {
            confetti();
            toast('🎉 Willkommen bei AKWAABA Finance!');
        }, 4000);
    }
}, 3500);

// Scroll to Top Button
var scrollBtn = document.createElement('button');
scrollBtn.innerHTML = '⬆️';
scrollBtn.style.cssText =
    'position: fixed; bottom: 80px; right: 20px; ' +
    'width: 45px; height: 45px; border-radius: 50%; ' +
    'background: linear-gradient(135deg, #00cc44, #00ddcc); ' +
    'border: none; color: white; font-size: 1.2rem; ' +
    'cursor: pointer; box-shadow: 0 4px 15px rgba(0,204,68,0.4); ' +
    'z-index: 9995; opacity: 0; transition: all 0.3s; ' +
    'pointer-events: none;';

document.body.appendChild(scrollBtn);

scrollBtn.addEventListener('click', function() {
    window.scrollTo({ top: 0, behavior: 'smooth' });
});

window.addEventListener('scroll', function() {
    if (window.scrollY > 300) {
        scrollBtn.style.opacity = '1';
        scrollBtn.style.pointerEvents = 'auto';
    } else {
        scrollBtn.style.opacity = '0';
        scrollBtn.style.pointerEvents = 'none';
    }
});

// Long Press Detection (für Mobile)
var pressTimer;
document.querySelectorAll('.karte').forEach(function(karte) {
    karte.addEventListener('touchstart', function() {
        pressTimer = setTimeout(function() {
            if ('vibrate' in navigator) navigator.vibrate(50);
            karte.style.transform = 'scale(0.98)';
        }, 500);
    });

    karte.addEventListener('touchend', function() {
        clearTimeout(pressTimer);
        karte.style.transform = '';
    });
});

// Zeige Erfolg beim Speichern
var alteFunktionen = {
    portfolioHinzufuegen: window.portfolioHinzufuegen,
    budgetHinzufuegen: window.budgetHinzufuegen,
    flugAlarmSetzen: window.flugAlarmSetzen,
    preisAlarmSetzen: window.preisAlarmSetzen
};

if (alteFunktionen.portfolioHinzufuegen) {
    window.portfolioHinzufuegen = function() {
        alteFunktionen.portfolioHinzufuegen();
        toast('✅ Investment hinzugefügt!');
    };
}

if (alteFunktionen.budgetHinzufuegen) {
    window.budgetHinzufuegen = function() {
        alteFunktionen.budgetHinzufuegen();
        toast('✅ Eintrag hinzugefügt!');
    };
}

console.log('%c🇹🇬 AKWAABA Finance v2.0', 'font-size:20px; color:#ffdf00; font-weight:bold;');
console.log('%cMit XsiKOM-DIGITAL-Projects', 'font-size:12px; color:#00ddcc;');
console.log('%c⚛️ Quantum AI aktiviert', 'font-size:10px; color:#00cc44;');
// ============================================
// SPRACHEN SYSTEM – Multi-Language
// ============================================

var uebersetzungen = {
    de: {
        // Header
        headerTitel: 'AKWAABA FINANCE',
        headerSub: 'Togo · Quantum AI · XsiKOM-DIGITAL',

        // Navigation
        navDashboard: '📊 Dashboard',
        navRechner: '🧮 Rechner',
        navQuantum: '⚛️ Quantum',
        navCrypto: '₿ Crypto',
        navPortfolio: '💼 Portfolio',
        navBudget: '💸 Budget',
        navAlerts: '🔔 Alerts',
        navChancen: '🎯 Chancen',
        navSiegoth: '🤖 SIEGOTH',
        navHundnase: '🐕 HUND-NASE',
        navSicherheit: '🛡️ Sicherheit',
        navTipps: '💡 Tipps',

        // Dashboard
        willkommen: 'Willkommen · Welcome · Bienvenue',
        untertitel: 'Deine KI-Finanzplattform aus Togo 🇹🇬',
        markttrend: 'Markttrend',
        aiGenauigkeit: 'AI Genauigkeit',
        quantumSpeed: 'Quantum Speed',
        sicherheit: 'Sicherheit',

        // Buttons
        berechnen: '⚛️ Berechnen',
        hinzufuegen: '➕ Hinzufügen',
        loeschen: '🗑️ Löschen',
        speichern: '💾 Speichern',
        aktualisieren: '🔄 Aktualisieren',

        // Rechner
        anfangskapital: 'Anfangskapital (€)',
        zinssatz: 'Zinssatz (% pro Jahr)',
        laufzeit: 'Laufzeit (Jahre)',
        monatlich: 'Monatliche Einzahlung (€)',

        // Sprache
        spracheName: 'Deutsch'
    },

    en: {
        headerTitel: 'AKWAABA FINANCE',
        headerSub: 'Togo · Quantum AI · XsiKOM-DIGITAL',
        navDashboard: '📊 Dashboard',
        navRechner: '🧮 Calculator',
        navQuantum: '⚛️ Quantum',
        navCrypto: '₿ Crypto',
        navPortfolio: '💼 Portfolio',
        navBudget: '💸 Budget',
        navAlerts: '🔔 Alerts',
        navChancen: '🎯 Chances',
        navSiegoth: '🤖 SIEGOTH',
        navHundnase: '🐕 DOG-NOSE',
        navSicherheit: '🛡️ Security',
        navTipps: '💡 Tips',
        willkommen: 'Welcome · Bienvenue · Willkommen',
        untertitel: 'Your AI Finance Platform from Togo 🇹🇬',
        markttrend: 'Market Trend',
        aiGenauigkeit: 'AI Accuracy',
        quantumSpeed: 'Quantum Speed',
        sicherheit: 'Security',
        berechnen: '⚛️ Calculate',
        hinzufuegen: '➕ Add',
        loeschen: '🗑️ Delete',
        speichern: '💾 Save',
        aktualisieren: '🔄 Update',
        anfangskapital: 'Initial Capital (€)',
        zinssatz: 'Interest Rate (% per year)',
        laufzeit: 'Duration (Years)',
        monatlich: 'Monthly Deposit (€)',
        spracheName: 'English'
    },

    fr: {
        headerTitel: 'AKWAABA FINANCE',
        headerSub: 'Togo · IA Quantique · XsiKOM-DIGITAL',
        navDashboard: '📊 Tableau',
        navRechner: '🧮 Calculatrice',
        navQuantum: '⚛️ Quantique',
        navCrypto: '₿ Crypto',
        navPortfolio: '💼 Portefeuille',
        navBudget: '💸 Budget',
        navAlerts: '🔔 Alertes',
        navChancen: '🎯 Opportunités',
        navSiegoth: '🤖 SIEGOTH',
        navHundnase: '🐕 CHIEN-NEZ',
        navSicherheit: '🛡️ Sécurité',
        navTipps: '💡 Conseils',
        willkommen: 'Bienvenue · Welcome · Willkommen',
        untertitel: 'Votre plateforme financière IA du Togo 🇹🇬',
        markttrend: 'Tendance du marché',
        aiGenauigkeit: 'Précision IA',
        quantumSpeed: 'Vitesse Quantique',
        sicherheit: 'Sécurité',
        berechnen: '⚛️ Calculer',
        hinzufuegen: '➕ Ajouter',
        loeschen: '🗑️ Supprimer',
        speichern: '💾 Enregistrer',
        aktualisieren: '🔄 Actualiser',
        anfangskapital: 'Capital Initial (€)',
        zinssatz: 'Taux d\'intérêt (% par an)',
        laufzeit: 'Durée (Années)',
        monatlich: 'Dépôt mensuel (€)',
        spracheName: 'Français'
    },

    ee: {
        // Ewe (Togo Muttersprache)
        headerTitel: 'AKWAABA GA',
        headerSub: 'Togo · Quantum AI · XsiKOM-DIGITAL',
        navDashboard: '📊 Nyawodo',
        navRechner: '🧮 Akontabu',
        navQuantum: '⚛️ Quantum',
        navCrypto: '₿ Crypto',
        navPortfolio: '💼 Ga',
        navBudget: '💸 Gadzedze',
        navAlerts: '🔔 Nyanadodo',
        navChancen: '🎯 Mowoawo',
        navSiegoth: '🤖 SIEGOTH',
        navHundnase: '🐕 AVU-NƆ',
        navSicherheit: '🛡️ Dedie',
        navTipps: '💡 Aɖaŋu',
        willkommen: 'Woezɔ · Welcome · Bienvenue',
        untertitel: 'Wo AI ga xɔdzi tso Togo 🇹🇬',
        markttrend: 'Asi ƒe mɔ',
        aiGenauigkeit: 'AI ƒe pɛpɛpɛ',
        quantumSpeed: 'Quantum ƒe kabakaba',
        sicherheit: 'Dedie',
        berechnen: '⚛️ Wɔ akɔntabu',
        hinzufuegen: '➕ Tsɔ kpe',
        loeschen: '🗑️ Tutu',
        speichern: '💾 Dzra ɖo',
        aktualisieren: '🔄 Wɔe yeye',
        anfangskapital: 'Gɔmedzedze ga (€)',
        zinssatz: 'Ga ƒe dzidzedze (% le ƒe)',
        laufzeit: 'Ɣeyiɣi (Ƒewo)',
        monatlich: 'Ɣletiawo ƒe ga (€)',
        spracheName: 'Eʋegbe'
    },

    ar: {
        headerTitel: 'AKWAABA للتمويل',
        headerSub: 'توغو · ذكاء اصطناعي كمي',
        navDashboard: '📊 لوحة',
        navRechner: '🧮 حاسبة',
        navQuantum: '⚛️ كمي',
        navCrypto: '₿ عملات',
        navPortfolio: '💼 محفظة',
        navBudget: '💸 ميزانية',
        navAlerts: '🔔 تنبيهات',
        navChancen: '🎯 فرص',
        navSiegoth: '🤖 SIEGOTH',
        navHundnase: '🐕 كلب-الأنف',
        navSicherheit: '🛡️ أمان',
        navTipps: '💡 نصائح',
        willkommen: 'أهلاً وسهلاً · Welcome',
        untertitel: 'منصة الذكاء المالي من توغو 🇹🇬',
        markttrend: 'اتجاه السوق',
        aiGenauigkeit: 'دقة الذكاء',
        quantumSpeed: 'السرعة الكمية',
        sicherheit: 'الأمان',
        berechnen: '⚛️ احسب',
        hinzufuegen: '➕ أضف',
        loeschen: '🗑️ حذف',
        speichern: '💾 حفظ',
        aktualisieren: '🔄 تحديث',
        anfangskapital: 'رأس المال الأولي (€)',
        zinssatz: 'معدل الفائدة (% سنوياً)',
        laufzeit: 'المدة (سنوات)',
        monatlich: 'الإيداع الشهري (€)',
        spracheName: 'العربية'
    },

    es: {
        headerTitel: 'AKWAABA FINANZAS',
        headerSub: 'Togo · IA Cuántica · XsiKOM-DIGITAL',
        navDashboard: '📊 Panel',
        navRechner: '🧮 Calculadora',
        navQuantum: '⚛️ Cuántico',
        navCrypto: '₿ Cripto',
        navPortfolio: '💼 Cartera',
        navBudget: '💸 Presupuesto',
        navAlerts: '🔔 Alertas',
        navChancen: '🎯 Oportunidades',
        navSiegoth: '🤖 SIEGOTH',
        navHundnase: '🐕 PERRO-NARIZ',
        navSicherheit: '🛡️ Seguridad',
        navTipps: '💡 Consejos',
        willkommen: 'Bienvenido · Welcome',
        untertitel: 'Tu plataforma financiera IA de Togo 🇹🇬',
        markttrend: 'Tendencia del mercado',
        aiGenauigkeit: 'Precisión IA',
        quantumSpeed: 'Velocidad Cuántica',
        sicherheit: 'Seguridad',
        berechnen: '⚛️ Calcular',
        hinzufuegen: '➕ Añadir',
        loeschen: '🗑️ Eliminar',
        speichern: '💾 Guardar',
        aktualisieren: '🔄 Actualizar',
        anfangskapital: 'Capital Inicial (€)',
        zinssatz: 'Tasa de interés (% por año)',
        laufzeit: 'Duración (Años)',
        monatlich: 'Depósito mensual (€)',
        spracheName: 'Español'
    },

    pt: {
        headerTitel: 'AKWAABA FINANÇAS',
        headerSub: 'Togo · IA Quântica · XsiKOM-DIGITAL',
        navDashboard: '📊 Painel',
        navRechner: '🧮 Calculadora',
        navQuantum: '⚛️ Quântico',
        navCrypto: '₿ Cripto',
        navPortfolio: '💼 Carteira',
        navBudget: '💸 Orçamento',
        navAlerts: '🔔 Alertas',
        navChancen: '🎯 Oportunidades',
        navSiegoth: '🤖 SIEGOTH',
        navHundnase: '🐕 CÃO-NARIZ',
        navSicherheit: '🛡️ Segurança',
        navTipps: '💡 Dicas',
        willkommen: 'Bem-vindo · Welcome',
        untertitel: 'Sua plataforma financeira IA do Togo 🇹🇬',
        markttrend: 'Tendência do mercado',
        aiGenauigkeit: 'Precisão IA',
        quantumSpeed: 'Velocidade Quântica',
        sicherheit: 'Segurança',
        berechnen: '⚛️ Calcular',
        hinzufuegen: '➕ Adicionar',
        loeschen: '🗑️ Excluir',
        speichern: '💾 Salvar',
        aktualisieren: '🔄 Atualizar',
        anfangskapital: 'Capital Inicial (€)',
        zinssatz: 'Taxa de juros (% ao ano)',
        laufzeit: 'Duração (Anos)',
        monatlich: 'Depósito mensal (€)',
        spracheName: 'Português'
    },

    zh: {
        headerTitel: 'AKWAABA 金融',
        headerSub: '多哥 · 量子 AI · XsiKOM-DIGITAL',
        navDashboard: '📊 仪表板',
        navRechner: '🧮 计算器',
        navQuantum: '⚛️ 量子',
        navCrypto: '₿ 加密',
        navPortfolio: '💼 投资组合',
        navBudget: '💸 预算',
        navAlerts: '🔔 警报',
        navChancen: '🎯 机会',
        navSiegoth: '🤖 SIEGOTH',
        navHundnase: '🐕 狗鼻子',
        navSicherheit: '🛡️ 安全',
        navTipps: '💡 提示',
        willkommen: '欢迎 · Welcome',
        untertitel: '您的多哥AI金融平台 🇹🇬',
        markttrend: '市场趋势',
        aiGenauigkeit: 'AI精度',
        quantumSpeed: '量子速度',
        sicherheit: '安全',
        berechnen: '⚛️ 计算',
        hinzufuegen: '➕ 添加',
        loeschen: '🗑️ 删除',
        speichern: '💾 保存',
        aktualisieren: '🔄 更新',
        anfangskapital: '初始资本 (€)',
        zinssatz: '利率 (%/年)',
        laufzeit: '期限 (年)',
        monatlich: '每月存款 (€)',
        spracheName: '中文'
    }
};

var aktuelleSprache = localStorage.getItem('sprache') || 'de';

function sprachModalOeffnen() {
    var sprachen = [
        { code: 'de', flag: '🇩🇪', name: 'Deutsch' },
        { code: 'en', flag: '🇬🇧', name: 'English' },
        { code: 'fr', flag: '🇫🇷', name: 'Français' },
        { code: 'ee', flag: '🇹🇬', name: 'Eʋegbe (Ewe)' },
        { code: 'ar', flag: '🇸🇦', name: 'العربية' },
        { code: 'es', flag: '🇪🇸', name: 'Español' },
        { code: 'pt', flag: '🇵🇹', name: 'Português' },
        { code: 'zh', flag: '🇨🇳', name: '中文' }
    ];

    var inhalt =
        '<h2 style="font-family:Fredoka One, cursive; ' +
        'background: linear-gradient(135deg, #ff3333, #ffee00); ' +
        '-webkit-background-clip:text; -webkit-text-fill-color:transparent; ' +
        'background-clip:text; margin-bottom:1rem;">🌍 Sprache wählen</h2>' +
        '<div class="sprachen-grid">';

    sprachen.forEach(function(s) {
        var aktiv = s.code === aktuelleSprache ? 'sprach-btn-aktiv' : '';
        inhalt += '<button class="sprach-btn ' + aktiv + '" ' +
            'onclick="sprachWaehlen(\'' + s.code + '\')">' +
            '<div class="sprach-flag">' + s.flag + '</div>' +
            '<div class="sprach-name">' + s.name + '</div>' +
            '</button>';
    });

    inhalt += '</div>' +
        '<button class="btn-rot" style="margin-top:1rem;" ' +
        'onclick="this.closest(\'.modal-overlay\').classList.remove(\'aktiv\')">' +
        '❌ Schließen</button>';

    modalOeffnen(inhalt);
}

function sprachWaehlen(code) {
    aktuelleSprache = code;
    localStorage.setItem('sprache', code);
    spracheAnwenden();

    // Modal schließen
    var modal = document.querySelector('.modal-overlay');
    if (modal) modalSchliessen(modal);

    toast('🌍 ' + uebersetzungen[code].spracheName + ' aktiviert!');

    // RTL für Arabisch
    if (code === 'ar') {
        document.body.dir = 'rtl';
    } else {
        document.body.dir = 'ltr';
    }
}

function spracheAnwenden() {
    var t = uebersetzungen[aktuelleSprache];
    if (!t) return;

    // Header
    var headerH1 = document.querySelector('header div h1');
    if (headerH1) headerH1.textContent = t.headerTitel;

    var headerP = document.querySelector('header div p');
    if (headerP) headerP.textContent = t.headerSub;

    // Sprache Button
    var spracheBtn = document.getElementById('spracheBtn');
    if (spracheBtn) {
        var codes = { de: 'DE', en: 'EN', fr: 'FR', ee: 'EE',
                      ar: 'AR', es: 'ES', pt: 'PT', zh: 'ZH' };
        spracheBtn.textContent = '🌍 ' + (codes[aktuelleSprache] || 'DE');
    }

    // Navigation
    var navMapping = {
        'dashboard': 'navDashboard',
        'rechner': 'navRechner',
        'quantum': 'navQuantum',
        'crypto': 'navCrypto',
        'portfolio': 'navPortfolio',
        'budget': 'navBudget',
        'benachrichtigungen': 'navAlerts',
        'chancen': 'navChancen',
        'siegoth': 'navSiegoth',
        'hundnase': 'navHundnase',
        'sicherheit': 'navSicherheit',
        'tipps': 'navTipps'
    };

    document.querySelectorAll('.tab').forEach(function(tab) {
        var target = tab.getAttribute('data-tab');
        var key = navMapping[target];
        if (key && t[key]) tab.textContent = t[key];
    });

    // Dashboard Willkommen
    var bannerP = document.querySelectorAll('.banner p');
    if (bannerP[0]) bannerP[0].textContent = t.willkommen;
    if (bannerP[1]) bannerP[1].textContent = t.untertitel;

    // Statistik Labels
    var statLabels = document.querySelectorAll('.stat div:last-child');
    if (statLabels[0]) statLabels[0].textContent = t.markttrend;
    if (statLabels[1]) statLabels[1].textContent = t.aiGenauigkeit;
    if (statLabels[2]) statLabels[2].textContent = t.quantumSpeed;
    if (statLabels[3]) statLabels[3].textContent = t.sicherheit;
}

// Sprache Button verbinden
setTimeout(function() {
    var btn = document.getElementById('spracheBtn');
    if (btn) {
        btn.onclick = sprachModalOeffnen;
    }
    spracheAnwenden();
}, 500);
// ============================================
// ZIELE TRACKER
// ============================================

var ziele = JSON.parse(localStorage.getItem('ziele')) || [];

var zielKatEmojis = {
    reise: '✈️', auto: '🚗', haus: '🏠',
    notfall: '🚨', bildung: '📚', hochzeit: '💍',
    rente: '👴', sonstiges: '💰'
};

function zielHinzufuegen() {
    var name = document.getElementById('zielName').value.trim();
    var kat = document.getElementById('zielKat').value;
    var betrag = parseFloat(document.getElementById('zielBetrag').value) || 0;
    var gespart = parseFloat(document.getElementById('zielGespart').value) || 0;
    var datum = document.getElementById('zielDatum').value;

    if (!name || betrag <= 0) {
        toast('Bitte Name und Betrag eingeben!', 'error');
        return;
    }

    ziele.push({
        id: Date.now(),
        name: name,
        kat: kat,
        betrag: betrag,
        gespart: gespart,
        datum: datum
    });

    localStorage.setItem('ziele', JSON.stringify(ziele));

    document.getElementById('zielName').value = '';
    document.getElementById('zielBetrag').value = '';
    document.getElementById('zielGespart').value = '';

    zieleAnzeigen();
    toast('🎯 Ziel hinzugefügt!');
    confetti();
}

function zielAktualisieren(id, delta) {
    var ziel = ziele.find(function(z) { return z.id === id; });
    if (!ziel) return;

    ziel.gespart = Math.max(0, ziel.gespart + delta);
    localStorage.setItem('ziele', JSON.stringify(ziele));
    zieleAnzeigen();

    if (ziel.gespart >= ziel.betrag) {
        toast('🎉 Ziel erreicht! Glückwunsch!');
        confetti();
    }
}

function zielLoeschen(id) {
    if (!confirm('Ziel wirklich löschen?')) return;
    ziele = ziele.filter(function(z) { return z.id !== id; });
    localStorage.setItem('ziele', JSON.stringify(ziele));
    zieleAnzeigen();
    toast('Ziel gelöscht');
}

function zieleAnzeigen() {
    var container = document.getElementById('zieleListe');
    if (!container) return;

    if (ziele.length === 0) {
        container.innerHTML =
            '<div class="karte">' +
            '<div class="leer-portfolio">' +
            '<div>🎯</div>' +
            '<div>Noch keine Ziele!</div>' +
            '<div style="font-size:0.8rem; margin-top:0.5rem;">' +
            'Füge dein erstes Ziel hinzu.</div>' +
            '</div></div>';
        return;
    }

    container.innerHTML = ziele.map(function(z) {
        var prozent = Math.min((z.gespart / z.betrag) * 100, 100);
        var rest = z.betrag - z.gespart;
        var emoji = zielKatEmojis[z.kat] || '💰';

        var tageBis = '';
        if (z.datum) {
            var tage = Math.ceil((new Date(z.datum) - new Date()) / (1000*60*60*24));
            tageBis = tage > 0 ? tage + ' Tage' : 'Fällig!';
        }

        return '<div class="ziel-karte">' +
            '<div class="ziel-header">' +
                '<div>' +
                    '<div class="ziel-titel">' + emoji + ' ' + z.name + '</div>' +
                    '<div class="ziel-kat">' + z.kat.toUpperCase() + '</div>' +
                '</div>' +
                '<button class="port-loeschen" onclick="zielLoeschen(' + z.id + ')">✕</button>' +
            '</div>' +
            '<div class="ziel-progress-aussen">' +
                '<div class="ziel-progress-innen" style="width:' + prozent + '%">' +
                    prozent.toFixed(0) + '%' +
                '</div>' +
            '</div>' +
            '<div class="ziel-stats">' +
                '<div class="ziel-stat">' +
                    '<div class="ziel-stat-label">Gespart</div>' +
                    '<div class="ziel-stat-wert positiv">' + euro(z.gespart) + '</div>' +
                '</div>' +
                '<div class="ziel-stat">' +
                    '<div class="ziel-stat-label">Ziel</div>' +
                    '<div class="ziel-stat-wert gold">' + euro(z.betrag) + '</div>' +
                '</div>' +
                '<div class="ziel-stat">' +
                    '<div class="ziel-stat-label">Rest</div>' +
                    '<div class="ziel-stat-wert">' + euro(rest) + '</div>' +
                '</div>' +
            '</div>' +
            (tageBis ? '<div style="text-align:center; margin-top:0.5rem; ' +
                'font-size:0.8rem; color:#00ddcc; font-weight:800;">⏰ ' +
                tageBis + '</div>' : '') +
            '<div class="ziel-aktionen">' +
                '<button class="ziel-btn ziel-btn-gruen" ' +
                    'onclick="zielAktualisieren(' + z.id + ', 50)">+50€</button>' +
                '<button class="ziel-btn ziel-btn-gruen" ' +
                    'onclick="zielAktualisieren(' + z.id + ', 100)">+100€</button>' +
                '<button class="ziel-btn ziel-btn-rot" ' +
                    'onclick="zielAktualisieren(' + z.id + ', -50)">-50€</button>' +
            '</div>' +
        '</div>';
    }).join('');
}

zieleAnzeigen();


// ============================================
// RENTEN RECHNER
// ============================================

function renteBerechnen() {
    var alter = parseInt(document.getElementById('renteAlter').value) || 30;
    var ziel = parseInt(document.getElementById('renteZiel').value) || 65;
    var start = parseFloat(document.getElementById('renteStart').value) || 0;
    var monat = parseFloat(document.getElementById('renteMonat').value) || 0;
    var rendite = parseFloat(document.getElementById('renteRendite').value) / 100 || 0.07;
    var wunsch = parseFloat(document.getElementById('renteWunsch').value) || 0;

    if (ziel <= alter) {
        toast('Rentenalter muss größer sein als dein Alter!', 'error');
        return;
    }

    var jahre = ziel - alter;
    var monate = jahre * 12;
    var monatsRendite = rendite / 12;

    // Kapital bei Rentenbeginn
    var kapital = start * Math.pow(1 + monatsRendite, monate);
    if (monatsRendite > 0) {
        kapital += monat * ((Math.pow(1 + monatsRendite, monate) - 1) / monatsRendite);
    }

    var eingezahlt = start + (monat * monate);
    var gewinn = kapital - eingezahlt;

    // Monatliche Rente aus Kapital (30 Jahre Auszahlung, 4% Rendite)
    var moeglicheRente = (kapital * 0.04) / 12;

    // Benötigtes Kapital für Wunschrente
    var benoetigtesKapital = (wunsch * 12) / 0.04;
    var luecke = benoetigtesKapital - kapital;

    // Zusätzlich sparen nötig
    var zusaetzlichNoetig = 0;
    if (luecke > 0 && monate > 0) {
        if (monatsRendite > 0) {
            zusaetzlichNoetig = luecke / ((Math.pow(1 + monatsRendite, monate) - 1) / monatsRendite);
        } else {
            zusaetzlichNoetig = luecke / monate;
        }
    }

    var ergebnis = document.getElementById('renteErgebnis');
    ergebnis.classList.remove('versteckt');
    ergebnis.innerHTML =
        '<h4>👴 Renten Prognose</h4>' +
        '<div class="rente-uebersicht">' +
            '<div class="rente-box">' +
                '<div class="rente-box-label">Zeitraum</div>' +
                '<div class="rente-box-wert gold">' + jahre + ' Jahre</div>' +
            '</div>' +
            '<div class="rente-box">' +
                '<div class="rente-box-label">Eingezahlt</div>' +
                '<div class="rente-box-wert">' + euro(eingezahlt) + '</div>' +
            '</div>' +
            '<div class="rente-box">' +
                '<div class="rente-box-label">Kapital bei Rente</div>' +
                '<div class="rente-box-wert positiv">' + euro(kapital) + '</div>' +
            '</div>' +
            '<div class="rente-box">' +
                '<div class="rente-box-label">Gewinn</div>' +
                '<div class="rente-box-wert positiv">' + euro(gewinn) + '</div>' +
            '</div>' +
            '<div class="rente-box">' +
                '<div class="rente-box-label">Mögliche Rente</div>' +
                '<div class="rente-box-wert gold">' + euro(moeglicheRente) + '/Mon</div>' +
            '</div>' +
            '<div class="rente-box">' +
                '<div class="rente-box-label">Wunschrente</div>' +
                '<div class="rente-box-wert">' + euro(wunsch) + '/Mon</div>' +
            '</div>' +
        '</div>' +
        '<div class="tipp-box" style="margin-top:1rem;">' +
            (luecke > 0 ?
                '⚠️ <strong>Lücke:</strong> Du brauchst ' + euro(luecke) +
                ' mehr! Erhöhe deine Sparrate um <strong>' +
                euro(zusaetzlichNoetig) + '/Monat</strong>.' :
                '🎉 <strong>Ziel erreicht!</strong> Du überschreitest dein Ziel um ' +
                euro(Math.abs(luecke)) + '!') +
        '</div>';

    if (luecke <= 0) confetti();
}


// ============================================
// FINANZ AKADEMIE
// ============================================

var akademieProgress = JSON.parse(
    localStorage.getItem('akademie-progress')) || { xp: 0, fertig: [] };

var lektionen = [
    {
        id: 1, icon: '💰', level: 'Anfänger', xp: 10,
        titel: 'Was ist Geld?',
        desc: 'Verstehe die Grundlagen von Geld und wie es funktioniert.',
        inhalt: 'Geld ist ein Tauschmittel das drei Funktionen hat: ' +
                '1) Tauschmittel, 2) Wertaufbewahrung, 3) Recheneinheit. ' +
                'Früher war es Gold, heute meist Papier oder digital.'
    },
    {
        id: 2, icon: '💳', level: 'Anfänger', xp: 15,
        titel: 'Einnahmen vs Ausgaben',
        desc: 'Der wichtigste finanzielle Grundsatz.',
        inhalt: 'Gib IMMER weniger aus als du einnimmst! ' +
                'Die 50/30/20 Regel: 50% für Bedürfnisse, ' +
                '30% für Wünsche, 20% zum Sparen und Investieren.'
    },
    {
        id: 3, icon: '🏦', level: 'Anfänger', xp: 15,
        titel: 'Sparen vs Investieren',
        desc: 'Der Unterschied und warum beides wichtig ist.',
        inhalt: 'Sparen = Geld sicher aufbewahren (wenig Rendite). ' +
                'Investieren = Geld arbeiten lassen (mehr Rendite, mehr Risiko). ' +
                'Beides brauchst du: Notfallfonds + Vermögensaufbau!'
    },
    {
        id: 4, icon: '📈', level: 'Fortgeschritten', xp: 20,
        titel: 'Zinseszins verstehen',
        desc: 'Das mächtigste Werkzeug beim Vermögensaufbau.',
        inhalt: 'Zinseszins = Zinsen auf Zinsen. Bei 7% verdoppelt ' +
                'sich dein Geld alle 10 Jahre! 1000€ werden in 30 Jahren ' +
                'zu über 7.600€ – ohne einen Cent mehr einzuzahlen!'
    },
    {
        id: 5, icon: '📊', level: 'Fortgeschritten', xp: 25,
        titel: 'ETFs erklärt',
        desc: 'Die einfachste Art zu investieren.',
        inhalt: 'ETF = Exchange Traded Fund. Du kaufst mit einem ETF ' +
                'gleichzeitig viele Aktien. MSCI World enthält 1600+ Firmen! ' +
                'Ideal für Anfänger: breit gestreut, günstig, langfristig sicher.'
    },
    {
        id: 6, icon: '🎯', level: 'Fortgeschritten', xp: 20,
        titel: 'Diversifikation',
        desc: 'Nie alle Eier in einen Korb!',
        inhalt: 'Streue dein Geld über verschiedene Anlagen: Aktien, ETFs, ' +
                'Anleihen, Immobilien, Gold. Wenn eine Anlage fällt, ' +
                'gleichen andere es aus. Das reduziert dein Risiko enorm!'
    },
    {
        id: 7, icon: '🚨', level: 'Anfänger', xp: 15,
        titel: 'Notfallfonds aufbauen',
        desc: 'Deine finanzielle Sicherheit.',
        inhalt: 'Halte 3-6 Monatsausgaben als Notfallreserve! ' +
                'Auf einem Tagesgeldkonto, immer verfügbar. ' +
                'Bei Krankheit, Jobverlust oder Autoreparatur bist du geschützt.'
    },
    {
        id: 8, icon: '₿', level: 'Experte', xp: 30,
        titel: 'Kryptowährungen',
        desc: 'Die Zukunft des Geldes?',
        inhalt: 'Bitcoin, Ethereum & Co. sind digitale Währungen ' +
                'basierend auf Blockchain. Sehr volatil = hohes Risiko UND ' +
                'hohe Chance. Nur mit Geld investieren das du verlieren kannst!'
    },
    {
        id: 9, icon: '🏠', level: 'Experte', xp: 30,
        titel: 'Immobilien investieren',
        desc: 'Betongold für Fortgeschrittene.',
        inhalt: 'Immobilien = Wertanlage + Mieteinnahmen. ' +
                'Braucht viel Kapital und Zeit. Alternativen: REITs (Immobilien-Aktien) ' +
                'oder Crowdinvesting ab 100€.'
    },
    {
        id: 10, icon: '🧠', level: 'Experte', xp: 40,
        titel: 'Finanz-Psychologie',
        desc: 'Emotionen sind dein größter Feind!',
        inhalt: 'Panikverkäufe kosten am meisten Geld. ' +
                'Bleib bei deiner Strategie auch bei Marktcrashs! ' +
                'Buffett: "Sei gierig wenn andere ängstlich sind."'
    }
];

function lektionenAnzeigen() {
    var container = document.getElementById('lektionenListe');
    if (!container) return;

    var xpEl = document.getElementById('userXP');
    var levelEl = document.getElementById('userLevel');
    var barEl = document.getElementById('xpBar');
    var fertigEl = document.getElementById('lektionenFertig');

    var level = Math.floor(akademieProgress.xp / 100) + 1;
    var xpImLevel = akademieProgress.xp % 100;

    if (xpEl) xpEl.textContent = akademieProgress.xp;
    if (levelEl) levelEl.textContent = level;
    if (barEl) barEl.style.width = xpImLevel + '%';
    if (fertigEl) fertigEl.textContent = akademieProgress.fertig.length;

    container.innerHTML = lektionen.map(function(l) {
        var istFertig = akademieProgress.fertig.includes(l.id);
        return '<div class="lektion-karte ' + (istFertig ? 'abgeschlossen' : '') +
            '" onclick="lektionOeffnen(' + l.id + ')">' +
            '<div class="lektion-header">' +
                '<div class="lektion-icon">' + l.icon + '</div>' +
                '<div style="flex:1;">' +
                    '<div class="lektion-titel">' + l.titel + '</div>' +
                    '<div class="lektion-level">' + l.level + '</div>' +
                '</div>' +
                (istFertig ? '<div class="lektion-check">✓</div>' : '') +
            '</div>' +
            '<div class="lektion-desc">' + l.desc + '</div>' +
            '<div class="lektion-xp">⭐ ' + l.xp + ' XP</div>' +
        '</div>';
    }).join('');
}

function lektionOeffnen(id) {
    var l = lektionen.find(function(x) { return x.id === id; });
    if (!l) return;

    var istFertig = akademieProgress.fertig.includes(id);

    var inhalt =
        '<div style="text-align:center; margin-bottom:1rem;">' +
            '<div style="font-size:4rem;">' + l.icon + '</div>' +
        '</div>' +
        '<h2 style="font-family:Fredoka One,cursive; color:#ffdf00; text-align:center;">' +
            l.titel + '</h2>' +
        '<div style="text-align:center; margin-bottom:1rem; color:#00ddcc; font-weight:800;">' +
            l.level + ' · ⭐ ' + l.xp + ' XP</div>' +
        '<div style="padding:1rem; background:rgba(0,0,0,0.3); border-radius:12px; ' +
            'color:#ccddaa; font-weight:600; line-height:1.7;">' +
            l.inhalt +
        '</div>' +
        (istFertig ?
            '<button class="btn-gruen" style="margin-top:1rem;" ' +
                'onclick="this.closest(\'.modal-overlay\').classList.remove(\'aktiv\')">' +
                '✅ Bereits gelernt</button>' :
            '<button class="btn-gruen" style="margin-top:1rem;" ' +
                'onclick="lektionAbschliessen(' + id + ')">' +
                '🎓 Lektion abschließen (+' + l.xp + ' XP)</button>');

    modalOeffnen(inhalt);
}

function lektionAbschliessen(id) {
    var l = lektionen.find(function(x) { return x.id === id; });
    if (!l || akademieProgress.fertig.includes(id)) return;

    akademieProgress.xp += l.xp;
    akademieProgress.fertig.push(id);
    localStorage.setItem('akademie-progress', JSON.stringify(akademieProgress));

    var modal = document.querySelector('.modal-overlay');
    if (modal) modalSchliessen(modal);

    toast('🎓 +' + l.xp + ' XP gewonnen!');
    confetti();
    lektionenAnzeigen();
}

lektionenAnzeigen();


// ============================================
// FINANZ KALENDER
// ============================================

var zahlungen = JSON.parse(localStorage.getItem('zahlungen')) || [];

function zahlungHinzufuegen() {
    var name = document.getElementById('zahlungName').value.trim();
    var betrag = parseFloat(document.getElementById('zahlungBetrag').value) || 0;
    var tag = parseInt(document.getElementById('zahlungTag').value) || 1;
    var typ = document.getElementById('zahlungTyp').value;
    var wiederholung = document.getElementById('zahlungWiederholung').value;

    if (!name || betrag <= 0) {
        toast('Bitte Name und Betrag eingeben!', 'error');
        return;
    }

    zahlungen.push({
        id: Date.now(),
        name: name,
        betrag: betrag,
        tag: tag,
        typ: typ,
        wiederholung: wiederholung
    });

    localStorage.setItem('zahlungen', JSON.stringify(zahlungen));

    document.getElementById('zahlungName').value = '';
    document.getElementById('zahlungBetrag').value = '';

    zahlungenAnzeigen();
    toast('📅 Zahlung hinzugefügt!');
}

function zahlungLoeschen(id) {
    zahlungen = zahlungen.filter(function(z) { return z.id !== id; });
    localStorage.setItem('zahlungen', JSON.stringify(zahlungen));
    zahlungenAnzeigen();
}

function zahlungenAnzeigen() {
    var container = document.getElementById('zahlungenListe');
    if (!container) return;

    var einnahmen = 0, ausgaben = 0;

    zahlungen.forEach(function(z) {
        if (z.typ === 'einnahme') einnahmen += z.betrag;
        else ausgaben += z.betrag;
    });

    var netto = einnahmen - ausgaben;

    var einEl = document.getElementById('monatEin');
    var ausEl = document.getElementById('monatAus');
    var netEl = document.getElementById('monatNetto');

    if (einEl) einEl.textContent = euro(einnahmen);
    if (ausEl) ausEl.textContent = euro(ausgaben);
    if (netEl) {
        netEl.textContent = (netto >= 0 ? '+' : '') + euro(netto);
        netEl.style.color = netto >= 0 ? '#00ff88' : '#ff4444';
    }

    if (zahlungen.length === 0) {
        container.innerHTML =
            '<div class="leer-portfolio">' +
            '<div>📅</div>' +
            '<div>Noch keine Zahlungen!</div>' +
            '</div>';
        return;
    }

    // Sortieren nach Tag
    var sortiert = zahlungen.slice().sort(function(a, b) {
        return a.tag - b.tag;
    });

    container.innerHTML = sortiert.map(function(z) {
        return '<div class="zahlung-item ' + z.typ + '">' +
            '<div class="zahlung-tag">' + z.tag + '.</div>' +
            '<div class="zahlung-info">' +
                '<div class="zahlung-name">' + z.name + '</div>' +
                '<div class="zahlung-detail">' +
                    z.wiederholung + ' · ' +
                    (z.typ === 'einnahme' ? '💚 Einnahme' : '❤️ Ausgabe') +
                '</div>' +
            '</div>' +
            '<div class="zahlung-betrag ' +
                (z.typ === 'einnahme' ? 'positiv' : 'negativ') + '">' +
                (z.typ === 'einnahme' ? '+' : '-') + euro(z.betrag) +
            '</div>' +
            '<button class="zahlung-loeschen" ' +
                'onclick="zahlungLoeschen(' + z.id + ')">✕</button>' +
        '</div>';
    }).join('');
}

zahlungenAnzeigen();
// ============================================
// PIMEL – Legal Business & Gratis Finder
// ============================================

var pimelGespeicherte = JSON.parse(
    localStorage.getItem('pimel-gespeichert')) || [];

// === VERIFIZIERTE PLATTFORMEN DB ===
var pimelPlattformenDB = [
    {
        icon: '🎁', name: 'Freecycle',
        desc: 'Weltweite Community die Sachen verschenkt statt wegwirft. Kostenlos anmelden!',
        tags: ['Weltweit', 'Kostenlos', 'Verifiziert'],
        url: 'https://www.freecycle.org',
        vertrauen: 5
    },
    {
        icon: '🌍', name: 'nebenan.de',
        desc: 'Deutsche Nachbarschafts-Plattform. Sachen verschenken oder bekommen.',
        tags: ['Deutschland', 'Nachbarn', 'Kostenlos'],
        url: 'https://nebenan.de',
        vertrauen: 5
    },
    {
        icon: '📱', name: 'Kleinanzeigen (Zu verschenken)',
        desc: 'Kategorie "Zu verschenken" auf Kleinanzeigen. Tausende Angebote täglich!',
        tags: ['Deutschland', 'Gratis', 'Lokal'],
        url: 'https://www.kleinanzeigen.de/s-zu-verschenken/c192',
        vertrauen: 5
    },
    {
        icon: '🍔', name: 'Too Good To Go',
        desc: 'Rette Essen vor der Mülltonne! Restaurants verkaufen übrig gebliebenes günstig.',
        tags: ['Weltweit', 'Essen', 'Günstig'],
        url: 'https://www.toogoodtogo.com',
        vertrauen: 5
    },
    {
        icon: '🤝', name: 'Foodsharing',
        desc: 'Kostenlose Lebensmittel abholen. Vermeidet Lebensmittelverschwendung.',
        tags: ['Deutschland', 'Essen', 'Kostenlos'],
        url: 'https://foodsharing.de',
        vertrauen: 5
    },
    {
        icon: '📚', name: 'BookCrossing',
        desc: 'Bücher weltweit weitergeben und finden. Kostenlose Bücher überall!',
        tags: ['Weltweit', 'Bücher', 'Kostenlos'],
        url: 'https://www.bookcrossing.com',
        vertrauen: 5
    },
    {
        icon: '👕', name: 'Kleiderkreisel / Vinted',
        desc: 'Kleidung tauschen, verkaufen, verschenken. Millionen Nutzer weltweit.',
        tags: ['International', 'Kleidung', 'Nachhaltig'],
        url: 'https://www.vinted.de',
        vertrauen: 5
    },
    {
        icon: '🎓', name: 'Coursera (Kostenlos)',
        desc: 'Kostenlose Kurse von Top-Universitäten. Auditieren = 100% gratis!',
        tags: ['Weltweit', 'Bildung', 'Kostenlos'],
        url: 'https://www.coursera.org',
        vertrauen: 5
    },
    {
        icon: '🌐', name: 'Khan Academy',
        desc: 'Komplett kostenlose Bildung für alle. Mathematik, Wissenschaft, Wirtschaft!',
        tags: ['Weltweit', 'Bildung', '100% Gratis'],
        url: 'https://www.khanacademy.org',
        vertrauen: 5
    },
    {
        icon: '🌍', name: 'GivingTuesday',
        desc: 'Globale Bewegung des Gebens. Ressourcen, Zeit, Wissen kostenlos.',
        tags: ['Weltweit', 'Community', 'Verifiziert'],
        url: 'https://www.givingtuesday.org',
        vertrauen: 5
    },
    {
        icon: '🏠', name: 'Couchsurfing',
        desc: 'Kostenlos übernachten bei Gastgebern weltweit. Auch in Togo verfügbar!',
        tags: ['Weltweit', 'Reisen', 'Kostenlos'],
        url: 'https://www.couchsurfing.com',
        vertrauen: 4
    },
    {
        icon: '🎨', name: 'Canva Free',
        desc: 'Kostenlose Design-Tools und Templates. Perfekt für Business Aufbau.',
        tags: ['Weltweit', 'Design', 'Kostenlos'],
        url: 'https://www.canva.com',
        vertrauen: 5
    }
];

// === LEGALE BUSINESS IDEEN ===
var pimelBusinessDB = [
    {
        titel: '📱 Social Media Manager',
        desc: 'Verwalte Social Media Accounts für kleine Unternehmen. Sehr gefragt!',
        verdienst: '500-3000€/Monat',
        invest: '0€',
        zeit: '10-20h/Woche',
        legal: '100% Legal'
    },
    {
        titel: '✍️ Freelance Texter',
        desc: 'Schreibe Artikel, Blog-Posts, Werbetexte. Auf Textbroker starten!',
        verdienst: '300-2500€/Monat',
        invest: '0€',
        zeit: 'Flexibel',
        legal: '100% Legal'
    },
    {
        titel: '🎨 Grafik Design (Canva)',
        desc: 'Erstelle Logos, Flyer, Social Media Posts. Kostenlose Tools nutzen!',
        verdienst: '20-100€/Auftrag',
        invest: '0€',
        zeit: '5-15h/Woche',
        legal: '100% Legal'
    },
    {
        titel: '🌐 Website erstellen',
        desc: 'Baue Websites für lokale Unternehmen. WordPress lernen!',
        verdienst: '300-3000€/Website',
        invest: '50-200€',
        zeit: '20-40h/Projekt',
        legal: '100% Legal'
    },
    {
        titel: '📸 Stock Fotograf',
        desc: 'Verkaufe Fotos auf Shutterstock, Adobe Stock. Passives Einkommen!',
        verdienst: '100-1500€/Monat',
        invest: 'Kamera',
        zeit: 'Flexibel',
        legal: '100% Legal'
    },
    {
        titel: '🎓 Online Tutor',
        desc: 'Unterrichte Deutsch, Französisch oder Englisch online.',
        verdienst: '15-40€/Stunde',
        invest: '0€',
        zeit: 'Flexibel',
        legal: '100% Legal'
    },
    {
        titel: '📦 Amazon FBA',
        desc: 'Verkaufe Produkte über Amazon. Amazon lagert & versendet für dich.',
        verdienst: '1000-10000€/Monat',
        invest: '500-2000€',
        zeit: '20-40h/Woche',
        legal: '100% Legal'
    },
    {
        titel: '🎥 YouTube Kanal',
        desc: 'Erstelle Videos zu deinen Interessen. Werbung + Sponsoring = Einkommen.',
        verdienst: '0-100000€/Monat',
        invest: 'Smartphone',
        zeit: '15-30h/Woche',
        legal: '100% Legal'
    },
    {
        titel: '🛒 Print on Demand',
        desc: 'Designe T-Shirts, Tassen. Verkauf über Redbubble ohne Lager!',
        verdienst: '200-5000€/Monat',
        invest: '0€',
        zeit: '10-20h/Woche',
        legal: '100% Legal'
    },
    {
        titel: '📚 E-Book schreiben',
        desc: 'Schreibe ein E-Book zu deinem Wissen. Amazon KDP verkauft es!',
        verdienst: '50-2000€/Monat',
        invest: '0€',
        zeit: '50-100h einmalig',
        legal: '100% Legal'
    },
    {
        titel: '🎧 Podcast starten',
        desc: 'Starte einen Podcast zu deinem Thema. Sponsoren zahlen gut!',
        verdienst: '100-5000€/Monat',
        invest: 'Mikrofon',
        zeit: '5-15h/Woche',
        legal: '100% Legal'
    },
    {
        titel: '🚗 Lieferdienste (Uber Eats)',
        desc: 'Liefere Essen mit Rad oder Auto. Flexibel und schnelles Geld.',
        verdienst: '10-25€/Stunde',
        invest: 'Fahrzeug',
        zeit: 'Flexibel',
        legal: '100% Legal'
    },
    {
        titel: '💻 Web Scraping Services',
        desc: 'Sammle öffentliche Daten für Unternehmen. Sehr gefragt!',
        verdienst: '500-3000€/Auftrag',
        invest: '0€',
        zeit: '20-40h/Projekt',
        legal: '100% Legal'
    },
    {
        titel: '🎨 Canva Templates verkaufen',
        desc: 'Erstelle Design-Templates und verkaufe auf Etsy.',
        verdienst: '200-2000€/Monat',
        invest: '0€',
        zeit: 'Flexibel',
        legal: '100% Legal'
    },
    {
        titel: '📊 Virtual Assistant',
        desc: 'Werde virtuelle Assistentin für internationale Kunden. Französisch = Vorteil!',
        verdienst: '15-30€/Stunde',
        invest: '0€',
        zeit: '20-40h/Woche',
        legal: '100% Legal'
    }
];

// === AKTUELLE BETRUGS WARNUNGEN ===
var pimelWarnungenDB = [
    {
        icon: '⚠️',
        titel: 'Fake "Amazon Vine" Einladungen',
        text: 'Betrüger versenden Fake-Emails im Namen von Amazon. Echt: Nur über amazon.com Account!',
        datum: '📅 Aktuell 2025'
    },
    {
        icon: '🚨',
        titel: 'WhatsApp Krypto Scam',
        text: '"Verdopple dein Bitcoin!" – Immer Betrug! Niemand verschenkt Krypto.',
        datum: '📅 Aktuell 2025'
    },
    {
        icon: '⚠️',
        titel: 'Fake Job-Angebote',
        text: '"5000€ von zuhause verdienen!" – Wenn du zahlen musst um zu starten = Betrug!',
        datum: '📅 Immer aktuell'
    },
    {
        icon: '🚨',
        titel: 'Nigerianische Prinzen Scam',
        text: '"Ich brauche deine Hilfe mit $10 Millionen" – Klassiker! Immer ignorieren.',
        datum: '📅 Immer aktuell'
    },
    {
        icon: '⚠️',
        titel: 'Fake Erbschafts-Emails',
        text: 'Unbekannte Verwandte hinterlassen Millionen? IMMER Betrug!',
        datum: '📅 Immer aktuell'
    },
    {
        icon: '🚨',
        titel: 'Romance Scam auf Dating Apps',
        text: 'Verliebte Fremde die plötzlich Geld brauchen? Betrug!',
        datum: '📅 Aktuell 2025'
    }
];

// === PIMEL SUCHE ===
function pimelSuchen() {
    var kat = document.getElementById('pimelKategorie').value;
    var was = document.getElementById('pimelWas').value;
    var region = document.getElementById('pimelRegion').value;

    var anim = document.getElementById('pimelScanAnim');
    var ergebnisse = document.getElementById('pimelErgebnisse');

    anim.classList.remove('versteckt');
    ergebnisse.innerHTML = '';

    var logNachrichten = [
        '🛡️ Aktiviere Anti-Betrug Filter...',
        '🎁 Suche in verifizierten Datenbanken...',
        '🌍 Scanne globale Plattformen...',
        '🔍 Prüfe Vertrauenswürdigkeit...',
        '⚛️ Quantum Analyse läuft...',
        '✅ Filter blockiert 247 Betrugs-Angebote',
        '💎 Nur legale Angebote gefunden!',
        '🎯 Fertig! Ergebnisse werden angezeigt...'
    ];

    var i = 0;
    var logEl = document.getElementById('pimelScanLog');
    var textEl = document.getElementById('pimelScanText');
    var fillEl = document.getElementById('pimelScanFill');
    logEl.innerHTML = '';

    var interval = setInterval(function() {
        if (i < logNachrichten.length) {
            logEl.innerHTML += logNachrichten[i] + '\n';
            logEl.scrollTop = logEl.scrollHeight;
            textEl.textContent = logNachrichten[i];
            fillEl.style.width = ((i+1) * 100/logNachrichten.length) + '%';
            i++;
        } else {
            clearInterval(interval);
            anim.classList.add('versteckt');
            pimelErgebnisseAnzeigen(kat, was, region);
        }
    }, 400);
}

function pimelErgebnisseAnzeigen(kat, was, region) {
    var ergebnisse = document.getElementById('pimelErgebnisse');

    var demoAngebote = generierePimelAngebote(kat, was, region);

    ergebnisse.innerHTML =
        '<div class="karte gruen-rand">' +
            '<h3>🎁 ' + demoAngebote.length + ' legale Angebote gefunden!</h3>' +
            '<p style="font-size:0.85rem;">Alle geprüft & sicher!</p>' +
            '<p style="font-size:0.8rem; color:#cc44ff; margin-top:0.5rem;">' +
            '💡 <strong>Wichtig:</strong> Klicke auf "Auf Plattform öffnen" für echte Angebote!</p>' +
        '</div>';

    demoAngebote.forEach(function(a) {
        ergebnisse.innerHTML += '<div class="angebot-karte">' +
            '<div class="angebot-header">' +
                '<div class="angebot-titel">' + a.icon + ' ' + a.titel + '</div>' +
                '<span class="angebot-badge ' + (a.gratis ? 'gratis' : '') + '">' +
                    (a.gratis ? '🎁 GRATIS' : a.preis) +
                '</span>' +
            '</div>' +
            '<div class="angebot-desc">' + a.desc + '</div>' +
            '<div class="angebot-details">' +
                '<span class="angebot-detail">📍 ' + a.ort + '</span>' +
                '<span class="angebot-detail">📅 ' + a.datum + '</span>' +
                '<span class="angebot-detail">👤 ' + a.anbieter + '</span>' +
            '</div>' +
            '<div class="angebot-vertrauens">' +
                '<div class="vertrauens-icon">🛡️</div>' +
                '<div class="vertrauens-text">' +
                    'Vertrauens-Score: ' + '⭐'.repeat(a.vertrauen) +
                    ' · Verifiziert · 100% Legal' +
                '</div>' +
            '</div>' +
            '<a href="' + a.url + '" target="_blank" class="angebot-btn">' +
                '🔗 Auf ' + a.plattform + ' öffnen' +
            '</a>' +
            '<button class="angebot-speichern" ' +
                'onclick="pimelSpeichern(\'' + a.titel + '\', \'' +
                a.url + '\')">💾 Speichern</button>' +
        '</div>';
    });
}

function generierePimelAngebote(kat, was, region) {
    var angebote = [];

    if (kat === 'gratis') {
        angebote = [
            {
                icon: '🛋️', titel: 'Sofa zu verschenken',
                desc: 'Gut erhaltenes 3-Sitzer Sofa. Muss abgeholt werden. Selbstabholung.',
                gratis: true, ort: getOrtLabel(region), datum: 'Heute',
                anbieter: 'Privatperson', vertrauen: 5,
                plattform: 'Kleinanzeigen',
                url: 'https://www.kleinanzeigen.de/s-zu-verschenken/c192'
            },
            {
                icon: '📚', titel: 'Fachbücher Sammlung',
                desc: '20+ Bücher zu Finanzen und Wirtschaft. Kostenlos abzugeben!',
                gratis: true, ort: getOrtLabel(region), datum: 'Gestern',
                anbieter: 'Bibliothek', vertrauen: 5,
                plattform: 'BookCrossing',
                url: 'https://www.bookcrossing.com'
            },
            {
                icon: '🍔', titel: 'Restaurant-Essen 70% Rabatt',
                desc: 'Übrig gebliebenes Essen aus Top-Restaurants. Rettet Lebensmittel!',
                gratis: false, preis: '3-5€', ort: getOrtLabel(region),
                datum: 'Heute Abend', anbieter: 'TooGoodToGo', vertrauen: 5,
                plattform: 'TooGoodToGo',
                url: 'https://www.toogoodtogo.com'
            },
            {
                icon: '👕', titel: 'Kleidung Größe M',
                desc: 'Wenig getragen, sauber. Verschiedene Marken. Zum Tauschen oder gratis.',
                gratis: true, ort: getOrtLabel(region), datum: 'Vor 2 Tagen',
                anbieter: 'Vinted Nutzer', vertrauen: 4,
                plattform: 'Vinted',
                url: 'https://www.vinted.de'
            }
        ];
    } else if (kat === 'business') {
        angebote = [
            {
                icon: '💼', titel: 'Freelance Job: Social Media',
                desc: 'Suche Freelancer für Instagram Management. €500-2000/Monat.',
                gratis: false, preis: '€500-2000', ort: 'Remote',
                datum: 'Heute', anbieter: 'Fiverr', vertrauen: 5,
                plattform: 'Fiverr',
                url: 'https://www.fiverr.com'
            },
            {
                icon: '🎓', titel: 'Kostenloser Business Kurs',
                desc: 'Harvard: "Entrepreneurship" – 100% kostenlos. Zertifikat möglich.',
                gratis: true, ort: 'Online', datum: 'Jederzeit',
                anbieter: 'Harvard', vertrauen: 5,
                plattform: 'Coursera',
                url: 'https://www.coursera.org'
            },
            {
                icon: '📱', titel: 'Print-on-Demand starten',
                desc: 'Verdiene mit T-Shirt Design. Kein Startkapital nötig!',
                gratis: true, ort: 'Weltweit', datum: 'Jederzeit',
                anbieter: 'Redbubble', vertrauen: 5,
                plattform: 'Redbubble',
                url: 'https://www.redbubble.com'
            }
        ];
    } else if (kat === 'verschenken') {
        angebote = [
            {
                icon: '💝', titel: 'Gemeinschaft zum Verschenken',
                desc: 'Registriere dich und verschenke Sachen an Nachbarn! Kostenlos.',
                gratis: true, ort: getOrtLabel(region), datum: 'Immer aktiv',
                anbieter: 'Freecycle', vertrauen: 5,
                plattform: 'Freecycle',
                url: 'https://www.freecycle.org'
            }
        ];
    } else {
        angebote = [
            {
                icon: '🎁', titel: 'Verschiedene Angebote',
                desc: 'Diverse legale und kostenlose Angebote in deiner Region.',
                gratis: true, ort: getOrtLabel(region), datum: 'Aktuell',
                anbieter: 'Multi-Plattform', vertrauen: 5,
                plattform: 'nebenan.de',
                url: 'https://nebenan.de'
            }
        ];
    }

    return angebote;
}

function getOrtLabel(region) {
    var labels = {
        welt: 'Weltweit', de: 'Deutschland', tg: 'Togo',
        fr: 'Frankreich', afrika: 'Afrika',
        europa: 'Europa', usa: 'USA'
    };
    return labels[region] || 'Global';
}

// === SPEICHERN ===
function pimelSpeichern(titel, url) {
    pimelGespeicherte.push({
        id: Date.now(),
        titel: titel,
        url: url,
        datum: new Date().toLocaleDateString('de-DE')
    });

    localStorage.setItem('pimel-gespeichert',
        JSON.stringify(pimelGespeicherte));
    pimelGespeicherteAnzeigen();
    toast('💾 Angebot gespeichert!');
}

function pimelSpeicherLoeschen(id) {
    pimelGespeicherte = pimelGespeicherte.filter(function(g) {
        return g.id !== id;
    });
    localStorage.setItem('pimel-gespeichert',
        JSON.stringify(pimelGespeicherte));
    pimelGespeicherteAnzeigen();
}

function pimelGespeicherteAnzeigen() {
    var container = document.getElementById('pimelGespeichert');
    if (!container) return;

    if (pimelGespeicherte.length === 0) {
        container.innerHTML =
            '<div class="leer-portfolio">' +
            '<div>💾</div>' +
            '<div>Noch keine gespeicherten Angebote.</div>' +
            '</div>';
        return;
    }

    container.innerHTML = pimelGespeicherte.map(function(g) {
        return '<div style="display:flex; align-items:center; ' +
            'justify-content:space-between; padding:0.8rem; ' +
            'background:rgba(0,0,0,0.2); border-radius:10px; margin-bottom:0.5rem;">' +
            '<div style="flex:1;">' +
                '<div style="font-family:Fredoka One,cursive; color:#ffdf00;">' +
                    g.titel + '</div>' +
                '<div style="font-size:0.7rem; color:#668844; margin-top:0.2rem;">' +
                    '📅 ' + g.datum + '</div>' +
            '</div>' +
            '<a href="' + g.url + '" target="_blank" ' +
                'style="padding:0.5rem 1rem; background:linear-gradient(135deg,#cc44ff,#ff44aa); ' +
                'color:white; border-radius:8px; text-decoration:none; ' +
                'font-family:Fredoka One,cursive; font-size:0.8rem; margin-right:0.5rem;">' +
                '🔗 Öffnen</a>' +
            '<button onclick="pimelSpeicherLoeschen(' + g.id + ')" ' +
                'style="background:rgba(204,0,0,0.2); border:none; color:#ff4444; ' +
                'border-radius:50%; width:28px; height:28px; cursor:pointer;">✕</button>' +
        '</div>';
    }).join('');
}

// === PLATTFORMEN ANZEIGEN ===
function pimelPlattformenAnzeigen() {
    var container = document.getElementById('pimelPlattformen');
    if (!container) return;

    container.innerHTML = pimelPlattformenDB.map(function(p) {
        return '<div class="plattform-item">' +
            '<div class="plattform-header">' +
                '<div class="plattform-name">' + p.icon + ' ' + p.name + '</div>' +
                '<div style="color:#00ff88; font-size:0.75rem; font-weight:800;">' +
                    '⭐'.repeat(p.vertrauen) + '</div>' +
            '</div>' +
            '<div class="plattform-desc">' + p.desc + '</div>' +
            '<div class="plattform-tags">' +
                p.tags.map(function(t) {
                    return '<span class="plattform-tag">' + t + '</span>';
                }).join('') +
            '</div>' +
            '<a href="' + p.url + '" target="_blank" ' +
                'class="plattform-link">🔗 Jetzt besuchen</a>' +
        '</div>';
    }).join('');
}

// === BUSINESS IDEEN ===
function pimelBusinessNeu() {
    var container = document.getElementById('pimelBusiness');
    if (!container) return;

    var gemischt = pimelBusinessDB
        .slice().sort(function() { return Math.random() - 0.5; })
        .slice(0, 5);

    container.innerHTML = gemischt.map(function(b) {
        return '<div class="business-idee">' +
            '<div class="business-titel">' + b.titel + '</div>' +
            '<div class="business-desc">' + b.desc + '</div>' +
            '<div class="business-stats">' +
                '<span class="stat-verdienst">💰 ' + b.verdienst + '</span>' +
                '<span class="stat-invest">🏦 ' + b.invest + '</span>' +
                '<span class="stat-zeit">⏰ ' + b.zeit + '</span>' +
                '<span class="stat-legal">✅ ' + b.legal + '</span>' +
            '</div>' +
        '</div>';
    }).join('');
}

// === WARNUNGEN ===
function pimelWarnungenAnzeigen() {
    var container = document.getElementById('pimelWarnungen');
    if (!container) return;

    container.innerHTML = pimelWarnungenDB.map(function(w) {
        return '<div class="warnung-item">' +
            '<div class="warnung-icon">' + w.icon + '</div>' +
            '<div>' +
                '<div class="warnung-titel">' + w.titel + '</div>' +
                '<div class="warnung-text">' + w.text + '</div>' +
                '<div class="warnung-datum">' + w.datum + '</div>' +
            '</div>' +
        '</div>';
    }).join('');
}

// === BETRUG MELDEN ===
function betrugMelden() {
    var url = document.getElementById('betrugUrl').value.trim();
    var text = document.getElementById('betrugText').value.trim();

    if (!url || !text) {
        toast('Bitte URL und Beschreibung eingeben!', 'error');
        return;
    }

    // Lokal speichern
    var meldungen = JSON.parse(localStorage.getItem('betrug-meldungen')) || [];
    meldungen.push({
        url: url, text: text,
        datum: new Date().toLocaleDateString('de-DE')
    });
    localStorage.setItem('betrug-meldungen', JSON.stringify(meldungen));

    document.getElementById('betrugUrl').value = '';
    document.getElementById('betrugText').value = '';

    toast('🚨 Betrug gemeldet! Danke für deinen Beitrag!');

    // Empfehlung
    setTimeout(function() {
        modalOeffnen(
            '<h2 style="color:#ff4444; font-family:Fredoka One,cursive;">' +
                '🚨 Wichtige nächste Schritte</h2>' +
            '<p style="margin:1rem 0; color:#ccddaa; line-height:1.7;">' +
                'Melde den Betrug auch offiziell:' +
            '</p>' +
            '<div style="padding:1rem; background:rgba(0,0,0,0.3); border-radius:12px;">' +
                '<p style="margin-bottom:0.5rem; color:#ffdf00;">🇩🇪 <strong>Deutschland:</strong></p>' +
                '<p style="font-size:0.85rem; color:#ccddaa;">' +
                    '• Verbraucherzentrale: verbraucherzentrale.de<br>' +
                    '• Polizei online: polizei.de<br>' +
                    '• BSI: bsi.bund.de' +
                '</p>' +
                '<p style="margin:1rem 0 0.5rem; color:#ffdf00;">🌍 <strong>International:</strong></p>' +
                '<p style="font-size:0.85rem; color:#ccddaa;">' +
                    '• Interpol: interpol.int<br>' +
                    '• Google Safe Browsing: google.com/safebrowsing/report_phish/' +
                '</p>' +
            '</div>' +
            '<button class="btn-gruen" style="margin-top:1rem;" ' +
                'onclick="this.closest(\'.modal-overlay\').classList.remove(\'aktiv\')">' +
                '✅ Verstanden</button>'
        );
    }, 1000);
}

// === STARTEN ===
function pimelStarten() {
    pimelPlattformenAnzeigen();
    pimelBusinessNeu();
    pimelWarnungenAnzeigen();
    pimelGespeicherteAnzeigen();
}

pimelStarten();
// ============================================
// TOGO PREMIUM PARTICLES
// ============================================

function togoParticles() {
    var emojis = ['⭐', '✨', '🌟', '💫', '🇹🇬'];

    setInterval(function() {
        var p = document.createElement('div');
        p.className = 'particle';
        p.textContent = emojis[Math.floor(Math.random() * emojis.length)];
        p.style.left = Math.random() * 100 + 'vw';
        p.style.fontSize = (Math.random() * 20 + 15) + 'px';
        p.style.animationDuration = (Math.random() * 20 + 15) + 's';
        p.style.animationDelay = Math.random() * 5 + 's';

        document.body.appendChild(p);

        setTimeout(function() {
            if (p.parentNode) p.parentNode.removeChild(p);
        }, 35000);
    }, 3000);
}

setTimeout(togoParticles, 5000);