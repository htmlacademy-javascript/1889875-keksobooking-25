const form = document.querySelector('.ad-form');
const roomsField = form.querySelector('[name="rooms"]');
const capacityField = form.querySelector('[name="capacity"]');

const pristine = new Pristine(form, {
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

//Функция для проверки полей с количеством комнат и гостей:
const validateRooms = () => ROOMS_OPTION[roomsField.value].includes(capacityField.value);

//Функция для генерации сообщения о некорректном вводе данных:
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

//Описание валидации для полей с количеством комнат и количеством гостей:
pristine.addValidator(capacityField, validateRooms, getRoomsErrorMessage);

const validateForm = () => {
  //Валидация полей количеством комнат и количеством гостей:
  roomsField.addEventListener('change', () => {
    pristine.validate(capacityField);
  });

  //Валидация формы объявления:
  form.addEventListener('submit', (evt) => {
    const isValid = pristine.validate();
    if (isValid) {
      window.console.log('Можно отправлять');
    } else {
      evt.preventDefault();
      window.console.log('Форма невалидна');
    }
  });
};

export {validateForm};
