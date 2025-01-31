import { Stack } from 'expo-router';
import { View, Text } from 'react-native';

export default function Layout() {
  return (
    <View style={{
      backgroundColor: '#121212',
      justifyContent: 'center',
      alignItems: 'center',
      height: '100%',
      width: '100%'
    }}>
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