$(document).ready(function () {
  var s,
    AppsHome = {
      settings: {
        mainMenu: $('.main-menu'),
        menuList: $(".main-menu ul"),
        menuIcon: $('#mobile-menu-icon'),
        revealElements: ['header', '.carousel', '.content-block h2', '.content-block p', '.content-block button', '.imagination__content', '.imagination__image', 'footer']
      },

      init: function () {
        s = AppsHome.settings;
        AppsHome.startScrollReveal();
        AppsHome.fadeMobileMenuIn();
        if ($('.swiper').length) {
          AppsHome.startCarousel();
        }
      },

      startCarousel: function () {
        new Swiper('.swiper', {
          loop: true,
          navigation: {
            nextEl: '.swiper-button-next',
            prevEl: '.swiper-button-prev',
          },
          centeredSlides: true,
          autoplay: {
            delay: 2500,
            disableOnInteraction: false,
          },
        });
      },

      startScrollReveal: function () {
        s.revealElements.map(function (elem) {
          ScrollReveal().reveal(elem, { delay: 300, easing: 'ease-out', });
        });
      },

      fadeMobileMenuOut: function () {
        $(document).one('click', function (e) {
          // Check if click was triggered on or within .main-menu ul and its not a link or svg icon     
          if (($(e.target).closest(s.menuList).length > 0) && (e.target.nodeName !== 'A' && e.target.nodeName !== 'svg')) {
            AppsHome.fadeMobileMenuOut();
            return false;
          }
          AppsHome.fadeMobileMenuIn();
          s.mainMenu.fadeOut();
        });
      },

      fadeMobileMenuIn: function () {
        s.menuIcon.on('click', function () {
          s.mainMenu.fadeIn(function () {
            AppsHome.fadeMobileMenuOut();
          });
        });
      }
    };

  /* Start functionalities */
  AppsHome.init();
});