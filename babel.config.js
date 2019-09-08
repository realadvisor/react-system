module.exports = {
  presets: ["@babel/flow", "@babel/react", ["@babel/env", { loose: true }]],
  env: {
    next: {
      presets: ["next/babel"]
    }
  }
};
