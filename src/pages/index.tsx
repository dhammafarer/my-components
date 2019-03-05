import * as React from "react";
import { injectIntl, InjectedIntlProps } from "react-intl";
import { Layout } from "../components/Layout";
import { withIntl } from "../i18n/withIntl";
import { graphql } from "gatsby";
import { Box, Flex } from "primithemes";
import { Image } from "src/components/Image";
import { Container } from "src/components/Container";
import { Content } from "src/components/Content";
import { PageHeader } from "src/components/Page";

export interface IndexPageProps {
  pageContext: {
    locale: string;
  };
  data: {
    content: {
      title: string;
      subtitle: string;
      image: any;
      markdown: string;
    };
  };
}

type Props = IndexPageProps & InjectedIntlProps;

const IndexPage: React.SFC<Props> = ({ pageContext, intl, data }) => {
  return (
    <Layout>
      <Box style={{ borderTop: "3px solid red" }}>
        <PageHeader
          title={data.content.title}
          subtitle={data.content.subtitle}
          variant="light"
        />
      </Box>
      <Container>
        <Flex bg="background.light" flexDirection={["column", "column", "row"]}>
          <Box w={[1, 1, 1 / 2]} p={[0, 0, 3]}>
            <Image fluid={data.content.image} />
          </Box>
          <Box w={[1, 1, 1 / 2]} py={3} px={[3, 3, 4]}>
            <Content
              dangerouslySetInnerHTML={{ __html: data.content.markdown }}
            />
          </Box>
        </Flex>
      </Container>
    </Layout>
  );
};

export default withIntl(injectIntl(IndexPage));

export const query = graphql`
  query ContactPageQuery($locale: String!) {
    content: contentYamlX(
      fields: { lang: { eq: $locale }, pageName: { eq: "index" } }
    ) {
      title
      subtitle
      markdown
      image {
        childImageSharp {
          fluid(maxWidth: 1400) {
            ...GatsbyImageSharpFluid
          }
        }
      }
    }
  }
`;
