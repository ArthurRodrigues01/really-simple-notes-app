import TrashBinSVG from '../../assets/TrashBin'
import { PressableProps } from "react-native";
import { headerBarButtonCustomRippleEffect, headerBarButtonStyles } from '../../styles/headerBarButtons';
import { NativeButton } from '../general-components';


function DeleteNoteButton(props: PressableProps) {
  return (
    <NativeButton 
      rippleColor={headerBarButtonCustomRippleEffect.color}
      rippleRadius={headerBarButtonCustomRippleEffect.radius}
      style={headerBarButtonStyles.headerBarButtonStyle}
      {...props}
    >
      <TrashBinSVG style={headerBarButtonStyles.headerBarButtonIconDimensions}/>
    </NativeButton>
  )
}

export default DeleteNoteButton