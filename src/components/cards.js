 const initialCards = [
    {
      name: "Архыз",
      link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg",
    },
    {
      name: "Челябинская область",
      link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg",
    },
    {
      name: "Иваново",
      link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg",
    },
    {
      name: "Камчатка",
      link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg",
    },
    {
      name: "Холмогорский район",
      link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg",
    },
    {
      name: "Байкал",
      link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg",
    }
];

// @todo: Темплейт карточки
const cardTemplate = document.querySelector('#card-template').content;

// @todo: Функция создания карточки
function createCard(cardItem, deleteCard, addLike) {
  const cardElement = cardTemplate.querySelector('.card').cloneNode(true);
  const cardImage = cardElement.querySelector('.card__image');

  cardElement.querySelector('.card__title').textContent = cardItem.name;
  cardImage.src = cardItem.link;
  cardImage.alt = cardItem.name;

  //Обработчик удаления карточки
  const buttonDel = cardElement.querySelector('.card__delete-button');
  buttonDel.addEventListener('click', function() {
    deleteCard(cardElement);
  });

  //обработчик лайка
  const buttonLike = cardElement.querySelector('.card__like-button')
  buttonLike.addEventListener('click', addLike);

  return cardElement;
};

// @todo: Функция удаления карточки
function deleteCard(cardElement) {
  cardElement.remove();
};

// Функция добавления лайка
function addLike(evt) {
  evt.target.classList.toggle('card__like-button_is-active')
};


  export {initialCards, createCard, deleteCard, addLike};
