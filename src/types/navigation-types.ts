import { NativeStackNavigationProp } from '@react-navigation/native-stack'

export type RootStackParamList = {
  Home: { title: string};
  Create: {
    title: string,
    isNewNote?: boolean,
    noteID?: string,
    noteTitle?: string,
    noteText?: string,
    noteCreationDatetime?: string
  };
};

export type HomeScreenProps = NativeStackNavigationProp<RootStackParamList, 'Home'>

export type CreateScreenProps = NativeStackNavigationProp<RootStackParamList, 'Create'>