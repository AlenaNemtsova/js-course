'use strict';

const title = document.getElementsByTagName('h1')[0];
const startBtn = document.getElementsByClassName('handler_btn')[0];
const resetBtn = document.getElementsByClassName('handler_btn')[1];
const buttonPlus = document.querySelector('.screen-btn');

const otherItemsPercent = document.querySelectorAll('.other-items.percent')
const otherItemsNumber = document.querySelectorAll('.other-items.number')

const inputRange = document.querySelector('.rollback input[type="range"]')
const rangeValue = document.querySelector('.rollback .range-value')

const total = document.getElementsByClassName('total-input')[0];
const totalCount = document.getElementsByClassName('total-input')[1];
const totalCountOther = document.getElementsByClassName('total-input')[2];
const fullTotalCount = document.getElementsByClassName('total-input')[3];
const totalICountRollback = document.getElementsByClassName('total-input')[4];

let screens = document.querySelectorAll('.screen')

const appData = {
    title: '',
    screens: [],
    screenPrice: 0,
    adaptive: true,
    servicesPercent: {},
    servicesNumber: {},
    rollback: 10,
    fullPrice: 0,
    servicePricesPercent: 0,
    servicePricesNumber: 0,
    servicePercentPrice: 0,
    init: function () {
        appData.addTitle()

        startBtn.addEventListener('click', appData.start)

        buttonPlus.addEventListener('click', appData.addScreenBlock)
    },
    addTitle: function () {
        document.title = title.textContent;
    },

    start: function () {
        appData.addScreens();
        appData.addServices();
        appData.addPrices();
        // appData.getServicePercentPrices();
        // appData.logger();
        appData.showResult();
    },

    showResult: function () {
        total.value = appData.screenPrice;
        totalCountOther.value = appData.servicePricesPercent + appData.servicePricesNumber;
        fullTotalCount.value = appData.fullPrice;


    },

    addScreens: function () {
        screens = document.querySelectorAll('.screen');

        screens.forEach(function (screen, index) {
            const select = screen.querySelector('select');
            const input = screen.querySelector('input');
            const selectName = select.options[select.selectedIndex].textContent;

            appData.screens.push({
                id: index,
                name: selectName,
                price: select.value * input.value,
            });

            if (select.value === '' || input.value === '') {
                startBtn.setAttribute('disabled', '')
            }
        });

        console.log(appData.screens)
    },

    addScreenBlock: function () {
        const cloneScreen = screens[0].cloneNode(true);

        screens[screens.length - 1].after(cloneScreen);
    },

    addServices: function () {
        otherItemsPercent.forEach(function (item) {
            const check = item.querySelector('input[type=checkbox]');
            const label = item.querySelector('label');
            const input = item.querySelector('input[type=text]');

            if (check.checked) {
                appData.servicesPercent[label.textContent] = +input.value;
            }
        })

        otherItemsNumber.forEach(function (item) {
            const check = item.querySelector('input[type=checkbox]');
            const label = item.querySelector('label');
            const input = item.querySelector('input[type=text]');

            if (check.checked) {
                appData.servicesNumber[label.textContent] = +input.value;
            }
        })
    },



    addPrices: function () {
        appData.screenPrice = appData.screens.reduce((accumulator, currentValue) => accumulator + +currentValue.price,
            0,
        );

        for (let key in appData.servicesNumber) {
            appData.servicePricesNumber += appData.servicesNumber[key]
        }

        for (let key in appData.servicesPercent) {
            appData.servicePricesPercent += appData.screenPrice * (appData.servicesPercent[key] / 100)
        }

        appData.fullPrice = +appData.screenPrice + appData.servicePricesPercent + appData.servicePricesNumber;
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

    logger: function () {
        console.log(appData.fullPrice);
        console.log(appData.servicePercentPrice);
        console.log(appData.screens);
    }
}

appData.init();