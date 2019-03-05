import * as React from "react";
import { styled, Card, Text, Box, Flex } from "primithemes";
import { Button } from "src/components/Button";
import { WineImage } from "../WineImage";
import { Link } from "src/components/Link";
import { PromoButton } from "./PromoButton";
import { PromoMarker } from "./PromoMarker";

const ImageWrapper = styled(Box)`
  position: relative;
  z-index: 0;
  background: ${props => props.theme.colors.grey[200]};
  &:hover {
    background: ${props => props.theme.colors.grey[300]};
  }
  transition: all 400ms ease-out;
  &::before {
    content: "";
    position: absolute;
    width: 100%;
    height: 100%;
    top: 0;
    left: 0;
    background-image: url(${require("./cairo-pentagon-32.png")});
    background-repeat: repeat;
    opacity: 1;
    z-index: -1;
  }
  &:hover::before {
    opacity: 0.5;
  }
`;

interface Props {
  hidePromo?: boolean;
  name: string;
  slug: string;
  image: any;
  year: string;
  promotions: any[];
  winery: {
    name: string;
    fields: {
      slug: string;
    };
  };
}

const WineCard: React.SFC<Props> = ({
  hidePromo,
  name,
  winery,
  promotions,
  slug,
  image,
  year,
}) => (
  <Card
    shadow={1}
    radius={2}
    w={1}
    style={{ height: "100%", position: "relative" }}
  >
    <Link to={slug}>
      <ImageWrapper p={3} style={{ height: 300 }}>
        {promotions.length > 0 && <PromoMarker />}
        <WineImage
          imgStyle={{ objectFit: "contain" }}
          style={{ height: "100%" }}
          fluid={image}
        />
      </ImageWrapper>
    </Link>
    <Flex
      p={3}
      bg="background.light"
      flexDirection="column"
      justifyContent="space-between"
      style={{ flexGrow: 1 }}
    >
      <Box>
        <Text is="h3" mb={2} fontSize={3} lineHeight={1} color="primary.main">
          {name}
        </Text>
      </Box>
      <Box>
        {winery && (
          <Link to={winery.fields.slug}>
            <Text
              textTransform="uppercase"
              is="span"
              mt={1}
              fontSize={2}
              color="text.main"
            >
              {winery.name}
            </Text>
          </Link>
        )}
        {year && (
          <Text fontSize={3} lineHeight={1} color="secondary.main">
            {year}
          </Text>
        )}
      </Box>
    </Flex>
    <Flex p={3} bg="grey.100">
      {(hidePromo || promotions.length < 1) && (
        <Button variant="primary" to={slug} outlined>
          Learn More
        </Button>
      )}
      {!hidePromo && <PromoButton promos={promotions} />}
    </Flex>
  </Card>
);

export { WineCard };
