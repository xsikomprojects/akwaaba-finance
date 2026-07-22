// ================================================
// 💎 OPPORTUNITY FINDER - Finanzielle Lücken Finder
// Legale Internet-Geldquellen entdecken
// ================================================

const OpportunityFinder = {
    
    // ====== MASSIVE DATABASE OF OPPORTUNITIES ======
    opportunities: [
        // ===== KATEGORIE: ARBITRAGE & RESELLING =====
        {
            id: 1,
            title: "Amazon FBA Arbitrage",
            category: "arbitrage",
            difficulty: "mittel",
            income: "500-5000€/Monat",
            incomeMin: 500,
            incomeMax: 5000,
            investment: "200-1000€",
            timeNeeded: "10-20h/Woche",
            description: "Kaufe Produkte günstig ein (Einzelhandel, Liquidation, Großhandel) und verkaufe sie mit Gewinn auf Amazon.",
            steps: [
                "Amazon Seller Account erstellen (39€/Monat)",
                "Scanne Produkte mit der Amazon Seller App",
                "Kaufe Produkte mit mind. 30% Marge ein",
                "Sende Produkte an Amazon FBA Lager",
                "Amazon übernimmt Versand & Kundenservice"
            ],
            tools: ["Amazon Seller App", "Keepa (Preisverlauf)", "Jungle Scout", "RevSeller"],
            links: [
                { name: "Amazon Seller Central", url: "https://sellercentral.amazon.de" },
                { name: "Keepa Preistracker", url: "https://keepa.com" }
            ],
            tags: ["reselling", "ecommerce", "physical"],
            riskLevel: "mittel",
            scalability: 5,
            passiveIncome: false,
            trend: "stabil",
            legalNote: "Gewerbeanmeldung erforderlich. Steuerliche Pflichten beachten."
        },
        {
            id: 2,
            title: "eBay Kleinanzeigen Flipping",
            category: "arbitrage",
            difficulty: "leicht",
            income: "200-2000€/Monat",
            incomeMin: 200,
            incomeMax: 2000,
            investment: "50-500€",
            timeNeeded: "5-15h/Woche",
            description: "Kaufe unterbewertete Artikel auf Kleinanzeigen und verkaufe sie mit Profit weiter.",
            steps: [
                "Nische finden (Elektronik, Möbel, Vintage)",
                "Marktpreise recherchieren",
                "Günstige Angebote finden & verhandeln",
                "Artikel aufwerten (reinigen, reparieren, bessere Fotos)",
                "Mit Gewinn weiterverkaufen"
            ],
            tools: ["eBay Kleinanzeigen", "eBay", "Vinted", "WorthPoint"],
            links: [
                { name: "eBay Kleinanzeigen", url: "https://www.kleinanzeigen.de" },
                { name: "Vinted", url: "https://www.vinted.de" }
            ],
            tags: ["reselling", "offline", "physical"],
            riskLevel: "niedrig",
            scalability: 3,
            passiveIncome: false,
            trend: "wachsend",
            legalNote: "Bis 600€/Jahr Gewinn steuerfrei (privater Verkauf). Darüber Gewerbeanmeldung."
        },
        {
            id: 3,
            title: "Domain Flipping",
            category: "arbitrage",
            difficulty: "mittel",
            income: "100-10000€/Monat",
            incomeMin: 100,
            incomeMax: 10000,
            investment: "50-500€",
            timeNeeded: "5-10h/Woche",
            description: "Registriere wertvolle Domainnamen günstig und verkaufe sie mit Gewinn weiter.",
            steps: [
                "Trends & Branchen recherchieren",
                "Verfügbare wertvolle Domains finden",
                "Domains für 5-15€ registrieren",
                "Auf Domain-Marktplätzen listen",
                "An interessierte Käufer verkaufen"
            ],
            tools: ["Namecheap", "GoDaddy Auctions", "Sedo", "ExpiredDomains.net"],
            links: [
                { name: "Sedo Marktplatz", url: "https://sedo.com" },
                { name: "Namecheap", url: "https://namecheap.com" }
            ],
            tags: ["digital", "online", "speculation"],
            riskLevel: "mittel",
            scalability: 4,
            passiveIncome: false,
            trend: "stabil",
            legalNote: "Legal solange keine Markenrechte verletzt werden. Keine geschützten Markennamen registrieren!"
        },

        // ===== KATEGORIE: FREELANCING & SERVICES =====
        {
            id: 4,
            title: "KI-gestütztes Freelancing",
            category: "freelancing",
            difficulty: "leicht",
            income: "1000-8000€/Monat",
            incomeMin: 1000,
            incomeMax: 8000,
            investment: "0-50€",
            timeNeeded: "10-30h/Woche",
            description: "Nutze KI-Tools (ChatGPT, Midjourney) um Freelancing-Aufträge 5x schneller zu erledigen.",
            steps: [
                "KI-Tools beherrschen lernen (ChatGPT, Claude, Midjourney)",
                "Profil auf Freelancing-Plattformen erstellen",
                "Services anbieten: Texte, Bilder, Code, Übersetzungen",
                "Mit KI-Unterstützung schneller & besser liefern",
                "Preise erhöhen wenn Bewertungen steigen"
            ],
            tools: ["ChatGPT", "Claude", "Midjourney", "Fiverr", "Upwork"],
            links: [
                { name: "Fiverr", url: "https://fiverr.com" },
                { name: "Upwork", url: "https://upwork.com" }
            ],
            tags: ["online", "ai", "skills", "scalable"],
            riskLevel: "niedrig",
            scalability: 5,
            passiveIncome: false,
            trend: "stark wachsend",
            legalNote: "Freiberufliche Tätigkeit oder Gewerbeanmeldung. KI-Nutzung transparent kommunizieren."
        },
        {
            id: 5,
            title: "Virtueller Assistent",
            category: "freelancing",
            difficulty: "leicht",
            income: "500-3000€/Monat",
            incomeMin: 500,
            incomeMax: 3000,
            investment: "0€",
            timeNeeded: "10-30h/Woche",
            description: "Biete administrative Unterstützung für Unternehmer und kleine Firmen online an.",
            steps: [
                "Skills definieren (E-Mail, Kalender, Social Media, Buchhaltung)",
                "Profil auf VA-Plattformen erstellen",
                "Erste Kunden über Fiverr/Upwork gewinnen",
                "Systeme & Prozesse aufbauen",
                "Langfristige Kundenbeziehungen aufbauen"
            ],
            tools: ["Asana", "Slack", "Google Workspace", "Calendly"],
            links: [
                { name: "Belay", url: "https://belaysolutions.com" },
                { name: "Time Etc", url: "https://web.timeetc.com" }
            ],
            tags: ["online", "remote", "service"],
            riskLevel: "niedrig",
            scalability: 3,
            passiveIncome: false,
            trend: "wachsend",
            legalNote: "Gewerbeanmeldung oder freiberufliche Tätigkeit erforderlich."
        },
        {
            id: 6,
            title: "Online Nachhilfe & Tutoring",
            category: "freelancing",
            difficulty: "leicht",
            income: "500-4000€/Monat",
            incomeMin: 500,
            incomeMax: 4000,
            investment: "0€",
            timeNeeded: "5-20h/Woche",
            description: "Gib Online-Nachhilfe in deinen Stärken - Sprachen, Mathe, Musik, Programmierung.",
            steps: [
                "Fach/Expertise wählen",
                "Profil auf Tutoring-Plattformen erstellen",
                "Probestunden anbieten",
                "Gute Bewertungen sammeln",
                "Preise schrittweise erhöhen"
            ],
            tools: ["Zoom", "Preply", "Superprof", "Tutorful"],
            links: [
                { name: "Preply", url: "https://preply.com" },
                { name: "Superprof", url: "https://www.superprof.de" }
            ],
            tags: ["online", "education", "flexible"],
            riskLevel: "niedrig",
            scalability: 3,
            passiveIncome: false,
            trend: "wachsend",
            legalNote: "Freiberufliche Tätigkeit (Unterricht). Oft keine Gewerbeanmeldung nötig."
        },

        // ===== KATEGORIE: CONTENT CREATION =====
        {
            id: 7,
            title: "YouTube Automation",
            category: "content",
            difficulty: "mittel",
            income: "100-10000€/Monat",
            incomeMin: 100,
            incomeMax: 10000,
            investment: "0-200€",
            timeNeeded: "10-20h/Woche",
            description: "Erstelle YouTube Kanäle mit KI-generierten Videos (Faceless YouTube) und verdiene durch Werbung.",
            steps: [
                "Nische wählen (Finanzen, Tech, Facts, Motivation)",
                "KI-Tools für Skript, Voiceover und Bilder nutzen",
                "Videos mit CapCut/DaVinci Resolve schneiden",
                "Regelmäßig uploaden (3-5 Videos/Woche)",
                "Ab 1000 Abos + 4000h Watchtime monetarisieren"
            ],
            tools: ["ChatGPT (Skripte)", "ElevenLabs (Voiceover)", "Canva", "CapCut"],
            links: [
                { name: "YouTube Studio", url: "https://studio.youtube.com" },
                { name: "ElevenLabs", url: "https://elevenlabs.io" }
            ],
            tags: ["online", "passive", "ai", "scalable"],
            riskLevel: "niedrig",
            scalability: 5,
            passiveIncome: true,
            trend: "stark wachsend",
            legalNote: "Gewerbeanmeldung bei Einnahmen. YouTube Partner Richtlinien beachten."
        },
        {
            id: 8,
            title: "Newsletter/Substack Monetarisierung",
            category: "content",
            difficulty: "mittel",
            income: "200-5000€/Monat",
            incomeMin: 200,
            incomeMax: 5000,
            investment: "0€",
            timeNeeded: "5-15h/Woche",
            description: "Baue einen Newsletter auf und verdiene durch bezahlte Abos, Sponsoring und Affiliate Links.",
            steps: [
                "Nische & Zielgruppe definieren",
                "Substack oder Beehiiv Account erstellen",
                "Wöchentlich wertvollen Content schreiben",
                "Leser über Social Media gewinnen",
                "Monetarisieren ab 500+ Abonnenten"
            ],
            tools: ["Substack", "Beehiiv", "ConvertKit", "Canva"],
            links: [
                { name: "Substack", url: "https://substack.com" },
                { name: "Beehiiv", url: "https://beehiiv.com" }
            ],
            tags: ["online", "writing", "scalable", "passive"],
            riskLevel: "niedrig",
            scalability: 5,
            passiveIncome: true,
            trend: "stark wachsend",
            legalNote: "Impressumspflicht beachten. Werbekennzeichnung bei Sponsoring."
        },
        {
            id: 9,
            title: "TikTok/Reels Creator Fund",
            category: "content",
            difficulty: "leicht",
            income: "50-5000€/Monat",
            incomeMin: 50,
            incomeMax: 5000,
            investment: "0€",
            timeNeeded: "5-15h/Woche",
            description: "Erstelle Kurzvideos und verdiene durch den Creator Fund, Sponsoring und Affiliate Marketing.",
            steps: [
                "Nische wählen (Comedy, Bildung, Lifestyle)",
                "Täglich 1-3 Videos posten",
                "Trends & Sounds nutzen",
                "Community aufbauen",
                "Ab 10K Followern monetarisieren"
            ],
            tools: ["CapCut", "TikTok", "Instagram Reels", "Canva"],
            links: [
                { name: "TikTok Creator", url: "https://www.tiktok.com/creators" },
                { name: "CapCut", url: "https://www.capcut.com" }
            ],
            tags: ["online", "creative", "social-media"],
            riskLevel: "niedrig",
            scalability: 5,
            passiveIncome: true,
            trend: "stark wachsend",
            legalNote: "Gewerbeanmeldung bei regelmäßigen Einnahmen. Werbekennzeichnungspflicht."
        },

        // ===== KATEGORIE: DIGITALE PRODUKTE =====
        {
            id: 10,
            title: "Notion/Canva Templates verkaufen",
            category: "digital-products",
            difficulty: "leicht",
            income: "200-5000€/Monat",
            incomeMin: 200,
            incomeMax: 5000,
            investment: "0-30€",
            timeNeeded: "10-15h Setup, 2-5h/Woche",
            description: "Erstelle Templates für Notion, Canva, Excel und verkaufe sie auf Marktplätzen.",
            steps: [
                "Beliebte Template-Kategorien recherchieren",
                "Hochwertige Templates in Notion/Canva erstellen",
                "Auf Gumroad, Etsy oder eigener Seite listen",
                "Marketing über Social Media & Pinterest",
                "Passive Einnahmen generieren"
            ],
            tools: ["Notion", "Canva", "Gumroad", "Etsy"],
            links: [
                { name: "Gumroad", url: "https://gumroad.com" },
                { name: "Etsy", url: "https://etsy.com" }
            ],
            tags: ["online", "passive", "digital", "creative"],
            riskLevel: "niedrig",
            scalability: 5,
            passiveIncome: true,
            trend: "stark wachsend",
            legalNote: "Gewerbeanmeldung. Umsatzsteuer beachten."
        },
        {
            id: 11,
            title: "Online-Kurse erstellen",
            category: "digital-products",
            difficulty: "mittel",
            income: "500-20000€/Monat",
            incomeMin: 500,
            incomeMax: 20000,
            investment: "0-100€",
            timeNeeded: "40-100h Setup, 5h/Woche danach",
            description: "Erstelle einmal einen Online-Kurs und verkaufe ihn unbegrenzt oft.",
            steps: [
                "Expertise-Thema wählen (was kannst du gut?)",
                "Kursstruktur planen (Module, Lektionen)",
                "Videos aufnehmen (Smartphone reicht!)",
                "Auf Udemy, Skillshare oder Teachable hochladen",
                "Durch Marketing verkaufen"
            ],
            tools: ["Teachable", "Udemy", "Loom", "Canva"],
            links: [
                { name: "Udemy Instructor", url: "https://www.udemy.com/teaching" },
                { name: "Teachable", url: "https://teachable.com" }
            ],
            tags: ["online", "passive", "education", "scalable"],
            riskLevel: "niedrig",
            scalability: 5,
            passiveIncome: true,
            trend: "stark wachsend",
            legalNote: "Gewerbeanmeldung. Informationspflichten bei digitalen Produkten."
        },
        {
            id: 12,
            title: "E-Books auf Amazon KDP",
            category: "digital-products",
            difficulty: "leicht",
            income: "100-5000€/Monat",
            incomeMin: 100,
            incomeMax: 5000,
            investment: "0€",
            timeNeeded: "20-40h pro Buch, passiv danach",
            description: "Schreibe und veröffentliche E-Books & Taschenbücher auf Amazon. KI hilft beim Schreiben!",
            steps: [
                "Profitable Nische recherchieren (Amazon Bestseller)",
                "Buch schreiben (KI als Unterstützung nutzen)",
                "Cover mit Canva oder Fiverr erstellen",
                "Auf Amazon KDP hochladen",
                "Keywords optimieren für Sichtbarkeit"
            ],
            tools: ["Amazon KDP", "ChatGPT", "Canva", "Kindle Create"],
            links: [
                { name: "Amazon KDP", url: "https://kdp.amazon.com" },
                { name: "Publisher Rocket", url: "https://publisherrocket.com" }
            ],
            tags: ["online", "passive", "writing", "scalable"],
            riskLevel: "niedrig",
            scalability: 5,
            passiveIncome: true,
            trend: "stabil",
            legalNote: "Steuerpflichtig ab ersten Einnahmen. W-8BEN Formular für US-Steuer."
        },
        {
            id: 13,
            title: "Stock Fotos & Videos verkaufen",
            category: "digital-products",
            difficulty: "leicht",
            income: "50-2000€/Monat",
            incomeMin: 50,
            incomeMax: 2000,
            investment: "0€ (Smartphone reicht)",
            timeNeeded: "5-10h/Woche",
            description: "Verkaufe Fotos und Videos auf Stock-Plattformen. Einmal hochladen, dauerhaft verdienen.",
            steps: [
                "Kamera oder Smartphone mit guter Kamera nutzen",
                "Gefragte Motive recherchieren",
                "Hochwertige Fotos/Videos aufnehmen",
                "Auf mehreren Plattformen hochladen",
                "Keywords optimieren für Auffindbarkeit"
            ],
            tools: ["Adobe Stock", "Shutterstock", "iStock", "Lightroom"],
            links: [
                { name: "Shutterstock Contributor", url: "https://submit.shutterstock.com" },
                { name: "Adobe Stock", url: "https://stock.adobe.com/contributor" }
            ],
            tags: ["online", "passive", "creative", "photography"],
            riskLevel: "niedrig",
            scalability: 4,
            passiveIncome: true,
            trend: "stabil",
            legalNote: "Gewerbeanmeldung. Model-Releases bei erkennbaren Personen nötig."
        },

        // ===== KATEGORIE: AFFILIATE & MARKETING =====
        {
            id: 14,
            title: "Affiliate Marketing Nischenseiten",
            category: "affiliate",
            difficulty: "mittel",
            income: "200-10000€/Monat",
            incomeMin: 200,
            incomeMax: 10000,
            investment: "50-200€",
            timeNeeded: "15-25h/Woche anfangs",
            description: "Erstelle Webseiten zu bestimmten Nischen und verdiene Provision durch Produktempfehlungen.",
            steps: [
                "Profitable Nische finden (Keyword Research)",
                "WordPress Website erstellen",
                "SEO-optimierte Artikel schreiben",
                "Affiliate Programme beitreten (Amazon, AWIN)",
                "Traffic über Google organisch aufbauen"
            ],
            tools: ["WordPress", "Ahrefs/Ubersuggest", "Amazon PartnerNet", "AWIN"],
            links: [
                { name: "Amazon PartnerNet", url: "https://partnernet.amazon.de" },
                { name: "AWIN", url: "https://www.awin.com" }
            ],
            tags: ["online", "passive", "seo", "scalable"],
            riskLevel: "niedrig",
            scalability: 5,
            passiveIncome: true,
            trend: "stabil",
            legalNote: "Impressum & Datenschutz Pflicht. Affiliate-Links kennzeichnen. Gewerbeanmeldung."
        },
        {
            id: 15,
            title: "Pinterest Affiliate Marketing",
            category: "affiliate",
            difficulty: "leicht",
            income: "100-3000€/Monat",
            incomeMin: 100,
            incomeMax: 3000,
            investment: "0€",
            timeNeeded: "5-10h/Woche",
            description: "Erstelle Pinterest Pins die zu Affiliate-Produkten verlinken. Pinterest funktioniert wie eine Suchmaschine!",
            steps: [
                "Pinterest Business Account erstellen",
                "Nische wählen (Home, Fashion, Fitness, Rezepte)",
                "Ansprechende Pins mit Canva erstellen",
                "Affiliate-Links direkt in Pins einbauen",
                "Konsistent pinnen (10-20 Pins/Tag mit Scheduler)"
            ],
            tools: ["Pinterest", "Canva", "Tailwind", "Amazon PartnerNet"],
            links: [
                { name: "Pinterest Business", url: "https://business.pinterest.com" },
                { name: "Tailwind", url: "https://www.tailwindapp.com" }
            ],
            tags: ["online", "passive", "social-media", "visual"],
            riskLevel: "niedrig",
            scalability: 4,
            passiveIncome: true,
            trend: "wachsend",
            legalNote: "Affiliate-Links kennzeichnen. Pinterest Richtlinien beachten."
        },

        // ===== KATEGORIE: TECH & PROGRAMMIERUNG =====
        {
            id: 16,
            title: "SaaS Micro-Tools entwickeln",
            category: "tech",
            difficulty: "schwer",
            income: "500-50000€/Monat",
            incomeMin: 500,
            incomeMax: 50000,
            investment: "0-100€",
            timeNeeded: "20-40h/Woche",
            description: "Entwickle kleine Software-Tools (SaaS) die ein spezifisches Problem lösen und verkaufe Abos.",
            steps: [
                "Problem identifizieren das Menschen haben",
                "MVP (Minimum Viable Product) entwickeln",
                "Beta-Tester finden",
                "Abo-Modell einrichten (Stripe)",
                "Wachstum durch Content Marketing & Product Hunt"
            ],
            tools: ["Next.js/React", "Vercel", "Stripe", "Supabase"],
            links: [
                { name: "Product Hunt", url: "https://www.producthunt.com" },
                { name: "Indie Hackers", url: "https://www.indiehackers.com" }
            ],
            tags: ["tech", "passive", "scalable", "saas"],
            riskLevel: "mittel",
            scalability: 5,
            passiveIncome: true,
            trend: "stark wachsend",
            legalNote: "UG/GmbH bei größerem Umsatz empfohlen. AGB & Datenschutz Pflicht."
        },
        {
            id: 17,
            title: "Chrome Extensions entwickeln",
            category: "tech",
            difficulty: "mittel",
            income: "100-5000€/Monat",
            incomeMin: 100,
            incomeMax: 5000,
            investment: "5€ (Chrome Web Store Fee)",
            timeNeeded: "20-40h Setup, wenig danach",
            description: "Entwickle Chrome Extensions und monetarisiere durch Premium-Features oder Werbung.",
            steps: [
                "Nützliches Tool/Feature identifizieren",
                "Extension mit HTML/CSS/JS entwickeln",
                "Im Chrome Web Store veröffentlichen",
                "Freemium-Modell oder Werbung einbauen",
                "Updates & Support bieten"
            ],
            tools: ["Chrome Extension API", "JavaScript", "Chrome Web Store"],
            links: [
                { name: "Chrome Extension Docs", url: "https://developer.chrome.com/docs/extensions" }
            ],
            tags: ["tech", "passive", "development"],
            riskLevel: "niedrig",
            scalability: 5,
            passiveIncome: true,
            trend: "wachsend",
            legalNote: "Chrome Web Store Developer Agreement beachten. Datenschutz-Richtlinien."
        },
        {
            id: 18,
            title: "WordPress Plugins/Themes",
            category: "tech",
            difficulty: "mittel",
            income: "200-10000€/Monat",
            incomeMin: 200,
            incomeMax: 10000,
            investment: "0-100€",
            timeNeeded: "30-60h Setup",
            description: "Entwickle WordPress Plugins oder Themes und verkaufe sie auf ThemeForest/CodeCanyon.",
            steps: [
                "Bedarf im WordPress-Ökosystem identifizieren",
                "Plugin oder Theme entwickeln",
                "Auf ThemeForest/CodeCanyon oder eigener Seite verkaufen",
                "Support & Updates bieten",
                "Durch gute Bewertungen wachsen"
            ],
            tools: ["WordPress", "PHP", "ThemeForest", "CodeCanyon"],
            links: [
                { name: "ThemeForest", url: "https://themeforest.net" },
                { name: "CodeCanyon", url: "https://codecanyon.net" }
            ],
            tags: ["tech", "passive", "development", "scalable"],
            riskLevel: "niedrig",
            scalability: 5,
            passiveIncome: true,
            trend: "stabil",
            legalNote: "Gewerbeanmeldung. GPL-Lizenz bei WordPress beachten."
        },
        {
            id: 19,
            title: "Bug Bounty Programme",
            category: "tech",
            difficulty: "schwer",
            income: "100-50000€/Bug",
            incomeMin: 100,
            incomeMax: 50000,
            investment: "0€",
            timeNeeded: "variabel",
            description: "Finde Sicherheitslücken in Websites & Apps und werde von Unternehmen dafür bezahlt.",
            steps: [
                "Web Security Grundlagen lernen",
                "Übungsplattformen nutzen (HackTheBox, TryHackMe)",
                "Auf Bug Bounty Plattformen registrieren",
                "Systematisch nach Vulnerabilities suchen",
                "Professionelle Reports schreiben"
            ],
            tools: ["Burp Suite", "OWASP ZAP", "HackerOne", "Bugcrowd"],
            links: [
                { name: "HackerOne", url: "https://www.hackerone.com" },
                { name: "Bugcrowd", url: "https://www.bugcrowd.com" }
            ],
            tags: ["tech", "security", "high-reward"],
            riskLevel: "niedrig",
            scalability: 3,
            passiveIncome: false,
            trend: "stark wachsend",
            legalNote: "NUR auf autorisierten Plattformen mit Permission! Unauthorized hacking ist strafbar."
        },

        // ===== KATEGORIE: FINANCE & INVESTING =====
        {
            id: 20,
            title: "Cashback & Signup Bonus Stacking",
            category: "finance",
            difficulty: "leicht",
            income: "50-500€/Monat",
            incomeMin: 50,
            incomeMax: 500,
            investment: "0€",
            timeNeeded: "2-5h/Woche",
            description: "Maximiere Cashback-Angebote, Signup-Boni und Prämien von Banken & Apps.",
            steps: [
                "Cashback-Apps installieren (Shoop, iGraal, TopCashback)",
                "Bank-Kontowechsel-Prämien nutzen",
                "Kreditkarten mit Cashback verwenden",
                "Bonusprogramme kombinieren",
                "Systematisch neue Angebote nutzen"
            ],
            tools: ["Shoop", "iGraal", "TopCashback", "Check24"],
            links: [
                { name: "Shoop", url: "https://www.shoop.de" },
                { name: "TopCashback", url: "https://www.topcashback.de" }
            ],
            tags: ["finance", "easy", "no-investment"],
            riskLevel: "niedrig",
            scalability: 1,
            passiveIncome: false,
            trend: "stabil",
            legalNote: "100% legal. Bonusbedingungen genau lesen. Kontogebühren beachten."
        },
        {
            id: 21,
            title: "P2P Lending (Kreditmarktplätze)",
            category: "finance",
            difficulty: "leicht",
            income: "5-12% Rendite p.a.",
            incomeMin: 50,
            incomeMax: 2000,
            investment: "100-10000€",
            timeNeeded: "1-2h/Monat",
            description: "Verleihe Geld über P2P-Plattformen an Kreditnehmer und erhalte Zinsen.",
            steps: [
                "P2P-Plattform wählen (Mintos, Bondora, EstateGuru)",
                "Konto erstellen und verifizieren",
                "Auto-Invest konfigurieren",
                "Diversifiziert investieren (mind. 100 Kredite)",
                "Zinsen reinvestieren (Zinseszinseffekt)"
            ],
            tools: ["Mintos", "Bondora", "EstateGuru", "Portfolio Performance"],
            links: [
                { name: "Mintos", url: "https://www.mintos.com" },
                { name: "Bondora", url: "https://www.bondora.com" }
            ],
            tags: ["finance", "passive", "investing"],
            riskLevel: "mittel",
            scalability: 4,
            passiveIncome: true,
            trend: "stabil",
            legalNote: "Kapitalerträge versteuern (25% Abgeltungssteuer). Totalverlust möglich."
        },
        {
            id: 22,
            title: "Steuererklärung Optimierung",
            category: "finance",
            difficulty: "leicht",
            income: "500-2000€/Jahr Ersparnis",
            incomeMin: 500,
            incomeMax: 2000,
            investment: "0-35€",
            timeNeeded: "3-5h einmalig",
            description: "Maximiere deine Steuererstattung - die meisten verschenken 1.000€+ pro Jahr!",
            steps: [
                "Steuer-Software nutzen (WISO, Taxfix)",
                "Alle Werbungskosten sammeln",
                "Homeoffice-Pauschale nutzen",
                "Handwerkerkosten & haushaltsnahe Dienstleistungen absetzen",
                "Sonderausgaben nicht vergessen"
            ],
            tools: ["WISO Steuer", "Taxfix", "Elster"],
            links: [
                { name: "Taxfix", url: "https://taxfix.de" },
                { name: "WISO Steuer", url: "https://www.buhl.de/produkte/wiso-steuer" }
            ],
            tags: ["finance", "saving", "tax"],
            riskLevel: "niedrig",
            scalability: 1,
            passiveIncome: false,
            trend: "stabil",
            legalNote: "100% legal! Steuererklärung ist dein Recht. Falsche Angaben sind strafbar."
        },

        // ===== KATEGORIE: AI & AUTOMATION =====
        {
            id: 23,
            title: "KI-Automation Agentur",
            category: "ai",
            difficulty: "mittel",
            income: "2000-20000€/Monat",
            incomeMin: 2000,
            incomeMax: 20000,
            investment: "0-200€",
            timeNeeded: "15-30h/Woche",
            description: "Biete Unternehmen KI-Automatisierungen an (Chatbots, Workflow-Automation, KI-Integration).",
            steps: [
                "KI-Tools & APIs beherrschen (OpenAI, Make, Zapier)",
                "Paket-Angebote schnüren",
                "Lokale Unternehmen ansprechen",
                "Automatisierungen implementieren",
                "Monatliche Wartungsverträge abschließen"
            ],
            tools: ["Make.com", "Zapier", "OpenAI API", "Voiceflow"],
            links: [
                { name: "Make.com", url: "https://make.com" },
                { name: "Zapier", url: "https://zapier.com" }
            ],
            tags: ["ai", "service", "scalable", "high-income"],
            riskLevel: "niedrig",
            scalability: 5,
            passiveIncome: false,
            trend: "stark wachsend",
            legalNote: "Gewerbeanmeldung. Datenschutz bei KI-Integration besonders wichtig."
        },
        {
            id: 24,
            title: "KI-generierte Printables (Etsy)",
            category: "ai",
            difficulty: "leicht",
            income: "200-5000€/Monat",
            incomeMin: 200,
            incomeMax: 5000,
            investment: "15€ (Etsy Gebühren)",
            timeNeeded: "10-15h Setup, 3-5h/Woche",
            description: "Erstelle mit KI Ausmalbilder, Planer, Wall Art und verkaufe als digitale Downloads auf Etsy.",
            steps: [
                "Trending Printables auf Etsy recherchieren",
                "Mit Midjourney/DALL-E Designs erstellen",
                "Produkte als PDF/PNG aufbereiten",
                "Auf Etsy listen mit SEO-optimierten Titeln",
                "Pinterest Marketing für Traffic"
            ],
            tools: ["Midjourney", "Canva", "Etsy", "Pinterest"],
            links: [
                { name: "Etsy Seller", url: "https://www.etsy.com/sell" },
                { name: "Midjourney", url: "https://www.midjourney.com" }
            ],
            tags: ["ai", "passive", "digital", "creative"],
            riskLevel: "niedrig",
            scalability: 5,
            passiveIncome: true,
            trend: "stark wachsend",
            legalNote: "Gewerbeanmeldung. Urheberrecht bei KI-Bildern beachten. Etsy Richtlinien befolgen."
        },

        // ===== KATEGORIE: SURVEYS & MICRO TASKS =====
        {
            id: 25,
            title: "User Testing (Websites testen)",
            category: "micro-tasks",
            difficulty: "leicht",
            income: "50-500€/Monat",
            incomeMin: 50,
            incomeMax: 500,
            investment: "0€",
            timeNeeded: "3-10h/Woche",
            description: "Teste Websites & Apps und werde für dein Feedback bezahlt (10-60€ pro Test).",
            steps: [
                "Auf Testing-Plattformen registrieren",
                "Profil vervollständigen",
                "Qualifikationstests bestehen",
                "Tests durchführen & laut denken",
                "Feedback abgeben"
            ],
            tools: ["UserTesting", "TryMyUI", "Userlytics", "TestingTime"],
            links: [
                { name: "UserTesting", url: "https://www.usertesting.com" },
                { name: "TestingTime", url: "https://www.testingtime.com" }
            ],
            tags: ["easy", "quick-start", "no-investment"],
            riskLevel: "niedrig",
            scalability: 1,
            passiveIncome: false,
            trend: "stabil",
            legalNote: "Einkünfte ab Freibetrag steuerpflichtig."
        },
        {
            id: 26,
            title: "Daten-Labeling für KI",
            category: "micro-tasks",
            difficulty: "leicht",
            income: "100-1000€/Monat",
            incomeMin: 100,
            incomeMax: 1000,
            investment: "0€",
            timeNeeded: "5-20h/Woche",
            description: "Helfe KI-Unternehmen Trainingsdaten zu labeln - Bilder markieren, Texte bewerten, etc.",
            steps: [
                "Auf Plattformen registrieren (Remotasks, Scale AI)",
                "Qualifikationstests bestehen",
                "Aufgaben bearbeiten (Bilder labeln, Texte bewerten)",
                "Genauigkeit hoch halten",
                "Höher bezahlte Aufgaben freischalten"
            ],
            tools: ["Remotasks", "Scale AI", "Appen", "Clickworker"],
            links: [
                { name: "Remotasks", url: "https://www.remotasks.com" },
                { name: "Clickworker", url: "https://www.clickworker.de" }
            ],
            tags: ["easy", "ai", "remote"],
            riskLevel: "niedrig",
            scalability: 2,
            passiveIncome: false,
            trend: "stark wachsend",
            legalNote: "Einkünfte versteuern. Plattform-AGBs beachten."
        },

        // ===== KATEGORIE: PRINT ON DEMAND =====
        {
            id: 27,
            title: "Print on Demand (Merch by Amazon)",
            category: "print-on-demand",
            difficulty: "leicht",
            income: "100-5000€/Monat",
            incomeMin: 100,
            incomeMax: 5000,
            investment: "0€",
            timeNeeded: "5-15h/Woche",
            description: "Designe T-Shirts, Hoodies, etc. Amazon druckt und versendet. Du kassierst Royalties.",
            steps: [
                "Bei Merch by Amazon bewerben (Warteliste)",
                "Nischen-Designs recherchieren",
                "Designs mit Canva/Photoshop erstellen",
                "Listings mit guten Keywords erstellen",
                "Skalieren durch mehr Designs hochladen"
            ],
            tools: ["Canva", "Merch by Amazon", "Spreadshirt", "Redbubble"],
            links: [
                { name: "Merch by Amazon", url: "https://merch.amazon.com" },
                { name: "Redbubble", url: "https://www.redbubble.com" }
            ],
            tags: ["passive", "creative", "scalable", "no-investment"],
            riskLevel: "niedrig",
            scalability: 5,
            passiveIncome: true,
            trend: "stabil",
            legalNote: "Markenrechtsverletzungen vermeiden! Gewerbeanmeldung bei Einnahmen."
        },

        // ===== KATEGORIE: COMMUNITY & COACHING =====
        {
            id: 28,
            title: "Paid Community / Membership",
            category: "community",
            difficulty: "mittel",
            income: "500-20000€/Monat",
            incomeMin: 500,
            incomeMax: 20000,
            investment: "0-50€",
            timeNeeded: "10-20h/Woche",
            description: "Baue eine bezahlte Community auf zu deinem Expertise-Thema.",
            steps: [
                "Expertise-Thema definieren",
                "Kostenlose Community aufbauen (Discord, Telegram)",
                "Mehrwert liefern (exklusive Inhalte, Calls, Networking)",
                "Premium-Bereich mit Abo-Modell starten",
                "Community-Events und Masterminds organisieren"
            ],
            tools: ["Skool", "Discord", "Circle", "Patreon"],
            links: [
                { name: "Skool", url: "https://www.skool.com" },
                { name: "Patreon", url: "https://www.patreon.com" }
            ],
            tags: ["community", "recurring", "scalable"],
            riskLevel: "niedrig",
            scalability: 5,
            passiveIncome: true,
            trend: "stark wachsend",
            legalNote: "Gewerbeanmeldung. AGB für Mitgliedschaft. Widerrufsrecht beachten."
        },
        {
            id: 29,
            title: "Online Coaching / Beratung",
            category: "community",
            difficulty: "mittel",
            income: "1000-10000€/Monat",
            incomeMin: 1000,
            incomeMax: 10000,
            investment: "0€",
            timeNeeded: "10-25h/Woche",
            description: "Biete 1:1 oder Gruppen-Coaching in deinem Fachgebiet an.",
            steps: [
                "Coaching-Nische definieren",
                "Framework/Methodik entwickeln",
                "Webseite mit Buchungssystem erstellen",
                "Erste Kunden über Social Media/Netzwerk gewinnen",
                "Testimonials sammeln und skalieren"
            ],
            tools: ["Calendly", "Zoom", "Notion", "Stripe"],
            links: [
                { name: "Calendly", url: "https://calendly.com" },
                { name: "Zoom", url: "https://zoom.us" }
            ],
            tags: ["service", "high-income", "personal"],
            riskLevel: "niedrig",
            scalability: 3,
            passiveIncome: false,
            trend: "wachsend",
            legalNote: "Coaching ist freiberuflich (oft keine Gewerbeanmeldung nötig). Haftungsausschluss empfohlen."
        },

        // ===== KATEGORIE: IMMOBILIEN =====
        {
            id: 30,
            title: "Airbnb Arbitrage",
            category: "realestate",
            difficulty: "mittel",
            income: "500-5000€/Monat pro Objekt",
            incomeMin: 500,
            incomeMax: 5000,
            investment: "500-3000€",
            timeNeeded: "10-20h/Woche",
            description: "Miete Wohnungen langfristig und untervermiete sie auf Airbnb mit Gewinn.",
            steps: [
                "Marktanalyse: Wo ist Airbnb profitabel?",
                "Vermieter um Erlaubnis bitten (wichtig!)",
                "Wohnung ansprechend einrichten",
                "Listing auf Airbnb erstellen",
                "Automatisierung (Reinigung, Check-in)"
            ],
            tools: ["Airbnb", "AirDNA", "Guesty", "PriceLabs"],
            links: [
                { name: "Airbnb Hosting", url: "https://www.airbnb.de/host" },
                { name: "AirDNA", url: "https://www.airdna.co" }
            ],
            tags: ["realestate", "service", "scalable"],
            riskLevel: "mittel",
            scalability: 4,
            passiveIncome: false,
            trend: "stabil",
            legalNote: "Untervermietung NUR mit Vermieter-Genehmigung! Lokale Vorschriften & Zweckentfremdungsverbot beachten!"
        }
    ],

    // ====== SCANNING SIMULATION CONFIG ======
    scanPhrases: [
        "🔍 Scanne Online-Marktplätze...",
        "📊 Analysiere aktuelle Trends...",
        "🌐 Durchsuche Freelancing-Plattformen...",
        "💡 Identifiziere Arbitrage-Möglichkeiten...",
        "📈 Prüfe digitale Produkt-Nachfrage...",
        "🤖 Analysiere KI-basierte Möglichkeiten...",
        "🔗 Scanne Affiliate-Netzwerke...",
        "🏠 Prüfe Immobilien-Opportunitäten...",
        "💰 Berechne Verdienstpotentiale...",
        "🛡️ Verifiziere Legalität...",
        "📋 Erstelle personalisierte Empfehlungen...",
        "✅ Finalisiere Ergebnisse..."
    ],

    // ====== USER PROFILE QUESTIONS ======
    profileQuestions: [
        {
            id: 'time',
            question: '⏰ Wie viel Zeit hast du pro Woche?',
            options: [
                { label: '< 5 Stunden', value: 'minimal' },
                { label: '5-10 Stunden', value: 'part-time' },
                { label: '10-20 Stunden', value: 'significant' },
                { label: '20+ Stunden', value: 'full-time' }
            ]
        },
        {
            id: 'budget',
            question: '💶 Wie viel kannst du investieren?',
            options: [
                { label: '0€ - Nichts', value: 'zero' },
                { label: '1-100€', value: 'low' },
                { label: '100-500€', value: 'medium' },
                { label: '500€+', value: 'high' }
            ]
        },
        {
            id: 'skills',
            question: '🧠 Was sind deine stärksten Fähigkeiten?',
            options: [
                { label: '✍️ Schreiben & Kommunikation', value: 'writing' },
                { label: '💻 Technik & Programmierung', value: 'tech' },
                { label: '🎨 Kreativität & Design', value: 'creative' },
                { label: '📊 Analyse & Zahlen', value: 'analytical' },
                { label: '🗣️ Verkaufen & Marketing', value: 'sales' },
                { label: '📚 Keine besonderen', value: 'none' }
            ]
        },
        {
            id: 'goal',
            question: '🎯 Was ist dein Hauptziel?',
            options: [
                { label: '💸 Schnelles Geld (sofort)', value: 'quick' },
                { label: '📈 Nebeneinkommen aufbauen', value: 'side' },
                { label: '🏖️ Passives Einkommen', value: 'passive' },
                { label: '🚀 Eigenes Business starten', value: 'business' }
            ]
        },
        {
            id: 'risk',
            question: '⚖️ Wie risikobereit bist du?',
            options: [
                { label: '🛡️ Kein Risiko', value: 'none' },
                { label: '📊 Geringes Risiko', value: 'low' },
                { label: '⚡ Mittleres Risiko', value: 'medium' },
                { label: '🔥 Hohes Risiko ok', value: 'high' }
            ]
        }
    ],

    // ====== STATE ======
    currentProfileStep: 0,
    userProfile: {},
    scanResults: [],
    isScanning: false,
    currentFilter: 'all',

    // ====== INIT ======
    init() {
        this.renderMainButton();
        this.renderOpportunitySection();
    },

    // ====== RENDER MAIN BUTTON ======
    renderMainButton() {
        // Button wird in der HTML Sektion eingefügt
    },

    // ====== START SCAN ======
    startScan() {
        const container = document.getElementById('opportunityFinderContent');
        if (!container) return;

        this.currentProfileStep = 0;
        this.userProfile = {};
        this.showProfileQuestion(container);
    },

    // ====== PROFILE QUESTIONS ======
    showProfileQuestion(container) {
        if (this.currentProfileStep >= this.profileQuestions.length) {
            this.runScan(container);
            return;
        }

        const q = this.profileQuestions[this.currentProfileStep];
        const progress = ((this.currentProfileStep) / this.profileQuestions.length * 100).toFixed(0);

        container.innerHTML = `
            <div class="finder-profile">
                <div class="finder-progress">
                    <div class="finder-progress-bar" style="width: ${progress}%"></div>
                </div>
                <div class="finder-progress-text">Schritt ${this.currentProfileStep + 1} von ${this.profileQuestions.length}</div>
                <h3 class="finder-question">${q.question}</h3>
                <div class="finder-options">
                    ${q.options.map(opt => `
                        <button class="finder-option-btn" onclick="OpportunityFinder.selectOption('${q.id}', '${opt.value}')">
                            ${opt.label}
                        </button>
                    `).join('')}
                </div>
            </div>
        `;
    },

    selectOption(questionId, value) {
        this.userProfile[questionId] = value;
        this.currentProfileStep++;
        const container = document.getElementById('opportunityFinderContent');
        
        // Animate transition
        container.style.opacity = '0';
        setTimeout(() => {
            this.showProfileQuestion(container);
            container.style.opacity = '1';
        }, 200);
    },

    // ====== RUN SCAN ======
    async runScan(container) {
        this.isScanning = true;

        container.innerHTML = `
            <div class="finder-scanning">
                <div class="finder-radar">
                    <div class="radar-circle"></div>
                    <div class="radar-circle delayed"></div>
                    <div class="radar-circle delayed2"></div>
                    <div class="radar-dot">💰</div>
                </div>
                <h3 class="scan-title">Scanne das Internet...</h3>
                <p class="scan-status" id="scanStatus">${this.scanPhrases[0]}</p>
                <div class="scan-progress-container">
                    <div class="scan-progress-bar" id="scanProgressBar"></div>
                </div>
                <div class="scan-found" id="scanFound">
                    <span class="found-count" id="foundCount">0</span> Möglichkeiten gefunden
                </div>
            </div>
        `;

        // Animate scan
        const statusEl = document.getElementById('scanStatus');
        const progressBar = document.getElementById('scanProgressBar');
        const foundCount = document.getElementById('foundCount');
        
        let found = 0;

        for (let i = 0; i < this.scanPhrases.length; i++) {
            await this.delay(600 + Math.random() * 400);
            if (statusEl) statusEl.textContent = this.scanPhrases[i];
            if (progressBar) progressBar.style.width = ((i + 1) / this.scanPhrases.length * 100) + '%';
            
            const newFound = Math.floor(Math.random() * 4) + 1;
            found += newFound;
            if (foundCount) foundCount.textContent = found;
        }

        await this.delay(800);
        this.showResults(container);
    },

    delay(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
    },

    // ====== SCORE & FILTER RESULTS ======
    scoreOpportunity(opp) {
        let score = 50;
        const profile = this.userProfile;

        // Time match
        if (profile.time === 'minimal' && opp.timeNeeded.includes('5h') || opp.timeNeeded.includes('2-5')) score += 15;
        if (profile.time === 'full-time' && opp.difficulty === 'schwer') score += 10;
        if (profile.time === 'minimal' && opp.difficulty === 'schwer') score -= 20;

        // Budget match
        if (profile.budget === 'zero' && opp.investment.startsWith('0')) score += 20;
        if (profile.budget === 'zero' && !opp.investment.includes('0€')) score -= 15;

        // Skills match
        if (profile.skills === 'tech' && opp.category === 'tech') score += 25;
        if (profile.skills === 'writing' && ['content', 'affiliate'].includes(opp.category)) score += 25;
        if (profile.skills === 'creative' && ['digital-products', 'content', 'print-on-demand'].includes(opp.category)) score += 25;
        if (profile.skills === 'analytical' && ['finance', 'arbitrage'].includes(opp.category)) score += 25;
        if (profile.skills === 'sales' && ['community', 'affiliate'].includes(opp.category)) score += 25;
        if (profile.skills === 'none' && opp.difficulty === 'leicht') score += 15;

        // Goal match
        if (profile.goal === 'quick' && opp.difficulty === 'leicht') score += 15;
        if (profile.goal === 'passive' && opp.passiveIncome) score += 25;
        if (profile.goal === 'business' && opp.scalability >= 4) score += 20;
        if (profile.goal === 'side' && opp.difficulty !== 'schwer') score += 10;

        // Risk match
        if (profile.risk === 'none' && opp.riskLevel === 'niedrig') score += 15;
        if (profile.risk === 'none' && opp.riskLevel === 'mittel') score -= 10;
        if (profile.risk === 'high' && opp.incomeMax > 5000) score += 10;

        // Trend bonus
        if (opp.trend === 'stark wachsend') score += 10;
        if (opp.trend === 'wachsend') score += 5;

        // Passive income bonus
        if (opp.passiveIncome) score += 5;

        return Math.max(0, Math.min(100, score));
    },

    // ====== SHOW RESULTS ======
    showResults(container) {
        this.isScanning = false;

        // Score all opportunities
        this.scanResults = this.opportunities.map(opp => ({
            ...opp,
            matchScore: this.scoreOpportunity(opp)
        })).sort((a, b) => b.matchScore - a.matchScore);

        const topResults = this.scanResults.slice(0, 5);
        const allResults = this.scanResults;

        container.innerHTML = `
            <div class="finder-results">
                <!-- Results Header -->
                <div class="results-header">
                    <div class="results-icon">🎯</div>
                    <h3>${allResults.length} legale Möglichkeiten gefunden!</h3>
                    <p>Basierend auf deinem Profil sortiert nach Eignung</p>
                </div>

                <!-- Top Matches -->
                <div class="top-matches">
                    <h4>⭐ Deine Top 5 Empfehlungen</h4>
                    ${topResults.map((opp, i) => this.renderOpportunityCard(opp, i, true)).join('')}
                </div>

                <!-- Filter Bar -->
                <div class="results-filter-bar">
                    <h4>Alle Möglichkeiten</h4>
                    <div class="results-filters">
                        <button class="results-filter active" onclick="OpportunityFinder.filterResults('all')" data-filter="all">Alle</button>
                        <button class="results-filter" onclick="OpportunityFinder.filterResults('passive')" data-filter="passive">Passiv</button>
                        <button class="results-filter" onclick="OpportunityFinder.filterResults('easy')" data-filter="easy">Einfach</button>
                        <button class="results-filter" onclick="OpportunityFinder.filterResults('high-income')" data-filter="high-income">Top Verdienst</button>
                        <button class="results-filter" onclick="OpportunityFinder.filterResults('no-invest')" data-filter="no-invest">0€ Start</button>
                        <button class="results-filter" onclick="OpportunityFinder.filterResults('trending')" data-filter="trending">Trending</button>
                    </div>
                </div>

                <!-- All Results -->
                <div class="all-results" id="allResultsList">
                    ${allResults.map((opp, i) => this.renderOpportunityCard(opp, i, false)).join('')}
                </div>

                <!-- Rescan Button -->
                <button class="btn btn-outline full-width" onclick="OpportunityFinder.startScan()" style="margin-top:15px">
                    🔄 Neuen Scan starten
                </button>

                <!-- Legal Disclaimer -->
                <div class="legal-disclaimer">
                    <i class="fas fa-shield-alt"></i>
                    <p><strong>Rechtlicher Hinweis:</strong> Alle gezeigten Möglichkeiten sind legal. 
                    Beachte steuerliche Pflichten und melde ggf. ein Gewerbe an. 
                    Dies ist keine Steuer- oder Rechtsberatung. Informiere dich bei Bedarf bei einem Steuerberater.</p>
                </div>
            </div>
        `;
    },

    // ====== RENDER OPPORTUNITY CARD ======
    renderOpportunityCard(opp, index, isTop) {
        const matchColor = opp.matchScore >= 75 ? '#00B894' : opp.matchScore >= 50 ? '#FDCB6E' : '#FF7675';
        const difficultyColor = { leicht: '#00B894', mittel: '#FDCB6E', schwer: '#FF7675' };
        const riskColor = { niedrig: '#00B894', mittel: '#FDCB6E', hoch: '#FF7675' };
        const trendEmoji = { 'stark wachsend': '🚀', 'wachsend': '📈', 'stabil': '➡️' };

        return `
            <div class="opportunity-card ${isTop ? 'top-match' : ''}" 
                 data-category="${opp.category}"
                 data-passive="${opp.passiveIncome}"
                 data-difficulty="${opp.difficulty}"
                 data-income-max="${opp.incomeMax}"
                 data-investment="${opp.investment}"
                 data-trend="${opp.trend}"
                 onclick="OpportunityFinder.showDetail(${opp.id})">
                
                ${isTop && index === 0 ? '<div class="best-match-badge">🏆 Beste Übereinstimmung</div>' : ''}
                
                <div class="opp-card-header">
                    <div class="opp-card-left">
                        <h4>${opp.title}</h4>
                        <p class="opp-card-desc">${opp.description.substring(0, 80)}...</p>
                    </div>
                    <div class="opp-match-score" style="border-color: ${matchColor}; color: ${matchColor}">
                        ${opp.matchScore}%
                    </div>
                </div>

                <div class="opp-card-tags">
                    <span class="opp-tag income">💰 ${opp.income}</span>
                    <span class="opp-tag" style="background:${difficultyColor[opp.difficulty]}22;color:${difficultyColor[opp.difficulty]}">
                        ${opp.difficulty}
                    </span>
                    <span class="opp-tag">${trendEmoji[opp.trend] || ''} ${opp.trend}</span>
                    ${opp.passiveIncome ? '<span class="opp-tag passive">🔄 Passiv</span>' : ''}
                </div>

                <div class="opp-card-footer">
                    <span>💶 Start: ${opp.investment}</span>
                    <span>⏰ ${opp.timeNeeded}</span>
                    <span style="color:${riskColor[opp.riskLevel]}">⚖️ Risiko: ${opp.riskLevel}</span>
                </div>
            </div>
        `;
    },

    // ====== FILTER RESULTS ======
    filterResults(filter) {
        this.currentFilter = filter;
        
        // Update active button
        document.querySelectorAll('.results-filter').forEach(btn => {
            btn.classList.toggle('active', btn.dataset.filter === filter);
        });

        const cards = document.querySelectorAll('.all-results .opportunity-card');
        cards.forEach(card => {
            let show = true;

            switch (filter) {
                case 'passive':
                    show = card.dataset.passive === 'true';
                    break;
                case 'easy':
                    show = card.dataset.difficulty === 'leicht';
                    break;
                case 'high-income':
                    show = parseInt(card.dataset.incomeMax) >= 5000;
                    break;
                case 'no-invest':
                    show = card.dataset.investment.includes('0€') || card.dataset.investment.startsWith('0');
                    break;
                case 'trending':
                    show = card.dataset.trend.includes('wachsend');
                    break;
                default:
                    show = true;
            }

            card.style.display = show ? '' : 'none';
        });
    },

    // ====== SHOW DETAIL ======
    showDetail(id) {
        const opp = this.opportunities.find(o => o.id === id);
        if (!opp) return;

        const matchScore = this.scoreOpportunity(opp);
        const matchColor = matchScore >= 75 ? '#00B894' : matchScore >= 50 ? '#FDCB6E' : '#FF7675';

        document.getElementById('infoModalTitle').textContent = '💎 ' + opp.title;
        document.getElementById('infoModalBody').innerHTML = `
            <div class="opp-detail">
                <!-- Match Score -->
                <div class="opp-detail-match" style="border-color:${matchColor}">
                    <div class="opp-detail-match-score" style="color:${matchColor}">${matchScore}%</div>
                    <span>Übereinstimmung mit deinem Profil</span>
                </div>

                <!-- Overview -->
                <div class="opp-detail-overview">
                    <div class="opp-detail-stat">
                        <span class="opp-stat-label">Verdienst</span>
                        <span class="opp-stat-value green">${opp.income}</span>
                    </div>
                    <div class="opp-detail-stat">
                        <span class="opp-stat-label">Startkapital</span>
                        <span class="opp-stat-value">${opp.investment}</span>
                    </div>
                    <div class="opp-detail-stat">
                        <span class="opp-stat-label">Zeitaufwand</span>
                        <span class="opp-stat-value">${opp.timeNeeded}</span>
                    </div>
                    <div class="opp-detail-stat">
                        <span class="opp-stat-label">Schwierigkeit</span>
                        <span class="opp-stat-value">${opp.difficulty}</span>
                    </div>
                    <div class="opp-detail-stat">
                        <span class="opp-stat-label">Skalierbarkeit</span>
                        <span class="opp-stat-value">${'⭐'.repeat(opp.scalability)}</span>
                    </div>
                    <div class="opp-detail-stat">
                        <span class="opp-stat-label">Passiv?</span>
                        <span class="opp-stat-value">${opp.passiveIncome ? '✅ Ja' : '❌ Nein'}</span>
                    </div>
                </div>

                <!-- Description -->
                <div class="opp-detail-section">
                    <h4>📋 Beschreibung</h4>
                    <p>${opp.description}</p>
                </div>

                <!-- Steps -->
                <div class="opp-detail-section">
                    <h4>📝 Schritt-für-Schritt Anleitung</h4>
                    <ol class="opp-steps">
                        ${opp.steps.map(step => `<li>${step}</li>`).join('')}
                    </ol>
                </div>

                <!-- Tools -->
                <div class="opp-detail-section">
                    <h4>🛠️ Empfohlene Tools</h4>
                    <div class="opp-tools">
                        ${opp.tools.map(tool => `<span class="opp-tool-tag">${tool}</span>`).join('')}
                    </div>
                </div>

                <!-- Links -->
                <div class="opp-detail-section">
                    <h4>🔗 Nützliche Links</h4>
                    <div class="opp-links">
                        ${opp.links.map(link => `
                            <a href="${link.url}" target="_blank" rel="noopener" class="opp-link">
                                <i class="fas fa-external-link-alt"></i> ${link.name}
                            </a>
                        `).join('')}
                    </div>
                </div>

                <!-- Legal Note -->
                <div class="opp-detail-legal">
                    <i class="fas fa-gavel"></i>
                    <div>
                        <strong>Rechtlicher Hinweis:</strong>
                        <p>${opp.legalNote}</p>
                    </div>
                </div>

                <!-- Action Buttons -->
                <div class="opp-detail-actions">
                    <button class="btn btn-primary full-width" onclick="OpportunityFinder.saveOpportunity(${opp.id})">
                        <i class="fas fa-bookmark"></i> Merken & Später starten
                    </button>
                    <button class="btn btn-outline full-width" onclick="OpportunityFinder.shareOpportunity(${opp.id})">
                        <i class="fas fa-share-alt"></i> Teilen
                    </button>
                </div>
            </div>
        `;
        openModal('infoModal');
    },

    // ====== SAVE OPPORTUNITY ======
    saveOpportunity(id) {
        if (!appData.savedOpportunities) appData.savedOpportunities = [];
        
        if (!appData.savedOpportunities.includes(id)) {
            appData.savedOpportunities.push(id);
            saveData();
            showToast('✅ Möglichkeit gespeichert!');
        } else {
            showToast('Bereits gespeichert!');
        }
    },

    // ====== SHARE ======
    shareOpportunity(id) {
        const opp = this.opportunities.find(o => o.id === id);
        if (!opp) return;

        const text = `💰 ${opp.title}\n${opp.description}\nVerdienst: ${opp.income}\n\nGefunden mit WealthBuilder Pro`;
        
        if (navigator.share) {
            navigator.share({ title: opp.title, text: text });
        } else {
            navigator.clipboard.writeText(text).then(() => {
                showToast('📋 In Zwischenablage kopiert!');
            });
        }
    },

    // ====== RENDER SECTION ======
    renderOpportunitySection() {
        // This adds the saved opportunities to the dashboard if any
        if (appData.savedOpportunities && appData.savedOpportunities.length > 0) {
            this.renderSavedOpportunities();
        }
    },

    renderSavedOpportunities() {
        const saved = appData.savedOpportunities || [];
        if (saved.length === 0) return;

        const container = document.getElementById('savedOpportunitiesList');
        if (!container) return;

        container.innerHTML = saved.map(id => {
            const opp = this.opportunities.find(o => o.id === id);
            if (!opp) return '';
            return `
                <div class="transaction-item" onclick="OpportunityFinder.showDetail(${opp.id})">
                    <div class="transaction-icon" style="background: rgba(108,92,231,0.15)">💎</div>
                    <div class="transaction-info">
                        <div class="transaction-desc">${opp.title}</div>
                        <div class="transaction-date">${opp.income} • ${opp.difficulty}</div>
                    </div>
                    <button class="transaction-delete" onclick="event.stopPropagation();OpportunityFinder.removeSaved(${opp.id})">
                        <i class="fas fa-times"></i>
                    </button>
                </div>
            `;
        }).join('');
    },

    removeSaved(id) {
        appData.savedOpportunities = (appData.savedOpportunities || []).filter(i => i !== id);
        saveData();
        this.renderSavedOpportunities();
        showToast('Entfernt');
    }
};