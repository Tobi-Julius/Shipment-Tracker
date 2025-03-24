import * as React from "react";
import Svg, { Path as SVGPath, SvgProps } from "react-native-svg";

export const Path = (props: SvgProps) => {
  return (
    <Svg
      width={19}
      height={16}
      viewBox="0 0 19 16"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <SVGPath
        d="M10.833 1L17.5 8m0 0l-6.667 7M17.5 8h-16"
        stroke="#2F50C1"
        strokeWidth={2}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  );
};
