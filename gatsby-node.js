"use strict";

require("source-map-support").install();
require("ts-node").register({
  compilerOptions: {
    module: "commonjs",
    target: "es2017",
  },
});

const {
  onCreatePage,
  onCreateNode,
  sourceNodes,
  createPages,
} = require("./gatsby-node/index.ts");

exports.onCreatePage = onCreatePage;
exports.sourceNodes = sourceNodes;
exports.onCreateNode = onCreateNode;
exports.createPages = createPages;
