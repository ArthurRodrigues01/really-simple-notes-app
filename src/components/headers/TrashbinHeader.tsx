import { useNavigation } from "@react-navigation/native"

import BackButton from "../buttons/BackButton"
import DeleteNoteButton from "../buttons/DeleteNoteButton"
import RestoreButton from "../buttons/RestoreButton"
import { HeaderWrapper } from "./styles"
import { CenteredFlexRow, Title } from "../general-components"
import { showBooleanMessage } from "../../functions/other-functions"
import { clearTrashbinNotes, restoreAllNotes } from "../../functions/storage-functions"
import { TrashbinScreenNavigationProps } from "../../types/navigation-types"


function TrashbinHeader({ pageTitle }: { pageTitle: string }) {
  const navigation = useNavigation<TrashbinScreenNavigationProps>()
  
  return (
    <HeaderWrapper>
      <CenteredFlexRow>
        <BackButton onPress={() => navigation.goBack()} />
        <Title color="#fff">{pageTitle}</Title>
      </CenteredFlexRow>
      <CenteredFlexRow>
        <DeleteNoteButton onPress={clearTrashbinHandler}/>
        <RestoreButton onPress={restoreAllNotesHandler}/>
      </CenteredFlexRow>
    </HeaderWrapper>
  )

  function clearTrashbinHandler() {
    const messageTitle = 'Limpar lixeira'
    const message = 'Tem certeza que deseja excluir TODAS as notas na lixeira?'

    showBooleanMessage(messageTitle, message, () => {
      clearTrashbinNotes()
      navigation.replace('Trashbin', { title: 'Lixo' })
    })
  }

  function restoreAllNotesHandler() {
    const messageTitle = 'Restaurar tudo'
    const message = 'Tem certeza que deseja restaurar TODAS as notas na lixeira?'
    const cbYes = () => {     
      restoreAllNotes()
      navigation.replace('Trashbin', { title: 'Lixo' }) 
    }
    
    showBooleanMessage(messageTitle, message, cbYes)
  }
}

export default TrashbinHeader