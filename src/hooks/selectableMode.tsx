import React, { createContext, useContext, useEffect, useRef, useState } from "react";

const SelectableModeContext = createContext<{
  selectedItems: string[],
  selectedItemsCount: number,
  wasSelectableModeActivatedRightNow: () => boolean,
  wasSelectableModeDeactivatedRightNow: () => boolean,
  isSelectableModeActive: () => boolean,
  isSelected: (item: string) => boolean,
  deactivateSelectableMode: () => void,
  toggleItem: (item: string) => void
}>({
  selectedItems: [],
  selectedItemsCount: 0,
  wasSelectableModeActivatedRightNow: () => false,
  wasSelectableModeDeactivatedRightNow: () => false,
  isSelectableModeActive: () => false,
  isSelected: () => false,
  deactivateSelectableMode: () => {},
  toggleItem: () => {}
})

/**
 * A hook to ease a "selectable mode" implementation. Current mode feedback is completely handled by the developer, "SelectableModeProvider" has no kind of default feedback for current selectable mode state, it already and only offers the tools for it's creation.
 * @returns An Object with methods to:
 *  - Inccur an activation/deactivation of a "selectable mode", by mutating a "selected items" array.
 *  - Check for activation/deactivation occurences.
 *  - Check for current selectable mode state(activated or deactivated).
 *  - Check if an "item" is "selected".
 *  - Toggle an "item" state.    
 */
export function useSelectableMode() {
  return useContext(SelectableModeContext)
}

export function SelectableModeProvider({ children }: { children: React.ReactElement }) {
  const isModeActive = useRef(false)
  const [selectedItems, setSelectedItems] = useState<string[]>([])

  /**
   * Checks if "selectable mode" was activaded at said instant.
   */
  function wasSelectableModeActivatedRightNow() {
    return isModeActive.current && selectedItems.length > 0
  }
  /**
   * Checks if "selectable mode" was deactivated at said instant.
   */
  function wasSelectableModeDeactivatedRightNow() {
    return !isModeActive.current && selectedItems.length == 0
  }
  /**
   * Checks if the "selectable mode" is active.
   */
  function isSelectableModeActive() {
    return isModeActive.current
  }
  /**
   * Sets the "selected items" array to an empty array, effectively deactivating the "selectable mode".  
   * */
  function deactivateSelectableMode() {
    isModeActive.current = false
    setSelectedItems([])
  }
  /**
   * Checks if and id is in the "selected items" array.
   * @param itemID Id to be checked.
   */
  function isSelected(itemID: string) {
    return selectedItems.includes(itemID)
  }
  /**
   *  Add an id to the "selected items" array. If said id was already on the array, it will ignored.
   * @param itemID Id to be added to the "selected items" array.
   */
  function selectItem(itemID: string) {
    if (!isSelected(itemID)) {
      if (selectedItems.length == 0) {
        isModeActive.current = true
      }
      setSelectedItems(selectedItems => [...selectedItems, itemID])
    }
  }
  /**
   *  Remove an id from the "selected items" array. If said id was already not on the array, it will ignored.
   * @param itemID Id to be removed from the "selected items" array.
   */
  function deselectItem(itemID: string) {
    if (isSelected(itemID)) {
      if (selectedItems.length == 1) {
        isModeActive.current = false
      }
      setSelectedItems(selectedItems => selectedItems.filter(selectedItem => selectedItem != itemID))
    }
  }
  /**
   * 
   * Toggles an id in and out of the "selected items" array.
   * @param itemID Id to be toggled.
   */
  function toggleItem(itemID: string) {
    if (isSelected(itemID)) {
      return deselectItem(itemID)
    }

    selectItem(itemID)
  } 

  return (
    <SelectableModeContext.Provider value={{
      selectedItems,
      selectedItemsCount: selectedItems.length,
      wasSelectableModeActivatedRightNow,
      wasSelectableModeDeactivatedRightNow,
      isSelectableModeActive,
      isSelected,
      deactivateSelectableMode,
      toggleItem
    }}>
      { children }
    </SelectableModeContext.Provider>
  )
}