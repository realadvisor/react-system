// @flow

import * as React from "react";
import TestRenderer from "react-test-renderer";
import { renderToString } from "react-dom/server";
import { renderStylesToString } from "emotion-server";
import { Box, Flex } from "./src/index.js";

declare var test: Function;
declare var expect: Function;

test("support width and height", () => {
  expect(TestRenderer.create(<Box width="100px" height="10em" />).toJSON())
    .toMatchInlineSnapshot(`
.emotion-0 {
  box-sizing: border-box;
  min-width: 0;
  min-height: 0;
}

.emotion-1 {
  width: 100px;
  height: 10em;
}

<div
  className="emotion-0 emotion-1"
/>
`);
});

test("support numbers in width and height", () => {
  expect(TestRenderer.create(<Box width={1 / 2} height={1 / 4} />).toJSON())
    .toMatchInlineSnapshot(`
.emotion-0 {
  box-sizing: border-box;
  min-width: 0;
  min-height: 0;
}

.emotion-1 {
  width: 50%;
  height: 25%;
}

<div
  className="emotion-0 emotion-1"
/>
`);
  expect(TestRenderer.create(<Box width={0} height={0} />).toJSON())
    .toMatchInlineSnapshot(`
.emotion-0 {
  box-sizing: border-box;
  min-width: 0;
  min-height: 0;
}

.emotion-1 {
  width: 0;
  height: 0;
}

<div
  className="emotion-0 emotion-1"
/>
`);
  expect(TestRenderer.create(<Box width={2} height={-1} />).toJSON())
    .toMatchInlineSnapshot(`
.emotion-0 {
  box-sizing: border-box;
  min-width: 0;
  min-height: 0;
}

.emotion-1 {
  width: 100%;
  height: 0;
}

<div
  className="emotion-0 emotion-1"
/>
`);
});

test("support paddings and margins", () => {
  expect(TestRenderer.create(<Box p="1" m="2" />)).toMatchInlineSnapshot(`
.emotion-0 {
  box-sizing: border-box;
  min-width: 0;
  min-height: 0;
}

.emotion-1 {
  padding-top: 1px;
  padding-right: 1px;
  padding-bottom: 1px;
  padding-left: 1px;
  margin-top: 2px;
  margin-right: 2px;
  margin-bottom: 2px;
  margin-left: 2px;
}

<div
  className="emotion-0 emotion-1"
/>
`);

  expect(TestRenderer.create(<Box ph="1" pv="2" mh="3" mv="4" />))
    .toMatchInlineSnapshot(`
.emotion-0 {
  box-sizing: border-box;
  min-width: 0;
  min-height: 0;
}

.emotion-1 {
  padding-left: 1px;
  padding-right: 1px;
  padding-top: 2px;
  padding-bottom: 2px;
  margin-left: 3px;
  margin-right: 3px;
  margin-top: 4px;
  margin-bottom: 4px;
}

<div
  className="emotion-0 emotion-1"
/>
`);

  expect(TestRenderer.create(<Box px="1" py="2" mx="3" my="4" />))
    .toMatchInlineSnapshot(`
.emotion-0 {
  box-sizing: border-box;
  min-width: 0;
  min-height: 0;
}

.emotion-1 {
  padding-left: 1px;
  padding-right: 1px;
  padding-top: 2px;
  padding-bottom: 2px;
  margin-left: 3px;
  margin-right: 3px;
  margin-top: 4px;
  margin-bottom: 4px;
}

<div
  className="emotion-0 emotion-1"
/>
`);

  expect(
    TestRenderer.create(
      <Box pt="1" pr="2" pb="3" pl="4" mt="5" mr="6" mb="7" ml="8" />
    ).toJSON()
  ).toMatchInlineSnapshot(`
.emotion-0 {
  box-sizing: border-box;
  min-width: 0;
  min-height: 0;
}

.emotion-1 {
  padding-top: 1px;
  padding-right: 2px;
  padding-bottom: 3px;
  padding-left: 4px;
  margin-top: 5px;
  margin-right: 6px;
  margin-bottom: 7px;
  margin-left: 8px;
}

<div
  className="emotion-0 emotion-1"
/>
`);
});

