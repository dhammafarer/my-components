import * as React from "react";
import { Flex } from "primithemes";

interface Props {
  height: number;
}

const TopBar: React.SFC<Props> = ({ height }) => {
  return <Flex style={{ height }}>content</Flex>;
};

export { TopBar };
