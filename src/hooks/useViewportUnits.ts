import { useWindowDimensions } from "react-native"

/**
 * This hook replicates native web "vw" and "vh" units functionality.
 * @returns two function "vw" and "vh", each one of them receiving a "percentage" parameter.
 * @param percentage - percentage of the width (vw) or height (vh) in pixels of the window the app occupies.
 * @example vw(100) // return 100% of window width in pixels.
 */
function useViewportUnits() {
  const { width, height } = useWindowDimensions()

  function vw(percentage: number) {
    if (percentage > 100 || percentage < 1 || !isFinite(percentage) || isNaN(percentage)) return width

    const vwPercentageInPixels = (percentage * width) / 100
    
    return vwPercentageInPixels
  }

  function vh(percentage: number) {
    if (percentage > 100 || percentage < 1 || !isFinite(percentage) || isNaN(percentage)) return height

    const vhPercentageInPixels = (percentage * height)/  100
    
    return vhPercentageInPixels
  }

  return { vw, vh }
}

export default useViewportUnits