import SortSVG from '../assets/Sort'
import { Menu, MenuTrigger, MenuOptions, MenuOption, renderers } from "react-native-popup-menu";
import { headerBarButtonStyles, menuTriggerCustomStyles } from '../styles/headerBarButtons';
import { View } from 'react-native';
import ContextMenuOptionButton from './ContextMenuOptionButton';
import { useNavigation } from '@react-navigation/native';
import { HomeScreenProps } from '../types/navigation-types';
import { getSortingMode, saveSortingMode } from '../functions/storage-functions';
import { useEffect, useState } from 'react';
import { menuOptionCustomStyles } from '../styles/buttons';

function NoteSortButton() {
  const navigation = useNavigation<HomeScreenProps>()
  let [sortingMode, setSortingMode] = useState(1)

  useEffect(() => {
    getSortingMode().then(sortCode => setSortingMode(Number(sortCode) > 4 || Number(sortCode) < 0 ? 1 : Number(sortCode)))
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
          <ContextMenuOptionButton selected={sortingMode == 0}>
            Alfabética (Título)
          </ContextMenuOptionButton>
        </MenuOption>
        <MenuOption customStyles={menuOptionCustomStyles} onSelect={() => saveSortingMode(1).then(res => navigation.replace('Home', { title: 'Notas' }))}>
          <ContextMenuOptionButton selected={sortingMode == 1}>
            Criação (Mais novo)
          </ContextMenuOptionButton>
        </MenuOption>
        <MenuOption customStyles={menuOptionCustomStyles} onSelect={() => saveSortingMode(2).then(res => navigation.replace('Home', { title: 'Notas' }))}>
          <ContextMenuOptionButton selected={sortingMode == 2}>
            Criação (Mais antigo)
          </ContextMenuOptionButton>
        </MenuOption>
        <MenuOption customStyles={menuOptionCustomStyles} onSelect={() => saveSortingMode(3).then(res => navigation.replace('Home', { title: 'Notas' }))}>
          <ContextMenuOptionButton selected={sortingMode == 3}>
            Modificação (Mais novo)
          </ContextMenuOptionButton>
        </MenuOption>
        <MenuOption customStyles={menuOptionCustomStyles} onSelect={() => saveSortingMode(4).then(res => navigation.replace('Home', { title: 'Notas' }))}>
          <ContextMenuOptionButton selected={sortingMode == 4}>
            Modificação (Mais antigo) 
          </ContextMenuOptionButton>
        </MenuOption>
      </MenuOptions>
    </Menu>
  )
}

export default NoteSortButton