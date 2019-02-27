import * as React from "react";
import { graphql } from "gatsby";
import { Layout } from "../components/Layout";
import { withIntl } from "../i18n";
import { WinePage } from "../components/Wine/WinePage";

interface WineTemplateProps {
  pageContext: {
    locale: string;
  };
  data: {
    wines: any;
  };
}

const WineTemplate: React.SFC<WineTemplateProps> = ({ data: { wines } }) => {
  console.log(wines);
  return <Layout>{true && <WinePage wine={wines.edges[1].node} />}</Layout>;
};

export default withIntl(WineTemplate);

export const query = graphql`
  query($locale: String!) {
    wines: allWines(filter: { lang: { eq: $locale } }) {
      edges {
        node {
          name
          year
          image {
            childImageSharp {
              fluid(maxWidth: 1400) {
                ...GatsbyImageSharpFluid
              }
            }
          }
          awards {
            title
            image {
              childImageSharp {
                fixed(width: 128) {
                  ...GatsbyImageSharpFixed
                }
              }
            }
          }
        }
      }
    }
  }
`;
