import { ReactElement } from 'react';
import { View } from 'react-native';

type TypeScreen = {
  children: ReactElement,
  style: CSSProperties,
  css: string,
}

export default function Screen({ children, style, css }: TypeScreen) {
  return (
    <View
      style={{ ...style }}
      className={`flex-1 bg-dark-theme px-1 ${css}`}
    >
      {children}
    </View >
  )
}