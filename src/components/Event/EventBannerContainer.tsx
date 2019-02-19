import * as React from "react";
import { Container } from "../Container";
import { Box } from "primithemes";
import { EventBanner } from "./EventBanner";
import { compareDates } from "../../utils/helpers";
import { EventNode } from "./Event.d";

interface Props {
  events: {
    edges: EventNode[];
  };
}

const EventBannerContainer: React.SFC<Props> = ({ events }) => {
  const nextEvent = events.edges.find(({ node }) => {
    return compareDates(null, node.frontmatter.dateEnd) > 0;
  });

  if (!nextEvent) return <div />;

  return (
    <Box m={[0, 0, 3]}>
      <Container>
        <EventBanner
          image={nextEvent.node.frontmatter.image}
          heading={nextEvent.node.frontmatter.title}
          subheading={nextEvent.node.frontmatter.subtitle}
          address={nextEvent.node.frontmatter.address}
          dateStart={nextEvent.node.frontmatter.dateStart}
          dateEnd={nextEvent.node.frontmatter.dateEnd}
          slug={nextEvent.node.fields.slug}
        />
      </Container>
    </Box>
  );
};

export { EventBannerContainer };
