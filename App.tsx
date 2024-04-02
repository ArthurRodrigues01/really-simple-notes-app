import { JSX } from 'react';

import { MenuProvider } from 'react-native-popup-menu';

import { MMKV } from "react-native-mmkv";
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import CreateHeader from './src/components/headers/CreateHeader';
import HomeHeader from './src/components/headers/HomeHeader';
import ReadHeader from './src/components/headers/ReadHeader';
import TrashbinHeader from './src/components/headers/TrashbinHeader';
import { NOTES_KEY, TRASHBIN_NOTES_KEY } from './src/constants/constants';
import { SelectableModeProvider } from './src/hooks/selectableMode';
import Home from './src/pages/Home';
import Read from './src/pages/Read';
import Create from './src/pages/Create';
import Trashbin from './src/pages/Trashbin';
import FontOptionsModal from './src/pages/FontOptionsModal';
import { RootStackParamList } from './src/types/navigation-types';

const Stack = createNativeStackNavigator<RootStackParamList>()

export const notesStorage = new MMKV({ // Where all note objects will be stored.
  id: NOTES_KEY
})

export const trashbinStorage = new MMKV({ // Where all deleted note objects will be stored.
  id: TRASHBIN_NOTES_KEY
})

export const defaultStorage = new MMKV({ // Where other minor configuration data will be stored.
  id: 'default-storage'
})

function App(): JSX.Element {
  return (
    <MenuProvider>
      <SelectableModeProvider>
        <NavigationContainer>
          <Stack.Navigator>
            <Stack.Group screenOptions={{ animation: 'fade_from_bottom' }}>
              <Stack.Screen
                name='Home'
                component={Home}
                options={({ route }) => ({
                  header: () => <HomeHeader pageTitle={route.params ? route.params.title : 'Notas'} />
                })}
              />
              <Stack.Screen
                name='Create'
                component={Create}
                options={({ route }) => ({
                  header: () => <CreateHeader pageTitle={route.params ? route.params.title : 'Criar'} />
                })}
              />
              <Stack.Screen
                name='Trashbin'
                component={Trashbin}
                options={({ route }) => ({
                  header: () => <TrashbinHeader pageTitle={route.params ? route.params.title : 'Lixo'} />
                })}
              />
              <Stack.Screen
                name='Read'
                component={Read}
                options={({ route }) => ({
                  header: () => <ReadHeader pageTitle={route.params ? route.params.title : 'Nota'} />
                })}
              />
            </Stack.Group>
            <Stack.Group screenOptions={{ presentation: 'transparentModal', animation: 'fade' }}>
              <Stack.Screen
                name='FontOptionsModal'
                component={FontOptionsModal}
                options={{
                  headerShown: false
                }}
              />
            </Stack.Group>
          </Stack.Navigator>
        </NavigationContainer>
      </SelectableModeProvider>
    </MenuProvider>
  );
}

export default App;
