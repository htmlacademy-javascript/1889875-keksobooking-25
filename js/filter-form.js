const DEFAULT_VALUE = 'any';

const housingType = document.querySelector('#housing-type');
const housingPrice = document.querySelector('#housing-price');
const housingRooms = document.querySelector('#housing-rooms');
const housingGuests = document.querySelector('#housing-guests');
const housingFeatures = document.querySelector('#housing-features');

// window.console.log(features);//---------------------------------------------------

const filterType = (offers) => {
  if (housingType.value === DEFAULT_VALUE) {
    return true;
  } else {
    return offers.offer.type === housingType.value;
  }
};

const filterPrice = (offers) => {
  if (housingPrice.value === DEFAULT_VALUE) {
    return true;
  } else if (offers.offer.price < 10000 && housingPrice.value === 'low') {
    return true;
  } else if (offers.offer.price >= 10000 && offers.offer.price <= 50000 && housingPrice.value === 'middle') {
    return true;
  } else if (offers.offer.price > 50000 && housingPrice.value === 'high') {
    return true;
  }
};

const filterRooms = (offers) => {
  if (housingRooms.value === DEFAULT_VALUE) {
    return true;
  } else {
    return offers.offer.rooms === Number(housingRooms.value);
  }
};

const filterGuests = (offers) => {
  if (housingGuests.value === DEFAULT_VALUE) {
    return true;
  } else {
    return offers.offer.guests === Number(housingGuests.value);
  }
};

const filterFeatures = (offers) => {// не работает данная функция!!!!!!!!!!!!!!!!!
  const arr = [];
  const features = housingFeatures.querySelectorAll('.map__checkbox:checked');
  for (const feature of features) {
    arr.push(feature.value);
  }
  window.console.log(arr);//проверка - массив с чекнутыми чекбоксами выводит в консоль

  arr.every((feature) => {
    if (arr.length === 0) {
      return true;
    } else {
      return offers.offer.features.includes(feature);
    }
  });
};

const getFilterData = (offers) => offers.filter((offer) => filterType(offer) && filterPrice(offer) && filterRooms(offer) && filterGuests(offer) && filterFeatures(offer));

export {getFilterData};
