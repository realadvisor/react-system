import babel from "rollup-plugin-babel";
import { sizeSnapshot } from "rollup-plugin-size-snapshot";
import pkg from "./package.json";

const external = id => !id.startsWith(".") && !id.startsWith("/");

export default [
  {
    input: "./src/system.js",
    output: { file: pkg.main, format: "cjs" },
    external,
    plugins: [
      babel({
        configFile: false,
        presets: [
          ["@babel/env", { loose: true }],
          "@babel/react",
          "@babel/flow"
        ]
      })
    ]
  },
  {
    input: "./src/system.js",
    output: { file: pkg.module, format: "esm" },
    external,
    plugins: [
      babel({
        configFile: false,
        runtimeHelpers: true,
        presets: [
          ["@babel/env", { loose: true }],
          "@babel/react",
          "@babel/flow"
        ],
        plugins: [["@babel/transform-runtime", { useESModules: true }]]
      }),
      sizeSnapshot()
    ]
  }
];
