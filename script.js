let title = "JavaScript-course";
let screens = "Простые, Сложные, Интерактивные";
let screenPrice = 1000;
let rollback = 2;
let fullPrice = 2000;
let adaptive = true;

console.log(typeof title);
console.log(typeof fullPrice);
console.log(typeof adaptive);
console.log(screens.length);
console.log(`Стоимость верстки экранов ${screenPrice} рублей/долларов/гривен/юани`);
console.log(`Стоимость разработки сайта ${fullPrice} рублей/долларов/гривен/юани`);
console.log(screens.toLowerCase().split(", "));
console.log(fullPrice * (rollback / 100));