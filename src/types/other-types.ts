export type Note = {
  id: string,
  title: string,
  text: string,
  creation_datetime: string,
  last_edit_datetime: string
}

export type DeletedNote = {
  deletedNoteObj: Note,
  deletionDate: string
}