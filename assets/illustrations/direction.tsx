
import Svg, { Path, SvgProps } from "react-native-svg";

export const Direction = (props: SvgProps) => {
  return (
    <Svg
      width={9}
      height={9}
      viewBox="0 0 9 9"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <Path
        d="M4.889 1.583L7.667 4.5m0 0L4.889 7.417M7.667 4.5H1"
        stroke="#2F50C1"
        strokeWidth={1.33333}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  );
};
