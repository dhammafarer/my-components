import * as React from "react";
import { Promotion } from "./Promotion.d";
import { PromoSection } from "./PromoSection";
import { Box } from "primithemes";
import { isOngoing } from "src/utils/helpers";
import { PageHeader } from "src/components/Page";

interface Props {
  promotions: {
    edges: { node: Promotion }[];
  };
}

const PromotionBannerContainer: React.SFC<Props> = ({ promotions }) => {
  const promos = promotions.edges.filter(({ node }) =>
    isOngoing(node.frontmatter.dateStart, node.frontmatter.dateEnd)
  );
  return (
    <Box>
      {false && <PageHeader title="Current Promotions" variant="light" />}
      <Box w={1}>
        {promos.map(({ node }) => (
          <Box>
            <PromoSection promo={node} />
          </Box>
        ))}
      </Box>
    </Box>
  );
};

export { PromotionBannerContainer };
