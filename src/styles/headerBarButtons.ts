import { StyleSheet, TouchableNativeFeedback } from "react-native"

export const headerBarButtonCustomRippleEffect = TouchableNativeFeedback.Ripple('gray', false, 25)

export const headerBarButtonStyles = StyleSheet.create({
  headerBarButtonStyle: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 10,
    borderRadius: 30
  },
  headerBarButtonIconDimensions: {
    width: 30,
    height: 30
  }
})

export const menuTriggerCustomStyles = {              
  TriggerTouchableComponent: TouchableNativeFeedback,
  triggerTouchable: {
    background: headerBarButtonCustomRippleEffect
  }
}