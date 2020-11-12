/**
 * @jest-environment jest-environment-node
 * @flow
 */

import * as React from "react";
import { renderToString } from "react-dom/server";
import { renderStylesToString } from "@emotion/server";
import { Box, Flex } from "./src/system.js";

declare var jest: Function;
declare var test: Function;
declare var expect: Function;

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
    `"<style data-emotion=\\"css 1cuxxsv\\">.css-1cuxxsv{box-sizing:border-box;min-width:0;min-height:0;padding-top:8px;padding-right:8px;padding-bottom:8px;padding-left:8px;}</style><div class=\\"css-1cuxxsv\\">Box</div><style data-emotion=\\"css 1491xr4\\">.css-1491xr4{display:-webkit-box;display:-webkit-flex;display:-ms-flexbox;display:flex;box-sizing:border-box;min-width:0;min-height:0;padding-top:8px;padding-right:8px;padding-bottom:8px;padding-left:8px;}</style><div class=\\"css-1491xr4\\">Flex</div>"`
  );
});
