import { PressableProps } from "react-native";

import PencilSVG from '../../assets/Pencil'
import { CreateNoteButtonWrapper } from './styles';


function CreateNoteButton(props: PressableProps) {
  return (
    <CreateNoteButtonWrapper rippleColor={'lightgray'} rippleRadius={42.5} {...props}>
      <PencilSVG style={{ width: 45, height: 45}}/>
    </CreateNoteButtonWrapper>
  )
}

export default CreateNoteButton