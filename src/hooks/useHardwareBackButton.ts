import { useEffect, DependencyList } from "react";
import { BackHandler } from "react-native";

/**
 * Will overwrite default hardware back button action, with whatever is passed down to it's callback parameter.
 * When multiple instances are defined at the same component function scope, last instance to be updated will take the effect.
 */
function useHardwareBackButton(callback: () => void, deps: DependencyList) {
  
  useEffect(() => {
    const backButtonPressHandler = () => {
      callback()
      return true
    }
    const backHandler = BackHandler.addEventListener('hardwareBackPress', backButtonPressHandler)
  
    return () => backHandler.remove()
  }, deps)
}

export default useHardwareBackButton