import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import { RootStackParamList } from './src/types/navigation-types';
import { MenuProvider } from 'react-native-popup-menu';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { HEADER_BACKGROUND_COLOR } from './src/constants/constants'
import {JSX} from 'react';

import Home from './src/pages/Home';
import Create from './src/pages/Create';

import HeaderRightCreate from './src/components/HeaderRightCreate';
import HeaderRightHome from './src/components/HeaderRightHome';
import HeaderLeftCreate from './src/components/HeaderLeftCreate';
import HeaderLeftHome from './src/components/HeaderLeftHome'

const Stack = createNativeStackNavigator<RootStackParamList>()

function App(): JSX.Element {
  return (
    <GestureHandlerRootView style={{flex: 1}}>
      <MenuProvider>
        <NavigationContainer>
          <Stack.Navigator>
            <Stack.Screen
              name='Home'
              component={Home}
              options={({ route }) => ({
                headerTitle: () => <HeaderLeftHome>{route.params ? route.params.title : 'Notas'}</HeaderLeftHome>,
                headerStyle: { backgroundColor: HEADER_BACKGROUND_COLOR },
                headerRight: () => <HeaderRightHome/>,
              })}
            />
            <Stack.Screen
              name='Create'
              component={Create}
              options={({ route }) => ({
                headerTitle: () => <HeaderLeftCreate>{route.params ? route.params.title : 'Criar'}</HeaderLeftCreate>,
                headerStyle: { backgroundColor: HEADER_BACKGROUND_COLOR},
                headerRight: () => <HeaderRightCreate/>,
                headerBackVisible: false
              })}
            />
          </Stack.Navigator>
        </NavigationContainer>
      </MenuProvider>
    </GestureHandlerRootView>
  );
}

export default App;
