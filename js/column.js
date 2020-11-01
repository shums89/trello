const Column = {
  idCounter: 4,
  dragged: null,
  dropped: null,

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

    columnElement.addEventListener('dragstart', Column.dragstart);
    columnElement.addEventListener('dragend', Column.dragend);
    // columnElement.addEventListener('dragenter', Column.dragenter);
    columnElement.addEventListener('dragover', Column.dragover);
    // columnElement.addEventListener('dragleave', Column.dragleave);
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

  dragstart(evt) {
    Column.dragged = this;
    Column.dragged.classList.add('dragged');

    evt.stopPropagation();

    document
      .querySelectorAll('.note')
      .forEach(element => element.removeAttribute('draggable'));
  },

  dragend() {
    Column.dragged.classList.remove('dragged');
    Column.dragged = null;
    Column.dropped = null;

    document
      .querySelectorAll('.note')
      .forEach(element => element.setAttribute('draggable', true));

    document
      .querySelectorAll('.column')
      .forEach(element => element.classList.remove('under'));
  },

  /*
  dragenter(evt) {
    evt.stopPropagation();

    if (!Column.dragged || Column.dragged === this) {
      return;
    }

    this.classList.add('under');
  },*/

  dragover(evt) {
    evt.preventDefault();
    evt.stopPropagation();

    if (Column.dragged === this) {
      if (Column.dropped) {
        Column.dropped.classList.remove('under');
      }
      Column.dropped = null;
    }

    if (!Column.dragged || Column.dragged === this) {
      return;
    }

    Column.dropped = this;
    this.classList.add('under');
  },

  /*
  dragleave(evt) {
    if (!Column.dragged || Column.dragged === this) {
      return;
    }

    this.classList.remove('under');
  },*/

  drop() {
    if (Note.dragged) {
      return this.querySelector('[data-notes]').append(Note.dragged);
    } else if (Column.dragged) {
      const children = Array.from(document.querySelector('.columns').children);
      const indexA = children.indexOf(this);
      const indexB = children.indexOf(Column.dragged);

      if (indexA < indexB) {
        document.querySelector('.columns').insertBefore(Column.dragged, this);
      } else {
        document.querySelector('.columns').insertBefore(Column.dragged, this.nextElementSibling);
      }
    }
  }
}