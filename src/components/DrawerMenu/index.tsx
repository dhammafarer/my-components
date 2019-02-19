import * as React from "react";
import { MakeMenu } from "../utils/MakeMenu";
import { Drawer } from "../Drawer";
import { MenuButton } from "./MenuButton";
import { CloseButton } from "./CloseButton";
import { styled, Flex } from "primithemes";
import { Button } from "../Button";
import { Image } from "../Image";
import { Link } from "../../i18n";
import { Text } from "src/components/Typography";
import { Logo } from "src/components/Logo";

const LogoImg = styled(Image)`
  margin: 0 auto;
`;

const DrawerContent = styled(Flex)`
  height: 100vh;
  position: relative;
  overflow-y: auto;
`;

interface DrawerMenuProps {
  logo?: any;
  title?: React.ReactNode;
  navItems: { to: string; label: string }[];
}

const DrawerMenu: React.SFC<DrawerMenuProps> = ({ logo, title, navItems }) => {
  return (
    <MakeMenu>
      {injected => (
        <>
          <MenuButton onClick={injected.toggleMenu} />

          <Drawer
            open={injected.open}
            anchor={"right"}
            handleClose={injected.handleClose}
            toggleMenu={injected.toggleMenu}
            width={300}
          >
            <DrawerContent flexDirection="column" bg="background.light" p={3}>
              <Flex justifyContent="flex-end">
                <CloseButton onClick={injected.handleClose} />
              </Flex>
              <Flex justifyContent="center" w={1}>
                <Link to="/">
                  {logo ? (
                    <LogoImg critical fixed={logo} />
                  ) : (
                    <Logo variant="dark" width={100} />
                  )}
                </Link>
              </Flex>
              {title && (
                <Flex justifyContent="center" my={3} w={1}>
                  <Text is="h3" fontSize={3} textAlign="center">
                    {title}
                  </Text>
                </Flex>
              )}
              <Flex justifyContent="center" flexDirection="column" p={1}>
                {navItems.map(x => (
                  <Flex key={x.to} p={1}>
                    <Button onClick={injected.handleClose} w={1} to={x.to}>
                      {x.label}
                    </Button>
                  </Flex>
                ))}
              </Flex>
            </DrawerContent>
          </Drawer>
        </>
      )}
    </MakeMenu>
  );
};

export { DrawerMenu };
