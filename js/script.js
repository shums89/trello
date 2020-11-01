'use strict';

Application.load();

document
  .querySelector('[data-action-addColumn]')
  .addEventListener('click', function () {
    const columnElement = Column.create();

    document.querySelector('.columns').append(columnElement);

    Application.save();
  })
