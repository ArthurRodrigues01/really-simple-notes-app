import styled from "styled-components/native";
import { CreateScreenProps, RootStackParamList } from "../types/navigation-types"; 
import { RouteProp, useIsFocused} from "@react-navigation/native";
import { getNoteTextFontsize, getNoteTitleFontsize, saveNoteHandler } from "../functions/storage-functions";
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
  
  useEffect(() => {
    if (isFocused) {
      if (route.params.noteID) {
        navigation.setParams({ ...route.params, isNewNote: false })
      } else { 
        navigation.setParams({...route.params, noteText: text, noteTitle: title, isNewNote: true }) 
      }
      setFontsizesHandler()
      
      async function setFontsizesHandler() {
        setTitleFontsize(await getNoteTitleFontsize())
        setTextFontsize(await getNoteTextFontsize())
      }
    }
  }, [isFocused])
  
  useHardwareBackButton(() => saveNoteHandler(navigation, route), [route.params])

  return (
    <FlexScrollCol contentContainerStyle={{flexGrow: 1}}>
      <NoteTitleInput fontsize={titleFontsize} placeholderTextColor={'gray'} placeholder="Digite um título..." value={title} onChangeText={titleHandler}/>
      <NoteTextInput fontsize={textFontsize} placeholderTextColor={'gray'} placeholder="Digite uma nota..." value={text} multiline onChangeText={textHandler}/>
    </FlexScrollCol>
  )
  
  function titleHandler(title: string) {
    setTitle(title)
    navigation.setParams({...route.params, noteTitle: title})
  }

  function textHandler(text: string) {
    setText(text)
    navigation.setParams({...route.params, noteText: text })
  }
}

export default Create