const getFormattedDate = date => {
    const d = new Date(date);
    return `${d.getDate()+1}/${d.getMonth() + 1}/${d.getFullYear()}`;
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

const parseDateUTC = s => {
    const [y, m, d] = String(s).split("-").map(Number);
    return new Date(Date.UTC(y, m - 1, d));
};

const startOfWeekMondayUTC = (d) => {
    // Monday=0..Sunday=6
    const dow = (d.getUTCDay() + 6) % 7;
    return new Date(d.getTime() - dow * MS_D);
};