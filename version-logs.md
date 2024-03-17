# Versions

## 1.0 (first-release)

## 1.1

### Features

- **Added** customizable font-size for both note text and title (wherever they appear), user may alter the font-size at new modal screen: "FontOptionsModal"

### Major changes

- **Removed** module "react-native-gesture-handler".
- **Added** hook "useViewportUnits"
- **Added** new modal screen "FontOptionsModal"

### Minor changes 
- All "TouchableNativeFeedback" component instances were migrated to its "Pressable" component equivalent.
- **Fixed** hook "useHardwareButton": deps array was properly adressed to the hook's internal useEffect parameters.

## 1.2

### Features

- **Added** a "Selectable mode": selectable mode is activated whenever the "selectedItems" array in the "SelectableModeProvider" component length property changes from 0 to any value above 0.

### Major changes

- **Added** provider "SelectableModeProvider"
- **Added** hook "useSelectableMode"
- **Fixed** error checking functions in "error-handlers"

### Minor changes

- Several good coding practices implementations, most notable one: avoiding unnecessary code repetition.