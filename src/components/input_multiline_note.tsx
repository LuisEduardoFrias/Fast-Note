
import { TextInput } from "react-native"
import { useState, useEffect } from 'react'
import { useDebounce } from '../hooks/useDebounce'
import { useActions } from 'subscriber_state'

type TypeText = {
  key: number,
  text: string,
  noteKey: string,
  identity: string,
}

export default function InputMultilineNote({ text, noteKey, identity }: TypeText) {
  const { addTextToNote } = useActions();
  const [textInput, setTextInput] = useState(text)
  const debounce = useDebounce();

  useEffect(() => {
    debounce(() =>
      addTextToNote(noteKey, { key: identity, text: textInput }));
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
      className="text-white p-0"
      value={textInput}
      onChange={(event) => handleChange(event.nativeEvent.text)}
    />
  )
}