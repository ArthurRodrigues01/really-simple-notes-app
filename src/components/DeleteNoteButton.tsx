import TrashBinSVG from '../assets/TrashBin'
import { TouchableNativeFeedback, TouchableNativeFeedbackProps, View } from "react-native";
import { headerBarButtonCustomRippleEffect, headerBarButtonStyles } from '../styles/headerBarButtons';


function DeleteNoteButton(props: TouchableNativeFeedbackProps) {
  return (
    <TouchableNativeFeedback background={headerBarButtonCustomRippleEffect} {...props}>
      <View style={headerBarButtonStyles.headerBarButtonStyle}>
        <TrashBinSVG style={headerBarButtonStyles.headerBarButtonIconDimensions}/>
      </View>
    </TouchableNativeFeedback>
  )
}

export default DeleteNoteButton