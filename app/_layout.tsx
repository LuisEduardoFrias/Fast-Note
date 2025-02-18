import { Stack } from 'expo-router'
import { View, Text } from 'react-native'
import { StatusBar } from 'expo-status-bar'
import Header from '../src/components/header'
import 'core-js/actual/structured-clone';
import '../src/warehouse'
import InputTitleNote from '../src/components/input_title_note'
import Drawer from '../src/components/drawer'

export default function Layout() {
  return (
    <View style={{ flex: 1 }}>
      <StatusBar backgroundColor="rgb(36,36,36)" />
            <Drawer />
      <Stack>
        <Stack.Screen name="index" options={{
          title: 'home',
          header: () =>
            <View className="mt-8 px-2 pt-2 bg-dark-theme">
              <Header />
            </View>
        }} />
        <Stack.Screen name="[noteKey]" options={{
          title: 'details',
          header: ({ route }) =>
            <View className="mt-8 px-2 pt-2 bg-dark-theme">
              <InputTitleNote title={route.params.title} noteKey={route.params.noteKey} />
            </View>
        }} />
        <Stack.Screen name="camera" options={{
          title: 'camera',
          header: () => null
        }} />
        <Stack.Screen name="gallery" options={{
          title: 'gallery',
          header: () => null
        }} />
        <Stack.Screen name="archive" options={{
          title: 'archive',
          header: () =>
            <View className="mt-8 px-2 pt-2 bg-dark-theme">
              <Header />
              <Text>Welcome to React Native!</Text>
            </View>
        }} />
      </Stack>
    </View>
  )
}