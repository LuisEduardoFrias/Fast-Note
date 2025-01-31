import { warehouse, update } from 'subscriber_state'
import { TypeNote, TypeUid } from '../types'
import { getNotes, removeNote, deleteNote } from '../services/keep'

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
  addNote: (note: TypeNote) => void,
  removeNote: (key: TypeUid) => void,
  deleteNote: (key: TypeUid) => void,
  updateNote: (note: TypeNote) => void,
  addNoteInEdition: (note?: TypeNote) => void,
  removeNoteInEdition: () => void,
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
  update((state: TypeState) => {
    state.selectedNotes = [];
    return state;
  })
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
        state.notes[index].archive = false :
        state.notes[index].archive = true;
    })

    return state;
  })
};

const addColorOfSelect = (color: string) => {
  update((state: TypeState) => {
    state.selectedNotes.forEach((note: TypeNote) => {
      const isEquialColor = state.notes[note]?.color === color;

      isEquialColor ?
        state.notes[index].color = null :
        state.notes[index].color = color;
    });

    return state;
  })
};

const addNote = (note: TypeNote) => {
  update((state: TypeState) => {
    state.notes.push(note);
    return state;
  })
};

const removeNote = (key: TypeUid) => {
  (async () => {
    const datetime = await removeNote(key);

    update((state: TypeState) => {
      const index = state.notes.findIndex((note: typeNote) => note.key === key);
      state.notes[index].remove = datetime;
      return state;
    })
  })()
};

const deleteNote = (key: TypeUid) => {
  (async () => {
    await deleteNote(key);

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

/////////////////////////////

(async () => {
  //feching para octener las notas de lss nuves

  const notes = await getNotes();

  warehouse({
    notes: notes && [],
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
    addNote,
    removeNote,
  deleteNote,
    updateNote,
    addNoteInEdition,
    removeNoteInEdition
  })
})()