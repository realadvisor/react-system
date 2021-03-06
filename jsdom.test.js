// @flow
// @jsx jsx

import { jsx } from "@emotion/react";
import * as ReactDOM from "react-dom";
import TestRenderer from "react-test-renderer";
import { Box, Flex, useSystem, useResponsive } from "./src/system.js";

declare var jest: Function;
declare var test: Function;
declare var expect: Function;

window.matchMedia = jest.fn().mockImplementation((query) => {
  return {
    matches: false,
    media: query,
    onchange: null,
    addListener: jest.fn(),
    removeListener: jest.fn(),
  };
});

test("support width and height", () => {
  expect(TestRenderer.create(<Box width="100px" height="10em" />).toJSON())
    .toMatchInlineSnapshot(`
    .emotion-0 {
      box-sizing: border-box;
      min-width: 0;
      min-height: 0;
      width: 100px;
      height: 10em;
    }

    <div
      className="emotion-0"
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
      width: 50%;
      height: 25%;
    }

    <div
      className="emotion-0"
    />
  `);
  expect(TestRenderer.create(<Box width={0} height={0} />).toJSON())
    .toMatchInlineSnapshot(`
    .emotion-0 {
      box-sizing: border-box;
      min-width: 0;
      min-height: 0;
      width: 0;
      height: 0;
    }

    <div
      className="emotion-0"
    />
  `);
  expect(TestRenderer.create(<Box width={2} height={-1} />).toJSON())
    .toMatchInlineSnapshot(`
    .emotion-0 {
      box-sizing: border-box;
      min-width: 0;
      min-height: 0;
      width: 100%;
      height: 0;
    }

    <div
      className="emotion-0"
    />
  `);
});

test("support paddings and margins", () => {
  expect(TestRenderer.create(<Box p="1px" m="2px" />)).toMatchInlineSnapshot(`
    .emotion-0 {
      box-sizing: border-box;
      min-width: 0;
      min-height: 0;
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
      className="emotion-0"
    />
  `);

  expect(TestRenderer.create(<Box ph="1px" pv="2px" mh="3px" mv="4px" />))
    .toMatchInlineSnapshot(`
    .emotion-0 {
      box-sizing: border-box;
      min-width: 0;
      min-height: 0;
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
      className="emotion-0"
    />
  `);

  expect(TestRenderer.create(<Box px="1px" py="2px" mx="3px" my="4px" />))
    .toMatchInlineSnapshot(`
    .emotion-0 {
      box-sizing: border-box;
      min-width: 0;
      min-height: 0;
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
      className="emotion-0"
    />
  `);

  expect(
    TestRenderer.create(
      <Box
        pt="1px"
        pr="2px"
        pb="3px"
        pl="4px"
        mt="5px"
        mr="6px"
        mb="7px"
        ml="8px"
      />
    ).toJSON()
  ).toMatchInlineSnapshot(`
    .emotion-0 {
      box-sizing: border-box;
      min-width: 0;
      min-height: 0;
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
      className="emotion-0"
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
      className="emotion-0"
    />
  `);

  expect(TestRenderer.create(<Box ph={1} pv={2} mh={3} mv={4} />).toJSON())
    .toMatchInlineSnapshot(`
    .emotion-0 {
      box-sizing: border-box;
      min-width: 0;
      min-height: 0;
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
      className="emotion-0"
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
      className="emotion-0"
    />
  `);

  expect(TestRenderer.create(<Box p={-10} m={10} />).toJSON())
    .toMatchInlineSnapshot(`
    .emotion-0 {
      box-sizing: border-box;
      min-width: 0;
      min-height: 0;
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
      className="emotion-0"
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
      width: 50%;
      height: 100%;
    }

    @media screen and (min-width: 48em) {
      .emotion-0 {
        width: 100%;
        height: 50%;
      }
    }

    @media screen and (min-width: 80em) {
      .emotion-0 {
        height: 25%;
      }
    }

    @media screen and (min-width: 120em) {
      .emotion-0 {
        height: 12.5%;
      }
    }

    <div
      className="emotion-0"
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
      width: 100%;
    }

    @media screen and (min-width: 48em) {
      .emotion-0 {
        width: 50%;
      }
    }

    @media screen and (min-width: 80em) {
      .emotion-0 {
        width: 25%;
      }
    }

    @media screen and (min-width: 120em) {
      .emotion-0 {
        width: 12.5%;
      }
    }

    <div
      className="emotion-0"
    />
  `);
});

