import * as React from "react";
import { Promotion } from "./Promotion.d";
import { Text } from "src/components/Typography";
import { Button } from "src/components/Button";
import { Flex, Card, Box, styled } from "primithemes";
import { Image } from "src/components/Image";
import { Container } from "src/components/Container";

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
    <Wrapper p={4}>
      <Container>
        <Card
          shadow={1}
          flexDirection="row"
          flexWrap="wrap"
          p={4}
          bg="white.light"
          radius={1}
        >
          <Flex w={[1, 1, 1 / 2]}>
            <Card b={1} borderColor="grey.200" w={1} p={4} bg="white.light">
              <Image
                fluid={frontmatter.image}
                style={{ width: "100%", height: "100%" }}
              />
            </Card>
          </Flex>
          <Flex ml={3} style={{ flexGrow: 1 }}>
            <Card p={3} w={1} alignItems="center" justifyContent="center">
              <Text
                is="h1"
                color="text.dark"
                fontWeight={6}
                fontSize={6}
                textTransform="uppercase"
              >
                {frontmatter.title}
              </Text>
              <Text is="h5" fontSize={3} color="text.main">
                {frontmatter.subtitle}
              </Text>
              <Box>
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
