import { useEffect, useState } from "react"

import { FlatList } from "react-native"

import TrashbinNotePreview from "../components/buttons/TrashbinNotePreview"
import NoNoteFeedback from "../components/feedbacks/NoNoteFeedback"
import TrashbinHeader from "../components/headers/TrashbinHeader"
import TrashbinHeaderSelectableMode from "../components/headers/TrashbinHeaderSelectableMode"
import { FlexCol } from "../components/general-components"
import { getSortedTrashbinNotesHandler } from "../functions/storage-functions"
import { useSelectableMode } from "../hooks/selectableMode"
import useHardwareBackButton from "../hooks/useHardwareBackButton"
import { TrashbinScreenNavigationProps } from "../types/navigation-types"
import { DeletedNote } from "../types/other-types"
import useTrashbinStorageListener from "../hooks/useTrashbinStorageListener"

function Trashbin({ navigation }: { navigation: TrashbinScreenNavigationProps }) {
  const [
    trashbinNotes, 
    setTrashbinNotes
  ] = useState<DeletedNote[]>(getSortedTrashbinNotesHandler())
  const [canPress, setCanPress] = useState(true)
  const {
    selectedItemsCount,
    deactivateSelectableMode,
    isSelectableModeActive,
    wasSelectableModeDeactivatedRightNow,
  } = useSelectableMode()

  useTrashbinStorageListener(() => {
    setTrashbinNotes(getSortedTrashbinNotesHandler())
  })

  useEffect(() => {
    if (wasSelectableModeDeactivatedRightNow()) {
      navigation.setOptions({
        header: () => <TrashbinHeader pageTitle="Lixo"/>
      })
    }
    if (isSelectableModeActive()) {
      navigation.setOptions({
        header: () => <TrashbinHeaderSelectableMode pageTitle={`Notas selecionadas: ${selectedItemsCount}`}/>
      })
    }
  }, [wasSelectableModeDeactivatedRightNow, isSelectableModeActive, selectedItemsCount])

  useHardwareBackButton(() => {
    if (isSelectableModeActive()) {
      deactivateSelectableMode()
    } else {
      navigation.goBack()
    }
  }, [isSelectableModeActive])
  
  return (
    <FlexCol style={{flexGrow: 1}}>
      { trashbinNotes.length != 0 ?
        <FlatList
          data={trashbinNotes}
          initialNumToRender={10}
          onScrollBeginDrag={() => setCanPress(false)}
          onScrollEndDrag={() => setCanPress(true)}
          renderItem={(notes) => 
            <TrashbinNotePreview
              disabled={!canPress}
              id={notes.item.deletedNoteObj.id}
              title={notes.item.deletedNoteObj.title}
              text={notes.item.deletedNoteObj.text}
              creation_datetime={notes.item.deletedNoteObj.creation_datetime}
              last_edit_datetime={notes.item.deletedNoteObj.last_edit_datetime}
              deletionDate={notes.item.deletionDate}
            />
          }
        /> : <NoNoteFeedback>Lixeira vazia</NoNoteFeedback>
      }
    </FlexCol>
  )
}

export default Trashbin