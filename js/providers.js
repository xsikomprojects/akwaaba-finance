// ============================================
// 💰 GLOBALE PROVIDER-DATENBANK
// Beste Anbieter für alle Finanz-Bereiche
// ============================================

var providersDB = {
    // === KREDITE ===
    kredite: {
        deutschland: [
            {
                name: 'Auxmoney',
                logo: '🏦',
                type: 'P2P Kredit',
                schufa: 'Ohne Schufa möglich',
                betrag: '1.000 - 50.000€',
                zinsen: '3.5% - 9.9%',
                laufzeit: '12-84 Monate',
                bewertung: '4.5/5',
                vorteile: ['Ohne Schufa OK', 'Auch bei negativen Einträgen', 'Schnelle Auszahlung'],
                url: 'https://www.auxmoney.com/',
                badge: 'BESTE OHNE SCHUFA'
            },
            {
                name: 'Smava',
                logo: '💳',
                type: 'Kreditvergleich',
                schufa: 'Mit Schufa',
                betrag: '1.000 - 120.000€',
                zinsen: '0.99% - 15.99%',
                laufzeit: '12-120 Monate',
                bewertung: '4.7/5',
                vorteile: ['Vergleicht 25+ Banken', 'Kostenlose Anfrage', 'Beste Zinsen'],
                url: 'https://www.smava.de/',
                badge: 'BESTER VERGLEICH'
            },
            {
                name: 'Check24 Kredit',
                logo: '✅',
                type: 'Kreditvergleich',
                schufa: 'Mit Schufa',
                betrag: '1.000 - 300.000€',
                zinsen: '2.99% - 15.99%',
                laufzeit: '12-120 Monate',
                bewertung: '4.8/5',
                vorteile: ['300+ Banken', 'Neutral', '100% kostenlos'],
                url: 'https://www.check24.de/kredit/',
                badge: 'BELIEBTESTE'
            },
            {
                name: 'Vexcash',
                logo: '⚡',
                type: 'Sofortkredit',
                schufa: 'Ohne Schufa',
                betrag: '100 - 3.000€',
                zinsen: '13.9%',
                laufzeit: '30-90 Tage',
                bewertung: '4.2/5',
                vorteile: ['Ohne Schufa', 'Auszahlung in 24h', 'Für Notfälle'],
                url: 'https://www.vexcash.com/',
                badge: 'BLITZKREDIT'
            }
        ],
        oesterreich: [
            {
                name: 'Cashper',
                logo: '💶',
                type: 'Minikredit',
                schufa: 'Ohne KSV möglich',
                betrag: '100 - 1.500€',
                zinsen: '13.9%',
                laufzeit: '15-30 Tage',
                bewertung: '4.3/5',
                vorteile: ['Schnell', 'Ohne KSV', 'Einfach'],
                url: 'https://www.cashper.at/'
            },
            {
                name: 'ING Direktkredit',
                logo: '🏛️',
                type: 'Bankkredit',
                schufa: 'Mit KSV',
                betrag: '5.000 - 75.000€',
                zinsen: '4.9% - 9.9%',
                laufzeit: '12-84 Monate',
                bewertung: '4.6/5',
                vorteile: ['Etablierte Bank', 'Faire Zinsen', 'Flexibel'],
                url: 'https://www.ing.at/'
            }
        ],
        schweiz: [
            {
                name: 'BOB Finance',
                logo: '🇨🇭',
                type: 'Privatkredit',
                schufa: 'Mit ZEK',
                betrag: '3.000 - 100.000 CHF',
                zinsen: '4.9% - 9.95%',
                laufzeit: '12-84 Monate',
                bewertung: '4.5/5',
                vorteile: ['Schweizer Qualität', 'Schnell', 'Digital'],
                url: 'https://www.bob-finance.com/'
            }
        ],
        international: [
            {
                name: 'Lendable (UK)',
                logo: '🇬🇧',
                type: 'Online Kredit',
                schufa: 'UK Credit Check',
                betrag: '£1.000 - 50.000',
                zinsen: '4.9% - 29.9%',
                laufzeit: '12-60 Monate',
                bewertung: '4.7/5',
                vorteile: ['Sofort Entscheidung', 'Ohne versteckte Kosten'],
                url: 'https://www.lendable.co.uk/'
            },
            {
                name: 'Younited Credit (FR)',
                logo: '🇫🇷',
                type: 'Prêt personnel',
                schufa: 'FR Bonité',
                betrag: '1.000 - 50.000€',
                zinsen: '2.9% - 15.9%',
                laufzeit: '6-84 Monate',
                bewertung: '4.6/5',
                vorteile: ['100% Online', 'Schnell', 'Fair'],
                url: 'https://www.younited-credit.com/'
            }
        ],
        afrika: [
            {
                name: 'Ecobank Togo',
                logo: '🇹🇬',
                type: 'Kredit',
                schufa: 'BIC Togo',
                betrag: '100.000 - 10 Mio FCFA',
                zinsen: '8% - 15%',
                laufzeit: '6-60 Monate',
                bewertung: '4.4/5',
                vorteile: ['Panafrikanisch', 'Digital Banking', 'Auch für Diaspora'],
                url: 'https://ecobank.com/tg/personal-banking'
            },
            {
                name: 'Orange Money Loan',
                logo: '📱',
                type: 'Mobile Kredit',
                schufa: 'Mobile Score',
                betrag: '5.000 - 500.000 FCFA',
                zinsen: '5% - 10%',
                laufzeit: '1-12 Monate',
                bewertung: '4.5/5',
                vorteile: ['Mobile Money', 'Schnell', 'Auch ohne Konto'],
                url: 'https://www.orange.tg/'
            }
        ]
    },

    // === TRADING & INVESTMENT ===
    trading: [
        {
            name: 'Trade Republic',
            logo: '📈',
            type: 'Broker',
            region: 'DE, EU',
            gebuehr: '0€ (nur 1€ pro Trade)',
            bewertung: '4.7/5',
            vorteile: ['0€ Depot', '4% Zinsen', '25€ Bonus'],
            url: 'https://ref.trade.re/wt5xt7ay',
            badge: 'BESTER BROKER'
        },
        {
            name: 'Scalable Capital',
            logo: '🚀',
            type: 'Neobroker',
            region: 'DE, EU',
            gebuehr: '0€ Prime',
            bewertung: '4.8/5',
            vorteile: ['1000+ ETFs', 'Krypto Trading', 'Robo-Advisor'],
            url: 'https://de.scalable.capital/',
            badge: 'PREMIUM'
        },
        {
            name: 'eToro',
            logo: '🌍',
            type: 'Social Trading',
            region: 'Weltweit',
            gebuehr: 'Spread',
            bewertung: '4.5/5',
            vorteile: ['Copy Trading', 'Krypto + Aktien', 'Community'],
            url: 'https://www.etoro.com/',
            badge: 'GLOBAL'
        },
        {
            name: 'DEGIRO',
            logo: '💼',
            type: 'Discount Broker',
            region: 'EU',
            gebuehr: 'Ab 2€/Trade',
            bewertung: '4.6/5',
            vorteile: ['Sehr günstig', 'Große Auswahl', 'Für Profis'],
            url: 'https://www.degiro.de/'
        },
        {
            name: 'Comdirect',
            logo: '🏦',
            type: 'Klassik Broker',
            region: 'DE',
            gebuehr: 'Ab 4,90€',
            bewertung: '4.5/5',
            vorteile: ['Etablierte Bank', 'Beratung', 'Komplett Paket'],
            url: 'https://www.comdirect.de/'
        }
    ],

    // === KRYPTO ===
    crypto: [
        {
            name: 'Bitpanda',
            logo: '🥇',
            type: 'Krypto Broker',
            region: 'EU (DE, AT)',
            gebuehr: '1.49% - 2.99%',
            bewertung: '4.6/5',
            vorteile: ['EU-reguliert', 'Beste UX', 'Auch Aktien/Gold'],
            url: 'https://www.bitpanda.com/',
            badge: 'EU BESTE'
        },
        {
            name: 'Binance',
            logo: '⚡',
            type: 'Krypto Börse',
            region: 'Weltweit',
            gebuehr: '0.1%',
            bewertung: '4.5/5',
            vorteile: ['Größte Börse', '500+ Coins', 'Niedrigste Gebühren'],
            url: 'https://www.binance.com/',
            badge: 'WELT #1'
        },
        {
            name: 'Coinbase',
            logo: '🏛️',
            type: 'Krypto Börse',
            region: 'US, EU',
            gebuehr: '1.49%',
            bewertung: '4.4/5',
            vorteile: ['Sehr sicher', 'US-reguliert', 'Einfach'],
            url: 'https://www.coinbase.com/'
        },
        {
            name: 'Kraken',
            logo: '🐙',
            type: 'Pro Trading',
            region: 'Weltweit',
            gebuehr: '0.16% - 0.26%',
            bewertung: '4.5/5',
            vorteile: ['Für Profis', 'Sehr sicher', 'Advanced Features'],
            url: 'https://www.kraken.com/'
        },
        {
            name: 'Nexo',
            logo: '💎',
            type: 'Crypto Bank',
            region: 'Weltweit',
            gebuehr: '0%',
            bewertung: '4.4/5',
            vorteile: ['Bis 16% Zinsen', 'Krypto Loans', 'Karte'],
            url: 'https://nexo.io/'
        }
    ],

    // === BANKING ===
    banking: [
        {
            name: 'N26',
            logo: '📱',
            type: 'Mobile Bank',
            region: 'EU',
            gebuehr: '0€ Standard',
            bewertung: '4.5/5',
            vorteile: ['100% Digital', 'Kostenlose Karte', 'Sub-Konten'],
            url: 'https://n26.com/',
            badge: 'MOBILE BESTE'
        },
        {
            name: 'Revolut',
            logo: '🌍',
            type: 'Multi-Currency',
            region: 'Weltweit',
            gebuehr: '0€ Standard',
            bewertung: '4.6/5',
            vorteile: ['150+ Währungen', 'Krypto', 'Aktien Trading'],
            url: 'https://www.revolut.com/'
        },
        {
            name: 'Vivid Money',
            logo: '💚',
            type: 'Neobank',
            region: 'EU',
            gebuehr: '0€',
            bewertung: '4.4/5',
            vorteile: ['Cashback', 'Krypto & Aktien', 'Free Depot'],
            url: 'https://vivid.money/'
        },
        {
            name: 'DKB',
            logo: '🏦',
            type: 'Online Bank',
            region: 'DE',
            gebuehr: '0€ Aktiv',
            bewertung: '4.7/5',
            vorteile: ['Kostenlos', 'Weltweit gratis', 'Zinsen'],
            url: 'https://www.dkb.de/'
        },
        {
            name: 'Wise (ex TransferWise)',
            logo: '🌐',
            type: 'International',
            region: 'Weltweit',
            gebuehr: 'Ab 0.35%',
            bewertung: '4.7/5',
            vorteile: ['Beste Wechselkurse', 'Für Diaspora', 'Multi-Currency'],
            url: 'https://wise.com/',
            badge: 'FÜR DIASPORA'
        }
    ]
};

