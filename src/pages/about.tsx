import * as React from "react";
import { Layout } from "../components/Layout";
import { withIntl } from "../i18n/withIntl";
import { Box, Flex } from "primithemes";
import { PageHeader } from "src/components/Page";
import { Container } from "../components/Container";
import { Image } from "../components/Image";
import { Content } from "src/components/Content";

export interface Props {
  data: {
    content: {
      title: string;
      image: any;
      markdown: any;
    };
  };
}

const content = {
  title: "About Us",
  image: null,
  markdown: "<p>text</p>",
};
const AboutPage: React.SFC<Props> = () => {
  return (
    <Layout>
      <PageHeader title={content.title} />
      <Container>
        <Flex bg="background.light" flexDirection={["column", "column", "row"]}>
          <Box w={[1, 1, 1 / 2]} p={[0, 0, 3]}>
            <Image fluid={content.image} />
          </Box>
          <Box w={[1, 1, 1 / 2]} py={3} px={[3, 3, 4]}>
            <Content dangerouslySetInnerHTML={{ __html: content.markdown }} />
          </Box>
        </Flex>
      </Container>
    </Layout>
  );
};

export default withIntl(AboutPage);
