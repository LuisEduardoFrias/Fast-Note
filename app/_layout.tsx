import { Stack } from 'expo-router'
import { View, Text } from 'react-native'
import Header from '../src/components/header'
import 'core-js/actual/structured-clone';
import '../src/warehouse'

export default function Layout() {
  return (
    <View style={{ flex: 1 }}>
      <Stack
        screenOptions={{
          headerStyle: { backgroundColor: '#242424' },
        }}
      />
    </View>
  )
}