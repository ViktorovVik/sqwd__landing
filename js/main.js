const menu = document.querySelector('[data-js-header-menu]');
const navBtn = document.querySelector('[data-js-header-burger-button]');
const paginationButtons = document.querySelector('[data-header-pagination]');

if (navBtn && menu) {
   navBtn.addEventListener('click', () => {
      document.body.classList.toggle('is-lock');
      menu.classList.toggle('is-active');
      navBtn.classList.toggle('is-active');
      paginationButtons.classList.toggle('none');
      
   })

   menu.querySelectorAll('[data-js-header-menu-link]').forEach(link => {
      link.addEventListener('click', () => {
         document.body.classList.remove('is-lock');
         menu.classList.remove('is-active');
         navBtn.classList.remove('is-active');
         paginationButtons.classList.remove('none');
      })
   })
}

const swiper = new Swiper('.swiper', {
   parallax: true,
   loop: true,
   speed: 1000,

   keyboard: {
      enabled: true
   },
 
   pagination: {
      el: ".hero__controls",
      clickable: !0,
   },
});

const testimonialsSlider = new Swiper('.testimonials-slider', {
   sliderPerView: 1,
   spaceBetween: 1,
   loop: true,
   speed: 1000,

   keyboard: {
      enabled: true
   },
 
   navigation: {
      nextEl: ".swiper-button-next",
      prevEl: ".swiper-button-prev",
   },
});


 






//-------------------------------------------------


 



