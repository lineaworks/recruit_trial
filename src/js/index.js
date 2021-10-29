import { debounce } from 'lodash-es';
import Stats from 'stats-js';
import jquery from 'jquery';

// core version + navigation, pagination modules:
import Swiper, { Navigation, Pagination } from 'swiper/swiper-bundle';
import 'swiper/swiper-bundle.min.css';

import EVENTS from '~/constants/event-names';

// configure Swiper to use modules
Swiper.use([Navigation, Pagination]);

const $ = jquery;

(function () {
  /// /////////////////////////////////////////////////////// Performance Monitor
  const performanceMonitor = () => {
    const stats = new Stats();

    document.body.appendChild(stats.dom);

    function monitor() {
      stats.begin();
      stats.end();

      requestAnimationFrame(monitor);
    }

    requestAnimationFrame(monitor);
  };

  /// /////////////////////////////////////////////////////// Resize
  function onResize() {}
  window.addEventListener(EVENTS.RESIZE, debounce(onResize, 200));

  /// /////////////////////////////////////////////////////// Scroll
  function onScroll() {}
  window.addEventListener(EVENTS.SCROLL, debounce(onScroll, 200));

  /// /////////////////////////////////////////////////////// Load
  function onLoad() {
    // development
    if (process.env.NODE_ENV === 'development') {
      // performanceMonitor();
    }
  }
  window.addEventListener(EVENTS.LOAD, onLoad);

  // products swiper
  const productsSwiper = new Swiper('.p-modal__slider', {
    spaceBetween: 10,
    pagination: {
      el: `.p-modal__pagination`,
      type: 'fraction',
    },
    navigation: {
      nextEl: '.p-modal__next',
      prevEl: '.p-modal__prev',
    },
  });

  // image swiper
  $('.p-modal__img').each(function (i) {
    const sliderNum = $(this).data('sliderNum');
    const imageSwiper = new Swiper(
      `.p-modal__img-slider.slider-num-${sliderNum}`,
      {
        nested: true,
        resistanceRatio: 0,
        pagination: {
          el: `.p-modal__img-pagination.slider-num-${sliderNum}`,
          type: 'fraction',
        },
        navigation: {
          nextEl: `.p-modal__img-next.slider-num-${sliderNum}`,
          prevEl: `.p-modal__img-prev.slider-num-${sliderNum}`,
        },
      }
    );
  });

  // menu
  $('.p-header__menu-button').on('mouseenter', function () {
    $('.p-header__menu-button-text').addClass('is-on');
    $('.p-header__menu-button-line').addClass('is-on');
  });
  $('.p-header__menu-button').on('mouseleave', function () {
    $('.p-header__menu-button-text').removeClass('is-on');
    $('.p-header__menu-button-line').removeClass('is-on');
  });
  $('.p-header__menu-button, .p-menu__close').on('click', function () {
    $('.l-header').toggleClass('is-click');
    $('.p-header__menu-button-text').toggleClass('is-click');
    $('.p-header__menu-button-line').toggleClass('is-click');
    $('.l-menu').toggleClass('is-on');
  });

  // products modal
  $('.p-product__item').on('click', function () {
    const sliderNum = $(this).data('sliderNum');
    productsSwiper.slideTo(sliderNum);
    $('.l-modal').addClass('is-on');
  });

  // products modal close
  $('.p-modal__close').on('click', function () {
    $('.l-modal').removeClass('is-on');
  });

  // PAGE TOP
  $('.p-footer__page-top').on('click', function () {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  });
})();
