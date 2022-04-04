import {isEscapeKey} from './util.js';
import {sendData} from './api.js';
import {resetForm, validate} from './form.js';

const form = document.querySelector('.ad-form');
const submitButton = form.querySelector('.ad-form__submit');
const messageSuccessItem = document.querySelector('#success').content.querySelector('.success').cloneNode(true);
const messageErrorItem = document.querySelector('#error').content.querySelector('.error').cloneNode(true);


//Функции для блокировки и разблокировки кнопки "Опубликовать":
const blockSubmitButton = () => {
  submitButton.disabled = true;
  submitButton.textContent = 'Публикую...';
};

const unblockSubmitButton = () => {
  submitButton.disabled = false;
  submitButton.textContent = 'Опубликовать';
};

//Функции для добавления и удаления сообщений об успешной отправке объявления и об ошибке отправки объявления:
const onMessageEscKeydown = (evt) => {
  if (isEscapeKey(evt)) {
    evt.preventDefault();
    closeMessage();
  }
};

const onMessageClick = () => {
  closeMessage();
};

function closeMessage () {
  document.body.lastChild.remove();
  document.removeEventListener('keydown', onMessageEscKeydown);
  document.removeEventListener('click', onMessageClick);
}

const openMessage = (element) => {
  document.body.appendChild(element);
  document.addEventListener('keydown', onMessageEscKeydown);
  document.addEventListener('click', onMessageClick);
};

//Функция отправки формы создания объявления:
const setFormSubmit = () => {
  form.addEventListener('submit', (evt) => {
    evt.preventDefault();
    const isValid = validate();
    if (isValid) {
      blockSubmitButton();
      sendData(
        () => {
          resetForm();
          openMessage(messageSuccessItem);
          unblockSubmitButton();
        },
        () => {
          openMessage(messageErrorItem);
          unblockSubmitButton();
        },
        new FormData(evt.target),
      );
    }
  });
};

export {setFormSubmit};
