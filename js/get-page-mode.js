const form = document.querySelector('.ad-form');
const slider = form.querySelector('.ad-form__slider');
const adFieldsets = form.querySelectorAll('fieldset');
const mapFilters = document.querySelector('.map__filters');
const filterFormFields = mapFilters.querySelectorAll('.map__filter');
const featuresFilterFormField = mapFilters.querySelector('.map__features');

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

//Функция для перевода страницы в активное состояние:
const getActiveForm = () => {
  mapFilters.classList.remove('map__filters--disabled');
  getDisabledFilterForm(false);
  form.classList.remove('ad-form--disabled');
  getDisabledAdForm(false);
  slider.removeAttribute('disabled');
};

export {getInactiveForm, getActiveForm};
