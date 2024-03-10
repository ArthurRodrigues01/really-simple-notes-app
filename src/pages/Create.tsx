import styled from "styled-components/native";
import { CreateScreenProps, RootStackParamList } from "../types/navigation-types"; 
import { RouteProp, useIsFocused} from "@react-navigation/native";
import { generateUUID, showBooleanMessage } from "../functions/other-functions";
import { getNote, getNoteTextFontsize, getNoteTitleFontsize, saveNote } from "../functions/storage-functions";
import { useState, useEffect } from "react";
import { FlexScrollCol } from "../components/general-components";
import useHardwareBackButton from "../hooks/useHardwareBackButton";
import { DEFAULT_NOTE_TEXT_FONTSIZE_IN_PIXELS, DEFAULT_NOTE_TITLE_FONTSIZE_IN_PIXELS } from "../constants/constants";

const NoteTitleInput = styled.TextInput<{fontsize?: number, color?: string }>`
  font-size: ${props => `${props.fontsize}px` || '24px'};
  padding: 16px;
  font-weight: bold;
  color: ${props => props.color || '#000000'}
`
const NoteTextInput = styled.TextInput<{ fontsize?: number, color?: string, borderColor?: string }>`
  flexGrow: 1;
  text-align-vertical: top;
  font-size: ${props =>  props.fontsize ? `${props.fontsize}px` : '18px'};  
  padding: 16px;
  margin: 16px;
  border: 2px solid ${props => props.borderColor || '#000000'};
  color: ${props => props.color || '#000000'}
`

function Create({ navigation, route }: {navigation: CreateScreenProps, route: RouteProp<RootStackParamList, 'Create'>}) {
  const isFocused = useIsFocused()
  const [title, setTitle] = useState(route.params.noteID ? route.params.noteTitle : '')
  const [text, setText] = useState(route.params.noteID ? route.params.noteText : '')
  const [titleFontsize, setTitleFontsize] = useState(DEFAULT_NOTE_TITLE_FONTSIZE_IN_PIXELS)
  const [textFontsize, setTextFontsize] = useState(DEFAULT_NOTE_TEXT_FONTSIZE_IN_PIXELS)

  const titleHandler = (title: string) => {
    setTitle(title)
    navigation.setParams({...route.params, noteTitle: title})
  }

  const textHandler = (text: string) => {
    setText(text)
    navigation.setParams({...route.params, noteText: text })
  }
  
  useEffect(() => {
    if (isFocused) {
      if (route.params.noteID) {
        navigation.setParams({ ...route.params, isNewNote: false })
      } else { 
        navigation.setParams({...route.params, noteText: text, noteTitle: title, isNewNote: true }) 
      }
      getNoteTitleFontsize().then(fontsize => fontsize && setTitleFontsize(Number(fontsize)))
      getNoteTextFontsize().then(fontsize => fontsize && setTextFontsize(Number(fontsize)))
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
  }, [route.params])

  return (
    <FlexScrollCol contentContainerStyle={{flexGrow: 1}}>
      <NoteTitleInput fontsize={titleFontsize} placeholderTextColor={'gray'} placeholder="Digite um título..." value={title} onChangeText={titleHandler}/>
      <NoteTextInput fontsize={textFontsize} placeholderTextColor={'gray'} placeholder="Digite uma nota..." value={text} multiline onChangeText={textHandler}/>
    </FlexScrollCol>
  )
}

export default Create