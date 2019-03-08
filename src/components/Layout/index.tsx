import * as React from "react";
import { ThemeProvider, createGlobalStyle } from "styled-components";
import { Flex, Box, styled } from "primithemes";
import { theme } from "../../theme";
import { injectIntl, InjectedIntlProps } from "react-intl";
import { graphql, StaticQuery } from "gatsby";

import { Normalize } from "styled-normalize";
import { Head } from "./Head";
import { Header } from "src/components/Header";
import { Footer } from "./Footer";

const GlobalStyle = createGlobalStyle`
  * {
    padding: 0;
    margin: 0;
  }
  body {
    overflow-y: scroll;
    width: 100%;
    height: 100%;
  }
  a {
    text-decoration: none;
    color: inherit;
  }
`;

const Root = styled.div`
  position: relative;
  overflow-x: hidden;
`;

const Content = styled(Flex)`
  flex-direction: column;
  overflow-x: hidden;
  min-height: 100vh;
`;

const Main = styled(Box)`
  width: 100%;
  margin: 0 auto;
  background: ${props => props.theme.colors.background.main};
  flex-grow: 1;
`;

interface Contact {
  phone: string;
  email: string;
}

interface SettingsNode {
  node: {
    title: string;
    logo: any;
    nav: { to: string; label: string }[];
    contacts: Contact[];
    fields: {
      lang: string;
    };
  };
}

interface Data {
  settings: {
    edges: SettingsNode[];
  };
}

export const BaseLayout: React.SFC<InjectedIntlProps> = ({
  children,
  intl,
}) => (
  <StaticQuery
    query={graphql`
      query Layout2Query {
        settings: allSettingsYamlX {
          edges {
            node {
              title
              logo {
                childImageSharp {
                  fixed(height: 100, quality: 100) {
                    ...GatsbyImageSharpFixed
                  }
                }
              }
              nav {
                label
                to
              }
              contacts {
                phone
                email
              }
              fields {
                lang
              }
            }
          }
        }
      }
    `}
    render={(data: Data) => {
      const settings =
        data.settings.edges.find(
          ({ node }) => node.fields.lang === intl.locale
        ) || data.settings.edges[0];
      return (
        <ThemeProvider theme={theme}>
          <Root>
            <Normalize />
            <GlobalStyle />
            <Head title={settings.node.title} />
            <Content bg="background.main">
              <Header
                topbar
                title={settings.node.title}
                navItems={settings.node.nav}
                logo={null}
              />
              <Main>{children}</Main>
              <Footer
                logo={null}
                email={settings.node.contacts[0].email}
                phone={settings.node.contacts[0].phone}
                title={settings.node.title}
              />
            </Content>
          </Root>
        </ThemeProvider>
      );
    }}
  />
);

export const Layout = injectIntl(BaseLayout);
