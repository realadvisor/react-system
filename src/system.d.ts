import * as React from "react";
import type { FunctionInterpolation } from "@emotion/react";
import type { StandardLonghandProperties, Property } from "csstype";

type Style = FunctionInterpolation<any>;

// emotion adds units to numbers
type Properties = StandardLonghandProperties<number>;
type FlexGrowProperty = Properties["flexGrow"];
type FlexShrinkProperty = Properties["flexShrink"];
type FlexBasisProperty = Properties["flexBasis"];
type OrderProperty = Properties["order"];

type Theme = {
  breakpoints: ReadonlyArray<number>;
  spaces: ReadonlyArray<number>;
};

type NumericProp = number | string | ReadonlyArray<number | string>;

type MediaProp<T> = ReadonlyArray<T> | T;

type BoxProps = {
  as?: React.ElementType;
  className?: string;
  css?: Style;
  children?: React.ReactNode;

  width?: NumericProp;
  height?: NumericProp;

  p?: NumericProp;
  ph?: NumericProp;
  px?: NumericProp;
  pv?: NumericProp;
  py?: NumericProp;
  pt?: NumericProp;
  pr?: NumericProp;
  pb?: NumericProp;
  pl?: NumericProp;
  m?: NumericProp;
  mh?: NumericProp;
  mx?: NumericProp;
  mv?: NumericProp;
  my?: NumericProp;
  mt?: NumericProp;
  mr?: NumericProp;
  mb?: NumericProp;
  ml?: NumericProp;

  flexGrow?: MediaProp<FlexGrowProperty>;
  flexShrink?: MediaProp<FlexShrinkProperty>;
  flexBasis?: MediaProp<FlexBasisProperty>;
  justifySelf?: MediaProp<Property.JustifySelf>;
  alignSelf?: MediaProp<Property.AlignSelf>;
  order?: MediaProp<OrderProperty>;
};

type FlexProps = BoxProps & {
  alignItems?: MediaProp<Property.AlignItems>;
  alignContent?: MediaProp<Property.AlignContent>;
  justifyItems?: MediaProp<Property.JustifyItems>;
  justifyContent?: MediaProp<Property.JustifyContent>;
  flexWrap?: MediaProp<Property.FlexWrap>;
  flexDirection?: MediaProp<Property.FlexDirection>;
};

type Descriptor = {
  prop: string;
  cssProp?: string;
  transform?: (value: number | string, theme: Theme) => number | string;
};

export declare const SystemProvider: React.Provider<Theme>;

type BasicStyles = {
  [key: string]: number | string | BasicStyles;
};

type MediaPropStyles = {
  [key: string]:
    | number
    | string
    | ReadonlyArray<number | string>
    | MediaPropStyles;
};

type MediaStyles = ReadonlyArray<BasicStyles> | MediaPropStyles;

export declare function useResponsive(): <T>(values: ReadonlyArray<T>) => T;

export declare function ResponsiveProvider(options: {
  children: React.ReactNode;
}): React.ReactNode;

export declare function useGlobalResponsive(): <T>(
  values: ReadonlyArray<T>
) => T;

export declare function useSystem(): {
  media: (MediaStyles: MediaStyles) => Style;
  m: (v: NumericProp) => Style;
  mb: (v: NumericProp) => Style;
  ml: (v: NumericProp) => Style;
  mr: (v: NumericProp) => Style;
  mt: (v: NumericProp) => Style;
  mx: (v: NumericProp) => Style;
  my: (v: NumericProp) => Style;
  p: (v: NumericProp) => Style;
  pb: (v: NumericProp) => Style;
  pl: (v: NumericProp) => Style;
  pr: (v: NumericProp) => Style;
  pt: (v: NumericProp) => Style;
  px: (v: NumericProp) => Style;
  py: (v: NumericProp) => Style;
};

export declare const Box: React.ForwardRefRenderFunction<any | null, BoxProps>;

export declare const Flex: React.ForwardRefRenderFunction<
  any | null,
  FlexProps
>;
