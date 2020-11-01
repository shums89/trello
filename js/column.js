const Column = {
  idCounter: 4,

  process(columnElement) {
    const spanActionAddNote = columnElement.querySelector('[data-action-addNote]');

    spanActionAddNote.addEventListener('click', function () {
      const noteElement = Note.create();

      columnElement.querySelector('[data-notes]').append(noteElement);

      noteElement.setAttribute('contenteditable', 'true');
      noteElement.focus();
    })

    const headerElement = columnElement.querySelector('.column-header');
    headerElement.addEventListener('dblclick', function () {
      headerElement.setAttribute('contenteditable', true);
      headerElement.focus();
    });

    headerElement.addEventListener('blur', function () {
      headerElement.removeAttribute('contenteditable');
    });

    columnElement.addEventListener('dragover', Column.dragover);

    columnElement.addEventListener('drop', Column.drop);
  },

  create() {
    const columnElement = document.createElement('div');
    columnElement.classList.add('column');
    columnElement.setAttribute('draggable', 'true');
    columnElement.setAttribute('data-column-id', Column.idCounter);

    columnElement.innerHTML = `
        <p class="column-header" contenteditable="true">В плане</p>
        <div data-notes></div>
        <p class="column-footer">
          <span data-action-addNote class="action">+ Добавить карточку</span>
        </p>
      `;

    Column.idCounter++;

    return columnElement;
  },

  dragover(evt) {
    evt.preventDefault();
  },

  drop() {
    if (Note.dragged) {
      return this.querySelector('[data-notes]').append(Note.dragged);
    }
  }
}