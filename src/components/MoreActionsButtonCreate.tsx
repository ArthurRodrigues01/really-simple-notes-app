import ThreeDotsSVG from '../assets/ThreeDots'
import { copyToClipboard, showMessage } from '../functions/other-functions';
import { Menu, MenuTrigger, MenuOptions, MenuOption, renderers } from "react-native-popup-menu";
import { headerBarButtonStyles, menuTriggerCustomStyles } from '../styles/headerBarButtons';
import { View, Linking } from 'react-native';
import ContextMenuOptionButton from './ContextMenuOptionButton';
import { RouteProp, useRoute } from '@react-navigation/native';
import { RootStackParamList } from '../types/navigation-types';

function MoreActionsButtonCreate() {
  const route = useRoute<RouteProp<RootStackParamList, 'Create'>>()

  const clipboardHandler = () => {
    copyToClipboard(route.params.noteText!)
    showMessage('Nota copiada com sucesso!')
  } 

  const sendEmailHandler = () => {
    Linking.openURL(`mailto:?subject=${route.params.noteTitle}&body=${route.params.noteText}`)
  }

  return (
    <Menu renderer={renderers.Popover} rendererProps={{ placement: 'bottom' }}>
      <MenuTrigger customStyles={menuTriggerCustomStyles}>
        <View style={headerBarButtonStyles.headerBarButtonStyle}>
          <ThreeDotsSVG style={headerBarButtonStyles.headerBarButtonIconDimensions}/>
        </View>
      </MenuTrigger>
      <MenuOptions>
        <MenuOption onSelect={clipboardHandler}>
          <ContextMenuOptionButton>
            Copiar nota
          </ContextMenuOptionButton>
        </MenuOption>
        <MenuOption onSelect={sendEmailHandler}>
          <ContextMenuOptionButton>
            Enviar nota como email
          </ContextMenuOptionButton>
        </MenuOption>
      </MenuOptions>
    </Menu>
  )
}

export default MoreActionsButtonCreate