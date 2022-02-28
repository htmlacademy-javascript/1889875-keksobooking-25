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
