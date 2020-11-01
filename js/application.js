'use strict';

const Application = {
  save() {
    const object = {
      columns: {
        idCounter: Column.idCounter,
        items: []
        ,
      },
      notes: {
        idCounter: Note.idCounter,
        items: []
      }
    }

    document
      .querySelectorAll('.column')
      .forEach(element => {
        const column = {
          id: parseInt(element.getAttribute('data-column-id')),
          noteIds: []
        }

        element
          .querySelectorAll('.note')
          .forEach(element => {
            column.noteIds.push(parseInt(element.getAttribute('data-note-id')));
          });

        object.columns.items.push(column);
      });
    document
      .querySelectorAll('.note')
      .forEach(element => {
        const note = {
          id: parseInt(element.getAttribute('data-note-id')),
          content: element.textContent
        }

        object.notes.items.push(note);
      });

    const json = JSON.stringify(object);

    localStorage.setItem('trello', json);
  },

  load() {
    if (!localStorage.getItem('trello')) {
      return;
    }

    const mountPoint = document.querySelector('.columns');
    mountPoint.innerHTML = '';

    const object = JSON.parse(localStorage.getItem('trello'));

    const getNoteById = id => object.notes.items.find(note => note.id === id);

    for (const { id, noteIds } of object.columns.items) {
      const column = new Column(id);

      mountPoint.append(column.element);

      for (const noteId of noteIds) {
        const { id, content } = getNoteById(noteId);
        const note = new Note(id, content);
        column.add(note);
      }
    }

  }
}