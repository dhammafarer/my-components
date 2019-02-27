import * as React from "react";
import { Layout } from "../components/Layout";
import { withIntl } from "../i18n/withIntl";
import { PromotionPage } from "src/components/Promotion";
import { replicate, promo, wine } from "../data/models";

const PromoPage: React.SFC<{}> = () => {
  return (
    <Layout>
      <PromotionPage promo={promo()} wines={replicate(wine, 20)} />
    </Layout>
  );
};

export default withIntl(PromoPage);
