import Svg, { Path, SvgProps } from "react-native-svg";

export const Top = (props: SvgProps) => {
  return (
    <Svg
      width={37}
      height={36}
      viewBox="0 0 146 48"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <Path
        d="M145.231 0c0 13.244-5.377 25.241-14.07 33.936-8.496 8.492-20.191 13.85-33.119 14.053H.776L48.994 0h96.237z"
        fill="#2F50C1"
      />
    </Svg>
  );
};
