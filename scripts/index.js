// @todo: Темплейт карточки

const cardTemplate = document.querySelector('#card-template').content;

// @todo: DOM узлы

const cardList = document.querySelector('.places__list');

// @todo: Функция создания карточки

function createCard(cardItem, deleteCard) {
  const cardElement = cardTemplate.querySelector('.card').cloneNode(true);

  cardElement.querySelector('.card__title').textContent = cardItem.name;
  cardElement.querySelector('.card__image').src = cardItem.link;
  cardElement.querySelector('.card__image').alt = cardItem.description;

  const buttonDel = cardElement.querySelector('.card__delete-button');
  buttonDel.addEventListener('click', function() {
    deleteCard(cardElement);
  });

  return cardElement;
};

// @todo: Функция удаления карточки

function deleteCard(cardElement) {
  cardElement.remove();
};

// @todo: Вывести карточки на страницу

initialCards.forEach(function (cardItem) {
  const card = createCard(cardItem, deleteCard);
  cardList.append(card);
});
