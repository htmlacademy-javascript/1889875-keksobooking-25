import { initMap, getSimilarOffers } from './map.js';
import { getInactiveForm, getActiveForm } from './get-page-mode.js';
import { validateForm } from './form.js';
import { setFormSubmit } from './submit-form.js';
import { getData } from './api.js';

const AD_COUNT = 10;

getInactiveForm();

validateForm();

initMap(getActiveForm());

getData((offers) => {
  getSimilarOffers(offers.slice(0, AD_COUNT));
});

setFormSubmit();
