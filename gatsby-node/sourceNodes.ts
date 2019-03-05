import { GatsbySourceNodes } from "./types";
import { languages } from "../src/i18n";
import { mergeTranslation } from "./helpers";
import { createSampleData } from "./createSampleData";

export const sourceNodes: GatsbySourceNodes = props => {
  const { actions, getNodes, createNodeId, createContentDigest } = props;
  const { createNode } = actions;

  return createSampleData(props).then(() => {
    languages.forEach(({ code }) => {
      // add translations to awards
      getNodes()
        .filter(n1 => n1.internal.type === "AwardsYamlX")
        .forEach(awardNode => {
          const intl = getNodes().find(
            t =>
              t.internal.type === "AwardTranslationsYaml" &&
              t.award === awardNode.originalId &&
              t.lang === code
          );

          const { id, parent, children, internal, ...content } = Object.assign(
            { lang: code },
            mergeTranslation(awardNode, intl)
          );

          const nodeMeta = {
            id: createNodeId(`${awardNode.id}-${code}`),
            parent: awardNode.parent,
            children: [],
            internal: {
              type: `Awards`,
              content: JSON.stringify(content),
              contentDigest: createContentDigest(content),
            },
          };
          const node = Object.assign({}, content, nodeMeta);
          createNode(node);
        });

      // add translations to wineries
      getNodes()
        .filter(n1 => n1.internal.type === "WineriesYamlX")
        .forEach(wineryNode => {
          const intl = getNodes().find(
            t =>
              t.internal.type === "WineryTranslationsYamlX" &&
              t.lang === code &&
              t.winery === wineryNode.originalId
          );
          const { id, parent, children, internal, ...content } = Object.assign(
            { wineryId: wineryNode.id, lang: code },
            mergeTranslation(wineryNode, intl)
          );
          const nodeMeta = {
            id: createNodeId(`${wineryNode.id}-${code}`),
            parent: wineryNode.parent,
            children: [],
            internal: {
              type: `Wineries`,
              content: JSON.stringify(content),
              contentDigest: createContentDigest(content),
            },
          };

          const node = Object.assign({}, content, nodeMeta);
          createNode(node);
        });

      // add translations to wines
      getNodes()
        .filter(n1 => n1.internal.type === "WinesYamlX")
        .forEach(wineNode => {
          const intl = getNodes().find(
            t =>
              t.internal.type === "WineTranslationsYamlX" &&
              t.wine === wineNode.originalId &&
              t.lang === code
          );

          const winery = getNodes().find(
            n =>
              n.internal.type === "Wineries" &&
              n.originalId === wineNode.winery &&
              n.lang === code
          );

          const awards = wineNode.awards.map((a: any) => {
            const node = getNodes().find(
              n =>
                n.internal.type === "Awards" &&
                n.originalId === a &&
                n.lang === code
            );
            return node ? node.id : "";
          });

          const promotions = getNodes()
            .filter(
              n =>
                n.internal.type === "MarkdownRemark" &&
                n.fields.type === "promotions" &&
                n.frontmatter.lang === code &&
                new Date(n.frontmatter.dateEnd).valueOf() >=
                  new Date().valueOf() &&
                (n.frontmatter.wines.includes(wineNode.originalId) ||
                  n.frontmatter.kinds.includes(wineNode.kind) ||
                  n.frontmatter.wineries.includes(wineNode.winery))
            )
            .map(p => p.id);

          const { id, parent, children, internal, ...content } = Object.assign(
            { wineId: wineNode.id, lang: code },
            mergeTranslation(wineNode, intl),
            { winery: winery ? winery.id : "", awards, promotions }
          );

          const nodeMeta = {
            id: createNodeId(`${wineNode.id}-${code}`),
            parent: wineNode.parent,
            children: [],
            internal: {
              type: `Wines`,
              content: JSON.stringify(content),
              contentDigest: createContentDigest(content),
            },
          };
          const node = Object.assign({}, content, nodeMeta);
          createNode(node);
        });

      // add translations to events
      getNodes()
        .filter(n1 => n1.internal.type === "EventsJson")
        .forEach(eventNode => {
          const md = getNodes().find(
            t =>
              t.internal.type === "MarkdownRemark" &&
              t.frontmatter.event === eventNode.eventId &&
              t.frontmatter.lang === code
          );

          const { id, parent, children, internal, ...content } = Object.assign(
            {},
            eventNode,
            { md: md.id }
          );

          const nodeMeta = {
            id: createNodeId(`${eventNode.id}-${code}`),
            parent: eventNode.parent,
            children: [],
            internal: {
              type: `Events`,
              content: JSON.stringify(content),
              contentDigest: createContentDigest(content),
            },
          };
          const node = Object.assign({}, content, nodeMeta);
          createNode(node);
        });
    });
  });
};
