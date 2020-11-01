'use strict';

document
  .querySelectorAll('.column')
  .forEach(Column.process)

document
  .querySelector('[data-action-addColumn]')
  .addEventListener('click', function () {
    const columnElement = Column.create();

    document.querySelector('.columns').append(columnElement);
    Column.process(columnElement);
  })

document
  .querySelectorAll('.note')
  .forEach(Note.process);
