import { HomeScreenProps } from "../types/navigation-types"
import { useNavigation, useIsFocused } from "@react-navigation/native"
import styled from "styled-components/native"
import { Note } from "../types/other-types"
import { toCustomCreateLocaleString, toCustomEditLocaleString } from "../functions/other-functions"
import { SmallText, ScalableText, NativeButton } from "./general-components"
import { useEffect, useState } from "react"
import { getNoteTextFontsize, getNoteTitleFontsize } from "../functions/storage-functions"
import { DEFAULT_NOTE_TEXT_FONTSIZE_IN_PIXELS, DEFAULT_NOTE_TITLE_FONTSIZE_IN_PIXELS } from "../constants/constants"
import { ColorValue, PressableProps, StyleProp, ViewStyle } from "react-native"

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

function NotePreview({id, title, text, last_edit_datetime, creation_datetime, onLongPressHandler, onPressHandler, style, canPress, rippleColor}: Note & { canPress: boolean, onLongPressHandler: (item: string) => void, onPressHandler: (item: string) => void, rippleColor: ColorValue } & PressableProps) {
  const isFocused = useIsFocused()

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
      getNoteTitleFontsize().then(fontsize => fontsize && setTitleFontsize(Number(fontsize)))
      getNoteTextFontsize().then(fontsize => fontsize && setTextFontsize(Number(fontsize)))
    }
  }, [isFocused])

  return (
    <NoteWrapper rippleColor={rippleColor} canPress={canPress} style={style} unstable_pressDelay={16} onPress={() => onPressHandler(id)} onLongPress={() => onLongPressHandler(id)}>
      <ScalableText bold fontsize={titleFontsize} numberOfLines={1}>{title}</ScalableText>
      <ScalableText fontsize={textFontsize} numberOfLines={3}>{text}</ScalableText>
      <LastEdit color="gray">{last_edit_datetime == creation_datetime ? creationDatetimeString : lastEditDatetimeString}</LastEdit>
    </NoteWrapper>
  )
}

export default NotePreview