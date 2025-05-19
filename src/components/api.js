const config = {
  baseUrl: 'https://nomoreparties.co/v1/wff-cohort-38',
  headers: {
    authorization: '663c4b8a-62c7-4f3c-863c-ebe8221424f2',
    'Content-Type': 'application/json',
  },
};
function handleResponse(res) {
  if (res.ok) {
    return res.json();
  }
  return Promise.reject(`Ошибка: ${res.status}`);
};

// Загрузка информации о пользователе
function loadInfoUser() {
  return fetch(`${config.baseUrl}/users/me`, {
    method: 'GET',
    headers: {
      authorization: `${config.headers.authorization}`,
    },
  })
    .then(handleResponse);
}

// Загрузка карточек с сервера
function loadCards() {
  return fetch(`${config.baseUrl}/cards`, {
    method: 'GET',
    headers: {
      authorization: `${config.headers.authorization}`,
    },
  })
    .then(handleResponse);
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
    .then(handleResponse);
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
    .then(handleResponse);
}

// Запрос на удаление карточки
function removeCard(cardId) {
  return fetch(`${config.baseUrl}/cards/${cardId}`, {
    method: 'DELETE',
    headers: config.headers,
  })
    .then(handleResponse);
}

// Запрос на постановку лайка
function likeCard(cardId) {
  return fetch(`${config.baseUrl}/cards/likes/${cardId}`, {
    method: 'PUT',
    headers: config.headers,
  })
    .then(handleResponse);
}

// Запрос на снятие лайка
function unlikeCard(cardId) {
  return fetch(`${config.baseUrl}/cards/likes/${cardId}`, {
    method: 'DELETE',
    headers: config.headers,
  })
    .then(handleResponse);
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
    .then(handleResponse);
}

export { loadInfoUser, loadCards, updateInfoProfile, addCard, removeCard, likeCard, unlikeCard, updateAvatar };
