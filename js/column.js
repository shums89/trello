'use strict';

class Column {
  constructor(id = null) {
    const instance = this;

    this.notes = [];

    const element = this.element = document.createElement('div');
    element.classList.add('column');
    element.setAttribute('draggable', 'true');

    if (id) {
      element.setAttribute('data-column-id', id);
    } else {
      element.setAttribute('data-column-id', Column.idCounter);
      Column.idCounter++;
    }

    element.innerHTML = `
        <p class="column-header" contenteditable="true">В плане</p>
        <div data-notes></div>
        <p class="column-footer">
          <span data-action-addNote class="action">+ Добавить карточку</span>
        </p>
      `;

    const spanActionAddNote = element.querySelector('[data-action-addNote]');

    spanActionAddNote.addEventListener('click', function () {
      const note = new Note;
      instance.add(note);

      element.querySelector('[data-notes]').append(note.element);

      note.element.setAttribute('contenteditable', 'true');
      note.element.focus();
    })

    const headerElement = element.querySelector('.column-header');
    headerElement.addEventListener('dblclick', function () {
      headerElement.setAttribute('contenteditable', true);
      headerElement.focus();
    });

    headerElement.addEventListener('blur', function () {
      headerElement.removeAttribute('contenteditable');
    });

    element.addEventListener('dragstart', this.dragstart.bind(this));
    element.addEventListener('dragend', this.dragend.bind(this));
    element.addEventListener('dragover', this.dragover.bind(this));
    element.addEventListener('drop', this.drop.bind(this));
  }

  add(...notes) {
    for (const note of notes) {
      if (!this.notes.includes(note)) {
        this.notes.push(note);

        this.element.querySelector('[data-notes]').append(note.element);
      }
    }
  }

  dragstart(evt) {
    Column.dragged = this.element;
    Column.dragged.classList.add('dragged');

    evt.stopPropagation();

    document
      .querySelectorAll('.note')
      .forEach(element => element.removeAttribute('draggable'));
  }

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

    Application.save();
  }

  dragover(evt) {
    evt.preventDefault();
    evt.stopPropagation();

    if (Column.dragged === this.element) {
      if (Column.dropped) {
        Column.dropped.classList.remove('under');
      }
      Column.dropped = null;
    }

    if (!Column.dragged || Column.dragged === this.element) {
      return;
    }

    Column.dropped = this.element;
    this.element.classList.add('under');
  }

  drop() {
    if (Note.dragged) {
      return this.element.querySelector('[data-notes]').append(Note.dragged);
    } else if (Column.dragged) {
      const children = Array.from(document.querySelector('.columns').children);
      const indexA = children.indexOf(this.element);
      const indexB = children.indexOf(Column.dragged);

      if (indexA < indexB) {
        document.querySelector('.columns').insertBefore(Column.dragged, this.element);
      } else {
        document.querySelector('.columns').insertBefore(Column.dragged, this.element.nextElementSibling);
      }
    }
  }
}

Column.idCounter = 4;
Column.dragged = null;
Column.dropped = null;
