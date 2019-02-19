import * as React from "react";
import { Flex } from "primithemes";
import { WineNode } from "./WineNode.d";
import { WineCard } from "./WineCard";
import { Text } from "../Typography";

interface Props {
  wines: WineNode[];
  hidePromo?: boolean;
}

const WinesList: React.SFC<Props> = ({ wines, hidePromo }) => {
  return (
    <Flex w={1} flexWrap="wrap" style={{ height: "100%" }}>
      {wines.length > 0 ? (
        wines.map(({ node }) => (
          <Flex w={[1, 1 / 2, 1 / 2, 1 / 3, 1 / 4]} p={3} key={node.name}>
            <WineCard
              hidePromo={hidePromo}
              name={node.name}
              winery={node.winery}
              image={node.image}
              year={node.year}
              promotions={node.promotions}
              slug={node.fields.slug}
            />
          </Flex>
        ))
      ) : (
        <Flex
          flexDirection="column"
          justifyContent="center"
          alignItems="center"
          w={1}
        >
          <Text m={2} fontWeight={5} fontSize={3}>
            No Wines Found
          </Text>
          <Text fontWeight={3}>Try different search criteria</Text>
        </Flex>
      )}
    </Flex>
  );
};

export { WinesList };
