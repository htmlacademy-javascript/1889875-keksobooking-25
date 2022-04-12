import {resetMap} from './map.js';
import {getSlider} from './get-slider.js';
import { resetImages } from './photo.js';

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

const pristine = window.Pristine(form, {
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

const NumberRoom = {
  SINGLE_ROOM: '1',
  DOUBLE_ROOMS: '2',
  TRIPLE_ROOMS: '3',
  HUNDRED_ROOMS: '100',
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
  switch (roomsField.value) {
    case NumberRoom.SINGLE_ROOM:
      return '1 комната для 1 гостя';
    case NumberRoom.DOUBLE_ROOMS:
      return '2 комнаты для 1 или 2 гостей';
    case NumberRoom.TRIPLE_ROOMS:
      return '3 комнаты для 1, 2 или 3 гостей';
    case NumberRoom.HUNDRED_ROOMS:
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

//Функция создания слайдера с ценой:
getSlider(priceField, typeField, MIN_PRICE_OF_HOUSING);

// Очищаем поле с ценой перед вводом значения:
priceField.addEventListener('focus', () => {
  priceField.value = '';
});

const validate = (element) => pristine.validate(element);

const validateForm = () => {
  //Валидация полей количеством комнат и количеством гостей:
  roomsField.addEventListener('change', () => {
    validate(capacityField);
  });
  //Валидация поля тип жилья с ценой:
  typeField.addEventListener('change', () => {
    getTypePrice();
    validate(priceField);
  });

  priceField.addEventListener('focus', () => {
    getTypePrice();
  });

  //Синхронизации полей «Время заезда» и «Время выезда»:
  timeinField.addEventListener('change', () => {
    getCheckOutTime();
  });
  timeoutField.addEventListener('change', () => {
    getCheckInTime();
  });
};

//Функция для очистки полей формы при успешной отправке формы или её очистке:
const resetForm = () => {
  mapFilters.reset();
  form.reset();
  resetImages();
  slider.noUiSlider.updateOptions({
    start: 5000,
  });
  pristine.reset();
  resetMap();
};

resetButton.addEventListener('click', (evt) => {
  evt.preventDefault();
  resetForm();
});

export {validateForm, resetForm, validate};
