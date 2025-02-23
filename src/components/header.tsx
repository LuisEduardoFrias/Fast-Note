import { Children, cloneElement, isValidElement } from 'react';
import { View } from 'react-native';
import { NoteIcon, MenuIcon } from '../icons'
import { useSubscriberState } from 'subscriber_state'

export default function Header({ children }) {
	const [{ selectedNotes }, { toggleMenu }] = useSubscriberState('selectedNotes', false, 'header')

	return (
		<View className="flex-row space-x-2 justify-between h-8 px-2 rounded-2xl bg-black border border-amber-100" >
			<View className="flex-row items-center space-x-2 w-11/12" >
				{selectedNotes.length <= 0 && <MenuIcon onPress={() => toggleMenu()} />}

				{Children.map(children, (child, index) => {
					if (isValidElement(child)) {
						if (selectedNotes.length <= 0 && index === 0) return cloneElement(child);
						if (selectedNotes.length >= 1 && index === 1) return cloneElement(child);
					}
				})}

			</View>

			<NoteIcon color="#25fff9" />
		</View>
	)
}