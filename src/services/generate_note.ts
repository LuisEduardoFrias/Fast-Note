import uuid from 'react-native-uuid';
import { TypeNote } from '../types'

const colors = ['#bb5656', '#6161c6', '#68bc68', '#bcbc48', '#9c4f9c'];

let data = null;

export default function generateNotes(size: number): TypeNote[] {
  
  if(data) return data;
  
  const notes: TypeNote[] = [];
  for (let i = 0; i < size; i++) {
    notes.push(generateRandomNote(i));
  }
  
  data = notes;
  return notes;
}

function generateRandomNote(index: number): TypeNote {
  const note: TypeNote = {
    key: uuid.v4(),
    color: null,
    tags: [],
    data: [],
  };

  // Asigna título o data de forma aleatoria
  if (Math.random() < 0.5) {
    note.title = `Título ${index}`;
  } else {

    const intert = Math.floor(Math.random() * 10) + 1;

    for (let i = 0; i < intert; i++) {
      const select = Math.floor(Math.random() * 15) + 1;
      let obj = [];

      if (select <= 5) {
        const count = Math.floor(Math.random() * 10) + 1;
        for (let j = 0; j < count; j++) {
          obj.push({ text: `Texto de ejemplo ${j}` });
        }
      }
      else if (select <= 10) {
        const count = Math.floor(Math.random() * 4) + 1;
       const  image = ['https://images.pexels.com/photos/1590511/pexels-photo-1590511.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
'https://images.pexels.com/photos/3763907/pexels-photo-3763907.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
'https://images.pexels.com/photos/6943649/pexels-photo-6943649.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
 'https://images.pexels.com/photos/6943409/pexels-photo-6943409.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2']
        for (let j = 0; j < count; j++) {
          obj.push({ uri: image[(Math.floor(Math.random() * 4) + 1)] });
        }
      }
      else {
        const count = Math.floor(Math.random() * 3) + 1;

        for (let j = 0; j < count; j++) {
          const count2 = Math.floor(Math.random() * 10) + 2;
          let list = [];
          for (let k = 0; k < count2; k++) {
            list.push({ isChecked: Math.random() < 0.5, text: `Item ${k}` })
          }
          obj.push({ list });
        };
      }

      note.data.push(obj);
    }
  }

  // Asigna color de forma aleatoria
  if (Math.random() < 0.3) {
    note.color = colors[Math.floor(Math.random() * colors.length)];
  }

  // Asigna tags de forma aleatoria
  if (Math.random() < 0.5) {
    const n = Math.floor(Math.random() * 3) + 1;
    for (let i = 0; i < n; i++) {
      note.tags.push(`Tag ${i}`);
    }
  }

  // Asigna fecha de eliminación de forma aleatoria
  if (Math.random() < 0.2) {
    note.remove = new Date();
  }

  return note;
}