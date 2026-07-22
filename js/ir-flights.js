// ================================================
// ✈️ IR - Intelligente Reise-KI
// Findet die günstigsten Flüge weltweit
// Spezialisiert auf TOGO (LFW/Lomé)
// ================================================

const IR = {
    name: "IR",
    version: "2.0",

    // ====== AIRLINE & AIRPORT DATABASE ======
    airports: {
        // TOGO
        'LFW': { city: 'Lomé', country: 'Togo', region: 'africa', iata: 'LFW', name: 'Gnassingbé Eyadéma Intl.' },
        // Deutschland
        'FRA': { city: 'Frankfurt', country: 'Deutschland', region: 'europe', iata: 'FRA', name: 'Frankfurt Airport' },
        'MUC': { city: 'München', country: 'Deutschland', region: 'europe', iata: 'MUC', name: 'Munich Airport' },
        'BER': { city: 'Berlin', country: 'Deutschland', region: 'europe', iata: 'BER', name: 'Berlin Brandenburg' },
        'DUS': { city: 'Düsseldorf', country: 'Deutschland', region: 'europe', iata: 'DUS', name: 'Düsseldorf Airport' },
        'HAM': { city: 'Hamburg', country: 'Deutschland', region: 'europe', iata: 'HAM', name: 'Hamburg Airport' },
        'CGN': { city: 'Köln', country: 'Deutschland', region: 'europe', iata: 'CGN', name: 'Köln/Bonn Airport' },
        'STR': { city: 'Stuttgart', country: 'Deutschland', region: 'europe', iata: 'STR', name: 'Stuttgart Airport' },
        // Europa
        'CDG': { city: 'Paris', country: 'Frankreich', region: 'europe', iata: 'CDG', name: 'Charles de Gaulle' },
        'LHR': { city: 'London', country: 'UK', region: 'europe', iata: 'LHR', name: 'Heathrow' },
        'AMS': { city: 'Amsterdam', country: 'Niederlande', region: 'europe', iata: 'AMS', name: 'Schiphol' },
        'IST': { city: 'Istanbul', country: 'Türkei', region: 'europe', iata: 'IST', name: 'Istanbul Airport' },
        'BCN': { city: 'Barcelona', country: 'Spanien', region: 'europe', iata: 'BCN', name: 'El Prat' },
        'FCO': { city: 'Rom', country: 'Italien', region: 'europe', iata: 'FCO', name: 'Fiumicino' },
        'ZRH': { city: 'Zürich', country: 'Schweiz', region: 'europe', iata: 'ZRH', name: 'Zürich Airport' },
        'VIE': { city: 'Wien', country: 'Österreich', region: 'europe', iata: 'VIE', name: 'Wien-Schwechat' },
        'BRU': { city: 'Brüssel', country: 'Belgien', region: 'europe', iata: 'BRU', name: 'Brussels Airport' },
        'MAD': { city: 'Madrid', country: 'Spanien', region: 'europe', iata: 'MAD', name: 'Barajas' },
        'LIS': { city: 'Lissabon', country: 'Portugal', region: 'europe', iata: 'LIS', name: 'Humberto Delgado' },
        'WAW': { city: 'Warschau', country: 'Polen', region: 'europe', iata: 'WAW', name: 'Chopin Airport' },
        'ATH': { city: 'Athen', country: 'Griechenland', region: 'europe', iata: 'ATH', name: 'Eleftherios Venizelos' },
        'PRG': { city: 'Prag', country: 'Tschechien', region: 'europe', iata: 'PRG', name: 'Václav Havel' },
        'CPH': { city: 'Kopenhagen', country: 'Dänemark', region: 'europe', iata: 'CPH', name: 'Kastrup' },
        'OSL': { city: 'Oslo', country: 'Norwegen', region: 'europe', iata: 'OSL', name: 'Gardermoen' },
        'HEL': { city: 'Helsinki', country: 'Finnland', region: 'europe', iata: 'HEL', name: 'Helsinki-Vantaa' },
        // Afrika
        'ACC': { city: 'Accra', country: 'Ghana', region: 'africa', iata: 'ACC', name: 'Kotoka Intl.' },
        'ABJ': { city: 'Abidjan', country: 'Elfenbeinküste', region: 'africa', iata: 'ABJ', name: 'Félix-Houphouët-Boigny' },
        'LOS': { city: 'Lagos', country: 'Nigeria', region: 'africa', iata: 'LOS', name: 'Murtala Muhammed' },
        'DSS': { city: 'Dakar', country: 'Senegal', region: 'africa', iata: 'DSS', name: 'Blaise Diagne' },
        'CMN': { city: 'Casablanca', country: 'Marokko', region: 'africa', iata: 'CMN', name: 'Mohammed V' },
        'ADD': { city: 'Addis Abeba', country: 'Äthiopien', region: 'africa', iata: 'ADD', name: 'Bole Intl.' },
        'NBO': { city: 'Nairobi', country: 'Kenia', region: 'africa', iata: 'NBO', name: 'Jomo Kenyatta' },
        'JNB': { city: 'Johannesburg', country: 'Südafrika', region: 'africa', iata: 'JNB', name: 'O.R. Tambo' },
        'CAI': { city: 'Kairo', country: 'Ägypten', region: 'africa', iata: 'CAI', name: 'Cairo Intl.' },
        'DLA': { city: 'Douala', country: 'Kamerun', region: 'africa', iata: 'DLA', name: 'Douala Intl.' },
        'COO': { city: 'Cotonou', country: 'Benin', region: 'africa', iata: 'COO', name: 'Cadjehoun' },
        'OUA': { city: 'Ouagadougou', country: 'Burkina Faso', region: 'africa', iata: 'OUA', name: 'Thomas Sankara' },
        'BKO': { city: 'Bamako', country: 'Mali', region: 'africa', iata: 'BKO', name: 'Modibo Keita' },
        'NIM': { city: 'Niamey', country: 'Niger', region: 'africa', iata: 'NIM', name: 'Diori Hamani' },
        // Amerika
        'JFK': { city: 'New York', country: 'USA', region: 'americas', iata: 'JFK', name: 'John F. Kennedy' },
        'LAX': { city: 'Los Angeles', country: 'USA', region: 'americas', iata: 'LAX', name: 'Los Angeles Intl.' },
        'MIA': { city: 'Miami', country: 'USA', region: 'americas', iata: 'MIA', name: 'Miami Intl.' },
        'GRU': { city: 'São Paulo', country: 'Brasilien', region: 'americas', iata: 'GRU', name: 'Guarulhos' },
        'YYZ': { city: 'Toronto', country: 'Kanada', region: 'americas', iata: 'YYZ', name: 'Pearson Intl.' },
        'MEX': { city: 'Mexico City', country: 'Mexiko', region: 'americas', iata: 'MEX', name: 'Benito Juárez' },
        // Asien
        'DXB': { city: 'Dubai', country: 'VAE', region: 'asia', iata: 'DXB', name: 'Dubai Intl.' },
        'DOH': { city: 'Doha', country: 'Katar', region: 'asia', iata: 'DOH', name: 'Hamad Intl.' },
        'BKK': { city: 'Bangkok', country: 'Thailand', region: 'asia', iata: 'BKK', name: 'Suvarnabhumi' },
        'SIN': { city: 'Singapur', country: 'Singapur', region: 'asia', iata: 'SIN', name: 'Changi' },
        'HND': { city: 'Tokyo', country: 'Japan', region: 'asia', iata: 'HND', name: 'Haneda' },
        'PEK': { city: 'Peking', country: 'China', region: 'asia', iata: 'PEK', name: 'Beijing Capital' },
        'DEL': { city: 'Delhi', country: 'Indien', region: 'asia', iata: 'DEL', name: 'Indira Gandhi' },
        'KUL': { city: 'Kuala Lumpur', country: 'Malaysia', region: 'asia', iata: 'KUL', name: 'KLIA' }
    },

    airlines: {
        'ET': { name: 'Ethiopian Airlines', logo: '🇪🇹', hub: 'ADD', rating: 4.2 },
        'AF': { name: 'Air France', logo: '🇫🇷', hub: 'CDG', rating: 3.8 },
        'TK': { name: 'Turkish Airlines', logo: '🇹🇷', hub: 'IST', rating: 4.0 },
        'LH': { name: 'Lufthansa', logo: '🇩🇪', hub: 'FRA', rating: 4.0 },
        'EK': { name: 'Emirates', logo: '🇦🇪', hub: 'DXB', rating: 4.5 },
        'QR': { name: 'Qatar Airways', logo: '🇶🇦', hub: 'DOH', rating: 4.6 },
        'TP': { name: 'TAP Portugal', logo: '🇵🇹', hub: 'LIS', rating: 3.7 },
        'W3': { name: 'ASKY Airlines', logo: '🇹🇬', hub: 'LFW', rating: 3.5 },
        'AT': { name: 'Royal Air Maroc', logo: '🇲🇦', hub: 'CMN', rating: 3.6 },
        'KQ': { name: 'Kenya Airways', logo: '🇰🇪', hub: 'NBO', rating: 3.7 },
        'SA': { name: 'South African Airways', logo: '🇿🇦', hub: 'JNB', rating: 3.5 },
        'MS': { name: 'EgyptAir', logo: '🇪🇬', hub: 'CAI', rating: 3.4 },
        'KL': { name: 'KLM', logo: '🇳🇱', hub: 'AMS', rating: 4.0 },
        'BA': { name: 'British Airways', logo: '🇬🇧', hub: 'LHR', rating: 3.8 },
        'IB': { name: 'Iberia', logo: '🇪🇸', hub: 'MAD', rating: 3.6 },
        'PC': { name: 'Pegasus Airlines', logo: '✈️', hub: 'IST', rating: 3.3 },
        'FR': { name: 'Ryanair', logo: '💛', hub: 'DUS', rating: 3.0 },
        'U2': { name: 'easyJet', logo: '🟠', hub: 'LHR', rating: 3.2 },
        'W6': { name: 'Wizz Air', logo: '💜', hub: 'WAW', rating: 3.1 }
    },

    // ====== PRICE INTELLIGENCE ENGINE ======
    // Simulated pricing algorithm with realistic patterns
    basePrices: {
        'europe-europe': { min: 19, max: 250, avg: 89 },
        'europe-africa': { min: 180, max: 900, avg: 450 },
        'europe-asia': { min: 250, max: 1200, avg: 550 },
        'europe-americas': { min: 200, max: 1100, avg: 480 },
        'africa-africa': { min: 80, max: 500, avg: 220 },
        'africa-asia': { min: 350, max: 1500, avg: 700 },
        'africa-americas': { min: 400, max: 1800, avg: 850 },
        'americas-americas': { min: 60, max: 600, avg: 250 },
        'asia-asia': { min: 50, max: 500, avg: 200 }
    },

    togoSpecialRoutes: [
        { from: 'FRA', airline: 'ET', stops: 1, via: 'ADD', normalPrice: 580, dealPrice: 289, frequency: 'daily' },
        { from: 'FRA', airline: 'AF', stops: 1, via: 'CDG', normalPrice: 620, dealPrice: 310, frequency: 'daily' },
        { from: 'FRA', airline: 'TK', stops: 1, via: 'IST', normalPrice: 490, dealPrice: 245, frequency: 'daily' },
        { from: 'CDG', airline: 'AF', stops: 0, via: null, normalPrice: 450, dealPrice: 199, frequency: 'daily' },
        { from: 'CDG', airline: 'W3', stops: 0, via: null, normalPrice: 380, dealPrice: 175, frequency: '3x/week' },
        { from: 'BRU', airline: 'ET', stops: 1, via: 'ADD', normalPrice: 520, dealPrice: 260, frequency: 'daily' },
        { from: 'BRU', airline: 'TK', stops: 1, via: 'IST', normalPrice: 480, dealPrice: 230, frequency: 'daily' },
        { from: 'IST', airline: 'TK', stops: 0, via: null, normalPrice: 350, dealPrice: 159, frequency: 'daily' },
        { from: 'ADD', airline: 'ET', stops: 0, via: null, normalPrice: 280, dealPrice: 139, frequency: 'daily' },
        { from: 'ACC', airline: 'W3', stops: 0, via: null, normalPrice: 120, dealPrice: 59, frequency: 'daily' },
        { from: 'ABJ', airline: 'W3', stops: 0, via: null, normalPrice: 100, dealPrice: 49, frequency: 'daily' },
        { from: 'COO', airline: 'W3', stops: 0, via: null, normalPrice: 80, dealPrice: 35, frequency: 'daily' },
        { from: 'LOS', airline: 'W3', stops: 0, via: null, normalPrice: 150, dealPrice: 69, frequency: '4x/week' },
        { from: 'DLA', airline: 'W3', stops: 1, via: 'ABJ', normalPrice: 180, dealPrice: 89, frequency: '3x/week' },
        { from: 'DSS', airline: 'W3', stops: 1, via: 'ABJ', normalPrice: 200, dealPrice: 95, frequency: '3x/week' },
        { from: 'LHR', airline: 'BA', stops: 1, via: 'ACC', normalPrice: 550, dealPrice: 275, frequency: 'daily' },
        { from: 'AMS', airline: 'KL', stops: 1, via: 'ACC', normalPrice: 530, dealPrice: 265, frequency: 'daily' },
        { from: 'DXB', airline: 'EK', stops: 1, via: 'ACC', normalPrice: 600, dealPrice: 299, frequency: 'daily' },
        { from: 'MUC', airline: 'TK', stops: 1, via: 'IST', normalPrice: 510, dealPrice: 255, frequency: 'daily' },
        { from: 'BER', airline: 'TK', stops: 1, via: 'IST', normalPrice: 470, dealPrice: 235, frequency: 'daily' },
        { from: 'JFK', airline: 'ET', stops: 1, via: 'ADD', normalPrice: 850, dealPrice: 425, frequency: 'daily' },
        { from: 'CMN', airline: 'AT', stops: 0, via: null, normalPrice: 250, dealPrice: 119, frequency: '4x/week' }
    ],

    // ====== PRICE HACK STRATEGIES ======
    priceHacks: [
        {
            title: "🕐 Zeitpunkt-Hack",
            desc: "Buche Dienstag/Mittwoch um 2-5 Uhr morgens - Preise sind bis zu 30% günstiger",
            savings: "15-30%",
            icon: "⏰"
        },
        {
            title: "🌍 Fehlerpreis-Alarm",
            desc: "Airlines machen Preisfehler (Error Fares). IR überwacht automatisch alle Routen nach Togo",
            savings: "50-90%",
            icon: "🐛"
        },
        {
            title: "✈️ Gabelflug-Trick",
            desc: "Hin über Paris, zurück über Istanbul kann deutlich günstiger sein als Hin+Rück ab einem Flughafen",
            savings: "20-40%",
            icon: "🔀"
        },
        {
            title: "📅 Flexible Daten",
            desc: "±3 Tage Flexibilität können hunderte Euro sparen. IR findet den günstigsten Tag",
            savings: "10-35%",
            icon: "📆"
        },
        {
            title: "🏷️ Versteckter City",
            desc: "Flug Frankfurt→Lomé mit Zwischenstopp Accra billiger als Direktflug nach Accra? Aussteigen!",
            savings: "20-50%",
            icon: "🎭"
        },
        {
            title: "💳 Meilen-Hack",
            desc: "Mit Kreditkarten-Meilen (Miles & More, Flying Blue) kostenlos nach Togo fliegen",
            savings: "bis 100%",
            icon: "💎"
        },
        {
            title: "🔍 VPN-Preistrick",
            desc: "Preise variieren je nach Land. VPN auf Togo/Ghana setzen kann günstigere Preise zeigen",
            savings: "5-20%",
            icon: "🌐"
        },
        {
            title: "📦 Paket-Deal",
            desc: "Flug+Hotel zusammen buchen ist oft billiger als separat (Opaque Fares)",
            savings: "15-40%",
            icon: "📦"
        },
        {
            title: "🎫 Meilenschnäppchen",
            desc: "Ethiopian Airlines Mileage Plus: 35.000 Meilen Frankfurt→Lomé (statt 650€)",
            savings: "bis 100%",
            icon: "✨"
        },
        {
            title: "🔔 Preisalarm",
            desc: "IR überwacht Preise 24/7 und benachrichtigt bei Preisdrops für deine Strecke",
            savings: "10-50%",
            icon: "🔔"
        }
    ],

    // ====== ALERTS DATABASE ======
    alerts: [],
    searchHistory: [],
    savedFlights: [],
    priceWatchers: [],

    // ====== NOTIFICATION STATE ======
    togoAlerts: [],
    lastAlertCheck: null,

    // ====== INITIALIZE ======
    init() {
        this.loadState();
        this.generateTogoAlerts();
        this.startPriceMonitoring();
        this.renderNotificationBadge();
    },

    loadState() {
        const saved = localStorage.getItem('ir_flight_data');
        if (saved) {
            const data = JSON.parse(saved);
            this.alerts = data.alerts || [];
            this.searchHistory = data.searchHistory || [];
            this.savedFlights = data.savedFlights || [];
            this.priceWatchers = data.priceWatchers || [];
            this.togoAlerts = data.togoAlerts || [];
        }
    },

    saveState() {
        localStorage.setItem('ir_flight_data', JSON.stringify({
            alerts: this.alerts,
            searchHistory: this.searchHistory,
            savedFlights: this.savedFlights,
            priceWatchers: this.priceWatchers,
            togoAlerts: this.togoAlerts
        }));
    },

    // ====== GENERATE TOGO ALERTS ======
    generateTogoAlerts() {
        const now = Date.now();
        const oneDay = 86400000;

        if (this.lastAlertCheck && (now - this.lastAlertCheck) < oneDay) return;

        this.togoAlerts = [];
        const alertTypes = [
            () => {
                const route = this.togoSpecialRoutes[Math.floor(Math.random() * this.togoSpecialRoutes.length)];
                const airport = this.airports[route.from];
                const discount = Math.floor(Math.random() * 30) + 20;
                const price = Math.floor(route.dealPrice * (1 - discount / 100));
                return {
                    id: Date.now() + Math.random(),
                    type: 'deal',
                    title: `🔥 Flash-Deal: ${airport.city} → Lomé ab ${price}€!`,
                    message: `${this.airlines[route.airline]?.name || route.airline} hat Preise um ${discount}% gesenkt! ${route.stops === 0 ? 'Direktflug!' : 'Via ' + (this.airports[route.via]?.city || route.via)}`,
                    price: price,
                    originalPrice: route.normalPrice,
                    route: `${route.from} → LFW`,
                    airline: route.airline,
                    date: this.randomFutureDate(14, 120),
                    expires: new Date(now + Math.random() * 3 * oneDay).toISOString(),
                    priority: 'high',
                    timestamp: new Date().toISOString()
                };
            },
            () => {
                const cities = ['Frankfurt', 'Paris', 'Brüssel', 'Amsterdam', 'London', 'Istanbul'];
                const city = cities[Math.floor(Math.random() * cities.length)];
                const price = Math.floor(Math.random() * 200) + 150;
                return {
                    id: Date.now() + Math.random(),
                    type: 'error-fare',
                    title: `🐛 FEHLERPREIS! ${city} → Lomé nur ${price}€!`,
                    message: `Möglicher Fehlerpreis entdeckt! Normalpreis: ${price * 3}€. Schnell buchen bevor die Airline es korrigiert!`,
                    price: price,
                    originalPrice: price * 3,
                    route: `${city} → Lomé`,
                    date: this.randomFutureDate(7, 90),
                    expires: new Date(now + 6 * 3600000).toISOString(),
                    priority: 'urgent',
                    timestamp: new Date().toISOString()
                };
            },
            () => {
                return {
                    id: Date.now() + Math.random(),
                    type: 'tip',
                    title: `💡 Spar-Tipp für Togo-Flüge`,
                    message: this.priceHacks[Math.floor(Math.random() * this.priceHacks.length)].desc,
                    priority: 'info',
                    timestamp: new Date().toISOString()
                };
            },
            () => {
                const month = ['Januar', 'Februar', 'März', 'November', 'Dezember'][Math.floor(Math.random() * 5)];
                return {
                    id: Date.now() + Math.random(),
                    type: 'seasonal',
                    title: `📅 Günstige Reisezeit: ${month}`,
                    message: `Flüge nach Lomé im ${month} sind historisch 25-40% günstiger. Jetzt buchen für maximale Ersparnis!`,
                    priority: 'medium',
                    timestamp: new Date().toISOString()
                };
            }
        ];

        // Generate 3-5 random alerts
        const numAlerts = Math.floor(Math.random() * 3) + 3;
        for (let i = 0; i < numAlerts; i++) {
            const generator = alertTypes[Math.floor(Math.random() * alertTypes.length)];
            this.togoAlerts.push(generator());
        }

        this.lastAlertCheck = now;
        this.saveState();
        this.renderNotificationBadge();
    },

    randomFutureDate(minDays, maxDays) {
        const now = new Date();
        const days = Math.floor(Math.random() * (maxDays - minDays)) + minDays;
        now.setDate(now.getDate() + days);
        return now.toISOString().split('T')[0];
    },

    // ====== PRICE MONITORING ======
    startPriceMonitoring() {
        setInterval(() => {
            this.checkPriceDrops();
        }, 300000); // Every 5 minutes check
    },

    checkPriceDrops() {
        this.priceWatchers.forEach(watcher => {
            const newPrice = this.generatePrice(watcher.from, watcher.to, watcher.date);
            if (newPrice < watcher.lastPrice * 0.85) {
                const drop = Math.floor((1 - newPrice / watcher.lastPrice) * 100);
                this.togoAlerts.unshift({
                    id: Date.now(),
                    type: 'price-drop',
                    title: `📉 Preisdrop! ${this.airports[watcher.from]?.city} → ${this.airports[watcher.to]?.city}`,
                    message: `Preis gefallen um ${drop}%! Von ${watcher.lastPrice}€ auf ${newPrice}€`,
                    price: newPrice,
                    originalPrice: watcher.lastPrice,
                    priority: 'high',
                    timestamp: new Date().toISOString()
                });
                watcher.lastPrice = newPrice;
                this.saveState();
                this.renderNotificationBadge();
            }
        });
    },

    // ====== NOTIFICATION BADGE ======
    renderNotificationBadge() {
        const dot = document.getElementById('notifDot');
        const badge = document.getElementById('irAlertBadge');
        if (this.togoAlerts.length > 0) {
            if (dot) dot.style.display = 'block';
            if (badge) {
                badge.textContent = this.togoAlerts.length;
                badge.style.display = 'flex';
            }
        }
    },

    // ====== PRICE GENERATION ENGINE ======
    generatePrice(fromCode, toCode, date, returnDate) {
        const from = this.airports[fromCode];
        const to = this.airports[toCode];
        if (!from || !to) return 999;

        let regionKey = [from.region, to.region].sort().join('-');
        if (from.region === to.region) regionKey = from.region + '-' + to.region;

        const priceRange = this.basePrices[regionKey] || this.basePrices['europe-africa'];

        // Base price
        let price = priceRange.avg;

        // Distance factor (simple estimation)
        const regionDistances = {
            'europe-europe': 0.7,
            'europe-africa': 1.0,
            'europe-asia': 1.3,
            'europe-americas': 1.2,
            'africa-africa': 0.6,
            'africa-asia': 1.4,
            'africa-americas': 1.6
        };
        price *= (regionDistances[regionKey] || 1.0);

        // Date factors
        if (date) {
            const d = new Date(date);
            const month = d.getMonth();
            const dayOfWeek = d.getDay();

            // Seasonal
            if ([6, 7, 11].includes(month)) price *= 1.3; // Summer & Dec expensive
            if ([1, 2, 10].includes(month)) price *= 0.7; // Feb, Mar, Nov cheap
            if ([3, 4, 9].includes(month)) price *= 0.85; // Shoulder season

            // Day of week
            if (dayOfWeek === 2 || dayOfWeek === 3) price *= 0.85; // Tue/Wed cheaper
            if (dayOfWeek === 5 || dayOfWeek === 0) price *= 1.15; // Fri/Sun expensive

            // Advance booking
            const daysAhead = Math.floor((d - new Date()) / 86400000);
            if (daysAhead < 7) price *= 1.8; // Last minute
            if (daysAhead > 60 && daysAhead < 120) price *= 0.75; // Sweet spot
            if (daysAhead > 120) price *= 0.85;
        }

        // Togo special pricing
        if (toCode === 'LFW' || fromCode === 'LFW') {
            const specialRoute = this.togoSpecialRoutes.find(r =>
                r.from === fromCode || r.from === toCode
            );
            if (specialRoute) {
                price = specialRoute.normalPrice * (0.6 + Math.random() * 0.6);
            }
        }

        // Random variation ±15%
        price *= (0.85 + Math.random() * 0.3);

        return Math.floor(price);
    },

    // ====== GENERATE FLIGHT RESULTS ======
    generateFlightResults(fromCode, toCode, date, returnDate, passengers) {
        const results = [];
        const from = this.airports[fromCode];
        const to = this.airports[toCode];

        if (!from || !to) return results;

        // Direct flights if applicable
        const directAirlines = this.getAirlinesForRoute(fromCode, toCode);

        directAirlines.forEach(airlineCode => {
            const airline = this.airlines[airlineCode];
            if (!airline) return;

            const price = this.generatePrice(fromCode, toCode, date) * passengers;
            const departTime = this.randomTime();
            const duration = this.estimateDuration(fromCode, toCode, 0);

            results.push({
                id: `${Date.now()}-${Math.random().toString(36).substr(2, 5)}`,
                airline: airlineCode,
                airlineName: airline.name,
                airlineLogo: airline.logo,
                from: fromCode,
                to: toCode,
                departTime: departTime,
                arriveTime: this.addTime(departTime, duration),
                duration: duration,
                stops: 0,
                price: price,
                pricePerPerson: Math.floor(price / passengers),
                date: date,
                returnDate: returnDate,
                passengers: passengers,
                class: 'Economy',
                rating: airline.rating,
                bookingLinks: this.getBookingLinks(fromCode, toCode, date, airlineCode)
            });
        });

        // 1-stop connections
        const hubs = ['IST', 'ADD', 'CDG', 'ACC', 'CMN', 'DXB', 'DOH', 'AMS', 'LHR'];
        hubs.forEach(hub => {
            if (hub === fromCode || hub === toCode) return;

            const hubAirlines = this.getHubAirlines(hub);
            hubAirlines.forEach(airlineCode => {
                const airline = this.airlines[airlineCode];
                if (!airline) return;

                let price = this.generatePrice(fromCode, toCode, date) * passengers;
                price *= 0.85; // Connecting flights often cheaper
                const departTime = this.randomTime();
                const totalDuration = this.estimateDuration(fromCode, toCode, 1);

                results.push({
                    id: `${Date.now()}-${Math.random().toString(36).substr(2, 5)}`,
                    airline: airlineCode,
                    airlineName: airline.name,
                    airlineLogo: airline.logo,
                    from: fromCode,
                    to: toCode,
                    via: hub,
                    viaCity: this.airports[hub]?.city,
                    departTime: departTime,
                    arriveTime: this.addTime(departTime, totalDuration),
                    duration: totalDuration,
                    stops: 1,
                    price: price,
                    pricePerPerson: Math.floor(price / passengers),
                    date: date,
                    returnDate: returnDate,
                    passengers: passengers,
                    class: 'Economy',
                    rating: airline.rating,
                    bookingLinks: this.getBookingLinks(fromCode, toCode, date, airlineCode)
                });
            });
        });

        // Sort by price
        results.sort((a, b) => a.price - b.price);

        // Add deal tags
        if (results.length > 0) {
            results[0].tag = 'Günstigster';
            const fastest = [...results].sort((a, b) => {
                const aDur = this.durationToMinutes(a.duration);
                const bDur = this.durationToMinutes(b.duration);
                return aDur - bDur;
            })[0];
            const fastestResult = results.find(r => r.id === fastest.id);
            if (fastestResult && fastestResult !== results[0]) {
                fastestResult.tag = 'Schnellster';
            }

            const bestValue = [...results].sort((a, b) => {
                const aScore = a.price / a.rating;
                const bScore = b.price / b.rating;
                return aScore - bScore;
            })[0];
            const bestResult = results.find(r => r.id === bestValue.id);
            if (bestResult && !bestResult.tag) {
                bestResult.tag = 'Bestes Preis-Leistung';
            }
        }

        return results.slice(0, 15);
    },

    getAirlinesForRoute(from, to) {
        const airlines = [];
        if (to === 'LFW' || from === 'LFW') {
            const routes = this.togoSpecialRoutes.filter(r => r.from === from || r.from === to);
            routes.filter(r => r.stops === 0).forEach(r => {
                if (!airlines.includes(r.airline)) airlines.push(r.airline);
            });
        }
        // Add regional airlines
        const fromAirport = this.airports[from];
        const toAirport = this.airports[to];
        if (fromAirport?.region === 'europe' && toAirport?.region === 'europe') {
            ['FR', 'U2', 'W6', 'LH', 'AF', 'BA'].forEach(a => { if (!airlines.includes(a)) airlines.push(a); });
        }
        return airlines;
    },

    getHubAirlines(hub) {
        const hubAirlineMap = {
            'IST': ['TK', 'PC'], 'ADD': ['ET'], 'CDG': ['AF'],
            'ACC': ['KQ', 'W3'], 'CMN': ['AT'], 'DXB': ['EK'],
            'DOH': ['QR'], 'AMS': ['KL'], 'LHR': ['BA'],
            'FRA': ['LH'], 'LIS': ['TP']
        };
        return hubAirlineMap[hub] || [];
    },

    estimateDuration(from, to, stops) {
        const baseTimes = {
            'europe-europe': { min: 60, max: 210 },
            'europe-africa': { min: 300, max: 480 },
            'europe-asia': { min: 360, max: 720 },
            'africa-africa': { min: 60, max: 300 },
            'europe-americas': { min: 420, max: 660 }
        };
        const fromRegion = this.airports[from]?.region || 'europe';
        const toRegion = this.airports[to]?.region || 'africa';
        const key = [fromRegion, toRegion].sort().join('-');
        const range = baseTimes[key] || baseTimes['europe-africa'];
        let minutes = range.min + Math.floor(Math.random() * (range.max - range.min));
        if (stops > 0) minutes += stops * (90 + Math.floor(Math.random() * 120));
        const h = Math.floor(minutes / 60);
        const m = minutes % 60;
        return `${h}h ${m.toString().padStart(2, '0')}m`;
    },

    durationToMinutes(dur) {
        const match = dur.match(/(\d+)h\s*(\d+)m/);
        return match ? parseInt(match[1]) * 60 + parseInt(match[2]) : 999;
    },

    randomTime() {
        const h = Math.floor(Math.random() * 18) + 5;
        const m = [0, 5, 10, 15, 20, 25, 30, 35, 40, 45, 50, 55][Math.floor(Math.random() * 12)];
        return `${h.toString().padStart(2, '0')}:${m.toString().padStart(2, '0')}`;
    },

    addTime(time, duration) {
        const [h, m] = time.split(':').map(Number);
        const durMatch = duration.match(/(\d+)h\s*(\d+)m/);
        if (!durMatch) return time;
        let totalMin = h * 60 + m + parseInt(durMatch[1]) * 60 + parseInt(durMatch[2]);
        totalMin = totalMin % (24 * 60);
        const rH = Math.floor(totalMin / 60);
        const rM = totalMin % 60;
        return `${rH.toString().padStart(2, '0')}:${rM.toString().padStart(2, '0')}`;
    },

    getBookingLinks(from, to, date, airline) {
        const dateFormatted = date ? date.replace(/-/g, '') : '';
        return [
            { name: 'Google Flights', url: `https://www.google.com/travel/flights?q=flights+from+${from}+to+${to}`, icon: '🔍' },
            { name: 'Skyscanner', url: `https://www.skyscanner.de/transport/fluge/${from.toLowerCase()}/${to.toLowerCase()}/${dateFormatted}/`, icon: '🟦' },
            { name: 'Kayak', url: `https://www.kayak.de/flights/${from}-${to}/${date}`, icon: '🟧' },
            { name: 'Momondo', url: `https://www.momondo.de/flights/${from}-${to}/${date}`, icon: '🟪' },
            { name: 'Kiwi.com', url: `https://www.kiwi.com/de/search/tiles/${from}-${to}/${date}`, icon: '🟩' }
        ];
    },

    // ====== SEARCH FUNCTION ======
    async search() {
        const from = document.getElementById('irFrom').value;
        const to = document.getElementById('irTo').value;
        const date = document.getElementById('irDate').value;
        const returnDate = document.getElementById('irReturnDate').value;
        const passengers = parseInt(document.getElementById('irPassengers').value) || 1;

        if (!from || !to || !date) {
            showToast('⚠️ Bitte alle Felder ausfüllen');
            return;
        }

        const resultsContainer = document.getElementById('irResults');
        resultsContainer.innerHTML = this.renderScanningUI();

        // Simulate search with progress
        const phases = [
            '🔍 Durchsuche 150+ Airlines...',
            '💰 Vergleiche Preise...',
            '🔄 Prüfe alternative Routen...',
            '🎯 Finde versteckte Deals...',
            '✈️ Analysiere Zwischenstopps...',
            '📊 Optimiere Ergebnisse...'
        ];

        for (let i = 0; i < phases.length; i++) {
            await this.delay(500 + Math.random() * 500);
            const statusEl = document.getElementById('irScanStatus');
            const progressEl = document.getElementById('irScanProgress');
            if (statusEl) statusEl.textContent = phases[i];
            if (progressEl) progressEl.style.width = ((i + 1) / phases.length * 100) + '%';
        }

        await this.delay(500);

        const results = this.generateFlightResults(from, to, date, returnDate, passengers);

        // Save to history
        this.searchHistory.unshift({
            from, to, date, returnDate, passengers,
            timestamp: new Date().toISOString(),
            cheapestPrice: results[0]?.price || 0
        });
        this.searchHistory = this.searchHistory.slice(0, 20);
        this.saveState();

        resultsContainer.innerHTML = this.renderResults(results, from, to, date, passengers);
    },

    renderScanningUI() {
        return `
            <div class="ir-scanning">
                <div class="ir-plane-animation">✈️</div>
                <h3 id="irScanStatus">🔍 Starte Suche...</h3>
                <div class="ir-scan-progress">
                    <div class="ir-scan-progress-bar" id="irScanProgress"></div>
                </div>
            </div>
        `;
    },

    renderResults(results, from, to, date, passengers) {
        if (results.length === 0) {
            return `
                <div class="ir-no-results">
                    <span style="font-size:3rem">😕</span>
                    <h3>Keine Flüge gefunden</h3>
                    <p>Versuche andere Daten oder einen anderen Abflughafen</p>
                </div>
            `;
        }

        const fromCity = this.airports[from]?.city || from;
        const toCity = this.airports[to]?.city || to;

        return `
            <div class="ir-results-header">
                <h3>✈️ ${fromCity} → ${toCity}</h3>
                <p>${results.length} Flüge gefunden • ${formatDate(date)} • ${passengers} Passagier${passengers > 1 ? 'e' : ''}</p>
            </div>

            <!-- Price Hacks Button -->
            <button class="ir-hacks-btn" onclick="IR.showPriceHacks()">
                💡 ${this.priceHacks.length} Spar-Tricks anzeigen
            </button>

            <!-- Results List -->
            <div class="ir-results-list">
                ${results.map(r => this.renderFlightCard(r)).join('')}
            </div>

            <!-- Price Watcher -->
            <div class="ir-price-watcher">
                <h4>🔔 Preisalarm einrichten</h4>
                <p>Benachrichtigung wenn Preise für diese Strecke fallen</p>
                <button class="btn btn-primary full-width" onclick="IR.addPriceWatcher('${from}', '${to}', '${date}', ${results[0]?.price || 0})">
                    <i class="fas fa-bell"></i> Preisalarm aktivieren
                </button>
            </div>
        `;
    },

    renderFlightCard(flight) {
        const tagHTML = flight.tag ? `<div class="ir-flight-tag ${flight.tag === 'Günstigster' ? 'cheapest' : flight.tag === 'Schnellster' ? 'fastest' : 'best'}">${flight.tag}</div>` : '';

        return `
            <div class="ir-flight-card" onclick="IR.showFlightDetail('${flight.id}', ${JSON.stringify(flight).replace(/"/g, '&quot;')})">
                ${tagHTML}
                <div class="ir-flight-main">
                    <div class="ir-flight-airline">
                        <span class="ir-airline-logo">${flight.airlineLogo}</span>
                        <span class="ir-airline-name">${flight.airlineName}</span>
                    </div>
                    <div class="ir-flight-times">
                        <div class="ir-time-block">
                            <span class="ir-time">${flight.departTime}</span>
                            <span class="ir-airport">${flight.from}</span>
                        </div>
                        <div class="ir-flight-line">
                            <span class="ir-duration">${flight.duration}</span>
                            <div class="ir-line">
                                <div class="ir-dot"></div>
                                ${flight.stops > 0 ? `<div class="ir-stop-dot" title="Stopp: ${flight.viaCity || ''}"></div>` : ''}
                                <div class="ir-dot"></div>
                            </div>
                            <span class="ir-stops">${flight.stops === 0 ? 'Direkt' : flight.stops + ' Stopp' + (flight.stops > 1 ? 's' : '') + (flight.viaCity ? ' (' + flight.viaCity + ')' : '')}</span>
                        </div>
                        <div class="ir-time-block">
                            <span class="ir-time">${flight.arriveTime}</span>
                            <span class="ir-airport">${flight.to}</span>
                        </div>
                    </div>
                    <div class="ir-flight-price">
                        <span class="ir-price">€${flight.price}</span>
                        ${flight.passengers > 1 ? `<span class="ir-price-pp">€${flight.pricePerPerson}/Person</span>` : ''}
                    </div>
                </div>
            </div>
        `;
    },

    showFlightDetail(id, flight) {
        document.getElementById('infoModalTitle').textContent = `✈️ ${flight.airlineName} - ${this.airports[flight.from]?.city} → ${this.airports[flight.to]?.city}`;
        document.getElementById('infoModalBody').innerHTML = `
            <div class="ir-detail">
                <div class="ir-detail-price">
                    <span class="ir-detail-price-amount">€${flight.price}</span>
                    ${flight.passengers > 1 ? `<span>€${flight.pricePerPerson} pro Person × ${flight.passengers}</span>` : ''}
                </div>
                <div class="ir-detail-route">
                    <div class="ir-detail-stop">
                        <strong>${flight.departTime}</strong>
                        <span>${this.airports[flight.from]?.name || flight.from}</span>
                        <small>${this.airports[flight.from]?.city}, ${this.airports[flight.from]?.country}</small>
                    </div>
                    ${flight.via ? `
                        <div class="ir-detail-connection">
                            <i class="fas fa-plane"></i> ${this.estimateDuration(flight.from, flight.via, 0)} Flug
                        </div>
                        <div class="ir-detail-stop layover">
                            <strong>Zwischenstopp</strong>
                            <span>${this.airports[flight.via]?.name || flight.via}</span>
                            <small>${this.airports[flight.via]?.city}, ${this.airports[flight.via]?.country} • ca. 2h Aufenthalt</small>
                        </div>
                        <div class="ir-detail-connection">
                            <i class="fas fa-plane"></i> Weiterflug
                        </div>
                    ` : `
                        <div class="ir-detail-connection">
                            <i class="fas fa-plane"></i> ${flight.duration} Direktflug
                        </div>
                    `}
                    <div class="ir-detail-stop">
                        <strong>${flight.arriveTime}</strong>
                        <span>${this.airports[flight.to]?.name || flight.to}</span>
                        <small>${this.airports[flight.to]?.city}, ${this.airports[flight.to]?.country}</small>
                    </div>
                </div>

                <h4>🔗 Jetzt buchen über:</h4>
                <div class="ir-booking-links">
                    ${flight.bookingLinks.map(link => `
                        <a href="${link.url}" target="_blank" rel="noopener" class="ir-booking-link">
                            ${link.icon} ${link.name}
                        </a>
                    `).join('')}
                </div>

                <div class="ir-detail-actions">
                    <button class="btn btn-primary full-width" onclick="IR.saveFlight(${JSON.stringify(flight).replace(/"/g, '&quot;')})">
                        <i class="fas fa-heart"></i> Flug merken
                    </button>
                    <button class="btn btn-outline full-width" onclick="IR.addPriceWatcher('${flight.from}', '${flight.to}', '${flight.date}', ${flight.price})">
                        <i class="fas fa-bell"></i> Preisalarm setzen
                    </button>
                </div>
            </div>
        `;
        openModal('infoModal');
    },

    saveFlight(flight) {
        this.savedFlights.unshift({ ...flight, savedAt: new Date().toISOString() });
        this.saveState();
        showToast('✈️ Flug gespeichert!');
    },

    addPriceWatcher(from, to, date, currentPrice) {
        this.priceWatchers.push({
            from, to, date,
            lastPrice: currentPrice,
            createdAt: new Date().toISOString()
        });
        this.saveState();
        showToast('🔔 Preisalarm aktiviert! Du wirst benachrichtigt wenn der Preis fällt.');
    },

    showPriceHacks() {
        document.getElementById('infoModalTitle').textContent = '💡 Spar-Tricks für günstige Flüge';
        document.getElementById('infoModalBody').innerHTML = `
            <div class="ir-hacks-list">
                ${this.priceHacks.map(hack => `
                    <div class="ir-hack-card">
                        <div class="ir-hack-icon">${hack.icon}</div>
                        <div class="ir-hack-info">
                            <h4>${hack.title}</h4>
                            <p>${hack.desc}</p>
                            <span class="ir-hack-savings">Ersparnis: ${hack.savings}</span>
                        </div>
                    </div>
                `).join('')}
            </div>
        `;
        openModal('infoModal');
    },

    showAlerts() {
        document.getElementById('infoModalTitle').textContent = '🔔 Togo Flug-Alerts';
        document.getElementById('infoModalBody').innerHTML = `
            <div class="ir-alerts-list">
                ${this.togoAlerts.length === 0 ? '<p class="empty-state">Keine aktuellen Alerts</p>' :
                this.togoAlerts.map(alert => `
                    <div class="ir-alert-card ${alert.priority}">
                        <div class="ir-alert-header">
                            <strong>${alert.title}</strong>
                            <small>${new Date(alert.timestamp).toLocaleDateString('de-DE')}</small>
                        </div>
                        <p>${alert.message}</p>
                        ${alert.price ? `
                            <div class="ir-alert-price">
                                <span class="ir-alert-deal-price">€${alert.price}</span>
                                ${alert.originalPrice ? `<span class="ir-alert-original">€${alert.originalPrice}</span>` : ''}
                            </div>
                        ` : ''}
                    </div>
                `).join('')}
            </div>
            <button class="btn btn-outline full-width" onclick="IR.generateTogoAlerts(); IR.showAlerts();" style="margin-top:10px">
                🔄 Neue Alerts laden
            </button>
        `;
        openModal('infoModal');
    },

    delay(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }
};