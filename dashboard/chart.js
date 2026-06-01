Chart.defaults.borderColor = '#666';
Chart.defaults.color = '#EEE';

const curve = (element, config) => {
    const canvas = document.getElementById(element);
    if (canvas) {
        const ctx = canvas.getContext('2d');
        const chartConfig = {
            type: 'line',
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    title: {
                        display: false
                    }
                },
                scales: {
                    x: {
                        title: {
                            display: true,
                            text: config.xScale
                        },
                    },
                    y: {
                        title: {
                            display: true,
                            text: config.yScale || "Proporción (%)"
                        },
                        beginAtZero: true
                    }
                },
                elements: {
                    line: {
                        tension: 0.3 // smooth curves
                    },
                    point: {
                        radius: 4,
                        hoverRadius: 6
                    }
                }
            },
            data: {
                labels: config.dataLabels,
                datasets: [{
                    data: config.data,
                    label: config.label,
                    borderColor: config.borderColor,
                    backgroundColor: config.backgroundColor,
                    borderWidth: 2,
                    fill: true
                }]
            }
        };
        return new Chart(ctx, chartConfig);
    } else {
        console.error(`Elemento ${element} no encontrado`);
    }
}

const displayIntervalChart = (data, options = {}) => {
    const perEvent = options.perEvent || false; // false => gaps between dates (default)
    const displayMax = typeof options.displayMax === 'number' ? options.displayMax : 15; // x-axis cap
    const hideExtremes = options.hideExtremes || false;

    const gaps = computeGaps(data, perEvent);
    const counts = gapsToCounts(gaps);
    const numericKeys = Object.keys(counts).map(k => Number(k));

    // Build labels 0..displayMax and a final ">displayMax" bucket if needed
    let labels = Array.from({
        length: displayMax + 1
    }, (_, i) => String(i));
    let overflowCount = 0;
    numericKeys.forEach(k => {
        if (k > displayMax) overflowCount += counts[k];
    });
    if (overflowCount > 0) labels.push(`>${displayMax}`);

    let values = labels.map(lbl => {
        if (lbl.startsWith(">")) return overflowCount;
        return counts[Number(lbl)] || 0;
    });

    // Filter out extremes (0-day and >displayMax bucket) when requested
    if (hideExtremes) {
        const filtered = labels.reduce((acc, lbl, i) => {
            if (lbl === "0" || lbl.startsWith(">")) return acc;
            acc.labels.push(lbl);
            acc.values.push(values[i]);
            return acc;
        }, { labels: [], values: [] });
        labels = filtered.labels;
        values = filtered.values;
    }

    // print / expose outliers so you can inspect them
    const outliers = gaps.filter(g => g.days > displayMax);
    if (outliers.length) {
        console.log(`Interval outliers (days > ${displayMax}):`, outliers);
        // Optionally show in DOM: document.getElementById("outliers").textContent = JSON.stringify(outliers, null, 2);
    }

    const canvas = document.getElementById("intervalChart");
    if (!canvas) {
        console.error("intervalChart canvas not found");
        return;
    }
    // destroy previous chart on this canvas (if any)
    const existing = Chart.getChart(canvas);
    if (existing) existing.destroy();

    const ctx = canvas.getContext("2d");
    new Chart(ctx, {
        type: 'bar',
        data: {
            labels,
            datasets: [
                {
                    type: 'bar',
                    label: 'Frecuencia (entre fechas activas)',
                    data: values,
                    borderColor: 'rgba(54, 162, 235, 1)',
                    backgroundColor: 'rgba(54, 162, 235, 0.5)',
                    borderWidth: 0,
                    borderRadius: 5,
                    order: 2
                },
                {
                    type: 'line',
                    label: 'Tendencia (spline)',
                    data: values,
                    borderColor: 'rgba(255, 160, 64, 1)',
                    backgroundColor: 'rgba(255, 160, 64, 0.15)',
                    borderWidth: 2,
                    fill: true,
                    tension: 0.4,
                    pointRadius: 3,
                    pointHoverRadius: 5,
                    order: 1
                }
            ]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                tooltip: {
                    callbacks: {
                        label: (ctx) => {
                            const lbl = ctx.label;
                            const v = ctx.parsed.y;
                            if (lbl.startsWith(">")) {
                                return `${lbl}: ${v} veces (suma de intervalos más largos)`;
                            }
                            return `${lbl} días: ${v} veces`;
                        }
                    }
                }
            },
            scales: {
                x: {
                    title: {
                        display: true,
                        text: 'Días entre episodios'
                    }
                },
                y: {
                    title: {
                        display: true,
                        text: 'Cantidad de episodios'
                    },
                    beginAtZero: true,
                    ticks: {
                        precision: 0
                    }
                }
            }
        }
    });
};

const makeCharts = data => {

    const counters = countEventsByYearMonth(data);

    // --- Chart 1: Events per Day of the Week ---
    const dayChartConfig = {
        label: "Días",
        xScale: "Día de la semana",
        yScale: "Proporción (%)",
        dataLabels: dayLabels,
        data: counters.daysNorm,
        label: "Episodios por día",
        borderColor: 'rgba(75, 192, 192, 1)',
        backgroundColor: 'rgba(75, 192, 192, 0.2)'
    };
    curve("dayCounterChart", dayChartConfig);

    // --- Chart 2: Events per Year-Month ---
    const sortedYearMonthLabels = Object.keys(counters.dates).sort((a, b) => a.localeCompare(b));
    const sortedData = sortedYearMonthLabels.map(label => counters.dates[label]);
    const yearMonthChartConfig = {
        label: "Año-Mes",
        xScale: "Fecha",
        yScale: "Cantidad de episodios",
        dataLabels: sortedYearMonthLabels,
        data: sortedData,
        label: "Episodios por mes",
        borderColor: 'rgba(192, 75, 75, 1)',
        backgroundColor: 'rgba(192, 75, 75, 0.2)'
    };
    curve("yearMonthCounterChart", yearMonthChartConfig);

    // --- Chart 3: Frequency of intervals ---
    const intervalOptions = { perEvent: false, displayMax: 15 };
    displayIntervalChart(data, intervalOptions);

    const hideExtremesCheck = document.getElementById("hideExtremesCheck");
    if (hideExtremesCheck) {
        // Remove previous listener to avoid stacking on re-render
        const newCheck = hideExtremesCheck.cloneNode(true);
        hideExtremesCheck.parentNode.replaceChild(newCheck, hideExtremesCheck);
        newCheck.addEventListener("change", () => {
            displayIntervalChart(data, { ...intervalOptions, hideExtremes: newCheck.checked });
        });
    }
}