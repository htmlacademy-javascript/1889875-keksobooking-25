import {resetMap} from './map.js';
import {getSlider} from './get-slider.js';

const form = document.querySelector('.ad-form');
const mapFilters = document.querySelector('.map__filters');
const roomsField = form.querySelector('[name="rooms"]');
const capacityField = form.querySelector('[name="capacity"]');
const typeField = document.querySelector('[name="type"]');
const priceField = document.querySelector('[name="price"]');
const timeinField = document.querySelector('#timein');
const timeoutField = document.querySelector('#timeout');
const resetButton = document.querySelector('.ad-form__reset');
const slider = form.querySelector('.ad-form__slider');

const pristine = new window.Pristine(form, {
  classTo: 'form__item',
  errorClass: 'form__item--invalid',
  successClass: 'form__item--valid',
  errorTextParent: 'form__item',
  errorTextTag: 'span',
  errorTextClass: 'form__error',
});

const ROOMS_OPTION = {
  '1': ['1'],
  '2': ['1', '2'],
  '3': ['1', '2', '3'],
  '100': ['0'],
};

const MIN_PRICE_OF_HOUSING = {
  'bungalow': 0,
  'flat': 1000,
  'hotel': 3000,
  'house': 5000,
  'palace': 10000,
};

const TIME = {
  '12:00': '12:00',
  '13:00': '13:00',
  '14:00': '14:00',
};

//Функция для валидации полей с количеством комнат и гостей:
const validateRooms = () => ROOMS_OPTION[roomsField.value].includes(capacityField.value);

//Функция для генерации сообщения о некорректном соотношении комнат и гостей:
const getRoomsErrorMessage = () => {
  const roomsValue = Number(roomsField.value);
  const capacityValue = Number(capacityField.value);
  if (roomsValue === 1 && capacityValue !== 1) {
    return '1 комната для 1 гостя';
  } else if (roomsValue === 2 && (capacityValue === 3 || capacityValue === 0)) {
    return '2 комнаты для 1 или 2 гостей';
  } else if (roomsValue === 3 && capacityValue === 0) {
    return '3 комнаты для 1, 2 или 3 гостей';
  } else if (roomsValue === 100 && capacityValue !== 0) {
    return '100 комнат не для гостей';
  }
};

//Функция для изменения атрибута минимального значения и плейсхолдера поля с ценой:
const getTypePrice = () => {
  priceField.placeholder = MIN_PRICE_OF_HOUSING[typeField.value];
  priceField.min = MIN_PRICE_OF_HOUSING[typeField.value];
};

//Функция для валидации поля с ценой:
const validatePrice = () => priceField.value >= MIN_PRICE_OF_HOUSING[typeField.value];

//Функция для генерации сообщения о некорректном вводе цены:
const getPriceErrorMessage = () => {
  if (priceField.value < MIN_PRICE_OF_HOUSING[typeField.value]) {
    return `Минимальная цена за ночь ${priceField.min}`;
  }
};

//Функции для синхронизации полей «Время заезда» и «Время выезда»:
const getCheckOutTime = () => {
  timeoutField.value = TIME[timeinField.value];
};
const getCheckInTime = () => {
  timeinField.value = TIME[timeoutField.value];
};

//Описание валидации для полей с количеством комнат и гостей и поля с ценой:
pristine.addValidator(capacityField, validateRooms, getRoomsErrorMessage);
pristine.addValidator(priceField, validatePrice, getPriceErrorMessage);

const validateForm = () => {
  //Валидация полей количеством комнат и количеством гостей:
  roomsField.addEventListener('change', () => {
    pristine.validate(capacityField);
  });
  //Валидация поля тип жилья с ценой:
  typeField.addEventListener('change', () => {
    getTypePrice();
    pristine.validate(priceField);
  });

  priceField.addEventListener('focus', getTypePrice());

  //Синхронизации полей «Время заезда» и «Время выезда»:
  timeinField.addEventListener('change', () => {
    getCheckOutTime();
  });
  timeoutField.addEventListener('change', () => {
    getCheckInTime();
  });
  //Валидация формы объявления:
  form.addEventListener('submit', (evt) => {
    const isValid = pristine.validate();
    if (!isValid) {
      evt.preventDefault();
    }
  });
};

getSlider(priceField, typeField, MIN_PRICE_OF_HOUSING);

// Очищаем поле с ценой перед вводом значения:
priceField.addEventListener('focus', () => {
  priceField.value = '';
});

//Функция для очистки полей форм фильтрации и создания объявления:
const resetForm = (evt) => {
  evt.preventDefault();
  mapFilters.reset();
  form.reset();
  slider.noUiSlider.updateOptions({
    start: 5000,
  });
  pristine.reset();
  resetMap();
};

resetButton.addEventListener('click', resetForm);

export {validateForm};
