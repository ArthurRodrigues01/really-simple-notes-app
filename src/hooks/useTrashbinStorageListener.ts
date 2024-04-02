import { useEffect } from "react";
import { trashbinStorage } from "../../App";

function useTrashbinStorageListener(callback: () => void) {
  useEffect(() => {
    const listener = trashbinStorage.addOnValueChangedListener(() => {
      callback()
    })

    return () => listener.remove()
  }, [])  
}

export default useTrashbinStorageListener