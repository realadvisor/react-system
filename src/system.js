// @flow

import * as React from "react";
import { jsx } from "@emotion/core";
import facepaint from "facepaint";
import type {
  StandardLonghandProperties,
  JustifySelfProperty,
  AlignSelfProperty,
  AlignItemsProperty,
  AlignContentProperty,
  JustifyItemsProperty,
  JustifyContentProperty,
  FlexWrapProperty,
  FlexDirectionProperty
} from "csstype";

// emotion adds units to numbers
type Properties = StandardLonghandProperties<number>;
type FlexGrowProperty = $ElementType<Properties, "flexGrow">;
type FlexShrinkProperty = $ElementType<Properties, "flexShrink">;
type FlexBasisProperty = $ElementType<Properties, "flexBasis">;
type OrderProperty = $ElementType<Properties, "order">;

type Theme = {|
  breakpoints: $ReadOnlyArray<number>,
  spaces: $ReadOnlyArray<number>
|};

opaque type ForbiddenShorthandProp = mixed;

type NumericProp = number | string | $ReadOnlyArray<number | string>;

type CssProp = any;

type MediaProp<T> = $ReadOnlyArray<T> | T;

type BoxProps = {
  as?: React.ElementType,
  className?: string,
  css?: CssProp,
  children?: React.Node,

  width?: NumericProp,
  height?: NumericProp,

  p?: NumericProp,
  ph?: NumericProp,
  px?: NumericProp,
  pv?: NumericProp,
  py?: NumericProp,
  pt?: NumericProp,
  pr?: NumericProp,
  pb?: NumericProp,
  pl?: NumericProp,
  m?: NumericProp,
  mh?: NumericProp,
  mx?: NumericProp,
  mv?: NumericProp,
  my?: NumericProp,
  mt?: NumericProp,
  mr?: NumericProp,
  mb?: NumericProp,
  ml?: NumericProp,

  flexGrow?: MediaProp<FlexGrowProperty>,
  flexShrink?: MediaProp<FlexShrinkProperty>,
  flexBasis?: MediaProp<FlexBasisProperty>,
  justifySelf?: MediaProp<JustifySelfProperty>,
  alignSelf?: MediaProp<AlignSelfProperty>,
  order?: MediaProp<OrderProperty>,

  flex?: ForbiddenShorthandProp,
  fontSize?: ForbiddenShorthandProp,
  color?: ForbiddenShorthandProp,
  bg?: ForbiddenShorthandProp,
  w?: ForbiddenShorthandProp,
  ...
};

type FlexProps = {
  ...BoxProps,
  alignItems?: MediaProp<AlignItemsProperty>,
  alignContent?: MediaProp<AlignContentProperty>,
  justifyItems?: MediaProp<JustifyItemsProperty>,
  justifyContent?: MediaProp<JustifyContentProperty>,
  flexWrap?: MediaProp<FlexWrapProperty>,
  flexDirection?: MediaProp<FlexDirectionProperty>,

  flexFlow?: ForbiddenShorthandProp,
  ...
};

type Descriptor = {|
  prop: string,
  cssProp?: string,
  transform?: (number | string, Theme) => number | string
|};

const defaultTheme: Theme = {
  // mobile, desktop and large screens
  breakpoints: [768, 1280, 1920],
  // degrees of 2 except insignificant 2
  spaces: [0, 4, 8, 16, 32, 64, 128, 256]
};

const SystemContext: React.Context<Theme> = React.createContext(defaultTheme);

const makeQuery = value => {
  const convertedValue =
    typeof value === "number" ? `${Math.ceil(value / 16)}em` : value;
  return `screen and (min-width: ${convertedValue})`;
};

const makeMediaRules = queries => (styles: any) => {
  const result = { ...styles[0] };
  styles.slice(1).forEach((style, index) => {
    result[queries[index]] = style;
  });
  return result;
};

export const SystemProvider = SystemContext.Provider;

const makeMedia = context => {
  const queries = context.breakpoints.map(bp => `@media ${makeQuery(bp)}`);
  const fp = facepaint(queries);
  const mr = makeMediaRules(queries);
  return (styles: Styles): { [string]: mixed, ... } => {
    if (Array.isArray(styles)) {
      return mr(styles);
    } else {
      return fp(styles);
    }
  };
};

/* system hook */

type BasicStyles = {
  [string]: number | string | BasicStyles,
  ...
};

type MediaPropStyles = {
  [string]: number | string | $ReadOnlyArray<number | string> | MediaPropStyles,
  ...
};

type Styles = $ReadOnlyArray<BasicStyles> | MediaPropStyles;

