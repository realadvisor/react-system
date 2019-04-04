// @flow

import * as React from "react";
import { Box, useSystem, useResponsive } from "../src/system.js";

const Page = () => {
  const { media } = useSystem();
  const responsive = useResponsive();

  return (
    <>
      <div>
        <Box css={media({ display: ["block", "none"] })}>
          media: mobile screen
        </Box>
        <Box css={media({ display: ["none", "block", "none"] })}>
          media: tablet screen
        </Box>
        <Box css={media({ display: ["none", "none", "block", "none"] })}>
          media: desktop screen
        </Box>
        <Box css={media({ display: ["none", "none", "none", "block"] })}>
          media: large screen
        </Box>
      </div>
      <div>
        {responsive([
          "responsive: mobile screen",
          "responsive: tablet screen",
          "responsive: desktop screen",
          "responsive: large screen"
        ])}
      </div>
    </>
  );
};

export default Page;
