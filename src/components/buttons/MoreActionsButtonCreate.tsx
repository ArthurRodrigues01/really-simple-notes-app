import { Keyboard, Linking, View } from 'react-native';
import { Menu, MenuOption, MenuOptions, MenuTrigger, renderers } from "react-native-popup-menu";

import { useNavigation, useRoute } from '@react-navigation/native';

import ThreeDotsSVG from '../../assets/ThreeDots'
import ContextMenuOptionTitle from '../ContextMenuOptionTitle';
import { copyToClipboard, showMessage } from '../../functions/other-functions';
import { headerBarButtonStyles, menuTriggerCustomStyles } from '../../styles/headerBarButtons';
import { menuOptionCustomStyles } from '../../styles/buttons';
import { CreateScreenNavigationProps, CreateScreenRouteProps } from '../../types/navigation-types';

function MoreActionsButtonCreate() {
  const navigation = useNavigation<CreateScreenNavigationProps>()
  const route = useRoute<CreateScreenRouteProps>()

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