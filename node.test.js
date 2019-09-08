/**
 * @jest-environment jest-environment-node
 * @flow
 */

import * as React from "react";
import { renderToString } from "react-dom/server";
import { cache } from "emotion";
import { CacheProvider } from "@emotion/core";
import { renderStylesToString } from "emotion-server";
import { Box, Flex } from "./src/system.js";

declare var jest: Function;
declare var test: Function;
declare var expect: Function;

test("support server-side rendering", () => {
  expect(
    renderStylesToString(
      renderToString(
        <CacheProvider value={cache}>
          <Box p={2}>Box</Box>
          <Flex p={2}>Flex</Flex>
        </CacheProvider>
      )
    )
  ).toMatchInlineSnapshot(
    `"<style data-emotion-css=\\"p7tjj\\">.css-p7tjj{box-sizing:border-box;min-width:0;min-height:0;padding-top:8px;padding-right:8px;padding-bottom:8px;padding-left:8px;}</style><div class=\\"css-p7tjj\\">Box</div><style data-emotion-css=\\"1gtc4va\\">.css-1gtc4va{display:-webkit-box;display:-webkit-flex;display:-ms-flexbox;display:flex;box-sizing:border-box;min-width:0;min-height:0;padding-top:8px;padding-right:8px;padding-bottom:8px;padding-left:8px;}</style><div class=\\"css-1gtc4va\\">Flex</div>"`
  );
});
