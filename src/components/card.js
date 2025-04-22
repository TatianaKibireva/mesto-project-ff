
// @todo: Темплейт карточки
const cardTemplate = document.querySelector("#card-template").content;

// @todo: Функция создания карточки
function createCard(cardItem, deleteCard, addLike, clickImage) {
  const cardElement = cardTemplate.querySelector(".card").cloneNode(true);
  const cardImage = cardElement.querySelector(".card__image");

  cardElement.querySelector(".card__title").textContent = cardItem.name;
  cardImage.src = cardItem.link;
  cardImage.alt = cardItem.name;

  //Обработчик удаления карточки
  const buttonDel = cardElement.querySelector(".card__delete-button");
  buttonDel.addEventListener("click", function () {
    deleteCard(cardElement);
  });

  //обработчик лайка
  const buttonLike = cardElement.querySelector(".card__like-button");
  buttonLike.addEventListener("click", addLike);

  //обработчик клика по изображению
  cardImage.addEventListener("click", clickImage);

  return cardElement;
}

// @todo: Функция удаления карточки
function deleteCard(cardElement) {
  cardElement.remove();
}

// Функция добавления лайка
function addLike(evt) {
  evt.target.classList.toggle("card__like-button_is-active");
}

export { createCard, deleteCard, addLike };
