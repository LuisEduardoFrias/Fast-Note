import { createWarehouse, update } from 'subscriber_state'
import { TypeNote, TypeUid, TypeImage, TypeText, TypeList } from '../types'
import { getNotes, postNote, clear } from '../services/keep'
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
  addImageToNote: (key: TypeUid, data?: TypeImage) => void,
  addTextToNote: (key: TypeUid, data?: TypeText) => void,
  addListToNote: (key: TypeUid, data?: TypeList) => void,
  removeListToNote: (noteKey: TypeUid, listKey: TypeUid) => void,
  removeNote: (key: TypeUid) => void,
  deleteNote: (key: TypeUid) => void,
  deleteImageToNote: (noteKey: TypeUid, imageKey: TypeUid) => void,
  updateNote: (note: TypeNote) => void,
  updateImage: (notekey: TypeNote, imageKey: TypeUid, uri: string) => void,
  addNoteInEdition: (note?: TypeNote) => void,
  removeNoteInEdition: () => void,
  removeTextToNote: (notekey: TypeNote, textKey: TypeUid) => void,
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

    postNote(state.notes);

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

    postNote(state.notes);
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

    postNote(state.notes);
    return state;
  })
};

const addTagOfSelect = (tag: string) => {
  update((state: TypeState) => {
    state.selectedNotes.forEach((uid: TypeUid) => {
      const index = state.notes.findIndex(obj => obj.key === uid);

      if (index !== -1) {
        console.log(state.notes[index])
        const indexTag = state.notes[index]?.tags
          .findIndex((_tag_: string) => _tag_ === tag);

        indexTag !== -1 ?
          state.notes[index]?.tags.splice(indexTag, 1) :
          state.notes[index]?.tags.push(tag);
      }
    })

    state.selectedNotes = [];
    postNote(state.notes);
    return state;
  })
};

const archiveOfSelect = () => {
  update((state: TypeState) => {
    state.selectedNotes.forEach((uid: TypeUid) => {
      const index = state.notes.findIndex(obj => obj.key === uid);

      if (index !== -1) {
        state.notes[index]?.archive ?
          state.notes[index].archive = false :
          state.notes[index].archive = true;
      }
    })

    state.selectedNotes = [];
    postNote(state.notes);
    return state;
  })
};

const addColorOfSelect = (color: string) => {
  update((state: TypeState) => {
    state.selectedNotes.forEach((uid: TypeUid) => {
      const index = state.notes.findIndex(obj => obj.key === uid);

      if (index !== -1) {
        const isEquialColor = state.notes[index]?.color === color;

        isEquialColor ?
          state.notes[index].color = null :
          state.notes[index].color = color;
      }
    });

    state.selectedNotes = [];
    postNote(state.notes);
    return state;
  })
};

const removeNoteOfSelect = () => {
  update((state: TypeState) => {
    state.selectedNotes.forEach((uid: TypeUid) => {
      const datetime = new Date;

      // removeNoteKeep(uid, datetime);

      const index = state.notes.findIndex(obj => obj.key === uid);

      if (index !== -1) {
        state.notes[index].remove = datetime;
      }
    });

    state.selectedNotes = [];
    postNote(state.notes);
    return state;
  })
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

    // postNote(state.notes);
    return state;
  })
  return key;
};

const addImageToNote = (key: TypeUid, data?: TypeImage) => {
  update((state: TypeState) => {
    const index = state.notes.findIndex((obj: TypeNote) => obj.key === key);

    if (!data) {
      state.notes[index].data.push({
        key: uuid.v4(),
        uri: null,
        size: null
      })
      console.log(state.notes[index].data)
    } else {
      const indexImg = state.notes[index].data.findIndex((obj: TypeImage) => obj.key === data.key);
      state.notes[index].data[indexImg] = data;
    }

    postNote(state.notes);
    return state;
  })
}

const addTextToNote = (key: TypeUid, data?: TypeText) => {
  update((state: TypeState) => {
    const index = state.notes.findIndex((obj: TypeNote) => obj.key === key);

    if (!data) {
      state.notes[index].data.push({ key: uuid.v4(), text: null })
    } else {
      const indexText = state.notes[index].data.findIndex((obj: TypeText) => obj.key === data.key);
      state.notes[index].data[indexText] = data;
    }

    postNote(state.notes);
    return state;
  })
}

