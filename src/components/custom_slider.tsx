import { useState, useCallback } from 'react'
import Slider from '@react-native-community/slider'

interface SliderProps {
  minimumValue?: number;
  maximumValue?: number;
  value?: number;
  step?: number;
  defaultValue?: number;
  onSlidingStart?: (value: number) => void;
  onValueChange: (value: number) => void;
  trackTintColor?: string;
  thumbTintColor?: string;
}

export default function CustomSlider(props: SliderProps) {
  const { minimumValue = 0, maximumValue = 1, step = 0, value, defaultValue = 0, onSlidingStart, onValueChange, trackTintColor, thumbTintColor } = props;
  const [currentValue, setCurrentValue] = useState(value ?? defaultValue);

  const handleValueChange = useCallback((newValue: number) => {
    setCurrentValue(newValue);
    onValueChange(newValue);
  }, [onValueChange]);

  const handleSlidingStart = useCallback((newValue: number) => {
    if (onSlidingStart) {
      onSlidingStart(newValue);
    }
  }, [onSlidingStart]);


  return (
    <Slider
      minimumValue={minimumValue}
      maximumValue={maximumValue}
      value={currentValue}
      step={step}
      onValueChange={handleValueChange}
      onSlidingStart={handleSlidingStart}
      trackTintColor={trackTintColor}
      thumbTintColor={thumbTintColor}
    />
  );
};
