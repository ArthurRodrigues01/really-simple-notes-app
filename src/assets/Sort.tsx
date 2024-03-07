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
          fill="#ffffff"
          d="M218.7,32.8c-1.6-3.1-5-5.1-8.8-5.1H19.7c-3.8,0-7.2,2-8.8,5.2s-1,6.9,1.5,9.6l67.6,72.4v81.7c0,3.4,2.1,6.5,5.4,8l49.9,22.8c1.3,0.6,2.8,0.9,4.3,0.9c1.7,0,3.5-0.4,5-1.3c2.8-1.6,4.6-4.4,4.7-7.4l3.4-104.8l64.7-72.6C219.8,39.6,220.3,35.9,218.7,32.8z M99.3,191v-70.5h33.8l-2.8,84.7L99.3,191z M138.2,102.9c-0.5-0.1-1-0.3-1.5-0.3H94.1L40.8,45.6h148.5L138.2,102.9z M173.8,131.2H246v15.8h-72.2V131.2L173.8,131.2z M173.8,165.5H246v15.8h-72.2V165.5L173.8,165.5z M173.8,197.1H246v15.8h-72.2V197.1L173.8,197.1z"
        />
      </G>
    </G>
  </Svg>
);
export default SVGComponent;
