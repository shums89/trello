'use strict';

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
