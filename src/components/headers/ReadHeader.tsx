import styled from "styled-components/native"
import { useNavigation, useRoute } from "@react-navigation/native"

import BackButton from "../buttons/BackButton"
import DeleteNoteButton from "../buttons/DeleteNoteButton"
import RestoreButton from "../buttons/RestoreButton"
import { HeaderWrapper } from "./styles"
import { CenteredFlexRow, Title } from "../general-components"
import { showBooleanMessage } from "../../functions/other-functions"
import { deleteTrashbinNote, restoreNote } from "../../functions/storage-functions"
import { ReadScreenNavigationProps, ReadScreenRouteProps } from "../../types/navigation-types"


function ReadHeader({ pageTitle }: { pageTitle: string }) {
  const navigation = useNavigation<ReadScreenNavigationProps>()
  const route = useRoute<ReadScreenRouteProps>()

  return (
    <HeaderWrapper>
      <CenteredFlexRow>
        <BackButton onPress={() => navigation.goBack()}/>
        <Title color="#fff">{pageTitle}</Title>
      </CenteredFlexRow>
      <CenteredFlexRow>
        <DeleteNoteButton onPress={permaDeleteNoteHandler}/>
        <RestoreButton onPress={restoreNoteHandler}/>
      </CenteredFlexRow>
    </HeaderWrapper>
  )

  function permaDeleteNoteHandler() {
    const messageTitle = 'Excluir nota permanentemente'
    const message = 'Tem certeza que deseja excluir permanentemente esta nota?'

    showBooleanMessage(messageTitle, message, () => {
      deleteTrashbinNote(route.params.noteID)
      navigation.goBack()
    })
  }

  function restoreNoteHandler() {
    const messageTitle = 'Restaurar nota'
    const message = 'Tem certeza que deseja restaurar esta nota?'

    showBooleanMessage(messageTitle, message, () => {
      restoreNote(route.params.noteID)
      navigation.goBack()
    })
  }
}

export default ReadHeader