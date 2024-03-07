import ThreeDotsSVG from '../assets/ThreeDots'
import { showBooleanMessage, showMessage } from '../functions/other-functions';
import { Menu, MenuTrigger, MenuOptions, MenuOption, renderers } from "react-native-popup-menu";
import { headerBarButtonStyles, menuTriggerCustomStyles } from '../styles/headerBarButtons';
import { View } from 'react-native';
import ContextMenuOptionButton from './ContextMenuOptionButton';
import { useNavigation } from '@react-navigation/native';
import { HomeScreenProps } from '../types/navigation-types';
import { clearNotes, exportNotes, importNotes } from '../functions/storage-functions';
import { pickSingle, isCancel} from 'react-native-document-picker';
import * as RNFS from '@dr.pogodin/react-native-fs'
import { Note } from '../types/other-types';
import { BACKUP_NOTES_FILE_SIZE_CAP_BYTES } from '../constants/constants';
import { NoNotesToExportError, TooLargeFileError, isNoNotesToExportError, isNotNoteFileError, isTooLargeFileError} from '../constants/error-handlers';
import { menuOptionCustomStyles } from '../styles/buttons';

function MoreActionsButtonHome() {
  const navigation = useNavigation<HomeScreenProps>()

  const deleteAllNotesHandler = () => {
    const messageTitle = 'Excluir tudo'
    const message = 'Tem certeza que deseja excluir TODAS as notas?'
    const cbYes = async () => { 
      await clearNotes()
      navigation.replace('Home', { title: 'Notas' }) 
    }
    
    showBooleanMessage(messageTitle, message, cbYes)
  }

  const importNotesHandler = async () => {
    try {
      const picked = await pickSingle({ type: 'application/json' })
      const jsonString = picked.uri && await RNFS.readFile(picked.uri)

      if (picked.size! > BACKUP_NOTES_FILE_SIZE_CAP_BYTES) throw new TooLargeFileError()

      const notesJSON: {notes: Note[]} = JSON.parse(jsonString)
  
      await importNotes(notesJSON)
      navigation.replace('Home', { title: 'Notas' })
      showMessage('Notas importadas com êxito!')
    } catch (e) {
      if (isCancel(e)) showMessage('Importação cancelada')
      else if (isTooLargeFileError(e)) showMessage('Arquivo muito grande! Tamanho máx.: 4MB')
      else if (isNotNoteFileError(e)) showMessage('Arquivo inválido')
      else showMessage('Ops! algo deu errado')
    }
  }

  const exportNotesHandler = async () => { 
    try {
      const notesToExport = await exportNotes()
      if (notesToExport.notes.length == 0) throw new NoNotesToExportError()
      
      const dateObj = new Date()
      const dateString = dateObj.getDate() + '-' + dateObj.getMonth() + '-' + dateObj.getFullYear() + '-' + dateObj.getHours() + '-' + dateObj.getMinutes() + '-' + dateObj.getSeconds()  
      const fileName = `backup-notes-${dateString}.json`
      const filePath = RNFS.DownloadDirectoryPath
      const destPath =  filePath + '/' + fileName

      await RNFS.writeFile(destPath, JSON.stringify(notesToExport))
      showMessage('Arquivo de backup salvo na pasta de downloads!') 
    } catch (e) {
      if (isNoNotesToExportError(e)) showMessage('Nenhuma nota para exportar')
      else showMessage('Ops! Algo deu errado')
    } 
  }

  return (
    <Menu renderer={renderers.Popover} rendererProps={{ placement: 'bottom' }}>
      <MenuTrigger customStyles={menuTriggerCustomStyles}>
        <View style={headerBarButtonStyles.headerBarButtonStyle}>
          <ThreeDotsSVG style={headerBarButtonStyles.headerBarButtonIconDimensions}/>
        </View>
      </MenuTrigger>
      <MenuOptions>
        <MenuOption customStyles={menuOptionCustomStyles} onSelect={(deleteAllNotesHandler)}>
          <ContextMenuOptionButton>
            Excluir todas as notas
          </ContextMenuOptionButton>
        </MenuOption>
        <MenuOption customStyles={menuOptionCustomStyles} onSelect={(importNotesHandler)}>
          <ContextMenuOptionButton>
            Importar notas
          </ContextMenuOptionButton>
        </MenuOption>
        <MenuOption customStyles={menuOptionCustomStyles} onSelect={(exportNotesHandler)}>
          <ContextMenuOptionButton>
            Exportar notas
          </ContextMenuOptionButton>
        </MenuOption>
      </MenuOptions>
    </Menu>
  )
}

export default MoreActionsButtonHome