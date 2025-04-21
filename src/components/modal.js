function openModal(modalWindow) {
  modalWindow.classList.add("popup_is-animated");
  setTimeout(function () {
    modalWindow.classList.add("popup_is-opened");
    document.addEventListener("keydown", closeEsc);
  }, 100);
}

function closeModal(modalWindow) {
  modalWindow.classList.remove("popup_is-opened");
  document.addEventListener("keydown", closeEsc);
}

function closeOverlay(evt) {
  if (evt.target === evt.currentTarget) {
    closeModal(evt.currentTarget);
  }
}

function closeEsc(evt) {
  if (evt.key === "Escape") {
    const popupOpen = document.querySelector(".popup_is-opened");
    closeModal(popupOpen);
  }
}

export { openModal, closeModal, closeOverlay };
