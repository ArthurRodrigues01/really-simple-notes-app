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
        <Path
          fill="#fff"
          d="M128,99.7c-15.7,0-28.3,12.7-28.3,28.3c0,15.6,12.7,28.3,28.3,28.3c15.7,0,28.3-12.7,28.3-28.3C156.3,112.3,143.6,99.7,128,99.7z M128,66.6c15.7,0,28.3-12.7,28.3-28.3S143.6,10,128,10c-15.7,0-28.3,12.7-28.3,28.3S112.3,66.6,128,66.6z M128,189.4c-15.7,0-28.3,12.7-28.3,28.3S112.3,246,128,246s28.3-12.7,28.3-28.3S143.6,189.4,128,189.4z"
        />
      </G>
    </G>
  </Svg>
);
export default SVGComponent;
