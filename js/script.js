'use strict';

const recycler = document.querySelector('.recycler');

if (!localStorage.getItem('trello')) {
  Application.save();
}
Application.load();

document
  .querySelector('[data-action-addColumn]')
  .addEventListener('click', function () {
    const column = new Column;

    document.querySelector('.columns').append(column.element);

    Application.save();
  })

recycler.addEventListener('dragend', function () {
  Application.save();
});

recycler.addEventListener('dragover', function (evt) {
  evt.preventDefault();
  this.classList.add('under');
});

recycler.addEventListener('dragleave', function () {
  this.classList.remove('under');
});

recycler.addEventListener('drop', function () {
  if (Column.dragged) {
    Column.dragged.remove();
  }
});
