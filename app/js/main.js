'use strict';
import * as $ from 'jquery';
import './slick.min';

window.addEventListener('load', function () {

    (function languageDropdown() {
        if (document.querySelector('.langs')) {
            const wrap = document.querySelector('.langs');
            const header = wrap.querySelector('.head');

            wrap.addEventListener('click', e => {
                const target = e.target;

                if (target.classList.contains('head')
                    && !wrap.classList.contains('active')) {
                    wrap.classList.add('active');
                    return;
                }

                const lang = target.dataset.lang;
                wrap.classList.remove('active');
                [...header.classList].forEach(c => {
                    if (c.length < 2 && c !== lang) {
                        header.classList.remove(c);
                    }
                });

                header.classList.add(lang);
            })
        }
    })();

    (function mainSlider() {
        if (!document.querySelector('.background')) {
            return;
        }

        const slides = [...document.querySelectorAll('.carousel-item')];
        const elemToBgChange = document.querySelector('.background');
        const bgPath = elemToBgChange.dataset.path;

        slides.forEach(s => {
           addClassNameListener(s);
        });

        function addClassNameListener(elem) {
            const classes = elem.classList;
            setInterval( function() {
                let newClasses = elem.classList;
                if (classes.length !== newClasses) {
                    if (elem.classList.contains('active')) {
                        const bg = elem.dataset.bg;
                        elemToBgChange.style.backgroundImage = `url('${bgPath + bg}'`;
                    }
                }
            },10);
        }
    })();

    (function propositionsSlider() {
        if (!document.querySelector('.home-page .propositions__wrap')) {
            return;
        }

        $('.propositions__wrap').slick({
            autoplay: true,
            autoplaySpeed: 3000,
            arrows: false,
            dots: true,
            slidesToShow: 2,
            slidesToScroll: 2
        });

    })();

    (function counters() {

        const counters = [...document.querySelectorAll('.counter')];

        counters.forEach(c => {
            const countVal = c.dataset.count;
            counter(c, countVal);
        });

        function counter(elem, value) {
            let count = 0;
            const delay = 10000 / value;
            const interval = setInterval( () => {
                if (count > value - 1) {
                    clearInterval(interval);
                }
                elem.innerHTML = count;
                count++;
            }, delay);
        }
    })();
});