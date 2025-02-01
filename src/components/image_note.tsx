import { Image, Text, View, Pressable, StyleSheet, StatusBar, Animated, Dimensions } from 'react-native'
/*import { useState } from 'react'
import { DeleteIcon } from '../icons'

type TypeImage = {
  uri: string
  onDelete: () => void;
}

export default function ImageNote({ uri, onDelete }: TypeImage) {
  const scale = new Animated.Value(1);
  const [size, setSize] = useState({ width: 60, height: 6 })

  const handlePressIn = () => {
    Animated.timing(scale, {
      toValue: 1.2,
      duration: 200,
      useNativeDriver: false,
    }).start();
  };

  const handlePressOut = () => {
    Animated.timing(scale, {
      toValue: 1,
      duration: 200,
      useNativeDriver: false,
    }).start();
  };

  return (
    <Pressable style={{ width: '100%', borderWidth: 1, borderColor: 'red' }} onPressIn={handlePressIn} onPressOut={handlePressOut} onPress={onDelete}>
      <Animated.Image source={{ uri }} style={[styles.image(size), { transform: [{ scale }] }]} />

      <View style={{
        width: '100%',
        height: 30,
        borderWidth: 1, borderColor: 'blue',
        opacity: parseInt(scale.interpolate({ inputRange: [1, 1.2], outputRange: [0, 1] }))
      }}>

        <Slider
          style={{ width: '100%', height: 10 }}
          minimumValue={0}
          maximumValue={100}
          minimumTrackTintColor="#FFFFFF"
          maximumTrackTintColor="#000000"
          onValueChange={(value) => setSize({ width: value, height: value })}
        />

        <Pressable onPress={onDelete}>
          <DeleteIcon />
        </Pressable>
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  image: (size) => ({
    width: `${size.width}%`,
    height: `${200}`,
    marginBottom: 5
  }),
})*/

export default function ImageNote({ uri, onDelete }: TypeImage) {

  return (
    <View>
<Text>Welcome to React Native!</Text>
      </View>
  );
}
