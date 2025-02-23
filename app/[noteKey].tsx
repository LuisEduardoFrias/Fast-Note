import { Text, TextInput, ScrollView, View, Alert, Image, StyleSheet, Pressable, FlatList } from 'react-native'
import { TypeNote, TypeText, TypeImage, TypeList, TypeUid } from '../src/types'
import CheckBox from '../src/components/checkbox'
import InputMultilineNote from '../src/components/input_multiline_note'
import ListNote from '../src/components/list_note'
import ImageNote from '../src/components/image_note'
import { Icon, icons, AddIcon, BackIcon, ImageIcon, TextIcon, ListIcon } from '../src/icons'
import { useRouter, useLocalSearchParams } from 'expo-router'
import { useState } from 'react'
import Screen from '../src/components/screen'
import { useSubscriberState } from 'subscriber_state'

export default function Note() {
	const route = useRouter();
	const { noteKey } = useLocalSearchParams();
	const [{ notes }, actions] = useSubscriberState('notes', true, 'NoteEdit')
	const { addImageToNote, addTextToNote, addListToNote } = actions;
	const { data, tags } = notes.find(note=>note.key === noteKey);

	return (
		<View className="flex-1 bg-dark-theme">
			<Screen>
				<ScrollView className="relative" key={noteKey} >
					<View className="mx-1">
						{
							data?.map((obj: TypeText | TypeImage | TypeList) =>
								<View key={obj.key}>
									{
										(Object.keys(obj).includes('text')) ?
											<InputMultilineNote key={obj.key} noteKey={noteKey} data={obj} />
											: (Object.keys(obj).includes('uri')) ?
												<ImageNote key={obj.key} noteKey={noteKey} data={obj} />
												: (Object.keys(obj).includes('list')) ?
													<ListNote key={obj.key} noteKey={noteKey} data={obj} />
													: null
									}
								</View>
							)
						}
					</View>

					<View className="w-full h-10">
					</View>
				</ScrollView>

				<View className="w-full absolute bottom-2 px-1.5 flex-row space-x-2">
					{tags.map((tag: string, index: number) =>
						<Text className="text-gray-950 bg-gray-300.5 p-1 rounded-md" key={index}>{tag}</Text>)}
				</View>

			</Screen>
			<View className="w-full flex-row p-3 space-x-8 border-t border-cyan-700">
				<ImageIcon color='#3fd2f1' onPress={() => addImageToNote(noteKey)} />
				<TextIcon color='#3fd2f1' onPress={() => addTextToNote(noteKey)} />
				<ListIcon color='#3fd2f1' onPress={() => addListToNote(noteKey)} />
				<Icon type={icons.tag} color='#3fd2f1' onPress={() => route.push(`/select_tag?noteKey=${noteKey}`)} />
			</View>
		</View>
	)
}
