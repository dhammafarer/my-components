import * as React from "react";
import { injectIntl, InjectedIntlProps } from "react-intl";
import { Layout } from "../components/Layout";
import { withIntl } from "../i18n/withIntl";
import { PromoSection } from "src/components/Promotion";
import { promo } from "src/data/models";

export interface IndexPageProps {
  pageContext: {
    locale: string;
  };
}

type Props = IndexPageProps & InjectedIntlProps;

const IndexPage: React.SFC<Props> = ({ pageContext, intl }) => {
  return (
    <Layout>
      {Array(4)
        .fill("")
        .map((x, i) => (
          <PromoSection key={i} promo={promo()} />
        ))}
    </Layout>
  );
};

export default withIntl(injectIntl(IndexPage));
