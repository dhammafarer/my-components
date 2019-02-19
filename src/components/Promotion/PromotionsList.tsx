import * as React from "react";
import { Promotion } from "./Promotion.d";
import { PromotionCard } from "./PromotionCard";
import { Box, Flex } from "primithemes";
import { Text } from "src/components/Typography";

interface Props {
  promos: { node: Promotion }[];
}
const PromotionsList: React.SFC<Props> = ({ promos }) => {
  return (
    <Box>
      <Flex flexDirection={["column", "row"]} flexWrap="wrap">
        {promos.map(({ node }, i) => (
          <Flex key={i} p={2} w={[1, 1 / 2, 1 / 2, 1 / 4]}>
            <PromotionCard promo={node} />
          </Flex>
        ))}
        {promos.length < 1 && (
          <Box p={3}>
            <Text
              color="text.main"
              fontSize={4}
              fontWeight={2}
              textAlign="center"
              is="h3"
            >
              Currently no promotions...
            </Text>
          </Box>
        )}
      </Flex>
    </Box>
  );
};

export { PromotionsList };
