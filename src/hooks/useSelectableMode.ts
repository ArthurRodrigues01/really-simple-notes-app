import { useState, useRef, useEffect } from "react"


function useSelectableMode() {
  const previousSelectedItems = useRef<string[]>([])
  const [selectedItems, setSelectedItems] = useState<string[]>([])

  const selectedItemsCount = selectedItems.length
  
  function isSelectableModeActive() {
    if (selectedItems.length != 0) {
      return true
    }
    return false 
  }

  function deactivateMode() {
    previousSelectedItems.current = selectedItems
    setSelectedItems([])
  }

  function isSelected(item: string) {
    return selectedItems.includes(item)
  }

  function selectItem(item: string) {
    previousSelectedItems.current = selectedItems
    setSelectedItems([...selectedItems, item])
  }

  function deselectItem(item: string) {
    previousSelectedItems.current = selectedItems
    setSelectedItems(selectedItems.filter(selectedItem => selectedItem != item))
  }

  function toggleItem(item: string) {
    if (isSelected(item)) {
      return deselectItem(item)
    }

    selectItem(item)
  } 

  return { selectedItemsCount, deactivateMode, toggleItem, isSelectableModeActive, isSelected, selectedItems}

}

export default useSelectableMode