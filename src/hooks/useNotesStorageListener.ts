import { useEffect } from "react";
import { notesStorage } from "../../App";

function useNotesStorageListener(callback: () => void) {
  useEffect(() => {
    const listener = notesStorage.addOnValueChangedListener(() => {
      callback()
    })

    return () => listener.remove()
  }, [])  
}

export default useNotesStorageListener