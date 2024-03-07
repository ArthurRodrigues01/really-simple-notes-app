import { useEffect, DependencyList } from "react";
import { BackHandler } from "react-native";

function useHardwareBackButton(callback: () => void, deps: DependencyList) {
  
  useEffect(() => {
    const backButtonPressHandler = () => {
      callback()
      return true
    }
    const backHandler = BackHandler.addEventListener('hardwareBackPress', backButtonPressHandler)
  
    return () => backHandler.remove()
  }, [deps])
}

export default useHardwareBackButton