import * as React from "react";
import { injectIntl, InjectedIntlProps } from "react-intl";
import { Layout } from "../components/Layout";
import { withIntl } from "../i18n/withIntl";
import { AngledHeader } from "src/components/Page";

export interface IndexPageProps {
  pageContext: {
    locale: string;
  };
}

type Props = IndexPageProps & InjectedIntlProps;

const IndexPage: React.SFC<Props> = ({ pageContext, intl }) => {
  return (
    <Layout>
      <AngledHeader title={"Event"} subtitle="Special Event" />
    </Layout>
  );
};

export default withIntl(injectIntl(IndexPage));
