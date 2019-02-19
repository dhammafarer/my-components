import * as React from "react";
import { Box, Flex } from "primithemes";
import { Text } from "../Typography";
import { Container } from "../Container";

interface Props {
  title: string;
  subtitle?: string;
  variant?: "dark" | "light";
  before?: React.ReactNode;
  align?: "center" | "left" | "right";
}

export const PageHeader: React.SFC<Props> = ({
  title,
  subtitle,
  align = "center",
  variant = "dark",
}) => (
  <Box px={3} py={4} bg={variant === "dark" ? "primary.dark" : "transparent"}>
    <Container>
      <Flex w={1} justifyContent={align} alignItems="center">
        <Box>
          <Text
            color={variant === "dark" ? "white.light" : "text.primary"}
            fontSize={[5, 5, 6, 7]}
            is="h1"
            textAlign="center"
          >
            {title}
          </Text>
          <Text
            is="h4"
            fontSize={[3, 3, 4, 5]}
            color={variant === "dark" ? "grey.400" : "text.main"}
            textAlign="center"
          >
            {subtitle}
          </Text>
        </Box>
      </Flex>
    </Container>
  </Box>
);
