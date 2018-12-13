// @flow

import * as React from "react";
import { css, cx } from "emotion";
import facepaint from "facepaint";
import invariant from "tiny-invariant";

type Theme = {|
  breakpoints: $ReadOnlyArray<number>,
  spaces: $ReadOnlyArray<number>
|};

type NumericProp = number | string | $ReadOnlyArray<number | string>;
type StringProp = string | $ReadOnlyArray<string>;

type CssProp = { [string]: mixed } | $ReadOnlyArray<CssProp>;

type BoxProps = {
  as?: string,
  className?: string,
  css?: CssProp,
  children?: React.Node,

  width?: NumericProp,
  height?: NumericProp,

  p?: NumericProp,
  ph?: NumericProp,
  pv?: NumericProp,
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

  flex?: NumericProp,
  justifySelf?: StringProp,
  alignSelf?: StringProp,
  order?: NumericProp
};

type FlexProps = {
  ...BoxProps,
  alignItems?: StringProp,
  alignContent?: StringProp,
  justifyItems?: StringProp,
  justifyContent?: StringProp,
  flexWrap?: StringProp,
  flexDirection?: StringProp
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

export const SystemContext = /*#__PURE__*/ React.createContext<Theme>(
  defaultTheme
);

function resolveDispatcher() {
  const ReactCurrentOwner =
    // $FlowFixMe
    React.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED.ReactCurrentOwner;
  const dispatcher = ReactCurrentOwner.currentDispatcher;
  return dispatcher;
}

const readContext = <T>(Context: React.Context<T>): T => {
  const dispatcher = resolveDispatcher();
  invariant(
    dispatcher,
    "Calling media outside of component render is not allowed"
  );
  return dispatcher.readContext(Context);
};

const makeMedia = context =>
  facepaint(
    context.breakpoints.map(
      value =>
        `@media screen and (min-width: ${
          typeof value === "number" ? `${Math.ceil(value / 16)}em` : value
        })`
    )
  );

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
  { prop: "flex" },
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

type Styles = {
  [string]: number | string | Styles | $ReadOnlyArray<number | string | Styles>
};

export const media = (styles: Styles) => {
  const context = readContext(SystemContext);
  const media = makeMedia(context);
  return media(styles);
};

const initialBoxStyle = /*#__PURE__*/ css({
  boxSizing: "border-box",
  minWidth: 0,
  minHeight: 0
});

export const Box = React.forwardRef<BoxProps, HTMLElement>(
  ({ as = "div", className = "", css: cssProp, children, ...props }) => {
    const context = readContext(SystemContext);
    const media = makeMedia(context);
    const styles = [...sizeStyles, ...spaceStyles, ...flexItemStyles];
    const generated = transformValues(props, context, styles);
    const generatedClassName = css(cssProp, media(generated));
    const rest = omit(props, styles.map(getStylePropName));

    return React.createElement(
      as,
      {
        className: cx(initialBoxStyle, className, generatedClassName),
        ...rest
      },
      children == null ? null : children
    );
  }
);

Box.displayName = "Box";

const initialFlexStyle = /*#__PURE__*/ css({
  display: "flex",
  boxSizing: "border-box",
  minWidth: 0,
  minHeight: 0
});

export const Flex = React.forwardRef<FlexProps, HTMLElement>(
  ({ as = "div", className = "", css: cssProp, children, ...props }) => {
    const context = readContext(SystemContext);
    const media = makeMedia(context);
    const styles = [
      ...sizeStyles,
      ...spaceStyles,
      ...flexItemStyles,
      ...flexBoxStyles
    ];
    const generated = transformValues(props, context, styles);
    const generatedClassName = css(cssProp, media(generated));
    const rest = omit(props, styles.map(getStylePropName));

    return React.createElement(
      as,
      {
        className: cx(initialFlexStyle, className, generatedClassName),
        ...rest
      },
      children == null ? null : children
    );
  }
);
