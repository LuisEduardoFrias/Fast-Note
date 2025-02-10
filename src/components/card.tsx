import { Text, View, Image, Alert, StyleSheet, Pressable, FlatList } from 'react-native'
import { TypeNote, TypeText, TypeImage, TypeList } from '../types'
import { useRouter } from 'expo-router'
import CheckBox from './checkbox'
import ImageNote from './image_note'
import { useSubscriberState } from 'subscriber_state'

type TypeCard = {
  data: TypeNote,
  id: string
}

export default function Card({ data, id }: TypeCard) {
  const [state, actions] = useSubscriberState(['selectedNotes'], false, `card-${id}`)
  const { selectedNotes } = state;
  const { updateNote, selectNote } = actions;

  const router = useRouter();
  const isSelected = selectedNotes.includes(data.key);
  const selectIsOn = selectedNotes.length >= 1;

  if (data?.remove || data?.archive) return;

  return (
    <Pressable
      className={`border rounded-2xl border-2 h-48 
      ${isSelected ? 'border-sky-300' : 'border-white'} 
      ${isSelected ? 'border-3' : 'border-0.5'}`}
      style={{ width: '49%', backgroundColor: data?.color, }}
      onPress={() => selectIsOn ? selectNote(data.key) : router.push(`/${data.key}?title=${data?.title}`)}
      onLongPress={() => selectNote(data.key)}
    >
      <View style={{
        borderColor: '#ffffff7f',
        borderBottomWidth: 2,
        marginBottom: 10,
        paddingTop: 10,
        paddingLeft: 10,
        paddingRigth: 10,
      }}>
        <Text style={[{ color: '#fff', fontWeight: '800', }]} >{data?.title}</Text>
      </View>

      <View style={{ margin: 5 }}>
        {data?.data?.map((objs: TypeText[] | TypeImage[] | TypeList[]) => {
          if (objs[0]?.text) {
            return objs.map((obj: TypeText, index: number) =>
              <Text style={[{ marginBottom: 5, color: '#fff' },]} key={index}>{obj.text}</Text>);
          }
          else if (objs[0]?.uri) {
            return objs.map((obj: TypeImage, index: number) =>
              <ImageNote key={index} uri={obj.uri} />);
          } else if (objs[0]?.list) {
            return objs.map((obj: TypeList, index: number) => (
              <FlatList
                key={index}
                style={styles.list}
                data={obj.list}
                renderItem={({ item }: { isChecked: boolean, text: string }, index2: number) =>
                  <CheckBox key={index2} checked={item.isChecked} text={`${item.text}`} />
                }
              />
            ))
          }
        })}
      </View>

      { /*   <View style={{
        filter: 'blur(5)',
        width: "100 % ", height: '200', position: 'absolute',
  borderRadius: 15,
      }}>
      </View >
*/}
      <View key={`${data.key} tags`} style={{
        width: '100%',
        filter: 'blur(0)',
        position: 'absolute', bottom: 8,
        display: 'flex',
        left: 10, flexDirection: 'row',
        gap: 5,
      }}>
        {data?.tags?.map((tag: string, index: number) =>
          <Text style={styles.text} key={index}>{tag}</Text>)}
      </View >
    </Pressable >
  )
}

const styles = StyleSheet.create({
  list: {
    gap: 10,
    marginBottom: 10,
  },
  text: {
    color: '#373737', backgroundColor: '#bfbfbfc6', padding:
      3, borderRadius: 5,
  }
})