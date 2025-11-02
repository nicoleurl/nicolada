import "swiper";

function initSwiper() {
    // Initialize Swiper
    const swiper = new Swiper('.personasSwiper', {
        modules: [Navigation],
        slidesPerView: '1.5',
        centeredSlides: true,
        spaceBetween: 0,
        allowTouchMove: true,
        loop: true,
        freeMode: false,
        navigation: {
            nextEl: ".swiper-button-next",
            prevEl: ".swiper-button-prev",
          },
        cssMode: true,
        observer: true,
        observeParents: true,
        breakpoints: {
          768: {
            slidesPerView: 1.2,
          },
          500: {
            slidesPerView: 1,
            spaceBetween: 0,
          }
        },
      });

    document.querySelector('.swiper-button-next').addEventListener('click', () => {
        swiper.slideNext();
    });
    document.querySelector('.swiper-button-prev').addEventListener('click', () => {
        swiper.slidePrev();
      });
    }
    window.onload = initSwiper;