test("support scale in margins and paddings passed as numbers", () => {
  expect(TestRenderer.create(<Box p={1} m={2} />).toJSON())
    .toMatchInlineSnapshot(`
.emotion-0 {
  box-sizing: border-box;
  min-width: 0;
  min-height: 0;
}

.emotion-1 {
  padding-top: 4px;
  padding-right: 4px;
  padding-bottom: 4px;
  padding-left: 4px;
  margin-top: 8px;
  margin-right: 8px;
  margin-bottom: 8px;
  margin-left: 8px;
}

<div
  className="emotion-0 emotion-1"
/>
`);

  expect(TestRenderer.create(<Box ph={1} pv={2} mh={3} mv={4} />).toJSON())
    .toMatchInlineSnapshot(`
.emotion-0 {
  box-sizing: border-box;
  min-width: 0;
  min-height: 0;
}

.emotion-1 {
  padding-left: 4px;
  padding-right: 4px;
  padding-top: 8px;
  padding-bottom: 8px;
  margin-left: 16px;
  margin-right: 16px;
  margin-top: 32px;
  margin-bottom: 32px;
}

<div
  className="emotion-0 emotion-1"
/>
`);

  expect(
    TestRenderer.create(
      <Box pt={1} pr={2} pb={3} pl={4} mt={5} mr={6} mb={7} ml={8} />
    ).toJSON()
  ).toMatchInlineSnapshot(`
.emotion-0 {
  box-sizing: border-box;
  min-width: 0;
  min-height: 0;
}

.emotion-1 {
  padding-top: 4px;
  padding-right: 8px;
  padding-bottom: 16px;
  padding-left: 32px;
  margin-top: 64px;
  margin-right: 128px;
  margin-bottom: 256px;
  margin-left: 256px;
}

<div
  className="emotion-0 emotion-1"
/>
`);

  expect(TestRenderer.create(<Box p={-10} m={10} />).toJSON())
    .toMatchInlineSnapshot(`
.emotion-0 {
  box-sizing: border-box;
  min-width: 0;
  min-height: 0;
}

.emotion-1 {
  padding-top: -256px;
  padding-right: -256px;
  padding-bottom: -256px;
  padding-left: -256px;
  margin-top: 256px;
  margin-right: 256px;
  margin-bottom: 256px;
  margin-left: 256px;
}

<div
  className="emotion-0 emotion-1"
/>
`);
});

test("support responsive values", () => {
  expect(
    TestRenderer.create(
      <Box width={[1 / 2, 1]} height={[1, 1 / 2, 1 / 4, 1 / 8]} />
    ).toJSON()
  ).toMatchInlineSnapshot(`
.emotion-0 {
  box-sizing: border-box;
  min-width: 0;
  min-height: 0;
}

.emotion-1 {
  width: 50%;
  height: 100%;
}

@media screen and (min-width:48em) {
  .emotion-1 {
    width: 100%;
    height: 50%;
  }
}

@media screen and (min-width:80em) {
  .emotion-1 {
    height: 25%;
  }
}

@media screen and (min-width:120em) {
  .emotion-1 {
    height: 12.5%;
  }
}

<div
  className="emotion-0 emotion-1"
/>
`);
});

test("skip responsive values over breakpoints count", () => {
  expect(
    TestRenderer.create(
      <Box width={[1, 1 / 2, 1 / 4, 1 / 8, 1 / 16]} />
    ).toJSON()
  ).toMatchInlineSnapshot(`
.emotion-0 {
  box-sizing: border-box;
  min-width: 0;
  min-height: 0;
}

.emotion-1 {
  width: 100%;
}

@media screen and (min-width:48em) {
  .emotion-1 {
    width: 50%;
  }
}

@media screen and (min-width:80em) {
  .emotion-1 {
    width: 25%;
  }
}

@media screen and (min-width:120em) {
  .emotion-1 {
    width: 12.5%;
  }
}

<div
  className="emotion-0 emotion-1"
/>
`);
});

test("support flex item properties", () => {
  expect(
    TestRenderer.create(
      <Box flex={1} justifySelf="center" alignSelf="flex-end" order={2} />
    ).toJSON()
  ).toMatchInlineSnapshot(`
.emotion-0 {
  box-sizing: border-box;
  min-width: 0;
  min-height: 0;
}

.emotion-1 {
  -webkit-flex: 1;
  -ms-flex: 1;
  flex: 1;
  justify-self: center;
  -webkit-align-self: flex-end;
  -ms-flex-item-align: end;
  align-self: flex-end;
  -webkit-order: 2;
  -ms-flex-order: 2;
  order: 2;
}

<div
  className="emotion-0 emotion-1"
/>
`);
});

