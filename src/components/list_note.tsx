
import { TextInput, View, Alert } from 'react-native'
import { useState, useEffect } from 'react'
import { useActions } from 'subscriber_state'
import { useDebounce } from '../hooks/useDebounce'
import { AddIcon } from '../icons'
import CheckBox from './checkbox'
import { TypeUid } from '../types'
import uuid from 'react-native-uuid';

type TypeList = {
  key: TypeUid,
  identity: TypeUid,
  title?: string,
  withCheck: boolean,
  list: TypeListItem[],
}

type TypeListItem = {
  key: TypeUid,
  isChecked: boolean,
  text: string
}

const defaultValue = { key: uuid.v4(), isChecked: false, text: '' };

export default function ListNote({ title, identity, list, withCheck }: TypeList) {
  const [items, setItems] = useState(list);
  const [inputTitle, setInputTitle] = useState(title);
  const debounce = useDebounce();
  const { addListToNote } = useActions();

  useEffect(() => {
    //update list with title
    /*
    debounce(() =>
      addListToNote(noteKey, { key: identity, text }));
      */

    // Alert.alert("items", JSON.stringify(items, null, 2))
  }, [inputTitle, items])


  function handleSetItems(value: { key: TypeUid, checked: boolean, text: string }) {
    setItems((prev: TypeListItem[]) => {

      const index = prev.findIndex((obj: TypeListItem) => obj.key === value.key);

      if (index !== -1) {
        return prev.toSpliced(index, 1, value);
      }

      return prev;
    })
  }

  function handleRemove(key: TypeUid) {
    setItems((prev: TypeListItem[]) => {

      const index = prev.findIndex((obj: TypeListItem) => obj.key === key);

      if (index !== -1) {
        return prev.toSpliced(index, 1);
      }

      return prev;
    })
  }

  function handleSubmit(value) {
    setItems([...items, { ...defaultValue, key: uuid.v4() }])
  }

  return (
    <View className="space-x-1 my-2">

      <TextInput
        className="font-extrabold text-white"
        value={inputTitle}
        onChange={(event) => setInputTitle(event.nativeEvent.text)}
      />

      {items.map((item: TypeListItem, index: number) =>
        <CheckBox
          key={item.key}
          identity={item.key}
          checked={item.isChecked}
          withCheck={withCheck}
          onFocus={((index + 1) === items.length)}
          text={item.text}
          onSubmit={handleSubmit}
          remove={(key: TypeUid) => handleRemove(key)}
          value={handleSetItems}
        />
      )}

      <View className="mt-3 rounded-full w-7 border-2 border-white ">
        <AddIcon color="#ffff" onPress={() => setItems([...items, { ...defaultValue, key: uuid.v4() }])} />
      </View>
    </View>
  )
}




