'use strict';

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

const titleAnswer = prompt("Как называется ваш проект?");
title = titleAnswer;

const screensAnswer = prompt("Какие типы экранов нужно разработать?", "пример: Простые, Сложные, Интерактивные");
screens = screensAnswer;

const screenPriceAnswer = +prompt("Сколько будет стоить данная работа?");
screenPrice = screenPriceAnswer;

const adaptiveAnswer = confirm("Нужен ли адаптив на сайте?");
adaptive = adaptiveAnswer;

const service1 = prompt("Какой дополнительный тип услуги нужен?");
const servicePrice1 = +prompt("Сколько это будет стоить?");
const service2 = prompt("Какой дополнительный тип услуги нужен?");
const servicePrice2 = +prompt("Сколько это будет стоить?");

fullPrice = screenPrice + servicePrice1 + servicePrice2;

const servicePercentPrice = Math.ceil(fullPrice - fullPrice * (rollback / 100));
console.log(servicePercentPrice);

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

