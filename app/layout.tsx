import { Stack } from 'expo-router';
import { View } from 'react-native';

export default function Layout() {
  return (
    <View>
      <Stack
        screenOptions={{
          headerStyle: { backgroundColor: '#242424' },
          headerTintColor: '#fff',
          headerTitle: ""
        }}
      />
    </View>
  )
}