import path from "path";
import { GatsbyCreatePages } from "./types";
import { languages } from "../src/i18n";

export const createPages: GatsbyCreatePages = ({ actions, graphql }) => {
  const { createPage } = actions;

  return graphql(`
    {
      allWineries {
        edges {
          node {
            lang
            fields {
              slug
            }
          }
        }
      }
      allWines(limit: 1000) {
        edges {
          node {
            lang
            fields {
              slug
            }
          }
        }
      }
    }
  `)
    .then((result: any) => {
      if (result.errors) {
        return Promise.reject(result.errors);
      }

      result.data.allWineries.edges.forEach(({ node }: any) => {
        createPage({
          path: "/" + node.lang + node.fields.slug,
          component: path.resolve(`src/templates/wineryTemplate.tsx`),
          context: {
            languages,
            locale: node.lang,
            slug: node.fields.slug,
          },
        });
      });
      return result;
    })
    .then((result: any) => {
      result.data.allWines.edges.forEach(({ node }: any) => {
        createPage({
          path: "/" + node.lang + node.fields.slug,
          component: path.resolve(`src/templates/wineTemplate.tsx`),
          context: {
            languages,
            locale: node.lang,
            slug: node.fields.slug,
          },
        });
      });
      return result;
    });
};
