import * as React from "react";
import { Flex } from "primithemes";

interface Props {
  bg?: string;
}

const CardContent: React.SFC<Props> = ({ bg, children }) => {
  return (
    <Flex style={{ flexGrow: 1 }} p={3} flexDirection="column">
      {children}
    </Flex>
  );
};

CardContent.defaultProps = {
  bg: "white.light",
};

export { CardContent };
