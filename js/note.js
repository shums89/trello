'use strict';

const Note = {
  idCounter: 8,
  dragged: null,

  process(noteElement) {
    noteElement.addEventListener('dblclick', function () {
      noteElement.setAttribute('contenteditable', 'true');
      noteElement.removeAttribute('draggable');
      noteElement.closest('.column').removeAttribute('draggable');
      noteElement.focus();
    });

    noteElement.addEventListener('blur', function () {
      noteElement.removeAttribute('contenteditable');
      noteElement.setAttribute('draggable', 'true');
      noteElement.closest('.column').setAttribute('draggable', 'true');

      if (!noteElement.textContent.trim().length) {
        noteElement.remove();
      }

      Application.save();
    });

    noteElement.addEventListener('dragstart', Note.dragstart);
    noteElement.addEventListener('dragend', Note.dragend);
    noteElement.addEventListener('dragenter', Note.dragenter);
    noteElement.addEventListener('dragover', Note.dragover);
    noteElement.addEventListener('dragleave', Note.dragleave);
    noteElement.addEventListener('drop', Note.drop);
  },

  create(id = null, content = '') {
    const noteElement = document.createElement('div');
    noteElement.classList.add('note');
    noteElement.setAttribute('draggable', 'true');
    noteElement.textContent = content;

    if (id) {
      noteElement.setAttribute('data-note-id', id);
    } else {
      noteElement.setAttribute('data-note-id', Note.idCounter);
      Note.idCounter++;
    }

    Note.process(noteElement);

    return noteElement;
  },

  dragstart(evt) {
    Note.dragged = this;
    this.classList.add('dragged');

    evt.stopPropagation();
  },

  dragend(evt) {
    evt.stopPropagation();

    Note.dragged = null;
    this.classList.remove('dragged');

    document
      .querySelectorAll('.note')
      .forEach(element => element.classList.remove('under'));

    Application.save();
  },

  dragenter() {
    if (!Note.dragged || this === Note.dragged) {
      return;
    }
    this.classList.add('under');
  },

  dragover(evt) {
    evt.preventDefault();
    evt.stopPropagation();

    if (!Note.dragged || this === Note.dragged) {
      return;
    }
  },

  dragleave() {
    if (!Note.dragged || this === Note.dragged) {
      return;
    }
    this.classList.remove('under');
  },

  drop(evt) {
    evt.stopPropagation();

    if (!Note.dragged || this === Note.dragged) {
      return;
    }

    if (this.parentElement === Note.dragged.parentElement) {
      const notes = Array.from(this.parentElement.querySelectorAll('.note'));
      const indexA = notes.indexOf(this);
      const indexB = notes.indexOf(Note.dragged);

      if (indexA < indexB) {
        this.parentElement.insertBefore(Note.dragged, this);
      } else {
        this.parentElement.insertBefore(Note.dragged, this.nextElementSibling);
      }
    } else {
      this.parentElement.insertBefore(Note.dragged, this);
    }
  }
}
