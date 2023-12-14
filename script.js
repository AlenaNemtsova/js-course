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
let fullPrice;
let allServicePrices;
let servicePercentPrice;

const showTypeOf = function (variable) {
    console.log(typeof variable);
}

const getAllServicePrices = function () {
    return (servicePrice1 + servicePrice2);
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