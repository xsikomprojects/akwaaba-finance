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

// ============================================
// 🎓 BILDUNG & KURSE
// ============================================
providersDB.bildung = [
    {
        name: 'Coursera',
        logo: '🎓',
        type: 'Uni-Kurse Online',
        region: 'Weltweit',
        gebuehr: 'Ab 39$/Monat',
        bewertung: '4.8/5',
        vorteile: ['Yale, Stanford, Harvard', 'Zertifikate', 'Auch Gratis'],
        url: 'https://www.coursera.org/',
        badge: 'BESTE UNIS'
    },
    {
        name: 'Udemy',
        logo: '💻',
        type: 'Online Kurse',
        region: 'Weltweit',
        gebuehr: '9-200€/Kurs',
        bewertung: '4.6/5',
        vorteile: ['200.000+ Kurse', 'Lifetime Zugang', 'Oft Rabatte'],
        url: 'https://www.udemy.com/'
    },
    {
        name: 'Skillshare',
        logo: '🎨',
        type: 'Kreativ-Kurse',
        region: 'Weltweit',
        gebuehr: '14$/Monat',
        bewertung: '4.5/5',
        vorteile: ['Fokus Kreativität', 'Community', 'Projektbasiert'],
        url: 'https://www.skillshare.com/'
    },
    {
        name: 'Masterclass',
        logo: '⭐',
        type: 'Premium Kurse',
        region: 'Weltweit',
        gebuehr: '180$/Jahr',
        bewertung: '4.9/5',
        vorteile: ['Von Weltstars', 'Höchste Qualität', 'Business + Kreativ'],
        url: 'https://www.masterclass.com/',
        badge: 'PREMIUM'
    },
    {
        name: 'LinkedIn Learning',
        logo: '💼',
        type: 'Business Kurse',
        region: 'Weltweit',
        gebuehr: 'Ab 30€/Monat',
        bewertung: '4.5/5',
        vorteile: ['Für Karriere', 'Zertifikate', 'Zu LinkedIn Profil'],
        url: 'https://www.linkedin.com/learning/'
    },
    {
        name: 'edX',
        logo: '📚',
        type: 'MOOCs',
        region: 'Weltweit',
        gebuehr: 'Gratis - 300€',
        bewertung: '4.7/5',
        vorteile: ['Harvard, MIT', 'Viele Gratis', 'University Credits'],
        url: 'https://www.edx.org/'
    }
];

// ============================================
// ✈️ REISEN
// ============================================
providersDB.reisen = [
    {
        name: 'Booking.com',
        logo: '🏨',
        type: 'Hotels',
        region: 'Weltweit',
        gebuehr: '0€',
        bewertung: '4.7/5',
        vorteile: ['28+ Mio Angebote', 'Kostenlose Stornierung', 'Genius Rabatte'],
        url: 'https://www.booking.com/',
        badge: '#1 HOTELS'
    },
    {
        name: 'Skyscanner',
        logo: '✈️',
        type: 'Flüge',
        region: 'Weltweit',
        gebuehr: '0€',
        bewertung: '4.6/5',
        vorteile: ['Beste Flug-Vergleiche', 'Preisalarme', 'Mixed Airlines'],
        url: 'https://www.skyscanner.de/',
        badge: 'BESTE FLÜGE'
    },
    {
        name: 'Airbnb',
        logo: '🏠',
        type: 'Ferienwohnungen',
        region: 'Weltweit',
        gebuehr: '0€',
        bewertung: '4.5/5',
        vorteile: ['Einzigartige Unterkünfte', 'Local Experience', 'Weltweit'],
        url: 'https://www.airbnb.de/'
    },
    {
        name: 'Kayak',
        logo: '🔍',
        type: 'Metasuche',
        region: 'Weltweit',
        gebuehr: '0€',
        bewertung: '4.6/5',
        vorteile: ['Flug + Hotel + Auto', 'Preisprognosen', 'Explore Feature'],
        url: 'https://www.kayak.de/'
    },
    {
        name: 'Kiwi.com',
        logo: '🥝',
        type: 'Multi-Stop Flüge',
        region: 'Weltweit',
        gebuehr: '0€',
        bewertung: '4.4/5',
        vorteile: ['Beste Kombinationen', 'Auch versteckte Deals', 'Nomad Feature'],
        url: 'https://www.kiwi.com/'
    },
    {
        name: 'GetYourGuide',
        logo: '🎫',
        type: 'Aktivitäten',
        region: 'Weltweit',
        gebuehr: '0€',
        bewertung: '4.7/5',
        vorteile: ['Touren & Tickets', 'Skip-the-line', 'App verfügbar'],
        url: 'https://www.getyourguide.de/'
    },
    {
        name: 'HostelWorld',
        logo: '🎒',
        type: 'Backpacker',
        region: 'Weltweit',
        gebuehr: '0€',
        bewertung: '4.5/5',
        vorteile: ['Günstige Hostels', 'Community', 'Für Backpacker'],
        url: 'https://www.hostelworld.com/'
    }
];

