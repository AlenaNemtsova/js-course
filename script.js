'use strict';

let title;
let screens;
let screenPrice;
let adaptive;
let service1;
let service2;
let rollback = 2;
let fullPrice;
let allServicePrices;
let servicePercentPrice;

const isNumber = function (num) {
    return !isNaN(parseFloat(num)) && isFinite(num);
}

const asking = function () {
    title = prompt("Как называется ваш проект?");
    screens = prompt("Какие типы экранов нужно разработать?", "Простые, сложные");
    // screenPrice = prompt("Сколько будет стоить данная работа?");

    do {
        screenPrice = prompt("Сколько будет стоить данная работа?");
        screenPrice = parseFloat(screenPrice);
    } while (!isNumber(screenPrice));

    // screenPrice = +screenPrice;

    adaptive = confirm("Нужен ли адаптив на сайте?");
}

const showTypeOf = function (variable) {
    console.log(typeof variable);
}

const getAllServicePrices = function () {
    let sum = 0;

    for (let i = 0; i < 2; i++) {
        let servicePrice;

        if (i === 0) {
            service1 = prompt("Какой дополнительный тип услуги нужен?");
        } else if (i === 1) {
            service2 = prompt("Какой дополнительный тип услуги нужен?");
        }

        while (!isNumber(servicePrice)) {
            servicePrice = prompt("Сколько это будет стоить?");
            servicePrice = parseFloat(servicePrice);
        }
        sum += servicePrice;
    }

    return sum;
}

function getFullPrice() {
    return (screenPrice + allServicePrices);
}

function getTitle() {
    return (title.trim()[0].toUpperCase() + title.trim().slice(1).toLowerCase());
}

function getServicePercentPrices() {
    return (Math.ceil(fullPrice - fullPrice * (rollback / 100)));
}

const getRollbackMessage = function (price) {
    switch (true) {
        case price >= 30000:
            return "Даем скидку в 10%";
        case 15000 <= price && price < 30000:
            return "Даем скидку в 5%";
        case 0 <= price && price < 15000:
            return "Скидка не предусмотрена";
        case price < 0:
            return "Что то пошло не так";
    };
}

asking();
allServicePrices = getAllServicePrices();
fullPrice = getFullPrice();
title = getTitle();
servicePercentPrice = getServicePercentPrices();

showTypeOf(title);
showTypeOf(fullPrice);
showTypeOf(adaptive);

console.log(screens.toLowerCase().split(", "));
console.log(getRollbackMessage(fullPrice));
console.log(servicePercentPrice);
console.log(`Стоимость верстки экранов ${screenPrice} рублей/долларов/гривен/юани`);
console.log(`Стоимость разработки сайта ${fullPrice} рублей/долларов/гривен/юани`);