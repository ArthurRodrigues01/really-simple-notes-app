import { StatusBar } from "react-native";
import { Title, ScalableText } from "../components/general-components";
import { FontOptionsModalScreenProps, RootStackParamList } from "../types/navigation-types";
import { RouteProp } from "@react-navigation/native";
import { ANDROID_BACKDROP_STATUSBAR_COLOR, DEFAULT_NOTE_TEXT_FONTSIZE_IN_PIXELS, DEFAULT_NOTE_TITLE_FONTSIZE_IN_PIXELS, HEADER_BACKGROUND_COLOR } from "../constants/constants";
import useHardwareBackButton from "../hooks/useHardwareBackButton";
import React, { useEffect, useState } from "react";
import Slider from "@react-native-community/slider";
import useViewportUnits from "../hooks/useViewportUnits";
import { getNoteTextFontsize, getNoteTitleFontsize, saveNoteTextFontsize, saveNoteTitleFontsize, setFontsizesHandler } from "../functions/storage-functions";
import { ModalAlertBoxContainer, ModalAlertBox, ModalBackdrop, ModalButton } from "../components/modal-components";

const NoteTitlePreview = (props: { fontsize: number, children: string }) => {
  return <ScalableText bold { ...props }/>
}
const NoteTextPreview = (props: { fontsize: number, children: string }) => {
  return <ScalableText {...props}/>
}

function FontOptionsModal({ navigation }: { navigation: FontOptionsModalScreenProps, route: RouteProp<RootStackParamList, 'FontOptionsModal'> }) {
  StatusBar.setBackgroundColor(ANDROID_BACKDROP_STATUSBAR_COLOR)

  const [titleFontsize, setTitleFontsize] = useState(DEFAULT_NOTE_TITLE_FONTSIZE_IN_PIXELS)
  const [textFontsize, setTextFontsize] = useState(DEFAULT_NOTE_TEXT_FONTSIZE_IN_PIXELS)
  const { vw } = useViewportUnits()
  
  const closeModalHandler = () => {
    StatusBar.setBackgroundColor(HEADER_BACKGROUND_COLOR)
    navigation.goBack()
  }
  
  const setDefaultFontsizesHandler = () => {
    setTitleFontsize(DEFAULT_NOTE_TITLE_FONTSIZE_IN_PIXELS)  
    setTextFontsize(DEFAULT_NOTE_TEXT_FONTSIZE_IN_PIXELS)
  }
  
  const saveFontsizesHandler = async () => {
    await saveNoteTitleFontsize(titleFontsize)
    await saveNoteTextFontsize(textFontsize)
    closeModalHandler()
  }

  useHardwareBackButton(closeModalHandler, [])

  useEffect(() => {
    setFontsizesHandler()
      
    async function setFontsizesHandler() {
      setTitleFontsize(await getNoteTitleFontsize())
      setTextFontsize(await getNoteTextFontsize())
    }
  }, [titleFontsize])
  
  

  return (
    <>
    <ModalBackdrop onPress={closeModalHandler}/>
    <ModalAlertBoxContainer>
      <ModalAlertBox width={vw(85)}>
        <NoteTitlePreview fontsize={titleFontsize}>Título</NoteTitlePreview>
        <Slider 
          maximumTrackTintColor="gray"
          value={titleFontsize} 
          step={1} 
          minimumValue={DEFAULT_NOTE_TITLE_FONTSIZE_IN_PIXELS / 2} 
          maximumValue={DEFAULT_NOTE_TITLE_FONTSIZE_IN_PIXELS * 1.5} 
          onValueChange={(value) => setTitleFontsize(value)} 
        />
        <NoteTextPreview fontsize={textFontsize}>Texto</NoteTextPreview>
        <Slider 
          maximumTrackTintColor="gray" 
          value={textFontsize} 
          step={1} 
          minimumValue={DEFAULT_NOTE_TEXT_FONTSIZE_IN_PIXELS / 2} 
          maximumValue={DEFAULT_NOTE_TEXT_FONTSIZE_IN_PIXELS * 1.5} 
          onValueChange={(value) => setTextFontsize(value)}
        />
        <ModalButton rippleColor={'lightgray'} onPress={saveFontsizesHandler}>
          <Title color="#ffffff">Salvar</Title>
        </ModalButton>
        <ModalButton rippleColor={'lightgray'} onPress={setDefaultFontsizesHandler}>
          <Title color="#ffffff">Restaurar Padrão</Title>
        </ModalButton>
      </ModalAlertBox>
    </ModalAlertBoxContainer>
    </>
  )
}

export default FontOptionsModal