import { createWarehouse, update } from 'subscriber_state'
import { TypeNote, TypeUid } from '../types'
import { getNotes, removeNote as removeNoteKeep, deleteNote as deleteNoteKeep } from '../services/keep'
import uuid from 'react-native-uuid';

type TypeState = {
  notes: TypeNote[],
  selectedNotes: TypeUid[],
  noteInEdition: TypeNote,
}

type TypeActions = {
  selectNote: (key: TypeUid) => void,
  clearSelectedNotes: () => void,
  addTag: (key: TypeUid, tag: string) => void,
  archive: (key: TypeUid) => void,
  addColor: (key: TypeUid, color: string) => void,
  addTagOfSelect: (tag: string) => void,
  archiveOfSelect: () => void,
  addColorOfSelect: (color: string) => void,
  removeNoteOfSelect: () => void,
  addNote: () => TypeUid,
  removeNote: (key: TypeUid) => void,
  deleteNote: (key: TypeUid) => void,
  updateNote: (note: TypeNote) => void,
  addNoteInEdition: (note?: TypeNote) => void,
  removeNoteInEdition: () => void,
  search: (value: string) => void,
}

/////////////////////////////

const selectNote = (key: TypeUid) => {
  update((state: TypeState) => {
    const index = state.selectedNotes
      .findIndex((_key_: TypeUid) => _key_ === key);

    index > -1 ?
      state.selectedNotes.splice(index, 1) :
      state.selectedNotes.push(key);

    return state;
  })
};

const clearSelectedNotes = () => {
  update((state: TypeState) => ({ ...state, selectedNotes: [] }));
};

const addTag = (key: TypeUid, tag: string) => {
  update((state: TypeState) => {
    const index = state.notes
      .findIndex((obj: TypeNote) => obj.key === key);

    if (index > -1) {
      const indexTag = state.notes[index]?.tags
        .findIndex((_tag_: string) => _tag_ === tag);

      indexTag !== -1 ?
        state.notes[index]?.tags.splice(indexTag, 1) :
        state.notes[index]?.tags.push(tag);
    } else {
      const error = new Error(`Don't exists the note with key : ${key}`)
      throw error;
    }

    return state;
  })
};

const archive = (key: TypeUid) => {
  update((state: TypeState) => {
    const index = state.notes
      .findIndex((obj: TypeNote) => obj.key === key);

    if (index > -1) {
      state.notes[index].archive ?
        state.notes[index].archive = false :
        state.notes[index].archive = true;
    } else {
      const error = new Error(`Don't exists the note with key : ${key}`)
      throw error;
    }

    return state;
  })
};

const addColor = (key: TypeUid, color: string) => {
  update((state: TypeState) => {
    const index = state.notes
      .findIndex((obj: TypeNote) => obj.key === key);

    if (index > -1) {
      const isEquialColor = state.notes[index]?.color === color;

      isEquialColor ?
        state.notes[index].color = null :
        state.notes[index].color = color;
    } else {
      const error = new Error(`Don't exists the note with key : ${key}`)
      throw error;
    }

    return state;
  })
};

const addTagOfSelect = (tag: string) => {
  update((state: TypeState) => {
    state.selectedNotes.forEach((note: TypeNote) => {
      const indexTag = state.notes[note]?.tags
        .findIndex((_tag_: string) => _tag_ === tag);

      indexTag !== -1 ?
        state.notes[note]?.tags.splice(indexTag, 1) :
        state.notes[note]?.tags.push(tag);
    })

    return state;
  })
};

const archiveOfSelect = () => {
  update((state: TypeState) => {
    state.selectedNotes.forEach((note: TypeNote) => {
      state.notes[note]?.archive ?
        state.notes[note].archive = false :
        state.notes[note].archive = true;
    })

    return state;
  })
};

const addColorOfSelect = (color: string) => {
  update((state: TypeState) => {
    state.selectedNotes.forEach((uid: TypeUid) => {
      //TODO trabajat con uid
      const isEquialColor = state.notes[note]?.color === color;
      console.log(color, '-check')
      isEquialColor ?
        state.notes[note].color = null :
        state.notes[note].color = color;
    });

    return state;
  })
};

const removeNoteOfSelect = () => {
  (async () => {
    const datetime = await removeNoteKeep(key);

    update((state: TypeState) => {
      state.selectedNotes.forEach((note: TypeNote) => {
        state.notes[note].remove = datetime;
      });

      return state;
    })
  })()
}

const addNote = () => {
  const key = uuid.v4();

  update((state: TypeState) => {
    state.notes.push({
      key,
      title: null,
      data: [],
      color: null,
      tags: [],
      remove: null,
      archive: false
    });
    return state;
  })
  return key;
};

const removeNote = (key: TypeUid) => {
  (async () => {
    const datetime = await removeNoteKeep(key);

    update((state: TypeState) => {
      const index = state.notes.findIndex((note: typeNote) => note.key === key);
      state.notes[index].remove = datetime;
      return state;
    })
  })()
};

const deleteNote = (key: TypeUid) => {
  (async () => {
    await deleteNoteKeep(key);

    update((state: TypeState) => {
      const index = state.notes.findIndex((note: typeNote) => note.key === key);
      state.notes.splice(index, 1);
      return state;
    })
  })()
};

