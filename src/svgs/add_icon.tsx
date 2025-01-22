import Svg, { Path } from "react-native-svg"
import { TypeSvg } from "../types"

export function AddIcon(props:TypeSvg) {
  return (
    <Svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 -960 960 960"
      {...props}
    >
      <Path d="M440-440H200v-80h240v-240h80v240h240v80H520v240h-80v-240Z" />
    </Svg>
  )
}