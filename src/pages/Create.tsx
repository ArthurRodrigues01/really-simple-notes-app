import styled from "styled-components/native";
import { CreateScreenProps, RootStackParamList } from "../types/navigation-types"; 
import { RouteProp, useIsFocused} from "@react-navigation/native";
import { generateUUID, showBooleanMessage } from "../functions/other-functions";
import { getNote, saveNote } from "../functions/storage-functions";
import { useState, useEffect, useCallback } from "react";
import { FlexScrollCol } from "../components/general-components";
import useHardwareBackButton from "../hooks/useHardwareBackButton";

const NoteTitleInput = styled.TextInput<{ color?: string }>`
  font-size: 24px;
  padding: 16px;
  font-weight: bold;
  color: ${props => props.color || '#000000'}
`
const NoteTextInput = styled.TextInput<{ color?: string, borderColor?: string }>`
  min-height: 500px;
  text-align-vertical: top;
  font-size: 18px;  
  padding: 16px;
  margin: 16px;
  border: 2px;
  border-bottom-color: ${props => props.borderColor || 'gray'};
  color: ${props => props.color || '#000000'}
`

function Create({ navigation, route }: {navigation: CreateScreenProps, route: RouteProp<RootStackParamList, 'Create'>}) {
  const isFocused = useIsFocused()
  const [title, setTitle] = useState(route.params.noteID ? route.params.noteTitle : '')
  const [text, setText] = useState(route.params.noteID ? route.params.noteText : '')

  const titleHandler = (title: string) => {
    setTitle(title)
    navigation.setParams({...route.params, noteTitle: title})
  }

  const textHandler = (text: string) => {
    setText(text)
    navigation.setParams({...route.params, noteText: text })
  }

  useEffect(() => {
    if (isFocused && route.params.noteID) {
      navigation.setParams({ ...route.params, isNewNote: false })
    } else if (isFocused){ 
      navigation.setParams({...route.params, noteText: text, noteTitle: title, isNewNote: true }) 
    }
  }, [isFocused])

  useHardwareBackButton(() => {
    const isNewNote = route.params.isNewNote
    const newDatetime = new Date().toISOString()

    const note = {
      id: !isNewNote ? route.params.noteID! : generateUUID(), // IMPORTANT: "!" operator used, be careful.
      title: route.params.noteTitle!, // IMPORTANT: "!" operator used, be careful.
      text: route.params.noteText!, // IMPORTANT: "!" operator used, be careful.
      creation_datetime: !isNewNote ? route.params.noteCreationDatetime! : newDatetime, // IMPORTANT: "!" operator used, be careful.
      last_edit_datetime: newDatetime
    }

    const messageTitle = 'Salvar nota'
    const message = `Deseja ${isNewNote ? 'criar' : 'editar'} esta nota?`
    const cbYes = () => saveNote(note).then(res => navigation.navigate('Home', { title: 'Notas' }))
    const cbNo = () => navigation.navigate('Home', { title: 'Notas' })

    if (isNewNote) {
      if (note.title == '' && note.text == '') {
        navigation.navigate('Home', { title: 'Notas' })
      } else {
        showBooleanMessage(messageTitle, message, cbYes, cbNo)
      }
    } else if (!isNewNote) {
      getNote(note.id).then(savedNote => {
        if (note.title == savedNote.title && note.text == savedNote.text) {
          return navigation.navigate('Home', { title: 'Notas' })
        } 
        
        showBooleanMessage(messageTitle, message, cbYes, cbNo)
      })
    }
  }, [])

  return (
    <FlexScrollCol>
      <NoteTitleInput placeholderTextColor={'gray'} placeholder="Digite um título..." value={title} onChangeText={titleHandler}/>
      <NoteTextInput placeholderTextColor={'gray'} placeholder="Digite uma nota..." value={text} multiline onChangeText={textHandler}/>
    </FlexScrollCol>
  )
}

export default Create