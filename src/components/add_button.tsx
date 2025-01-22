import { Pressable, StyleSheet, Text } from 'react-native'
import { AddIcon } from '../svgs'
import { useState, useEffect } from "react"

export default function AddButton({ onPress }) {
  const [press, setPress] = useState(false);
  const [isPressed, setIsPressed] = useState(true);

  useEffect(() => {
    if (onPress) onPress();
  }, [press])

  return (
    <Pressable
      style={styles.button}
      onPressIn={() => setIsPressed(false)}
      onPressOut={() => setIsPressed(true)}
      onPress={() => setPress(!press)}
    >
      <AddIcon {...styles.changeState(isPressed)} />
    </Pressable>
  )
}

const styles = StyleSheet.create({
  button: ({ pressed }) => [
    {
      borderRadius: 20,
      backgroundColor: '#26a498',
      width: 70,
      height: 70,
      position: 'absolute',
      right: 20,
      bottom: 20,
    },
    pressed && {
      opacity: 0.7,
    }
  ],
  changeState: (isPressed) => isPressed ? { fill: "#117c71" } : { fill: "#1bd5c3" },
});