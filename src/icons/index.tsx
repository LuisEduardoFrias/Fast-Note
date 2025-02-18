import { useState, useEffect, Children, CSSProperties, isValidElement, cloneElement, ReactNode } from 'react'
import { Pressable } from 'react-native'
import Ionicons from '@expo/vector-icons/Ionicons'
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons'

type TypeIcon = {
  colorAction?: string;
  color?: string;
  size?: number;
  iconStyle?: {
    marginRight?: number;
    marginLeft?: number;
    marginTop?: number;
    marginBottom?: number;
  };
  backgroundColor?: string;
  borderRadius?: number;
  onPress?: () => void;
}

type PressableIconProps = {
  colorAction: string;
}

function PressableIcon({ children, colorAction }: PressableIconProps) {
  const [isPressed, setIsPressed] = useState(false);
  const originalColor = children.props.color;
  const onPress = children.props.onPress;

  useEffect(() => {
    if (!isPressed && typeof onPress === "function") {
      onPress();
    }
  }, [isPressed])

  return (
    <Pressable
      onPressIn={() => setIsPressed(true)}
      onPressOut={() => setIsPressed(false)}
    >
      {Children.map(children, (child) => {
        if (isValidElement(child)) {
          return cloneElement(child, {
            color: isPressed ? colorAction ?? '#1df6ff' : originalColor,
            onPress: null
          });
        }
        return child;
      })}
    </Pressable>
  );
};

export const AddIcon = (props: TypeIcon) =>
(
  <PressableIcon colorAction={props.colorAction} >
    <Ionicons name="add" size={24} color="black" {...props} />
  </PressableIcon>
);

export const AboutIcon = (props: TypeIcon) =>
(
  <PressableIcon colorAction={props.colorAction} >
    <MaterialCommunityIcons name="exclamation-thick" size={24} color="black" {...props} />
  </PressableIcon>
);

export const FlashIcon = (props: TypeIcon) =>
(<PressableIcon colorAction={props.colorAction} >
  <Ionicons name="flash" size={24} color="black" {...props} />
</PressableIcon>);

export const GaleryIcons = (props: TypeIcon) =>
(
  <PressableIcon colorAction={props.colorAction} >
    <Ionicons name="images" size={24} color="black" {...props} />
  </PressableIcon>
);

export const CameraReverseIcon = (props: TypeIcon) =>
(
  <PressableIcon colorAction={props.colorAction} >
    <Ionicons name="camera-reverse-sharp" size={24} color="black" {...props} />
  </PressableIcon>
);

export const RepeatIcon = (props: TypeIcon) =>
(
  <PressableIcon colorAction={props.colorAction} >
    <Ionicons name="repeat" size={24} color="black" {...props} />
  </PressableIcon>
);

export const CheckIcon = (props: TypeIcon) =>
(
  <PressableIcon colorAction={props.colorAction} >
    <Ionicons name="checkmark-circle" size={24} color="black" {...props} />
  </PressableIcon>
);

export const BackIcon = (props: TypeIcon) =>
(
  <PressableIcon colorAction={props.colorAction} >
    <Ionicons name="arrow-back" size={24} color="#ffffff" {...props} />
  </PressableIcon>
);

export const ColorIcon = (props: TypeIcon) =>
(
  <PressableIcon colorAction={props.colorAction} >
    <Ionicons name="color-palette" size={24} color="#ffffff" {...props} />
  </PressableIcon>
);

export const TagIcon = (props: TypeIcon) =>
(
  <PressableIcon colorAction={props.colorAction} >
    <Ionicons name="pricetags-outline" size={24} color="#ffffff" {...props} />
  </PressableIcon>
);

export const ImageIcon = (props: TypeIcon) =>
(
  <PressableIcon colorAction={props.colorAction} >
    <Ionicons name="image" size={24} color="#ffffff" {...props} />
  </PressableIcon>
);

export const MenuIcon = (props: TypeIcon) =>
(
  <PressableIcon colorAction={props.colorAction} >
    <Ionicons name="menu" size={24} color="#ffffff" {...props} />
  </PressableIcon>
);

export const CloseIcon = (props: TypeIcon) =>
(
  <PressableIcon colorAction={props.colorAction} >
    <Ionicons name="close" size={24} color="#ffffff" {...props} />
  </PressableIcon>
);

export const ListIcon = (props: TypeIcon) =>
(
  <PressableIcon colorAction={props.colorAction} >
    <Ionicons name="list" size={24} color="#ffffff" {...props} />
  </PressableIcon>
);

export const TextIcon = (props: TypeIcon) =>
(
  <PressableIcon colorAction={props.colorAction} >
    <Ionicons name="text" size={24} color="#ffffff" {...props} />
  </PressableIcon>
);

export const ArchiveIcon = (props: TypeIcon) =>
(
  <PressableIcon colorAction={props.colorAction} >
    <Ionicons name="archive" size={24} color="#ffffff" {...props} />
  </PressableIcon>
);

export const RemoveIcon = (props: TypeIcon) =>
(
  <PressableIcon colorAction={props.colorAction} >
    <Ionicons name="remove-circle" size={24} color="#ffffff" {...props} />
  </PressableIcon>
);

export const DeleteIcon = (props: TypeIcon) =>
(
  <PressableIcon colorAction={props.colorAction} >
    <MaterialCommunityIcons name="delete" size={24} color="#ffffff" {...props} />
  </PressableIcon>
);

export const NoteIcon = (props: TypeIcon) =>
(
  <PressableIcon colorAction={props.colorAction} >
    <MaterialCommunityIcons name="note" size={24} color="#ffffff" {...props} />
  </PressableIcon>
);
