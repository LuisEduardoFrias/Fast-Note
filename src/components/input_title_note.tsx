
import { TextInput, View } from 'react-native'
import { useState, useEffect } from 'react'
import { useDebounce } from '../hooks/useDebounce'
import { useActions } from 'subscriber_state'

export default function InputTitleNote({ title, noteKey }: { title: string, noteKey: string }) {
  const [text, setText] = useState(title)
  const { updateNote } = useActions()
  const debounce = useDebounce();

  useEffect(() => {
    debounce(() =>
      updateNote({ key: noteKey, title: text }))
  }, [text])

  return (
    <View className="border-cyan-500 border-b mb-5">
      <TextInput
        className="text-white font-extrabold text-2xl"
        value={text}
        placeholder="Título"
        placeholderTextColor="white"
        onChangeText={(value)=>setText(value)}
      />
    </View>
  )
}