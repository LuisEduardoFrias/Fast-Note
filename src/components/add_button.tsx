import { Pressable, StyleSheet, Text } from 'react-native'
import { AddIcon } from '../icons'

export default function AddButton({ onPress }) {
  return (
    <Pressable
      style={({ pressed }) => [
        {
          borderRadius: 20,
          backgroundColor: '#25fff9',
          width: pressed ? 68 : 70,
          height: pressed ? 68 : 70,
          position: 'absolute',
          right: 20,
          bottom: 20,
          justifyContent: 'center',
          alignItems: 'center',
          opacity: pressed ? 0.7 : 1,
        }
      ]}
      onPress={() => {if(onPress)  onPress()}}
    >
      <AddIcon size={60} />
    </Pressable>
  )
}

