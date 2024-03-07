import { HomeScreenProps } from "../types/navigation-types";
import { useIsFocused } from "@react-navigation/native";
import { FlatList } from "react-native";
import NotePreview from "../components/NotePreview";
import { useEffect, useState } from "react";
import { Note } from "../types/other-types";
import { getAllNotes, getSortingMode } from "../functions/storage-functions";
import CreateNoteButton from "../components/CreateNoteButton";
import styled from "styled-components/native";
import NoNoteFeedback from "../components/NoNoteFeedback";
import useSortNotes from "../hooks/useSortNotes";
import LoadingNotesFeedback from "../components/LoadingNotesFeedback";

const PageWrapper = styled.View`
  display: flex;
  flex-grow: 1;
`

function Home({ navigation }: {navigation: HomeScreenProps}) {
  const isFocused = useIsFocused()
  const [notes, setNotes] = useState<Note[]>([])
  const [isLoading, setLoading] = useState(true)
  const {sortByNewest, sortByOldest, sortByNewestEdit, sortByOldestEdit, sortByAlphabeticalOrderByKey} = useSortNotes()

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
  }, [isFocused])

  return (
    <PageWrapper>
      { 
        notes.length != 0 ? 
        <FlatList
          data={notes}
          initialNumToRender={10}
          renderItem={(notes) =>  
            <NotePreview
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
}

export default Home