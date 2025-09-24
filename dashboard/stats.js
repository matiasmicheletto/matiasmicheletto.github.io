const countEventsByYearMonth = data => {
    const totalEvents = Object.values(data).reduce((acc, curr) => acc + curr, 0);
    const eventCtrs = {
        days: new Array(daysPerWeek).fill(0),
        months: new Array(12).fill(0),
        dates: {},
        total: totalEvents
    };
    Object.keys(data).forEach(key => {
        const date = new Date(key);
        const yearMonth = `${date.getFullYear()}-${('0' + (date.getMonth() + 1)).slice(-2)}`;
        if (!eventCtrs.dates[yearMonth]) {
            eventCtrs.dates[yearMonth] = 0;
        }
        const {
            day,
            month
        } = getDateNumbers(key);

        eventCtrs.dates[yearMonth] += data[key];
        eventCtrs.days[day] += data[key];
        eventCtrs.months[month] += data[key];
    });
    eventCtrs.daysNorm = eventCtrs.days.map(count => count / totalEvents * 100);
    eventCtrs.monthsNorm = eventCtrs.months.map(count => count / totalEvents * 100);
    eventCtrs.datesNorm = Object.keys(eventCtrs.dates).reduce((acc, key) => {
        acc[key] = eventCtrs.dates[key] / totalEvents * 100;
        return acc;
    }, {});

    return eventCtrs;
};

const printEventsCount = data => {

    const counters = countEventsByYearMonth(data);

    const dayCountsContainer = document.getElementById("eventsPerDay");
    if (dayCountsContainer) {
        counters.days.forEach((count, day) => {
            const text = document.createElement("p");
            text.className = "statText";
            text.textContent = `${dayLabels[day]}: ${count}`;
            dayCountsContainer.appendChild(text);
        });
    }
    document.getElementById("dayCounterTitle").textContent = "Episodios por día";

    const monthCountsContainer = document.getElementById("eventsPerMonth");
    if (monthCountsContainer) {
        counters.months.forEach((count, month) => {
            const text = document.createElement("p");
            text.className = "statText";
            text.textContent = `${monthLabels[month]}: ${count}`;
            monthCountsContainer.appendChild(text);
        });
    }
    document.getElementById("monthCounterTitle").textContent = "Episodios por mes";
    
    const lastEpisodeText = document.getElementById("lastEpisodeText");
    const lastEpisodeLabel = document.createElement("b");
    const lastEpisodeDate = document.createElement("span");
    lastEpisodeText.appendChild(lastEpisodeLabel);
    lastEpisodeText.appendChild(lastEpisodeDate);
    lastEpisodeLabel.textContent = "Último episodio: ";

    const dates = Object.keys(data).map(d => new Date(d));
    dates.sort((a, b) => (new Date(b.date) - new Date(a.date)));
    const lastDate = dates[dates.length - 1];
    lastEpisodeDate.textContent = lastDate;
};

const printLastUpdate = (lastUpdate) => {
    const updateText = document.getElementById("lastUpdateText") || document.createElement("p");
    updateText.textContent = `Última actualización: ${lastUpdate}`;
};

const countIntervals = (data) => {
    const events = buildEventTimestamps(data);
    const intervals = {};
    if (events.length <= 1) return intervals;

    for (let i = 1; i < events.length; i++) {
        const diffDays = Math.round((events[i] - events[i - 1]) / MS_D); // integer days
        intervals[diffDays] = (intervals[diffDays] || 0) + 1;
    }
    return intervals;
};

const computeGaps = (data, perEvent = false) => {
    const ts = [];
    Object.entries(data).forEach(([dateStr, count]) => {
        const t = parseDateUTC(dateStr).getTime();
        if (perEvent) {
            const n = Number(count) || 0;
            for (let i = 0; i < n; i++) ts.push(t);
        } else {
            ts.push(t); // one timestamp per date
        }
    });
    ts.sort((a, b) => a - b);
    const gaps = [];
    for (let i = 1; i < ts.length; i++) {
        const prev = new Date(ts[i - 1]);
        const next = new Date(ts[i]);
        const days = Math.round((next - prev) / MS_D);
        gaps.push({
            prev: prev.toISOString().slice(0, 10),
            next: next.toISOString().slice(0, 10),
            days
        });
    }
    return gaps;
};

const gapsToCounts = gapsArr => {
    const counts = {};
    gapsArr.forEach(g => {
        counts[g.days] = (counts[g.days] || 0) + 1;
    });
    return counts;
};

const buildEventTimestamps = (data) => {
    const events = [];
    Object.entries(data).forEach(([dateStr, count]) => {
        const t = parseDateUTC(dateStr).getTime();
        const n = Number(count) || 0;
        for (let i = 0; i < n; i++) events.push(t);
    });
    events.sort((a, b) => a - b);
    return events;
};