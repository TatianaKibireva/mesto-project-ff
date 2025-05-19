import { showError, removeCard, likeCard, unlikeCard } from './api.js';
// @todo: Темплейт карточки
const cardTemplate = document.querySelector('#card-template').content;

//Удаление карточки
const handleDeleteCard = (id, cardElement) => {
  removeCard(id) 
      .then(() => { 
        deleteCard(cardElement)
       })
      .catch(err => console.log(err));
}


// @todo: Функция создания карточки
function createCard(cardItem, userId, handleDeleteCard, clickImage) {
  const cardElement = cardTemplate.querySelector('.card').cloneNode(true);
  const cardImage = cardElement.querySelector('.card__image');
  const cardLike = cardElement.querySelector('.card__like-count');
  const cardDelButton = cardElement.querySelector('.card__delete-button');

  cardElement.querySelector('.card__title').textContent = cardItem.name;
  cardImage.src = cardItem.link;
  cardImage.alt = cardItem.name;

  cardLike.textContent = cardItem.likes.length;

  // Скрыть корзину на чужих карточках
  if (cardItem.owner._id !== userId) {
    cardDelButton.style.display = 'none';
  }

  //Обработчик удаления карточки
    cardDelButton.addEventListener('click', () => {
      if (cardItem.owner._id === userId) {
        handleDeleteCard(cardItem._id, cardElement)
      }
    });

  const buttonLike = cardElement.querySelector('.card__like-button');

  // Проверяем, лайкнули ли мы карточку
  const likedByMe = cardItem.likes.some((like) => like._id === userId);
  if (likedByMe) {
    buttonLike.classList.add('card__like-button_is-active');
  }
  // Обработчик лайка
  buttonLike.addEventListener('click', () => {
    const activeLike = buttonLike.classList.contains(
      'card__like-button_is-active'
    );
    const likeMethod = activeLike ? unlikeCard : likeCard;
    likeMethod(cardItem._id) 
        .then((updatedCard) => { 
          buttonLike.classList.toggle('card__like-button_is-active'); 
          cardLike.textContent = updatedCard.likes.length; 
          cardItem.likes = updatedCard.likes;
        })
        .catch(err => console.log(err));
  });

  //обработчик клика по изображению
  cardImage.addEventListener('click', clickImage);
  return cardElement;
}

// // @todo: Функция удаления карточки
function deleteCard(cardElement) {
  cardElement.remove();
}

export { createCard, handleDeleteCard };
