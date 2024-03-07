import styled from 'styled-components/native';
import PencilSVG from '../assets/Pencil'
import { TouchableNativeFeedbackProps, TouchableNativeFeedback, View } from "react-native";
import { customRippleRadiusEffect } from '../functions/other-functions';
import { CenteredFlexRow } from './general-components';

const ButtonWrapper = styled(CenteredFlexRow)`
  padding: 20px;
  border-radius: 60px;
  position: absolute;
  background-color: royalblue;
  bottom: 20px;
  right: 20px;
`

function CreateNoteButton(props: TouchableNativeFeedbackProps) {
  return (
    <TouchableNativeFeedback background={customRippleRadiusEffect('lightgray', 42)} {...props}>
      <ButtonWrapper>
        <PencilSVG style={{ width: 45, height: 45}}/>
      </ButtonWrapper>
    </TouchableNativeFeedback>
  )
}

export default CreateNoteButton