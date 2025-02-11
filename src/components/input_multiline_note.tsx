
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
  const { addTextToNote } = useActions();
  const [textInput, setTextInput] = useState(data.text)
  const debounce = useDebounce();

  useEffect(() => {
    debounce(() =>
      addTextToNote(noteKey, { key: data.key, text: textInput }));
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