'use strict';
import * as baseFunction from './modules/functions.js';
import './vendors/vendors.js';
import Swiper, {
    Navigation,
    Pagination,
    Autoplay,
    EffectFade,
    Thumbs
} from 'swiper';

import AOS from 'aos';
import IMask from 'imask';
import { Fancybox, Carousel, Panzoom } from "@fancyapps/ui";
// Проверка поддержки webP
baseFunction.testWebP();

window.addEventListener('load', (e) => {
    document.body.style.opacity = 1;
});

// Инит и опции библиотеки анимаций
AOS.init({
    // Global settings:
    disable: false, // accepts following values: 'phone', 'tablet', 'mobile', boolean, expression or function
    startEvent: 'load', // name of the event dispatched on the document, that AOS should initialize on
    initClassName: 'aos-init', // class applied after initialization
    animatedClassName: 'aos-animate', // class applied on animation
    useClassNames: false, // if true, will add content of `data-aos` as classes on scroll
    disableMutationObserver: false, // disables automatic mutations' detections (advanced)
    debounceDelay: 50, // the delay on debounce used while resizing window (advanced)
    throttleDelay: 99, // the delay on throttle used while scrolling the page (advanced)
    // Settings that can be overridden on per-element basis, by `data-aos-*` attributes:
    offset: 25, // offset (in px) from the original trigger point
    delay: 100, // values from 0 to 3000, with step 50ms
    duration: 1200, // values from 0 to 3000, with step 50ms
    easing: 'ease', // default easing for AOS animations
    once: true, // whether animation should happen only once - while scrolling down
    mirror: false, // whether elements should animate out while scrolling past them
    anchorPlacement: 'top-bottom', // defines which position of the element regarding to window should trigger the animation
});

//логика работы меню бургер
document.body.addEventListener('click', (e) => {
    const target = e.target;
    if (target.closest('[data-burger-menu]')) {
        target.closest('[data-burger-menu]').classList.toggle('active');
        document.querySelector('[data-header-menu]').classList.toggle('active');
        document.body.classList.toggle('hidden');
    }
    if (target.closest('[data-burger-menu-close]')) {
        document.querySelector('[data-burger-menu].active').classList.remove('active');
        document.querySelector('[data-header-menu]').classList.remove('active');
        document.body.classList.remove('hidden');
    }
    //Закрытие модального окна
    if (target.closest('.close-mod') || (target.closest('.modal-wrapper.show') && !target.closest('.modal-content'))) {
        let openModal = document.querySelector('.modal-wrapper.show');
        openModal && openModal.classList.remove('show');
        openModal && openModal.classList.remove('white');

    }
    //открытие любого модального окна
    if (target.closest('[data-modal-id]')) {
        e.preventDefault();
        const targetBtn = target.closest('[data-modal-id]');
        const targetBtnId = targetBtn.dataset.modalId;

        const modal = document.querySelector(`#${targetBtnId}`);
        modal.classList.add('show');
    }


    if (target.closest('[data-open-modal]')) {
        if (window.innerWidth > 1200) {
            return
        }
        e.preventDefault();
        const targetBtn = target.closest('[data-open-modal]');
        const targetBtnId = targetBtn.dataset.openModal;


        const modal = document.querySelector(`#${targetBtnId}`);
        if (targetBtn.closest('.flying-header')) {
            modal.classList.add('white');
        }
        modal.classList.add('show');
    }
});


//логика работы фильтра на странице с с проектами
(function () {
    const projectsArr = [...document.querySelectorAll('[data-filter-value]')];
    const renderContainer = document.querySelector('[data-project-list]');
    if (projectsArr && renderContainer) {
        document.querySelectorAll('[data-filter-btn]').forEach(btn => {
            btn.addEventListener('click', (e) => {
                document.querySelector('[data-filter-btn].active').classList.remove('active');
                btn.classList.add('active');
                const filterParam = btn.dataset.filterBtn
                let filtredProjectsArr;
                if (filterParam === 'all') {
                    filtredProjectsArr = projectsArr.slice(0);
                } else {
                    filtredProjectsArr = projectsArr.slice(0).filter(item => item.dataset.filterValue === filterParam);
                }
                renderContainer.innerHTML = '';
                renderContainer.append(...filtredProjectsArr);
            });
        });
    }
}());



const mainSlider = new Swiper('.main-slider', {
    modules: [EffectFade, Navigation, Pagination, Autoplay],
    // speed: 1200,
    loop: true,
    autoplay: {
        delay: 8000,
    },
    effect: 'fade',
    fadeEffect: {
        crossFade: true
    },
    navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev',
    },
    pagination: {
        el: '.swiper-pagination',
        type: 'bullets',
        clickable: 1
    },
});

const partnersSlider = new Swiper('.partners__slider', {
    modules: [Navigation],
    slidesPerView: 'auto',
    spaceBetween: 10,
    navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev',
    },
});

const servicesSlider = new Swiper('.services__slider', {
    modules: [Navigation],
    slidesPerView: 'auto',
    navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev',
    },

    spaceBetween: 15,
    breakpoints: {
        576: {
            spaceBetween: 30,
        }
    }
});

const certificatesSlider = new Swiper('.certificates__slider', {
    modules: [Navigation],
    slidesPerView: 'auto',
    navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev',
    },
    spaceBetween: 15,
    breakpoints: {
        576: {
            spaceBetween: 30,
        }
    }
});

const reviewsSlider = new Swiper('.reviews__slider', {
    modules: [Navigation],
    slidesPerView: 'auto',
    spaceBetween: 15,
    breakpoints: {
        576: {
            spaceBetween: 30,
        }
    },
    navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev',
    },
});

// Парный слайдер галереи
const servicePageSliderThumbs = new Swiper(".service-page__slider-thumbs", {
    loop: true,
    spaceBetween: 10,
    slidesPerView: 3,
    freeMode: true,
    watchSlidesProgress: true,
    grabCursor: 1,
    breakpoints: {
        992: {
            spaceBetween: 30,
        }
    },
});
const servicePageSlider = new Swiper(".service-page__slider", {
    modules: [Thumbs, Navigation],
    loop: true,
    spaceBetween: 10,
    grabCursor: 1,
    navigation: {
        nextEl: ".swiper-button-next",
        prevEl: ".swiper-button-prev",
    },
    thumbs: {
        swiper: servicePageSliderThumbs,
    },
});



// Раскрывашка в меню
$(".open-arrow").click(function () {
    $(this).parents('.is-mob').find('.services-open__list').slideToggle();
    $(this).parents('.is-mob').toggleClass('open');
})

//Раскрывашка на странице вакансий
$(".vacancy-item__body").hide().prev().click(function () {
    $(this).parents(".vacancy__list").find(".vacancy-item__body").not(this).slideUp().parent().removeClass("show");
    $(this).next().not(":visible").slideDown().parent().addClass("show");
});


//Фиксированное меню
const header = document.querySelector('header.header');
const flyingHeader = document.querySelector('.flying-header');
window.addEventListener('scroll', function (e) {
    const headerheight = header.clientHeight;
    if (scrollY > headerheight) {
        flyingHeader.classList.add('show');
    } else {
        flyingHeader.classList.remove('show');
    }
});


// Маска на номера телефона
document.querySelectorAll('input[type="tel"]').forEach(input => {
    const mask = IMask(input, {
        mask: '+{7}(000) 000-00-00'
    });
});