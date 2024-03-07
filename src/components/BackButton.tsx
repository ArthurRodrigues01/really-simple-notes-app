import BackSVG from '../assets/Back'
import { TouchableNativeFeedback, TouchableNativeFeedbackProps, View } from "react-native";
import { headerBarButtonCustomRippleEffect, headerBarButtonStyles } from '../styles/headerBarButtons';


function BackButton(props: TouchableNativeFeedbackProps) {
  return (
    <TouchableNativeFeedback background={headerBarButtonCustomRippleEffect} {...props}>
      <View style={headerBarButtonStyles.headerBarButtonStyle}>
        <BackSVG style={headerBarButtonStyles.headerBarButtonIconDimensions}/>
      </View>
    </TouchableNativeFeedback>
  )
}

export default BackButton