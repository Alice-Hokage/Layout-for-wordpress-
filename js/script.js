//п е р е м е н н ы е 
const navBtn = document.querySelector('.top-nav_btn'),
      navMenu = document.querySelector('.top-nav_menu'),
      sideBtn = document.querySelector('.left-sidebar_btn'),
      sideMenu = document.querySelector('.left-sidebar_menu'),
      toBoth = document.querySelector('.to-both'),
      toTop = document.querySelector('.to-top'),
      content = document.querySelector('.content'),
      modal = document.querySelector('.modal'),
      category = document.querySelector('.category'),
      titlePage = document.querySelector('.title-page');

const getData = async function(url) {
  const response = await fetch(url);
  
  if(!response.ok) {
    throw new Error (`Ошибка по адресу ${url},
                      ошибка ${response.status}!`);
  }
  return await response.json();
}
//механика кнопочки up
const smoothScroll = () => {
  if(window.pageYOffset != 0 && 
    document.body.clientWidth > 650) {
    toTop.style.display = 'block';
  }
  else {
    toTop.style.display = 'none';
  }
}
//плавная прокрутка для кнопочки
const scrollToTop = (event) => {
  event.preventDefault();
  document.querySelector('body').scrollIntoView({
    behavior: "smooth",
    block: "start"
  })
}; 
//open and close madal window
const openModal = (event) => {
  const target = event.target;
  if (target.closest('.object-card_btn')) {
      modal.classList.remove('hide');
  }
};
const closeModal = (event) => {
  const target = event.target;

  if (target.closest('.close') ||
      target.classList.contains('modal') ||
      target.closest('.modal-form_btn')) {
      modal.classList.add('hide');
    }
  event.preventDefault();
};
/*window.addEventListener('keydown', event => {
  if (event.code == 'Escape') {
      modal.classList.add('hide');
  }
}); */
const createCategoryList = (category) => {
  const {
    name,
    products
  } = category;
  const list = `
          <li><a href="#">${name}</a></li>
  `;
sideMenu.insertAdjacentHTML('beforeend', list);
};

const createItemList = (list) {

};
function init() {

  getData('./db/category.json').then(function(data) {
    data.forEach(createCategoryList);
  });

  //media event
  sideBtn.addEventListener('click', function() {
    sideMenu.classList.toggle('left-sidebar_menu__active')
  });
  navBtn.addEventListener('click', function() {
    navMenu.classList.toggle('top-nav_menu__active')
  });
  //плавный скрол
  window.addEventListener('scroll', smoothScroll);
  toTop.addEventListener('click', scrollToTop);

  //open and close madal window
  content.addEventListener('click', openModal);
  modal.addEventListener('click', closeModal);

};
init();