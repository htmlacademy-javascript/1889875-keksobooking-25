const DEFAULT_VALUE = 'any';

const PriceRange = {
  LOW: 10000,
  HIGH: 50000,
};

const PriceLevel = {
  LOW: 'low',
  MIDDLE: 'middle',
  HIGH: 'high',
};

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
  switch (housingPrice.value) {
    case PriceLevel.LOW:
      return offer.offer.price < PriceRange.LOW;
    case PriceLevel.MIDDLE:
      return offer.offer.price >= PriceRange.LOW && offer.offer.price <= PriceRange.HIGH;
    case PriceLevel.HIGH:
      return offer.offer.price > PriceRange.HIGH;
    case DEFAULT_VALUE:
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
