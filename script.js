'use strict';

const appData = {
    title: '',
    screens: [],
    screenPrice: 0,
    adaptive: true,
    services: {},
    rollback: 10,
    fullPrice: 0,
    allServicePrices: 0,
    servicePercentPrice: 0,
    start: function () {
        appData.asking();
        appData.addPrices();
        appData.getFullPrice();
        appData.getTitle();
        appData.getServicePercentPrices();
        appData.logger();
    },

    asking: function () {
        do {
            appData.title = prompt("Как называется ваш проект?");
        } while (!isNaN(appData.title));

        for (let i = 0; i < 2; i++) {
            let name;
            let price = 0;

            do {
                name = prompt("Какие типы экранов нужно разработать?").trim();
            } while (!isNaN(name));

            do {
                price = prompt("Сколько будет стоить данная работа?");
            } while (!appData.isNumber(price));

            appData.screens.push({ id: i, name: name, price: price });
        }

        //стоимость услуг
        for (let i = 0; i < 2; i++) {
            let name;
            let price = 0;
            let key;

            do {
                name = prompt("Какой дополнительный тип услуги нужен?").trim();
                key = (i + 1) + `${name}`;
            } while (!isNaN(name));

            do {
                price = prompt("Сколько это будет стоить?");
            }
            while (!appData.isNumber(price))

            appData.services[key] = +price;
        }

        appData.adaptive = confirm("Нужен ли адаптив на сайте?");
    },

    addPrices: function () {
        //считаем стоимость работы, сумму значений массива screens
        //с помощью цикла
        // for (let screen of appData.screens) {
        //     appData.screenPrice += +screen.price;
        // }

        //или методом reduce
        appData.screenPrice = appData.screens.reduce((accumulator, currentValue) => accumulator + +currentValue.price,
            0,
        );

        //сумма доп. услуг
        for (let key in appData.services) {
            appData.allServicePrices += appData.services[key]
        }
    },

    getFullPrice: function () {
        appData.fullPrice = +appData.screenPrice + appData.allServicePrices;
    },

    getTitle: function () {
        appData.title = appData.title.trim()[0].toUpperCase() + appData.title.trim().slice(1).toLowerCase();
    },

    getServicePercentPrices: function () {
        appData.servicePercentPrice = Math.ceil(appData.fullPrice - appData.fullPrice * (appData.rollback / 100));
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

    logger: function () {
        console.log(appData.fullPrice);
        console.log(appData.servicePercentPrice);
        console.log(appData.screens);
    }
}

appData.start();