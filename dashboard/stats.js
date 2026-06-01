const countEventsByYearMonth = data => {
    const totalEvents = Object.values(data).reduce((acc, curr) => acc + curr, 0);
    const eventCtrs = {
        days: new Array(daysPerWeek).fill(0),
        months: new Array(12).fill(0),
        dates: {},
        total: totalEvents
    };
    Object.keys(data).forEach(key => {
        const date = parseDateUTC(key);
        const yearMonth = `${date.getUTCFullYear()}-${("0" + (date.getUTCMonth() + 1)).slice(-2)}`;
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
    eventCtrs.daysNorm = eventCtrs.days.map(count => totalEvents > 0 ? count / totalEvents * 100 : 0);
    eventCtrs.monthsNorm = eventCtrs.months.map(count => totalEvents > 0 ? count / totalEvents * 100 : 0);
    eventCtrs.datesNorm = Object.keys(eventCtrs.dates).reduce((acc, key) => {
        acc[key] = totalEvents > 0 ? eventCtrs.dates[key] / totalEvents * 100 : 0;
        return acc;
    }, {});

    return eventCtrs;
};

const getPercentile = (values, percentile) => {
    if (!values.length) return 0;
    const sorted = values.slice().sort((a, b) => a - b);
    const idx = Math.ceil((percentile / 100) * sorted.length) - 1;
    return sorted[Math.max(0, Math.min(idx, sorted.length - 1))];
};

const getMedian = values => {
    if (!values.length) return 0;
    const sorted = values.slice().sort((a, b) => a - b);
    const mid = Math.floor(sorted.length / 2);
    return sorted.length % 2 === 0
        ? (sorted[mid - 1] + sorted[mid]) / 2
        : sorted[mid];
};

const countEventsInLastDays = (data, days) => {
    const today = new Date();
    const utcToday = new Date(Date.UTC(today.getUTCFullYear(), today.getUTCMonth(), today.getUTCDate()));
    const minTs = utcToday.getTime() - (days - 1) * MS_D;

    return Object.entries(data).reduce((acc, [dateStr, count]) => {
        const ts = parseDateUTC(dateStr).getTime();
        if (ts >= minTs && ts <= utcToday.getTime()) return acc + (Number(count) || 0);
        return acc;
    }, 0);
};

const computeWeeklyStreaks = (data) => {
    const weekIds = Object.entries(data)
        .filter(([, count]) => Number(count) > 0)
        .map(([dateStr]) => Math.floor(startOfWeekMondayUTC(parseDateUTC(dateStr)).getTime() / MS_W))
        .filter((v, idx, arr) => arr.indexOf(v) === idx)
        .sort((a, b) => a - b);

    if (!weekIds.length) return { current: 0, max: 0 };

    let max = 1;
    let run = 1;
    for (let i = 1; i < weekIds.length; i++) {
        if (weekIds[i] === weekIds[i - 1] + 1) {
            run += 1;
            max = Math.max(max, run);
        } else {
            run = 1;
        }
    }

    let current = 1;
    for (let i = weekIds.length - 1; i > 0; i--) {
        if (weekIds[i] === weekIds[i - 1] + 1) {
            current += 1;
        } else {
            break;
        }
    }

    return { current, max };
};

const renderKpis = (data, quality = {}) => {
    const container = document.getElementById("kpiSummary");
    if (!container) return;
    container.innerHTML = "";

    const allDates = Object.keys(data).sort((a, b) => parseDateUTC(a) - parseDateUTC(b));
    const latestDate = allDates.length ? allDates[allDates.length - 1] : null;
    const daysSinceLast = latestDate
        ? Math.floor((Date.now() - parseDateUTC(latestDate).getTime()) / MS_D)
        : 0;

    const gaps = computeGaps(data, false).map(g => g.days);
    const weeklyStreaks = computeWeeklyStreaks(data);

    const kpis = [
        { label: "Episodios totales", value: Object.values(data).reduce((a, b) => a + b, 0) },
        { label: "Días activos", value: Object.keys(data).length },
        { label: "Días desde último episodio", value: daysSinceLast },
        { label: "Episodios últimos 7 días", value: countEventsInLastDays(data, 7) },
        { label: "Episodios últimos 30 días", value: countEventsInLastDays(data, 30) },
        { label: "Episodios últimos 90 días", value: countEventsInLastDays(data, 90) },
        { label: "Mediana de intervalo (días)", value: getMedian(gaps) },
        { label: "P90 de intervalo (días)", value: getPercentile(gaps, 90) },
        { label: "Racha semanal actual", value: weeklyStreaks.current },
        { label: "Racha semanal máxima", value: weeklyStreaks.max },
        { label: "Fechas normalizadas", value: quality.normalizedDateKeys || 0 },
        { label: "Registros inválidos", value: (quality.invalidDateKeys || 0) + (quality.invalidValues || 0) }
    ];

    kpis.forEach(kpi => {
        const card = document.createElement("div");
        card.className = "kpiCard";

        const label = document.createElement("p");
        label.className = "kpiLabel";
        label.textContent = kpi.label;

        const value = document.createElement("p");
        value.className = "kpiValue";
        value.textContent = String(kpi.value);

        card.appendChild(label);
        card.appendChild(value);
        container.appendChild(card);
    });
};

const renderStatRows = (container, labels, counts) => {
    container.innerHTML = "";
    const max = Math.max(...counts, 1);
    labels.forEach((label, i) => {
        const count = counts[i];
        const row = document.createElement("div");
        row.className = "statRow";

        const lbl = document.createElement("span");
        lbl.className = "statRowLabel";
        lbl.textContent = label;

        const track = document.createElement("div");
        track.className = "statBarTrack";
        const fill = document.createElement("div");
        fill.className = "statBarFill";
        fill.style.width = `${(count / max) * 100}%`;
        track.appendChild(fill);

        const val = document.createElement("span");
        val.className = "statRowValue";
        val.textContent = count;

        row.appendChild(lbl);
        row.appendChild(track);
        row.appendChild(val);
        container.appendChild(row);
    });
};

const printEventsCount = (data, quality = {}) => {

    const counters = countEventsByYearMonth(data);

    const dayCountsContainer = document.getElementById("eventsPerDay");
    if (dayCountsContainer) {
        renderStatRows(dayCountsContainer, dayLabels, counters.days);
    }
    document.getElementById("dayCounterTitle").textContent = "Episodios por día";

    const monthCountsContainer = document.getElementById("eventsPerMonth");
    if (monthCountsContainer) {
        renderStatRows(monthCountsContainer, monthLabels, counters.months);
    }
    document.getElementById("monthCounterTitle").textContent = "Episodios por mes";

    const sortedKeys = Object.keys(data).sort((a, b) => parseDateUTC(a) - parseDateUTC(b));
    const lastKey = sortedKeys.length ? sortedKeys[sortedKeys.length - 1] : null;
    const infoContainer = document.getElementById("extraInfo");
    if (infoContainer) {
        infoContainer.innerHTML = "";
        const totalEpisodes = Object.values(data).reduce((a, b) => a + b, 0);
        [
            { label: "Último episodio", value: lastKey ? getFormattedDate(lastKey) : "Sin datos" },
            { label: "Total de episodios", value: totalEpisodes },
            { label: "Días con episodios", value: Object.keys(data).length }
        ].forEach(({ label, value }) => {
            const item = document.createElement("div");
            item.className = "infoItem";
            const l = document.createElement("span");
            l.className = "infoLabel";
            l.textContent = label;
            const v = document.createElement("span");
            v.className = "infoValue";
            v.textContent = value;
            item.appendChild(l);
            item.appendChild(v);
            infoContainer.appendChild(item);
        });
    }

    renderKpis(data, quality);
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
    const intraDayGaps = []; // gaps of 0 from multiple episodes on the same date

    Object.entries(data).forEach(([dateStr, count]) => {
        const t = parseDateUTC(dateStr).getTime();
        const n = Number(count) || 0;
        if (perEvent) {
            for (let i = 0; i < n; i++) ts.push(t);
        } else {
            ts.push(t); // one entry per date for inter-day gaps
            // Multiple episodes on the same day produce (n-1) zero-day gaps
            const iso = new Date(t).toISOString().slice(0, 10);
            for (let i = 1; i < n; i++) {
                intraDayGaps.push({ prev: iso, next: iso, days: 0 });
            }
        }
    });
    ts.sort((a, b) => a - b);
    const gaps = [...intraDayGaps];
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