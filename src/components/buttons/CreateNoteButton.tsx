import styled from 'styled-components/native';
import PencilSVG from '../../assets/Pencil'
import { PressableProps } from "react-native";
import { NativeButton } from '../general-components';

const CreateNoteButtonWrapper = styled(NativeButton)`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 20px;
  border-radius: 60px;
  position: absolute;
  background-color: royalblue;
  bottom: 20px;
  right: 20px;
`

function CreateNoteButton(props: PressableProps) {
  return (
    <CreateNoteButtonWrapper rippleColor={'lightgray'} rippleRadius={42.5} {...props}>
      <PencilSVG style={{ width: 45, height: 45}}/>
    </CreateNoteButtonWrapper>
  )
}

export default CreateNoteButton