// ============================================
// 🏠 IMMOBILIEN
// ============================================
providersDB.immobilien = {
    kauf: [
        {
            name: 'ImmoScout24',
            logo: '🏢',
            type: 'Immo-Portal',
            region: 'DE, AT',
            gebuehr: 'Käufer 0€',
            bewertung: '4.6/5',
            vorteile: ['Größte Auswahl', 'Beste Filter', 'Detaillierte Infos'],
            url: 'https://www.immobilienscout24.de/',
            badge: '#1 IMMOBILIEN'
        },
        {
            name: 'Immowelt',
            logo: '🏘️',
            type: 'Immo-Portal',
            region: 'DE, AT',
            gebuehr: 'Käufer 0€',
            bewertung: '4.5/5',
            vorteile: ['Große Auswahl', 'Wohnraum Insights', 'Auch Gewerbe'],
            url: 'https://www.immowelt.de/'
        },
        {
            name: 'Kleinanzeigen',
            logo: '🔍',
            type: 'Kleinanzeigen',
            region: 'DE',
            gebuehr: '0€',
            bewertung: '4.4/5',
            vorteile: ['Privat & Makler', 'Kostenlos', 'Regional stark'],
            url: 'https://www.kleinanzeigen.de/s-immobilien/'
        }
    ],
    miete: [
        {
            name: 'WG-Gesucht',
            logo: '👥',
            type: 'WG & Wohnungen',
            region: 'DE, AT, CH',
            gebuehr: 'Ab 3€',
            bewertung: '4.5/5',
            vorteile: ['Beste WG-Auswahl', 'Auch Wohnungen', 'Studenten-Freundlich'],
            url: 'https://www.wg-gesucht.de/'
        },
        {
            name: 'ImmoScout24 Miete',
            logo: '🔑',
            type: 'Mietwohnungen',
            region: 'DE, AT',
            gebuehr: '0€',
            bewertung: '4.5/5',
            vorteile: ['Größte Auswahl', 'Schnelle Suche', 'Alerts'],
            url: 'https://www.immobilienscout24.de/'
        },
        {
            name: 'HousingAnywhere',
            logo: '🏠',
            type: 'International',
            region: 'Europa',
            gebuehr: 'Ab 25€',
            bewertung: '4.4/5',
            vorteile: ['Für Expats/Studenten', 'Möbliert', '30+ Länder'],
            url: 'https://housinganywhere.com/'
        }
    ],
    airbnb: [
        {
            name: 'Airbnb',
            logo: '🏝️',
            type: 'Kurzzeit',
            region: 'Weltweit',
            gebuehr: '0€',
            bewertung: '4.5/5',
            vorteile: ['Weltweit', 'Einzigartig', 'Kurz + Lang'],
            url: 'https://www.airbnb.de/'
        }
    ]
};

