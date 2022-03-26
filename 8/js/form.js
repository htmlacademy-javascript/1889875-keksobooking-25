import {getPoint} from './map.js';

const form = document.querySelector('.ad-form');
const roomsField = form.querySelector('[name="rooms"]');
const capacityField = form.querySelector('[name="capacity"]');
const typeField = document.querySelector('[name="type"]');
const priceField = document.querySelector('[name="price"]');
const timeinField = document.querySelector('#timein');
const timeoutField = document.querySelector('#timeout');
const adFieldsets = form.querySelectorAll('fieldset');
const mapFilters = document.querySelector('.map__filters');
const filterFormFields = mapFilters.querySelectorAll('.map__filter');
const featuresFilterFormField = mapFilters.querySelector('.map__features');
const resetButton = document.querySelector('.ad-form__reset');
const slider = form.querySelector('.ad-form__slider');
const MIN_VALUE_PRICE = 0;
const MAX_VALUE_PRICE = 100000;

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

//Функция добавления/удаления интерактивным полям формы фильтрации атрибута disabled:
const getDisabledFilterForm = (value) => {
  for (const filterFormField of filterFormFields) {
    filterFormField.disabled = value;
  }
  featuresFilterFormField.disabled = value;
};
//Функция добавления/удаления интерактивным полям формы обьявлений атрибута disabled:
const getDisabledAdForm = (value) => {
  for (const adFieldset of adFieldsets) {
    adFieldset.disabled = value;
  }
};
//Функция для перевода страницы в неактивное состояние:
const getInactiveForm = () => {
  mapFilters.classList.add('map__filters--disabled');
  getDisabledFilterForm(true);
  form.classList.add('ad-form--disabled');
  getDisabledAdForm(true);
  slider.setAttribute('disabled', true);
};

document.addEventListener('load', getInactiveForm());

//Функция для перевода страницы в активное состояние:
const getActiveForm = () => {
  mapFilters.classList.remove('map__filters--disabled');// д.б. доступна только после загрузки данных с сервера
  getDisabledFilterForm(false);//д.б. доступны только после загрузки данных с сервера
  form.classList.remove('ad-form--disabled');
  getDisabledAdForm(false);
  slider.removeAttribute('disabled');
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

//Создание слайдера:

priceField.value = 5000;

noUiSlider.create(slider, {
  range: {
    min: MIN_VALUE_PRICE,
    max: MAX_VALUE_PRICE,
  },
  start: 5000,
  step: 100,
  connect: 'lower',
  format: {
    to: function (value) {
      if (Number.isInteger(value)) {
        return value.toFixed(0);
      }
    },
    from: function (value) {
      return parseFloat(value);
    },
  },
});

slider.noUiSlider.on('update', () => {
  priceField.value = slider.noUiSlider.get();
});

priceField.addEventListener('change', () => {
  slider.noUiSlider.set(priceField.value);
});

typeField.addEventListener('change', () => {
  if (typeField.value) {
    slider.noUiSlider.updateOptions({
      start: MIN_PRICE_OF_HOUSING[typeField.value],
    });
  }
});
//Очищаем поле с ценой перед вводом значения:
priceField.addEventListener('focus', () => {
  priceField.value = '';
});

const resetForm = (evt) => {
  evt.preventDefault();
  mapFilters.reset();
  form.reset();
  pristine.reset();
  // mainPinMarker.setLatLng({
  //   lat: 35.68950,
  //   lng: 139.69171,
  // });
  getPoint();//получение координат метки
  //удалить балун
};

//Очистка полей форм фильтрации и создания объявления:
resetButton.addEventListener('click', resetForm);//при успешн отпр формы или при сбросе настроек - добавить обработчик

export {validateForm, getActiveForm};