// ============================================
// 🎨 UI FUNCTIONS - Provider Cards anzeigen
// ============================================

function showProviders(category, subcategory) {
    var providers;

    if (subcategory) {
        providers = providersDB[category][subcategory];
    } else {
        providers = providersDB[category];
    }

    if (!providers || providers.length === 0) {
        return '<p style="color: var(--clean-muted); text-align: center; padding: 20px;">Keine Anbieter verfügbar</p>';
    }

    var html = '<div class="providers-grid">';

    providers.forEach(function(p) {
        html += createProviderCard(p);
    });

    html += '</div>';
    return html;
}

function createProviderCard(p) {
    var badgeHTML = p.badge ?
        '<div class="provider-badge">' + p.badge + '</div>' : '';

    var schufaHTML = p.schufa ?
        '<div class="provider-schufa">🔍 ' + p.schufa + '</div>' : '';

    var betragHTML = p.betrag ?
        '<div class="provider-info-row"><span>💰 Betrag:</span><span>' + p.betrag + '</span></div>' : '';

    var zinsenHTML = p.zinsen ?
        '<div class="provider-info-row"><span>📊 Zinsen:</span><span>' + p.zinsen + '</span></div>' : '';

    var laufzeitHTML = p.laufzeit ?
        '<div class="provider-info-row"><span>⏰ Laufzeit:</span><span>' + p.laufzeit + '</span></div>' : '';

    var gebuehrHTML = p.gebuehr ?
        '<div class="provider-info-row"><span>💳 Gebühren:</span><span>' + p.gebuehr + '</span></div>' : '';

    var regionHTML = p.region ?
        '<div class="provider-info-row"><span>🌍 Region:</span><span>' + p.region + '</span></div>' : '';

    var typeHTML = p.type ?
        '<div class="provider-info-row"><span>📋 Typ:</span><span>' + p.type + '</span></div>' : '';

    return '<div class="provider-card">' +
        badgeHTML +
        '<div class="provider-header">' +
            '<div class="provider-logo">' + p.logo + '</div>' +
            '<div class="provider-info">' +
                '<div class="provider-name">' + p.name + '</div>' +
                '<div class="provider-rating">⭐ ' + p.bewertung + '</div>' +
            '</div>' +
        '</div>' +
        schufaHTML +
        '<div class="provider-details">' +
            typeHTML +
            regionHTML +
            betragHTML +
            zinsenHTML +
            laufzeitHTML +
            gebuehrHTML +
        '</div>' +
        '<div class="provider-vorteile">' +
            p.vorteile.map(function(v) {
                return '<span class="vorteil-badge">✓ ' + v + '</span>';
            }).join('') +
        '</div>' +
        '<a href="' + p.url + '" target="_blank" class="provider-cta" onclick="trackProviderClick(\'' + p.name + '\')">' +
            '🚀 ' + p.name + ' öffnen →' +
        '</a>' +
    '</div>';
}