// ============================================
// 💰 CASHBACK & SPAREN
// ============================================
providersDB.cashback = [
    {
        name: 'Shoop',
        logo: '💰',
        type: 'Cashback DE',
        region: 'DE',
        gebuehr: '0€',
        bewertung: '4.6/5',
        vorteile: ['Bis 20% Cashback', '2000+ Shops', 'PayPal Auszahlung'],
        url: 'https://www.shoop.de/',
        badge: 'DE #1'
    },
    {
        name: 'iGraal',
        logo: '💎',
        type: 'Cashback International',
        region: 'DE, FR, IT, ES',
        gebuehr: '0€',
        bewertung: '4.7/5',
        vorteile: ['Bis 30% Cashback', 'Amazon Cashback', 'App'],
        url: 'https://de.igraal.com/'
    },
    {
        name: 'Rakuten',
        logo: '🎌',
        type: 'Cashback US',
        region: 'US, UK',
        gebuehr: '0€',
        bewertung: '4.5/5',
        vorteile: ['Bis 40% Cashback', 'Große Marken', 'Welcome Bonus'],
        url: 'https://www.rakuten.com/'
    },
    {
        name: 'Payback',
        logo: '🎁',
        type: 'Punkte-System',
        region: 'DE, PL',
        gebuehr: '0€',
        bewertung: '4.5/5',
        vorteile: ['Offline + Online', 'Real, dm, REWE', 'Coupons'],
        url: 'https://www.payback.de/'
    },
    {
        name: 'Miles & More',
        logo: '✈️',
        type: 'Meilen',
        region: 'Weltweit',
        gebuehr: '0€',
        bewertung: '4.4/5',
        vorteile: ['Lufthansa Meilen', 'Kreditkarte', 'Für Vielflieger'],
        url: 'https://www.miles-and-more.com/'
    }
];

// ============================================
// 🛒 SHOPPING
// ============================================
providersDB.shopping = [
    {
        name: 'Amazon',
        logo: '📦',
        type: 'Alles',
        region: 'Weltweit',
        gebuehr: '0€',
        bewertung: '4.5/5',
        vorteile: ['Größte Auswahl', 'Prime Versand', 'Rückgabe'],
        url: 'https://www.amazon.de/'
    },
    {
        name: 'eBay',
        logo: '🏷️',
        type: 'Auktionen',
        region: 'Weltweit',
        gebuehr: '0€',
        bewertung: '4.4/5',
        vorteile: ['Auktionen + Sofortkauf', 'Gebraucht + Neu', 'PayPal'],
        url: 'https://www.ebay.de/'
    },
    {
        name: 'Kleinanzeigen',
        logo: '📱',
        type: 'Regional',
        region: 'DE',
        gebuehr: '0€',
        bewertung: '4.6/5',
        vorteile: ['Kostenlos', 'Regional', 'Alles möglich'],
        url: 'https://www.kleinanzeigen.de/'
    },
    {
        name: 'AliExpress',
        logo: '🐉',
        type: 'China',
        region: 'Weltweit',
        gebuehr: '0€',
        bewertung: '4.2/5',
        vorteile: ['Sehr günstig', 'Riesige Auswahl', 'Auch Elektronik'],
        url: 'https://www.aliexpress.com/'
    },
    {
        name: 'Temu',
        logo: '🎁',
        type: 'Discount',
        region: 'Weltweit',
        gebuehr: '0€',
        bewertung: '4.3/5',
        vorteile: ['Extreme Rabatte', 'Kostenloser Versand', 'App-Deals'],
        url: 'https://www.temu.com/',
        badge: 'MEGA GÜNSTIG'
    },
    {
        name: 'Otto',
        logo: '🛍️',
        type: 'Marketplace DE',
        region: 'DE',
        gebuehr: '0€',
        bewertung: '4.5/5',
        vorteile: ['Deutsches Traditionshaus', 'Ratenzahlung', 'Möbel stark'],
        url: 'https://www.otto.de/'
    }
];

