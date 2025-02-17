
import { useState, useEffect } from 'react';
import { TextInput, Alert } from 'react-native';
import { useDebounce } from '../hooks/useDebounce';
import { useActions } from 'subscriber_state';
import { TypeText } from '../types';

interface TypeTextData {
  key: string;
  text: string;
}

interface TypeTextProps {
  noteKey: string;
  data: TypeTextData;
}


export default function InputMultilineNote({ noteKey, data }: TypeTextProps) {
  const { addTextToNote, removeTextToNote } = useActions();
  const [textInput, setTextInput] = useState(data.text);
  const debounce = useDebounce();

  useEffect(() => {
    debounce(() => addTextToNote(noteKey, { key: data.key, text: textInput }));
  }, [textInput, debounce, noteKey, data.key, addTextToNote]); // Asegúrate de incluir todas las dependencias

  function handleChange(value: string) {
    let newValue = value.replace(/\$ckd\$/g, '✅');
    newValue = newValue.replace(/\$ck\$/g, '🟩');
    newValue = newValue.replace(/\$xckd\$/g, '❎');
    setTextInput(newValue);
  }

  function handleKeyPress({ nativeEvent: { key } }: any) {
    if (key === 'Backspace' && (textInput === '' || textInput === null)) {
      Alert.alert(
        'Confirmar borrado',
        '¿Estás seguro de que quieres borrar este campo de texto?',
        [
          {
            text: 'OK',
            onPress: () => {
              removeTextToNote(noteKey, data.key);
            },
          },
          {
            text: 'Cancelar',
            style: 'cancel',
          },
        ],
        { cancelable: false }
      );
    }
  }

  return (
    <TextInput
      multiline
      placeholder="Text"
      placeholderTextColor="#c4c4c4ce"
      className="text-white p-0"
      value={textInput}
      onChangeText={handleChange}
      onKeyPress={handleKeyPress}
    />
  );
}


/*
import { TextInput } from "react-native"
import { useState, useEffect } from 'react'
import { useDebounce } from '../hooks/useDebounce'
import { useActions } from 'subscriber_state'
import { TypeText } from '../types'

type TypeText = {
  noteKey: string,
  data: TypeText,
}

export default function InputMultilineNote({ noteKey, data }: TypeText) {
  const { addTextToNote, removeTextToNote } = useActions();
  const [textInput, setTextInput] = useState(data.text)
  const debounce = useDebounce();

  useEffect(() => {
    debounce(() => addTextToNote(noteKey, { key: data.key, text: textInput }));
  }, [textInput])

  //✅  🟩 ❎ 
  function handleChange(value: string) {
    let newValue = value.replace(/\$ckd\$/g, '✅');
    newValue = newValue.replace(/\$ck\$/g, '🟩');
    newValue = newValue.replace(/\$xckd\$/g, '❎');
    setTextInput(newValue)
  }

  return (
    <TextInput
      multiline
      placeholder="Text"
      placeholderTextColor="#c4c4c4ce"
      className="text-white p-0"
      value={textInput}
      onChangeText={handleChange}
    />
  )
}
*/