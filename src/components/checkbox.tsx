import { useState, useEffect, useRef } from 'react';
import { TouchableOpacity, TextInput, View, StyleSheet } from 'react-native';
import { RemoveIcon } from '../icons'
import { TypeUid, TypeListItem } from '../types'

type TypeCheckBox = {
  data: TypeListItem,
  withCheck: boolean,
  onFocus: boolean,
  remove: (key: TypeUid) => void,
  onSubmit: () => void,
  value: (value: TypeListItem) => void
}

export default function CheckBox({ data, onFocus, onSubmit, value, withCheck, remove }: TypeCheckBox) {
  const { key, isChecked: checked, text } = data;
  const [isChecked, setIsChecked] = useState(checked);
  const [textValue, setTextValue] = useState(text ?? "");
  const inputRef = useRef(null);

  useEffect(() => {
    value({ key, isChecked, text: textValue });
  }, [isChecked, textValue]);

  useEffect(() => {
    if (onFocus)
      inputRef.current.focus();
  }, []);

  return (
    <View style={{ borderColor: '#ffffff07' }} className="flex-row justify-between border-b border-dashed mb-1 pb-1 space-x-1 items-center">
      <TouchableOpacity onPress={() => setIsChecked(!isChecked)}>
        {withCheck ? <View className={`h-5 w-5 border-2 border-white rounded-md ${isChecked && 'bg-green-500'} `} /> : null}
      </TouchableOpacity>
      <TextInput
        className="text-white flex-grow h-5 p-0"
        ref={inputRef}
        maxLength={40}
        placeholder="Opcion"
        placeholderTextColor="#c4c4c4ce"
        onSubmitEditing={onSubmit}
        onChangeText={(valueInput) => setTextValue(valueInput)}
        value={textValue} />
      <RemoveIcon color='#857575' onPress={() => remove(key)} />
    </View>
  );
};