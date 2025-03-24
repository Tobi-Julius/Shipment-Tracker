import { Dimensions, PixelRatio, Platform } from "react-native";

// Reference dimensions (configurable, defaulting to iPhone 14)
const REFERENCE_WIDTH = 393;
const REFERENCE_HEIGHT = 844;

const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get("window");

const widthScale = SCREEN_WIDTH / REFERENCE_WIDTH;
const heightScale = SCREEN_HEIGHT / REFERENCE_HEIGHT;

export const normalize = (
  size: number,
  base: "width" | "height" = "width",
  factor: number = 1
): number => {
  const scale = base === "width" ? widthScale : heightScale;
  const newSize = size * scale * factor;
  return Math.round(PixelRatio.roundToNearestPixel(newSize));
};

export const widthPixel = (size: number, factor: number = 1): number =>
  normalize(size, "width", factor);

export const heightPixel = (size: number, factor: number = 1): number =>
  normalize(size, "height", factor);

export const fontPixel = (size: number, factor: number = 1): number => {
  const base = Platform.OS === "ios" ? "width" : "height";
  return normalize(size, base, factor);
};

export const pixelSizeVertical = (size: number, factor: number = 1): number =>
  heightPixel(size, factor);

export const pixelSizeHorizontal = (size: number, factor: number = 1): number =>
  widthPixel(size, factor);

const fontSizes = {
  h1: fontPixel(24),
  h2: fontPixel(20),
  h3: fontPixel(17),
  h4: fontPixel(16),
  h5: fontPixel(14),
  h6: fontPixel(12),
};

export const getAspectRatio = (width: number, height: number): number =>
  normalize(width) / normalize(height);

const isSmallDevice = SCREEN_WIDTH <= 375;
const isShortDevice = SCREEN_HEIGHT <= 650;
const isTabletWidth = SCREEN_WIDTH >= 800;
const isTabletHeight = SCREEN_HEIGHT >= 940;
const isLargeDevice = SCREEN_WIDTH >= 1000 || SCREEN_HEIGHT >= 1200;

// Export utilities
export default {
  width: SCREEN_WIDTH,
  height: SCREEN_HEIGHT,
  size: fontSizes,
  fontPixel,
  widthPixel,
  heightPixel,
  pixelSizeHorizontal,
  pixelSizeVertical,
  normalize,
  getAspectRatio,
  isSmallDevice,
  isShortDevice,
  isTabletWidth,
  isTabletHeight,
  isLargeDevice,
  referenceWidth: REFERENCE_WIDTH,
  referenceHeight: REFERENCE_HEIGHT,
  widthScale,
  heightScale,
};
