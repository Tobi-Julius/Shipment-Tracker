import Svg, { Rect, Path, SvgProps } from "react-native-svg";

export const Expand = ({
  props,
  fillColor,
  color,
  borderColor,
  handlePress,
}: {
  props: SvgProps;
  fillColor: string;
  color: string;
  borderColor: string;
  handlePress: () => void;
}) => {
  return (
    <Svg
      onPress={handlePress}
      width={26}
      height={26}
      viewBox="0 0 26 26"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <Rect
        x={1.5}
        y={1.5}
        width={23}
        height={23}
        rx={11.5}
        fill={fillColor}
        stroke={borderColor}
        strokeWidth={3}
      />
      <Path
        d="M13.471 7.167h3.862m0 0v3.862m0-3.862l-4.506 4.505m-2.298 6.161H6.667m0 0v-3.862m0 3.862l4.506-4.505"
        stroke={color}
        strokeWidth={1.33333}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  );
};
