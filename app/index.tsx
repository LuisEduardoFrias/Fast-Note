import { StyleSheet, Text, View, Button, FlatList } from 'react-native'
import { useRouter } from 'expo-router'

import { useSubscriberState } from 'subscriber_state'
import { Icon, icons } from '../src/icons'
import Card from '../src/components/card'
import Screen from '../src/components/screen'

export default function Index() {
	const [{ notes }, { addNote }] = useSubscriberState(['notes'], false, 'Index');
	const router = useRouter();

	const emptyComponent = () => {
		return (
			<View className="flex-row gap-2 justify-center mt-20 items-center">
				<Text className="text-7xl text-sky-100 blur-md font-bold">Notas</Text>
				<Text className="text-8xl text-sky-300 blur-md font-extrabold">!</Text>
			</View>
		)
	}
	const styleAddBtn = ({ pressed }) => ({
		borderRadius: 20,
		backgroundColor: '#25fff9',
		width: pressed ? 68 : 70,
		height: pressed ? 68 : 70,
		position: 'absolute',
		right: 20,
		bottom: 20,
		justifyContent: 'center',
		alignItems: 'center',
		opacity: pressed ? 0.7 : 1,
	});

	return (
		<Screen style={{ paddingTop: 5 }}>
			<FlatList
				className="flex mb-3"
				data={notes}
				ListEmptyComponent={emptyComponent}
				columnWrapperStyle={{ gap: 7 }}
				ItemSeparatorComponent={() => <View className="h-1"></View>}
				numColumns={2}
				renderItem={({ item }) => (!item?.remove && !item?.archive) && <Card data={item} id={item.key} />}
				keyExtractor={(item) => item.key}
			/>
			<Icon
				type={icons.add}
				style={styleAddBtn}
				size={60}
				color="#000000"
				onPress={() => router.push(`/${addNote()}`)} />
		</Screen>
	);
}