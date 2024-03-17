import ThreeDotsSVG from '../../assets/ThreeDots'
import { showBooleanMessage, showMessage } from '../../functions/other-functions';
import { Menu, MenuTrigger, MenuOptions, MenuOption, renderers } from "react-native-popup-menu";
import { headerBarButtonStyles, menuTriggerCustomStyles } from '../../styles/headerBarButtons';
import { Keyboard, View } from 'react-native';
import ContextMenuOptionTitle from '../ContextMenuOptionTitle';
import { useNavigation } from '@react-navigation/native';
import { HomeScreenProps } from '../../types/navigation-types';
import { clearNotes, getAllNotes, importNotes } from '../../functions/storage-functions';
import { pickSingle, isCancel} from 'react-native-document-picker';
import * as RNFS from '@dr.pogodin/react-native-fs'
import { Note } from '../../types/other-types';
import { BACKUP_NOTES_FILE_SIZE_CAP_BYTES } from '../../constants/constants';
import { NoNotesToExportError, TooLargeFileError, isNoNotesToExportError, isNotNoteFileError, isTooLargeFileError} from '../../constants/error-handlers';
import { menuOptionCustomStyles } from '../../styles/buttons';

function MoreActionsButtonHome() {
  const navigation = useNavigation<HomeScreenProps>()

  return (
    <Menu renderer={renderers.Popover} rendererProps={{ placement: 'bottom' }}>
      <MenuTrigger customStyles={menuTriggerCustomStyles}>
        <View style={headerBarButtonStyles.headerBarButtonStyle}>
          <ThreeDotsSVG style={headerBarButtonStyles.headerBarButtonIconDimensions}/>
        </View>
      </MenuTrigger>
      <MenuOptions>
        <MenuOption customStyles={menuOptionCustomStyles} onSelect={deleteAllNotesHandler}>
          <ContextMenuOptionTitle>
            Excluir todas as notas
          </ContextMenuOptionTitle>
        </MenuOption>
        <MenuOption customStyles={menuOptionCustomStyles} onSelect={importNotesHandler}>
          <ContextMenuOptionTitle>
            Importar notas
          </ContextMenuOptionTitle>
        </MenuOption>
        <MenuOption customStyles={menuOptionCustomStyles} onSelect={exportNotesHandler}>
          <ContextMenuOptionTitle>
            Exportar notas
          </ContextMenuOptionTitle>
        </MenuOption>
        <MenuOption customStyles={menuOptionCustomStyles} onSelect={goToFontOptionsModalHandler}>
          <ContextMenuOptionTitle>
            Alterar Tamanho da Fonte
          </ContextMenuOptionTitle>
        </MenuOption>
      </MenuOptions>
    </Menu>
  )

  function deleteAllNotesHandler() {
    const messageTitle = 'Excluir tudo'
    const message = 'Tem certeza que deseja excluir TODAS as notas?'
    const cbYes = async () => { 
      await clearNotes()
      navigation.replace('Home', { title: 'Notas' }) 
    }
    
    showBooleanMessage(messageTitle, message, cbYes)
  }

  async function importNotesHandler() {
    const title = 'AVISO⚠️'
    const message = 'A importação de novas notas excluíra TODAS as notas existentes.\nTem certeza que deseja importar novas notas?'
    showBooleanMessage(title, message, async () => {
      try {
        const picked = await pickSingle({ type: 'application/json' })
        const jsonString = picked.uri && await RNFS.readFile(picked.uri)
  
        if (picked.size! > BACKUP_NOTES_FILE_SIZE_CAP_BYTES) throw new TooLargeFileError()
  
        const notesJSON = JSON.parse(jsonString)
    
        await importNotes(notesJSON)
        navigation.replace('Home', { title: 'Notas' })
        showMessage('Notas importadas com êxito!')
      } catch (e) {
        if (isCancel(e)) showMessage('Importação cancelada')
        else if (isTooLargeFileError(e)) showMessage('Arquivo muito grande! Tamanho máx.: 4MB')
        else if (isNotNoteFileError(e)) showMessage('Arquivo inválido')
        else showMessage('Ops! algo deu errado')
      }
    })
  }

  async function exportNotesHandler() { 
    try {
      const notesToExport = await getAllNotes()
      if (notesToExport.length == 0) throw new NoNotesToExportError()
      
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

  function goToFontOptionsModalHandler() {
    Keyboard.dismiss()
    setTimeout(() => {
      navigation.navigate('FontOptionsModal', {}) 
    }, 125)
  }
}

export default MoreActionsButtonHome