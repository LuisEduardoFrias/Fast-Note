import { useState, useEffect, useRef } from 'react';
import { TouchableOpacity, TextInput, View, StyleSheet } from 'react-native';
import { RemoveIcon } from '../icons'

type TypeCheckBox = {
  text: string,
  checked: boolean,
  withCheck: boolean,
  onFocus: boolean,
  remove: () => void,
  onSubmit: () => void,
  value: (value: { checked: boolean, text: string }) => void
}

export default function CheckBox({ text, checked, onFocus, onSubmit, value, withCheck, remove }: TypeCheckBox) {
  const [isChecked, setIsChecked] = useState(checked);
  const [textValue, setTextValue] = useState(text);
  const inputRef = useRef(null);

  useEffect(() => {
    value({ checked: isChecked, text: textValue });
  }, [isChecked, textValue]);

  useEffect(() => {
    if (onFocus)
      inputRef.current.focus();
  }, []);

  return (
    <View className="flex-row justify-between space-x-1 items-center">
      <TouchableOpacity onPress={() => setIsChecked(!isChecked)}>
        {withCheck ? <View className={`h-5 w-5 border-2 border-white rounded-md ${isChecked && 'bg-green-500'} `} /> : null}
      </TouchableOpacity>
      <TextInput
        className="text-white flex-grow"
        ref={inputRef}
        maxLength={40}
        onSubmitEditing={onSubmit}
        onChange={(value: string) => setTextValue(value)}
        value={textValue} />
      <RemoveIcon onPress={() => remove()} />
    </View>
  );
};