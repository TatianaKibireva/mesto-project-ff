//Работу модальных окон — в файл modal.js. 
//Отсюда экспортируйте функции openModal и closeModal, 
//принимающие в качестве аргумента DOM-элемент модального окна, 
//с которым нужно произвести действие.

 function openModal(evt){
  evt.classList.add('popup_is-animated');
  setTimeout(function (){
    evt.classList.add('popup_is-opened');
  },100)
}; 

 function closeModal(evt){
  evt.classList.remove('popup_is-opened')
};

export {openModal, closeModal};