export const useResponsive = (): (<T>(values: $ReadOnlyArray<T>) => T) => {
  const context = React.useContext(SystemContext);
  const [index, setIndex] = React.useState(0);

  React.useEffect(() => {
    const handleResize = () => {
      let currentIndex = 0;
      context.breakpoints.forEach((bp, i) => {
        if (window.matchMedia(makeQuery(bp)).matches) {
          // one more for smallest value
          currentIndex = i + 1;
        }
      });
      setIndex(currentIndex);
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, [context]);

  const responsive = <T>(values: $ReadOnlyArray<T>): T => {
    return values[Math.max(0, Math.min(index, values.length - 1))];
  };

  return responsive;
};

export const useSystem = (): ({|
  media: (styles: Styles) => any,
  m: (v: NumericProp) => any,
  mb: (v: NumericProp) => any,
  ml: (v: NumericProp) => any,
  mr: (v: NumericProp) => any,
  mt: (v: NumericProp) => any,
  mx: (v: NumericProp) => any,
  my: (v: NumericProp) => any,
  p: (v: NumericProp) => any,
  pb: (v: NumericProp) => any,
  pl: (v: NumericProp) => any,
  pr: (v: NumericProp) => any,
  pt: (v: NumericProp) => any,
  px: (v: NumericProp) => any,
  py: (v: NumericProp) => any
|}) => {
  const context = React.useContext(SystemContext);
  const media = React.useMemo(() => makeMedia(context), [context]);

  const toSpace = value => {
    return Array.isArray(value)
      ? value.map(item => getSpace(item, context))
      : getSpace(value, context);
  };

  const pt = (v: NumericProp) => media({ paddingTop: toSpace(v) });
  const pr = (v: NumericProp) => media({ paddingRight: toSpace(v) });
  const pb = (v: NumericProp) => media({ paddingBottom: toSpace(v) });
  const pl = (v: NumericProp) => media({ paddingLeft: toSpace(v) });
  const px = (v: NumericProp) => [pl(v), pr(v)];
  const py = (v: NumericProp) => [pt(v), pb(v)];
  const p = (v: NumericProp) => [pt(v), pr(v), pb(v), pl(v)];
  const mt = (v: NumericProp) => media({ marginTop: toSpace(v) });
  const mr = (v: NumericProp) => media({ marginRight: toSpace(v) });
  const mb = (v: NumericProp) => media({ marginBottom: toSpace(v) });
  const ml = (v: NumericProp) => media({ marginLeft: toSpace(v) });
  const mx = (v: NumericProp) => [ml(v), mr(v)];
  const my = (v: NumericProp) => [mt(v), mb(v)];
  const m = (v: NumericProp) => [mt(v), mr(v), mb(v), ml(v)];

  return {
    media,
    pt,
    pr,
    pb,
    pl,
    px,
    py,
    p,
    mt,
    mr,
    mb,
    ml,
    mx,
    my,
    m
  };
};

/* Flex/Box */

const id2 = <T>(first: T, second: mixed): T => first;

const makePercent = value => (value === 0 ? 0 : `${value * 100}%`);

const getSizeValue = (value): string | number =>
  typeof value === "number"
    ? makePercent(Math.max(0, Math.min(value, 1)))
    : value;

// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Math/sign#Polyfill
const sign = x => {
  // If x is NaN, the result is NaN.
  // If x is -0, the result is -0.
  // If x is +0, the result is +0.
  // If x is negative and not -0, the result is -1.
  // If x is positive and not +0, the result is +1.
  return Number(x > 0) - Number(x < 0) || +x;
  // A more aesthetical persuado-representation is shown below
  //
  // ( (x > 0) ? 0 : 1 )  // if x is negative then negative one
  //          +           // else (because you cant be both - and +)
  // ( (x < 0) ? 0 : -1 ) // if x is positive then positive one
  //         ||           // if x is 0, -0, or NaN, or not a number,
  //         +x           // Then the result will be x, (or) if x is
  //                      // not a number, then x converts to number
};

const getSpace = (value, { spaces }) => {
  if (typeof value === "number") {
    const max = spaces.length - 1;
    const bound = Math.max(-max, Math.min(value, max));
    return sign(bound) * spaces[Math.abs(bound)];
  } else {
    return value;
  }
};

const sizeStyles: $ReadOnlyArray<Descriptor> = [
  { prop: "width", transform: getSizeValue },
  { prop: "height", transform: getSizeValue }
];

const spaceStyles: $ReadOnlyArray<Descriptor> = [
  { prop: "p", cssProp: "paddingTop", transform: getSpace },
  { prop: "p", cssProp: "paddingRight", transform: getSpace },
  { prop: "p", cssProp: "paddingBottom", transform: getSpace },
  { prop: "p", cssProp: "paddingLeft", transform: getSpace },

  { prop: "ph", cssProp: "paddingLeft", transform: getSpace },
  { prop: "ph", cssProp: "paddingRight", transform: getSpace },
  { prop: "px", cssProp: "paddingLeft", transform: getSpace },
  { prop: "px", cssProp: "paddingRight", transform: getSpace },
  { prop: "pv", cssProp: "paddingTop", transform: getSpace },
  { prop: "pv", cssProp: "paddingBottom", transform: getSpace },
  { prop: "py", cssProp: "paddingTop", transform: getSpace },
  { prop: "py", cssProp: "paddingBottom", transform: getSpace },

  { prop: "pt", cssProp: "paddingTop", transform: getSpace },
  { prop: "pr", cssProp: "paddingRight", transform: getSpace },
  { prop: "pb", cssProp: "paddingBottom", transform: getSpace },
  { prop: "pl", cssProp: "paddingLeft", transform: getSpace },

  { prop: "m", cssProp: "marginTop", transform: getSpace },
  { prop: "m", cssProp: "marginRight", transform: getSpace },
  { prop: "m", cssProp: "marginBottom", transform: getSpace },
  { prop: "m", cssProp: "marginLeft", transform: getSpace },

  { prop: "mh", cssProp: "marginLeft", transform: getSpace },
  { prop: "mh", cssProp: "marginRight", transform: getSpace },
  { prop: "mx", cssProp: "marginLeft", transform: getSpace },
  { prop: "mx", cssProp: "marginRight", transform: getSpace },
  { prop: "mv", cssProp: "marginTop", transform: getSpace },
  { prop: "mv", cssProp: "marginBottom", transform: getSpace },
  { prop: "my", cssProp: "marginTop", transform: getSpace },
  { prop: "my", cssProp: "marginBottom", transform: getSpace },

  { prop: "mt", cssProp: "marginTop", transform: getSpace },
  { prop: "mr", cssProp: "marginRight", transform: getSpace },
  { prop: "mb", cssProp: "marginBottom", transform: getSpace },
  { prop: "ml", cssProp: "marginLeft", transform: getSpace }
];

const flexItemStyles: $ReadOnlyArray<Descriptor> = [
  { prop: "flexGrow" },
  { prop: "flexShrink" },
  { prop: "flexBasis" },
  { prop: "justifySelf" },
  { prop: "alignSelf" },
  { prop: "order" }
];

const flexBoxStyles: $ReadOnlyArray<Descriptor> = [
  { prop: "alignItems" },
  { prop: "alignContent" },
  { prop: "justifyItems" },
  { prop: "justifyContent" },
  { prop: "flexWrap" },
  { prop: "flexDirection" }
];

const omit = (obj, blacklist) => {
  const next = {};
  for (const key in obj) {
    if (blacklist.indexOf(key) === -1) {
      next[key] = obj[key];
    }
  }
  return next;
};

const getStylePropName = style => style.prop;

const transformValues = (props, context, styles) => {
  const generated = {};
  for (let i = 0; i < styles.length; i += 1) {
    const { prop, cssProp = prop, transform = id2 } = styles[i];
    const value = props[prop];
    if (value != null) {
      generated[cssProp] = Array.isArray(value)
        ? value.map(item => transform(item, context))
        : transform(value, context);
    }
  }
  return generated;
};

export const Box: React.AbstractComponent<
  BoxProps,
  any | null
> = React.forwardRef(
  ({ as = "div", css: cssProp, children, ...props }, ref) => {
    const context = React.useContext(SystemContext);
    const { media } = useSystem();
    const styles = [...sizeStyles, ...spaceStyles, ...flexItemStyles];
    const generated = transformValues(props, context, styles);
    const rest = omit(props, styles.map(getStylePropName));
    return jsx(
      (as: any),
      {
        ref,
        css: [
          {
            boxSizing: "border-box",
            minWidth: 0,
            minHeight: 0
          },
          cssProp,
          media(generated)
        ],
        ...rest
      },
      children == null ? null : children
    );
  }
);

Box.displayName = "Box";

export const Flex: React.AbstractComponent<
  FlexProps,
  any | null
> = React.forwardRef(
  ({ as = "div", css: cssProp, children, ...props }, ref) => {
    const context = React.useContext(SystemContext);
    const { media } = useSystem();
    const styles = [
      ...sizeStyles,
      ...spaceStyles,
      ...flexItemStyles,
      ...flexBoxStyles
    ];
    const generated = transformValues(props, context, styles);
    const rest = omit(props, styles.map(getStylePropName));
    return jsx(
      (as: any),
      {
        ref,
        css: [
          {
            display: "flex",
            boxSizing: "border-box",
            minWidth: 0,
            minHeight: 0
          },
          cssProp,
          media(generated)
        ],
        ...rest
      },
      children == null ? null : children
    );
  }
);

Flex.displayName = "Flex";
