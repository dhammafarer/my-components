import * as React from "react";
import { PageHeader, SectionHeader } from "src/components/Page";
import { Image } from "src/components/Image";
import { Box } from "primithemes";
import { Content } from "src/components/Content";
import { WineNode, WinesList } from "src/components/Wine";
import { Promotion } from "src/components/Promotion";

interface Props {
  promo: Promotion;
  wines: {
    edges: WineNode[];
  };
}

const PromotionPage: React.SFC<Props> = ({ promo, wines }) => {
  const { kinds, wines: ws, wineries } = promo.frontmatter;
  const promoWines = wines.edges.filter(
    ({ node }) =>
      (kinds && kinds.includes(node.kind)) ||
      (ws && ws.includes(node.originalId)) ||
      (wineries && wineries.includes(node.winery.originalId))
  );
  return (
    <section>
      <PageHeader title={promo.frontmatter.title} />
      <Box>
        <Image style={{ maxHeight: 450 }} fluid={promo.frontmatter.image} />
      </Box>
      <Box py={3} px={[3, 4, 5]}>
        <Content dangerouslySetInnerHTML={{ __html: promo.html }} />
      </Box>
      <Box>
        <SectionHeader title="Wines in this promo" />
        <WinesList hidePromo wines={promoWines} />
      </Box>
    </section>
  );
};

export { PromotionPage };
