import {getSimilarOffer} from './get-similar-offer.js';

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
const map = L.map('map-canvas')
  .on('load', (evt) => {
    getCenter(evt);
  })
  .setView({
    lat: CENTER_MAP_LOCATION.lat,
    lng: CENTER_MAP_LOCATION.lng,
  }, 12);

const initMap = (onActive) => {
  map.on('load', () => {
    onActive();
  });
};

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

const getSimilarOffers = (object) => {
  object.forEach(({author, offer, location}) => {
    createMarker({author, offer, location});
  });
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
  markerGroup.clearLayers();
  getPoint();
};

export {initMap, resetMap, getSimilarOffers};
