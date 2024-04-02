import { useNavigation, useRoute } from "@react-navigation/native"

import BackButton from "../buttons/BackButton"
import DeleteNoteButton from "../buttons/DeleteNoteButton"
import MoreActionsButtonCreate from "../buttons/MoreActionsButtonCreate"
import { HeaderLeftWrapper, HeaderWrapper } from "./styles"
import { CenteredFlexRow, Title } from "../general-components"
import { showBooleanMessage } from "../../functions/other-functions"
import { deleteNote, saveNoteHandler } from "../../functions/storage-functions"
import { CreateScreenNavigationProps, CreateScreenRouteProps } from "../../types/navigation-types"


function CreateHeader({ pageTitle }: { pageTitle: string }) {
  const navigation = useNavigation<CreateScreenNavigationProps>()
  const route = useRoute<CreateScreenRouteProps>()
  const noteID = route.params.noteID || ''

  return (
    <HeaderWrapper>
      <HeaderLeftWrapper>
        <BackButton onPress={() => saveNoteHandler(navigation, route)}/>
        <Title color={'#fff'}>
          {pageTitle}
        </Title>
      </HeaderLeftWrapper>
      <CenteredFlexRow>
        <DeleteNoteButton onPress={deleteNoteHandler}/>
        <MoreActionsButtonCreate/>
      </CenteredFlexRow>
    </HeaderWrapper>
  )

  function deleteNoteHandler() {
    const messageTitle = 'Excluir nota'
    const message = 'Tem certeza que deseja excluir esta nota?'
    
    showBooleanMessage(messageTitle, message, async () => {
      await deleteNote(noteID)
      navigation.navigate('Home', { title: 'Notas'})
    })
  }
}

export default CreateHeader