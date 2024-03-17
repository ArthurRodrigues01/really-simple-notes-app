import ThreeDotsSVG from '../../assets/ThreeDots'
import { copyToClipboard, showMessage } from '../../functions/other-functions';
import { Menu, MenuTrigger, MenuOptions, MenuOption, renderers } from "react-native-popup-menu";
import { headerBarButtonStyles, menuTriggerCustomStyles } from '../../styles/headerBarButtons';
import { View, Linking, Keyboard } from 'react-native';
import ContextMenuOptionTitle from '../ContextMenuOptionTitle';
import { RouteProp, useNavigation, useRoute } from '@react-navigation/native';
import { CreateScreenProps, RootStackParamList } from '../../types/navigation-types';
import { menuOptionCustomStyles } from '../../styles/buttons';

function MoreActionsButtonCreate() {
  const navigation = useNavigation<CreateScreenProps>()
  const route = useRoute<RouteProp<RootStackParamList, 'Create'>>()

  return (
    <Menu renderer={renderers.Popover} rendererProps={{ placement: 'bottom' }}>
      <MenuTrigger customStyles={menuTriggerCustomStyles}>
        <View style={headerBarButtonStyles.headerBarButtonStyle}>
          <ThreeDotsSVG style={headerBarButtonStyles.headerBarButtonIconDimensions}/>
        </View>
      </MenuTrigger>
      <MenuOptions>
        <MenuOption customStyles={menuOptionCustomStyles} onSelect={clipboardHandler}>
          <ContextMenuOptionTitle>
            Copiar nota
          </ContextMenuOptionTitle>
        </MenuOption>
        <MenuOption customStyles={menuOptionCustomStyles} onSelect={sendEmailHandler}>
          <ContextMenuOptionTitle>
            Enviar nota como email
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
  
  function clipboardHandler() {
    copyToClipboard(route.params.noteText!)
    showMessage('Nota copiada com sucesso!')
  } 

  function sendEmailHandler() {
    Linking.openURL(`mailto:?subject=${route.params.noteTitle}&body=${route.params.noteText}`)
  }

  function goToFontOptionsModalHandler() {
    Keyboard.dismiss()
    setTimeout(() => {
      navigation.navigate('FontOptionsModal', {}) 
    }, 125)
  }
}

export default MoreActionsButtonCreate