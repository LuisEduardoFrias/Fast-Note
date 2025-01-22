import { Text,View, TextInput, Pressable } from 'react-native';


export default function Header() {
  return (
    <View>
      <Pressable>
      
      </Pressable>
      <TextInput style={{
          height: 40,
          borderColor: 'gray',
          borderWidth: 1,
          color:'white'
        }}
        defaultValue="Header"/>
    </View>
  )
}