import { Image, View, Alert, Pressable, StyleSheet, Text, Dimensions } from 'react-native'
import { useState, useEffect, useRef, useCallback } from 'react'
import Slider from '@react-native-community/slider'
import { DeleteIcon } from '../icons'
import { TypeUid, TypeImage as TypeImage_ } from '../types'
import { useRouter } from 'expo-router'
import { useActions } from 'subscriber_state'
import CustomSlider from './custom_slider'

import DefaultImage from '../assets/hide_image.png';

const DEFAULT_IMAGE = Image.resolveAssetSource(DefaultImage).uri;

type TypeImage = {
	noteKey: TypeUid,
	data: TypeImage_,
};

export default function ImageNote({ noteKey, data }: TypeImage) {
	const router = useRouter();
	const { uri, key: imageKey, size: size_ } = data;
	const { deleteImageToNote, updateImage } = useActions();
	const [screenWidth, setScreenWidth] = useState(Dimensions.get('window').width);
	const [size, setSize] = useState(size_ ?? (screenWidth - 50));
	const timer = useRef(null);
	const [showControl, setShowControl] = useState(false);

	useEffect(() => {
		const subscription = Dimensions.addEventListener('change', () => {
			setScreenWidth(Dimensions.get('window').width);
		});

		if (!uri) {
			router.push(`/camera?noteKey=${noteKey}&imageKey=${imageKey}`)
		}

		return () => subscription?.remove();
	}, []);

	useEffect(() => {
		if (showControl) {
			clearTimeout(timer.current);

			timer.current = setTimeout(() => {
				setShowControl(false)
				updateImage(noteKey, imageKey, { uri, size })
			}, 2000);
		}
	}, [showControl, size]);

	function showAlertDeleteImage() {
		Alert.alert(
			`¿Seguro que decea elimiar la imagen?`,
			null,
			[
				{
					text: 'Okey',
					onPress: () => deleteImageToNote(noteKey, imageKey),
				},
				{
					text: 'Cancelar',
				},
			],
			{ cancelable: true }
		);
	}

	return (
		<Pressable className="bg-transluxed rounded p-2 pb-4 my-2 justify-center items-center"
			onLongPress={() => setShowControl(true)}
			onPress={() => router.push(`/camera?noteKey=${noteKey}&imageKey=${imageKey}`)}
		>
			{
				showControl &&
				<View className="flex-row justify-between items-center">
					<View className="w-11/12">
						<CustomSlider
							minimumValue={screenWidth / 4}
							maximumValue={screenWidth - 50}
							Value={size}
							step={screenWidth / 6}
							defaultValue={size}
							onValueChange={(value) => setSize(value)}
						/>
					</View>

					<DeleteIcon onPress={() => showAlertDeleteImage()} />

				</View>
			}
			{uri ?
				<Image style={{ width: size, height: size }} source={{ uri }} /> :
				<Image style={{ width: size, height: size }} source={{ uri: DEFAULT_IMAGE }} />}
		</Pressable>
	);
}