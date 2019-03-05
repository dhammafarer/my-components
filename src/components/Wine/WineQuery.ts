import { graphql } from "gatsby";

export const query = graphql`
  fragment WineQueryFragment on Wines {
    origin
    kind
    image {
      childImageSharp {
        fluid(maxWidth: 300) {
          ...GatsbyImageSharpFluid
        }
      }
    }
    name
    originalId
    winery {
      originalId
      name
      country
      fields {
        slug
      }
    }
    pairing
    aging
    nose
    mouth
    variety
    eye
    awards {
      title
      image {
        childImageSharp {
          fixed(width: 36) {
            ...GatsbyImageSharpFixed
          }
        }
      }
    }
  }
`;