test("support flex item properties", () => {
  expect(
    TestRenderer.create(
      <Box
        flexGrow={2}
        flexShrink={3}
        flexBasis={100}
        justifySelf="center"
        alignSelf="flex-end"
        order={2}
      />
    ).toJSON()
  ).toMatchInlineSnapshot(`
    .emotion-0 {
      box-sizing: border-box;
      min-width: 0;
      min-height: 0;
      -webkit-box-flex: 2;
      -webkit-flex-grow: 2;
      -ms-flex-positive: 2;
      flex-grow: 2;
      -webkit-flex-shrink: 3;
      -ms-flex-negative: 3;
      flex-shrink: 3;
      -webkit-flex-basis: 100px;
      -ms-flex-preferred-size: 100px;
      flex-basis: 100px;
      justify-self: center;
      -webkit-align-self: flex-end;
      -ms-flex-item-align: flex-end;
      align-self: flex-end;
      -webkit-order: 2;
      -ms-flex-order: 2;
      order: 2;
    }

    <div
      className="emotion-0"
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
      -webkit-align-items: center;
      -webkit-box-align: center;
      -ms-flex-align: center;
      align-items: center;
      -webkit-align-content: flex-end;
      -ms-flex-line-pack: flex-end;
      align-content: flex-end;
      justify-items: flex-start;
      -webkit-box-pack: stretch;
      -ms-flex-pack: stretch;
      -webkit-justify-content: stretch;
      justify-content: stretch;
      -webkit-box-flex-wrap: wrap;
      -webkit-flex-wrap: wrap;
      -ms-flex-wrap: wrap;
      flex-wrap: wrap;
      -webkit-flex-direction: column;
      -ms-flex-direction: column;
      flex-direction: column;
    }

    <div
      className="emotion-0"
    />
  `);
});

test("pass is prop to render element other than div", () => {
  expect(
    TestRenderer.create(
      <div>
        <Box as="header" />
        <Flex as="section" />
      </div>
    ).toJSON()
  ).toMatchInlineSnapshot(`
    .emotion-0 {
      box-sizing: border-box;
      min-width: 0;
      min-height: 0;
    }

    .emotion-1 {
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
        className="emotion-0"
      />
      <section
        className="emotion-1"
      />
    </div>
  `);
});

test("css prop overrides props", () => {
  expect(
    TestRenderer.create(
      <div>
        <Flex width={1 / 2} css={{ minWidth: 100, width: 200, height: 300 }} />
        <Box width={1 / 2} css={{ minWidth: 100, width: 200, height: 300 }} />
      </div>
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
      width: 50%;
      min-width: 100px;
      width: 200px;
      height: 300px;
    }

    .emotion-1 {
      box-sizing: border-box;
      min-width: 0;
      min-height: 0;
      width: 50%;
      min-width: 100px;
      width: 200px;
      height: 300px;
    }

    <div>
      <div
        className="emotion-0"
      />
      <div
        className="emotion-1"
      />
    </div>
  `);
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

    .emotion-1 {
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
        className="custom-class-box emotion-0"
      />
      <div
        className="custom-class-flex emotion-1"
      />
    </div>
  `);
});

test("system media allow to pass responsive styles to css prop and emotion css()", () => {
  const App = () => {
    const { media } = useSystem();

    return (
      <div css={media({ display: ["block", "none"], color: "#fff" })}>
        <Box css={media({ overflow: ["hidden", "auto"], color: "#000" })} />
      </div>
    );
  };

  expect(TestRenderer.create(<App />).toJSON()).toMatchInlineSnapshot(`
    .emotion-0 {
      display: block;
      color: #fff;
    }

    @media screen and (min-width: 48em) {
      .emotion-0 {
        display: none;
      }
    }

    .emotion-1 {
      box-sizing: border-box;
      min-width: 0;
      min-height: 0;
      overflow: hidden;
      color: #000;
    }

    @media screen and (min-width: 48em) {
      .emotion-1 {
        overflow: auto;
      }
    }

    <div
      className="emotion-0"
    >
      <div
        className="emotion-1"
      />
    </div>
  `);
});

test("system media allow to pass array of rules", () => {
  const App = () => {
    const { media } = useSystem();

    return (
      <div
        css={media([
          { display: "block", color: "#fff" },
          { display: "none", color: "#000" },
          { display: "flex", color: "#666" },
        ])}
      >
        <Box
          css={media([
            { overflow: "hidden", color: "#000" },
            { overflow: "auto", color: "#fff" },
            { overflow: "scroll", color: "#888" },
          ])}
        />
      </div>
    );
  };

  expect(TestRenderer.create(<App />).toJSON()).toMatchInlineSnapshot(`
    .emotion-0 {
      display: block;
      color: #fff;
    }

    @media screen and (min-width: 48em) {
      .emotion-0 {
        display: none;
        color: #000;
      }
    }

    @media screen and (min-width: 80em) {
      .emotion-0 {
        display: -webkit-box;
        display: -webkit-flex;
        display: -ms-flexbox;
        display: flex;
        color: #666;
      }
    }

    .emotion-1 {
      box-sizing: border-box;
      min-width: 0;
      min-height: 0;
      overflow: hidden;
      color: #000;
    }

    @media screen and (min-width: 48em) {
      .emotion-1 {
        overflow: auto;
        color: #fff;
      }
    }

    @media screen and (min-width: 80em) {
      .emotion-1 {
        overflow: scroll;
        color: #888;
      }
    }

    <div
      className="emotion-0"
    >
      <div
        className="emotion-1"
      />
    </div>
  `);
});

