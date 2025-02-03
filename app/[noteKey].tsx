import { Text, TextInput, ScrollView, View, Alert, Image, StyleSheet, Pressable, FlatList } from 'react-native'
import { TypeNote, TypeText, TypeImage, TypeList, TypeUid } from '../src/types'
import CheckBox from '../src/components/checkbox'
import { useDebounce } from '../src/hooks/useDebounce'
import ImageNote from '../src/components/image_note'
import { BackIcon, ImageIcon, TextIcon, ListIcon } from '../src/icons'
import { useRouter } from 'expo-router'
import { AddIcon } from '../src/icons/'
import { useLocalSearchParams } from 'expo-router'
import Screen from '../src/components/screen'
import { useSubscriberState } from 'subscriber_state'

export default function Note() {
  const { noteKey } = useLocalSearchParams();
  const router = useRouter();
  const fn = useDebounce();
  const [{ notes }, actions] = useSubscriberState('notes', true, 'NoteEdit')
  const { updateNote, addImageToNote, addTextToNote, addListToNote } = actions;
  const data = notes.find((obj: TypeNote) => obj.key === noteKey);

  function handleTitle(value: string) {
    fn(() => updateNote({ key: noteKey, title: value }))
  }

  function handleTIC(key: TypeUid, text: string) {
    addTextToNote(noteKey, { key, text });
  }

  function handleImgC(key: TypeUid, text: string) {
    addImageToNote(noteKey, { key, text });
  }
  function handleListC(key: TypeUid, text: string) {
    addListToNote(noteKey, { key, text });
  }

  return (
    <Screen>
      <ScrollView >
        <View style={{
          borderColor: '#25fff9',
          borderBottomWidth: 2,
          marginBottom: 10,
          paddingTop: 10,
          paddingLeft: 10,
          paddingRigth: 10,
        }}>
          <TextInput
            className="text-white font-extrabold text-2xl "
            value={data?.title}
            placeholder="Título"
            placeholderTextColor="white"
            onChangeText={handleTitle}
          />
        </View>

        <View style={{ margin: 5 }}>
          {
            data?.data?.map((obj: TypeText | TypeImage | TypeList, index: number) => {
              if (obj.text) {
                return <TextInput key={index} value={obj.text}
                  onChangeText={(value: string) => handleTIC(obj.key, value)} />;
              }
              else if (obj.uri) {
                return <ImageNote key={index} uri={obj.uri} />;
              } else if (obj.list) {
                return (
                  <View
                    key={index}
                    style={styles.list}>
                    {obj?.title ? <Text style={{ color: "#ffff" }}>{obj.title}</Text> : null}
                    {obj.list.map((item: { key: TypeUid, isChecked: boolean, text: string }, index2: number) =>
                      <CheckBox key={index2}
                        checked={item.isChecked}
                        withCheck={obj.withCheck}
                        onChange={(value) => handleListC(obj.key, value)} text={`${item.text}`} />
                    )}
                    <AddIcon />
                  </View>
                )
              }
            })
          }
        </View>

        <View key={`${data.key} tags`} style={{
          width: '100%',
          filter: 'blur(0)',
          display: 'flex',
          left: 10, flexDirection: 'row',
          gap: 5,
        }}>
          {data?.tags?.map((tag: string, index: number) =>
            <Text style={styles.text} key={index}>{tag}</Text>)}
        </View>

      </ScrollView>
      <View style={{ gap: 20 }} className="flex-row p-3">
        <ImageIcon color='#3fd2f1' onPress={() => addImageToNote(noteKey)} />
        <TextIcon color='#3fd2f1' onPress={() => addTextToNote(noteKey)} />
        <ListIcon color='#3fd2f1' onPress={() => addListToNote(noteKey)} />
      </View>
    </Screen>
  )
}

const styles = StyleSheet.create({
  list: {
    gap: 10,
    marginBottom: 10,
  },
  text: {
    color: '#373737',
    backgroundColor: '#bfbfbfc6',
    padding: 3,
    borderRadius: 5,
  }
})
