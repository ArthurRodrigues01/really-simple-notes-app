import { HomeScreenProps } from "../types/navigation-types";
import { useIsFocused } from "@react-navigation/native";
import { FlatList } from "react-native";
import NotePreview from "../components/NotePreview";
import { useEffect, useState } from "react";
import { Note } from "../types/other-types";
import { deleteMultiNotes, getAllNotes, getSortingMode } from "../functions/storage-functions";
import CreateNoteButton from "../components/CreateNoteButton";
import styled from "styled-components/native";
import NoNoteFeedback from "../components/NoNoteFeedback";
import DeleteNoteButton from "../components/DeleteNoteButton";
import useSortNotes from "../hooks/useSortNotes";
import useSelectableMode from "../hooks/useSelectableMode";
import LoadingNotesFeedback from "../components/LoadingNotesFeedback";
import { showBooleanMessage } from "../functions/other-functions";
import HeaderRightHome from "../components/HeaderRightHome";

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
  const { deactivateMode, selectedItems, toggleItem, isSelectableModeActive, selectedItemsCount, isSelected } = useSelectableMode()

  const deleteMultiNoteHandler = () => {
    const messageTitle = 'Excluir notas'
    const message = 'Tem certeza que deseja excluir as notas selecionadas?'
    const cbYes = async () => { 
      await deleteMultiNotes(selectedItems)
      deactivateMode()
      navigation.replace('Home', { title: 'Notas' }) 
    }
    
    showBooleanMessage(messageTitle, message, cbYes)
  }


  useEffect(() => {
    if (isFocused) { 
      getAllNotes().then(notes => {
        getSortingMode().then((sortingMode: string) => {
          switch(Number(sortingMode) > 4 || Number(sortingMode) < 0 ? 1 : Number(sortingMode)) {
            case 0: // alphabetical
              setNotes(sortByAlphabeticalOrderByKey(notes, 'title'))
              break
            case 1: // newest
              setNotes(sortByNewest(notes))
              break
            case 2: // oldest
              setNotes(sortByOldest(notes))
              break
            case 3: // newest edits
              setNotes(sortByNewestEdit(notes))
              break;
            case 4: // oldest edits
              setNotes(sortByOldestEdit(notes))
              break
          }
          setLoading(false)
        })
      })
    }
    if (isSelectableModeActive()) {
      // console.log(selectedItemsCount)
      navigation.setOptions({ headerTitle: `Selected ${selectedItemsCount}`, headerRight: () => <DeleteNoteButton onPress={deleteMultiNoteHandler}/> })
    } else if (!isSelectableModeActive()) {
      // console.log(selectedItemsCount)
      navigation.setOptions({ headerTitle: 'Notas', headerRight: () => <HeaderRightHome/> })
    }
  }, [isFocused, selectedItemsCount])

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
              style={isSelected(notes.item.id) ? { backgroundColor: '#b4b4b5'} : {}}
              key={notes.item.id}
              id={notes.item.id} 
              title={notes.item.title} 
              text={notes.item.text} 
              last_edit_datetime={notes.item.last_edit_datetime}
              creation_datetime={notes.item.creation_datetime} 
              onLongPressHandler={toggleItem}
              rippleColor={isSelected(notes.item.id) ? 'transparent': 'gray'}
              onPressHandler={() => {
                if (!isSelectableModeActive()) {
                  navigation.navigate('Create', {
                    title: 'Editar', 
                    noteID: notes.item.id, 
                    noteTitle: notes.item.title, 
                    noteText: notes.item.text, 
                    noteCreationDatetime: notes.item.creation_datetime
                  })
                } else {
                  toggleItem(notes.item.id)
                }
              }}
            /> 
          }
        /> : isLoading ? <LoadingNotesFeedback/> : <NoNoteFeedback>Nenhuma nota encontrada</NoNoteFeedback>
      }
      <CreateNoteButton onPress={() => navigation.navigate('Create', { title: 'Criar' })}/>
    </PageWrapper>
  )
}

export default Home