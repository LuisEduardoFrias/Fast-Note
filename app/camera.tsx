
import { useState, useEffect, useRef } from 'react'
import { View, Pressable, Text, Button, Image } from 'react-native'
import { CameraView, useCameraPermissions } from 'expo-camera'
import * as  MediaLibrary from 'expo-media-library'
import { TypeUid } from '../src/types'
import { CameraReverseIcon, GaleryIcons, FlashIcon, CheckIcon, RepeatIcon } from '../src/icons'
import { useActions } from 'subscriber_state'
import { useRouter, useLocalSearchParams } from 'expo-router'
import Screen from '../src/components/screen'

enum CameraType { 'back' = 'back', 'front' = 'front' }
enum FlashMode { 'on' = 'on', 'off' = 'off' }
enum ImageType { 'png' = 'png' }

export default function Camara() {
  const [albums, setAlbums] = useState(null);
  const { updateImage } = useActions();

  const [madiaLiblaryPermission, mediaLibraryRequestPermission] = MediaLibrary.usePermissions();
  const [cameraPermission, cameraRequestPermission] = useCameraPermissions();
  const router = useRouter();
  const { noteKey, imageKey } = useLocalSearchParams();

  const [image, setImage] = useState(null);
  const [facing, setFacing] = useState<CameraType>(CameraType.back);
  const [flash, setFlash] = useState<FlashMode>(FlashMode.off);
  const cameraRef = useRef(null);

  if (!cameraPermission) {
    return <View />;
  }

  if (!cameraPermission.granted) {
    return (
      <Screen css="items-center flex-1  justify-center">
        <Text className="font-extrabold text-white text-center pb-3">We need your camera permission to show the camera</Text>
        <Pressable
          className="justify-center items-center h-20 bg-transluxed border border-gray-500 rounded-3xl w-7/12"
          onPress={cameraRequestPermission}>
          {
            ({ pressed }) =>
              <Text className={pressed ? "text-white" : "text-green-500"}>
                Grant camera permission
              </Text>
          }
        </Pressable>
      </Screen >
    );
  }

  async function takePicture() {
    if (cameraRef) {
      try {
        const data = await cameraRef.current.takePictureAsync({ imageType: ImageType.png });
        setImage(data.uri);
        
      } catch (error) {
        console.log(error)
      }
    }
  }

  async function saveImage() {
    if (image) {
      try {
        const obj = await MediaLibrary.createAssetAsync(image);
        updateImage(noteKey, imageKey,{ uri:obj.uri})
        setImage(null)
        router.back();
      } catch (error) {
        console.log(error)
      }
    }
  }

  return (
    <View>
      {!image ?

        <CameraView
          className="relative h-full w-full"
          //mirror={true}
          imageType={ImageType.png}
          facing={facing}
          flash={true}
          ref={cameraRef}
        //responsiveOrientationWhenOrientationLocked
        >

          <View className="mt-20 flex-row justify-between align-center px-5">
            <CameraReverseIcon color={CameraType.back === facing ? "#ffffff" : "#828282ac"}
              onPress={() => setFacing(current => (current === CameraType.back ? CameraType.front : CameraType.back))} />

            <FlashIcon color={FlashMode.on === flash ? "#ffffff" : "#828282ac"}
              onPress={() => setFlash(current => (current === FlashMode.off ? FlashMode.on : FlashMode.off))} />
          </View>

          <View className="absolute bottom-5 w-full h-20 flex-row align-center justify-center">
            <GaleryIcons style={{ position: 'absolute', top: 15, left: 20 }}
              color="#ffff" size={54} onPress={() => router.push('/gallery')} />
            <Pressable
              className="w-20 h-20 rounded-full border-4 border-yellow-300 active:border-amber-700 ring-offset-4 bg-transluxed"
              onPress={takePicture}>
            </Pressable>
          </View>
        </CameraView > :

        <View className="relative h-full w-full">
          <Image source={{ uri: image }} className="w-full h-full" />
          <View className="absolute bottom-5 w-full flex-row justify-between px-10">
            <RepeatIcon size={44} color="#ffff" onPress={() => setImage(null)} />
            <CheckIcon size={44} color="#ffff" onPress={saveImage} />
          </View>
        </View>
      }
    </View >
  )
}