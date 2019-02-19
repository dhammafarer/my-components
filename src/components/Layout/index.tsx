import * as React from "react";
import { ThemeProvider, createGlobalStyle } from "styled-components";
import { Flex, Box, styled } from "primithemes";
import { theme } from "../../theme";
import { injectIntl, InjectedIntlProps } from "react-intl";

import { Normalize } from "styled-normalize";
import { Head } from "./Head";
import { Header } from "./Header";
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

const title = "Site Title";
const contact = {
  phone: "+886-2847-2340",
  email: "example@email.com",
};
const nav = [{ to: "/", label: "Home" }];

export const BaseLayout: React.SFC<InjectedIntlProps> = ({
  children,
  intl,
}) => {
  return (
    <ThemeProvider theme={theme}>
      <Root>
        <Normalize />
        <GlobalStyle />
        <Head title={title} />
        <Content bg="background.main">
          <Header title={title} navItems={nav} logo={null} />
          <Main>{children}</Main>
          <Footer
            logo={null}
            title={title}
            email={contact.email}
            phone={contact.phone}
          />
        </Content>
      </Root>
    </ThemeProvider>
  );
};

export const Layout = injectIntl(BaseLayout);
