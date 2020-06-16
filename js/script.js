const navBtn = document.querySelector('.top-nav_btn'),
      navMenu = document.querySelector('.top-nav_menu');
const sideBtn = document.querySelector('.left-sidebar_btn'),
      sideMenu = document.querySelector('.left-sidebar_menu');

  sideBtn.addEventListener('click', function() {
  sideMenu.classList.toggle('left-sidebar_menu__active')
  });

  navBtn.addEventListener('click', function() {
  navMenu.classList.toggle('top-nav_menu__active')
});
const links = document.querySelectorAll('a[href*="#footer"]');
for (let link of links) {
  link.addEventListener('click', function(event) {
    event.preventDefault();
    const blockID = link.getAttribute('href')
    document.querySelector('' + blockID).scrollIntoView({
      behavior: "smooth",
      block: "start"
    })
  })
}