const FILE_TYPES = ['gif', 'jpg', 'jpeg', 'png'];

const fieldAvatarUpload = document.querySelector('#avatar');
const avatarPreview = document.querySelector('.ad-form-header__preview img');
const fieldPhotoUpload = document.querySelector('#images');
const photoPreviewContainer = document.querySelector('.ad-form__photo');

//Добавление превью аватарки:
fieldAvatarUpload.addEventListener('change', () => {
  const [file] = fieldAvatarUpload.files;
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

  photoPreviewContainer.append(image);
};

fieldPhotoUpload.addEventListener('change', () => {
  const [file] = fieldPhotoUpload.files;
  const fileName = file.name.toLowerCase();

  const matches = FILE_TYPES.some((it) => fileName.endsWith(it));

  if (matches) {
    photoPreviewContainer.innerHTML = '';
    createImage(URL.createObjectURL(file));
  }
});

//Функция для очистки полей предпросмотра изображений:
const resetImages = () => {
  avatarPreview.src = 'img/muffin-grey.svg';
  photoPreviewContainer.innerHTML = '';
};

export {resetImages};
