# Versions

## 1.0 (initial-release)

## 1.1

### Features

- **Added** customizable font-size for both note text and title (wherever they appear), user may alter the font-size at new modal screen: "FontOptionsModal"

### Major changes

- **Removed** module "react-native-gesture-handler".
- **Added** new hook "useViewportUnits"
- **Added** new modal screen "FontOptionsModal"

### Minor changes 
- All "TouchableNativeFeedback" component instances were migrated to its "Pressable" component equivalent.
- **Fixed** hook "useHardwareButton": deps array was properly adressed to the hook's internal useEffect parameters.

## 1.2

### Features

- **Added** a "Selectable mode": selectable mode is activated on a onLongPress event of a "NotePreview" component, and after its been activated, the onPress event of a "NotePreview" component now toggle the component selected state.

### Major changes

- **Modified** import notes action: it will now effectively overwrite existing notes array with new notes array. 
- **Added** provider "SelectableModeProvider"
- **Added** hook "useSelectableMode"
- **Fixed** error checking functions in "error-handlers"

### Minor changes

- Several good coding practices implementations, most notable one: avoiding unnecessary code repetition.

## 1.2.1

### Features

None

### Major changes

- **Fixed** FontOptionsModal screen; Unexpected behavior: setting saved font-sizes again and again every time "titleFontsize" got updated, effectively impeding user from altering title font-size.

### Minor changes

- **Fixed** bad "selectable mode" handling: user was able to go to note creation screen even if "selectable mode" was active.

## 1.3

### Features

- **Added** "Trash bin" for deleted notes: notes who have been deleted, will now be stored in the "trash bin". Notes in the "trash bin" once deleted are lost for good.

### Major changes

- Migrated from "AsyncStorage" to "react-native-mmkv" for storaging data on the app.
- **Added** new app icon: new original adaptive icon.
- **Added** new screen "Read"
- **Added** new screen "Trashbin"
- **Modified** "useSortNotes": functions "sortByOldestEdit" and "sortByNewestEdit" unexpected behavior due to "last_edit_datetime" being equal to "creation_datetime" for new notes, was fixed, now edited notes will be sorted separately and placed before other sorted non-edited notes in the return array for both these functions.
- **Added** new module: "react-native-mmkv"
- **Removed** module: "@react-native-async-storage/async-storage"
- **Added** new hook: "useDefaultStorageListener"
- **Added** new hook: "useNotesStorageListener"
- **Added** new hook: "useTrashbinStorageListener"

### Minor changes
- **Added** "styles" file to main components folders: will help keeping track of specific component styles 

- Several good coding practices implementations.