const config = {
  baseUrl: 'https://nomoreparties.co/v1/wff-cohort-38',
  headers: {
    authorization: '663c4b8a-62c7-4f3c-863c-ebe8221424f2',
    'Content-Type': 'application/json',
  },
};

function showError() {
  console.log('Не удалось загрузить данные');
}

// Загрузка информации о пользователе
function loadInfoUser() {
  return fetch(`${config.baseUrl}/users/me`, {
    method: 'GET',
    headers: {
      authorization: `${config.headers.authorization}`,
    },
  })
    .then((res) => {
      if (res.ok) {
        return res.json();
      }
      return Promise.reject(`Ошибка: ${res.status}`);
    })
    .then((userData) => {
      return userData;
    })
    .catch(showError);
}

// Загрузка карточек с сервера
function loadCards() {
  return fetch(`${config.baseUrl}/cards`, {
    method: 'GET',
    headers: {
      authorization: `${config.headers.authorization}`,
    },
  })
    .then((res) => {
      if (res.ok) {
        return res.json();
      }
      return Promise.reject(`Ошибка: ${res.status}`);
    })
    .then((cardsData) => {
      return cardsData;
    })
    .catch(showError);
}

// Запрос на обновление данных профиля
function updateInfoProfile(nameProfile, aboutProfile) {
  return fetch(`${config.baseUrl}/users/me`, {
    method: 'PATCH',
    headers: config.headers,
    body: JSON.stringify({
      name: nameProfile,
      about: aboutProfile,
    }),
  })
    .then((res) => {
      if (res.ok) {
        return res.json();
      }
      return Promise.reject(`Ошибка: ${res.status}`);
    })
    .then((infoProfile) => {
      return infoProfile;
    })
    .catch(showError);
}

// Запрос на добавление карточки
function addCard(cardName, link) {
  return fetch(`${config.baseUrl}/cards`, {
    method: 'POST',
    headers: config.headers,
    body: JSON.stringify({
      name: cardName,
      link: link,
    }),
  })
    .then((res) => {
      if (res.ok) {
        return res.json();
      }
      return Promise.reject(`Ошибка: ${res.status}`);
    })
    .then((dataCard) => {
      return dataCard;
    })
    .catch(showError);
}

// Запрос на удаление карточки
function removeCard(cardId) {
  return fetch(`${config.baseUrl}/cards/${cardId}`, {
    method: 'DELETE',
    headers: config.headers,
  })
    .then((res) => {
      if (res.ok) {
        return res.json();
      }
      return Promise.reject(`Ошибка: ${res.status}`);
    })
    .then((newCard) => {
      return newCard;
    })
    .catch(showError);
}

// Запрос на постановку лайка
function likeCard(cardId) {
  return fetch(`${config.baseUrl}/cards/likes/${cardId}`, {
    method: 'PUT',
    headers: config.headers,
  })
    .then((res) => {
      if (res.ok) {
        return res.json();
      }
      return Promise.reject(`Ошибка: ${res.status}`);
    })
    .then((updatedCard) => {
      return updatedCard;
    })
    .catch(showError);
}

// Запрос на снятие лайка
function unlikeCard(cardId) {
  return fetch(`${config.baseUrl}/cards/likes/${cardId}`, {
    method: 'DELETE',
    headers: config.headers,
  })
    .then((res) => {
      if (res.ok) {
        return res.json();
      }
      return Promise.reject(`Ошибка: ${res.status}`);
    })
    .then((updatedCard) => {
      return updatedCard;
    })
    .catch(showError);
}

// Запрос на обновление аватара пользователя
function updateAvatar(avatar) {
  return fetch(`${config.baseUrl}/users/me/avatar`, {
    method: 'PATCH',
    headers: config.headers,
    body: JSON.stringify({
      avatar: avatar,
    }),
  })
    .then((res) => {
      if (res.ok) {
        return res.json();
      }
      return Promise.reject(`Ошибка: ${res.status}`);
    })
    .then((updatedUser) => {
      return updatedUser;
    })
    .catch(showError);
}

export { loadInfoUser, loadCards, showError, updateInfoProfile, addCard, removeCard, likeCard, unlikeCard, updateAvatar };
