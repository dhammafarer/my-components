import { GatsbyOnCreateNode } from "./types";
import { processStringProperties, replaceAssetPath } from "./helpers";
import MarkdownIt from "markdown-it";
import slugify from "slugify";

const md = new MarkdownIt();

const renderMarkdown = (v: string, k?: string) => {
  return k === "markdown" ? md.render(v) : v;
};

export const onCreateNode: GatsbyOnCreateNode = ({
  node,
  getNode,
  actions,
  createNodeId,
  createContentDigest,
}) => {
  const { createNodeField, createNode, createParentChildLink } = actions;

  // Create Content nodes
  if (node.internal.owner === "gatsby-transformer-yaml") {
    const { id, parent, children, internal, ...nodeContent } = Object.assign(
      {},
      node
    );

    const { absolutePath } = getNode(parent);

    const content = Object.assign(
      { originalId: node.id },
      processStringProperties(
        [renderMarkdown, replaceAssetPath(absolutePath)],
        nodeContent
      )
    );

    const nodeMeta = {
      id: createNodeId(`${node.id}`),
      parent: node.parent,
      children: [],
      internal: {
        type: node.internal.type + "X",
        content: JSON.stringify(content),
        contentDigest: createContentDigest(content),
      },
    };
    const newNode = Object.assign({}, content, nodeMeta);
    createNode(newNode);
    createParentChildLink({ parent: node, child: newNode });
  }

  if (node.internal.type === "ContentYamlX") {
    const [pageName, lang] = getNode(node.parent).name.split(".");
    createNodeField({ node, name: "lang", value: lang });
    createNodeField({ node, name: "pageName", value: pageName });
  }

  if (node.internal.type === "SettingsYamlX") {
    const [, lang] = getNode(node.parent).name.split(".");
    createNodeField({ node, name: "lang", value: lang });
  }

  if (node.internal.type === "Wines") {
    const slug = "/wines/" + slugify(node.name, { lower: true });
    createNodeField({ node, name: "slug", value: slug });
  }

  if (node.internal.type === "Wineries") {
    const slug = "/wineries/" + slugify(node.name, { lower: true });
    createNodeField({ node, name: "slug", value: slug });
  }

  if (node.internal.type === "MarkdownRemark") {
    const parent = getNode(node.parent);
    node.frontmatter = processStringProperties(
      [replaceAssetPath(parent.absolutePath)],
      node.frontmatter
    );
    const type = parent.sourceInstanceName;
    const slug = "/" + [type, parent.name].join("/");
    const lang = node.frontmatter.lang;

    createNodeField({ node, name: "type", value: type });
    createNodeField({ node, name: "lang", value: lang });
    createNodeField({ node, name: "slug", value: slug });
  }
};