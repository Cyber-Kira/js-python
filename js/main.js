import tabs from './modules/tabs';
import modal from './modules/modal';
import timer from './modules/timer';
import cards from './modules/cards';
import calc from './modules/calc';
import forms from './modules/forms';
import slider from './modules/slider';
import {
    openModal
} from './modules/modal';
import { getZero } from './services/services';

window.addEventListener('DOMContentLoaded', () => {

    const deadline = () => {
        const day = getZero(new Date().getDate() + 8);
        const month = getZero(new Date().getMonth() + 1);
        const year = new Date().getFullYear();
        return `${year}-${month}-${day}`;
    };

    const modalTimerId = setTimeout(() => 
        openModal('.modal', modalTimerId), 10000);

    tabs('.tabheader__item',
        '.tabcontent',
        '.tabheader__items',
        'tabheader__item_active');
    modal('[data-modal]', '.modal', modalTimerId);
    timer('.timer', deadline());
    cards();
    calc();
    forms('form', modalTimerId);
    slider({
        container: '.offer__slider',
        slide: '.offer__slide',
        nextArrow: '.offer__slider-next',
        prevArrow: '.offer__slider-prev',
        totalCounter: '#total',
        currentCounter: '#current',
        wrapper: '.offer__slider-wrapper',
        field: '.offer__slider-inner'
    });
});