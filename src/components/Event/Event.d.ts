export interface EventNode {
  node: {
    fields: {
      slug: string;
    };
    frontmatter: {
      title: string;
      subtitle: string;
      address: string;
      dateStart: string;
      dateEnd: string;
      image: any;
    };
    htmlAst: any;
    html: any;
  };
}
