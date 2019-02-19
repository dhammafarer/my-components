import * as React from "react";
import { EventNode } from "./Event.d";
import { EventCard } from "./EventCard";
import { Box, Flex } from "primithemes";

interface Props {
  events: EventNode[];
}
const EventsList: React.SFC<Props> = ({ events }) => {
  return (
    <Box>
      <Flex flexDirection={["column", "row"]} flexWrap="wrap">
        {events.map((event, i) => (
          <Flex key={i} p={2} w={[1, 1 / 2, 1 / 2, 1 / 4]}>
            <EventCard event={event} />
          </Flex>
        ))}
      </Flex>
    </Box>
  );
};

export { EventsList };
