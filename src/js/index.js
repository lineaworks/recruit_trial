import { debounce } from 'lodash-es';
import Stats from 'stats-js';
import jquery from 'jquery';

import EVENTS from '~/constants/event-names';

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

  // menu
  $('.header-menu-button').on('mouseenter', function () {
    $(this).addClass('on');
  });
  $('.header-menu-button').on('mouseleave', function () {
    $(this).removeClass('on');
  });
  $('.header-menu-button').on('click', function () {
    $('header').toggleClass('click');
    $(this).toggleClass('click');
    $(this).next('.header-menu-overlay').toggleClass('on');
  });

  // PAGE TOP
  $('.footer-page-top').on('click', function () {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  });
})();
