import { useState, useEffect, Children, CSSProperties, isValidElement, cloneElement, ReactNode } from 'react'
import { Pressable } from 'react-native'
import Ionicons from '@expo/vector-icons/Ionicons'
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons'

enum expoIconType {
	Ionicons,
	MaterialCommunityIcons
}

type TypeIcons = {
	add: { name: string, ei: expoIconType },
	about: { name: string, ei: expoIconType },
	flash: { name: string, ei: expoIconType },
	galery: { name: string, ei: expoIconType },
	cameraReverse: { name: string, ei: expoIconType },
	repeat: { name: string, ei: expoIconType },
	check: { name: string, ei: expoIconType },
	checkmark: { name: string, ei: expoIconType },
	edit: { name: string, ei: expoIconType },
	back: { name: string, ei: expoIconType },
	tag: { name: string, ei: expoIconType },
	image: { name: string, ei: expoIconType },
	menu: { name: string, ei: expoIconType },
	close: { name: string, ei: expoIconType },
	list: { name: string, ei: expoIconType },
	text: { name: string, ei: expoIconType },
	archive: { name: string, ei: expoIconType },
	remove: { name: string, ei: expoIconType },
	delete: { name: string, ei: expoIconType },
	note: { name: string, ei: expoIconType },
}

export const icons = {
	add: { name: "add", ei: expoIconType.Ionicons },
	about: { name: "exclamation-thick", ei: expoIconType.MaterialCommunityIcons },
	flash: { name: "flash", ei: expoIconType.Ionicons },
	galery: { name: "images", ei: expoIconType.Ionicons },
	cameraReverse: { name: "camera-reverse-sharp", ei: expoIconType.Ionicons },
	repeat: { name: "repeat", ei: expoIconType.Ionicons },
	check: { name: "checkmark-circle", ei: expoIconType.Ionicons },
	checkmark: { name: "checkmark", ei: expoIconType.Ionicons },
	edit: { name: "pencil", ei: expoIconType.MaterialCommunityIcons },
	back: { name: "arrow-back", ei: expoIconType.Ionicons },
	tag: { name: "pricetags-outline", ei: expoIconType.Ionicons },
	image: { name: "image", ei: expoIconType.Ionicons },
	menu: { name: "menu", ei: expoIconType.Ionicons },
	close: { name: "close", ei: expoIconType.Ionicons },
	list: { name: "list", ei: expoIconType.Ionicons },
	text: { name: "text", ei: expoIconType.Ionicons },
	archive: { name: "archive", ei: expoIconType.Ionicons },
	remove: { name: "remove-circle", ei: expoIconType.Ionicons },
	delete: { name: "delete", ei: expoIconType.Ionicons },
	note: { name: "note", ei: expoIconType.Ionicons },
}

type TypeIcon = {
	colorAction?: string;
	className?: string;
	type: TypeIcons,
	style?: CSSProperties;
	////
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
	colorAction?: string;
	className?: string;
	style?: CSSProperties;
}

