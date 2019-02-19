import * as React from "react";
import { FormattedDate } from "react-intl";
import { Card, Text } from "primithemes";

interface Props {
  date: string;
  radius?: number;
  shadow?: number;
  bg?: string;
}

const CalendarCard: React.SFC<Props> = ({
  date,
  radius = 2,
  shadow = 1,
  bg = "white.light",
}) => (
  <Card
    bg={bg}
    p={2}
    w={"70px"}
    style={{ height: "70px" }}
    alignItems="center"
    shadow={shadow}
    radius={radius}
  >
    <Text color="secondary.main" textTransform="uppercase">
      <FormattedDate value={date} month="short" />
    </Text>
    <Text fontSize={5} fontWeight={2} color="text.dark">
      <FormattedDate value={date} day="numeric" />
    </Text>
  </Card>
);

export { CalendarCard };
