import { createCard, deleteCard, addLike } from "./components/card.js";
import { initialCards } from "./components/cards.js";
import { openModal, closeModal, closeOverlay } from "./components/modal.js";
import "../pages/index.css";

// @todo: Вывести карточки на страницу

const cardList = document.querySelector(".places__list");
initialCards.forEach(function (cardItem) {
  const card = createCard(cardItem, deleteCard, addLike, clickImage);
  cardList.append(card);
});

const editProfil = document.querySelector(".profile__edit-button");
const addButton = document.querySelector(".profile__add-button");
const editPopup = document.querySelector(".popup_type_edit");
const newСardPopup = document.querySelector(".popup_type_new-card");

editProfil.addEventListener("click", function () {
  const nameProfile = document.querySelector(".profile__title").textContent;
  const descriptionProfile = document.querySelector(
    ".profile__description"
  ).textContent;

  nameInput.value = nameProfile;
  jobInput.value = descriptionProfile;

  openModal(editPopup);
});

addButton.addEventListener("click", function () {
  openModal(newСardPopup);
});

//функция открытия попапа с изображением
function clickImage(evt) {
  const imagePopup = document.querySelector(".popup__image");
  const typeImagePopup = document.querySelector(".popup_type_image");

  const imageSrc = evt.target.src;
  const imageText = evt.target.alt;

  imagePopup.src = imageSrc;
  imagePopup.alt = imageText;

  openModal(typeImagePopup);
}

const closeButton = document.querySelectorAll(".popup__close");
closeButton.forEach(function (button) {
  button.addEventListener("click", function () {
    const listPopup = button.closest(".popup");
    closeModal(listPopup);
  });
});

const popupAll = document.querySelectorAll(".popup");
popupAll.forEach(function (overlay) {
  overlay.addEventListener("click", closeOverlay);
});

//РЕДАКТИРОВАНИЕ ИНФОРМАЦИИ О СЕБЕ:

// Находим форму в DOM
const profileEdit = document.querySelector('[name="edit-profile"]');

// Находим поля формы в DOM
const nameInput = document.querySelector(".popup__input_type_name");
const jobInput = document.querySelector(".popup__input_type_description");

// Обработчик «отправки» формы, хотя пока
// она никуда отправляться не будет
function handleProfileFormSubmit(evt) {
  evt.preventDefault(); // Эта строчка отменяет стандартную отправку формы.
  // Так мы можем определить свою логику отправки.
  // О том, как это делать, расскажем позже.

  // Получите значение полей jobInput и nameInput из свойства value
  const nameValid = nameInput.value;
  const jobValid = jobInput.value;

  // Выберите элементы, куда должны быть вставлены значения полей

  const nameProfil = document.querySelector(".profile__title");
  const descriptProfil = document.querySelector(".profile__description");

  // Вставьте новые значения с помощью textContent
  nameProfil.textContent = nameValid;
  descriptProfil.textContent = jobValid;

  //закрытие формы после нажатия на сохранить
  closeModal(editPopup);
}

// Прикрепляем обработчик к форме:
// он будет следить за событием “submit” - «отправка»
profileEdit.addEventListener("submit", handleProfileFormSubmit);

//ДОБАВЛЕНИЕ КАРТОЧКИ:

// Находим форму в DOM
const formCards = document.querySelector('[name="new-place"]');

// Находим поля формы в DOM
const nameCardInput = document.querySelector(".popup__input_type_card-name");
const urlInput = document.querySelector(".popup__input_type_url");

// Обработчик «отправки» формы, хотя пока
// она никуда отправляться не будет
function newPlaceFormSubmit(evt) {
  evt.preventDefault(); // Эта строчка отменяет стандартную отправку формы.
  // Так мы можем определить свою логику отправки.
  // О том, как это делать, расскажем позже.

  // Получите значение полей jobInput и nameInput из свойства value
  const nameCardValid = nameCardInput.value;
  const srcValid = urlInput.value;

  const newCard = {
    name: nameCardValid,
    link: srcValid,
  };

  const cardItem = createCard(newCard, deleteCard, addLike, clickImage);
  cardList.prepend(cardItem);

  //сброс формы
  formCards.reset();

  //закрытие формы после нажатия на сохранить
  closeModal(newСardPopup);
}

// Прикрепляем обработчик к форме:
// он будет следить за событием “submit” - «отправка»
formCards.addEventListener("submit", newPlaceFormSubmit);
