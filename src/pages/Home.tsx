import { HomeScreenProps } from "../types/navigation-types";
import { useIsFocused } from "@react-navigation/native";
import { BackHandler, FlatList } from "react-native";
import NotePreview from "../components/buttons/NotePreview";
import { useEffect, useState } from "react";
import { Note } from "../types/other-types";
import { deleteMultiNotes, getAllNotes, getSortingMode } from "../functions/storage-functions";
import CreateNoteButton from "../components/buttons/CreateNoteButton";
import styled from "styled-components/native";
import NoNoteFeedback from "../components/feedbacks/NoNoteFeedback";
import useSortNotes from "../hooks/useSortNotes";
import { useSelectableMode } from "../hooks/SelectableModeProvider";
import LoadingNotesFeedback from "../components/feedbacks/LoadingNotesFeedback";
import { showBooleanMessage } from "../functions/other-functions";
import HeaderRightHome from "../components/HeaderRightHome";
import HeaderRightHomeSelectableMode from "../components/HeaderRightHomeSelectableMode";
import useHardwareBackButton from "../hooks/useHardwareBackButton";

const PageWrapper = styled.View`
  display: flex;
  flex-grow: 1;
`

function Home({ navigation }: {navigation: HomeScreenProps}) {
  const isFocused = useIsFocused()
  const [notes, setNotes] = useState<Note[]>([])
  const [canPress, setCanPress] = useState(true)
  const [isLoading, setLoading] = useState(true)
  const {sortByNewest, sortByOldest, sortByNewestEdit, sortByOldestEdit, sortByAlphabeticalOrderByKey} = useSortNotes()
  const { 
    selectedItems,
    selectedItemsCount, 
    deactivateSelectableMode, 
    isSelectableModeActive, 
    wasSelectableModeDeactivatedRightNow 
  } = useSelectableMode()

  
  useEffect(() => {
    if (isFocused) { 
      async function setSortedSavedNotesHandler() {
        const savedNotes = await getAllNotes()
        const sortingMode = await getSortingMode()

        switch(sortingMode) {
          case 0: // alphabetical
            setNotes(sortByAlphabeticalOrderByKey(savedNotes, 'title'))
            break
          case 1: // newest
            setNotes(sortByNewest(savedNotes))
            break
          case 2: // oldest
            setNotes(sortByOldest(savedNotes))
            break
          case 3: // newest edits
            setNotes(sortByNewestEdit(savedNotes))
            break;
          case 4: // oldest edits
            setNotes(sortByOldestEdit(savedNotes))
            break
          default: 
            setNotes(sortByNewest(savedNotes))
        }
        
        setLoading(false)
      }

      setSortedSavedNotesHandler()

      if (wasSelectableModeDeactivatedRightNow()) {
        navigation.setOptions({headerTitle: 'Notas'}) 
        navigation.setOptions({headerRight: () => <HeaderRightHome/>})
      }
      
      if (isSelectableModeActive()) {
        navigation.setOptions({headerTitle: `Notas selecionadas: ${selectedItemsCount}`})
        navigation.setOptions({headerRight: () => <HeaderRightHomeSelectableMode deleteButtonOnPress={deleteMultiNotesHandler}/>})
      }
    }
  }, [isFocused, wasSelectableModeDeactivatedRightNow, isSelectableModeActive, selectedItemsCount])

  useHardwareBackButton(() => {
    if (isSelectableModeActive()) {
      deactivateSelectableMode()
    } else {
      BackHandler.exitApp()
    }
  }, [isSelectableModeActive])

  return (
    <PageWrapper>
      { 
        notes.length != 0 ? 
        <FlatList
          data={notes}
          initialNumToRender={10}
          onScrollBeginDrag={() => setCanPress(false)}
          onScrollEndDrag={() => setCanPress(true)}
          renderItem={(notes) =>  
            <NotePreview
              canPress={canPress}
              key={notes.item.id}
              id={notes.item.id} 
              title={notes.item.title} 
              text={notes.item.text} 
              last_edit_datetime={notes.item.last_edit_datetime}
              creation_datetime={notes.item.creation_datetime}
            /> 
          }
        /> : isLoading ? <LoadingNotesFeedback/> : <NoNoteFeedback>Nenhuma nota encontrada</NoNoteFeedback>
      }
      <CreateNoteButton onPress={() => navigation.navigate('Create', { title: 'Criar' })}/>
    </PageWrapper>
  )
  
  function deleteMultiNotesHandler() {
    const messageTitle = 'Excluir notas'
    const message = 'Tem certeza que deseja excluir as notas selecionadas?'
    const cbYes = async () => {     
      await deleteMultiNotes(selectedItems)
      deactivateSelectableMode()
      navigation.replace('Home', { title: 'Notas' }) 
    }
    
    showBooleanMessage(messageTitle, message, cbYes)
  }
}

export default Home