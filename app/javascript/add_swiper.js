import Swiper from 'swiper'

function initSwiper() {
  const swiperEl = document.querySelector('.personasSwiper')
  if (!swiperEl) return

  new Swiper('.personasSwiper', {
    slidesPerView: 1.5,
    centeredSlides: true,
    spaceBetween: 30,
    allowTouchMove: true,
    loop: true,
    centeredSlides: true,
    navigation: {
      nextEl: '.swiper-button-next',
      prevEl: '.swiper-button-prev',
    },
    observer: true,
    observeParents: true,
  })
}


document.addEventListener('turbo:load', () => {
  setTimeout(initSwiper, 1000)
})