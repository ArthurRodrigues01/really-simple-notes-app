import AsyncStorage from "@react-native-async-storage/async-storage";
import { isNote, removeArrayItem } from "./other-functions";
import { Note } from "../types/other-types";
import { NOTES_KEY, SORTING_MODE_KEY } from '../constants/constants'
import { NotNoteFileError } from "../constants/error-handlers";

export async function getNote(noteID: string): Promise<Note> {
  const notesStringObj = await AsyncStorage.getItem(NOTES_KEY)
  const savedNotes: { notes: Note[] } = notesStringObj ? JSON.parse(notesStringObj) : { notes: [] }

  const savedNote = savedNotes.notes.find(note => note.id == noteID) || { id: '', title: '', text: '', creation_datetime: '', last_edit_datetime: '' } 

  return savedNote
}

export async function getAllNotes(): Promise<Note[]> {
  const notesStringObj = await AsyncStorage.getItem(NOTES_KEY)
  const savedNotes: { notes: Note[] } = notesStringObj ? JSON.parse(notesStringObj) : { notes: [] } 
  
  return savedNotes.notes
}

export async function saveNote({ id, title, text, creation_datetime, last_edit_datetime }: Note) {
  const newNoteObj = {
    id: id,
    title: title,
    text: text,
    creation_datetime: creation_datetime,
    last_edit_datetime: last_edit_datetime
  }
  const notesStringObj = await AsyncStorage.getItem(NOTES_KEY)
  const savedNotes: { notes: Note[] } = notesStringObj ? JSON.parse(notesStringObj) : { notes: [] } 
  
  const isNewNote = savedNotes.notes.find(note => note.id == newNoteObj.id)

  !isNewNote ? savedNotes.notes.push(newNoteObj) : savedNotes.notes[savedNotes.notes.findIndex(note => note.id == isNewNote!.id)] = newNoteObj

  await AsyncStorage.setItem(NOTES_KEY, JSON.stringify(savedNotes))
}

export async function deleteNote(noteID: string) {
  const notesStringObj = await AsyncStorage.getItem(NOTES_KEY)
  const savedNotes: { notes: Note[] } = notesStringObj ? JSON.parse(notesStringObj) : { notes: [] }

  savedNotes.notes.findIndex(note => note.id == noteID) > -1 && removeArrayItem(savedNotes.notes, savedNotes.notes.findIndex(note => note.id == noteID))

  await AsyncStorage.setItem(NOTES_KEY, JSON.stringify(savedNotes))
}

export async function deleteMultiNotes(noteIDArray: string[]) {
  const notesStringObj = await AsyncStorage.getItem(NOTES_KEY)
  const savedNotes: { notes: Note[] } = notesStringObj ? JSON.parse(notesStringObj) : { notes: [] }

  const selectedNotes = savedNotes.notes.filter(note => noteIDArray.find(noteID => noteID == note.id))

  for (const selectedNote of selectedNotes) {
    await deleteNote(selectedNote.id)
  }
}

export async function importNotes(newNotes: { notes: Note[] }) {
  for (const newNote of newNotes.notes) {
    if (!isNote(newNote)) throw new NotNoteFileError()
  }
  for (const newNote of newNotes.notes) {
    await saveNote(newNote)
  }
}

export async function exportNotes() {
  const notesStringObj = await AsyncStorage.getItem(NOTES_KEY)
  const savedNotes: { notes: Note[] } = notesStringObj ? JSON.parse(notesStringObj) : { notes: [] } 

  return savedNotes
}

export async function clearNotes() {
  const savedNotes: { notes: Note[] } = { notes: [] }

  await AsyncStorage.setItem(NOTES_KEY, JSON.stringify(savedNotes))
}

export async function saveSortingMode(sortingMode: number) {
  await AsyncStorage.setItem(SORTING_MODE_KEY, `${sortingMode}`)
}

export async function getSortingMode() {
  return await AsyncStorage.getItem(SORTING_MODE_KEY) || '1'
}