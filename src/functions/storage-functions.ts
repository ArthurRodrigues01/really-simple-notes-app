import { defaultStorage, notesStorage, trashbinStorage } from "../../App";

import { generateUUID, isNote, showBooleanMessage } from "./other-functions";
import { DeletedNote, Note } from "../types/other-types";
import {
  SORTING_MODE_KEY, 
  NOTE_TITLE_FONTSIZE_KEY, 
  NOTE_TEXT_FONTSIZE_KEY, 
  DEFAULT_NOTE_TITLE_FONTSIZE_IN_PIXELS, 
  DEFAULT_NOTE_TEXT_FONTSIZE_IN_PIXELS 
} from '../constants/constants'
import { NotNoteFileError } from "../constants/error-handlers";
import { CreateScreenNavigationProps, CreateScreenRouteProps } from "../types/navigation-types";
import useSortNotes from "../hooks/useSortNotes";


const defaultNote = { 
  id: '', 
  title: '', 
  text: '', 
  creation_datetime: '', 
  last_edit_datetime: '' 
}

const defaultDeletedNote = {
  deletedNoteObj: defaultNote,
  deletionDate: ''
}




export function getNote(noteID: string): Note | null {
  const noteStringObj = notesStorage.getString(noteID)
  const savedNote: Note | null = noteStringObj ? JSON.parse(noteStringObj) : null 
    

  return savedNote
}




export function getMultiNotes(noteIDArray: string[]): Note[] {
  const allNoteIDs = notesStorage.getAllKeys()
  const filteredNoteIDs = allNoteIDs.filter(noteID => noteIDArray.includes(noteID))
  
  const filteredNotes: Note[] = filteredNoteIDs.map(noteID => {
    const noteStringObj = notesStorage.getString(noteID)!
    const note: Note = JSON.parse(noteStringObj)
    
    return note
  })

  return filteredNotes
}




export function getAllNotes(): Note[] {
  const allNoteIDs = notesStorage.getAllKeys()

  const savedNotes: Note[] = allNoteIDs.map(noteKey => {
    const noteStringObj = notesStorage.getString(noteKey)!
    const savedNote: Note = JSON.parse(noteStringObj)

    return savedNote
  })
  
  return savedNotes
}




export function getTrashbinNote(trashbinNoteID: string) {
  const trashbinNoteStringObj = trashbinStorage.getString(trashbinNoteID)
  const trashbinNote: DeletedNote | null = trashbinNoteStringObj ?
   JSON.parse(trashbinNoteStringObj) : 
   null

  return trashbinNote
}




export function getMultiTrashbinNotes(trashbinNoteIDArray: string[]) {
  const allTrashbinNotes = getAllTrashbinNotes()
  const filteredTrashbinNotes = allTrashbinNotes.filter(trashbinNote => trashbinNoteIDArray.includes(trashbinNote.deletedNoteObj.id))

  return filteredTrashbinNotes
}




export function getAllTrashbinNotes(): DeletedNote[] {
  const allTrashbinNoteIDs = trashbinStorage.getAllKeys()
  
  const allTrashbinNotes = allTrashbinNoteIDs.map(noteID => {
    const trashbinNoteStringObj = trashbinStorage.getString(noteID)!
    const trashbinNote: DeletedNote = JSON.parse(trashbinNoteStringObj)

    return trashbinNote
  })

  return allTrashbinNotes
}




export function saveNote({ id, title, text, creation_datetime, last_edit_datetime }: Note) {
  const newNoteObj = {
    id: id,
    title: title,
    text: text,
    creation_datetime: creation_datetime,
    last_edit_datetime: last_edit_datetime
  } 

  notesStorage.set(newNoteObj.id, JSON.stringify(newNoteObj))
}




function addNoteToTrashbin(noteID: string) {
  const note = getNote(noteID)
  const newTrashbinNoteObj = {
    deletedNoteObj: note,
    deletionDate: new Date().toISOString()
  }

  note && trashbinStorage.set(noteID, JSON.stringify(newTrashbinNoteObj))
}




function addMultiNotesToTrashbin(noteIDArray: string[]) {
  const allNotes = getAllNotes()
  const filteredNotes = allNotes.filter(note => noteIDArray.includes(note.id))

  for (const filteredNote of filteredNotes) {
    const newTrashbinNoteObj = {
      deletedNoteObj: filteredNote,
      deletionDate: new Date().toISOString()
    }

    trashbinStorage.set(filteredNote.id, JSON.stringify(newTrashbinNoteObj))
  }
}




export function deleteNote(noteID: string) {
  addNoteToTrashbin(noteID)  
  
  notesStorage.delete(noteID)
}




export function deleteMultiNotes(noteIDArray: string[]) {
  addMultiNotesToTrashbin(noteIDArray)

  for (const noteID of noteIDArray) {
    notesStorage.delete(noteID)
  }
}




export function clearNotes() {
  addMultiNotesToTrashbin(notesStorage.getAllKeys())
  
  notesStorage.clearAll()
}




export function deleteTrashbinNote(noteID: string) {
  trashbinStorage.delete(noteID)
}




export function deleteMultiTrashbinNotes(noteIDArray: string[]) {
  for (const noteID of noteIDArray) {
    trashbinStorage.delete(noteID)
  }
}




export function clearTrashbinNotes() {
  trashbinStorage.clearAll()
}




export function restoreNote(trashbinNoteID: string) {
  const trashbinNote = getTrashbinNote(trashbinNoteID)

  if (trashbinNote) {
    saveNote(trashbinNote.deletedNoteObj)
    deleteTrashbinNote(trashbinNote.deletedNoteObj.id)
  }
}




