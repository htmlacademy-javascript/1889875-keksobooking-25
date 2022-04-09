const DEFAULT_VALUE = 'any';

const housingType = document.querySelector('#housing-type');
const housingPrice = document.querySelector('#housing-price');
const housingRooms = document.querySelector('#housing-rooms');
const housingGuests = document.querySelector('#housing-guests');
const housingFeatures = document.querySelector('#housing-features');

const filterType = (offer) => {
  if (housingType.value === DEFAULT_VALUE) {
    return true;
  } else {
    return offer.offer.type === housingType.value;
  }
};

const filterPrice = (offer) => {
  if (housingPrice.value === DEFAULT_VALUE) {
    return true;
  } else if (offer.offer.price < 10000 && housingPrice.value === 'low') {
    return true;
  } else if (offer.offer.price >= 10000 && offer.offer.price <= 50000 && housingPrice.value === 'middle') {
    return true;
  } else if (offer.offer.price > 50000 && housingPrice.value === 'high') {
    return true;
  }
};

const filterRooms = (offer) => {
  if (housingRooms.value === DEFAULT_VALUE) {
    return true;
  } else {
    return offer.offer.rooms === Number(housingRooms.value);
  }
};

const filterGuests = (offer) => {
  if (housingGuests.value === DEFAULT_VALUE) {
    return true;
  } else {
    return offer.offer.guests === Number(housingGuests.value);
  }
};

const filterFeatures = (offer) => {
  const checkFeatures = housingFeatures.querySelectorAll('input:checked');

  if (checkFeatures.length) {
    if (offer.offer.features) {
      return Array.from(checkFeatures).every((checkbox) => offer.offer.features.includes(checkbox.value));
    }
  } else {
    return checkFeatures.length === 0;
  }
};

const getFilterData = (offers) => offers.filter((offer) => filterType(offer) && filterPrice(offer) && filterRooms(offer) && filterGuests(offer) && filterFeatures(offer));

export {getFilterData};
