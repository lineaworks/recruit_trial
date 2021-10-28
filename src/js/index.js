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
      performanceMonitor();
    }
  }
  window.addEventListener(EVENTS.LOAD, onLoad);

  // products swiper
  const productsSwiper = new Swiper('.product-modal-slider', {
    spaceBetween: 10,
    navigation: {
      nextEl: '.product-modal-next',
      prevEl: '.product-modal-prev',
    },
  });

  // image swiper
  $('.product-modal-img').each(function (i) {
    const sliderNum = $(this).data('sliderNum');
    const imageSwiper = new Swiper(
      `.product-modal-img-slider.slider-num-${sliderNum}`,
      {
        nested: true,
        resistanceRatio: 0,
        pagination: {
          el: `.product-modal-img-pagination.slider-num-${sliderNum}`,
          type: 'fraction',
        },
        navigation: {
          nextEl: `.product-modal-img-next.slider-num-${sliderNum}`,
          prevEl: `.product-modal-img-prev.slider-num-${sliderNum}`,
        },
      }
    );
  });

  // menu
  $('.header-menu-button').on('mouseenter', function () {
    $(this).addClass('is-on');
  });
  $('.header-menu-button').on('mouseleave', function () {
    $(this).removeClass('is-on');
  });
  $('.header-menu-button').on('click', function () {
    $('header').toggleClass('is-click');
    $(this).toggleClass('is-click');
    $(this).next('.header-menu-overlay').toggleClass('is-on');
  });

  // products modal
  $('.product-list-item').on('click', function () {
    const sliderNum = $(this).data('sliderNum');
    productsSwiper.slideTo(sliderNum);
    $('.product-modal').addClass('is-on');
  });

  // products modal close
  $('.product-modal-close').on('click', function () {
    $('.product-modal').removeClass('is-on');
  });

  // PAGE TOP
  $('.footer-page-top').on('click', function () {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  });
})();