test("support flex box properties", () => {
  expect(
    TestRenderer.create(
      <Flex
        alignItems="center"
        alignContent="flex-end"
        justifyItems="flex-start"
        justifyContent="stretch"
        flexWrap="wrap"
        flexDirection="column"
      />
    ).toJSON()
  ).toMatchInlineSnapshot(`
.emotion-0 {
  display: -webkit-box;
  display: -webkit-flex;
  display: -ms-flexbox;
  display: flex;
  box-sizing: border-box;
  min-width: 0;
  min-height: 0;
}

.emotion-1 {
  -webkit-align-items: center;
  -webkit-box-align: center;
  -ms-flex-align: center;
  align-items: center;
  -webkit-align-content: flex-end;
  -ms-flex-line-pack: end;
  align-content: flex-end;
  justify-items: flex-start;
  -webkit-box-pack: stretch;
  -webkit-justify-content: stretch;
  -ms-flex-pack: stretch;
  justify-content: stretch;
  -webkit-flex-wrap: wrap;
  -ms-flex-wrap: wrap;
  flex-wrap: wrap;
  -webkit-flex-direction: column;
  -ms-flex-direction: column;
  flex-direction: column;
}

<div
  className="emotion-0 emotion-1"
/>
`);
});

test("pass is prop to render element other than div", () => {
  expect(
    TestRenderer.create(
      <div>
        <Box is="header" />
        <Flex is="section" />
      </div>
    ).toJSON()
  ).toMatchInlineSnapshot(`
.emotion-0 {
  box-sizing: border-box;
  min-width: 0;
  min-height: 0;
}

.emotion-2 {
  display: -webkit-box;
  display: -webkit-flex;
  display: -ms-flexbox;
  display: flex;
  box-sizing: border-box;
  min-width: 0;
  min-height: 0;
}

<div>
  <header
    className="emotion-0 emotion-1"
  />
  <section
    className="emotion-2 emotion-1"
  />
</div>
`);
});

test("css prop overrides defaults", () => {
  expect(
    TestRenderer.create(
      <div>
        <Flex width={1 / 2} css={{ minWidth: 100, width: 200, height: 300 }} />
        <Box width={1 / 2} css={{ minWidth: 100, width: 200, height: 300 }} />
      </div>
    ).toJSON()
  ).toMatchInlineSnapshot(`
.emotion-2 {
  box-sizing: border-box;
  min-width: 0;
  min-height: 0;
}

.emotion-0 {
  display: -webkit-box;
  display: -webkit-flex;
  display: -ms-flexbox;
  display: flex;
  box-sizing: border-box;
  min-width: 0;
  min-height: 0;
}

.emotion-1 {
  min-width: 100px;
  width: 200px;
  height: 300px;
  width: 50%;
}

<div>
  <div
    className="emotion-0 emotion-1"
  />
  <div
    className="emotion-2 emotion-1"
  />
</div>
`);
});

test("support server-side rendering", () => {
  expect(
    renderStylesToString(
      renderToString(
        <>
          <Box p={2}>Box</Box>
          <Flex p={2}>Flex</Flex>
        </>
      )
    )
  ).toMatchInlineSnapshot(
    `"<style data-emotion-css=\\"15o30dr 3c42lj\\">.css-15o30dr{box-sizing:border-box;min-width:0;min-height:0;}.css-3c42lj{padding-top:8px;padding-right:8px;padding-bottom:8px;padding-left:8px;}</style><div class=\\"css-15o30dr css-3c42lj\\" data-reactroot=\\"\\">Box</div><style data-emotion-css=\\"xc9yl4\\">.css-xc9yl4{display:-webkit-box;display:-webkit-flex;display:-ms-flexbox;display:flex;box-sizing:border-box;min-width:0;min-height:0;}</style><div class=\\"css-xc9yl4 css-3c42lj\\" data-reactroot=\\"\\">Flex</div>"`
  );
});

test("concat className with prop", () => {
  expect(
    TestRenderer.create(
      <div>
        <Box className="custom-class-box" />
        <Flex className="custom-class-flex" />
      </div>
    ).toJSON()
  ).toMatchInlineSnapshot(`
.emotion-0 {
  box-sizing: border-box;
  min-width: 0;
  min-height: 0;
}

.emotion-2 {
  display: -webkit-box;
  display: -webkit-flex;
  display: -ms-flexbox;
  display: flex;
  box-sizing: border-box;
  min-width: 0;
  min-height: 0;
}

<div>
  <div
    className="emotion-0 emotion-1 custom-class-box"
  />
  <div
    className="emotion-2 emotion-1 custom-class-flex"
  />
</div>
`);
});
