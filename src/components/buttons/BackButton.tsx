import BackSVG from '../../assets/Back'
import { PressableProps } from "react-native";
import { headerBarButtonCustomRippleEffect, headerBarButtonStyles } from '../../styles/headerBarButtons';
import { NativeButton } from '../general-components';


function BackButton(props: PressableProps) {
  return (
    <NativeButton
      rippleColor={headerBarButtonCustomRippleEffect.color} 
      rippleRadius={ headerBarButtonCustomRippleEffect.radius} 
      style={headerBarButtonStyles.headerBarButtonStyle}
      {...props}
    >
      <BackSVG style={headerBarButtonStyles.headerBarButtonIconDimensions}/>
    </NativeButton>
  )
}

export default BackButton