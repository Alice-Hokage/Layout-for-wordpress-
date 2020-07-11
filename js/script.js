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
      titlePage = document.querySelector('.title-page'),
      card = document.querySelector('.card'),
      itemListPage = document.querySelector('.item-list'),
      logo = document.querySelector('.logo');

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
const createCategoryList = category => {
  const {
    name,
    products
  } = category;
  const list = `
          <li class="list" data-products ='${products}' data-name='${[name]}'><a>${name}</a></li>
  `;
sideMenu.insertAdjacentHTML('beforeend', list);
};

const createItemList = (item) => {
  const { id, title, description, price } = item;

const listItem = `
                <div class="col-md-6">
                  <div class="object-card">
                    <h2 class="object-card_title">${title}</h2>
                    <p> ${description}</p>
                    <p class="object-card_price">${price} ₽</p>
                    <a class="btn object-card_btn btn-primary" id="${id}">Buy</a>
                  </div>
                </div>
              
`;
itemListPage.insertAdjacentHTML('beforeend', listItem);
};
const openCatalogItem = event => {
  const target = event.target;
  const itemList = target.closest('.list');

  const itemData = itemList.dataset.name.split(',');
  const [name] = itemData;

  itemListPage.textContent = '';
  if (itemList) {
      content.classList.add('hide');
      itemListPage.classList.remove('hide');
      titlePage.textContent = name;

      getData(`./db/${itemList.dataset.products}`).then(function(data) {
        data.forEach(createItemList);
  });
}
};
const returnMain = () => {
  itemListPage.classList.add('hide');
  content.classList.remove('hide');
};
const createMenu = item => {
  const { title } = item;
  const listMenu = `
  <li><a>${title}</a></li>
  `;
  navMenu.insertAdjacentHTML('beforeend', listMenu);
};
function init() {

  getData('./db/category.json').then(function(data) {
    data.forEach(createCategoryList);
  });
  getData('./db/menu.json').then(function(data) {
    data.forEach(createMenu);
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

  //open and close modal window
  itemListPage.addEventListener('click', openModal);
  modal.addEventListener('click', closeModal);

  sideMenu.addEventListener('click', openCatalogItem);

  logo.addEventListener('click', returnMain);
};
init();