import { ReactElement } from 'react';
import { View } from 'react-native';

type TypeScreen = {
  children: ReactElement,
  style: CSSProperties,
}

export default function Screen({ children, style }: TypeScreen) {
  return (
    <View className="flex-1 bg-dark-theme px-1"
      style={{ ...style }}>
      {children}
    </View >
  )
}