import Svg, { Path, SvgProps } from "react-native-svg";

export const Filter = (props: SvgProps) => {
  return (
    <Svg
      width={25}
      height={24}
      viewBox="0 0 25 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <Path
        d="M6.712 12h11.076M4.25 7h16m-9.846 10h3.692"
        stroke="#58536E"
        strokeWidth={2}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  );
};
