'use strict';

const title = document.getElementsByTagName('h1')[0];
const startBtn = document.getElementsByClassName('handler_btn')[0];
const resetBtn = document.querySelector('#reset');
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

const csmOpen = document.querySelector('#cms-open');
const cmsHidden = document.querySelector('.hidden-cms-variants');
const cmsSelect = document.querySelector('#cms-select');

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
        this.addTitle()
        startBtn.addEventListener('click', this.start.bind(appData))
        buttonPlus.addEventListener('click', this.addScreenBlock.bind(appData))
        inputRange.addEventListener('input', this.addRollback.bind(appData))
        resetBtn.addEventListener('click', this.reset.bind(appData))
        csmOpen.addEventListener('input', this.openCms.bind(appData))
        cmsSelect.addEventListener('change', this.selectCmsOptions.bind(appData))
    },

    openCms: function () {
        if (csmOpen.checked) {
            cmsHidden.style.display = 'flex'
        } else {
            cmsHidden.style.display = 'none';
        }
    },

    selectCmsOptions: function () {
        const cmsHiddenOtherBlock = document.querySelector('.hidden-cms-variants .main-controls__input');

        if (cmsSelect.value === 'other') {
            cmsHiddenOtherBlock.style.display = 'block'
        } else {
            cmsHiddenOtherBlock.style.display = 'none'
        }
    },

    addTitle: function () {
        document.title = title.textContent;
    },

    start: function () {
        this.addScreens();

        if (!this.isError) {
            this.addServices();
            this.addPrices();
            this.showResult();
            // appData.logger();

            screens.forEach((screen) => {
                const select = screen.querySelector('select');
                const input = screen.querySelector('input');
                select.setAttribute('disabled', '');
                input.setAttribute('disabled', '');
            });

            startBtn.style.display = 'none';
            resetBtn.style.display = null;
        }

        this.screens = [];
    },

    showResult: function () {
        total.value = this.screenPrice;
        totalCount.value = this.screenCount;
        totalCountOther.value = this.servicePricesPercent + this.servicePricesNumber;
        fullTotalCount.value = this.fullPrice;
        totalICountRollback.value = this.servicePercentPrice;
    },

    addScreens: function () {
        screens = document.querySelectorAll('.screen');

        screens.forEach((screen, index) => {
            const select = screen.querySelector('select');
            const input = screen.querySelector('input');
            const selectName = select.options[select.selectedIndex].textContent;

            if (select.value === '' || input.value.trim() === '') {
                this.isError = true;
            } else {
                this.isError = false;
                this.screens.push({
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
        otherItemsPercent.forEach((item) => {
            const check = item.querySelector('input[type=checkbox]');
            const label = item.querySelector('label');
            const input = item.querySelector('input[type=text]');

            if (check.checked) {
                this.servicesPercent[label.textContent] = +input.value;
            }
        })

        otherItemsNumber.forEach((item) => {
            const check = item.querySelector('input[type=checkbox]');
            const label = item.querySelector('label');
            const input = item.querySelector('input[type=text]');

            if (check.checked) {
                this.servicesNumber[label.textContent] = +input.value;
            }
        })
    },

    addPrices: function () {
        this.screenPrice = this.screens.reduce((accumulator, currentValue) => accumulator + +currentValue.price,
            0,
        );

        this.screenCount = this.screens.reduce((accumulator, currentValue) => accumulator + +currentValue.count,
            0,
        );

        for (let key in this.servicesNumber) {
            this.servicePricesNumber += this.servicesNumber[key]
        }

        for (let key in this.servicesPercent) {
            this.servicePricesPercent += this.screenPrice * (this.servicesPercent[key] / 100)
        }

        this.fullPrice = +this.screenPrice + this.servicePricesPercent + this.servicePricesNumber;
        this.servicePercentPrice = Math.ceil(this.fullPrice - this.fullPrice * (this.rollback / 100));

        if (cmsSelect.value === '50') {
            this.fullPrice = this.fullPrice + this.fullPrice / 2
        }
    },

    addRollback: function (event) {
        rangeValue.textContent = `${event.target.value}%`;
        this.rollback = event.target.value;
    },

    reset: function () {
        this.screens = [];
        startBtn.style.display = null;
        resetBtn.style.display = 'none';
        cmsHidden.style.display = 'none';

        if (csmOpen.checked) {
            csmOpen.checked = false;
            cmsSelect.value = '';
        }

        screens.forEach((screen, index) => {
            const select = screen.querySelector('select');
            const input = screen.querySelector('input');
            select.removeAttribute('disabled');
            input.removeAttribute('disabled');

            if (index > 0) {
                screens[index].remove();
            };

            select.value = '';
            input.value = '';
        });
    },

    logger: function () {
        console.log(appData.fullPrice);
        console.log(appData.servicePercentPrice);
        console.log(appData.screens);
    }
}

appData.init();
