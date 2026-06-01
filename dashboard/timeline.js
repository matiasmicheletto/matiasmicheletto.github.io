// --- globals computed at runtime ---
let baseMondayUTC = null; // Monday (UTC) of the first week in dataset
let weeksInRange = 0; // number of columns needed
let boxSize = 0; // computed after weeksInRange
let dayLabelsWidth = 0; // computed from your day labels

const showTooltip = (date, count, x, y) => {
    // Shows a tooltip at (x, y) with the date and count information
    const tooltip = document.createElement("div");
    tooltip.style.backgroundColor = "rgba(0, 0, 0, 0.7)";
    tooltip.id = "tooltip";
    tooltip.className = "tooltip";
    tooltip.style.left = `${x+15}px`;
    tooltip.style.top = `${y+15}px`;
    tooltip.style.display = "block";
    const formattedDate = getFormattedDate(date);
    tooltip.innerHTML = `Día: ${formattedDate}<br>episodios: ${count}`;
    document.body.appendChild(tooltip);
    return tooltip;
};

const hideTooltips = () => {
    // Hides all tooltips
    const tooltips = document.querySelectorAll("#tooltip");
    tooltips.forEach(tooltip => tooltip.remove());
};

const MONTH_LABELS_HEIGHT = 20; // px reserved above the grid for month labels

const drawDayLabels = () => {
    const svg = document.getElementById("timelineSVG");
    const totalWidth = weeksInRange * boxSize + dayLabelsWidth;
    const totalHeight = daysPerWeek * boxSize + MONTH_LABELS_HEIGHT;
    svg.setAttribute("viewBox", `0 0 ${totalWidth} ${totalHeight}`);
    svg.setAttribute("preserveAspectRatio", "xMinYMin meet");
    svg.setAttribute("width", totalWidth);
    svg.setAttribute("height", totalHeight);
    dayLabels.forEach((label, index) => {
        const text = document.createElementNS("http://www.w3.org/2000/svg", "text");
        text.setAttribute("x", dayLabelsWidth - 5);
        text.setAttribute("y", MONTH_LABELS_HEIGHT + index * boxSize + boxSize / 2);
        text.setAttribute("font-family", "Helvetica, Arial, sans-serif");
        text.setAttribute("text-anchor", "end");
        text.setAttribute("font-size", "12");
        text.setAttribute("fill", "#EEE");
        text.setAttribute("dominant-baseline", "middle");
        text.textContent = label;
        svg.appendChild(text);
    });
};

const drawMonthLabels = () => {
    const svg = document.getElementById("timelineSVG");
    let lastMonth = -1;
    for (let col = 0; col < weeksInRange; col++) {
        const weekDate = new Date(baseMondayUTC.getTime() + col * MS_W);
        const month = weekDate.getUTCMonth();
        if (month !== lastMonth) {
            lastMonth = month;
            const text = document.createElementNS("http://www.w3.org/2000/svg", "text");
            text.setAttribute("x", col * boxSize + dayLabelsWidth + 2);
            text.setAttribute("y", MONTH_LABELS_HEIGHT - 5);
            text.setAttribute("font-family", "Helvetica, Arial, sans-serif");
            text.setAttribute("font-size", "11");
            text.setAttribute("fill", "#AAA");
            text.textContent = monthLabels[month];
            svg.appendChild(text);
        }
    }
};


const drawGrid = () => {
    const svg = document.getElementById("timelineSVG");
    for (let col = 0; col <= weeksInRange; col++) {
        const x = col * boxSize + dayLabelsWidth;
        const line = document.createElementNS("http://www.w3.org/2000/svg", "line");
        line.setAttribute("x1", x);
        line.setAttribute("y1", MONTH_LABELS_HEIGHT);
        line.setAttribute("x2", x);
        line.setAttribute("y2", MONTH_LABELS_HEIGHT + daysPerWeek * boxSize);
        line.setAttribute("stroke", "#666");
        line.setAttribute("stroke-width", "1");
        svg.appendChild(line);
    }
    for (let row = 0; row <= daysPerWeek; row++) {
        const y = MONTH_LABELS_HEIGHT + row * boxSize;
        const line = document.createElementNS("http://www.w3.org/2000/svg", "line");
        line.setAttribute("x1", dayLabelsWidth);
        line.setAttribute("y1", y);
        line.setAttribute("x2", weeksInRange * boxSize + dayLabelsWidth);
        line.setAttribute("y2", y);
        line.setAttribute("stroke", "#666");
        line.setAttribute("stroke-width", "1");
        svg.appendChild(line);
    }
};

const drawDates = (data) => {
    const svg = document.getElementById("timelineSVG");
    const maxCount = Math.max(...Object.values(data));
    const sortedDates = Object.keys(data).sort((a, b) => parseDateUTC(a) - parseDateUTC(b));
    sortedDates.forEach((date) => {
        const count = data[date];
        const color = getColor(count, maxCount);
        const { week, day } = getDateNumbers(date);

        const rect = document.createElementNS("http://www.w3.org/2000/svg", "rect");
        rect.setAttribute("x", week * boxSize + dayLabelsWidth);
        rect.setAttribute("y", MONTH_LABELS_HEIGHT + day * boxSize);
        rect.setAttribute("width", boxSize);
        rect.setAttribute("height", boxSize);
        rect.setAttribute("fill", color);
        rect.setAttribute("data-date", date);
        rect.setAttribute("data-count", count);

        rect.addEventListener("mouseover", () => {
            rect.setAttribute("stroke", "#000");
            rect.setAttribute("stroke-width", "1");
            const r = rect.getBoundingClientRect();
            showTooltip(date, count, r.left, r.top);
        });
        rect.addEventListener("mouseout", () => {
            rect.removeAttribute("stroke");
            rect.removeAttribute("stroke-width");
            hideTooltips();
        });

        svg.appendChild(rect);
    });
};


const makeTimeline = (data) => {
    const svg = document.getElementById("timelineSVG");
    svg.innerHTML = ""; // clear previous

    const keys = Object.keys(data);
    if (!keys.length) return;

    // Range (UTC) for your dataset
    const minDateUTC = parseDateUTC(keys.reduce((a, b) => (a < b ? a : b)));
    const maxDateUTC = parseDateUTC(keys.reduce((a, b) => (a > b ? a : b)));

    baseMondayUTC = startOfWeekMondayUTC(minDateUTC);
    const endMondayUTC = startOfWeekMondayUTC(maxDateUTC);
    weeksInRange = Math.floor((endMondayUTC - baseMondayUTC) / MS_W) + 1;

    // Fixed box size for legibility; container scrolls horizontally
    dayLabelsWidth = 70;
    boxSize = 16;

    drawDayLabels();
    drawMonthLabels();
    drawGrid();
    drawDates(data);
};