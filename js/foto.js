const FILE_TYPES = ['gif', 'jpg', 'jpeg', 'png'];

const fieldAvatarUpload = document.querySelector('#avatar');
const avatarPreview = document.querySelector('.ad-form-header__preview img');
const fieldFotoUpload = document.querySelector('#images');
const fotoPreviewContainer = document.querySelector('.ad-form__photo');

//Добавление превью аватарки:
fieldAvatarUpload.addEventListener('change', () => {
  const file = fieldAvatarUpload.files[0];
  const fileName = file.name.toLowerCase();

  const matches = FILE_TYPES.some((it) => fileName.endsWith(it));

  if (matches) {
    avatarPreview.src = URL.createObjectURL(file);
  }
});

//Добавление превью фото жилья:
const createImage = (fileAddress) => {
  const image = document.createElement('img');
  image.alt = 'Фотография жилья';
  image.style = 'width: 100%; height: 100%; object-fit: cover';
  image.src = fileAddress;

  fotoPreviewContainer.append(image);
};

fieldFotoUpload.addEventListener('change', () => {
  const file = fieldFotoUpload.files[0];
  const fileName = file.name.toLowerCase();

  const matches = FILE_TYPES.some((it) => fileName.endsWith(it));

  if (matches) {
    fotoPreviewContainer.innerHTML = '';
    createImage(URL.createObjectURL(file));
  }
});

//Функция для очистки полей предпросмотра изображений:
const resetImages = () => {
  avatarPreview.src = 'img/muffin-grey.svg';
  fotoPreviewContainer.innerHTML = '';
};

export {resetImages};
