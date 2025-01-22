import { ReactElement } from 'react';
import { View } from 'react-native';

export default function Screen({ children }: ReactElement) {
  return (
    <View style={{ flex: 1, backgroundColor: '#242424', paddingVertical: 10, }}>
      {children}
    </View>
  )
}