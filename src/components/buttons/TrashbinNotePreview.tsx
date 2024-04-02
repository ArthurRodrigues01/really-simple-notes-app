import { useState } from "react"

import { useNavigation } from "@react-navigation/native"

import { NoteFooter, NoteWrapper } from "./styles"
import { ScalableText } from "../general-components"
import { getNoteTextFontsize, getNoteTitleFontsize } from "../../functions/storage-functions"
import { useSelectableMode } from "../../hooks/selectableMode"
import { Note } from "../../types/other-types"
import { TrashbinScreenNavigationProps } from "../../types/navigation-types"
import useDefaultStorageListener from "../../hooks/useDefaultStorageListener"
import { toCustomDeletedLocaleString } from "../../functions/other-functions"


function TrashbinNotePreview({id, title, text, last_edit_datetime, creation_datetime, disabled, deletionDate}: Note & { disabled: boolean, deletionDate: string}) {
  const navigation = useNavigation<TrashbinScreenNavigationProps>()
  const { 
    toggleItem, 
    isSelected, 
    isSelectableModeActive 
  } = useSelectableMode()
  const [titleFontsize, setTitleFontsize] = useState(getNoteTitleFontsize())
  const [textFontsize, setTextFontsize] = useState(getNoteTextFontsize())

  const onPressHandler= () => {
    if (!isSelectableModeActive()) {
      navigation.navigate('Read', {
        title: 'Nota', 
        noteID: id, 
        noteTitle: title, 
        noteText: text, 
        noteCreationDatetime: creation_datetime,
        noteLastEditDatetime: last_edit_datetime
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
  const deletedDatetimeDateObj = new Date(deletionDate)
  const deletedDatetimeString = toCustomDeletedLocaleString(deletedDatetimeDateObj, languageCode, localeOptions)


  return (
    <NoteWrapper disabled={disabled} style={isSelected(id) ? { backgroundColor: '#b4b4b5'} : {}} onPress={onPressHandler} onLongPress={() => toggleItem(id)}>
      <ScalableText bold fontsize={titleFontsize} numberOfLines={1}>{title}</ScalableText>
      <ScalableText fontsize={textFontsize} numberOfLines={3}>{text}</ScalableText>
      <NoteFooter color="gray">{deletedDatetimeString}</NoteFooter>
    </NoteWrapper>
  )
}

export default TrashbinNotePreview