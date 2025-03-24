import Svg, { G, Path, Defs, ClipPath, SvgProps } from "react-native-svg";

export const Shipments = ({
  size,
  color,
  props,
}: {
  size: number;
  color: string;
  props: SvgProps;
}) => {
  return (
    <Svg
      width={25}
      height={26}
      viewBox={"0 0 25 26"}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <G clipPath="url(#clip0_1_2578)" fill={color}>
        <Path d="M16.147 13.668V4.354l-4.34-.578-.148 4.323-1.589-1.082-1.589.897.328-4.52-2.433-.312v9.477l9.771 1.109zM20.316 24.27v-9.314l-4.34-.578-.148 4.323-1.589-1.082-1.589.897.328-4.52-2.25-.22v9.476l9.588 1.018zM6.811 13.304l-.144 4.217-1.59-1.082-1.588.897.327-4.52-2.25-.31v9.477l8.289.942V13.64l-3.044-.337zM20.81 11.987l-3.198 1.909 3.176.404 3.042-1.916-3.02-.397zM21.191 15.043v9.005l3.428-2.045-.067-9.078-3.361 2.118zM5.688 11.32v-.883l-3.393 1.491 1.947.248 1.446-.856zM17.022 4.441v9.005l3.054-1.823.372-.315-.065-8.985-3.36 2.118zM15.616 1.251L12.28 3.145l4.34.554 3.041-1.917-4.045-.53zM9.236 2.755L12.471.836l-1.066-.14-4.116 1.808 1.947.25z" />
      </G>
      <Defs>
        <ClipPath id="clip0_1_2578">
          <Path
            fill="#fff"
            transform="translate(.693)"
            d="M0 0H24.6134V25H0z"
          />
        </ClipPath>
      </Defs>
    </Svg>
  );
};
