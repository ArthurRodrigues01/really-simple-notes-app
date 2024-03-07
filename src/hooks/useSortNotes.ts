import { Note } from "../types/other-types"

function useSortNotes() {
  /**
   * @description Sorts an array of objects (objArray) based on alphabetical order of an specified property (propertyKey).
   * It is imperative that all instances of the array have said property and that all of them are of type string 
   * or else the function will simply return a hollow array.
   * This function mutates the array and returns a reference to the same a array. 
   * 
   * @param objArray An array of Objects.
   * @param propertyKey The property key to be used as reference for sorting.
   */   
  function sortByAlphabeticalOrderByKey(objArray: Note[], propertyKey: string) {
    for (const item of objArray) {      
      if (!item.hasOwnProperty(propertyKey) || typeof item[propertyKey as keyof Note] !== 'string') return []
    }

    return objArray.sort((a,b) => {
      let textA = a[propertyKey as keyof Note].toUpperCase()
      let textB = b[propertyKey as keyof Note].toUpperCase()
      return textA.localeCompare(textB)
    })

  }

  function sortByOldestEdit(objArray: Note[]) {
    return objArray.sort((a, b) => {
      let dateA = new Date(a.last_edit_datetime)
      let dateB = new Date(b.last_edit_datetime)

      return dateA.getTime() - dateB.getTime()
    })
  }

  function sortByNewestEdit(objArray: Note[]) {
    return objArray.sort((a, b) => {
      let dateA = new Date(a.last_edit_datetime)
      let dateB = new Date(b.last_edit_datetime)

      return dateB.getTime() - dateA.getTime()
    })
  }

  function sortByOldest(objArray: Note[]) {
    return objArray.sort((a, b) => {
      let dateA = new Date(a.creation_datetime)
      let dateB = new Date(b.creation_datetime)

      return dateA.getTime() - dateB.getTime()
    })
  }

  function sortByNewest(objArray: Note[]) {
    return objArray.sort((a, b) => {
      let dateA = new Date(a.creation_datetime)
      let dateB = new Date(b.creation_datetime)

      return dateB.getTime() - dateA.getTime()
    })
  }

  

  return { sortByAlphabeticalOrderByKey, sortByOldestEdit, sortByNewestEdit, sortByOldest, sortByNewest }
}

export default useSortNotes