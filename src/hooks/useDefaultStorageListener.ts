import { useEffect } from "react";
import { defaultStorage } from "../../App";

function useDefaultStorageListener(callback: () => void) {
  useEffect(() => {
    const listener = defaultStorage.addOnValueChangedListener(() => {
      callback()
    })

    return () => listener.remove()
  }, [])  
}

export default useDefaultStorageListener