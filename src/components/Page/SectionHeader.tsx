import * as React from "react";
import { Box } from "primithemes";
import { Text } from "../Typography";
import { Container } from "../Container";

interface Props {
  title: string;
  subtitle?: string;
  variant?: "dark" | "light";
  align?: "center" | "left" | "right";
}

export const SectionHeader: React.SFC<Props> = ({
  title,
  subtitle,
  align = "center",
  variant = "light",
}) => (
  <Box pt={4} pb={3} bg={variant === "dark" ? "primary.dark" : "transparent"}>
    <Container>
      <Text
        color={variant === "dark" ? "white.light" : "text.primary"}
        fontSize={[4, 4, 4, 5]}
        is="h2"
        textAlign={align}
      >
        {title}
      </Text>
      <Text
        is="h5"
        fontSize={[2, 2, 3, 4]}
        color={variant === "dark" ? "grey.400" : "text.main"}
        textAlign={align}
      >
        {subtitle}
      </Text>
    </Container>
  </Box>
);
