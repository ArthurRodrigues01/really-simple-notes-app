import SortSVG from '../assets/Sort'
import { Menu, MenuTrigger, MenuOptions, MenuOption, renderers } from "react-native-popup-menu";
import { headerBarButtonStyles, menuTriggerCustomStyles } from '../styles/headerBarButtons';
import { View } from 'react-native';
import ContextMenuOptionTitle from './ContextMenuOptionTitle';
import { useNavigation } from '@react-navigation/native';
import { HomeScreenProps } from '../types/navigation-types';
import { getSortingMode, saveSortingMode } from '../functions/storage-functions';
import { useEffect, useState } from 'react';
import { menuOptionCustomStyles } from '../styles/buttons';

function NoteSortButton() {
  const navigation = useNavigation<HomeScreenProps>()
  let [sortingMode, setSortingMode] = useState(1)

  useEffect(() => {
    getSortingMode().then(sortCode => setSortingMode(sortCode))
  }, [])

  return (
    <Menu renderer={renderers.Popover} rendererProps={{ placement: 'bottom' }}>
      <MenuTrigger customStyles={menuTriggerCustomStyles}>
        <View style={headerBarButtonStyles.headerBarButtonStyle}>
          <SortSVG style={headerBarButtonStyles.headerBarButtonIconDimensions}/>
        </View>
      </MenuTrigger>
      <MenuOptions>
        <MenuOption customStyles={menuOptionCustomStyles} onSelect={() => saveSortingMode(0).then(res => navigation.replace('Home', { title: 'Notas' }))}>
          <ContextMenuOptionTitle selected={sortingMode == 0}>
            Alfabética (Título)
          </ContextMenuOptionTitle>
        </MenuOption>
        <MenuOption customStyles={menuOptionCustomStyles} onSelect={() => saveSortingMode(1).then(res => navigation.replace('Home', { title: 'Notas' }))}>
          <ContextMenuOptionTitle selected={sortingMode == 1}>
            Criação (Mais novo)
          </ContextMenuOptionTitle>
        </MenuOption>
        <MenuOption customStyles={menuOptionCustomStyles} onSelect={() => saveSortingMode(2).then(res => navigation.replace('Home', { title: 'Notas' }))}>
          <ContextMenuOptionTitle selected={sortingMode == 2}>
            Criação (Mais antigo)
          </ContextMenuOptionTitle>
        </MenuOption>
        <MenuOption customStyles={menuOptionCustomStyles} onSelect={() => saveSortingMode(3).then(res => navigation.replace('Home', { title: 'Notas' }))}>
          <ContextMenuOptionTitle selected={sortingMode == 3}>
            Modificação (Mais novo)
          </ContextMenuOptionTitle>
        </MenuOption>
        <MenuOption customStyles={menuOptionCustomStyles} onSelect={() => saveSortingMode(4).then(res => navigation.replace('Home', { title: 'Notas' }))}>
          <ContextMenuOptionTitle selected={sortingMode == 4}>
            Modificação (Mais antigo) 
          </ContextMenuOptionTitle>
        </MenuOption>
      </MenuOptions>
    </Menu>
  )
}

export default NoteSortButton