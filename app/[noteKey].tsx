import { Text, TextInput, ScrollView, View, Alert, Image, StyleSheet, Pressable, FlatList } from 'react-native'
import { TypeNote, TypeText, TypeImage, TypeList } from '../src/types'
import CheckBox from '../src/components/checkbox'
import { useDebounce } from '../src/hooks/useDebounce'
import ImageNote from '../src/components/image_note'
import { BackIcon, ImageIcon, TextIcon, ListIcon } from '../src/icons'
import { useRouter } from 'expo-router'
import { useLocalSearchParams } from 'expo-router'
import Screen from '../src/components/screen'
import { useSubscriberState } from 'subscriber_state'

export default function Note() {
  const { noteKey } = useLocalSearchParams();
  const router = useRouter();
  const fn = useDebounce();
  const [{ notes }, { updateNote }] = useSubscriberState('notes', true, 'NoteEdit')
  const data = notes.find((obj: TypeNote) => obj.key === noteKey);

  function handleTitle(value: string) {
    fn(() => updateNote({ key: noteKey, title: value }))
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
            /*
            data?.data?.map((objs: TypeText[] | TypeImage[] | TypeList[]) => {
            if (objs[0]?.text) {
              return objs.map((obj: TypeText, index: number) =>
                <Text style={[{ marginBottom: 5, color: '#fff' },]} key={index}>{obj.text}</Text>);
            }
            else if (objs[0].uri) {
              return objs.map((obj: TypeImage, index: number) =>
                <ImageNote key={index} uri={obj.uri} />);
            } else if (objs[0].list) {
              return objs.map((obj: TypeList, index: number) => (
                <View
                  key={index}
                  style={styles.list}>
                  {obj.list.map((item: { isChecked: boolean, text: string }, index2: number) =>
                    <CheckBox key={index2} checked={item.isChecked} text={`${item.text}`} />
                  )}
                </View>
              ))
            }
          })
          */
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
      <View className="flex-row gap-7 p-5">
        <ImageIcon color='#3fd2f1' />
        <TextIcon color='#3fd2f1' />
        <ListIcon color='#3fd2f1' />
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
