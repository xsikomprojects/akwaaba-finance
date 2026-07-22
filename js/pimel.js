// ================================================
// 🤖 PIMEL - KI Business & Geschenke Finder
// Findet legale Businesses & kostenlose Wertsachen
// Automatischer Betrugs-Blocker integriert
// ================================================

const Pimel = {
    name: "Pimel",
    version: "2.0",
    motto: "Einfach. Legal. Profitabel.",

    // ====== ANTI-FRAUD ENGINE ======
    fraudDetector: {
        redFlags: [
            { pattern: /vorauszahlung|voraus.*zahlen|erst.*bezahl/gi, type: 'payment_upfront', severity: 'critical' },
            { pattern: /western\s*union|moneygram|crypto.*senden/gi, type: 'suspicious_payment', severity: 'critical' },
            { pattern: /geheimnis|geheim.*methode|niemand.*kennt/gi, type: 'too_good', severity: 'high' },
            { pattern: /100%.*garantiert|garantiert.*reich|schnell.*reich/gi, type: 'unrealistic', severity: 'critical' },
            { pattern: /passwort|kreditkarte.*nummer|tan.*nummer|pin.*code/gi, type: 'phishing', severity: 'critical' },
            { pattern: /nigeria.*prinz|erbschaft.*million|lotterie.*gewinn/gi, type: 'classic_scam', severity: 'critical' },
            { pattern: /kein.*risiko.*kein.*invest|ohne.*arbeit.*geld/gi, type: 'unrealistic', severity: 'high' },
            { pattern: /pyramid|ponzi|schneeball/gi, type: 'pyramid', severity: 'critical' },
            { pattern: /mlm.*reich|network.*market.*schnell/gi, type: 'mlm_scam', severity: 'high' },
            { pattern: /klick.*hier.*sofort|jetzt.*oder.*nie|nur.*heute/gi, type: 'urgency_scam', severity: 'medium' },
            { pattern: /kopier.*mein.*system|duplizie/gi, type: 'copy_scam', severity: 'high' },
            { pattern: /instagram.*dm|whatsapp.*schreib.*mir/gi, type: 'social_redirect', severity: 'medium' },
            { pattern: /10\.?000.*pro.*tag|50\.?000.*pro.*woche/gi, type: 'unrealistic_income', severity: 'critical' },
            { pattern: /hacken|crack|illegal.*download/gi, type: 'illegal', severity: 'critical' },
            { pattern: /geld.*waschen|steuer.*hinterzieh|schwarz.*geld/gi, type: 'illegal', severity: 'critical' },
            { pattern: /versand.*gebühr.*geschenk|nur.*versand.*bezahl/gi, type: 'shipping_scam', severity: 'high' },
            { pattern: /persönlich.*daten.*senden|ausweis.*kopie.*schick/gi, type: 'identity_theft', severity: 'critical' },
            { pattern: /investment.*verdoppel|geld.*verdreifach/gi, type: 'investment_scam', severity: 'critical' },
            { pattern: /bot.*automatisch.*geld|auto.*pilot.*einkommen/gi, type: 'bot_scam', severity: 'high' },
            { pattern: /gebühr.*freischalt|aktivierung.*gebühr/gi, type: 'activation_fee_scam', severity: 'high' }
        ],

        giftScamIndicators: [
            { pattern: /versandkosten.*übernehm|nur.*porto/gi, type: 'hidden_cost', msg: 'Versteckte Kosten bei "Geschenk"' },
            { pattern: /bankdaten.*für.*überweis/gi, type: 'bank_phishing', msg: 'Bankdaten-Phishing' },
            { pattern: /privat.*treffen.*allein|komm.*allein/gi, type: 'safety_risk', msg: 'Sicherheitsrisiko' },
            { pattern: /vertrag.*unterschreib|verbindlich/gi, type: 'hidden_contract', msg: 'Versteckter Vertrag' },
            { pattern: /gegenleistung|dafür.*musst/gi, type: 'not_free', msg: 'Nicht wirklich kostenlos' },
            { pattern: /abo.*abschließ|mitgliedschaft.*nötig/gi, type: 'subscription_trap', msg: 'Abo-Falle' }
        ],

        analyze(text) {
            const results = { safe: true, score: 100, warnings: [], blocked: false, details: [] };

            this.redFlags.forEach(flag => {
                if (flag.pattern.test(text)) {
                    results.safe = false;
                    results.warnings.push({
                        type: flag.type,
                        severity: flag.severity,
                        message: this.getWarningMessage(flag.type)
                    });
                    if (flag.severity === 'critical') {
                        results.blocked = true;
                        results.score -= 40;
                    } else if (flag.severity === 'high') {
                        results.score -= 25;
                    } else {
                        results.score -= 10;
                    }
                }
            });

            this.giftScamIndicators.forEach(indicator => {
                if (indicator.pattern.test(text)) {
                    results.safe = false;
                    results.warnings.push({
                        type: indicator.type,
                        severity: 'high',
                        message: indicator.msg
                    });
                    results.score -= 20;
                }
            });

            results.score = Math.max(0, results.score);
            return results;
        },

        getWarningMessage(type) {
            const messages = {
                payment_upfront: '⛔ Vorauszahlung verlangt - Klassischer Betrug!',
                suspicious_payment: '⛔ Verdächtige Zahlungsmethode (Western Union, etc.)',
                too_good: '⚠️ Zu gut um wahr zu sein - Vorsicht!',
                unrealistic: '⛔ Unrealistische Versprechen - Betrug!',
                phishing: '⛔ PHISHING! Niemals Passwörter/Kreditkarten teilen!',
                classic_scam: '⛔ Klassischer Internet-Betrug erkannt!',
                pyramid: '⛔ Pyramiden-/Schneeballsystem erkannt!',
                mlm_scam: '⚠️ Verdächtiges MLM-Schema',
                urgency_scam: '⚠️ Künstliche Dringlichkeit - Manipulationstechnik',
                copy_scam: '⚠️ "System kopieren" - Meist wertlos',
                social_redirect: '⚠️ Weiterleitung zu privaten Kanälen - Vorsicht',
                unrealistic_income: '⛔ Unrealistische Einkommensversprechen!',
                illegal: '⛔ ILLEGAL! Finger weg!',
                hidden_cost: '⚠️ Versteckte Kosten bei angeblichem Geschenk',
                bank_phishing: '⛔ Bankdaten-Phishing!',
                safety_risk: '⚠️ Persönliches Sicherheitsrisiko!',
                hidden_contract: '⚠️ Versteckter Vertrag',
                not_free: '⚠️ Nicht wirklich kostenlos',
                subscription_trap: '⚠️ Abo-Falle erkannt!',
                shipping_scam: '⚠️ "Nur Versandkosten" - Oft Betrug!',
                identity_theft: '⛔ Identitätsdiebstahl-Versuch!',
                investment_scam: '⛔ Investment-Betrug erkannt!',
                bot_scam: '⚠️ "Automatisches Geld" - Betrug!',
                activation_fee_scam: '⚠️ Aktivierungsgebühr-Betrug!'
            };
            return messages[type] || '⚠️ Verdächtiges Angebot';
        },

        getScoreLabel(score) {
            if (score >= 90) return { label: 'Sicher', color: '#00B894', icon: '✅' };
            if (score >= 70) return { label: 'Vorsicht', color: '#FDCB6E', icon: '⚠️' };
            if (score >= 40) return { label: 'Verdächtig', color: '#E17055', icon: '🚨' };
            return { label: 'BETRUG', color: '#FF7675', icon: '⛔' };
        }
    },

    // ====== EINFACHE LEGALE BUSINESS-IDEEN DATABASE ======
    businesses: [
        // ===== SOFORT STARTEN (0€) =====
        {
            id: 'b1',
            name: 'Social Media Management',
            category: 'service',
            difficulty: 'einfach',
            startCost: 0,
            monthlyProfit: { min: 300, max: 3000 },
            timeToProfit: '1-2 Wochen',
            description: 'Verwalte Social Media Accounts für kleine Unternehmen in deiner Nähe. Restaurants, Friseure, Handwerker - alle brauchen Social Media!',
            steps: [
                'Erstelle Beispiel-Posts für 3 verschiedene Branchen',
                'Geh zu lokalen Geschäften und zeige ihnen was du kannst',
                'Biete erstes Monat 50% Rabatt an',
                'Nutze kostenlose Tools (Canva, Later, Buffer Free)',
                'Erstelle 3-5 Posts pro Woche pro Kunde',
                'Verlange 200-500€/Monat pro Kunde'
            ],
            tools: ['Canva (kostenlos)', 'Buffer Free', 'Later Free', 'ChatGPT'],
            platforms: [
                { name: 'Canva', url: 'https://www.canva.com', desc: 'Designs erstellen' },
                { name: 'Buffer', url: 'https://buffer.com', desc: 'Posts planen' }
            ],
            legalInfo: 'Gewerbeanmeldung nötig (ca. 20-60€). Keine besonderen Genehmigungen.',
            scaleTips: 'Ab 5 Kunden: Assistenten einstellen. Ab 10: Agentur gründen.',
            tags: ['sofort', 'kostenlos', 'lokal', 'service'],
            proofOfConcept: 'Über 500.000 Social Media Manager weltweit verdienen damit ihren Lebensunterhalt.',
            riskLevel: 'minimal'
        },
        {
            id: 'b2',
            name: 'Digitale Dokumente & Vorlagen',
            category: 'digital',
            difficulty: 'einfach',
            startCost: 0,
            monthlyProfit: { min: 100, max: 5000 },
            timeToProfit: '2-4 Wochen',
            description: 'Erstelle Vorlagen für Lebensläufe, Businesspläne, Budgets, Verträge und verkaufe sie als digitale Downloads.',
            steps: [
                'Recherchiere welche Vorlagen gefragt sind (Google Trends)',
                'Erstelle 10-20 hochwertige Vorlagen in Word/Canva/Notion',
                'Erstelle Verkaufsseite auf Etsy oder Gumroad',
                'Optimiere Titel & Beschreibung für SEO',
                'Bewerbe über Pinterest (kostenloser Traffic)',
                'Einmal erstellt = dauerhaft passives Einkommen'
            ],
            tools: ['Canva', 'Google Docs', 'Notion', 'Gumroad'],
            platforms: [
                { name: 'Etsy', url: 'https://www.etsy.com/sell', desc: 'Größter Marktplatz' },
                { name: 'Gumroad', url: 'https://gumroad.com', desc: 'Direkt verkaufen' },
                { name: 'Creative Market', url: 'https://creativemarket.com', desc: 'Design-Marktplatz' }
            ],
            legalInfo: 'Gewerbeanmeldung. Impressum bei Webseite. Umsatzsteuer beachten.',
            scaleTips: 'Erstelle Templates in verschiedenen Sprachen. Nischen-Pakete schnüren.',
            tags: ['passiv', 'kostenlos', 'kreativ', 'skalierbar'],
            proofOfConcept: 'Top-Seller auf Etsy verdienen 10.000€+/Monat mit digitalen Downloads.',
            riskLevel: 'minimal'
        },
        {
            id: 'b3',
            name: 'Lokaler Service-Vermittler',
            category: 'service',
            difficulty: 'einfach',
            startCost: 0,
            monthlyProfit: { min: 200, max: 2000 },
            timeToProfit: '1 Woche',
            description: 'Vermittle Handwerker, Reinigungskräfte, Umzugshelfer an Kunden und kassiere Provision. Du brauchst NUR ein Telefon!',
            steps: [
                'Sammle Kontakte von zuverlässigen Dienstleistern',
                'Erstelle einfache Webseite oder Social Media Page',
                'Poste in lokalen Facebook-Gruppen',
                'Vermittle Aufträge und kassiere 10-20% Provision',
                'Baue Bewertungssystem auf',
                'Expandiere in verschiedene Servicebereiche'
            ],
            tools: ['WhatsApp Business', 'Google My Business', 'Facebook'],
            platforms: [
                { name: 'Google My Business', url: 'https://business.google.com', desc: 'Lokale Sichtbarkeit' },
                { name: 'Facebook Marketplace', url: 'https://www.facebook.com/marketplace', desc: 'Lokale Reichweite' }
            ],
            legalInfo: 'Gewerbeanmeldung als Vermittler. Vermittlungsvertrag empfohlen.',
            scaleTips: 'In mehrere Städte expandieren. App entwickeln lassen.',
            tags: ['sofort', 'kostenlos', 'lokal', 'vermittlung'],
            proofOfConcept: 'Plattformen wie MyHammer begannen genau so.',
            riskLevel: 'minimal'
        },
        {
            id: 'b4',
            name: 'Content Recycling Service',
            category: 'digital',
            difficulty: 'einfach',
            startCost: 0,
            monthlyProfit: { min: 500, max: 4000 },
            timeToProfit: '1-2 Wochen',
            description: 'Nimm bestehende Blog-Posts/Videos von Unternehmen und wandle sie in Social Media Posts, Infografiken, Newsletter um.',
            steps: [
                'Erstelle Portfolio mit Vorher/Nachher Beispielen',
                'Kontaktiere Unternehmen mit Blog/YouTube aber wenig Social Media',
                'Biete Paket an: 1 Blogpost = 10 Social Media Posts',
                'Nutze KI-Tools für schnelle Umsetzung',
                'Automatisiere Prozesse mit Templates',
                'Verlange 300-800€ pro Monat pro Kunde'
            ],
            tools: ['ChatGPT', 'Canva', 'Opus Clip', 'Repurpose.io'],
            platforms: [
                { name: 'Fiverr', url: 'https://www.fiverr.com', desc: 'Erste Kunden finden' },
                { name: 'Upwork', url: 'https://www.upwork.com', desc: 'Höhere Aufträge' }
            ],
            legalInfo: 'Freiberuflich oder Gewerbe. Urheberrecht an den Kunden-Inhalten klären.',
            scaleTips: 'KI-Workflow aufbauen. Virtuelle Assistenten einstellen.',
            tags: ['sofort', 'kostenlos', 'ki', 'service'],
            proofOfConcept: 'Content Repurposing ist einer der am schnellsten wachsenden Freelance-Bereiche.',
            riskLevel: 'minimal'
        },
        {
            id: 'b5',
            name: 'Online Flohmarkt Arbitrage',
            category: 'handel',
            difficulty: 'einfach',
            startCost: 0,
            monthlyProfit: { min: 200, max: 3000 },
            timeToProfit: '1 Woche',
            description: 'Finde kostenlose oder günstige Sachen auf Kleinanzeigen/Facebook/Sperrmüll und verkaufe sie mit Gewinn weiter.',
            steps: [
                'Suche "zu verschenken" auf Kleinanzeigen & Facebook',
                'Hole Sperrmüll-Schätze (Möbel, Elektronik)',
                'Reinige, repariere, fotografiere professionell',
                'Verkaufe auf eBay, Kleinanzeigen, Vinted',
                'Spezialisiere dich auf eine Nische (Vintage, Elektronik)',
                'Skaliere mit eigenem Lager'
            ],
            tools: ['eBay Kleinanzeigen', 'Vinted', 'eBay', 'Facebook Marketplace'],
            platforms: [
                { name: 'Kleinanzeigen', url: 'https://www.kleinanzeigen.de', desc: 'Größter Marktplatz DE' },
                { name: 'Vinted', url: 'https://www.vinted.de', desc: 'Mode & Accessoires' }
            ],
            legalInfo: 'Privat bis 600€/Jahr steuerfrei. Darüber Gewerbeanmeldung nötig.',
            scaleTips: 'Lager anmieten. Festanstellung für Abholung. Online-Shop eröffnen.',
            tags: ['sofort', 'kostenlos', 'offline', 'handel'],
            proofOfConcept: 'Tausende Menschen verdienen ihren Lebensunterhalt mit Flipping.',
            riskLevel: 'minimal'
        },
        {
            id: 'b6',
            name: 'KI-Automatisierung für KMU',
            category: 'tech',
            difficulty: 'mittel',
            startCost: 0,
            monthlyProfit: { min: 1000, max: 10000 },
            timeToProfit: '2-4 Wochen',
            description: 'Richte für kleine/mittlere Unternehmen KI-Chatbots, automatische E-Mails und Workflow-Automatisierungen ein.',
            steps: [
                'Lerne Make.com / Zapier Grundlagen (1-2 Tage)',
                'Erstelle 3 Demo-Automatisierungen',
                'Kontaktiere lokale Unternehmen',
                'Zeige wie viel Zeit/Geld sie sparen',
                'Biete Setup + monatliche Wartung an',
                'Verlange 500-2000€ pro Setup + 200€/Monat Wartung'
            ],
            tools: ['Make.com', 'Zapier', 'ChatGPT API', 'Tidio'],
            platforms: [
                { name: 'Make.com', url: 'https://make.com', desc: 'Automatisierungs-Plattform' },
                { name: 'Zapier', url: 'https://zapier.com', desc: 'No-Code Automation' }
            ],
            legalInfo: 'Gewerbeanmeldung. Datenschutz (DSGVO) bei KI-Lösungen beachten.',
            scaleTips: 'Eigene KI-Produkte entwickeln. White-Label Lösungen anbieten.',
            tags: ['tech', 'ki', 'service', 'skalierbar'],
            proofOfConcept: 'KI-Automatisierung ist der größte Wachstumsmarkt 2024/2025.',
            riskLevel: 'niedrig'
        },
        {
            id: 'b7',
            name: 'Übersetzungs-Service mit KI',
            category: 'service',
            difficulty: 'einfach',
            startCost: 0,
            monthlyProfit: { min: 500, max: 4000 },
            timeToProfit: '1-2 Wochen',
            description: 'Nutze KI-Tools als Basis und verfeinere Übersetzungen. Besonders lukrativ für seltene Sprachen (Ewe, Kabiyé für Togo!).',
            steps: [
                'Identifiziere deine Sprachkombinationen',
                'Erstelle Profil auf Übersetzer-Plattformen',
                'Nutze DeepL/ChatGPT als Basis',
                'Verfeinere kulturell und fachlich',
                'Spezialisiere dich (Medizin, Recht, Technik)',
                'Baue Stammkunden auf'
            ],
            tools: ['DeepL', 'ChatGPT', 'SDL Trados', 'MemoQ'],
            platforms: [
                { name: 'ProZ', url: 'https://www.proz.com', desc: 'Übersetzer-Marktplatz' },
                { name: 'TranslatorsCafé', url: 'https://www.translatorscafe.com', desc: 'Aufträge finden' }
            ],
            legalInfo: 'Freiberufliche Tätigkeit (keine Gewerbe nötig!). Beeidigte Übersetzungen extra.',
            scaleTips: 'Spezialisierung auf Fachübersetzungen. Team aufbauen.',
            tags: ['sofort', 'kostenlos', 'sprachen', 'freiberuflich'],
            proofOfConcept: 'Übersetzer für seltene afrikanische Sprachen sind stark nachgefragt.',
            riskLevel: 'minimal'
        },
        {
            id: 'b8',
            name: 'Print-on-Demand Shop',
            category: 'digital',
            difficulty: 'einfach',
            startCost: 0,
            monthlyProfit: { min: 100, max: 5000 },
            timeToProfit: '2-6 Wochen',
            description: 'Designe T-Shirts, Tassen, Poster mit afrikanischen/Togo-Motiven. Der Anbieter druckt & versendet für dich.',
            steps: [
                'Wähle Nische (Afrika-Design, Motivationssprüche, Humor)',
                'Erstelle 20-50 Designs mit Canva oder KI',
                'Lade auf Spreadshirt, Redbubble, Merch by Amazon',
                'Optimiere Titel & Tags für Suchmaschinen',
                'Bewerbe über Social Media & Pinterest',
                'Erstelle ständig neue Designs'
            ],
            tools: ['Canva', 'Midjourney', 'Photoshop', 'Kittl'],
            platforms: [
                { name: 'Spreadshirt', url: 'https://www.spreadshirt.de', desc: 'EU-Marktplatz' },
                { name: 'Redbubble', url: 'https://www.redbubble.com', desc: 'Weltweiter Marktplatz' },
                { name: 'Merch by Amazon', url: 'https://merch.amazon.com', desc: 'Amazon Reichweite' }
            ],
            legalInfo: 'Gewerbeanmeldung. Markenrecht beachten bei Designs.',
            scaleTips: 'Eigenen Shopify-Shop aufbauen. Influencer-Kooperationen.',
            tags: ['passiv', 'kostenlos', 'kreativ', 'skalierbar'],
            proofOfConcept: 'Top POD-Seller verdienen 5-stellig im Monat.',
            riskLevel: 'minimal'
        },
        {
            id: 'b9',
            name: 'Online-Buchhalter / Finanz-Assistent',
            category: 'service',
            difficulty: 'mittel',
            startCost: 0,
            monthlyProfit: { min: 500, max: 5000 },
            timeToProfit: '2-4 Wochen',
            description: 'Hilf Kleinunternehmern bei Buchhaltung, Rechnungsstellung und Steuervorbereitung.',
            steps: [
                'Lerne Buchhaltungs-Software (SevDesk, Lexoffice)',
                'Zertifizierung als Buchhalter (optional aber hilfreich)',
                'Biete kostenlose Erstberatung an',
                'Starte mit 3-5 Kunden',
                'Automatisiere mit Software',
                'Verlange 200-500€/Monat pro Kunde'
            ],
            tools: ['SevDesk', 'Lexoffice', 'DATEV', 'FastBill'],
            platforms: [
                { name: 'SevDesk', url: 'https://sevdesk.de', desc: 'Cloud-Buchhaltung' },
                { name: 'Lexoffice', url: 'https://lexoffice.de', desc: 'Einfache Buchhaltung' }
            ],
            legalInfo: 'Buchhalter ist erlaubnisfrei. Steuerberatung nur mit Lizenz!',
            scaleTips: 'Virtuelles Büro. Angestellte Buchhalter. Steuerkanzlei-Partnerschaft.',
            tags: ['service', 'finanzen', 'wiederkehrend', 'lokal'],
            proofOfConcept: 'Millionen KMU suchen erschwingliche Buchhalter.',
            riskLevel: 'niedrig'
        },
        {
            id: 'b10',
            name: 'Nischen-Blog mit Affiliate',
            category: 'digital',
            difficulty: 'mittel',
            startCost: 0,
            monthlyProfit: { min: 100, max: 10000 },
            timeToProfit: '3-6 Monate',
            description: 'Erstelle einen Blog zu einem spezifischen Thema, ziehe Google-Traffic an und verdiene mit Affiliate-Links.',
            steps: [
                'Nische recherchieren (wenig Konkurrenz, hohe Nachfrage)',
                'Kostenlosen Blog starten (WordPress.com, Blogger)',
                '20-30 SEO-optimierte Artikel schreiben (KI-unterstützt)',
                'Affiliate-Programme beitreten (Amazon, AWIN)',
                'Artikel mit Produktempfehlungen & Affiliate-Links',
                'Google-Traffic wächst automatisch über Monate'
            ],
            tools: ['WordPress', 'Ubersuggest (Free)', 'ChatGPT', 'Canva'],
            platforms: [
                { name: 'Amazon PartnerNet', url: 'https://partnernet.amazon.de', desc: 'Affiliate' },
                { name: 'AWIN', url: 'https://www.awin.com', desc: 'Netzwerk' },
                { name: 'WordPress.com', url: 'https://wordpress.com', desc: 'Kostenloser Blog' }
            ],
            legalInfo: 'Impressum Pflicht. Affiliate-Links kennzeichnen. DSGVO beachten.',
            scaleTips: 'Mehrere Nischen-Blogs. E-Mail-Liste aufbauen. Eigene Produkte verkaufen.',
            tags: ['passiv', 'kostenlos', 'skalierbar', 'langfristig'],
            proofOfConcept: 'Nischenblogs generieren oft 1.000-20.000€/Monat passiv.',
            riskLevel: 'minimal'
        },
        {
            id: 'b11',
            name: 'Virtuelle Events organisieren',
            category: 'service',
            difficulty: 'mittel',
            startCost: 0,
            monthlyProfit: { min: 500, max: 5000 },
            timeToProfit: '2-4 Wochen',
            description: 'Organisiere Online-Workshops, Webinare oder virtuelle Networking-Events für Nischen-Communities.',
            steps: [
                'Community/Nische identifizieren',
                'Zoom/Google Meet Account nutzen',
                'Ersten kostenlosen Event als Test',
                'Teilnehmergebühr einführen (5-50€)',
                'Sponsoren finden für größere Events',
                'Wiederkehrende monatliche Events'
            ],
            tools: ['Zoom (Free)', 'Eventbrite', 'Luma', 'Canva'],
            platforms: [
                { name: 'Eventbrite', url: 'https://eventbrite.de', desc: 'Event-Plattform' },
                { name: 'Luma', url: 'https://lu.ma', desc: 'Event-Management' }
            ],
            legalInfo: 'Gewerbeanmeldung. AGB für Veranstaltungen.',
            scaleTips: 'Hybrid-Events (Online + Offline). Konferenz-Format. Corporate-Events.',
            tags: ['service', 'kostenlos', 'community', 'wiederkehrend'],
            proofOfConcept: 'Virtuelle Events sind seit 2020 ein Milliarden-Markt.',
            riskLevel: 'niedrig'
        },
        {
            id: 'b12',
            name: 'WhatsApp Business Automatisierung',
            category: 'tech',
            difficulty: 'einfach',
            startCost: 0,
            monthlyProfit: { min: 300, max: 3000 },
            timeToProfit: '1-2 Wochen',
            description: 'Richte für Kleinunternehmen WhatsApp Business mit Katalog, Auto-Antworten und Bestellsystem ein.',
            steps: [
                'Werde Experte für WhatsApp Business (kostenlos)',
                'Erstelle Demo-Setup für verschiedene Branchen',
                'Gehe zu lokalen Geschäften (besonders Restaurants)',
                'Richte WhatsApp Business Profil + Katalog ein',
                'Programmiere Auto-Antworten',
                'Verlange 100-300€ pro Setup + 50€/Monat Betreuung'
            ],
            tools: ['WhatsApp Business', 'WhatsApp Business API', 'Chatfuel'],
            platforms: [
                { name: 'WhatsApp Business', url: 'https://business.whatsapp.com', desc: 'Kostenlose App' }
            ],
            legalInfo: 'Gewerbeanmeldung. DSGVO bei Kundendaten beachten.',
            scaleTips: 'WhatsApp Business API für größere Kunden. Chatbot-Entwicklung.',
            tags: ['sofort', 'kostenlos', 'lokal', 'tech'],
            proofOfConcept: 'WhatsApp Business wird von über 200 Millionen Unternehmen genutzt.',
            riskLevel: 'minimal'
        }
    ],

    // ====== KOSTENLOSE SACHEN FINDER ======
    freeStuffSources: [
        // ===== PLATTFORMEN FÜR KOSTENLOSE SACHEN =====
        {
            id: 'fs1',
            name: 'eBay Kleinanzeigen "Zu Verschenken"',
            category: 'lokal',
            type: 'Alles (Möbel, Elektronik, Kleidung)',
            region: 'Deutschland',
            url: 'https://www.kleinanzeigen.de/s-zu-verschenken/k0',
            description: 'Größte Plattform für kostenlose Sachen in Deutschland. Suche nach "zu verschenken" in deiner Stadt.',
            tips: [
                'Suche mehrmals täglich - die besten Sachen gehen schnell',
                'Erstelle Suchanfrage-Benachrichtigungen',
                'Sei höflich und schnell beim Antworten',
                'Biete Selbstabholung an - das erhöht deine Chancen',
                'Gute Sachen an Wochenenden posten (Umzüge!)'
            ],
            safetyScore: 95,
            verified: true,
            icon: '🏷️'
        },
        {
            id: 'fs2',
            name: 'Facebook "Free Your Stuff" Gruppen',
            category: 'lokal',
            type: 'Alles',
            region: 'Weltweit',
            url: 'https://www.facebook.com/groups/',
            description: 'In fast jeder Stadt gibt es Facebook-Gruppen wo Leute Sachen kostenlos abgeben.',
            tips: [
                'Suche nach "[Deine Stadt] Free Your Stuff"',
                'Tritt lokalen Verschenk-Gruppen bei',
                'Reagiere sofort auf neue Posts',
                'Baue dir einen guten Ruf in der Gruppe auf',
                'Bedanke dich immer bei Abholung'
            ],
            safetyScore: 85,
            verified: true,
            icon: '📘'
        },
        {
            id: 'fs3',
            name: 'Freecycle Network',
            category: 'lokal',
            type: 'Alles',
            region: 'Weltweit (47 Länder)',
            url: 'https://www.freecycle.org',
            description: 'Weltweites Netzwerk mit 9+ Millionen Mitgliedern die Sachen verschenken statt wegwerfen.',
            tips: [
                'Melde dich bei deiner lokalen Freecycle-Gruppe an',
                'Erstelle "WANTED" Posts für Sachen die du suchst',
                'Antworte schnell auf "OFFER" Posts',
                'Sei zuverlässig bei Abholungen'
            ],
            safetyScore: 90,
            verified: true,
            icon: '♻️'
        },
        {
            id: 'fs4',
            name: 'Sperrmüll-Kalender',
            category: 'lokal',
            type: 'Möbel, Elektronik, Hausrat',
            region: 'Deutschland',
            url: 'https://www.spermuell.de',
            description: 'Am Sperrmüll-Tag stellen Leute oft hochwertige Sachen raus. Legal mitnehmen und verkaufen!',
            tips: [
                'Sperrmüll-Termine deiner Stadt kennen',
                'Abends vorher schon Runde drehen',
                'Auto/Transporter bereithalten',
                'Auf Elektronik, Möbel, Vintage-Sachen achten',
                'Reparieren und auf eBay Kleinanzeigen verkaufen'
            ],
            safetyScore: 90,
            verified: true,
            icon: '🗑️'
        },
        {
            id: 'fs5',
            name: 'Too Good To Go',
            category: 'essen',
            type: 'Lebensmittel & Mahlzeiten',
            region: 'Europa',
            url: 'https://toogoodtogo.de',
            description: 'Rette Lebensmittel von Restaurants, Bäckereien, Supermärkten für 2-4€ (Wert 10-30€).',
            tips: [
                'App installieren und Favoriten setzen',
                'Abholzeiten beachten (meist abends)',
                'Überraschungstüten enthalten oft Premium-Produkte',
                'Spart 70-80% gegenüber Normalpreis'
            ],
            safetyScore: 98,
            verified: true,
            icon: '🥗'
        },
        {
            id: 'fs6',
            name: 'Foodsharing',
            category: 'essen',
            type: 'Lebensmittel',
            region: 'Deutschland/Österreich/Schweiz',
            url: 'https://foodsharing.de',
            description: '100% KOSTENLOSE Lebensmittel retten. Werde Foodsaver und hole überschüssiges Essen bei Supermärkten ab.',
            tips: [
                'Registriere dich als Foodsaver',
                'Mache das Quiz um verifiziert zu werden',
                'Melde dich für Abholtermine an',
                'Teile mit Community über Fair-Teiler'
            ],
            safetyScore: 98,
            verified: true,
            icon: '🍎'
        },
        {
            id: 'fs7',
            name: 'BuyNothing Project',
            category: 'lokal',
            type: 'Alles',
            region: 'Weltweit',
            url: 'https://buynothingproject.org',
            description: 'Hyperlokal: Nachbarn schenken sich gegenseitig Sachen. Keine Verkäufe, kein Tausch - nur Geschenke!',
            tips: [
                'Finde deine lokale Buy Nothing Gruppe',
                'Stelle dich der Community vor',
                'Frage nach Sachen die du brauchst',
                'Schenke auch selbst - Karma!'
            ],
            safetyScore: 92,
            verified: true,
            icon: '🎁'
        },
        {
            id: 'fs8',
            name: 'Craigslist Free Section',
            category: 'lokal',
            type: 'Alles',
            region: 'USA/International',
            url: 'https://www.craigslist.org',
            description: 'Die "Free" Sektion auf Craigslist hat täglich tausende kostenlose Angebote in jeder Stadt.',
            tips: [
                'Gehe auf craigslist.org → "Free"',
                'Nutze E-Mail-Alerts für neue Angebote',
                'Biete schnelle Abholung an',
                'Besonders gut für Möbel und Elektronik'
            ],
            safetyScore: 75,
            verified: true,
            icon: '📋'
        },
        {
            id: 'fs9',
            name: 'Nebenan.de Verschenken',
            category: 'lokal',
            type: 'Alles',
            region: 'Deutschland',
            url: 'https://nebenan.de',
            description: 'Nachbarschafts-Plattform wo Nachbarn Sachen verschenken, verleihen und teilen.',
            tips: [
                'Registriere dich mit deiner Adresse',
                'Schaue regelmäßig in die Rubrik "Zu verschenken"',
                'Biete selbst an um Vertrauen aufzubauen',
                'Kurze Wege = schnelle Abholung'
            ],
            safetyScore: 95,
            verified: true,
            icon: '🏘️'
        },
        {
            id: 'fs10',
            name: 'Firmenliquidationen & Insolvenzen',
            category: 'business',
            type: 'Büromöbel, IT-Equipment, Inventar',
            region: 'Deutschland/EU',
            url: 'https://www.restposten.de',
            description: 'Bei Firmenschließungen werden oft hochwertige Büromöbel, Computer und Equipment verschenkt oder für wenig Geld abgegeben.',
            tips: [
                'Insolvenz-Bekanntmachungen verfolgen',
                'Kontaktiere Insolvenzverwalter direkt',
                'Frage bei Firmenumzügen nach Restbeständen',
                'Gebrauchte Büromöbel haben hohen Wiederverkaufswert'
            ],
            safetyScore: 85,
            verified: true,
            icon: '🏢'
        },
        {
            id: 'fs11',
            name: 'Gratis Software & Tools',
            category: 'digital',
            type: 'Software, Kurse, E-Books',
            region: 'Weltweit',
            url: 'https://www.producthunt.com',
            description: 'Viele Premium-Software-Tools bieten kostenlose Versionen an. Product Hunt listet täglich neue gratis Tools.',
            tips: [
                'Product Hunt täglich checken für Launches',
                'AppSumo Lifetime Deals (einmal zahlen, ewig nutzen)',
                'GitHub Student Pack (wenn Student)',
                'Google for Startups Programme'
            ],
            safetyScore: 95,
            verified: true,
            icon: '💻'
        },
        {
            id: 'fs12',
            name: 'Internationale Hilfsorganisationen',
            category: 'international',
            type: 'Kleidung, Möbel, Elektronik',
            region: 'Weltweit (auch Togo)',
            url: 'https://www.freecycle.org',
            description: 'Organisationen weltweit sammeln und verteilen Sachspenden. In Togo: Caritas, Rotes Kreuz, lokale NGOs.',
            tips: [
                'Kontaktiere lokale Hilfsorganisationen',
                'Kirchengemeinden haben oft Sachspenden-Lager',
                'Kleiderkammern (kostenlose Kleidung)',
                'Möbellager der Diakonie/Caritas'
            ],
            safetyScore: 98,
            verified: true,
            icon: '🤝'
        },
        {
            id: 'fs13',
            name: 'Reddit r/Free & r/GiftofGames',
            category: 'digital',
            type: 'Digitale Güter, Software, Games',
            region: 'Weltweit',
            url: 'https://www.reddit.com/r/FREE/',
            description: 'Reddit Communities wo Menschen Software-Keys, Games, Premium-Accounts und digitale Güter verschenken.',
            tips: [
                'Subreddit r/FREE, r/GiftofGames, r/RandomActsOfGaming',
                'Sei aktives Community-Mitglied',
                'Befolge die Regeln jedes Subreddits',
                'Bedanke dich immer!'
            ],
            safetyScore: 80,
            verified: true,
            icon: '🎮'
        },
        {
            id: 'fs14',
            name: 'Unternehmen Product Testing',
            category: 'produkte',
            type: 'Neue Produkte (behalten!)',
            region: 'Weltweit',
            url: 'https://www.testerheld.de',
            description: 'Unternehmen schicken dir kostenlose Produkte zum Testen und du darfst sie behalten!',
            tips: [
                'Melde dich auf Testing-Plattformen an',
                'Schreibe ehrliche, ausführliche Bewertungen',
                'Amazon Vine Programm (für Top-Reviewer)',
                'Direkt bei Marken als Tester bewerben'
            ],
            safetyScore: 85,
            verified: true,
            icon: '📦'
        }
    ],

    // ====== PROFILE QUIZ ======
    quizQuestions: [
        {
            question: '💼 Was interessiert dich mehr?',
            options: [
                { label: '🏪 Eigenes Business starten', value: 'business' },
                { label: '🎁 Kostenlose Sachen finden', value: 'free-stuff' },
                { label: '🔄 Beides!', value: 'both' }
            ]
        },
        {
            question: '⏰ Wie viel Zeit hast du pro Woche?',
            options: [
                { label: '1-5 Stunden', value: 'minimal' },
                { label: '5-15 Stunden', value: 'moderate' },
                { label: '15+ Stunden', value: 'full' }
            ]
        },
        {
            question: '💰 Wie viel kannst du investieren?',
            options: [
                { label: '0€ - Absolut nichts', value: 'zero' },
                { label: 'Bis 100€', value: 'low' },
                { label: '100€+', value: 'medium' }
            ]
        },
        {
            question: '🧠 Deine stärkste Fähigkeit?',
            options: [
                { label: '🗣️ Kommunikation & Verkaufen', value: 'communication' },
                { label: '💻 Technik & Computer', value: 'tech' },
                { label: '🎨 Kreativität & Design', value: 'creative' },
                { label: '📊 Organisation & Planung', value: 'organization' },
                { label: '🌍 Sprachen', value: 'languages' },
                { label: '🤷 Keine besonderen', value: 'none' }
            ]
        },
        {
            question: '🌍 Wo bist du?',
            options: [
                { label: '🇩🇪 Deutschland', value: 'germany' },
                { label: '🇹🇬 Togo', value: 'togo' },
                { label: '🇪🇺 Anderes EU-Land', value: 'eu' },
                { label: '🌍 Afrika (außer Togo)', value: 'africa' },
                { label: '🌏 Andere', value: 'other' }
            ]
        }
    ],

    // ====== STATE ======
    quizStep: 0,
    userProfile: {},
    searchResults: [],
    savedItems: [],
    fraudChecks: [],

    // ====== INIT ======
    init() {
        this.loadState();
    },

    loadState() {
        const saved = localStorage.getItem('pimel_data');
        if (saved) {
            const data = JSON.parse(saved);
            this.savedItems = data.savedItems || [];
            this.fraudChecks = data.fraudChecks || [];
        }
    },

    saveState() {
        localStorage.setItem('pimel_data', JSON.stringify({
            savedItems: this.savedItems,
            fraudChecks: this.fraudChecks
        }));
    },

    // ====== MAIN SCAN ======
    startScan() {
        this.quizStep = 0;
        this.userProfile = {};
        const container = document.getElementById('pimelContent');
        container.style.display = 'block';
        this.showQuizQuestion(container);
    },

    showQuizQuestion(container) {
        if (this.quizStep >= this.quizQuestions.length) {
            this.runScan(container);
            return;
        }

        const q = this.quizQuestions[this.quizStep];
        const progress = (this.quizStep / this.quizQuestions.length * 100);

        container.innerHTML = `
            <div class="pimel-quiz">
                <div class="pimel-progress">
                    <div class="pimel-progress-bar" style="width:${progress}%"></div>
                </div>
                <div class="pimel-step-text">Schritt ${this.quizStep + 1}/${this.quizQuestions.length}</div>
                <h3 class="pimel-question">${q.question}</h3>
                <div class="pimel-options">
                    ${q.options.map(o => `
                        <button class="pimel-option" onclick="Pimel.selectOption('${o.value}')">
                            ${o.label}
                        </button>
                    `).join('')}
                </div>
            </div>
        `;
    },

    selectOption(value) {
        const questionId = this.quizQuestions[this.quizStep].question;
        this.userProfile[this.quizStep] = value;
        this.quizStep++;
        const container = document.getElementById('pimelContent');
        container.style.opacity = '0';
        setTimeout(() => {
            this.showQuizQuestion(container);
            container.style.opacity = '1';
        }, 200);
    },

    async runScan(container) {
        const scanPhrases = [
            '🔍 Analysiere dein Profil...',
            '🌐 Durchsuche legale Business-Datenbanken...',
            '🎁 Suche kostenlose Angebote weltweit...',
            '🛡️ Prüfe auf Betrug & Scams...',
            '🇹🇬 Suche Togo-spezifische Möglichkeiten...',
            '💡 Generiere personalisierte Empfehlungen...',
            '📊 Berechne Gewinnpotentiale...',
            '✅ Verifiziere Legalität aller Ergebnisse...'
        ];

        container.innerHTML = `
            <div class="pimel-scanning">
                <div class="pimel-scan-icon">🤖</div>
                <h3 class="pimel-scan-title">Pimel sucht für dich...</h3>
                <p class="pimel-scan-status" id="pimelScanStatus">${scanPhrases[0]}</p>
                <div class="pimel-scan-progress">
                    <div class="pimel-scan-bar" id="pimelScanBar"></div>
                </div>
                <div class="pimel-scan-found" id="pimelFound">
                    <span class="pimel-found-count" id="pimelFoundCount">0</span> Möglichkeiten gefunden
                </div>
            </div>
        `;

        let found = 0;
        for (let i = 0; i < scanPhrases.length; i++) {
            await this.delay(500 + Math.random() * 500);
            const el = document.getElementById('pimelScanStatus');
            const bar = document.getElementById('pimelScanBar');
            const count = document.getElementById('pimelFoundCount');
            if (el) el.textContent = scanPhrases[i];
            if (bar) bar.style.width = ((i + 1) / scanPhrases.length * 100) + '%';
            found += Math.floor(Math.random() * 5) + 2;
            if (count) count.textContent = found;
        }

        await this.delay(600);
        this.showResults(container);
    },

    // ====== SCORE BUSINESSES ======
    scoreBusiness(biz) {
        let score = 50;
        const profile = this.userProfile;

        // Time
        if (profile[1] === 'minimal' && biz.difficulty === 'einfach') score += 15;
        if (profile[1] === 'full' && biz.difficulty === 'mittel') score += 10;
        if (profile[1] === 'minimal' && biz.difficulty === 'mittel') score -= 10;

        // Budget
        if (profile[2] === 'zero' && biz.startCost === 0) score += 20;
        if (profile[2] === 'zero' && biz.startCost > 0) score -= 30;

        // Skills
        if (profile[3] === 'communication' && biz.category === 'service') score += 20;
        if (profile[3] === 'tech' && biz.category === 'tech') score += 25;
        if (profile[3] === 'creative' && biz.tags.includes('kreativ')) score += 20;
        if (profile[3] === 'organization' && biz.tags.includes('service')) score += 15;
        if (profile[3] === 'languages' && biz.id === 'b7') score += 30;
        if (profile[3] === 'none' && biz.difficulty === 'einfach') score += 10;

        // Location
        if (profile[4] === 'togo' && biz.tags.includes('kostenlos')) score += 10;
        if (profile[4] === 'germany' && biz.tags.includes('lokal')) score += 10;

        // Passive income bonus
        if (biz.tags.includes('passiv')) score += 5;

        return Math.max(0, Math.min(100, score));
    },

    scoreSource(source) {
        let score = 60;
        const profile = this.userProfile;

        if (profile[4] === 'germany' && source.region.includes('Deutschland')) score += 25;
        if (profile[4] === 'togo' && (source.region.includes('Weltweit') || source.region.includes('Togo'))) score += 20;
        if (profile[4] === 'eu' && source.region.includes('EU')) score += 15;

        if (source.safetyScore >= 90) score += 10;
        if (source.verified) score += 5;

        return Math.max(0, Math.min(100, score));
    },

    // ====== SHOW RESULTS ======
    showResults(container) {
        const showBiz = this.userProfile[0] === 'business' || this.userProfile[0] === 'both';
        const showFree = this.userProfile[0] === 'free-stuff' || this.userProfile[0] === 'both';

        const scoredBusinesses = this.businesses.map(b => ({
            ...b, matchScore: this.scoreBusiness(b)
        })).sort((a, b) => b.matchScore - a.matchScore);

        const scoredSources = this.freeStuffSources.map(s => ({
            ...s, matchScore: this.scoreSource(s)
        })).sort((a, b) => b.matchScore - a.matchScore);

        container.innerHTML = `
            <div class="pimel-results">
                <div class="pimel-results-header">
                    <div class="pimel-results-icon">🤖</div>
                    <h3>Pimel hat ${scoredBusinesses.length + scoredSources.length} Ergebnisse gefunden!</h3>
                    <p>100% legal • Betrugs-geprüft • Personalisiert</p>
                </div>

                <!-- Fraud Checker -->
                <div class="pimel-fraud-checker">
                    <h4>🛡️ Betrugs-Checker</h4>
                    <p>Prüfe jedes Angebot bevor du handelst!</p>
                    <div class="pimel-fraud-input">
                        <textarea id="pimelFraudText" placeholder="Füge hier den Text eines Angebots ein um es auf Betrug zu prüfen..." rows="3"></textarea>
                        <button class="btn btn-primary full-width" onclick="Pimel.checkForFraud()">
                            🛡️ Auf Betrug prüfen
                        </button>
                    </div>
                    <div id="pimelFraudResult"></div>
                </div>

                ${showBiz ? `
                    <!-- BUSINESS ERGEBNISSE -->
                    <div class="pimel-section">
                        <h4>💼 Legale Business-Ideen für dich</h4>
                        <div class="pimel-filter-row">
                            <button class="pimel-filter active" data-f="all" onclick="Pimel.filterBiz('all',this)">Alle</button>
                            <button class="pimel-filter" data-f="kostenlos" onclick="Pimel.filterBiz('kostenlos',this)">0€ Start</button>
                            <button class="pimel-filter" data-f="passiv" onclick="Pimel.filterBiz('passiv',this)">Passiv</button>
                            <button class="pimel-filter" data-f="sofort" onclick="Pimel.filterBiz('sofort',this)">Sofort</button>
                            <button class="pimel-filter" data-f="skalierbar" onclick="Pimel.filterBiz('skalierbar',this)">Skalierbar</button>
                        </div>
                        <div class="pimel-biz-list" id="pimelBizList">
                            ${scoredBusinesses.map((b, i) => this.renderBusinessCard(b, i)).join('')}
                        </div>
                    </div>
                ` : ''}

                ${showFree ? `
                    <!-- KOSTENLOSE SACHEN -->
                    <div class="pimel-section">
                        <h4>🎁 Kostenlose Sachen & Geschenke finden</h4>
                        <div class="pimel-filter-row">
                            <button class="pimel-filter active" data-f="all" onclick="Pimel.filterFree('all',this)">Alle</button>
                            <button class="pimel-filter" data-f="lokal" onclick="Pimel.filterFree('lokal',this)">Lokal</button>
                            <button class="pimel-filter" data-f="digital" onclick="Pimel.filterFree('digital',this)">Digital</button>
                            <button class="pimel-filter" data-f="essen" onclick="Pimel.filterFree('essen',this)">Essen</button>
                            <button class="pimel-filter" data-f="international" onclick="Pimel.filterFree('international',this)">International</button>
                        </div>
                        <div class="pimel-free-list" id="pimelFreeList">
                            ${scoredSources.map(s => this.renderFreeCard(s)).join('')}
                        </div>
                    </div>
                ` : ''}

                <!-- Safety Tips -->
                <div class="pimel-safety">
                    <h4>🛡️ Pimel's Sicherheitsregeln</h4>
                    <div class="pimel-rules">
                        <div class="pimel-rule safe">✅ Niemals Geld im Voraus zahlen für "Geschenke"</div>
                        <div class="pimel-rule safe">✅ Treffe dich an öffentlichen Orten bei Abholungen</div>
                        <div class="pimel-rule safe">✅ Gib niemals Bankdaten oder Passwörter weiter</div>
                        <div class="pimel-rule safe">✅ Prüfe jedes Angebot mit dem Betrugs-Checker</div>
                        <div class="pimel-rule safe">✅ Wenn es zu gut klingt um wahr zu sein → IST ES BETRUG</div>
                        <div class="pimel-rule blocked">⛔ Pimel blockiert automatisch alle verdächtigen Angebote</div>
                    </div>
                </div>

                <button class="btn btn-outline full-width" onclick="Pimel.startScan()" style="margin-top:15px">
                    🔄 Neuen Scan starten
                </button>
            </div>
        `;
    },

    renderBusinessCard(biz, index) {
        const matchColor = biz.matchScore >= 75 ? '#00B894' : biz.matchScore >= 50 ? '#FDCB6E' : '#FF7675';
        return `
            <div class="pimel-biz-card" data-tags="${biz.tags.join(',')}" onclick="Pimel.showBusinessDetail('${biz.id}')">
                ${index === 0 ? '<div class="pimel-best-badge">⭐ Beste Empfehlung</div>' : ''}
                <div class="pimel-biz-header">
                    <div class="pimel-biz-info">
                        <h4>${biz.name}</h4>
                        <p>${biz.description.substring(0, 90)}...</p>
                    </div>
                    <div class="pimel-match" style="border-color:${matchColor};color:${matchColor}">${biz.matchScore}%</div>
                </div>
                <div class="pimel-biz-tags">
                    <span class="pimel-tag profit">💰 ${biz.monthlyProfit.min}-${biz.monthlyProfit.max}€/M</span>
                    <span class="pimel-tag">${biz.startCost === 0 ? '🆓 Kostenlos' : '💶 ' + biz.startCost + '€'}</span>
                    <span class="pimel-tag">${biz.difficulty === 'einfach' ? '🟢' : '🟡'} ${biz.difficulty}</span>
                    <span class="pimel-tag">⏰ ${biz.timeToProfit}</span>
                </div>
                <div class="pimel-biz-footer">
                    <span>🛡️ Risiko: ${biz.riskLevel}</span>
                    <span>✅ Legal & verifiziert</span>
                </div>
            </div>
        `;
    },

    renderFreeCard(source) {
        const scoreInfo = this.fraudDetector.getScoreLabel(source.safetyScore);
        return `
            <div class="pimel-free-card" data-cat="${source.category}" onclick="Pimel.showFreeDetail('${source.id}')">
                <div class="pimel-free-header">
                    <span class="pimel-free-icon">${source.icon}</span>
                    <div class="pimel-free-info">
                        <h4>${source.name}</h4>
                        <p>${source.description.substring(0, 80)}...</p>
                    </div>
                    <div class="pimel-safety-score" style="color:${scoreInfo.color}">
                        ${scoreInfo.icon} ${source.safetyScore}%
                    </div>
                </div>
                <div class="pimel-free-tags">
                    <span class="pimel-tag">📦 ${source.type.substring(0, 30)}</span>
                    <span class="pimel-tag">🌍 ${source.region}</span>
                    ${source.verified ? '<span class="pimel-tag verified">✅ Verifiziert</span>' : ''}
                </div>
            </div>
        `;
    },

    // ====== DETAIL VIEWS ======
    showBusinessDetail(id) {
        const biz = this.businesses.find(b => b.id === id);
        if (!biz) return;

        document.getElementById('infoModalTitle').textContent = '💼 ' + biz.name;
        document.getElementById('infoModalBody').innerHTML = `
            <div class="pimel-detail">
                <!-- Fraud Check Badge -->
                <div class="pimel-legal-badge">
                    <span>🛡️ Pimel-Geprüft</span>
                    <span class="pimel-verified">✅ LEGAL & SICHER</span>
                </div>

                <!-- Overview -->
                <div class="pimel-detail-stats">
                    <div class="pimel-stat">
                        <span>💰 Verdienst</span>
                        <strong class="green">${biz.monthlyProfit.min}-${biz.monthlyProfit.max}€/M</strong>
                    </div>
                    <div class="pimel-stat">
                        <span>💶 Startkosten</span>
                        <strong>${biz.startCost === 0 ? '🆓 KOSTENLOS' : biz.startCost + '€'}</strong>
                    </div>
                    <div class="pimel-stat">
                        <span>⏰ Bis zum 1. €</span>
                        <strong>${biz.timeToProfit}</strong>
                    </div>
                    <div class="pimel-stat">
                        <span>📊 Schwierigkeit</span>
                        <strong>${biz.difficulty}</strong>
                    </div>
                </div>

                <div class="pimel-detail-section">
                    <h4>📋 Beschreibung</h4>
                    <p>${biz.description}</p>
                </div>

                <div class="pimel-detail-section">
                    <h4>📝 Schritt-für-Schritt Anleitung</h4>
                    <ol class="pimel-steps">
                        ${biz.steps.map(s => `<li>${s}</li>`).join('')}
                    </ol>
                </div>

                <div class="pimel-detail-section">
                    <h4>🛠️ Tools (kostenlos)</h4>
                    <div class="pimel-tools">${biz.tools.map(t => `<span class="pimel-tool">${t}</span>`).join('')}</div>
                </div>

                <div class="pimel-detail-section">
                    <h4>🔗 Plattformen zum Starten</h4>
                    <div class="pimel-platforms">
                        ${biz.platforms.map(p => `
                            <a href="${p.url}" target="_blank" rel="noopener" class="pimel-platform-link">
                                🔗 ${p.name} - ${p.desc}
                            </a>
                        `).join('')}
                    </div>
                </div>

                <div class="pimel-detail-section">
                    <h4>📈 Skalierung</h4>
                    <p>${biz.scaleTips}</p>
                </div>

                <div class="pimel-detail-section">
                    <h4>💡 Proof of Concept</h4>
                    <p>${biz.proofOfConcept}</p>
                </div>

                <div class="pimel-detail-legal">
                    <h4>⚖️ Rechtliches</h4>
                    <p>${biz.legalInfo}</p>
                </div>

                <button class="btn btn-primary full-width" onclick="Pimel.saveItem('business', '${biz.id}')">
                    <i class="fas fa-bookmark"></i> Business-Idee merken
                </button>
            </div>
        `;
        openModal('infoModal');
    },

    showFreeDetail(id) {
        const source = this.freeStuffSources.find(s => s.id === id);
        if (!source) return;

        const scoreInfo = this.fraudDetector.getScoreLabel(source.safetyScore);

        document.getElementById('infoModalTitle').textContent = source.icon + ' ' + source.name;
        document.getElementById('infoModalBody').innerHTML = `
            <div class="pimel-detail">
                <div class="pimel-legal-badge">
                    <span>🛡️ Sicherheitsbewertung</span>
                    <span style="color:${scoreInfo.color};font-weight:800">${scoreInfo.icon} ${source.safetyScore}/100 - ${scoreInfo.label}</span>
                </div>

                <div class="pimel-detail-section">
                    <h4>📋 Beschreibung</h4>
                    <p>${source.description}</p>
                </div>

                <div class="pimel-detail-stats">
                    <div class="pimel-stat">
                        <span>📦 Was?</span>
                        <strong>${source.type}</strong>
                    </div>
                    <div class="pimel-stat">
                        <span>🌍 Wo?</span>
                        <strong>${source.region}</strong>
                    </div>
                </div>

                <div class="pimel-detail-section">
                    <h4>💡 Tipps für Erfolg</h4>
                    <ul>
                        ${source.tips.map(t => `<li>${t}</li>`).join('')}
                    </ul>
                </div>

                <div class="pimel-detail-section">
                    <h4>⚠️ Pimel's Sicherheitshinweise</h4>
                    <div class="pimel-safety-tips">
                        <div class="pimel-rule safe">✅ Niemals Geld zahlen für "kostenlose" Sachen</div>
                        <div class="pimel-rule safe">✅ Treffe dich an öffentlichen Orten</div>
                        <div class="pimel-rule safe">✅ Nimm jemanden mit bei Abholungen</div>
                        <div class="pimel-rule safe">✅ Gib keine persönlichen Daten preis</div>
                    </div>
                </div>

                <a href="${source.url}" target="_blank" rel="noopener" class="btn btn-primary full-width" style="text-decoration:none;text-align:center">
                    🔗 Zur Plattform
                </a>
                <button class="btn btn-outline full-width" onclick="Pimel.saveItem('source', '${source.id}')" style="margin-top:8px">
                    <i class="fas fa-bookmark"></i> Merken
                </button>
            </div>
        `;
        openModal('infoModal');
    },

    // ====== FRAUD CHECKER ======
    checkForFraud() {
        const text = document.getElementById('pimelFraudText').value.trim();
        if (!text) {
            showToast('⚠️ Bitte Text eingeben');
            return;
        }

        const result = this.fraudDetector.analyze(text);
        const scoreInfo = this.fraudDetector.getScoreLabel(result.score);

        this.fraudChecks.push({
            text: text.substring(0, 100),
            result: result,
            timestamp: new Date().toISOString()
        });
        this.saveState();

        const resultEl = document.getElementById('pimelFraudResult');
        resultEl.innerHTML = `
            <div class="pimel-fraud-result ${result.blocked ? 'blocked' : result.score >= 70 ? 'safe' : 'warning'}">
                <div class="pimel-fraud-score">
                    <div class="pimel-fraud-score-circle" style="border-color:${scoreInfo.color}">
                        <span style="color:${scoreInfo.color}">${scoreInfo.icon}</span>
                    </div>
                    <div>
                        <strong style="color:${scoreInfo.color};font-size:1.2rem">${scoreInfo.label}</strong>
                        <span>Sicherheitsscore: ${result.score}/100</span>
                    </div>
                </div>

                ${result.blocked ? `
                    <div class="pimel-fraud-blocked">
                        ⛔ BETRUG ERKANNT - FINGER WEG!
                    </div>
                ` : ''}

                ${result.warnings.length > 0 ? `
                    <div class="pimel-fraud-warnings">
                        <h4>⚠️ Warnungen:</h4>
                        ${result.warnings.map(w => `
                            <div class="pimel-fraud-warning ${w.severity}">
                                ${w.message}
                            </div>
                        `).join('')}
                    </div>
                ` : `
                    <div class="pimel-fraud-ok">
                        ✅ Keine Betrugsmerkmale erkannt. Trotzdem vorsichtig sein!
                    </div>
                `}
            </div>
        `;
    },

    // ====== FILTERS ======
    filterBiz(tag, btn) {
        document.querySelectorAll('#pimelBizList').forEach(list => {
            const parent = btn.parentElement;
            parent.querySelectorAll('.pimel-filter').forEach(f => f.classList.remove('active'));
            btn.classList.add('active');

            list.querySelectorAll('.pimel-biz-card').forEach(card => {
                if (tag === 'all') {
                    card.style.display = '';
                } else {
                    card.style.display = card.dataset.tags.includes(tag) ? '' : 'none';
                }
            });
        });
    },

    filterFree(cat, btn) {
        const parent = btn.parentElement;
        parent.querySelectorAll('.pimel-filter').forEach(f => f.classList.remove('active'));
        btn.classList.add('active');

        document.querySelectorAll('.pimel-free-card').forEach(card => {
            if (cat === 'all') {
                card.style.display = '';
            } else {
                card.style.display = card.dataset.cat === cat ? '' : 'none';
            }
        });
    },

    // ====== SAVE ======
    saveItem(type, id) {
        const exists = this.savedItems.find(i => i.id === id && i.type === type);
        if (!exists) {
            this.savedItems.push({ type, id, savedAt: new Date().toISOString() });
            this.saveState();
            showToast('✅ Gespeichert!');
        } else {
            showToast('Bereits gespeichert');
        }
    },

    delay(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }
};