const addListToNote = (key: TypeUid, data?: TypeList) => {
  update((state: TypeState) => {
    const index = state.notes.findIndex((obj: TypeNote) => obj.key === key);

    if (index !== -1) {
      if (!data) {
        state.notes[index].data.push({ key: uuid.v4(), list: [], withCheck: false })
      } else {
        const indexList = state.notes[index].data.findIndex((obj: TypeList) => obj.key === data.key);
        state.notes[index].data[indexList] = data;
      }
    }

    postNote(state.notes);
    return state;
  })
}

const removeListToNote = (noteKey: TypeUid, listKey: TypeUid) => {
  update((state: TypeState) => {
    const index = state.notes.findIndex((obj: TypeNote) => obj.key === noteKey);

    if (index !== -1) {
      const indexList = state.notes[index].data.findIndex((obj: TypeList) => obj.key === listKey);
      state.notes[index].data.splice(indexList, 1);
    }

    postNote(state.notes);
    return state;
  })
}

const removeNote = (key: TypeUid) => {
  (async () => {
    const datetime = new data();// await removeNoteKeep(key);

    update((state: TypeState) => {
      const index = state.notes.findIndex((note: typeNote) => note.key === key);
      state.notes[index].remove = datetime;

      postNote(state.notes);
      return state;
    })
  })()
};

const deleteNote = (key: TypeUid) => {
  update((state: TypeState) => {
    const index = state.notes.findIndex((note: typeNote) => note.key === key);
    state.notes.splice(index, 1);

    postNote(state.notes);
    return state;
  })
};

const deleteImageToNote = (noteKey: TypeUid, imageKey: TypeUid) => {
  update((state: TypeState) => {
    const index = state.notes.findIndex((note: typeNote) => note.key === noteKey);
    const indexImage = state.notes[index].data.findIndex((obj: TypeImage | TypeList | TypeText) => obj.key === imageKey);
    state.notes[index].data.splice(indexImage, 1);

    postNote(state.notes);
    return state;
  })
};

const updateNote = (note: TypeNote) => {
  update((state: TypeState) => {
    const index = state.notes.findIndex((_note_: typeNote) => _note_.key === note.key);
    state.notes[index] = { ...state.notes[index], ...note };

    postNote(state.notes);
    return state;
  })
};

