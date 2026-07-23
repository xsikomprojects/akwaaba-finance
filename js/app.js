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