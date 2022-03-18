import {getRandomPositiveFloat, getUniqueNumber, getRandomArrayElement, getRandomPositiveInteger, getArray} from './util.js';

const AD_COUNT = 10;
const MIN_PRICE = 1;
const MAX_PRICE = 10000;
const MIN_ROOMS = 1;
const MAX_ROOMS = 6;
const MIN_GUESTS = 1;
const MAX_GUESTS = 6;
const MIN_LAT = 35.65000;
const MAX_LAT = 35.70000;
const MIN_LNG = 139.70000;
const MAX_LNG = 139.80000;

const TITLE = [
  'Уютная квартира',
  'Срочно сдам комнату',
  'Квартира недорого',
  'Посуточная аренда',
  'Квартира на сутки',
  'Квартира-студия',
  'Таунхаус',
  'Уютный домик',
  'Почасовая аренда',
  'Дача'
];

const TYPE = ['palace', 'flat', 'house', 'bungalow', 'hotel'];
const CHECK_IN_OUT_TIME = ['12:00', '13:00', '14:00'];
const FEATURES = ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'];
const DESCRIPTION = [
  'Недалеко от станции метро',
  'Тихое место возле парка',
  'В центре города',
  '',
  'Поблизости кафе и рестораны',
  'Ищу соседа по квартире',
  'Со всеми удобствами и кухней',
  'Идеальное место для отдыха',
  '',
  'Уютная квартира в стиле лофт',
];

const PHOTOS = [
  'https://assets.htmlacademy.ru/content/intensive/javascript-1/keksobooking/duonguyen-8LrGtIxxa4w.jpg',
  'https://assets.htmlacademy.ru/content/intensive/javascript-1/keksobooking/brandon-hoogenboom-SNxQGWxZQi0.jpg',
  'https://assets.htmlacademy.ru/content/intensive/javascript-1/keksobooking/claire-rendall-b6kAwr1i0Iw.jpg',
];

//Функция для создания массива с номерами изображений (аватарок):
const createAvatarNumber = () => Array.from({length: AD_COUNT}, (v, i) => ++i);

//Функция для создание объекта похожего объявления:
const createAd = () => {
  const location = {
    lat: getRandomPositiveFloat(MIN_LAT, MAX_LAT, 5),
    lng: getRandomPositiveFloat(MIN_LNG, MAX_LNG, 5),
  };
  return {
    autor: {
      avatar: `img/avatars/user${  getUniqueNumber()  }.png`,
    },
    offer: {
      title: getRandomArrayElement(TITLE),
      address: `${location.lat}, ${location.lng}`,
      price: getRandomPositiveInteger(MIN_PRICE, MAX_PRICE),
      type: getRandomArrayElement(TYPE),
      rooms: getRandomPositiveInteger(MIN_ROOMS, MAX_ROOMS),
      guests: getRandomPositiveInteger(MIN_GUESTS, MAX_GUESTS),
      checkin: getRandomArrayElement(CHECK_IN_OUT_TIME),
      checkout: getRandomArrayElement(CHECK_IN_OUT_TIME),
      features: getArray(FEATURES),
      description: getRandomArrayElement(DESCRIPTION),
      photos: getArray(PHOTOS),
    },
    location,
  };
};

//Создание массива объектов похожих объявлений:
const createOffers = () => Array.from({length: AD_COUNT}, createAd);

export {createOffers, createAvatarNumber};
