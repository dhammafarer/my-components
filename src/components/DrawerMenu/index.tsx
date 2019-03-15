import * as React from "react";
import { MenuButton } from "./MenuButton";
import { CloseButton } from "./CloseButton";
import { styled, Flex } from "primithemes";
import { useDrawer } from "./drawerHooks";
import { DrawerOverlay } from "./DrawerOverlay";
import { Drawer } from "./Drawer";

const DrawerWrapper = styled.div`
  z-index: 1400;
  display: block;
`;

const DrawerContent = styled(Flex)`
  height: 100vh;
  background: ${props => props.theme.colors.white.light};
  border-bottom: 2px solid red;
`;

interface DrawerMenuProps {
  logo?: any;
  title?: React.ReactNode;
  navItems: { to: string; label: string }[];
}

const DrawerMenu: React.SFC<DrawerMenuProps> = ({ logo, title, navItems }) => {
  const { show, open, close } = useDrawer();

  return (
    <DrawerWrapper>
      <MenuButton onClick={open} />
      <DrawerOverlay show={show} close={close} />
      <Drawer width="300px" show={show}>
        <DrawerContent>
          <CloseButton onClick={close} />
        </DrawerContent>
      </Drawer>
    </DrawerWrapper>
  );
};

export { DrawerMenu };
