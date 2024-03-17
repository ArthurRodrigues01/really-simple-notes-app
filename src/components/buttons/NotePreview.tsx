import { HomeScreenProps } from "../../types/navigation-types"
import { useNavigation, useIsFocused } from "@react-navigation/native"
import styled from "styled-components/native"
import { Note } from "../../types/other-types"
import { toCustomCreateLocaleString, toCustomEditLocaleString } from "../../functions/other-functions"
import { SmallText, ScalableText, NativeButton } from "../general-components"
import { useEffect, useState } from "react"
import { getNoteTextFontsize, getNoteTitleFontsize } from "../../functions/storage-functions"
import { DEFAULT_NOTE_TEXT_FONTSIZE_IN_PIXELS, DEFAULT_NOTE_TITLE_FONTSIZE_IN_PIXELS } from "../../constants/constants"
import { useSelectableMode } from "../../hooks/SelectableModeProvider"

const NoteWrapper = styled(NativeButton)`
  display: flex;
  flex-direction: column;
  gap: 16px;
  padding: 12px;
  border-bottom-width: 1px;
  border-bottom-color: gray;
`
const LastEdit = styled(SmallText)`
  font-size: 14px;
  align-self: flex-end;
`

function NotePreview({id, title, text, last_edit_datetime, creation_datetime, disabled}: Note & { disabled: boolean}) {
  const navigation = useNavigation<HomeScreenProps>()
  const isFocused = useIsFocused()
  const { toggleItem, isSelected, isSelectableModeActive, wasSelectableModeDeactivatedRightNow } = useSelectableMode()

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

  const [titleFontsize, setTitleFontsize] = useState(DEFAULT_NOTE_TITLE_FONTSIZE_IN_PIXELS)
  const [textFontsize, setTextFontsize] = useState(DEFAULT_NOTE_TEXT_FONTSIZE_IN_PIXELS)

  const languageCode = 'pt-br'
  const localeOptions = { timeZone: 'America/Sao_Paulo' }
  const lastEditDatetimeDateObj = new Date(last_edit_datetime)
  const lastEditDatetimeString = toCustomEditLocaleString(lastEditDatetimeDateObj, languageCode, localeOptions)
  const creationDatetimeDateObj = new Date(creation_datetime)
  const creationDatetimeString = toCustomCreateLocaleString(creationDatetimeDateObj, languageCode, localeOptions)
  
  useEffect(() => {
    if (isFocused) {
      setFontsizesHandler()
      
      async function setFontsizesHandler() {
        setTitleFontsize(await getNoteTitleFontsize())
        setTextFontsize(await getNoteTextFontsize())
      }
    }
  }, [isFocused])

  return (
    <NoteWrapper disabled={disabled} style={isSelected(id) ? { backgroundColor: '#b4b4b5'} : {}} onPress={onPressHandler} onLongPress={() => toggleItem(id)}>
      <ScalableText bold fontsize={titleFontsize} numberOfLines={1}>{title}</ScalableText>
      <ScalableText fontsize={textFontsize} numberOfLines={3}>{text}</ScalableText>
      <LastEdit color="gray">{last_edit_datetime == creation_datetime ? creationDatetimeString : lastEditDatetimeString}</LastEdit>
    </NoteWrapper>
  )
}

export default NotePreview