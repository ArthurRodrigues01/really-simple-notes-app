import styled from "styled-components";
import { TextProps } from "react-native";
import { CenteredFlexRow, Title } from "./general-components";
import { RouteProp, useNavigation, useRoute } from "@react-navigation/native";
import { CreateScreenProps, RootStackParamList } from "../types/navigation-types";
import BackButton from "./buttons/BackButton";
import { saveNoteHandler } from "../functions/storage-functions";

const HeaderLeftWrapper = styled(CenteredFlexRow)`
  gap: 16px;
`


function HeaderLeftCreate({children}: TextProps) {
  const navigation = useNavigation<CreateScreenProps>()
  const route = useRoute<RouteProp<RootStackParamList, 'Create'>>()

  return (
    <HeaderLeftWrapper>
      <BackButton onPress={() => saveNoteHandler(navigation, route)}/>
      <Title color={'#fff'}>
        {children}
      </Title>
    </HeaderLeftWrapper>
  )
}

export default HeaderLeftCreate