// TODO add better tests
test("system responsive allows to get value in system like style", () => {
  let result;
  const App = () => {
    const responsive = useResponsive();
    result = responsive([1, 2, 3, 4]);
    return null;
  };

  const element = document.createElement("div");
  ReactDOM.render(<App />, element);

  expect(result).toEqual(1);
});

test("media util allow to pass responsive styles to css prop and emotion css()", () => {
  const App = () => {
    const { media } = useSystem();
    return (
      <div css={media({ display: ["block", "none"], color: "#fff" })}>
        <Box css={media({ overflow: ["hidden", "auto"], color: "#000" })} />
      </div>
    );
  };

  expect(TestRenderer.create(<App />).toJSON()).toMatchInlineSnapshot(`
    .emotion-0 {
      display: block;
      color: #fff;
    }

    @media screen and (min-width: 48em) {
      .emotion-0 {
        display: none;
      }
    }

    .emotion-1 {
      box-sizing: border-box;
      min-width: 0;
      min-height: 0;
      overflow: hidden;
      color: #000;
    }

    @media screen and (min-width: 48em) {
      .emotion-1 {
        overflow: auto;
      }
    }

    <div
      className="emotion-0"
    >
      <div
        className="emotion-1"
      />
    </div>
  `);
});

test("media util do not mutate styles with rules", () => {
  const style1 = { display: "block" };
  const style2 = { display: "none" };
  const App = () => {
    const { media } = useSystem();
    return <Box css={media([style1, style2])} />;
  };
  TestRenderer.create(<App />);
  expect(style1).toEqual({ display: "block" });
  expect(style2).toEqual({ display: "none" });
});

test("media util should be stable after rerender", () => {
  let lastMedia;
  const App = () => {
    const { media } = useSystem();
    lastMedia = media;
    return null;
  };
  const root = TestRenderer.create(<App />);
  const media1 = lastMedia;
  root.update(<App />);
  const media2 = lastMedia;
  expect(media1).toBe(media2);
});

test("zero paddings and margins are applied correctly", () => {
  expect(TestRenderer.create(<Box m={0} p={0} />)).toMatchInlineSnapshot(`
    .emotion-0 {
      box-sizing: border-box;
      min-width: 0;
      min-height: 0;
      padding-top: 0;
      padding-right: 0;
      padding-bottom: 0;
      padding-left: 0;
      margin-top: 0;
      margin-right: 0;
      margin-bottom: 0;
      margin-left: 0;
    }

    <div
      className="emotion-0"
    />
  `);
});

test("system paddings allows to use theme for any component", () => {
  const Component = () => {
    const { pt, pr, pb, pl, px, py, p } = useSystem();
    return (
      <div>
        <div css={[pt(1), pr(2), pb(3), pl(4)]} />
        <div css={[px(1), py(2)]} />
        <div css={[p(1)]} />
      </div>
    );
  };
  expect(TestRenderer.create(<Component />)).toMatchInlineSnapshot(`
    .emotion-0 {
      padding-top: 4px;
      padding-right: 8px;
      padding-bottom: 16px;
      padding-left: 32px;
    }

    .emotion-1 {
      padding-left: 4px;
      padding-right: 4px;
      padding-top: 8px;
      padding-bottom: 8px;
    }

    .emotion-2 {
      padding-top: 4px;
      padding-right: 4px;
      padding-bottom: 4px;
      padding-left: 4px;
    }

    <div>
      <div
        className="emotion-0"
      />
      <div
        className="emotion-1"
      />
      <div
        className="emotion-2"
      />
    </div>
  `);
});

test("system margins allows to use theme for any component", () => {
  const Component = () => {
    const { mt, mr, mb, ml, mx, my, m } = useSystem();
    return (
      <div>
        <div css={[mt(1), mr(2), mb(3), ml(4)]} />
        <div css={[mx(1), my(2)]} />
        <div css={[m(1)]} />
      </div>
    );
  };
  expect(TestRenderer.create(<Component />)).toMatchInlineSnapshot(`
    .emotion-0 {
      margin-top: 4px;
      margin-right: 8px;
      margin-bottom: 16px;
      margin-left: 32px;
    }

    .emotion-1 {
      margin-left: 4px;
      margin-right: 4px;
      margin-top: 8px;
      margin-bottom: 8px;
    }

    .emotion-2 {
      margin-top: 4px;
      margin-right: 4px;
      margin-bottom: 4px;
      margin-left: 4px;
    }

    <div>
      <div
        className="emotion-0"
      />
      <div
        className="emotion-1"
      />
      <div
        className="emotion-2"
      />
    </div>
  `);
});
