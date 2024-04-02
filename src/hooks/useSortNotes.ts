import { Note } from "../types/other-types"

function useSortNotes() {
  /**
   * Sorts an array of objects (objArray) based on alphabetical order of an specified property (propertyKey).
   * It is imperative that all instances of the array have said property and that all of them are of type string 
   * or else the function will simply return a hollow array. 
   * 
   * @param objArray An array of Objects.
   * @param propertyKey The property key to be used as reference for sorting.
   */   
  function sortByAlphabeticalOrderByKey(objArray: Note[], propertyKey: string) {
    for (const item of objArray) {      
      if (!item.hasOwnProperty(propertyKey) || typeof item[propertyKey as keyof Note] !== 'string') return []
    }

    return [...objArray].sort((a,b) => {
      const textA = a[propertyKey as keyof Note].toUpperCase()
      const textB = b[propertyKey as keyof Note].toUpperCase()
      return textA.localeCompare(textB)
    })

  }
  
  function sortByOldestEdit(objArray: Note[]) {
    const editedNotes = objArray.filter(note => note.creation_datetime != note.last_edit_datetime)
    const uneditedNotes = objArray.filter(note => note.creation_datetime == note.last_edit_datetime)
    
    const sortedEditedNotes = [...editedNotes].sort((a, b) => {
      const dateA = new Date(a.last_edit_datetime)
      const dateB = new Date(b.last_edit_datetime)

      return dateA.getTime() - dateB.getTime()
    })
    const sortedUneditedNotes = [...uneditedNotes].sort((a, b) => {
      const dateA = new Date(a.last_edit_datetime)
      const dateB = new Date(b.last_edit_datetime)

      return dateA.getTime() - dateB.getTime()
    })

    let sortedNotes = [...sortedEditedNotes]
    sortedNotes.push(...sortedUneditedNotes)

    return sortedNotes
  }

  function sortByNewestEdit(objArray: Note[]) {
    const editedNotes = objArray.filter(note => note.creation_datetime != note.last_edit_datetime)
    const uneditedNotes = objArray.filter(note => note.creation_datetime == note.last_edit_datetime)
    
    const sortedEditedNotes = [...editedNotes].sort((a, b) => {
      const dateA = new Date(a.last_edit_datetime)
      const dateB = new Date(b.last_edit_datetime)

      return dateB.getTime() - dateA.getTime()
    })
    const sortedUneditedNotes = [...uneditedNotes].sort((a, b) => {
      const dateA = new Date(a.last_edit_datetime)
      const dateB = new Date(b.last_edit_datetime)

      return dateA.getTime() - dateB.getTime()
    })
    
    let sortedNotes = [...sortedEditedNotes]
    sortedNotes.push(...sortedUneditedNotes)

    return sortedNotes
  }

  function sortByOldest(objArray: Note[]) {
    return [...objArray].sort((a, b) => {
      const dateA = new Date(a.creation_datetime)
      const dateB = new Date(b.creation_datetime)

      return dateA.getTime() - dateB.getTime()
    })
  }

  function sortByNewest(objArray: Note[]) {
    return [...objArray].sort((a, b) => {
      const dateA = new Date(a.creation_datetime)
      const dateB = new Date(b.creation_datetime)

      return dateB.getTime() - dateA.getTime()
    })
  }

  

  return { sortByAlphabeticalOrderByKey, sortByOldestEdit, sortByNewestEdit, sortByOldest, sortByNewest }
}

export default useSortNotes