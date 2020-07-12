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
      topNav = document.querySelector('.top-nav'),
      footerMenu = document.querySelector('.footer_menu'),
      footerMenuCategory = document.querySelector('.footer_menu-category');

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
footerMenuCategory.insertAdjacentHTML('beforeend', list);
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
      location.hash = '';

      getData(`./db/category-db/${itemList.dataset.products}`).then(function(data) {
        data.forEach(createItemList);
  });
}
};
const getContent = ( idPage, callback) => {
  const pages = {
    service: `<p>cepturi? Voluptatibus iste eos ex! Nobis ea deleniti accusamus maiores,
    corporis sed culpa error repellat natus molestiae at excepturi, consequuntur rem voluptatem!
    Temporibus, minima odio iste ipsam sequi magni,
    iure deserunt praesentium sapiente blanditiis iusto velit dolorem numquam,
    modi consectetur placeat ullam. Eos minus sapiente distinctio officiis!</p>
    <p>Lorem, ipsum dolor sit amet consectetur adipisicing elit.
      Repellendus numquam quidem nam perferendis <p>Lorem, ipsum dolor sit amet consectetur adipisicing elit.
  Repellendus numquam quidem nam perferendis facilis obcaecati nisi iusto fugit commodi quae,
  magni esse accusamus in soluta cum ut tempore et totam facere!
  Dignissimos consequatur sequi quidem ipsa culpa accusamus officiis expedita?
  Asperiores labore laboriosam nulla enim, consectetur doloribus natus repellat,
  illum facere ea nostrum excepturi? Voluptatibus iste eos ex! Nobis ea deleniti accusamus maiores,
  corporis sed culpa error repellat natus molestiae at excepturi, consequuntur rem voluptatem!
  Temporibus, minima odio iste ipsam sequi magni,
  iure deserunt praesentium sapiente blanditiis iusto velit dolorem numquam,
  modi consectetur placeat ullam. Eos minus sapiente distinctio officiis!</p>
  <p>Lorem, ipsum dolor sit amet consectetur adipisicing elit.
    Repellendus numquam quidem nam perferendis facilis obcaecati nisi iusto fugit commodi quae,
    magni esse accusamus in soluta cum ut tempore et totam facere!
    Dignissimos consequatur sequi quidem ipsa culpa accusamus officiis expedita?
    Asperiores labore laboriosam nulla enim, consectetur doloribus natus repellat,
    illum facere ea nostrum exfacilis obcaecati nisi iusto fugit commodi quae,
      magni esse accusamus in soluta cum ut tempore et totam facere!
      Dignissimos consequatur sequi quidem ipsa culpa accusamus officiis expedita?
      Asperiores labore laboriosam nulla enim, consectetur doloribus natus repellat,
      illum facere ea nostrum excepturi? Voluptatibus iste eos ex! Nobis ea deleniti accusamus maiores,
      corporis sed culpa error repellat natus molestiae at excepturi, consequuntur rem voluptatem!
      Temporibus, minima odio iste ipsam sequi magni,
      iure deserunt praesentium sapiente blanditiis iusto velit dolorem numquam,
      modi consectetur placeat ullam. Eos minus sapiente distinctio officiis!</p>`,
    contacts: `<div class="contacts">
    <p class="contacts-phone">
      <img class="contacts-img" src="/img/phone-handset_icon-icons.com_48252.png" alt="phone">
      8 (888) 888-88-88</p>
    <p class="contscts-mail">
      <img class="contacts-img" src="/img/letter_icon-icons.com_67753.svg" alt="mail">
      emailAddress@to.fe</p>
    <p class="contacts-address">Санкт-Петербург, Новгородская улица, дом 16</p>
    <a href="/about.html" class="btn btn-primary contacts-btn">Задать вопрос</a>
    <div class="contacts-social-links">
      <ul>
        <li><a href="#"><i class="icon-facebook"></i></a></li>
        <li><a href="#"><i class="icon-instagram"></i></a></li>
        <li><a href="#"><i class="icon-vkontakte"></i></a></li>
      </ul>
    </div>
  </div>`,
    about: `<p>Lorem, ipsum dolor sit amet consectetur adipisicing elit.
    Repellendus numquam quidem nam perferendis facilis obcaecati nisi iusto fugit commodi quae,
    magni esse accusamus in soluta cum ut tempore et totam facere!
    Dignissimos consequatur sequi quidem ipsa culpa accusamus officiis expedita?
    Asperiores labore laboriosam nulla enim, consectetur doloribus natus repellat,
    illum facere ea nostrum excepturi? Voluptatibus iste eos ex! Nobis ea deleniti accusamus maiores,
    corporis sed culpa error repellat natus molestiae at excepturi, consequuntur rem voluptatem!
    Temporibus, minima odio iste ipsam sequi magni,
    iure deserunt praesentium sapiente blanditiis iusto velit dolorem numquam,
    modi consectetur placeat ullam. Eos minus sapiente distinctio officiis!</p>
    <p>Lorem, ipsum dolor sit amet consectetur adipisicing elit.
      Repellendus numquam quidem nam perferendis facilis obcaecati nisi iusto fugit commodi quae,
      magni esse accusamus in soluta cum ut tempore et totam facere!
      Dignissimos consequatur sequi quidem ipsa culpa accusamus officiis expedita?
      Asperiores labore laboriosam nulla enim, consectetur doloribus natus repellat,
      illum facere ea nostrum excepturi? Voluptatibus iste eos ex! Nobis ea deleniti accusamus maiores,
      corporis sed culpa error repellat natus molestiae at excepturi, consequuntur rem voluptatem!
      Temporibus, minima odio iste ipsam sequi magni,
      iure deserunt praesentium sapiente blanditiis iusto velit dolorem numquam,
      modi consectetur placeat ullam. Eos minus sapiente distinctio officiis!</p>
      <p>Lorem, ipsum dolor sit amet consectetur adipisicing elit.
        Repellendus numquam quidem nam perferendis facilis obcaecati nisi iusto fugit commodi quae,
        magni esse accusamus in soluta cum ut tempore et totam facere!
        Dignissimos consequatur sequi quidem ipsa culpa accusamus officiis expedita?
        Asperiores labore laboriosam nulla enim, consectetur doloribus natus repellat,
        illum facere ea nostrum excepturi? Voluptatibus iste eos ex! Nobis ea deleniti accusamus maiores,
        corporis sed culpa error repellat natus molestiae at excepturi, consequuntur rem voluptatem!
        Temporibus, minima odio iste ipsam sequi magni,
        iure deserunt praesentium sapiente blanditiis iusto velit dolorem numquam,
        modi consectetur placeat ullam. Eos minus sapiente distinctio officiis!
        <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit.
          Alias molestias culpa delectus quae deleniti possimus consequuntur ipsam!
            Dolores exercitationem repudiandae deleniti,
          soluta a eaque quaerat porro ratione, odio impedit quam.</p>`
  };
  callback(pages[idPage]);
};
if (!location.hash) {
  location.hash = "";
}
const loadingContent = () => {
  const idPage = location.hash.substr(1);

  getContent(idPage, function(page) {
    content.innerHTML = page;
  })
};
const returnMain = event => {
  const target = event.target;
  if (target.closest('a'))
  itemListPage.classList.add('hide');
  content.classList.remove('hide');
  titlePage.textContent = 'Главная';
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

  //open and close modal window
  itemListPage.addEventListener('click', openModal);
  modal.addEventListener('click', closeModal);

  sideMenu.addEventListener('click', openCatalogItem);
  footerMenuCategory.addEventListener('click', openCatalogItem);
  topNav.addEventListener('click', returnMain);

  loadingContent();

  window.addEventListener('hashchange', loadingContent);
};
init();