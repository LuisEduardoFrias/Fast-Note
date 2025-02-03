import { useState, useEffect } from 'react';
import { TouchableOpacity, Text, View, StyleSheet } from 'react-native';
import { RemoveIcon } from '../icons'

type TypeCheckStyle = { check?: CSSProprties, text?: CSSProprties }
type TypeCheckBox = {
  text: string,
  checked?: boolean,
  style?: TypeCheckStyle,
  withCheck?: boolean,
  onChange?: (value) => void,
  value?: (value: boolean) => void
}

export default function CheckBox({ checked, value, withCheck, onChange, text, style }: TypeCheckBox) {
  const [isChecked, setIsChecked] = useState(checked);

  useEffect(() => {
    if (value) value(isChecked);
  }, [isChecked]);

  const toggleCheckbox = () => {
    setIsChecked(!isChecked);
  };

  return (
    <TouchableOpacity style={styles.container} onPress={toggleCheckbox}>
      {withCheck ? <View style={[styles.checkbox, isChecked && styles.checked]} /> : null}
      <Text style={[styles.label]}>{text}</Text>
      <RemoveIcon />
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  checkbox: {
    width: 20,
    height: 20,
    borderWidth: 2,
    borderColor: '#ffffff',
    borderRadius: 3,
    marginRight: 8,
  },
  checked: {
    backgroundColor: '#70ba50',
  },
  label: {
    color: '#ffffff',
    fontSize: 16,
  },
});