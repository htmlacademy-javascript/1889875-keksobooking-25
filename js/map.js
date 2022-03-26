import {getActiveForm} from './form.js';
import {createOffers} from './data.js';
import {getSimilarOffer} from './get-similar-offer.js';

const address = document.querySelector('[name="address"]');

//Функция для получения координат центра карты
const getCenter = (evt) => {
  const center = evt.target.getCenter();
  address.value = `${center.lat.toFixed(5)}, ${center.lng.toFixed(5)}`;
};

//Создаем карту
const map = L.map('map-canvas')
  .on('load', (evt) => {
    getCenter(evt);
    getActiveForm();//перевод страницы в активное состояние
  })
  .setView({
    lat: 35.68950,
    lng: 139.69171,
  }, 12);

L.tileLayer(
  'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
  {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
  },
).addTo(map);

//Создаем на карте главную метку:
const mainPinIcon = L.icon({
  iconUrl: './img/main-pin.svg',
  iconSize: [52, 52],
  iconAnchor: [26, 52],
});

const mainPinMarker = L.marker(
  {
    lat: 35.68950,
    lng: 139.69171,
  },
  {
    draggable: true,
    icon: mainPinIcon,
  },
);

mainPinMarker.addTo(map);

const getPoint = () => {
  const point = mainPinMarker.getLatLng();
  address.value = `${point.lat.toFixed(5)}, ${point.lng.toFixed(5)}`;
};

mainPinMarker.on('moveend', () => {
  getPoint();
});

//Создание меток объявлений:

const similarOffers = createOffers();

const icon = L.icon({
  iconUrl: './img/pin.svg',
  iconSize: [40, 40],
  iconAnchor: [20, 40],
});

similarOffers.forEach(({autor, offer, location}) => {
  const {lat, lng} = location;
  const marker = L.marker(
    {
      lat,
      lng,
    },
    {
      icon,
    },
  );

  marker
    .addTo(map)
    .bindPopup(getSimilarOffer({autor, offer}));
});

export {getPoint};
