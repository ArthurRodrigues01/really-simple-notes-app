import AsyncStorage from "@react-native-async-storage/async-storage";
import { generateUUID, isNote, showBooleanMessage } from "./other-functions";
import { Note } from "../types/other-types";
import { NOTES_KEY, SORTING_MODE_KEY, NOTE_TITLE_FONTSIZE_KEY, NOTE_TEXT_FONTSIZE_KEY, DEFAULT_NOTE_TITLE_FONTSIZE_IN_PIXELS, DEFAULT_NOTE_TEXT_FONTSIZE_IN_PIXELS } from '../constants/constants'
import { NotNoteFileError } from "../constants/error-handlers";
import { CreateScreenProps, RootStackParamList } from "../types/navigation-types";
import { RouteProp } from "@react-navigation/native";

export async function getNote(noteID: string): Promise<Note> {
  const savedNotes = await getAllNotes()

  const savedNote = savedNotes.find(note => note.id == noteID) || { id: '', title: '', text: '', creation_datetime: '', last_edit_datetime: '' } 

  return savedNote
}

export async function getAllNotes(): Promise<Note[]> {
  const notesStringObj = await AsyncStorage.getItem(NOTES_KEY)
  const savedNotes: Note[] = notesStringObj ? JSON.parse(notesStringObj) : [] 
  
  return savedNotes
}

export async function saveNote({ id, title, text, creation_datetime, last_edit_datetime }: Note) {
  const newNoteObj = {
    id: id,
    title: title,
    text: text,
    creation_datetime: creation_datetime,
    last_edit_datetime: last_edit_datetime
  }
  const savedNotes: Note[] = await getAllNotes() 
  const updatedNotes = [...savedNotes.filter(note => note.id != newNoteObj.id), newNoteObj]

  await AsyncStorage.setItem(NOTES_KEY, JSON.stringify(updatedNotes))
}

export async function deleteNote(noteID: string) {
  const savedNotes = await getAllNotes()
  const updatedNotes = savedNotes.filter(savedNote => savedNote.id != noteID)

  await AsyncStorage.setItem(NOTES_KEY, JSON.stringify(updatedNotes))
}

export async function deleteMultiNotes(noteIDArray: string[]) {
  const savedNotes = await getAllNotes()
  const updatedNotes = savedNotes.filter(savedNote => !noteIDArray.includes(savedNote.id))

  AsyncStorage.setItem(NOTES_KEY, JSON.stringify(updatedNotes))
}

export async function importNotes(newNotes: Note[] | { notes: Note[] }) {
  if ((newNotes as { notes: Note[] }).notes) {
    /**
     *  legacy notes backup item structure:
     *  { notes: Note[] }
     * 
     *  new notes backup item structure: 
     *  Note[]
     *  */ 

    for (const newNote of (newNotes as { notes: Note[] }).notes) {
      if (!isNote(newNote)) throw new NotNoteFileError()
    }

    return await AsyncStorage.setItem(NOTES_KEY, JSON.stringify((newNotes as { notes: Note[] }).notes))
  }

  for (const newNote of (newNotes as Note[])) {
    if (!isNote(newNote)) throw new NotNoteFileError()
  }

  await AsyncStorage.setItem(NOTES_KEY, JSON.stringify(newNotes))
}

export async function clearNotes() {
  await AsyncStorage.setItem(NOTES_KEY, JSON.stringify([]))
}

export async function saveSortingMode(sortingMode: number) {
  await AsyncStorage.setItem(SORTING_MODE_KEY, `${sortingMode}`)
}

export async function getSortingMode() {
  const sortingModeRaw = await AsyncStorage.getItem(SORTING_MODE_KEY)
  
  return sortingModeRaw ? Number(sortingModeRaw) : 1
}

export async function saveNoteTitleFontsize(noteTitleFontsize: number) {
  await AsyncStorage.setItem(NOTE_TITLE_FONTSIZE_KEY, `${noteTitleFontsize}`)
}

export async function getNoteTitleFontsize() {
  const noteTitleFontsizeRaw = await AsyncStorage.getItem(NOTE_TITLE_FONTSIZE_KEY)

  return noteTitleFontsizeRaw ? Number(noteTitleFontsizeRaw) : DEFAULT_NOTE_TITLE_FONTSIZE_IN_PIXELS
}

export async function saveNoteTextFontsize(noteTextFontsize: number) {
  await AsyncStorage.setItem(NOTE_TEXT_FONTSIZE_KEY, `${noteTextFontsize}`)
}

export async function getNoteTextFontsize() {
  const noteTextFontsizeRaw =  await AsyncStorage.getItem(NOTE_TEXT_FONTSIZE_KEY)

  return noteTextFontsizeRaw ? Number(noteTextFontsizeRaw) : DEFAULT_NOTE_TEXT_FONTSIZE_IN_PIXELS
}

export function saveNoteHandler(navigation: CreateScreenProps, route: RouteProp<RootStackParamList, "Create">) {
  const isNewNote = route.params.isNewNote
  const newDatetime = new Date().toISOString()

  const note = {
    id: !isNewNote ? route.params.noteID! : generateUUID(), // IMPORTANT: "!" operator used, be careful.
    title: route.params.noteTitle!, // IMPORTANT: "!" operator used, be careful.
    text: route.params.noteText!, // IMPORTANT: "!" operator used, be careful.
    creation_datetime: !isNewNote ? route.params.noteCreationDatetime! : newDatetime, // IMPORTANT: "!" operator used, be careful.
    last_edit_datetime: newDatetime
  }

  const messageTitle = 'Salvar nota'
  const message = `Deseja ${isNewNote ? 'criar' : 'editar'} esta nota?`
  const cbYes = () => saveNote(note).then(res => navigation.navigate('Home', { title: 'Notas' }))
  const cbNo = () => navigation.navigate('Home', { title: 'Notas' })

  if (isNewNote) {
    if (note.title == '' && note.text == '') {
      navigation.navigate('Home', { title: 'Notas' })
    } else {
      showBooleanMessage(messageTitle, message, cbYes, cbNo)
    }
  } else if (!isNewNote) {
    getNote(note.id).then(savedNote => {
      if (note.title == savedNote.title && note.text == savedNote.text) {
        return navigation.navigate('Home', { title: 'Notas' })
      } 
      
      showBooleanMessage(messageTitle, message, cbYes, cbNo)
    })
  }
}