import React, { useEffect, useState } from "react";

import { StatusBar } from "react-native";

import Slider from "@react-native-community/slider";

import { FlexCol, Title } from "../components/general-components";
import { 
  ModalAlertBox, 
  ModalAlertBoxContainer, 
  ModalBackdrop, 
  ModalButton 
} from "../components/modal-components";
import { 
  ANDROID_BACKDROP_STATUSBAR_COLOR, 
  DEFAULT_NOTE_TEXT_FONTSIZE_IN_PIXELS, 
  DEFAULT_NOTE_TITLE_FONTSIZE_IN_PIXELS, 
  HEADER_BACKGROUND_COLOR 
} from "../constants/constants";
import { 
  getNoteTextFontsize, 
  getNoteTitleFontsize, 
  saveNoteTextFontsize, 
  saveNoteTitleFontsize 
} from "../functions/storage-functions";
import useViewportUnits from "../hooks/useViewportUnits";
import useHardwareBackButton from "../hooks/useHardwareBackButton";
import { NoteTextPreview, NoteTitlePreview } from "./styles";
import { 
  FontOptionsModalScreenNavigationProps, 
  FontOptionsModalScreenRouteProps 
} from "../types/navigation-types";
import useDefaultStorageListener from "../hooks/useDefaultStorageListener";




function FontOptionsModal({ navigation }: { navigation: FontOptionsModalScreenNavigationProps, route: FontOptionsModalScreenRouteProps }) {
  StatusBar.setBackgroundColor(ANDROID_BACKDROP_STATUSBAR_COLOR)

  const [titleFontsize, setTitleFontsize] = useState(getNoteTitleFontsize())
  const [textFontsize, setTextFontsize] = useState(getNoteTextFontsize())

  const { vw } = useViewportUnits()
  
  const closeModalHandler = () => {
    StatusBar.setBackgroundColor(HEADER_BACKGROUND_COLOR)
    navigation.goBack()
  }
  
  const setDefaultFontsizesHandler = () => {
    setTitleFontsize(DEFAULT_NOTE_TITLE_FONTSIZE_IN_PIXELS)  
    setTextFontsize(DEFAULT_NOTE_TEXT_FONTSIZE_IN_PIXELS)
  }
  
  const saveFontsizesHandler = () => {
    saveNoteTitleFontsize(titleFontsize)
    saveNoteTextFontsize(textFontsize)
    closeModalHandler()
  } 

  useHardwareBackButton(closeModalHandler, []) 

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
        <FlexCol gap={8}>
          <ModalButton rippleColor={'lightgray'} onPress={saveFontsizesHandler}>
            <Title color="#ffffff">Salvar</Title>
          </ModalButton>
          <ModalButton rippleColor={'lightgray'} onPress={setDefaultFontsizesHandler}>
            <Title color="#ffffff">Restaurar Padrão</Title>
          </ModalButton>
        </FlexCol>
      </ModalAlertBox>
    </ModalAlertBoxContainer>
    </>
  )
}

export default FontOptionsModal