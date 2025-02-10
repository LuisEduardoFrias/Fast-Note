
import { TextInput, View, Alert, Switch, Pressable } from 'react-native'
import { useState, useEffect } from 'react'
import { useActions } from 'subscriber_state'
import { useDebounce } from '../hooks/useDebounce'
import { AddIcon, RemoveIcon } from '../icons'
import CheckBox from './checkbox'
import { TypeUid, TypeListItem } from '../types'
import uuid from 'react-native-uuid';

type TypeList = {
  key: TypeUid,
  noteKey: TypeUid,
  data: TypeList
}

const defaultValue = { key: uuid.v4(), isChecked: false, text: '' };

export default function ListNote({ data, noteKey }: TypeList) {
  const { key, title, withCheck: _withCheck, list } = data;
  const [items, setItems] = useState(list);
  const [withCheck, setWithCheck] = useState(_withCheck);
  const [inputTitle, setInputTitle] = useState(title ?? "");
  const { addListToNote, removeListToNote } = useActions();
  const debounce = useDebounce();

  useEffect(() => {
    debounce(() =>
      addListToNote(noteKey, {
        key,
        title: inputTitle,
        list: items,
        withCheck
      }));
  }, [inputTitle, items, withCheck])

  function handleSetItems(value: TypeListItem) {
    setItems((prev: TypeListItem[]) => {

      const index = prev.findIndex((obj: TypeListItem) => obj.key === value.key);

      if (index !== -1) {
        return prev.toSpliced(index, 1, value);
      }

      return prev;
    })
  }

  function handleRemove(checkboxKey: TypeUid) {
    setItems((prev: TypeListItem[]) => {

      const index = prev.findIndex((obj: TypeListItem) => obj.key === checkboxKey);

      if (index !== -1) {
        return prev.toSpliced(index, 1);
      }

      return prev;
    })
  }

  function handleSubmit() {
    setItems([...items, { ...defaultValue, key: uuid.v4() }])
  }

  function showAlertActiveCheckBox() {
    Alert.alert(
      `¿${!withCheck ? 'Activar' : 'Desactivar'} checkboxes?`,
      null,
      [
        {
          text: `${!withCheck ? 'Activar' : 'desactivar'}`,
          onPress: () => setWithCheck(!withCheck),
        },
        {
          text: 'Cancelar',
        },
      ],
      { cancelable: true }
    )
  };

  function showAlertDeleteList() {
    Alert.alert(
      `¿Seguro que decea elimiar la lista?`,
      null,
      [
        {
          text: 'Okey',
          onPress: () => removeListToNote(noteKey, key),
        },
        {
          text: 'Cancelar',
        },
      ],
      { cancelable: true }
    );
  }

  return (
    <Pressable style={{ backgroundColor: '#ffffff07' }} className="space-x-1 rounded my-2 p-1"
      onLongPress={showAlertActiveCheckBox} >

      <View style={{ borderColor: '#ffffff07' }} className="flex-row justify-between items-center mb-2 border-b border-dashed">
        <TextInput
          className="font-extrabold text-white w-10/12"
          placeholder="Título"
          placeholderTextColor="#fff"
          value={inputTitle}
          onChangeText={(text) => setInputTitle(text)}
        />
        <RemoveIcon onPress={showAlertDeleteList} />
      </View>

      {items.map((item: TypeListItem, index: number) =>
        <CheckBox
          key={item.key}
          withCheck={withCheck}
          onFocus={((index + 1) === items.length)}
          data={item}
          onSubmit={handleSubmit}
          value={handleSetItems}
          remove={(checkboxKey: TypeUid) => handleRemove(checkboxKey)}
        />
      )}

      <View className="my-2 rounded-full w-7 border-2 border-white ">
        <AddIcon color="#ffff" onPress={() => setItems([...items, { ...defaultValue, key: uuid.v4() }])} />
      </View>
    </Pressable>
  )
}