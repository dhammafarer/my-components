import * as React from "react";
import { injectIntl, InjectedIntlProps } from "react-intl";
import { Layout } from "../components/Layout";
import { withIntl } from "../i18n/withIntl";

export interface IndexPageProps {
  pageContext: {
    locale: string;
  };
}

type Props = IndexPageProps & InjectedIntlProps;

const IndexPage: React.SFC<Props> = ({ pageContext, intl }) => {
  return (
    <Layout>
      <div>text</div>
    </Layout>
  );
};

export default withIntl(injectIntl(IndexPage));
