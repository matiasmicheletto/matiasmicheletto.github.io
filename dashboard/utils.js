const getFormattedDate = date => {
    const d = (date instanceof Date) ? date : parseDateUTC(date);
    if (Number.isNaN(d.getTime())) return "Fecha inválida";
    return `${d.getUTCDate()}/${d.getUTCMonth() + 1}/${d.getUTCFullYear()}`;
};

const getColor = (count, maxCount) => {
    const colorScale = ["#ebedf0", "#c6e48b", "#7bc96f", "#239a3b", "#196127"];
    if (count === 0)
        return colorScale[0];
    const scaleIndex = Math.min(colorScale.length - 1, Math.floor((count / maxCount) * (colorScale.length - 1)));
    return colorScale[scaleIndex];
};

const getDateNumbers = (dateStr) => {
    const date = parseDateUTC(dateStr);
    const day = (date.getUTCDay() + 6) % 7; // Mon=0..Sun=6
    const diffDays = Math.floor((date - baseMondayUTC) / MS_D);
    const week = Math.floor(diffDays / 7);
    return { week, day, month: date.getUTCMonth() };
};

const normalizeDateKey = s => {
    const match = String(s).trim().match(/^(\d{4})-(\d{1,2})-(\d{1,2})$/);
    if (!match) return null;

    const y = Number(match[1]);
    const m = Number(match[2]);
    const d = Number(match[3]);
    const date = new Date(Date.UTC(y, m - 1, d));

    // Guard against impossible dates like 2025-02-31
    if (
        date.getUTCFullYear() !== y ||
        date.getUTCMonth() !== m - 1 ||
        date.getUTCDate() !== d
    ) {
        return null;
    }

    return `${y}-${String(m).padStart(2, "0")}-${String(d).padStart(2, "0")}`;
};

const parseDateUTC = s => {
    const normalized = normalizeDateKey(s);
    if (!normalized) return new Date(NaN);
    const [y, m, d] = normalized.split("-").map(Number);
    return new Date(Date.UTC(y, m - 1, d));
};

const startOfWeekMondayUTC = (d) => {
    // Monday=0..Sunday=6
    const dow = (d.getUTCDay() + 6) % 7;
    return new Date(d.getTime() - dow * MS_D);
};

const normalizeEventsData = (rawData) => {
    const normalizedData = {};
    let invalidDateKeys = 0;
    let invalidValues = 0;
    let normalizedDateKeys = 0;

    Object.entries(rawData || {}).forEach(([rawKey, rawValue]) => {
        const normalizedKey = normalizeDateKey(rawKey);
        if (!normalizedKey) {
            invalidDateKeys += 1;
            return;
        }

        const count = Number(rawValue);
        if (!Number.isFinite(count) || count <= 0) {
            invalidValues += 1;
            return;
        }

        if (rawKey !== normalizedKey) normalizedDateKeys += 1;
        normalizedData[normalizedKey] = (normalizedData[normalizedKey] || 0) + count;
    });

    return {
        data: normalizedData,
        quality: {
            invalidDateKeys,
            invalidValues,
            normalizedDateKeys
        }
    };
};