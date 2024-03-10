import { NativeStackNavigationProp } from '@react-navigation/native-stack'

export type RootStackParamList = {
  Home: { title: string},
  Create: {
    title: string,
    isNewNote?: boolean,
    noteID?: string,
    noteTitle?: string,
    noteText?: string,
    noteCreationDatetime?: string
  },
  FontOptionsModal: {}
};

export type HomeScreenProps = NativeStackNavigationProp<RootStackParamList, 'Home'>

export type CreateScreenProps = NativeStackNavigationProp<RootStackParamList, 'Create'>

export type FontOptionsModalScreenProps = NativeStackNavigationProp<RootStackParamList, 'FontOptionsModal'>