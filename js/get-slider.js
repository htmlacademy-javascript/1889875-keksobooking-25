const slider = document.querySelector('.ad-form__slider');
const MIN_VALUE_PRICE = 0;
const MAX_VALUE_PRICE = 100000;

const getSlider = (priceHouse, typeHouse, objectHouse) => {
  noUiSlider.create(slider, {
    range: {
      min: MIN_VALUE_PRICE,
      max: MAX_VALUE_PRICE,
    },
    start: 5000,
    step: 50.0,
    connect: 'lower',
    format: {
      to: (value) => {
        if (Number.isInteger(value)) {
          return value.toFixed(0);
        }
      },
      from: (value) => parseFloat(value),
    },
  });

  slider.noUiSlider.on('update', () => {
    priceHouse.value = slider.noUiSlider.get(true).toFixed(0);
  });

  priceHouse.addEventListener('change', () => {
    slider.noUiSlider.set(priceHouse.value);
  });

  typeHouse.addEventListener('change', () => {
    if (typeHouse.value) {
      slider.noUiSlider.updateOptions({
        start: objectHouse[typeHouse.value],
      });
    }
  });
};

export {getSlider};
