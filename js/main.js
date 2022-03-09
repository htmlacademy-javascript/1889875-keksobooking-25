// источник - https://learn.javascript.ru/task/random-int-min-max
function getRandomInteger(min, max) {
  if (min > max || min < 0 || max < 0) {
    return 'Ошибка!';
  }
  if (min <= max && min >= 0 && max >= 0 ) {
    // случайное число от min до (max+1)
    const randomInteger = min + Math.random() * (max + 1 - min);
    return Math.floor(randomInteger);
  }
}

getRandomInteger(0, 55);

function getRandomNumber(min, max, countSign) {
  if (min > max || min < 0 || max < 0) {
    return 'Ошибка!';
  }
  if (min <= max && min >= 0 && max >= 0 ) {
    // случайное число от min до (max+1)
    const rand = min + Math.random() * (max + 1 - min);
    return Number(rand.toFixed(countSign));
  }
}

getRandomNumber(0, 55, 2);

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
  'В историческом центре',
  'Поблизости кафе и рестораны',
  'Ищу соседа по квартире',
  'Со всеми удобствами и кухней',
  'Идеальное место для отдыха',
  'Большие и светлые комнаты',
  'Уютная квартира в стиле лофт',
];

const PHOTOS = [
  'https://assets.htmlacademy.ru/content/intensive/javascript-1/keksobooking/duonguyen-8LrGtIxxa4w.jpg',
  'https://assets.htmlacademy.ru/content/intensive/javascript-1/keksobooking/brandon-hoogenboom-SNxQGWxZQi0.jpg',
  'https://assets.htmlacademy.ru/content/intensive/javascript-1/keksobooking/claire-rendall-b6kAwr1i0Iw.jpg',
];

//Функция для нахождения случайного целого положительного числа:
const getRandomPositiveInteger = (a, b) => {
  const lower = Math.ceil(Math.min(Math.abs(a), Math.abs(b)));
  const upper = Math.floor(Math.max(Math.abs(a), Math.abs(b)));
  const result = Math.random() * (upper - lower + 1) + lower;
  return Math.floor(result);
};

//Функция для нахождения случайного числа с плавающей точкой из заданного диапазона
const getRandomPositiveFloat = (a, b, digits = 1) => {
  const lower = Math.min(Math.abs(a), Math.abs(b));
  const upper = Math.max(Math.abs(a), Math.abs(b));
  const result = Math.random() * (upper - lower) + lower;
  return +result.toFixed(digits);
};

//Функция для нахождения случайного элемента массива:
const getRandomArrayElement = (elements) => elements[getRandomPositiveInteger(0, elements.length - 1)];

//Функция для создания массива случайной длины без повтора элементов:
const getArray = (arr) => {
  const maxLength = arr.length;
  const lengthOfArray = getRandomPositiveInteger(1, maxLength);
  const array = [];
  for(let i = 0; i < lengthOfArray; i++) {
    const indexOfEl = getRandomPositiveInteger(0, maxLength - 1);
    const el = arr[indexOfEl];
    if (!array.includes(el)) {
      array.push(el);
    }
  }
  return array;
};

//Функция для нахождения случайного уникального числа в заданном диапазоне:
const avatarNumber = Array.from({length: AD_COUNT}, (v, i) => ++i);

const getUniqueNumber = () => {
  const uniqueNumber = avatarNumber.splice(getRandomPositiveInteger(0, avatarNumber.length - 1), 1);
  if (uniqueNumber < 10) {
    return `0${  uniqueNumber}`;
  } return uniqueNumber;
};

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
const offers = Array.from({length: AD_COUNT}, createAd);

window.console.log(offers);
