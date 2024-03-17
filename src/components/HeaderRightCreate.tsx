import { deleteNote } from "../functions/storage-functions"
import { showBooleanMessage } from "../functions/other-functions"
import { RouteProp, useNavigation, useRoute } from "@react-navigation/native"
import { CreateScreenProps, RootStackParamList } from "../types/navigation-types"
import { CenteredFlexRow } from "./general-components"
import DeleteNoteButton from "./buttons/DeleteNoteButton"
import MoreActionsButtonCreate from "./buttons/MoreActionsButtonCreate"

function HeaderRightCreate() {
  const route = useRoute<RouteProp<RootStackParamList, 'Create'>>()
  const navigation = useNavigation<CreateScreenProps>()
  const noteID = route.params.noteID || ''

  const messageTitle = 'Excluir nota'
  const message = 'Tem certeza que deseja excluir esta nota?'
  const deleteNoteHandler = () => deleteNote(noteID).then(res => navigation.navigate('Home', { title: 'Notas'}))
  
  return (
    <CenteredFlexRow>
      <DeleteNoteButton onPress={() => showBooleanMessage(messageTitle, message, deleteNoteHandler)}/>
      <MoreActionsButtonCreate/>
    </CenteredFlexRow>
  )
}

export default HeaderRightCreate