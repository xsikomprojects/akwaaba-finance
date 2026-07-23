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