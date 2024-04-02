import { useNavigation } from "@react-navigation/native"

import DeleteNoteButton from "../buttons/DeleteNoteButton"
import RestoreButton from "../buttons/RestoreButton"
import { HeaderWrapper } from "./styles"
import { CenteredFlexRow, Title } from "../general-components"
import { showBooleanMessage } from "../../functions/other-functions"
import { deleteMultiTrashbinNotes, restoreMultiNotes } from "../../functions/storage-functions"
import { useSelectableMode } from "../../hooks/selectableMode"
import { TrashbinScreenNavigationProps } from "../../types/navigation-types"


function TrashbinHeaderSelectableMode({ pageTitle }: { pageTitle: string }) {
  const navigation = useNavigation<TrashbinScreenNavigationProps>()
  const {
    deactivateSelectableMode,
    selectedItems
  } = useSelectableMode()

  return (
    <HeaderWrapper>
      <CenteredFlexRow>
        <Title color="#fff">{pageTitle}</Title>
      </CenteredFlexRow>
      <CenteredFlexRow>
        <DeleteNoteButton onPress={permaDeleteMultiNotesHandler}/>
        <RestoreButton onPress={restoreMultiNotesHandler}/>
      </CenteredFlexRow>
    </HeaderWrapper>
  )

  function permaDeleteMultiNotesHandler() {
    const messageTitle = 'Excluir notas permanentemente'
    const message = 'Tem certeza que deseja excluir permanentemente as notas selecionadas?'

    showBooleanMessage(messageTitle, message, () => {
      deleteMultiTrashbinNotes(selectedItems)
      deactivateSelectableMode()
      navigation.replace('Trashbin', { title: 'Lixo' })
    })
  }

  function restoreMultiNotesHandler() {
    const messageTitle = 'Restaurar notas selecionadas'
    const message = 'Tem certeza que deseja restaurar as notas selecionadas?'
    const cbYes = () => {     
      restoreMultiNotes(selectedItems)
      deactivateSelectableMode()
      navigation.replace('Trashbin', { title: 'Lixo' }) 
    }
    
    showBooleanMessage(messageTitle, message, cbYes)
  }
}

export default TrashbinHeaderSelectableMode