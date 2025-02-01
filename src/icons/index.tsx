import { CSSProperties } from 'react'
import Ionicons from '@expo/vector-icons/Ionicons'
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons'

type TypeIcon = {
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

export const AddIcon = (props: TypeIcon) =>
  (<Ionicons name="add" size={24} color="black" {...props} />)

export const BackIcon = (props: TypeIcon) =>
  (<Ionicons name="arrow-back" size={24} color="#ffffff" {...props} />);

export const ColorIcon = (props: TypeIcon) =>
  (<Ionicons name="color-palette" size={24} color="#ffffff" {...props} />);

export const TagIcon = (props: TypeIcon) =>
  (<Ionicons name="pricetags-outline" size={24} color="#ffffff" {...props} />);

export const ImageIcon = (props: TypeIcon) =>
  (<Ionicons name="image" size={24} color="#ffffff" {...props} />);

export const MenuIcon = (props: TypeIcon) =>
  (<Ionicons name="menu" size={24} color="#ffffff" {...props} />);

export const CloseIcon = (props: TypeIcon) =>
  (<Ionicons name="close" size={24} color="#ffffff" {...props} />);

export const ListIcon = (props: TypeIcon) =>
  (<Ionicons name="list" size={24} color="#ffffff" {...props} />);

export const TextIcon = (props: TypeIcon) =>
  (<Ionicons name="text" size={24} color="#ffffff" {...props} />);

export const ArchiveIcon = (props: TypeIcon) =>
  (<Ionicons name="archive" size={24} color="#ffffff" {...props} />);

export const DeleteIcon = (props: TypeIcon) =>
  (<MaterialCommunityIcons name="delete" size={24} color="#ffffff" {...props} />);

export const NoteIcon = (props: TypeIcon) =>
  (<MaterialCommunityIcons name="note" size={24} color="#ffffff" {...props} />);
