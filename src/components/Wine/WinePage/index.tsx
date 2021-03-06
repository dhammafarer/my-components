import * as React from "react";
import { styled, Box, Flex, Text, Card } from "primithemes";
import { Image } from "../../Image";
import { Container } from "../../Container";
import { Button } from "../../Button";
import { InsertDriveFile } from "styled-icons/material/InsertDriveFile";
import { FormattedMessage } from "react-intl";
import { wineKinds } from "../wineMessages";

const Datasheet = styled(Box)`
  display: flex;
  align-items: center;
  flex-grow: 0;
`;

const Capitalized = styled.span`
  text-transform: capitalize;
`;

const Icon = styled(InsertDriveFile)`
  margin-right: ${props => props.theme.sizes[3]};
`;

const Sheet = styled(Card)`
  padding: ${props => props.theme.sizes[3]};
  ${props => props.theme.devices[1]} {
    padding: ${props => props.theme.sizes[4]};
  }
`;
const ImageWrapper = styled(Flex)``;

const ContentWrapper = styled(Box)`
  padding-top: ${props => props.theme.sizes[4]};

  ${props => props.theme.devices[1]} {
    padding-top: ${props => props.theme.sizes[0]};
    padding-right: ${props => props.theme.sizes[3]};
  }

  ${props => props.theme.devices[3]} {
    padding-top: ${props => props.theme.sizes[4]};
    padding-left: ${props => props.theme.sizes[5]};
    padding-right: ${props => props.theme.sizes[5]};
  }
`;

const Section = styled(Card)`
  border-top: ${props => props.theme.borders[1]};
  border-color: ${props => props.theme.colors.divider};
  padding: ${props => props.theme.sizes[3]};
`;

const Spec: React.SFC<{
  first?: boolean;
  label: React.ReactNode;
  text: string;
}> = ({ label, text, first }) => (
  <Box mt={first ? 0 : 3}>
    <Text color="text.dark" fontWeight={6}>
      {label}
    </Text>
    <Text mt={1} color="text.main">
      {text}
    </Text>
  </Box>
);

export const WinePage: React.SFC<Props> = ({ wine }) => (
  <Box bg="grey.200" p={3}>
    <Container>
      <Sheet
        radius={2}
        shadow={1}
        bg="background.light"
        w={1}
        flexDirection="row"
        flexWrap="wrap"
        alignItems="space-between"
      >
        <ImageWrapper
          w={[1, 1 / 3, 1 / 3, 1 / 4, 1 / 3]}
          py={[3, 0, 2, 4]}
          pr={[0, 4, 4, 0]}
          pl={[0, 2, 2, 0]}
          justifyContent="center"
          alignItems="flex-start"
        >
          <Image
            imgStyle={{ objectFit: "contain" }}
            style={{ width: "100%", maxWidth: 300, maxHeight: 800 }}
            fluid={wine.image}
          />
        </ImageWrapper>

        <ContentWrapper w={[1, 2 / 3, 2 / 3, 3 / 4, 2 / 3]}>
          <Box>
            <Text is="h1" fontSize={[5, 5, 6]}>
              {wine.name}
            </Text>
            <Text mt={2} color="text.main" as="h1" fontSize={[5, 5, 6]}>
              {wine.year}
            </Text>
          </Box>

          {wine.winery && (
            <Box mt={3}>
              <Button
                my={2}
                mr={2}
                fontSize={3}
                contained
                variant="secondary"
                to={wine.winery.fields.slug}
              >
                {wine.winery.name}
              </Button>
              {wine.kind && wineKinds[wine.kind] && (
                <Button
                  mr={2}
                  fontSize={3}
                  outlined
                  to={"/wines?kind=" + wine.kind}
                >
                  <Capitalized>
                    <FormattedMessage {...wineKinds[wine.kind]} />
                  </Capitalized>
                </Button>
              )}
            </Box>
          )}

          {wine.awards && wine.awards.length > 0 && (
            <Section mt={4}>
              <Text as="h3">Latest Awards</Text>
              <Flex mt={2} flexWrap="wrap">
                {wine.awards.map((a, i) => (
                  <Flex w={1} p={2} alignItems="center">
                    <Image style={{ flexShrink: 0 }} fixed={a.image} />
                    <Text ml={3}>{a.title}</Text>
                  </Flex>
                ))}
              </Flex>
            </Section>
          )}

          {(wine.variety || wine.aging || wine.origin || wine.bottle) && (
            <Section mt={4}>
              {wine.variety && <Spec label={"Variety"} text={wine.variety} />}
              {wine.aging && <Spec label={"Aging"} text={wine.aging} />}
              {wine.origin && <Spec label={"Origin"} text={wine.origin} />}
              {wine.bottle && <Spec label={"Bottle"} text={wine.bottle} />}
            </Section>
          )}

          {(wine.eye || wine.nose || wine.mouth) && (
            <Section mt={4}>
              {wine.eye && <Spec first label={"Eye"} text={wine.eye} />}
              {wine.nose && <Spec label={"Nose"} text={wine.nose} />}
              {wine.mouth && <Spec label={"Mouth"} text={wine.mouth} />}
            </Section>
          )}

          {wine.pairing && (
            <Section mt={4}>
              <Spec first label={"Food Pairing"} text={wine.pairing} />
            </Section>
          )}

          {wine.datasheet && (
            <Section mt={4}>
              <Box>
                {wine.datasheet && (
                  <Button to={wine.datasheet.publicURL} outlined>
                    <Datasheet>
                      <Icon size={20} />
                      Download Spec
                    </Datasheet>
                  </Button>
                )}
              </Box>
            </Section>
          )}
        </ContentWrapper>
      </Sheet>
    </Container>
  </Box>
);

interface Props {
  wine: {
    name: string;
    kind?: string;
    year?: number;
    image?: any;
    datasheet?: {
      publicURL: string;
    };
    variety?: string;
    aging?: string;
    origin?: string;
    bottle?: string;
    pairing?: string;
    eye?: string;
    nose?: string;
    mouth?: string;
    awards?: { title?: string; image?: any }[];
    winery?: {
      country?: string;
      name?: string;
      fields: {
        slug?: string;
      };
    };
  };
}
