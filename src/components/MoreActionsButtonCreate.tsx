import ThreeDotsSVG from '../assets/ThreeDots'
import { copyToClipboard, showMessage } from '../functions/other-functions';
import { Menu, MenuTrigger, MenuOptions, MenuOption, renderers } from "react-native-popup-menu";
import { headerBarButtonStyles, menuTriggerCustomStyles } from '../styles/headerBarButtons';
import { View, Linking, Keyboard } from 'react-native';
import ContextMenuOptionButton from './ContextMenuOptionButton';
import { RouteProp, useNavigation, useRoute } from '@react-navigation/native';
import { CreateScreenProps, RootStackParamList } from '../types/navigation-types';
import { menuOptionCustomStyles } from '../styles/buttons';

function MoreActionsButtonCreate() {
  const navigation = useNavigation<CreateScreenProps>()
  const route = useRoute<RouteProp<RootStackParamList, 'Create'>>()

  const clipboardHandler = () => {
    copyToClipboard(route.params.noteText!)
    showMessage('Nota copiada com sucesso!')
  } 

  const sendEmailHandler = () => {
    Linking.openURL(`mailto:?subject=${route.params.noteTitle}&body=${route.params.noteText}`)
  }

  const goToFontOptionsModalHandler = () => {
    Keyboard.dismiss()
    setTimeout(() => {
      navigation.navigate('FontOptionsModal', {}) 
    }, 125)
  }

  return (
    <Menu renderer={renderers.Popover} rendererProps={{ placement: 'bottom' }}>
      <MenuTrigger customStyles={menuTriggerCustomStyles}>
        <View style={headerBarButtonStyles.headerBarButtonStyle}>
          <ThreeDotsSVG style={headerBarButtonStyles.headerBarButtonIconDimensions}/>
        </View>
      </MenuTrigger>
      <MenuOptions>
        <MenuOption customStyles={menuOptionCustomStyles} onSelect={clipboardHandler}>
          <ContextMenuOptionButton>
            Copiar nota
          </ContextMenuOptionButton>
        </MenuOption>
        <MenuOption customStyles={menuOptionCustomStyles} onSelect={sendEmailHandler}>
          <ContextMenuOptionButton>
            Enviar nota como email
          </ContextMenuOptionButton>
        </MenuOption>
        <MenuOption customStyles={menuOptionCustomStyles} onSelect={goToFontOptionsModalHandler}>
          <ContextMenuOptionButton>
            Alterar Tamanho da Fonte
          </ContextMenuOptionButton>
        </MenuOption>
      </MenuOptions>
    </Menu>
  )
}

export default MoreActionsButtonCreate