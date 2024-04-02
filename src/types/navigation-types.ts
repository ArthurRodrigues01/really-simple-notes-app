import { NativeStackNavigationProp } from '@react-navigation/native-stack'
import { RouteProp } from '@react-navigation/native';

export type RootStackParamList = {
  Home: { title: string },
  Trashbin: { title: string },
  Create: {
    title: string,
    isNewNote?: boolean,
    noteID?: string,
    noteTitle?: string,
    noteText?: string,
    noteCreationDatetime?: string
  },
  Read: { 
    title: string
    noteID: string,
    noteTitle: string,
    noteText: string,
    noteCreationDatetime: string,
    noteLastEditDatetime: string
  },
  FontOptionsModal: {}
};

export type HomeScreenNavigationProps = NativeStackNavigationProp<RootStackParamList, 'Home'>

export type HomeScreenRouteProps = RouteProp<RootStackParamList, 'Home'>

export type TrashbinScreenNavigationProps = NativeStackNavigationProp<RootStackParamList, 'Trashbin'>

export type TrashbinScreenRouteProps = RouteProp<RootStackParamList, 'Trashbin'>

export type CreateScreenNavigationProps = NativeStackNavigationProp<RootStackParamList, 'Create'>

export type CreateScreenRouteProps = RouteProp<RootStackParamList, 'Create'>

export type ReadScreenNavigationProps = NativeStackNavigationProp<RootStackParamList, 'Read'>

export type ReadScreenRouteProps = RouteProp<RootStackParamList, 'Read'>

export type FontOptionsModalScreenNavigationProps = NativeStackNavigationProp<RootStackParamList, 'FontOptionsModal'>

export type FontOptionsModalScreenRouteProps = RouteProp<RootStackParamList, 'FontOptionsModal'>