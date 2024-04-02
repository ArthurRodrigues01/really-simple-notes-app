import { useState } from "react"

import { useNavigation } from "@react-navigation/native"

import { NoteFooter, NoteWrapper } from "./styles"
import { ScalableText } from "../general-components"
import { getNoteTextFontsize, getNoteTitleFontsize } from "../../functions/storage-functions"
import { 
  toCustomCreateLocaleString, 
  toCustomEditLocaleString 
} from "../../functions/other-functions"
import { useSelectableMode } from "../../hooks/selectableMode"
import { Note } from "../../types/other-types"
import { HomeScreenNavigationProps } from "../../types/navigation-types"
import useDefaultStorageListener from "../../hooks/useDefaultStorageListener"


function NotePreview({id, title, text, last_edit_datetime, creation_datetime, disabled}: Note & { disabled: boolean}) {
  const navigation = useNavigation<HomeScreenNavigationProps>()
  const { 
    toggleItem, 
    isSelected, 
    isSelectableModeActive 
  } = useSelectableMode()
  const [titleFontsize, setTitleFontsize] = useState(getNoteTitleFontsize())
  const [textFontsize, setTextFontsize] = useState(getNoteTextFontsize())

  const onPressHandler= () => {
    if (!isSelectableModeActive()) {
      navigation.navigate('Create', {
        title: 'Editar', 
        noteID: id, 
        noteTitle: title, 
        noteText: text, 
        noteCreationDatetime: creation_datetime
      })
    } else {
      toggleItem(id)
    }
  }


  useDefaultStorageListener(() => {
    setTitleFontsize(getNoteTitleFontsize())
    setTextFontsize(getNoteTextFontsize())
  })

  const languageCode = 'pt-br'
  const localeOptions = { timeZone: 'America/Sao_Paulo' }
  const lastEditDatetimeDateObj = new Date(last_edit_datetime)
  const lastEditDatetimeString = toCustomEditLocaleString(lastEditDatetimeDateObj, languageCode, localeOptions)
  const creationDatetimeDateObj = new Date(creation_datetime)
  const creationDatetimeString = toCustomCreateLocaleString(creationDatetimeDateObj, languageCode, localeOptions)
  

  return (
    <NoteWrapper disabled={disabled} style={isSelected(id) ? { backgroundColor: '#b4b4b5'} : {}} onPress={onPressHandler} onLongPress={() => toggleItem(id)}>
      <ScalableText bold fontsize={titleFontsize} numberOfLines={1}>{title}</ScalableText>
      <ScalableText fontsize={textFontsize} numberOfLines={3}>{text}</ScalableText>
      <NoteFooter color="gray">{last_edit_datetime == creation_datetime ? creationDatetimeString : lastEditDatetimeString}</NoteFooter>
    </NoteWrapper>
  )
}

export default NotePreview