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
    screenCount: 0,
    adaptive: true,
    servicesPercent: {},
    servicesNumber: {},
    rollback: 0,
    fullPrice: 0,
    servicePricesPercent: 0,
    servicePricesNumber: 0,
    servicePercentPrice: 0,
    isError: false,
    init: function () {
        appData.addTitle()
        startBtn.addEventListener('click', appData.start)
        buttonPlus.addEventListener('click', appData.addScreenBlock)
        inputRange.addEventListener('input', appData.addRollback)
    },
    addTitle: function () {
        document.title = title.textContent;
    },

    start: function () {
        appData.addScreens();

        if (!appData.isError) {
            appData.addServices();
            appData.addPrices();
            // appData.getServicePercentPrices();
            // appData.logger();
            appData.showResult();
        }

        appData.screens = [];
    },

    showResult: function () {
        total.value = appData.screenPrice;
        totalCount.value = appData.screenCount;
        totalCountOther.value = appData.servicePricesPercent + appData.servicePricesNumber;
        fullTotalCount.value = appData.fullPrice;
        totalICountRollback.value = appData.servicePercentPrice;
    },

    addScreens: function () {
        screens = document.querySelectorAll('.screen');

        screens.forEach(function (screen, index) {
            const select = screen.querySelector('select');
            const input = screen.querySelector('input');
            const selectName = select.options[select.selectedIndex].textContent;

            if (select.value === '' || input.value.trim() === '') {
                appData.isError = true;
            } else {
                appData.isError = false;
                appData.screens.push({
                    id: index,
                    name: selectName,
                    price: select.value * input.value,
                    count: input.value,
                });
            }


        });
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

        appData.screenCount = appData.screens.reduce((accumulator, currentValue) => accumulator + +currentValue.count,
            0,
        );

        for (let key in appData.servicesNumber) {
            appData.servicePricesNumber += appData.servicesNumber[key]
        }

        for (let key in appData.servicesPercent) {
            appData.servicePricesPercent += appData.screenPrice * (appData.servicesPercent[key] / 100)
        }

        appData.fullPrice = +appData.screenPrice + appData.servicePricesPercent + appData.servicePricesNumber;


        appData.servicePercentPrice = Math.ceil(appData.fullPrice - appData.fullPrice * (appData.rollback / 100));

    },

    addRollback: function (event) {
        rangeValue.textContent = `${event.target.value}%`;
        appData.rollback = event.target.value;
    },

    logger: function () {
        console.log(appData.fullPrice);
        console.log(appData.servicePercentPrice);
        console.log(appData.screens);
    }
}

appData.init();