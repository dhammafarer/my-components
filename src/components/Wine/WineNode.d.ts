interface Promotion {
  fields: {
    slug: string;
  };
  frontmatter: {
    title: string;
    buttonText: string;
  };
}

export interface WineNode {
  node: {
    fields: {
      slug: string;
    };
    originalId: string;
    name: string;
    kind: string;
    year: string;
    wineId: string;
    promotions: Promotion[];
    winery: {
      originalId: string;
      name: string;
      fields: {
        slug: string;
      };
    };
    image: any;
  };
}
