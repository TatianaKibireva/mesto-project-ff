import { createCard, handleDeleteCard } from './components/card.js';
import { openModal, closeModal, closeOverlay } from './components/modal.js';
import { enableValidation, clearValidation } from './components/validation.js';
import { loadInfoUser, loadCards, updateInfoProfile, addCard, updateAvatar } from './components/api.js';
import '../pages/index.css';

function showError() {
  console.log('Не удалось загрузить данные');
};

const validationConfig = {
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__button',
  inactiveButtonClass: 'popup__button_inactive',
  inputErrorClass: 'popup__input-error',
  errorClass: 'popup__input-error_active'
};
enableValidation(validationConfig); 

// Параллельно загружаем данные пользователя и карточки
// После успешной загрузки обновляем профиль пользователя и отображаем карточки

const promises = [loadInfoUser(), loadCards()];
let globalUserData;
Promise.all(promises)
  .then(([userData, cardsData]) => {
    globalUserData = userData;
    const profileTitle = document.querySelector('.profile__title');
    const profileDescript = document.querySelector('.profile__description');
    const profileAvatar = document.querySelector('.profile__image');
    // Обновляем информацию в профиле пользователя
    profileTitle.textContent = userData.name;
    profileDescript.textContent = userData.about;
    profileAvatar.src = userData.avatar;

    const cardList = document.querySelector('.places__list');
    cardsData.forEach((cardItem) => { // Берём каждую карточку из списка загруженных данных cardsData
      const card = createCard(cardItem, userData._id, handleDeleteCard, clickImage); //Создаём хтмл-элемент карточки с данными cardItem, айди пользователя(чтобы знать можем ли мы ее удалять), с функциями удаления и отображения картинок
      cardList.append(card); // Добавляем картоку на страницу
    });
  })
  .catch(showError);

const editProfile = document.querySelector('.profile__edit-button');
const addButton = document.querySelector('.profile__add-button');
const editPopup = document.querySelector('.popup_type_edit');
const newCardPopup = document.querySelector('.popup_type_new-card');
const editButtonAvatar = document.querySelector('.profile__avatar-edit-button');
const editPopupAvatar = document.querySelector('.popup_avatar_edit');
const formEditAvatar = document.querySelector('[name="edit-avatar"]');

// Открытие попапа редактирования профиля
editProfile.addEventListener('click', function () {
  const nameProfile = document.querySelector('.profile__title').textContent;
  const descriptionProfile = document.querySelector(
    '.profile__description'
  ).textContent;

  nameInput.value = nameProfile; //Для отображения текущих имени и описания
  jobInput.value = descriptionProfile;

  clearValidation(formProfileEdit, validationConfig);
  openModal(editPopup);
});

// Открытие попапа добавления новой карточки
addButton.addEventListener('click', function () {
  clearValidation(formCards, validationConfig);
  openModal(newCardPopup);
});

//Открытие попапа с редактированием аватара
editButtonAvatar.addEventListener('click', function () {
  clearValidation(formEditAvatar, validationConfig);
  openModal(editPopupAvatar);
});

//функция открытия попапа с изображением
function clickImage(evt) {
  const imagePopup = document.querySelector('.popup__image');
  const typeImagePopup = document.querySelector('.popup_type_image');

  const imageSrc = evt.target.src;
  const imageText = evt.target.alt;

  imagePopup.src = imageSrc;
  imagePopup.alt = imageText;

  openModal(typeImagePopup);
}

// Закрытие попапов при клике на крестик
const closeButton = document.querySelectorAll('.popup__close');
closeButton.forEach(function (button) {
  button.addEventListener('click', function () {
    const listPopup = button.closest('.popup');
    closeModal(listPopup);
  });
});

// Закрытие попапов при клике на оверлей
const popupAll = document.querySelectorAll('.popup');
popupAll.forEach(function (overlay) {
  overlay.addEventListener('click', closeOverlay);
});

const formProfileEdit = document.querySelector('[name="edit-profile"]');
const nameInput = document.querySelector('.popup__input_type_name');
const jobInput = document.querySelector('.popup__input_type_description');

// Обработчик «отправки» формы редактирования профиля
formProfileEdit.addEventListener('submit', function (evt) {
  evt.preventDefault(); //предотвращаем перезагрузку страницы

  const nameProfile = nameInput.value; // nameInput уже определен
  const aboutProfile = jobInput.value; // jobInput уже определен

  updateInfoProfile(nameProfile, aboutProfile) // передаем значения из формы
    .then((infoProfile) => {
      const profileTitle = document.querySelector('.profile__title');
      const profileDescript = document.querySelector('.profile__description');

      profileTitle.textContent = infoProfile.name;
      profileDescript.textContent = infoProfile.about;

      closeModal(editPopup); //закрытие формы после нажатия на сохранить
    })
    .catch(showError);
});

const linkInput = document.querySelector('.popup__input_link_avatar');

// Обработчик «отправки» формы редактирования аватарa
formEditAvatar.addEventListener('submit', function (evt) {
  evt.preventDefault(); //предотвращаем перезагрузку страницы

  const avatarUrl = linkInput.value;
  updateAvatar(avatarUrl)
    .then((updatedUser) => {
      const profileImage = document.querySelector('.profile__image');
      profileImage.src = updatedUser.avatar;

      closeModal(editPopupAvatar); //закрытие формы после нажатия на сохранить
    })
    .catch(showError);
});

const formCards = document.querySelector('[name="new-place"]');
const nameCardInput = document.querySelector('.popup__input_type_card-name');
const urlInput = document.querySelector('.popup__input_type_url');

// Обработчик «отправки» формы добавления карточки
formCards.addEventListener('submit', function (evt) {
  evt.preventDefault(); //предотвращаем перезагрузку страницы

  const cardName = nameCardInput.value;
  const link = urlInput.value;

  addCard(cardName, link) // Передаём значения из формы
    .then((dataCard) => {
      const cardItem = createCard(dataCard, globalUserData._id, handleDeleteCard, clickImage);
      document.querySelector('.places__list').prepend(cardItem);

      formCards.reset(); // Очищаем форму
      closeModal(newCardPopup); //закрытие формы после нажатия на сохранить
    })
    .catch(console.log('EEEEE'));
});
