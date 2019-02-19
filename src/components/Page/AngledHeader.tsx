import * as React from "react";
import { styled } from "primithemes";
import { Flex, Box } from "primithemes";
import { Text } from "src/components/Typography";
import { Container } from "src/components/Container";

const Svg = styled.svg`
  width: 20px;
  height: 80px;
`;

const Space = styled(Flex)`
  position: relative;
  text-align: center;
`;

interface Props {
  title: string;
  subtitle?: string;
}

export const AngledHeader: React.SFC<Props> = ({ title, subtitle }) => (
  <Box w={1} bg="linear-gradient(to right,  gray 50%, lightgray 50%)">
    <Container>
      <Space bg="lightgray">
        <Flex bg="gray" alignItems="center">
          <Text p={3} px={5} is="h1" color="white.light">
            {title}
          </Text>
        </Flex>
        <Svg preserveAspectRatio="none" viewBox="0 0 100 100">
          <polygon fill="gray" points="100,0 0,100 0,0" />
        </Svg>
        <Flex bg="transparent" alignItems="center">
          <Text p={3} px={5} is="h1" color="white.light">
            {subtitle}
          </Text>
        </Flex>
      </Space>
    </Container>
  </Box>
);
