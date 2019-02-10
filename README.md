# react-system [![Travis Build Status][travis-img]][travis]

[travis-img]: https://travis-ci.org/TrySound/react-system.svg
[travis]: https://travis-ci.org/TrySound/react-system

Flex box system for react based on emotion

## Usage

```
yarn add react-system
```

```js
import { Flex, Box } from "react-system";

export const Component = () => (
  <Flex>
    <Box width={1 / 2} p={2}>
      The first column
    </Box>
    <Box width={1 / 2} p={2}>
      The second column
    </Box>
  </Flex>
);
```

## API

### <Box />

The Box component handles size, margin and padding. It has the following initial styles

```css
box-sizing: border-box; /* allows safely use padding as gutters */
min-width: 0; /* fixes a lot of flex issues with overflow */
min-height: 0;
```

#### Width and height (number|string|array)

Sets width and height, where numbers 0-1 are percentage values, and strings are raw CSS values with units. Pass an array to set different widths at different breakpoints for responsive styles.

#### Margin and padding props

Both margin and padding props accept numbers, strings, and arrays as values. Using a number from 0-7 (i.e. an index of context.spaces) will reference a step on the spacing scale. Negative Numbers can be used to set negative margins and compensate for grid gutters. Strings are passed directly for other valid CSS values.

Use array values to set different margin or padding values per breakpoint for responsive styles.

Margin and padding props follow a shorthand syntax for specifying direction.

- m - margin
- mt - margin-top
- mr - margin-right
- mb - margin-bottom
- ml - margin-left
- mx or mh - margin-left and margin-right
- my or mv - margin-top and margin-bottom
- p - padding
- pt - padding-top
- pr - padding-right
- pb - padding-bottom
- pl - padding-left
- px or ph - padding-left and padding-right
- py or pv - padding-top and padding-bottom

#### Flex items props

- flexGrow (number|array) sets the flex-grow property
- flexShrink (number|array) sets the flex-shrink property
- flexBasis (number|array) sets the flex-basis property
- order (number|string|array) sets the order property
- alignSelf (string|array) - sets the align-self property

#### css (string|object)

Pass styles to emotion. This is useful as an escape hatch for one-off styles.

### <Flex />

The Flex component extends the Box component and sets display flex.

- alignItems (string|array) sets align-items
- justifyContent (string|array) sets justify-content
- flexDirection (string|array) sets flex-direction
- flexWrap (string|array) sets flex-wrap: wrap

### Changing the HTML element

Pass `as` prop with string to change default `div` tag.

```js
<Box as="header" />
```

### Spaces

React system components' margin and padding props use a 4 step spacing scale to help keep things aligned and keep layouts consistent.

The default scale is `[ 0, 4, 8, 16, 32, 64, 128, 256 ]`.

### Breakpoints

The Flex and Box components use a mobile-first responsive approach, where any value set works from that breakpoint and wider. Breakpoints are hard-coded to the following min-widths: `[768, 1280, 1920]`.

### useSystem()

System hook provides two utilities `media` for styles and `responsive` for values.

### media(styles)

An utility function which allows to write responsive styles similar to Flex/Box props.

_Note: `media()` can be called only inside of component render._

```js
import { Box, useSystem } from "react-system";

const Component = () => {
  const { media } = useSystem();

  return (
    <Box css={media({ background: ["#000", "#fff"] })}>
      <div className={css(media({ color: ["#fff", "#000"] }))}>Content</div>
    </Box>
  );
};
```

### responsive(values)

This utility allows to match values with media queries in system style.

```js
const { useSystem } from 'react-system';

const Component = () => {
  const { responsive } = useSystem();

  // show dialog as fullscreen on mobile and like window on desktop
  return <Dialog fullScreen={responsive([true, false])} />;
};
```

## What is the different from grid-styled or @rebass/grid

- react-system has less dependencies and esm support which leads to smaller bundle size
- in this project `min-width: 0` and `min-height: 0` are added out of the box to fix flexbox issues
- bg, color and fontSize are missing in this project; css={{}} should be used instead
- added mh, mv, ph, pv which are shorthand for horizontal and vertical directions (see https://github.com/rebassjs/rebass/issues/509)
- emotion only support; by not using react-emotion this project works well in concurrent mode
- wrong numeric paddings, margins, width and height are clamped to their possible values
- this project uses internal context reader to eliminate nested elements in `Flex` and `Box` components

## License

MIT &copy; [Bogdan Chadkin](mailto:trysound@yandex.ru)
