import { GatsbySourceNodes } from "./types";
import faker from "faker";
import { languages } from "../src/i18n";
import { mergeTranslation } from "./helpers";
import { createRemoteFileNode } from "gatsby-source-filesystem";

export const sourceNodes: GatsbySourceNodes = ({
  actions,
  store,
  cache,
  getNodes,
  getNode,
  createNodeId,
  createContentDigest,
}) => {
  const { createNode } = actions;

  const createWinery = () => {
    const content = {
      name: faker.company.companyName(),
    };

    const nodeMeta = {
      id: createNodeId(faker.random.uuid()),
      parent: null,
      children: [],
      internal: {
        type: `WineriesYamlX`,
        content: JSON.stringify(content),
        contentDigest: createContentDigest(content),
      },
    };
    return createRemoteFileNode({
      url: faker.image.image(),
      parentNodeId: nodeMeta.id,
      store,
      cache,
      createNode,
      createNodeId,
    }).then((x: any) => {
      const node = Object.assign({}, content, nodeMeta, { image___NODE: x.id });
      createNode(node);
      return node;
    });
  };

  const createAward = () => {
    const id = createNodeId(faker.random.uuid());
    const content = {
      title: faker.company.companyName(),
      originalId: id,
    };

    const nodeMeta = {
      id,
      parent: null,
      children: [],
      internal: {
        type: `AwardsYamlX`,
        content: JSON.stringify(content),
        contentDigest: createContentDigest(content),
      },
    };
    return createRemoteFileNode({
      url: faker.image.avatar(),
      parentNodeId: nodeMeta.id,
      store,
      cache,
      createNode,
      createNodeId,
    }).then((x: any) => {
      const node = Object.assign({}, content, nodeMeta, { image___NODE: x.id });
      createNode(node);
      return node;
    });
  };

  const createWine = (wineries: any[], awards: any[]) => () => {
    const content = {
      winery: faker.random.arrayElement(wineries).id,
      awards: [faker.random.arrayElement(awards).id],
      name: faker.commerce.productName(),
      kind: faker.random.arrayElement(["white", "red", "sparkling"]),
      year: faker.date
        .past(30)
        .getFullYear()
        .toString(),
      origin: faker.address.city(),
      eye: faker.lorem.paragraph(),
      nose: faker.lorem.paragraph(),
      mouth: faker.lorem.paragraph(),
      pairing: faker.lorem.paragraph(),
      wineId: faker.lorem.word(),
      promotions: [],
    };

    const nodeMeta = {
      id: createNodeId(faker.random.uuid()),
      parent: null,
      children: [],
      internal: {
        type: `WinesYamlX`,
        content: JSON.stringify(content),
        contentDigest: createContentDigest(content),
      },
    };
    return createRemoteFileNode({
      url: faker.image.image(),
      parentNodeId: nodeMeta.id,
      store,
      cache,
      createNode,
      createNodeId,
    }).then((x: any) => {
      const node = Object.assign({}, content, nodeMeta, { image___NODE: x.id });
      createNode(node);
      return node;
    });
  };

  return Promise.all(replicate(createWinery, 3))
    .then(wineries =>
      Promise.all(replicate(createAward, 5)).then(awards => {
        return Promise.all(replicate(createWine(wineries, awards), 3));
      })
    )
    .then(() => {
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

            const {
              id,
              parent,
              children,
              internal,
              ...content
            } = Object.assign(
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
            const {
              id,
              parent,
              children,
              internal,
              ...content
            } = Object.assign(
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

            const {
              id,
              parent,
              children,
              internal,
              ...content
            } = Object.assign(
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

            const {
              id,
              parent,
              children,
              internal,
              ...content
            } = Object.assign({}, eventNode, { md: md.id });

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

function replicate(fn, n) {
  return Array(n)
    .fill(fn)
    .map(x => x());
}
