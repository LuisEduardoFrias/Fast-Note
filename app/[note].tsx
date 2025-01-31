import { Text, ScrollView, View, Image, StyleSheet, Pressable, FlatList } from 'react-native'
import { TypeNote, TypeText, TypeImage, TypeList } from '../src/types'
import CheckBox from '../src/components/checkbox'
import ImageNote from '../src/components/image_note'
import { Back } from '../src/svgs';
import { useLocalSearchParams } from 'expo-router'
import { Link } from 'expo-router';
import generateNotes from '../src/services/generate_note'
import Screen from '../src/components/screen'

export default function Note() {
   const { note } = useLocalSearchParams();
   const data = generateNotes(10).find((obj) => obj.key === note);
 
   return (
     <Screen>
       <Link asChild href='/' >
         <Pressable>
           {
             ({ pressed }) => <Back color={`${pressed ? '#3fd2f1' : 'red'}`} />
           }
         </Pressable>
       </Link>
       <ScrollView >
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
           })}
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
       <View style={{ flexDirection: 'row', gap: 20, padding: 10 }}>
         <FontAwesome name='image' size={24} color='#3fd2f1' />
         <FontAwesome name='text' size={24} color='#3fd2f1' />
         <FontAwesome name='list' size={24} color='#3fd2f1' />
       </View>
     </Screen>
   )
  return <Text>Welcome to React Native!</Text>
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
