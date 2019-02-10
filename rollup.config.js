import babel from "rollup-plugin-babel";
import { sizeSnapshot } from "rollup-plugin-size-snapshot";
import pkg from "./package.json";

const external = id => !id.startsWith(".") && !id.startsWith("/");

export default [
  {
    input: "./src/system.js",
    output: { file: pkg.main, format: "cjs" },
    external,
    plugins: [babel()]
  },
  {
    input: "./src/system.js",
    output: { file: pkg.module, format: "esm" },
    external,
    plugins: [
      babel({
        runtimeHelpers: true,
        plugins: [["@babel/transform-runtime", { useESModules: true }]]
      }),
      sizeSnapshot()
    ]
  }
];
