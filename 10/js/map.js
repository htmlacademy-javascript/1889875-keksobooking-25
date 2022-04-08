import { getSimilarOffer } from './get-similar-offer.js';
import { getFilterData } from './filter-form.js';
import { getActiveFilterForm, getActiveForm } from './get-page-mode.js';
import { getData } from './api.js';
import { debounce } from './util.js';

const AD_COUNT = 10;
const RERENDER_DELAY = 500;
const localOffers = [];

const mapFilters = document.querySelector('.map__filters');

const CENTER_MAP_LOCATION = {
  lat: 35.68950,
  lng: 139.69171,
};
const addressField = document.querySelector('[name="address"]');

//Функция для получения координат центра карты для поля с адресом:
const getCenter = (evt) => {
  const center = evt.target.getCenter();
  addressField.value = `${center.lat.toFixed(5)}, ${center.lng.toFixed(5)}`;
};

//Создаем карту
const map = L.map('map-canvas');

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
    lat: CENTER_MAP_LOCATION.lat,
    lng: CENTER_MAP_LOCATION.lng,
  },
  {
    draggable: true,
    icon: mainPinIcon,
  },
);

mainPinMarker.addTo(map);

//Функция получения координат главной метки:
const getPoint = () => {
  const point = mainPinMarker.getLatLng();
  addressField.value = `${point.lat.toFixed(5)}, ${point.lng.toFixed(5)}`;
};

mainPinMarker.on('moveend', () => {
  getPoint();
});

//Создание меток объявлений:

const icon = L.icon({
  iconUrl: './img/pin.svg',
  iconSize: [40, 40],
  iconAnchor: [20, 40],
});

const markerGroup = L.layerGroup().addTo(map);

const createMarker = ({author, offer, location}) => {
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
    .addTo(markerGroup)
    .bindPopup(getSimilarOffer({author, offer}));
};

//Функция отрисовки меток объявлений:
const renderOffers = (offers) => {
  offers.forEach(({author, offer, location}) => {
    createMarker({author, offer, location});
  });
};

//Функция скрытия попапа и удаления меток на карте:
const resetMarkerGroup = () => {
  markerGroup.closePopup();
  markerGroup.clearLayers();
};

//Функция отображения и фильтрации похожих объявлений на карте:
const createSimilarOffers = (offers) => {
  getActiveFilterForm();
  renderOffers(offers.slice(0, AD_COUNT));

  mapFilters.addEventListener('change', debounce(() => {
    resetMarkerGroup();
    renderOffers(getFilterData(offers).slice(0, AD_COUNT));
  }, RERENDER_DELAY));
};

//Функция загрузки и инициализации карты:
const initMap = () => {
  map
    .on('load', (evt) => {
      getCenter(evt);
      getActiveForm();
      getData((offers) => {
        localOffers.push(...offers);
        createSimilarOffers(localOffers);
      });
    })
    .setView({
      lat: CENTER_MAP_LOCATION.lat,
      lng: CENTER_MAP_LOCATION.lng,
    }, 12);
};

//Функция очистки карты и возвращения ее в исходное состояние:
const resetMap = () => {
  map.setView({
    lat: CENTER_MAP_LOCATION.lat,
    lng: CENTER_MAP_LOCATION.lng,
  }, 12);
  mainPinMarker.setLatLng({
    lat: CENTER_MAP_LOCATION.lat,
    lng: CENTER_MAP_LOCATION.lng,
  });
  resetMarkerGroup();
  getPoint();
  renderOffers(localOffers.slice(0, AD_COUNT));
};

export {initMap, resetMap};
