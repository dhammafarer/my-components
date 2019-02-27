interface Promotion {
  fields: {
    slug: string;
  };
  frontmatter: {
    title: string;
    buttonText: string;
  };
}

export interface Wine {
  fields: {
    slug: string;
  };
  originalId: string;
  name: string;
  kind: string;
  origin: string;
  year: string;
  eye: string;
  mouth: string;
  nose: string;
  pairing: string;
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
}
