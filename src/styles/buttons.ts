import { TouchableNativeFeedback } from "react-native"
import { TouchableNativeFeedback as TouchableNativeFeedbackRNGH } from "react-native-gesture-handler"

export const buttonCustomRippleEffect = TouchableNativeFeedback.Ripple('gray', false)
export const buttonCustomRippleEffectRNGH = TouchableNativeFeedbackRNGH.Ripple('gray', false)

export const menuOptionCustomStyles = {
  OptionTouchableComponent: TouchableNativeFeedback,
  optionTouchable: { 
    background: buttonCustomRippleEffect  
  }
}