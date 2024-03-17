import { CenteredFlexRow } from "./general-components"
import DeleteNoteButton from "./buttons/DeleteNoteButton"

function HeaderRightHomeSelectableMode({ deleteButtonOnPress }: { deleteButtonOnPress: () => void}) {
  return (
    <CenteredFlexRow> 
      <DeleteNoteButton onPress={deleteButtonOnPress}/>
    </CenteredFlexRow>
  )
}

export default HeaderRightHomeSelectableMode