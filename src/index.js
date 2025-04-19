import {createCard, deleteCard, addLike} from './components/card.js';
import {initialCards} from './components/cards.js';
import {openModal, closeModal} from './components/modal.js';

const addIcon = new URL('../images/add-icon.svg', import.meta.url);
const avatar = new URL('../images/avatar.jpg', import.meta.url);
const card1 = new URL('../images/card_1.jpg', import.meta.url);
const card2 = new URL('../images/card_2.jpg', import.meta.url);
const card3 = new URL('../images/card_3.jpg', import.meta.url);
const close = new URL('../images/close.svg', import.meta.url);
const deleteIcon = new URL('../images/delete-icon.svg', import.meta.url);
const editIcon = new URL('../images/edit-icon.svg', import.meta.url);
const likeActive = new URL('../images/like-active.svg', import.meta.url);
const likeInactive = new URL('../images/like-inactive.svg', import.meta.url);
const logo = new URL('../images/logo.svg', import.meta.url);

const images = [
  {name: 'add-icon', link: addIcon},
  {name: 'avatar', link: avatar},
  {name: 'card_1', link: card1},
  {name: 'card_2', link: card2},
  {name: 'card_3', link: card3},
  {name: 'close', link: close},
  {name: 'delete-icon', link: deleteIcon},
  {name: 'edit-icon', link: editIcon},
  {name: 'like-active', link: likeActive},
  {name: 'like-inactive', link: likeInactive},
  {name: 'logo', link: logo}
];

// @todo: Вывести карточки на страницу

const cardList = document.querySelector('.places__list');
initialCards.forEach(function (cardItem) {
  const card = createCard(cardItem, deleteCard, addLike);
  cardList.append(card);
});


//В файле index.js должны остаться:
//объявления и инициализация глобальных констант 
//и переменных с DOM-элементами страницы,
//обработчики событий (при открытии и закрытии попапов; 
  //при отправке форм; обработчик, открывающий попап при 
  //клике по изображению карточки);
//вызовы других функций, подключённых из созданных модулей, 
//которым нужно будет передавать объявленные здесь переменные 
//и обработчики.


const editProfil = document.querySelector('.profile__edit-button');
const addButton = document.querySelector('.profile__add-button');
const cardImageAll = document.querySelectorAll('.card__image');


editProfil.addEventListener('click', function(){
  const editPopup = document.querySelector('.popup_type_edit');
  openModal(editPopup)}); 

addButton.addEventListener('click', function(){
  const newСardPopup = document.querySelector('.popup_type_new-card');
  openModal(newСardPopup);
}); 

cardImageAll.forEach(function(cardImage){
  cardImage.addEventListener('click', function(evt){
  
    const imagePopup = document.querySelector('.popup__image');
    const typeImagePopup = document.querySelector('.popup_type_image');

    const imageSrc = evt.target.src;
    const imageText = evt.target.alt;

    imagePopup.src = imageSrc;
    imagePopup.alt = imageText;

    openModal(typeImagePopup);
})
});


const closeButton = document.querySelectorAll('.popup__close');
closeButton.forEach(function(button){
  button.addEventListener('click', function(){
    const listPopup = button.closest('.popup');
    closeModal(listPopup)})});

const closeOverlay = document.querySelectorAll('.popup');
closeOverlay.forEach(function(overlay){
  overlay.addEventListener('click', function(evt){
    if(evt.target === evt.currentTarget){
      closeModal(evt.currentTarget);
    }
  });
});

document.addEventListener('keydown', function(evt){
  if(evt.key === 'Escape'){
    const popupAll = document.querySelectorAll('.popup')
    popupAll.forEach(function(popup){
      closeModal(popup);
    })
  }
});


//РЕДАКТИРОВАНИЕ ИНФОРМАЦИИ О СЕБЕ:

// Находим форму в DOM
const formElement = document.querySelector('[name="edit-profile"]');

// Находим поля формы в DOM
const nameInput = document.querySelector('.popup__input_type_name');
const jobInput = document.querySelector('.popup__input_type_description');

// Обработчик «отправки» формы, хотя пока
// она никуда отправляться не будет
function handleFormSubmit(evt) {
    evt.preventDefault(); // Эта строчка отменяет стандартную отправку формы.
                          // Так мы можем определить свою логику отправки.
                          // О том, как это делать, расскажем позже.

    // Получите значение полей jobInput и nameInput из свойства value
    const nameValid = nameInput.value;
    const jobValid = jobInput.value;

    // Выберите элементы, куда должны быть вставлены значения полей

    const nameProfil = document.querySelector('.profile__title');
    const descriptProfil = document.querySelector('.profile__description');

    // Вставьте новые значения с помощью textContent
    nameProfil.textContent = nameValid;
    descriptProfil.textContent = jobValid;

    //закрытие формы после нажатия на сохранить
    const profilClose = document.querySelector('.popup_type_edit');
    closeModal(profilClose);
}

// Прикрепляем обработчик к форме:
// он будет следить за событием “submit” - «отправка»
formElement.addEventListener('submit', handleFormSubmit);


//ДОБАВЛЕНИЕ КАРТОЧКИ:

// Находим форму в DOM
const formCards = document.querySelector('[name="new-place"]');

// Находим поля формы в DOM
const nameCardInput = document.querySelector('.popup__input_type_card-name');
const urlInput = document.querySelector('.popup__input_type_url');

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
  link: srcValid
  };

  initialCards.unshift(newCard);

  const cardItem = createCard(newCard, deleteCard, addLike);
  cardList.prepend(cardItem);

  //сброс формы
  formCards.reset();

  //закрытие формы после нажатия на сохранить
  const popupClose = document.querySelector('.popup_type_new-card');
  closeModal(popupClose);

};

// Прикрепляем обработчик к форме:
// он будет следить за событием “submit” - «отправка»
formCards.addEventListener('submit', newPlaceFormSubmit);






import '../pages/index.css'; 
