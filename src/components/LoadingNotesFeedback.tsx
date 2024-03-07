import { Image } from "react-native";
import { Title } from "./general-components";
import { CenteredFlexCol } from "../components/general-components";
import styled from "styled-components/native";

const ComponentWrapper = styled(CenteredFlexCol)`
  flex-grow: 1;
`


function LoadingNotesFeedback() {
  return (
    <ComponentWrapper>
      {/* <Image source={{uri: "../assets/loading.gif"}} width={250} height={250}/> */}
      <Title>Carregando notas...</Title>
    </ComponentWrapper>
  )
}

export default LoadingNotesFeedback