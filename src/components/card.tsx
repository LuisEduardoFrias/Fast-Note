import { Text, View, Image, StyleSheet, Pressable, FlatList } from 'react-native'
import { TypeNote, TypeText, TypeImage, TypeList } from '../types'
import { Link } from 'expo-router'
import CheckBox from './checkbox'
import ImageNote from './image_note'

type TypeCard = {
  data: TypeNote
}

export default function Card({ data }: TypeCard) {

  if (data?.remove) return;

  return (
    <Link asChild href={`/${data.key}`} key={data.key} style={{ backgroundColor: '#242424', marginBottom: 5, marginRight: 5 }}>
      <Pressable style={styles.card(data)}>
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
          {data.data.map((objs: TypeText[] | TypeImage[] | TypeList[]) => {
            if (objs[0]?.text) {
              return objs.map((obj: TypeText, index: number) =>
                <Text style={[{ marginBottom: 5, color: '#fff' },]} key={index}>{obj.text}</Text>);
            }
            else if (objs[0].uri) {
              return objs.map((obj: TypeImage, index: number) =>
                <ImageNote key={index} uri={obj.uri} />);
            } else if (objs[0].list) {
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
        width: "100%", height: '200', position: 'absolute',
        borderRadius: 15,
      }}>
      </View>
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
        </View>
      </Pressable>
    </Link>
  )
}

const styles = StyleSheet.create({
  card: (data: TypeNote) => ({
    flex: 1,
    borderRadius: 20,
    borderWidth: 0.5,
    borderColor: '#ffffff',
    overflow: 'hidden',
    backgroundColor: data.color,
    height: 200,
    width: '100%',
  }),
  list: {
    gap: 10,
    marginBottom: 10,
  },
  text: {
    color: '#373737', backgroundColor: '#bfbfbfc6', padding:
      3, borderRadius: 5,
  }
})