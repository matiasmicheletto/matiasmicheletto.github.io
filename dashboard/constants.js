const daysPerWeek = 7;
const monthsPerYear = 12;
const weeksInYear = Math.ceil(365 / daysPerWeek);
const dayLabels = ["Lunes", "Martes", "Miércoles", "Jueves", "Viernes", "Sábado", "Domingo"];
const monthLabels = ["Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio", "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"];
const MS_D = 24 * 60 * 60 * 1000;
const MS_W = 7 * MS_D;