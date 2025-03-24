import Svg, { Rect, Path, SvgProps } from "react-native-svg";

export const Notification = (props: SvgProps) => {
  return (
    <Svg
      width={40}
      height={40}
      viewBox="0 0 40 40"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <Rect width={40} height={40} rx={20} fill="#F4F2F8" />
      <Path
        d="M17.333 28.09c.708.566 1.643.91 2.667.91a4.268 4.268 0 002.667-.91m-10.16-2.908c-.421 0-.656-.663-.401-1.03.591-.855 1.163-2.107 1.163-3.615l.024-2.185C13.293 14.292 16.296 11 20 11c3.759 0 6.806 3.34 6.806 7.46l-.025 2.077c0 1.518.552 2.778 1.12 3.632.245.369.009 1.013-.408 1.013H12.508z"
        stroke="#2F50C1"
        strokeWidth={2}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  );
};
