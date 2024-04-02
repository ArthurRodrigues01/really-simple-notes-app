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
          d="M224.9,198.1c36.9-52.4,24.2-126.4-28.4-165.1C143.9-5.6,71.2,5.5,34.3,57.9l17.3,12.8c30.1-42.8,89.7-51.9,132.7-20.3c43,31.6,53.4,92.2,23.2,135.1c-30.2,42.8-89.7,51.9-132.7,20.3l-12.2,17.3C115.3,261.6,188,250.5,224.9,198.1z"
        />
        <Path
          fill="#fff"
          d="M17.3,100.6l62-13.3L10,36.3L17.3,100.6L17.3,100.6z"
        />
      </G>
    </G>
  </Svg>
);
export default SVGComponent;
