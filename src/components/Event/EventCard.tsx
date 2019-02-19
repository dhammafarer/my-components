import * as React from "react";
import { EventNode } from "./Event.d";
import { Box, Flex, Card } from "primithemes";
import { Text } from "../Typography";
import { Image } from "../Image";
import { Button } from "../Button";
import { CalendarCard } from "./CalendarCard";

interface Props {
  event: EventNode;
}

const EventCard: React.SFC<Props> = ({ event }) => {
  const { image, title, subtitle, dateStart } = event.node.frontmatter;
  return (
    <Card w={1} shadow={1} radius={2} style={{ position: "relative" }}>
      <Box m={3} style={{ position: "absolute", top: 0, left: 0, zIndex: 2 }}>
        <CalendarCard date={dateStart} />
      </Box>
      <Image style={{ height: 160 }} fluid={image} />
      <Flex
        flexDirection="column"
        p={3}
        style={{ flexGrow: 1 }}
        bg="background.light"
      >
        <Text is="h2" my={2} color="text.dark">
          {title}
        </Text>
        <Text color="text.dark">{subtitle}</Text>
      </Flex>
      <Box p={3} bg="grey.100">
        <Button to={event.node.fields.slug} variant="primary" outlined>
          More Info
        </Button>
      </Box>
    </Card>
  );
};

export { EventCard };