export function restoreMultiNotes(trashbinNoteIDArray: string[]) {
  const allTrashbinNotes = getAllTrashbinNotes()

  const filteredTrashbinNotes = allTrashbinNotes.filter(trashbinNote => { 
    return trashbinNoteIDArray.includes(trashbinNote.deletedNoteObj.id)
  })

  for (const filteredTrashbinNote of filteredTrashbinNotes) {
    saveNote(filteredTrashbinNote.deletedNoteObj)
  }

  deleteMultiTrashbinNotes(filteredTrashbinNotes.map(trashbinNote => {
    return trashbinNote.deletedNoteObj.id
  }))
}




export function restoreAllNotes() {
  const allTrashbinNotes = getAllTrashbinNotes()
  
  for (const trashbinNote of allTrashbinNotes) {
    saveNote(trashbinNote.deletedNoteObj)
  }

  clearTrashbinNotes()
}




export function importNotes(importedNotes: Note[] | { notes: Note[] }) {
  if ((importedNotes as { notes: Note[] }).notes) {
    // legacy notes backup item structure:
    // { notes: Note[] }
    const newNotesLegacy = (importedNotes as { notes: Note[] }).notes

    for (const newNoteLegacy of newNotesLegacy) {
      if (!isNote(newNoteLegacy)) throw new NotNoteFileError()
    }

    trashbinStorage.clearAll()
    notesStorage.clearAll()

    for (const newNoteLegacy of newNotesLegacy) {
      saveNote(newNoteLegacy)
    }

    return
  }
  // new notes backup item structure: 
  // Note[] 
  const newNotes = importedNotes as Note[]

  for (const newNote of newNotes) {
    if (!isNote(newNote)) throw new NotNoteFileError()
  }

  trashbinStorage.clearAll()
  notesStorage.clearAll()

  for (const newNote of newNotes) {
    saveNote(newNote)
  }
}




export function saveSortingCode(sortingCode: number) {
  defaultStorage.set(SORTING_MODE_KEY, sortingCode)
}




export function getSortingCode() {
  const sortingModeRaw = defaultStorage.getNumber(SORTING_MODE_KEY)

  return sortingModeRaw !== undefined && isFinite(sortingModeRaw) ? sortingModeRaw : 1
}




export function saveNoteTitleFontsize(noteTitleFontsize: number) {
  defaultStorage.set(NOTE_TITLE_FONTSIZE_KEY, noteTitleFontsize)
}




export function getNoteTitleFontsize() {
  const noteTitleFontsizeRaw = defaultStorage.getNumber(NOTE_TITLE_FONTSIZE_KEY)

  return noteTitleFontsizeRaw || DEFAULT_NOTE_TITLE_FONTSIZE_IN_PIXELS
}




export function saveNoteTextFontsize(noteTextFontsize: number) {
  defaultStorage.set(NOTE_TEXT_FONTSIZE_KEY, noteTextFontsize)
}




export function getNoteTextFontsize() {
  const noteTextFontsizeRaw =  defaultStorage.getNumber(NOTE_TEXT_FONTSIZE_KEY)

  return noteTextFontsizeRaw || DEFAULT_NOTE_TEXT_FONTSIZE_IN_PIXELS
}




export function getSortedTrashbinNotesHandler() {
  const allTrashbinNotes = getAllTrashbinNotes()

  return [...allTrashbinNotes].sort((a,b) => {
    const dateA = new Date(a.deletionDate)
    const dateB = new Date(b.deletionDate)

    return dateB.getTime() - dateA.getTime()
  })
}




export function getSortedSavedNotesHandler() {
  const allNotes = getAllNotes()
  const sortingCode = getSortingCode()
  const {
    sortByAlphabeticalOrderByKey,
    sortByNewest,
    sortByNewestEdit,
    sortByOldest,
    sortByOldestEdit
  } = useSortNotes()

  switch(sortingCode) {
    case 0: // alphabetical
      return sortByAlphabeticalOrderByKey(allNotes, 'title')
    case 1: // newest
      return sortByNewest(allNotes)
    case 2: // oldest
      return sortByOldest(allNotes)
    case 3: // newest edits
      return sortByNewestEdit(allNotes)
    case 4: // oldest edits
      return sortByOldestEdit(allNotes)
    default: 
      return sortByNewest(allNotes)
  }
}




export function saveNoteHandler(navigation: CreateScreenNavigationProps, route: CreateScreenRouteProps) {
  const isNewNote = route.params.isNewNote
  const newDatetime = new Date().toISOString()
 
  const note = {
    id: !isNewNote ? route.params.noteID! : generateUUID(), //IMPORTANT: "!" operator used, be careful.
    title: route.params.noteTitle!, // IMPORTANT: "!" operator used, be careful.
    text: route.params.noteText!, // IMPORTANT: "!" operator used, be careful.
    creation_datetime: !isNewNote ? route.params.noteCreationDatetime! : newDatetime, // IMPORTANT: "!" operator used, be careful.
    last_edit_datetime: newDatetime
  }


  
  const messageTitle = 'Salvar nota'
  const message = `Deseja ${isNewNote ? 'criar' : 'editar'} esta nota?`
  const cbYes = () => {
    saveNote(note)
    navigation.navigate('Home', { title: 'Notas' })
  }
  const cbNo = () => navigation.navigate('Home', { title: 'Notas' })



  if (isNewNote) {
    if (note.title === '' && note.text === '') {
      return navigation.navigate('Home', { title: 'Notas' })
    } 

    showBooleanMessage(messageTitle, message, cbYes, cbNo)
  } else if (!isNewNote) {
    const savedNote = getNote(note.id)!

    if (note.title === savedNote.title && note.text === savedNote.text) {
      return navigation.navigate('Home', { title: 'Notas' })
    } 
    
    showBooleanMessage(messageTitle, message, cbYes, cbNo)
  }
}