import { Image, View, Pressable, Text, Dimensions } from 'react-native'
import { useState, useEffect, useRef } from 'react'
import Slider from '@react-native-community/slider'
import { DeleteIcon } from '../icons'
import { TypeUid, TypeImage as TypeImage_ } from '../types'
import { useRouter } from 'expo-router'

type TypeImage = {
  noteKey: TypeUid,
  data: TypeImage_,
};

export default function ImageNote({ noteKey, data }: TypeImage) {
  const router = useRouter();
  const { uri, key: imageKey, size: size_ } = data;

  const [screenWidth, setScreenWidth] = useState(Dimensions.get('window').width);
  const [size, setSize] = useState(size_ ?? (screenWidth / 4));
  const timer = useRef(null);
  const [showControl, setShowControl] = useState(false);

  useEffect(() => {
    const subscription = Dimensions.addEventListener('change', () => {
      setScreenWidth(Dimensions.get('window').width);
    });
    return () => subscription?.remove();
  }, []);

  useEffect(() => {
    if (showControl) {
      clearTimeout(timer.current);

      timer.current = setTimeout(() => {
        setShowControl(false)
      }, 2000);
    }
  }, [showControl, size]);

  const onDelete = () => {
    // Implement delete logic here
    console.log("Delete image");
  };

  return (
    <Pressable className="bg-transluxed rounded p-2 pb-4 my-2 justify-center items-center"
      onLongPress={() => setShowControl(true)}
      onPress={() => router.push(`/camera?noteKey=${noteKey}&imageKey=${imageKey}`)}
    >
      {
        showControl &&
        <View className="flex-row justify-between items-center">
          <View className="w-11/12">
            <Slider
              minimumValue={screenWidth / 4}
              maximumValue={screenWidth - 50}

              minimumTrackTintColor="#FFFFFF"
              maximumTrackTintColor="#000000"
              onValueChange={(value) => setSize(value)}
            />
          </View>

          <DeleteIcon onPress={onDelete} />

        </View>
      }
      {!uri ?
        <Image style={{ width: size, height: size }} source={{ uri: '../assets/hide_image.png' }} /> :
        <Image style={{ width: size, height: size }} source={{ uri }} />
      }
    </Pressable>
  );
}
