import * as React from "react";
import { injectIntl, InjectedIntlProps } from "react-intl";
import { Layout } from "../components/Layout";
import { withIntl } from "../i18n/withIntl";
import { AngledHeader } from "src/components/Page";
import { PromoSection } from "src/components/Promotion";

export interface IndexPageProps {
  pageContext: {
    locale: string;
  };
}

type Props = IndexPageProps & InjectedIntlProps;

const promo = {
  frontmatter: {
    title: "Fake Promotion",
    subtitle: "February promotion",
    buttonText: "50% Off",
    dateStart: "2019-02-01",
    dateEnd: "2019-02-28",
    image: null,
    kinds: ["white"],
    wineries: [],
    wines: [],
  },
  fields: {
    slug: "/",
    lang: "en",
  },
  htmlAst: null,
  html: "<p>body</p>",
};

const IndexPage: React.SFC<Props> = ({ pageContext, intl }) => {
  return (
    <Layout>
      <AngledHeader title={"Event"} subtitle="Special Event" />
      <PromoSection promo={promo} />
    </Layout>
  );
};

export default withIntl(injectIntl(IndexPage));
