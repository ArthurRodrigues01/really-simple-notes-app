import { HomeScreenProps } from "../types/navigation-types"
import { useNavigation } from "@react-navigation/native"
import { TouchableNativeFeedback } from "react-native-gesture-handler"
import styled from "styled-components/native"
import { Note } from "../types/other-types"
import { toCustomCreateLocaleString, toCustomEditLocaleString } from "../functions/other-functions"
import { Title, MediumText, SmallText, FlexCol } from "./general-components"
import { buttonCustomRippleEffectRNGH } from "../styles/buttons"

const ButtonWrapper = styled(FlexCol)`
  gap: 16px;
  padding: 12px;
  border-bottom-width: 1px;
  border-bottom-color: gray;
`
const LastEdit = styled(SmallText)`
  font-size: 14px;
  align-self: flex-end;
`

function NotePreview({id, title, text, last_edit_datetime, creation_datetime}: Note) {
  const navigation = useNavigation<HomeScreenProps>()
  
  const languageCode = 'pt-br'
  const localeOptions = { timeZone: 'America/Sao_Paulo' }
  const lastEditDatetimeDateObj = new Date(last_edit_datetime)
  const lastEditDatetimeString = toCustomEditLocaleString(lastEditDatetimeDateObj, languageCode, localeOptions)
  const creationDatetimeDateObj = new Date(creation_datetime)
  const creationDatetimeString = toCustomCreateLocaleString(creationDatetimeDateObj, languageCode, localeOptions)
  
  return (
    <TouchableNativeFeedback background={buttonCustomRippleEffectRNGH} onPress={() => navigation.navigate('Create', { title: 'Editar', noteID: id, noteTitle: title, noteText: text, noteCreationDatetime: creation_datetime})}>
      <ButtonWrapper> 
        <Title numberOfLines={1}>{title}</Title>
        <MediumText numberOfLines={3}>{text}</MediumText>
        <LastEdit color="gray">{last_edit_datetime == creation_datetime ? creationDatetimeString : lastEditDatetimeString}</LastEdit>
      </ButtonWrapper>
    </TouchableNativeFeedback>
  )
}

export default NotePreview