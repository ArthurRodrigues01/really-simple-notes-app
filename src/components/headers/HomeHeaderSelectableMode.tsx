import { useNavigation } from "@react-navigation/native"

import DeleteNoteButton from "../buttons/DeleteNoteButton"
import { HeaderWrapper } from "./styles"
import { CenteredFlexRow, Title } from "../general-components"
import { deleteMultiNotes } from "../../functions/storage-functions"
import { showBooleanMessage } from "../../functions/other-functions"
import { useSelectableMode } from "../../hooks/selectableMode"
import { HomeScreenNavigationProps } from "../../types/navigation-types"

function HomeHeaderSelectableMode({pageTitle}: {pageTitle: string}) {
  const navigation = useNavigation<HomeScreenNavigationProps>()
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
        <DeleteNoteButton onPress={deleteMultiNotesHandler}/> 
      </CenteredFlexRow>
    </HeaderWrapper>
  )

  function deleteMultiNotesHandler() {
    const messageTitle = 'Excluir notas'
    const message = 'Tem certeza que deseja excluir as notas selecionadas?'
    const cbYes = () => {     
      deleteMultiNotes(selectedItems)
      deactivateSelectableMode()
      navigation.replace('Home', { title: 'Notas' }) 
    }
    
    showBooleanMessage(messageTitle, message, cbYes)
  }
}

export default HomeHeaderSelectableMode