const updateImage = (notekey: TypeNote, imageKey: TypeUid, { uri, size }: TypeImage) => {
  update((state: TypeState) => {
    const noteIndex = state.notes.findIndex((_note_: typeNote) => _note_.key === notekey);
    if (noteIndex !== -1) {
      const imgIndex = state.notes[noteIndex].data.findIndex((img: TypeImage) => img.key === imageKey);

      if (imgIndex !== -1) {
        state.notes[noteIndex].data[imgIndex].uri = uri;
        if (size) state.notes[noteIndex].data[imgIndex].size = size;
      } else {
        console.log("The image '", imageKey, "' don't exists")
      }
    } else {
      console.log("The note '", notekey, "' don't exists")
    }

    postNote(state.notes);
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

const removeTextToNote = (notekey: TypeNote, textKey: TypeUid) => {
  update((state: TypeState) => {
    const noteIndex = state.notes.findIndex((obj: TypeNote) => obj.key === notekey);
    const textIndex = state.notes[noteIndex].data.findIndex((obj: TypeList | TypeText | TypeImage) => obj.key === textKey);
    state.notes[noteIndex].data.splice(textIndex, 1);

    postNote(state.notes)
    return state;
  })
};

const search = (value: string) => {
  update((state: TypeState) => {

    state.filtered = state?.notes?.filter((note: TypeNote) => {
      return note.title.toLowerCase().includes(value.toLowerCase()) ||
        note.dsta.toLowerCase().includes(value.toLowerCase());
    });

    return state;
  })
};

/////////////////////////////


(async () => {
  //feching para octener las notas de lss nuves
  // await clear();
  const notes = await getNotes() ?? [];

  createWarehouse({
    notes: notes,
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
    addImageToNote,
    addTextToNote,
    addListToNote,
    removeListToNote,
    removeNote,
    deleteNote,
    deleteImageToNote,
    updateNote,
    updateImage,
    addNoteInEdition,
    removeNoteInEdition,
    removeTextToNote,
    search
  });

})()


/*
[
      {
        key: uuid.v4(),
        title: 'Estudio 1',
        data: [
          { key: uuid.v4(), uri: null, size: null },
          { key: uuid.v4(), uri: null, size: null },
        ],
        color: null,
        tags: ['biblia'],
        remove: null,
        archive: false
      },
      {
        key: uuid.v4(),
        title: 'Estudio 2',
        data: [
          { key: uuid.v4(), uri: null, size: null },
        ],
        color: "#b8e3bb9a",
        tags: [],
        remove: null,
        archive: false
      },
      /* {
         key: 'note 1',
         title: 'Estudio 1',
         data: [
           { key: '9th', text: "texto nuevo 1 $checked$" },
           { key: '2ei', text: "texto nuevo 2 $check$" },
           {
             key: '5thi8',
             list: [
               { key: '3f8h', isChecked: false, text: 'Estilo 1' },
               { key: '2r0y', isChecked: false, text: 'Estilo 2' },
               { key: 'uo9', isChecked: false, text: 'Estilo 3' },
             ],
             withCheck: false
           },
           { key: 'lo9', text: "texto nuevo 3" },
           {
             key: 'j8lf',
             list: [
               { key: 'y27k', isChecked: false, text: 'leer' },
               { key: 'jwlp', isChecked: true, text: 'limpiar' },
               { key: '7wh7kb', isChecked: true, text: 'orar' },
               { key: '62blz', isChecked: true, text: 'escuchar musica' },
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
         key: uuid.v4(),
         title: 'Estudio Musica',
         data: [
           {
             key: uuid.v4(),
             title: 'Acordes',
             list: [
               { key: uuid.v4(), isChecked: false, text: 'C - DO' },
               { key: uuid.v4(), isChecked: false, text: 'C# - DO#' },
               { key: uuid.v4(), isChecked: false, text: 'D - RE' },
               { key: uuid.v4(), isChecked: false, text: 'D# - RE#' },
               { key: uuid.v4(), isChecked: false, text: 'E - MI' },
               { key: uuid.v4(), isChecked: false, text: 'F - FA' },
               { key: uuid.v4(), isChecked: false, text: 'F# - FA#' },
               { key: uuid.v4(), isChecked: false, text: 'G - SOL' },
               { key: uuid.v4(), isChecked: false, text: 'G# - SOL#' },
               { key: uuid.v4(), isChecked: false, text: 'A - LA' },
               { key: uuid.v4(), isChecked: false, text: 'A# - LA#' },
             ],
             withCheck: true
           },
           {
             key: uuid.v4(),
             list: [
               { key: uuid.v4(), isChecked: false, text: 'C# - DO#' },
               { key: uuid.v4(), isChecked: false, text: 'D# - RE#' },
               { key: uuid.v4(), isChecked: false, text: 'G# - SOL#' },
               { key: uuid.v4(), isChecked: false, text: 'F# - FA#' },
               { key: uuid.v4(), isChecked: false, text: 'A# - LA#' },
             ],
             withCheck: true
           }
         ],
         color: null,
         tags: ['Musica'],
         remove: null,
         archive: false
       },
       {
         key: 'note 2',
         title: 'Estudio 2',
         data: [
           { key: 'zuwil', text: "texto nuevo 1 $checked$	&#x2705" },
           { key: 'hd7zu', text: "otro ejemplo $check$ &#x274e; " },
           { key: 'wjd', text: "release the Alt key and you get a ✅ Heavy White 🟩 heck Mark." },
           { key: 'dywz', text: "To write the Negative Squared Cross Mark symbol ❎ on keyboard using ALT codes; ALT+10062, just hold down the ALT key while typing the alt key code 10062. You have to use the numeric keypad of your keyboard. If you don not have numeric keypad, hold down the Fn and ALT keys while typing the alt code number." },
           {
             key: 'hd8e',
             title: 'sin titulo',
             list: [
               { key: '123', isChecked: false, text: 'Estilo 1' },
               { key: '628', isChecked: false, text: 'Estilo 2' },
               { key: 'p7e', isChecked: false, text: 'Estilo 3' },
             ],
             withCheck: false
           },
           { key: '626x6ik', text: "mas texto 3" },
           { key: 'jdile', text: "jajaj haybque ver" },
           { key: 'hr6', text: "mas escrituras" },
           {
             title: 'sin titulo',
             key: 'j26i',
             list: [
               { key: 'o29zk', isChecked: false, text: 'otros 1' },
               { key: 'id8o2n', isChecked: true, text: 'otros 2' },
             ],
             withCheck: true
           },
           { key: 'jeild', text: "ultimo " },
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
         title: 'Estudio 6', data: [
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
    ]

*/