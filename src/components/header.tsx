import { Text, View, TextInput } from 'react-native';
import { MenuIcon, CloseIcon, NoteIcon, TagIcon, ColorIcon, ArchiveIcon, DeleteIcon } from '../icons'
import { useSubscriberState } from 'subscriber_state'

export default function Header() {
  const [{ selectedNotes },{clearSelectedNotes}] = useSubscriberState('selectedNotes', false, 'header')


  if (selectedNotes.length >= 1)
    return (
      <View className="flex-row h-9 justify-between items-center px-2 rounded-2xl
     bg-black" >
        <View className="flex-row gap-2 items-center w-min" >
          <CloseIcon onPreess={()=> clearSelectedNotes()} />
          <Text className="text-sky-300 text-2xl" >{selectedNotes.length}</Text>
        </View>

        <View className="flex-row gap-3 items-center w-min" >
          <TagIcon size={20} />
          <ColorIcon size={20} />
          <ArchiveIcon size={20} />
          <DeleteIcon size={20} />
        </View>

        <NoteIcon color="#25fff9" />
      </View>
    )

  return (
    <View className="flex-row justify-between items-center px-2 rounded-2xl
     bg-black" >
      <View className="flex-row items-center w-min" >
        <MenuIcon />

        <TextInput className="text-white h-9" placeholder="Busca en las Notas"
          placeholderTextColor="#ffff" />
      </View>

      <NoteIcon color="#25fff9" />
    </View>
  )
}