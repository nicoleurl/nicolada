import "swiper";


$(document).ready(function () {
    // Initialize Swiper
    const swiper = new Swiper('.swiper', {
        slidesPerView: '1.5',
        centeredSlides: true,
        spaceBetween: 30,
    });

    console.log('Swiper initialized:', swiper);
});