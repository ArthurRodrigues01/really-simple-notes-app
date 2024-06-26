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
            fill="#fff"
            d="M182.9,10.8c-3.8,1.3-6.2,3.5-20.2,17.5l-13.1,13.1l32.5,32.5l32.5,32.5l13.7-13.8c7.6-7.6,14.3-14.8,15-16c4-7,3.5-16-1.2-22.4c-1-1.2-10.5-11.1-21.3-21.8C198,9.8,198.7,10.3,190.2,10.1C186.5,9.9,184.8,10.1,182.9,10.8z"
          />
          <Path
            fill="#fff"
            d="M74.6,116.3L10,181v32.5V246h32.6h32.5l64.6-64.9l64.6-64.9L172,83.9c-17.8-17.8-32.3-32.2-32.5-32.2S110.2,80.7,74.6,116.3z M147.2,78.7c0.7,0.8,0.8,2.9,0.3,4.4c-0.4,1.3-86.4,86.6-87.3,86.6c-2.7,0-4.5-2.3-3.6-4.7c0.3-0.7,18.9-19.6,43.5-44.1c41.1-40.8,43.2-42.8,44.8-42.8C145.8,78.1,146.9,78.3,147.2,78.7z M62.4,193.6l18.1,18.1l-6.8,7.1l-6.8,7.1h-8.6h-8.6V216v-9.8H39.7H29.7v-8.3v-8.3l7.1-7.1c3.9-3.9,7.2-7.1,7.3-7.1C44.2,175.4,52.5,183.6,62.4,193.6z"
          />
        </G>
      </G>
    </G>
  </Svg>
);
export default SVGComponent;
