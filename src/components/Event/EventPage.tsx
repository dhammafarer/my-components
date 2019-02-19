import * as React from "react";
import { Image } from "src/components/Image";
import { Box, Flex } from "primithemes";
import { Container } from "src/components/Container";
import { Content } from "src/components/Content";
import { styled, css } from "primithemes";
import { Text } from "src/components/Typography";
import { FormattedTime, FormattedDate } from "react-intl";
import { AccessTime } from "styled-icons/material/AccessTime";
import { LocationOn } from "styled-icons/material/LocationOn";
import { Link as LinkIcon } from "styled-icons/material/Link";
import { Event as EventIcon } from "styled-icons/material/Event";
import { isSameDay } from "../../utils/helpers";
import { CalendarCard } from "./CalendarCard";
import { Link } from "src/components/Link";

const icon = css`
  margin-right: ${props => props.theme.sizes[3]};
  flex-shrink: 0;
  color: ${props => props.theme.colors.text.main};
`;
const TimeIcon = styled(AccessTime)`
  ${icon}
`;

const DateIcon = styled(EventIcon)`
  ${icon}
`;

const LocationIcon = styled(LocationOn)`
  ${icon}
`;

const WebsiteIcon = styled(LinkIcon)`
  ${icon}
`;

const Details = styled(Box)`
  overflow: "hidden";
  color: ${props => props.theme.colors.text.dark};
  border-bottom: ${props => props.theme.borders[1]};
  border-color: ${props => props.theme.colors.divider.main};
`;

interface EventPageProps {
  event: {
    frontmatter: {
      title: string;
      subtitle: string;
      address: string;
      dateStart: string;
      dateEnd: string;
      image: any;
      www: string;
    };
    htmlAst: any;
    html: any;
  };
}

export const EventPage: React.SFC<EventPageProps> = ({ event }) => {
  const { title, image, address, dateStart, dateEnd, www } = event.frontmatter;
  return (
    <section>
      <Container>
        <Box bg="background.light" pb={3}>
          <Box>
            <Image style={{ maxHeight: 450 }} fluid={image} />
          </Box>
          <Flex
            alignItems={["flex-start", "center"]}
            flexDirection={["column", "row"]}
            py={3}
            px={[3, 4, 5]}
            justifyContent="flex-start"
            bg="primary.dark"
          >
            <CalendarCard shadow={0} radius={1} date={dateStart} />
            <Box ml={[0, 2]} mt={[3, 0]} pl={[0, 3]}>
              <Text
                is="h1"
                fontSize={6}
                color="white.light"
                textTransform="uppercase"
                my={2}
              >
                {title}
              </Text>
            </Box>
          </Flex>
          <Details
            px={[3, 4, 5]}
            py={3}
            bg="background.light"
            style={{ overflow: "hidden" }}
          >
            <Flex my={3} flexDirection="row" alignItems="center">
              <DateIcon size={20} color="inherit" />
              <Text is="span" fontWeight={4} fontSize={3} lineHeight={2}>
                <FormattedDate
                  value={dateStart}
                  weekday="long"
                  day="2-digit"
                  month="long"
                  year="numeric"
                />
                {!isSameDay(dateStart, dateEnd) && (
                  <>
                    {" - "}
                    <FormattedDate
                      value={dateEnd}
                      weekday="long"
                      day="2-digit"
                      month="long"
                      year="numeric"
                    />
                  </>
                )}
              </Text>
            </Flex>
            <Flex my={3} flexDirection="row" alignItems="center">
              <TimeIcon size={20} color="inherit" />
              <Text fontWeight={4} fontSize={3} lineHeight={2}>
                <FormattedTime
                  value={dateStart}
                  hour="numeric"
                  minute="numeric"
                />
                {" - "}
                <FormattedTime
                  value={dateEnd}
                  hour="numeric"
                  minute="numeric"
                />
              </Text>
            </Flex>
            {address && (
              <Flex my={3} flexDirection="row" alignItems="center">
                <LocationIcon size={20} color="inherit" />
                <Text fontWeight={4} fontSize={3} lineHeight={2}>
                  {address}
                </Text>
              </Flex>
            )}
            {www && (
              <Flex my={3} flexDirection="row" alignItems="center">
                <WebsiteIcon size={20} color="inherit" />
                <Link styled to={www}>
                  <Text fontWeight={4} fontSize={3} lineHeight={2}>
                    Event Website
                  </Text>
                </Link>
              </Flex>
            )}
          </Details>
          <Box py={3} px={[3, 4, 5]}>
            <Content dangerouslySetInnerHTML={{ __html: event.html }} />
          </Box>
        </Box>
      </Container>
    </section>
  );
};
