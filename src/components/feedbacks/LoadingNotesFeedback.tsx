import { Image } from "react-native";

import { LoadingNotesFeedbackWrapper } from "./styles";
import { Title } from "../general-components";


function LoadingNotesFeedback() {
  return (
    <LoadingNotesFeedbackWrapper>
      {/* <Image source={{uri: "../assets/loading.gif"}} width={250} height={250}/> */}
      <Title>Carregando notas...</Title>
    </LoadingNotesFeedbackWrapper>
  )
}

export default LoadingNotesFeedback