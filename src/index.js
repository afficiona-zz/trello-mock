import './style/index.css';

'use strict';

(() => {

  let currentDraggedElement;
  let currentSwimLaneCardsList;

  //drag start handler
  function handleDragStart(e) {
    currentDraggedElement = this;
    currentDraggedElement.classList.add('on-drag');
  }

  //drag drop handler
  function handleDrop(e) {
    let targetContainer;
    let cardsEle = [].slice.call(currentSwimLaneCardsList.querySelectorAll('.card'));
    let dropTargetPos = cardsEle.indexOf(this);
    let draggedElePos = cardsEle.indexOf(currentDraggedElement);
    e.preventDefault();
    currentDraggedElement.classList.remove('on-drag');
    this.classList.remove('on-drop-hover');

    //if the drop target is in another lane which is empty, just append the card
    if (draggedElePos === -1) {
      currentSwimLaneCardsList.appendChild(currentDraggedElement);
      return;
    }

    if (draggedElePos > dropTargetPos) {
      targetContainer = this;
    } else {
      targetContainer = this.nextSibling;
    }

    //if the target container is same as the current swimlane list, no point inserting the card again.
    if (currentSwimLaneCardsList === targetContainer) {
      return;
    }

    currentSwimLaneCardsList.insertBefore(currentDraggedElement, targetContainer);
  }

  //drag enter handler
  function handleDragEnter(e) {
    e.preventDefault();
    if (this !== currentDraggedElement) {
      //closest() works in modern browsers
      currentSwimLaneCardsList = this.closest('.lane').querySelector('.cards-list');
      this.classList.add('on-drop-hover');
    }
  }

  //drag over handler
  function handleDragOver(e) {
    e.preventDefault();
  }

  //drag leave handler
  function handleDragLeave() {
    this.classList.remove('on-drop-hover');
  }

  //card open handler
  function handleCardClick(e) {
    if (e.target.parentNode.nodeName === 'FORM') {
      return false;
    }
    cardUpdateForm.setAttribute('data-card', this.id);
    cardUpdateFormInput.value = this.getElementsByClassName('card-name')[0].innerHTML;
    cardUpdateForm.classList.add('visible');
    this.insertBefore(cardUpdateForm, this.getElementsByClassName('card-name')[0]);
    cardUpdateFormInput.focus();
    cardUpdateFormInput.select();
  }

  //card update form
  function handleCardUpdate(e) {
    let cardEle = document.getElementById(cardUpdateForm.getAttribute('data-card'));
    cardEle.id = _sluggify(cardUpdateFormInput.value);
    cardEle.querySelector('.card-name').innerHTML = cardUpdateFormInput.value;
    cardUpdateForm.classList.remove('visible');
    e.preventDefault();
    return false;
  }

  //handle lane deletion
  function handleLaneDelete() {
    //remove the lane from the DOM
    this.closest('.lane').remove();
  }

  //handle lane addition
  function handleAddLane() {
    let newLane = new Lane();
    newLane.add();
  }
  
  //card creation
  function createCard() {
    let laneEle = this.closest('.lane');
    let dummyCard = laneEle.querySelector('.dummy-card');
    let cardsList = laneEle.querySelector('.cards-list');
    let newCardEle = dummyCard.cloneNode(true);
    newCardEle.classList.remove('hide', 'dummy-card');
    newCardEle.id = laneEle.id + '-newCard';
    _assignEventListenersToCard(newCardEle);
    cardsList.appendChild(newCardEle);
    newCardEle.click();
  }
  
  function deleteCard() {
    let cardToBeDeleted = this.closest('.card');
    cardToBeDeleted.remove();
  }

  //selecting all the card cards
  let cardPopup = document.getElementById('cardPopup');
  let swimLanes = document.getElementById('swimLanes');
  let dummyLane = document.getElementById('dummyLane');
  let cardUpdateForm = document.getElementById('cardUpdateForm');
  let cardUpdateFormInput = cardUpdateForm.getElementsByTagName('input')[0];
  let btnAddLane = document.getElementById('btnAddLane');

  function Lane() {
    this.add = function() {
      let newLane = dummyLane.cloneNode(true);
      let title = prompt('Please enter the sprint title');
      if (!title) {
        return;
      }
      //sluggifying the title to set as lane id
      newLane.id = _sluggify(title);
      newLane.querySelector('.title').innerHTML = title;
      newLane.classList.remove('hide');
      newLane.querySelector('.action-create-card').addEventListener('click', createCard);
      _assignEventListenersToLane(newLane);
      swimLanes.prepend(newLane);
    };
  }

  //form listener
  cardUpdateForm.addEventListener('submit', handleCardUpdate);

  //add lane listener
  btnAddLane.addEventListener('click', handleAddLane);

  function _assignEventListenersToCard(card) {
    let cardDeleteActionEle = card.querySelector('.action-card-delete');
    card.addEventListener('dragstart', handleDragStart);
    card.addEventListener('dragenter', handleDragEnter);
    card.addEventListener('dragover', handleDragOver);
    card.addEventListener('dragleave', handleDragLeave);
    card.addEventListener('drop', handleDrop);
    card.addEventListener('click', handleCardClick);
    cardDeleteActionEle.addEventListener('click', deleteCard);
  }

  function _assignEventListenersToLane(lane) {
    let laneDeleteEle = lane.querySelector('.action-delete-lane');
    let laneCardsListEle = lane.querySelector('.cards-list');
    laneDeleteEle.addEventListener('click', handleLaneDelete);
    laneCardsListEle.addEventListener('dragenter', handleDragEnter);
    laneCardsListEle.addEventListener('dragover', handleDragOver);
    laneCardsListEle.addEventListener('dragleave', handleDragLeave);
    laneCardsListEle.addEventListener('drop', handleDrop);
  }

  //Generate a hyphenated slug
  function _sluggify(string) {
    return string.toLowerCase().split(' ').join('-');
  }

})();
