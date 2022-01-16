let Fechas = require("./dateController");
let cumple = "21/03/1988";
let fechas = new Fechas(cumple);

console.log("Today ------->", fechas.getToday());
console.log("Years ------->", fechas.getDifferencesYear());
console.log("diferencias de dias ------->", fechas.getDifferencesdays());
