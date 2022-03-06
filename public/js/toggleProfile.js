// const toggleBtn = document.querySelector('.burger');
// const menuContainer = document.querySelector('.menu-container');
const menu = document.querySelector('.dropdown');
(function () {
  menu.addEventListener('click', function () {
    menu.classList.toggle('is-active');
  });
})();
