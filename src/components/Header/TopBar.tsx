import * as React from "react";
import { Flex } from "primithemes";
import { Text } from "src/components/Typography";
import { Container } from "src/components/Container";

interface Props {
  height: number;
  phone: string;
}

const TopBar: React.SFC<Props> = ({ height, phone }) => {
  return (
    <Flex px={3} alignItems="center" style={{ height }} bg="primary.main">
      <Container>
        <Flex
          alignItems="center"
          justifyContent="space-between"
          color="white.dark"
        >
          <Flex alignItems="center">
            <Text ml={1} fontSize={0}>
              Give us a call now:
            </Text>
            <Text ml={1} fontSize={0} fontWeight={5}>
              {phone}
            </Text>
          </Flex>
          <Text fontSize={0}>text</Text>
        </Flex>
      </Container>
    </Flex>
  );
};

export { TopBar };
