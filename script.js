'use strict';

let title = prompt("Как называется ваш проект?");
let screens = prompt("Какие типы экранов нужно разработать?");
let screenPrice = +prompt("Сколько будет стоить данная работа?");
let adaptive = confirm("Нужен ли адаптив на сайте?");
let service1 = prompt("Какой дополнительный тип услуги нужен?");
let servicePrice1 = +prompt("Сколько это будет стоить?");
let service2 = prompt("Какой дополнительный тип услуги нужен?");
let servicePrice2 = +prompt("Сколько это будет стоить?");
let rollback = 2;
let fullPrice = screenPrice + servicePrice1 + servicePrice2;
let servicePercentPrice = Math.ceil(fullPrice - fullPrice * (rollback / 100));

switch (true) {
    case fullPrice >= 30000:
        console.log("Даем скидку в 10%");
        break
    case 15000 <= fullPrice && fullPrice < 30000:
        console.log("Даем скидку в 5%");
        break
    case 0 <= fullPrice && fullPrice < 15000:
        console.log("Скидка не предусмотрена");
        break
    case fullPrice < 0:
        console.log("Что то пошло не так");
        break
};

console.log(typeof title);
console.log(typeof fullPrice);
console.log(typeof adaptive);

console.log(screens.length);
console.log(`Стоимость верстки экранов ${screenPrice} рублей/долларов/гривен/юани`);
console.log(`Стоимость разработки сайта ${fullPrice} рублей/долларов/гривен/юани`);
console.log(screens.toLowerCase().split(", "));
console.log(fullPrice * (rollback / 100));
console.log(servicePercentPrice);