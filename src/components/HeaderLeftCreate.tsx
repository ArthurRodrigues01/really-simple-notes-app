import styled from "styled-components";
import { TextProps } from "react-native";
import { CenteredFlexRow, Title } from "./general-components";
import { RouteProp, useNavigation, useRoute } from "@react-navigation/native";
import { CreateScreenProps, RootStackParamList } from "../types/navigation-types";
import BackButton from "./BackButton";
import { getNote, saveNote } from "../functions/storage-functions";
import { generateUUID, showBooleanMessage } from "../functions/other-functions";
import { Note } from "../types/other-types";

const HeaderLeftWrapper = styled(CenteredFlexRow)`
  gap: 16px;
`


function HeaderLeftCreate({children}: TextProps) {
  const navigation = useNavigation<CreateScreenProps>()
  const route = useRoute<RouteProp<RootStackParamList, 'Create'>>()

  return (
    <HeaderLeftWrapper>
      <BackButton onPress={() => {
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
      }}/>
      <Title color={'#fff'}>
        {children}
      </Title>
    </HeaderLeftWrapper>
  )
}

export default HeaderLeftCreate