import { StyleSheet, Text, View, Button, FlatList } from 'react-native'
/*import { useState, useEffect } from 'react'
import { StatusBar } from 'expo-status-bar'
import { Link } from 'expo-router'

import generateNotes from '../src/services/generate_note'
import Menu from '../src/components/menu'
import Header from '../src/components/header'
import AddButton from '../src/components/add_button'
import Card from '../src/components/card'
import Screen from '../src/components/screen'
*/
export default function Index() {
  /* const [data, setData] = useState(null);
 
   useEffect(() => {
     setData(generateNotes(10));
   }, [])
 
   return (
     <Screen>
       <StatusBar style="auto" />
       <Header />
       <Menu />
       <FlatList
         key='notes-list'
         style={styles.list}
         data={data}
         renderItem={({ item }) =>
           <Card data={item} />
         }
       />
       <AddButton />
     </Screen>
   );
   */

  return (
    <View>
      <Text style={{ color: "#0000" }}>Hola a todo</Text>
    </View>
  )
}
/*
const styles = StyleSheet.create({
  list: {
    flex: 1,
    paddingHorizontal: 10,
    borderColor: 'red',
    borderWidth: 0,
  }
});
*/