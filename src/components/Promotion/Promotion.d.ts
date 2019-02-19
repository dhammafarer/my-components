export interface Promotion {
  fields: {
    slug: string;
    lang: string;
  };
  frontmatter: {
    title: string;
    subtitle: string;
    buttonText: string;
    dateStart: string;
    dateEnd: string;
    wines: string[];
    wineries: string[];
    kinds: string[];
    image: any;
  };
  htmlAst: any;
  html: any;
}
