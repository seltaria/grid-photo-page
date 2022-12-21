ymaps.ready(init);
function init() {
  var myMap = new ymaps.Map("contacts__map", {
    center: [55.76953456898229, 37.63998549999998],
    zoom: 15
  });

  var myGeoObject = new ymaps.Placemark([55.76953456898229, 37.63998549999998], {}, {
    iconLayout: 'default#image',
    iconImageHref: '../img/location.svg',
    iconImageSize: [12, 12],
  });

  myMap.geoObjects.add(myGeoObject);
};

const searchField = document.querySelector('.nav__search-field');
const searchInput = document.querySelector('.nav__search-input');
const searchBtn = document.querySelector('.nav__search');
const closeBtn = document.querySelector('.nav__search-close');

searchBtn.addEventListener('click', (e) => {
  e.preventDefault();
  searchField.style.transform = 'translate(0px)';
  searchInput.tabIndex = '0';
  closeBtn.tabIndex = '0';
  searchBtn.tabIndex = '-1';
});

function closeSearchInput() {
  closeBtn.addEventListener('click', (e) => {
    e.preventDefault();
    searchField.style.transform = 'translate(600px)';
    searchField.firstChild.value = '';
    searchInput.tabIndex = '-1';
    closeBtn.tabIndex = '-1';
    searchBtn.tabIndex = '0';
  })
}
closeSearchInput();

const form = document.querySelector('.about__subscription-form');
const input = document.querySelector('.about__subscription-input');
const error = document.querySelector('.about__subscription-error');

const contactsForm = document.querySelector('.contacts__form');
const contactsInputEmail = document.querySelector('.contacts__form-input-email');
const contactsErrorEmail = document.querySelector('.contacts__form-email-error');
const contactsInputName = document.querySelector('.contacts__form-input-name');
const contactsErrorName = document.querySelector('.contacts__form-name-error');

function mailValidation(form, input, error) {
  const EMAIL_REGEXP = /^(([^<>()[\].,;:\s@"]+(\.[^<>()[\].,;:\s@"]+)*)|(".+"))@(([^<>()[\].,;:\s@"]+\.)+[^<>()[\].,;:\s@"]{2,})$/iu;
  form.addEventListener('submit', (event) => {
    if (EMAIL_REGEXP.test(input.value)) {
      input.style.borderColor = 'transparent';
      error.style.display = 'none';
      return;
    }
    event.preventDefault();
    input.style.borderColor = 'rgba(240, 102, 102, 1)';
    error.style.display = 'block';
  })
  input.addEventListener('input', () => {
    input.style.borderColor = 'transparent';
    error.style.display = 'none';
  })
}
mailValidation(form, input, error);
mailValidation(contactsForm, contactsInputEmail, contactsErrorEmail);

function cyrillicValidation(form, input, error) {
  const CYR_REGEXP = /^[А-ЯЁа-яё]*$/;
  form.addEventListener('submit', (event) => {
    if (CYR_REGEXP.test(input.value) && input.value) {
      input.style.borderColor = 'transparent';
      error.style.display = 'none';
      return;
    }
    event.preventDefault();
    input.style.borderColor = 'rgba(240, 102, 102, 1)';
    error.style.display = 'block';
  })
  input.addEventListener('input', () => {
    input.style.borderColor = 'transparent';
    error.style.display = 'none';
  })
}
cyrillicValidation(contactsForm, contactsInputName, contactsErrorName);

const burger = document.querySelector('.header__burger');
window.addEventListener('resize', () => {
  tl.reverse();
  if (window.innerWidth > 630) {
    burger.style.display = 'none';
  } else {
    burger.style.display = 'block';
  }
})

gsap.timeline()

let tl = gsap.timeline({ paused: true });
tl
  .to(".body", { duration: 0, overflowY: 'hidden', ease: 'none' })
  .to(".header__burger", { duration: 0, display: 'none', overflow: 'hidden', ease: 'none' })
  .to(".burger", { duration: 0, display: 'block', overflow: 'hidden', ease: 'none' })
  .fromTo(".burger", { x: -80, opacity: 0 }, { duration: 0.3, x: 0, opacity: 1 })

document.querySelector('.header__burger-button').addEventListener('click', function () {
  tl.play();
});

document.querySelector('.burger__button').addEventListener('click', function () {
  tl.reverse();
});


function createMapBtn() {
  const map = document.querySelector('.contacts__location');
  const mapBtn = document.createElement('button');
  mapBtn.className = 'map__button';
  mapBtn.textContent = 'Открыть адрес';
  map.append(mapBtn);
  return mapBtn;
}


function sideMapMenu() {
  const map = document.querySelector('.contacts__location');
  const button = createMapBtn();
  button.addEventListener('click', () => {
    map.nextSibling.style.transform = 'translate(0px, 0px)';
    button.style.visibility = 'hidden';
    button.style.opacity = '0';
  })
  map.nextSibling.firstChild.addEventListener('click', () => {
    if (window.innerWidth > 1024) {
      map.nextSibling.style.transform = 'translate(-500px)';
      button.style.visibility = 'visible';
      button.style.opacity = '1';
    } else {
      map.nextSibling.style.transform = 'translate(0px, 300px)';
      button.style.visibility = 'visible';
      button.style.opacity = '1';
    }
  })
}
sideMapMenu();
