import {createAvatarNumber} from './data.js';

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
const getUniqueNumber = () => {
  const avatarNumber = createAvatarNumber();
  const uniqueNumber = avatarNumber.splice(getRandomPositiveInteger(0, avatarNumber.length - 1), 1);
  if (uniqueNumber < 10) {
    return `0${  uniqueNumber}`;
  } return uniqueNumber;
};

export {getRandomPositiveFloat, getUniqueNumber, getRandomArrayElement, getRandomPositiveInteger, getArray};
