# Versions

## - 1.0 (first-release)

## - 1.1

### Features

- added customizable font-size for both note text and title (wherever they appear), user may alter the font-size at new modal screen: "FontOptionsModal"

### Styles

None

### Major Changes

- removed module "react-native-gesture-handler".
- added hook "useViewportUnits"
- added new modal screen "FontOptionsModal"

### Minor changes: 
- all "TouchableNativeFeedback" component instances were migrated to its "Pressable" component equivalent.
- fixed hook "useHardwareButton": deps array was properly adressed to the hook's internal useEffect parameters.