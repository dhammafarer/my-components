import * as React from "react";
import { Promotion } from "./Promotion.d";
import { Text } from "src/components/Typography";
import { Button } from "src/components/Button";
import { Flex, Card, Box, styled } from "primithemes";
import { Image } from "src/components/Image";
import { Container } from "src/components/Container";
import { Link } from "src/components/Link";

interface Props {
  promo: Promotion;
}

const Wrapper = styled(Box)`
  background: linear-gradient(
    45deg,
    ${props => props.theme.colors.grey[300]},
    transparent
  );
`;

const PromoSection: React.SFC<Props> = ({ promo: { frontmatter, fields } }) => {
  return (
    <Wrapper py={[0, 4]} px={[0, 3]}>
      <Container>
        <Card
          shadow={1}
          flexDirection="row"
          p={[0, 4]}
          bg="white.light"
          radius={1}
          flexWrap="wrap"
        >
          <Flex bg="green" w={[1, 1, 1, 1 / 2]}>
            <Card
              w={1}
              b={[0, 0, 1, 0, 1]}
              borderColor={["transparent", "grey.200"]}
              p={[0, 0, 4, 0, 4]}
              bg="white.light"
            >
              <Link to={fields.slug}>
                <Image
                  fluid={frontmatter.image}
                  style={{ minHeight: "400px", width: "100%", height: "100%" }}
                />
              </Link>
            </Card>
          </Flex>
          <Flex pl={3} w={[1, 1, 1, 1 / 2]}>
            <Card p={3} w={1} alignItems="center" justifyContent="center">
              <Text
                is="h1"
                color="text.dark"
                fontWeight={6}
                fontSize={6}
                textTransform="uppercase"
                textAlign="center"
                my={1}
              >
                {frontmatter.title}
              </Text>
              <Text
                my={1}
                is="h5"
                fontSize={3}
                color="text.main"
                textAlign="center"
              >
                {frontmatter.subtitle}
              </Text>
              <Box my={2}>
                <Button to={fields.slug} variant="secondary" contained>
                  {frontmatter.buttonText}
                </Button>
              </Box>
            </Card>
          </Flex>
        </Card>
      </Container>
    </Wrapper>
  );
};

export { PromoSection };
