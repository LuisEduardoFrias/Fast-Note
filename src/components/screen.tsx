import { ReactElement } from 'react';
import { View } from 'react-native';

type TypeScreen = {
  children: ReactElement,
  style: CSSProperties,
}

export default function Screen({ children, style }: TypeScreen) {
  return (
    <View style={{
      flex: 1,
      backgroundColor: '#242424',
      paddingVertical: 0,
      paddingHorizontal: 10,
      gap: 10,
      ...style
    }}>
      {children}
    </View >
  )
}