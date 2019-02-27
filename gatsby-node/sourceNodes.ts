import { GatsbySourceNodes } from "./types";
import faker from "faker";
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
      title: faker.company.companyName(),
    };

    const nodeMeta = {
      id: createNodeId(faker.random.uuid()),
      parent: null,
      children: [],
      internal: {
        type: `Wineries`,
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
    const content = {
      title: faker.company.companyName(),
    };

    const nodeMeta = {
      id: createNodeId(faker.random.uuid()),
      parent: null,
      children: [],
      internal: {
        type: `Awards`,
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
        type: `Wines`,
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

  return Promise.all(replicate(createWinery, 3)).then(wineries =>
    Promise.all(replicate(createAward, 5)).then(awards => {
      return Promise.all(replicate(createWine(wineries, awards), 3));
    })
  );
};

function replicate(fn, n) {
  return Array(n)
    .fill(fn)
    .map(x => x());
}
