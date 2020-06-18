//п е р е м е н н ы е 
const navBtn = document.querySelector('.top-nav_btn'),
      navMenu = document.querySelector('.top-nav_menu'),
      sideBtn = document.querySelector('.left-sidebar_btn'),
      sideMenu = document.querySelector('.left-sidebar_menu'),
      links = document.querySelectorAll('a[href*="#"]'),
      toBoth = document.querySelector('.to-both'),
      toTop = document.querySelector('.to-top'),
      openModal = document.querySelector('.object-card_btn'),
      modal = document.querySelector('.modal');


      //плавная прокрутка для кнопочек
for (let link of links) {
  link.addEventListener('click', function(event) {
    event.preventDefault();
    const blockID = link.getAttribute('href')
    document.querySelector('' + blockID).scrollIntoView({
      behavior: "smooth",
      block: "start"
    })
  })
}; 
//механика кнопочек up and down
window.addEventListener('scroll', () => {
  if(window.pageYOffset != 0) {
    toBoth.style.display = 'none';
    toTop.style.display = 'block';
  }
  else {
    toBoth.style.display = 'block';
    toTop.style.display = 'none';
  }
});
//open and close madal window
openModal.addEventListener('click', event => {
  modal.style.display = 'block';
  event.preventDefault();
});
modal.addEventListener('click', event => {
  if (event.target.closest('.close') ||
      event.target.classList.contains('modal') ||
      event.target.closest('.modal-form_btn')) {
      modal.style.display = 'none';
    }
  event.preventDefault();
});
//media event
sideBtn.addEventListener('click', function() {
  sideMenu.classList.toggle('left-sidebar_menu__active')
});

navBtn.addEventListener('click', function() {
  navMenu.classList.toggle('top-nav_menu__active')
});