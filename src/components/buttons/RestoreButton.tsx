import { PressableProps } from "react-native";

import RestoreSVG from '../../assets/Restore'
import { NativeButton } from '../general-components';
import { headerBarButtonCustomRippleEffect, headerBarButtonStyles } from '../../styles/headerBarButtons';


function RestoreButton(props: PressableProps) {
  return (
    <NativeButton 
      rippleColor={headerBarButtonCustomRippleEffect.color}
      rippleRadius={headerBarButtonCustomRippleEffect.radius}
      style={headerBarButtonStyles.headerBarButtonStyle}
      {...props}
    >
      <RestoreSVG style={headerBarButtonStyles.headerBarButtonIconDimensions}/>
    </NativeButton>
  )
}

export default RestoreButton