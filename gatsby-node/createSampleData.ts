import { GatsbySourceNodesProps } from "./types";
import { createRemoteFileNode } from "gatsby-source-filesystem";
import faker from "faker";

const replicate = (fn, n) =>
  Array(n)
    .fill(fn)
    .map(x => x());

export const createSampleData = ({
  actions,
  store,
  cache,
  getNodes,
  getNode,
  createNodeId,
  createContentDigest,
}: GatsbySourceNodesProps) => {
  const { createNode } = actions;

  const createSettings = () => {
    const content = {
      title: faker.company.companyName(),
      lang: "en",
      pageName: "index",
      nav: [{ to: "/", label: "Home" }],
      contacts: [
        {
          name: faker.company.bsNoun(),
          email: faker.internet.email(),
          phone: faker.phone.phoneNumber(),
          address: {
            street: faker.address.streetName(),
            district: faker.address.county(),
            city: faker.address.city(),
            country: faker.address.country(),
          },
        },
      ],
    };

    const nodeMeta = {
      id: createNodeId(faker.random.uuid()),
      parent: null,
      children: [],
      internal: {
        type: `SettingsYaml`,
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
      const node = Object.assign({}, content, nodeMeta, { logo___NODE: x.id });
      createNode(node);
      return node;
    });
  };

  const createWinery = () => {
    const content = {
      name: faker.company.companyName(),
    };

    const nodeMeta = {
      id: createNodeId(faker.random.uuid()),
      parent: null,
      children: [],
      internal: {
        type: `WineriesYaml`,
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
        type: `AwardsYaml`,
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
        type: `WinesYaml`,
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
    .then(() => createSettings());
};
