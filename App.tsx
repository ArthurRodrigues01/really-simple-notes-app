import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import { RootStackParamList } from './src/types/navigation-types';
import { MenuProvider } from 'react-native-popup-menu';
import { HEADER_BACKGROUND_COLOR } from './src/constants/constants'
import {JSX} from 'react';

import Home from './src/pages/Home';
import Create from './src/pages/Create';

import HeaderRightCreate from './src/components/HeaderRightCreate';
import HeaderRightHome from './src/components/HeaderRightHome';
import HeaderLeftCreate from './src/components/HeaderLeftCreate';
import FontOptionsModal from './src/pages/FontOptionsModal';

const Stack = createNativeStackNavigator<RootStackParamList>()

function App(): JSX.Element {
  return (
    <MenuProvider>
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Group>
            <Stack.Screen
              name='Home'
              component={Home}
              options={({ route }) => ({
                headerTitle: route.params ? route.params.title : 'Notas',
                headerStyle: { backgroundColor: HEADER_BACKGROUND_COLOR },
                headerTitleStyle: { color: '#ffffff', fontSize: 24, fontWeight: 'bold' },
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
          </Stack.Group>
          <Stack.Group screenOptions={{ presentation: 'containedTransparentModal', animation: 'fade' }}>
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
    </MenuProvider>
  );
}

export default App;
