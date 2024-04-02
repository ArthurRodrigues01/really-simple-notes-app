import { useEffect, useState } from "react";

import { useIsFocused } from "@react-navigation/native";

import { FlexScrollCol } from "../components/general-components";
import { 
  DEFAULT_NOTE_TEXT_FONTSIZE_IN_PIXELS, 
  DEFAULT_NOTE_TITLE_FONTSIZE_IN_PIXELS 
} from "../constants/constants";
import { 
  getNoteTextFontsize, 
  getNoteTitleFontsize, 
  saveNoteHandler 
} from "../functions/storage-functions";
import useHardwareBackButton from "../hooks/useHardwareBackButton";
import { NoteTextInput, NoteTitleInput } from "./styles";
import { 
  CreateScreenNavigationProps, 
  CreateScreenRouteProps 
} from "../types/navigation-types";

function Create({ navigation, route }: {navigation: CreateScreenNavigationProps, route: CreateScreenRouteProps}) {
  const isFocused = useIsFocused()
  const [title, setTitle] = useState(route.params.noteID ? route.params.noteTitle : '')
  const [text, setText] = useState(route.params.noteID ? route.params.noteText : '')
  // const [titleFontsize, setTitleFontsize] = useState(DEFAULT_NOTE_TITLE_FONTSIZE_IN_PIXELS)
  // const [textFontsize, setTextFontsize] = useState(DEFAULT_NOTE_TEXT_FONTSIZE_IN_PIXELS)
  const titleFontsize = getNoteTitleFontsize()
  const textFontsize = getNoteTextFontsize()
  
  useEffect(() => {
    if (isFocused) {
      if (route.params.noteID) {
        navigation.setParams({ ...route.params, isNewNote: false })
      } else { 
        navigation.setParams({...route.params, noteText: text, noteTitle: title, isNewNote: true }) 
      }
      // setFontsizesHandler()
      
      // async function setFontsizesHandler() {
      //   setTitleFontsize(await getNoteTitleFontsize())
      //   setTextFontsize(await getNoteTextFontsize())
      // }
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