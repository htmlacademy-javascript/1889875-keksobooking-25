import {createOffers} from './data.js';

const TYPE_OF_HOUSE = {
  flat: 'Квартира',
  bungalow: 'Бунгало',
  house: 'Дом',
  palace: 'Дворец',
  hotel: 'Отель',
};

//Блок с картой, где будут размещаться похожие объявления:
const similarOfferList = document.querySelector('#map-canvas');

//Находим в содержимом тега template шаблон, а в нём нужный элемент:
const similarOfferTemplate = document.querySelector('#card').content.querySelector('.popup');

//Создаем массив с похожими объявлениями:
const similarOffers = createOffers();

//Создаем функцию для получения всех доступных удобств в объявлении:
const getFeatures = (itemTemplate, element) => {
  const featuresListContainer = ('.popup__features');
  const featuresList = itemTemplate.querySelectorAll('.popup__feature');
  if (!element.features) {
    featuresListContainer.remove();
  } else {
    featuresList.forEach((featuresListItem) => {
      const isNecessary = element.features.some(
        (feature) => featuresListItem.classList.contains(`popup__feature--${feature}`),
      );
      if (!isNecessary) {
        featuresListItem.remove();
      }
    });
  }
};

//Создаем функцию для получения всех фотографий в объявлении:
const getPhotos = (itemTemplate, element) => {
  const photosList = itemTemplate.querySelector('.popup__photos');
  const photosListFragment = document.createDocumentFragment();
  if (!element.photos) {
    photosList.remove();
  } else {
    for (let i = 0; i < element.photos.length; i++) {
      const photosItem = photosList.children[0].cloneNode(true);
      photosItem.src = element.photos[i];
      photosListFragment.appendChild(photosItem);
    }
    photosList.innerHTML = '';
    photosList.append(photosListFragment);
  }
};

//Создаем функцию для получения описания в объявлении:
const getDescription = (itemTemplate, element) => {
  const descriptionOffer = itemTemplate.querySelector('.popup__description');
  if (!element.description) {
    descriptionOffer.remove();
  } else {
    descriptionOffer.textContent = element.description;
  }
};

//Создаем функцию для отрисовки объявления по шаблону и добавления в блок с картой:
const getSimilarOffer = ({autor, offer} = similarOffers[0]) => {
  const similarOfferListFragment = document.createDocumentFragment();

  const similarOfferItem = similarOfferTemplate.cloneNode(true);
  similarOfferItem.querySelector('.popup__avatar').src = autor.avatar;
  similarOfferItem.querySelector('.popup__title').textContent = offer.title;
  similarOfferItem.querySelector('.popup__text--address').textContent = offer.address;
  similarOfferItem.querySelector('.popup__text--price').innerHTML = `${offer.price} <span>₽/ночь</span>`;
  similarOfferItem.querySelector('.popup__type').textContent = TYPE_OF_HOUSE[offer.type];
  similarOfferItem.querySelector('.popup__text--capacity').textContent = `${offer.rooms} комнаты для ${offer.guests} гостей`;
  similarOfferItem.querySelector('.popup__text--time').textContent = `Заезд после ${offer.checkin}, выезд до ${offer.checkout}`;
  getFeatures(similarOfferItem, offer);
  getDescription(similarOfferItem, offer);
  getPhotos(similarOfferItem, offer);

  similarOfferListFragment.appendChild(similarOfferItem);
  similarOfferList.appendChild(similarOfferListFragment);
};

export {getSimilarOffer};
