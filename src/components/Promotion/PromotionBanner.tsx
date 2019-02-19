import * as React from "react";
import { BannerWrapper } from "src/components/Banner";
import { styled, Card, Flex, Text } from "primithemes";
import { Button } from "../Button";

const Wrapper = styled(Card)`
  position: relative;
`;

interface PromotionBannerProps {
  promo: {
    frontmatter: {
      image: any;
      title: string;
      subtitle: string;
      buttonText: string;
      dateStart: string;
      dateEnd: string;
    };
    fields: {
      slug: string;
    };
  };
}

const PromotionBanner: React.SFC<PromotionBannerProps> = ({
  promo: { frontmatter, fields },
}) => (
  <Wrapper
    shadow={[0, 0, 1]}
    radius={[0, 0, 2]}
    color="white.dark"
    bg="black.dark"
  >
    <BannerWrapper image={frontmatter.image}>
      <Flex mx={3} my={3} alignItems="center" flexDirection="column">
        <Text
          my={2}
          textAlign="center"
          is="h1"
          fontSize={[5, 5, 6, 7]}
          color="white.light"
        >
          {frontmatter.title}
        </Text>
        <Text is="h5" my={2} fontSize={3} fontWeight={3}>
          {frontmatter.subtitle}
        </Text>
      </Flex>
    </BannerWrapper>

    <Flex alignItems="center" flexDirection="column" pb={2}>
      <Flex p={3}>
        <Button to={fields.slug} variant="white" contained>
          {frontmatter.buttonText}
        </Button>
      </Flex>
    </Flex>
  </Wrapper>
);

export { PromotionBanner };