function PressableIcon({ children, colorAction, style, className }: PressableIconProps) {
	const [isPressed, setIsPressed] = useState(false);
	const originalColor = children.props.color;
	const onPress = children.props.onPress;

	useEffect(() => {
		if (isPressed && typeof onPress === "function") {
			onPress();
		}
	}, [isPressed])

	return (
		<Pressable
			style={style}
			className={className}
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

export const Icon = (props: TypeIcon) => (
	<PressableIcon style={props.style} className={props.className} colorAction={props.colorAction} >
		{
			props.type.ei === expoIconType.Ionicons ?
				<Ionicons name={props.type.name} size={24} color="white" {...props} /> :
				<MaterialCommunityIcons name={props.type.name} size={24} color="white" {...props} />
		}
	</PressableIcon>
);

/////////////////
/////////////////
/////////////////
/////////////////

export const AddIcon = (props: TypeIcon) =>
(
	<PressableIcon style={props.style} className={props.className} colorAction={props.colorAction} >
		<Ionicons name="add" size={24} color="white" {...props} />
	</PressableIcon>
);

export const AboutIcon = (props: TypeIcon) =>
(
	<PressableIcon style={props.style} className={props.className} colorAction={props.colorAction} >
		<MaterialCommunityIcons name="exclamation-thick" size={24} color="white" {...props} />
	</PressableIcon>
);

export const FlashIcon = (props: TypeIcon) =>
(
	<PressableIcon style={props.style} className={props.className} colorAction={props.colorAction} >
		<Ionicons name="flash" size={24} color="white" {...props} />
	</PressableIcon>
);

export const GaleryIcons = (props: TypeIcon) =>
(
	<PressableIcon style={props.style} className={props.className} colorAction={props.colorAction} >
		<Ionicons name="images" size={24} color="white" {...props} />
	</PressableIcon>
);

export const CameraReverseIcon = (props: TypeIcon) =>
(
	<PressableIcon style={props.style} className={props.className} colorAction={props.colorAction} >
		<Ionicons name="camera-reverse-sharp" size={24} color="white" {...props} />
	</PressableIcon>
);

export const RepeatIcon = (props: TypeIcon) =>
(
	<PressableIcon style={props.style} className={props.className} colorAction={props.colorAction} >
		<Ionicons name="repeat" size={24} color="white" {...props} />
	</PressableIcon>
);

export const CheckIcon = (props: TypeIcon) =>
(
	<PressableIcon style={props.style} className={props.className} colorAction={props.colorAction} >
		<Ionicons name="checkmark-circle" size={24} color="white" {...props} />
	</PressableIcon>
);

export const CheckMarckIcon = (props: TypeIcon) =>
(
	<PressableIcon style={props.style} className={props.className} colorAction={props.colorAction} >
		<Ionicons name="checkmark" size={24} color="white" {...props} />
	</PressableIcon>
);

export const EditIcon = (props: TypeIcon) =>
(
	<PressableIcon style={props.style} className={props.className} colorAction={props.colorAction} >
		<MaterialCommunityIcons name="pencil" size={24} color="white" {...props} />
	</PressableIcon>
);

export const BackIcon = (props: TypeIcon) =>
(
	<PressableIcon style={props.style} className={props.className} colorAction={props.colorAction} >
		<Ionicons name="arrow-back" size={24} color="#ffffff" {...props} />
	</PressableIcon>
);

export const ColorIcon = (props: TypeIcon) =>
(
	<PressableIcon style={props.style} className={props.className} colorAction={props.colorAction} >
		<Ionicons name="color-palette" size={24} color="#ffffff" {...props} />
	</PressableIcon>
);

export const TagIcon = (props: TypeIcon) =>
(
	<PressableIcon style={props.style} className={props.className} colorAction={props.colorAction} >
		<Ionicons name="pricetags-outline" size={24} color="#ffffff" {...props} />
	</PressableIcon>
);

export const ImageIcon = (props: TypeIcon) =>
(
	<PressableIcon style={props.style} className={props.className} colorAction={props.colorAction} >
		<Ionicons name="image" size={24} color="#ffffff" {...props} />
	</PressableIcon>
);

export const MenuIcon = (props: TypeIcon) =>
(
	<PressableIcon style={props.style} className={props.className} colorAction={props.colorAction} >
		<Ionicons name="menu" size={24} color="#ffffff" {...props} />
	</PressableIcon>
);

export const CloseIcon = (props: TypeIcon) =>
(
	<PressableIcon style={props.style} className={props.className} colorAction={props.colorAction} >
		<Ionicons name="close" size={24} color="#ffffff" {...props} />
	</PressableIcon>
);

export const ListIcon = (props: TypeIcon) =>
(
	<PressableIcon style={props.style} className={props.className} colorAction={props.colorAction} >
		<Ionicons name="list" size={24} color="#ffffff" {...props} />
	</PressableIcon>
);

export const TextIcon = (props: TypeIcon) =>
(
	<PressableIcon style={props.style} className={props.className} colorAction={props.colorAction} >
		<Ionicons name="text" size={24} color="#ffffff" {...props} />
	</PressableIcon>
);

export const ArchiveIcon = (props: TypeIcon) =>
(
	<PressableIcon style={props.style} className={props.className} colorAction={props.colorAction} >
		<Ionicons name="archive" size={24} color="#ffffff" {...props} />
	</PressableIcon>
);

export const RemoveIcon = (props: TypeIcon) =>
(
	<PressableIcon style={props.style} className={props.className} colorAction={props.colorAction} >
		<Ionicons name="remove-circle" size={24} color="#ffffff" {...props} />
	</PressableIcon>
);

export const DeleteIcon = (props: TypeIcon) =>
(
	<PressableIcon style={props.style} className={props.className} colorAction={props.colorAction} >
		<MaterialCommunityIcons name="delete" size={24} color="#ffffff" {...props} />
	</PressableIcon>
);

export const NoteIcon = (props: TypeIcon) =>
(
	<PressableIcon style={props.style} className={props.className} colorAction={props.colorAction} >
		<MaterialCommunityIcons name="note" size={24} color="#ffffff" {...props} />
	</PressableIcon>
);
