import { useEffect, useState, useMemo } from "react";

import { BackHandler, FlatList } from "react-native";

import HomeHeader from "../components/headers/HomeHeader";
import { FlexCol } from "../components/general-components";
import NotePreview from "../components/buttons/NotePreview";
import NoNoteFeedback from "../components/feedbacks/NoNoteFeedback";
import CreateNoteButton from "../components/buttons/CreateNoteButton";
import HomeHeaderSelectableMode from "../components/headers/HomeHeaderSelectableMode";
import { getSortedSavedNotesHandler } from "../functions/storage-functions";
import { useSelectableMode } from "../hooks/selectableMode";
import useHardwareBackButton from "../hooks/useHardwareBackButton";
import { Note } from "../types/other-types";
import { HomeScreenNavigationProps } from "../types/navigation-types";
import useNotesStorageListener from "../hooks/useNotesStorageListener";

function Home({ navigation }: { navigation: HomeScreenNavigationProps }) {
  const [notes, setNotes] = useState<Note[]>(getSortedSavedNotesHandler())
  const [canPress, setCanPress] = useState(true)
  const {
    selectedItemsCount,
    deactivateSelectableMode,
    isSelectableModeActive,
    wasSelectableModeDeactivatedRightNow
  } = useSelectableMode()

  useNotesStorageListener(() => {
    setNotes(getSortedSavedNotesHandler())
  })

  useEffect(() => {
    if (wasSelectableModeDeactivatedRightNow()) {
      navigation.setOptions({
        header: () => <HomeHeader pageTitle="Notas" />
      })
    }
    if (isSelectableModeActive()) {
      navigation.setOptions({
        header: () => <HomeHeaderSelectableMode pageTitle={`Notas selecionadas: ${selectedItemsCount}`} />
      })
    }
  }, [wasSelectableModeDeactivatedRightNow, isSelectableModeActive, selectedItemsCount])

  useHardwareBackButton(() => {
    if (isSelectableModeActive()) {
      deactivateSelectableMode()
    } else {
      BackHandler.exitApp()
    }
  }, [isSelectableModeActive])

  return (
    <FlexCol style={{ flexGrow: 1 }}>
      {
        notes.length != 0 ?
          <FlatList
            data={notes}
            initialNumToRender={10}
            onScrollBeginDrag={() => setCanPress(false)}
            onScrollEndDrag={() => setCanPress(true)}
            renderItem={(notes) =>
              <NotePreview
                disabled={!canPress}
                key={notes.item.id}
                id={notes.item.id}
                title={notes.item.title}
                text={notes.item.text}
                last_edit_datetime={notes.item.last_edit_datetime}
                creation_datetime={notes.item.creation_datetime}
              />
            }
          /> : <NoNoteFeedback>Nenhuma nota encontrada</NoNoteFeedback>
      }
      <CreateNoteButton disabled={isSelectableModeActive()} onPress={() => navigation.navigate('Create', { title: 'Criar' })} />
    </FlexCol>
  )
}

export default Home