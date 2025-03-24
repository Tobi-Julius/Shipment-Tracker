import Svg, { Path } from "react-native-svg";

export const Bottom = (props: SvgProps) => {
  return (
    <Svg
      width={37}
      height={36}
      viewBox="0 0 144 92"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <Path
        d="M143.374 43.64L94.784 92H.949v-.101l-.028-.017v-.168c0-1.668.372-13.329 7.378-24.517 3.574-5.695 8.78-11.273 16.616-15.586 7.178-3.943 22.315-7.617 34.777-7.55l-.371 15.924 18.816-17.979L60.15 23.185l-.057 2.578-.315 13.53c-3.926-.135-9.969-.067-16.845 1.28L3.037.826h97.324l43.013 42.816z"
        fill="#2F50C1"
      />
    </Svg>
  );
};
