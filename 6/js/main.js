import {createOffers} from './data.js';
import {getSimilarOffer} from './get-similar-offer.js';
import {validateForm} from './form.js';

//Создаем массив с похожими объявлениями:
const similarOffers = createOffers();

getSimilarOffer(similarOffers[0]);

validateForm();