const updateNote = (note: TypeNote) => {
  update((state: TypeState) => {
    const index = state.notes.findIndex((_note_: typeNote) => _note_.key === note.key);
    state.notes[index] = note;
    return state;
  })
};

const addNoteInEdition = (note?: TypeNote) => {
  update((state: TypeState) => {
    state.noteInEdition = note;
    return state;
  })
};

const removeNoteInEdition = () => {
  update((state: TypeState) => {
    state.noteInEdition = null;
    return state;
  })
};

const search = (value: string) => {
  update((state: TypeState) => {

    state.filtered = state.notes.filter((note: TypeNote) => {
      return note.title.toLowerCase().includes(value.toLowerCase()) ||
        note.dsta.toLowerCase().includes(value.toLowerCase());
    });

    return state;
  })
};

/////////////////////////////

// (async () => {
//   //feching para octener las notas de lss nuves
//   const notes = await getNotes();
// })()

createWarehouse({
  notes: [
    {
      key: 'note 1',
      title: 'Estudio 1',
      data: [
        { text: "texto nuevo 1 $checked$" },
        { text: "texto nuevo 2 $check$" },
        {
          list: [
            { isChecked: false, text: 'Estilo 1' },
            { isChecked: false, text: 'Estilo 2' },
            { isChecked: false, text: 'Estilo 3' },
          ],
          withCheck: false
        },
        { text: "texto nuevo 3" },
        {
          list: [
            { isChecked: false, text: 'leer' },
            { isChecked: true, text: 'limpiar' },
            { isChecked: true, text: 'orar' },
            { isChecked: true, text: 'escuchar musica' },
          ],
          withCheck: true
        },
      ],
      color: "#b8e3bb9a",
      tags: ['biblia', 'pastor'],
      remove: null,
      archive: false
    },
    {
      key: 'note 2',
      title: 'Estudio 2',
      data: [
        { text: "texto nuevo 1 $checked$" },
        {
          list: [
            { isChecked: false, text: 'Estilo 1' },
            { isChecked: false, text: 'Estilo 2' },
            { isChecked: false, text: 'Estilo 3' },
          ],
          withCheck: false
        },
        { text: "texto nuevo 3" },
      ],
      color: null,
      tags: ['musica'],
      remove: null,
      archive: false
    },
    {
      key: 'note 3',
      title: 'Estudio 3',
      data: [
        { text: "texto nuevo 1 $checked$" },
        { text: "texto nuevo 2 $check$" },
        {
          list: [
            { isChecked: false, text: 'Estilo 1' },
            { isChecked: false, text: 'Estilo 3' },
          ],
          withCheck: false
        },
        { text: "texto nuevo 3" },
        { text: "texto nuevo 4" },
        { text: "texto nuevo 5" },
      ],
      color: "#b8e1e39a",
      tags: ['otros', 'nuevo'],
      remove: null,
      archive: true
    },
    {
      key: 'note 4',
      title: 'Estudio 4',
      data: [
        { text: "texto nuevo 1 $checked$" },
        { text: "texto nuevo 2 $check$" },
        {
          list: [
            { isChecked: false, text: 'Estilo 1' },
            { isChecked: false, text: 'Estilo 3' },
          ],
          withCheck: false
        },
        { text: "texto nuevo 3" },
        { text: "texto nuevo 4" },
        { text: "texto nuevo 5" },
      ],
      color: null,
      tags: ['otros 2', 'nuevo 2'],
      remove: new Date(),
      archive: false
    },
    {
      key: 'note 5',
      title: 'Estudio 5',
      data: [
        { text: "texto nuevo 1 $checked$" },
        { text: "texto nuevo 2 $check$" },
        {
          list: [
            { isChecked: false, text: 'Estilo 1' },
            { isChecked: false, text: 'Estilo 3' },
          ],
          withCheck: false
        },
        { text: "texto nuevo 3" },
        { text: "texto nuevo 4" },
        { text: "texto nuevo 5" },
      ],
      color: "#e3b8b89a",
      tags: ['otros 9'],
      remove: null,
      archive: false
    },
    {
      key: 'note 6',
      title: 'Estudio 6',
      data: [
        { text: "texto nuevo 1 $checked$" },
        { text: "texto nuevo 2 $check$" },
        {
          list: [
            { isChecked: false, text: 'Estilo 1' },
            { isChecked: false, text: 'Estilo 3' },
          ],
          withCheck: false
        },
        { text: "texto nuevo 3" },
        { text: "texto nuevo 4" },
        { text: "texto nuevo 5" },
      ],
      color: null,
      tags: ['estilos'],
      remove: null,
      archive: false
    },
  ],
  selectedNotes: [],
  noteInEdition: null,

  selectNote,
  clearSelectedNotes,
  addTag,
  archive,
  addColor,
  addTagOfSelect,
  archiveOfSelect,
  addColorOfSelect,
  removeNoteOfSelect,
  addNote,
  removeNote,
  deleteNote,
  updateNote,
  addNoteInEdition,
  removeNoteInEdition,
  search
})