const path = require("path");
const siteMetadata = require("./src/data/siteMetadata");

const dev = process.env.NODE_ENV === "development";

const config = {
  siteMetadata,
  mapping: {
    "Wines.winery": "Wineries.id",
    "Wines.awards": "Awards",
  },
};

const devPlugins = [
  {
    resolve: "gatsby-plugin-google-analytics",
    options: {
      trackingId: "UA-132868959-1",
    },
  },
  "gatsby-plugin-react-helmet",
  {
    resolve: "gatsby-plugin-favicon",
    options: {
      logo: "./static/assets/uploads/logo.png",
    },
  },
  {
    resolve: `gatsby-plugin-manifest`,
    options: {
      name: "valen-international",
      short_name: "valen",
      start_url: "/",
      background_color: "#336699",
      theme_color: "#663399",
      display: "minimal-ui",
      icon: "./static/assets/uploads/logo.png",
    },
  },
  "gatsby-plugin-offline",
  "gatsby-plugin-typescript",
  {
    resolve: "gatsby-source-filesystem",
    options: {
      path: `${__dirname}/static/assets/`,
      name: "assets",
    },
  },
  {
    resolve: "gatsby-source-filesystem",
    options: {
      path: `${__dirname}/src/images/`,
      name: "images",
    },
  },
  "gatsby-plugin-sharp",
  "gatsby-plugin-netlify-cms",
  "gatsby-plugin-root-import",
  "gatsby-plugin-styled-components",
  "gatsby-transformer-sharp",
  "gatsby-transformer-javascript-frontmatter",
  "gatsby-transformer-remark",
  "gatsby-transformer-json",
  "gatsby-transformer-yaml",
];

const productionPlugins = [
  {
    resolve: "gatsby-source-filesystem",
    options: {
      path: `${__dirname}/src/data/content`,
      name: "content",
    },
  },
];

const plugins = dev ? devPlugins : devPlugins.concat(productionPlugins);

module.exports = Object.assign({}, config, { plugins });
