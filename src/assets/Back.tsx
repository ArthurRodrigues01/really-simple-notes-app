import * as React from "react";
import Svg, { G, Path, SvgProps } from "react-native-svg";
/* SVGR has dropped some elements not supported by react-native-svg: metadata */
const SVGComponent = (props: SvgProps) => (
  <Svg
    x="0px"
    y="0px"
    viewBox="0 0 256 256"
    {...props}
  >
    <G>
      <G>
        <G>
          <Path
            fill="#ffffff"
            d="M55.4,74.7C30.5,96.2,10,114,10,114.2s20.3,17.9,45.3,39.4l45.4,39.1l0.1-25.1l0.1-25.1h9.4c41.9,0,74.5,7.6,96.6,22.6c17.2,11.6,29.4,27.8,36.8,48.9l2.2,6.4v-3.1c0.1-7.1-1.4-20.1-3.3-29.3c-8.1-39.8-33.7-70.6-73-88C151,91.7,128,86.3,107.8,85.3l-6.7-0.3l-0.2-24.6l-0.2-24.7L55.4,74.7z"
          />
        </G>
      </G>
    </G>
  </Svg>
);
export default SVGComponent;
