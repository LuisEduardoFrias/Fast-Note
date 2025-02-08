import { Text, TextInput, ScrollView, View, Alert, Image, StyleSheet, Pressable, FlatList } from 'react-native'
import { TypeNote, TypeText, TypeImage, TypeList, TypeUid } from '../src/types'
import CheckBox from '../src/components/checkbox'
import InputTitleNote from '../src/components/input_title_note'
import InputMultilineNote from '../src/components/input_multiline_note'
import ImageNote from '../src/components/image_note'
import { BackIcon, ImageIcon, TextIcon, ListIcon } from '../src/icons'
import { useRouter } from 'expo-router'
import { AddIcon } from '../src/icons/'
import { useState } from 'react'
import { useLocalSearchParams } from 'expo-router'
import Screen from '../src/components/screen'
import { useSubscriberState } from 'subscriber_state'

export default function Note() {
  const { noteKey } = useLocalSearchParams();
  const router = useRouter();
  const [{ notes }, actions] = useSubscriberState('notes', true, 'NoteEdit')
  const { addImageToNote, addTextToNote, addListToNote } = actions;
  const { title, data, tags } = notes.find((obj: TypeNote) => obj.key === noteKey);

  function handleImgC(key: TypeUid, text: string) {
    addImageToNote(noteKey, { key, text });
  }
  function handleListC(key: TypeUid, text: string) {
    addListToNote(noteKey, { key, text });
  }

  return (
    <View className="flex-1 bg-dark-theme">
      <Screen>
        <ScrollView className="relative" >
          <InputTitleNote title={title} noteKey={noteKey} />

          <View style={{ margin: 5 }}>
            {
              data?.map((obj: TypeText | TypeImage | TypeList) => {
                if (obj.text) {
                  return <InputMultilineNote
                    key={obj.key}
                    noteKey={noteKey}
                    identity={obj.ke}
                    text={obj.text}
                  />
                } else if (obj.uri) {
                  return <ImageNote key={obj.ke} uri={obj.uri} />;
                } else if (obj.list) {
                  return <List
                    key={obj.ke}
                    title={obj.title}
                    withCheck={obj.withCheck}
                    list={obj.list}
                    onChange={(value) => handleListC(obj.key, value)} />
                }
              })
            }
          </View>


          <View className="w-full h-10">
          </View>
        </ScrollView>

        <View className="w-full absolute bottom-2 px-1.5 flex-row space-x-2">
          {tags.map((tag: string, index: number) =>
            <Text className="text-gray-950 bg-gray-300.5 p-1 rounded-md" key={index}>{tag}</Text>)}
        </View>

      </Screen>
      <View className="w-full flex-row p-3 space-x-8 border-t border-cyan-700">
        <ImageIcon color='#3fd2f1' onPress={() => addImageToNote(noteKey)} />
        <TextIcon color='#3fd2f1' onPress={() => addTextToNote(noteKey)} />
        <ListIcon color='#3fd2f1' onPress={() => addListToNote(noteKey)} />
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  list: {
    gap: 10,
    marginBottom: 10,
  },

})


type TypeList = {
  key: number,
  title?: string,
  withCheck: boolean,
  list: TypeListItem[],
  onChange: (value: string) => void
}

type TypeListItem = {
  key: TypeUid,
  isChecked: boolean,
  text: string
}



function List({ title, list, withCheck, onChange }: TypeList) {
  const [items, setItems] = useState(list);
  const defaultValue = { key: '', isChecked: false, text: '' }

  function handleRemove(index: number) {
    setItems((prev: TypeListItem[]) => {
      return prev.toSpliced(index, 1);
    })
  }

  //{nativeEvent: {text, eventCount, target}}
  function handleSubmit(value) {
    console.log("'''''''''''''''''::::::'''''''''''''''''")
    console.log(value.text)
    console.log(value.target)
    console.log(value.eventCount)
    setItems([...items, defaultValue])
  }

  return (
    <View style={styles.list} className="my-2">
      <TextInput className="font-extrabold text-white" value={title} />

      {items.map((item: TypeListItem, index: number) =>
        <CheckBox
          key={index}
          checked={item.isChecked}
          withCheck={withCheck}
          onFocus={((index + 1) === items.length)}
          text={item.text}
          onChange={onChange}
          onSubmit={handleSubmit}
          remove={() => handleRemove(index)}
          value={() => { }}
        />
      )}

      <AddIcon onPress={() => setItems([...items, defaultValue])} />
    </View>
  )
}