function trackProviderClick(providerName) {
    console.log('💰 Provider Click:', providerName);
    if (typeof addPoints === 'function') {
        addPoints(10);
    }
    if (typeof toast === 'function') {
        toast('🎯 Weiterleitung zu ' + providerName);
    }
}

// ============================================
// 💡 SPEZIELLE FUNKTIONEN
// ============================================

// Kredit-Empfehlungen basierend auf Kriterien
function findBestCredit(criteria) {
    var allCredits = [];
    Object.keys(providersDB.kredite).forEach(function(region) {
        providersDB.kredite[region].forEach(function(kredit) {
            kredit.regionKey = region;
            allCredits.push(kredit);
        });
    });

    // Filter nach Schufa-Wunsch
    if (criteria.ohneSchufa) {
        allCredits = allCredits.filter(function(k) {
            return k.schufa.toLowerCase().includes('ohne');
        });
    }

    // Filter nach Region
    if (criteria.region) {
        allCredits = allCredits.filter(function(k) {
            return k.regionKey === criteria.region;
        });
    }

    return allCredits.slice(0, 5);
}

// Info-Card für Empfehlungen
function createRecommendationHeader(title, description) {
    return '<div class="recommendation-header">' +
        '<div class="recommendation-title">' + title + '</div>' +
        '<div class="recommendation-desc">' + description + '</div>' +
        '<div class="recommendation-note">💡 <strong>Hinweis:</strong> Klicke auf Anbieter für Details. Alle Links sind sorgfältig geprüft.</div>' +
    '</div>';
}

console.log('✅ Provider-Datenbank geladen:', Object.keys(providersDB).length, 'Kategorien');