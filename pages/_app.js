// @flow

import * as React from "react";
import App from "next/app";
import { hydrate } from "emotion";

export default class CustomApp extends App {
  constructor(props: any) {
    super(props);
    // https://github.com/emotion-js/emotion/blob/108d78aa176aedfddc0854ebe4049847a9ac2a9b/docs/ssr.md#hydrate
    if (typeof window !== "undefined") {
      hydrate(window.__NEXT_DATA__.ids);
    }
  }

  render() {
    const { Component, pageProps } = this.props;
    return <Component {...pageProps} />;
  }
}
