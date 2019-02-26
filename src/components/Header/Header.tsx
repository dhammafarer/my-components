import * as React from "react";
import { DrawerMenu } from "src/components/DrawerMenu";
import { styled, Card, Flex, Text } from "primithemes";
import { Button } from "src/components/Button";
import { Link } from "src/i18n";
import { Container } from "src/components/Container";
import { Logo } from "src/components/Logo";
import Headroom from "react-headroom";

const Trigger = styled.div`
  display: block;
  ${props => props.theme.devices[2]} {
    display: none;
  }
`;

const Nav = styled(Flex)`
  display: none;
  ${props => props.theme.devices[2]} {
    display: flex;
  }
`;

export const Wrapper = styled(Card)`
  z-index: ${props => props.theme.zIndexes[5]};
`;

export const Brand = styled(Flex)`
  cursor: pointer;
`;

export const LogoWrapper = styled(Flex)`
  width: ${props => props.theme.dimensions[2]};
`;

export const LogoImg = styled.img`
  width: 100%;
`;

export const BrandName = styled(Text)``;

interface HeaderProps {
  logo?: any;
  title: React.ReactNode;
  navItems: { to: string; label: string }[];
}

export const Header: React.SFC<HeaderProps> = ({ logo, title, navItems }) => (
  <Headroom>
    <Wrapper bg="white.light" p={3} shadow={1}>
      <Container>
        <Flex
          flexDirection="row"
          alignItems="center"
          justifyContent="space-between"
        >
          <Link to="/">
            <Brand alignItems="center">
              {logo ? (
                <LogoWrapper alignItems="center">
                  <LogoImg src={logo.childImageSharp.fixed.src} />
                </LogoWrapper>
              ) : (
                <Logo width={60} variant="dark" opacity={0.9} />
              )}
              <BrandName display={["none", "block"]} fontSize={3} ml={3}>
                {title}
              </BrandName>
            </Brand>
          </Link>
          <Flex>
            <Nav>
              {navItems.map(x => (
                <Button ml={1} to={x.to} key={x.to}>
                  {x.label}
                </Button>
              ))}
            </Nav>
            <Trigger>
              <DrawerMenu title={title} navItems={navItems} logo={logo} />
            </Trigger>
          </Flex>
        </Flex>
      </Container>
    </Wrapper>
  </Headroom>
);
