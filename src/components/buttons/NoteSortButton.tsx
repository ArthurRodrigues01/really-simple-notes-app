import { useState } from 'react';

import { View } from 'react-native';
import { Menu, MenuOption, MenuOptions, MenuTrigger, renderers } from "react-native-popup-menu";

import { useNavigation } from '@react-navigation/native';

import SortSVG from '../../assets/Sort'
import ContextMenuOptionTitle from '../ContextMenuOptionTitle';
import { getSortingCode, saveSortingCode } from '../../functions/storage-functions';
import { menuOptionCustomStyles } from '../../styles/buttons';
import { headerBarButtonStyles, menuTriggerCustomStyles } from '../../styles/headerBarButtons';
import { HomeScreenNavigationProps } from '../../types/navigation-types';


function NoteSortButton() {
  const navigation = useNavigation<HomeScreenNavigationProps>()
  const sortingCode = getSortingCode()


  return (
    <Menu renderer={renderers.Popover} rendererProps={{ placement: 'bottom' }}>
      <MenuTrigger customStyles={menuTriggerCustomStyles}>
        <View style={headerBarButtonStyles.headerBarButtonStyle}>
          <SortSVG style={headerBarButtonStyles.headerBarButtonIconDimensions}/>
        </View>
      </MenuTrigger>
      <MenuOptions>
        <MenuOption customStyles={menuOptionCustomStyles} onSelect={() => saveSortingCodeHandler(0)}>
          <ContextMenuOptionTitle selected={sortingCode == 0}>
            Alfabética (Título)
          </ContextMenuOptionTitle>
        </MenuOption>
        <MenuOption customStyles={menuOptionCustomStyles} onSelect={() => saveSortingCodeHandler(1)}>
          <ContextMenuOptionTitle selected={sortingCode == 1}>
            Criação (Mais novo)
          </ContextMenuOptionTitle>
        </MenuOption>
        <MenuOption customStyles={menuOptionCustomStyles} onSelect={() => saveSortingCodeHandler(2)}>
          <ContextMenuOptionTitle selected={sortingCode == 2}>
            Criação (Mais antigo)
          </ContextMenuOptionTitle>
        </MenuOption>
        <MenuOption customStyles={menuOptionCustomStyles} onSelect={() => saveSortingCodeHandler(3)}>
          <ContextMenuOptionTitle selected={sortingCode == 3}>
            Edição (Mais novo)
          </ContextMenuOptionTitle>
        </MenuOption>
        <MenuOption customStyles={menuOptionCustomStyles} onSelect={() => saveSortingCodeHandler(4)}>
          <ContextMenuOptionTitle selected={sortingCode == 4}>
            Edição (Mais antigo) 
          </ContextMenuOptionTitle>
        </MenuOption>
      </MenuOptions>
    </Menu>
  )

  function saveSortingCodeHandler(sortingCode: number) {
    saveSortingCode(sortingCode)
    navigation.replace('Home', { title: 'Notas' })
  }
}

export default NoteSortButton