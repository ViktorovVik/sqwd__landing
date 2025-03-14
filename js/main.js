const swiper = new Swiper('.swiper', {
   parallax: true,
   loop: true,
   speed: 1000,

   keyboard: {
      enabled: true
   },
 
   // If we need pagination
   pagination: {

      el: ".hero__controls",
      clickable: !0,
   },
});

function mobileNav() {
   const menu = document.querySelector('[data-js-header-menu]');
   const navBtn = document.querySelector('[data-js-header-burger-button]');
   const paginationButtons = document.querySelector('[data-header-pagination]');

   if (navBtn && menu) {
      navBtn.addEventListener('click', () => {
         document.body.classList.toggle('is-lock');
         menu.classList.toggle('is-active');
         navBtn.classList.toggle('is-active');
         paginationButtons.classList.toggle('none')
      })
   }
}

mobileNav()

