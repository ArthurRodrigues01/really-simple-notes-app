import { useState } from "react";

import { FlexScrollCol } from "../components/general-components";
import { getNoteTextFontsize, getNoteTitleFontsize } from "../functions/storage-functions";
import { NoteTextInput, NoteTitleInput } from "./styles";
import { ReadScreenNavigationProps, ReadScreenRouteProps } from "../types/navigation-types";
import useDefaultStorageListener from "../hooks/useDefaultStorageListener";

function Read({ navigation, route }: {navigation: ReadScreenNavigationProps, route: ReadScreenRouteProps}) {
  const [titleFontsize, setTitleFontsize] = useState(getNoteTitleFontsize())
  const [textFontsize, setTextFontsize] = useState(getNoteTextFontsize())

  useDefaultStorageListener(() => {
    setTitleFontsize(getNoteTitleFontsize())
    setTextFontsize(getNoteTextFontsize())
  })

  return (
    <FlexScrollCol contentContainerStyle={{flexGrow: 1}}>
      <NoteTitleInput readOnly fontsize={titleFontsize} placeholderTextColor={'gray'} placeholder="Sem título" value={route.params.noteTitle}/>
      <NoteTextInput readOnly fontsize={textFontsize} placeholderTextColor={'gray'} placeholder="Sem nota" value={route.params.noteText} multiline/>
    </FlexScrollCol>
  )
}

export default Read