// ============================================
// 🚗 VERSICHERUNGEN
// ============================================
providersDB.versicherungen = [
    {
        name: 'Check24',
        logo: '✅',
        type: 'Vergleichsportal',
        region: 'DE',
        gebuehr: '0€',
        bewertung: '4.7/5',
        vorteile: ['Alle Versicherungen', 'Bestpreis', 'Auch Wechsel'],
        url: 'https://www.check24.de/',
        badge: '#1 VERGLEICH'
    },
    {
        name: 'Verivox',
        logo: '📊',
        type: 'Vergleichsportal',
        region: 'DE',
        gebuehr: '0€',
        bewertung: '4.6/5',
        vorteile: ['Strom, Gas, Versicherung', 'Wechsel-Service', 'Cashback'],
        url: 'https://www.verivox.de/'
    },
    {
        name: 'Getsafe',
        logo: '📱',
        type: 'Digital Versicherung',
        region: 'DE',
        gebuehr: 'Ab 3€/Monat',
        bewertung: '4.5/5',
        vorteile: ['100% App', 'Flexible Verträge', 'Schnell'],
        url: 'https://www.getsafe.de/'
    }
];

// ============================================
// 📱 NEBEN-EINKOMMEN & FREELANCE
// ============================================
providersDB.freelance = [
    {
        name: 'Fiverr',
        logo: '🎯',
        type: 'Freelance Marketplace',
        region: 'Weltweit',
        gebuehr: '20% Provision',
        bewertung: '4.6/5',
        vorteile: ['Jede Skill', 'Weltweite Kunden', 'Ab 5$'],
        url: 'https://www.fiverr.com/',
        badge: 'FREELANCE #1'
    },
    {
        name: 'Upwork',
        logo: '💼',
        type: 'Freelance',
        region: 'Weltweit',
        gebuehr: '10% Provision',
        bewertung: '4.5/5',
        vorteile: ['Große Projekte', 'Langfristig', 'Für Profis'],
        url: 'https://www.upwork.com/'
    },
    {
        name: 'Etsy',
        logo: '🎨',
        type: 'Handmade Verkauf',
        region: 'Weltweit',
        gebuehr: '6.5% + Fees',
        bewertung: '4.6/5',
        vorteile: ['Handmade & Vintage', 'Kreativ-Community', 'Weltweit'],
        url: 'https://www.etsy.com/'
    },
    {
        name: 'Teachable',
        logo: '🎓',
        type: 'Online Kurse verkaufen',
        region: 'Weltweit',
        gebuehr: '39$/Monat',
        bewertung: '4.7/5',
        vorteile: ['Eigene Kurse', 'Eigenes Branding', 'Alles inklusive'],
        url: 'https://teachable.com/'
    }
];

// ============================================
// 🍔 FOOD DELIVERY & GASTRO
// ============================================
providersDB.food = [
    {
        name: 'Lieferando',
        logo: '🍕',
        type: 'Essen bestellen',
        region: 'DE',
        gebuehr: 'Ab 1€',
        bewertung: '4.4/5',
        vorteile: ['15.000+ Restaurants', 'Schnelle Lieferung', 'App'],
        url: 'https://www.lieferando.de/'
    },
    {
        name: 'Wolt',
        logo: '🎯',
        type: 'Premium Food Delivery',
        region: 'EU',
        gebuehr: 'Ab 2€',
        bewertung: '4.7/5',
        vorteile: ['Premium Auswahl', 'Schnell', 'Auch Supermarkt'],
        url: 'https://wolt.com/'
    },
    {
        name: 'Uber Eats',
        logo: '🚗',
        type: 'Food Delivery',
        region: 'Weltweit',
        gebuehr: 'Ab 2€',
        bewertung: '4.5/5',
        vorteile: ['International', 'Große Auswahl', 'Uber One Vorteile'],
        url: 'https://www.ubereats.com/'
    },
    {
        name: 'TooGoodToGo',
        logo: '🌱',
        type: 'Anti-Waste',
        region: 'Weltweit',
        gebuehr: '2-5€/Tüte',
        bewertung: '4.8/5',
        vorteile: ['Gegen Verschwendung', 'Sehr günstig', 'Überraschungspaket'],
        url: 'https://www.toogoodtogo.com/',
        badge: 'NACHHALTIG'
    }
];

console.log('✅ Provider-Datenbank v2.0 geladen:', Object.keys(providersDB).length, 'Kategorien');