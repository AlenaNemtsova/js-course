'use strict';

const appData = {
    title: '',
    screens: '',
    screenPrice: 0,
    adaptive: true,
    service1: '',
    service2: '',
    rollback: 10,
    fullPrice: 0,
    allServicePrices: 0,
    servicePercentPrice: 0,
    asking: function () {
        appData.title = prompt("Как называется ваш проект?");
        appData.screens = prompt("Какие типы экранов нужно разработать?", "Простые, сложные");

        do {
            appData.screenPrice = prompt("Сколько будет стоить данная работа?");
            appData.screenPrice = parseFloat(appData.screenPrice);
        } while (!appData.isNumber(appData.screenPrice));

        appData.adaptive = confirm("Нужен ли адаптив на сайте?");
    },

    getAllServicePrices: function () {
        let sum = 0;

        for (let i = 0; i < 2; i++) {
            let servicePrice;

            if (i === 0) {
                appData.service1 = prompt("Какой дополнительный тип услуги нужен?");
            } else if (i === 1) {
                appData.service2 = prompt("Какой дополнительный тип услуги нужен?");
            }

            while (!appData.isNumber(servicePrice)) {
                servicePrice = prompt("Сколько это будет стоить?");
                servicePrice = parseFloat(servicePrice);
            }
            sum += servicePrice;
        }
        return sum;
    },

    getFullPrice: function () {
        return (appData.screenPrice + appData.allServicePrices);
    },

    getTitle: function () {
        return (appData.title.trim()[0].toUpperCase() + appData.title.trim().slice(1).toLowerCase());
    },

    getServicePercentPrices: function () {
        return (Math.ceil(appData.fullPrice - appData.fullPrice * (appData.rollback / 100)));
    },

    getRollbackMessage: function (price) {
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
    },

    isNumber: function (num) {
        return !isNaN(parseFloat(num)) && isFinite(num);
    },

    start: function () {
        appData.asking();
        appData.allServicePrices = appData.getAllServicePrices();
        appData.fullPrice = appData.getFullPrice();
        appData.title = appData.getTitle();
        appData.servicePercentPrice = appData.getServicePercentPrices();
        appData.logger();
    },

    logger: function () {
        for (let key in appData) {
            console.log(key + ': ' + appData[key]);
        }
    }
}

appData.start();