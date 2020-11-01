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

        for (const column of object.columns.items) {
            const columnElement = Column.create(column.id);

            mountPoint.append(columnElement);

            for (const noteId of column.noteIds) {
                const note = getNoteById(noteId);

                const noteElement = Note.create(note.id, note.content);
                columnElement.querySelector('[data-notes]').append(noteElement);
            }
        }

    }
}