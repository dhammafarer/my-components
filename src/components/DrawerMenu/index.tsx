import * as React from "react";
import { MenuButton } from "./MenuButton";
import { CloseButton } from "./CloseButton";
import { styled, Flex } from "primithemes";
import { useDrawer } from "./drawerHooks";
import { animated } from "react-spring";

const width = "300px";

const DrawerWrapper = styled.div`
  z-index: 1400;
  display: block;
`;

const Dmenu = styled(animated.div)`
  position: absolute;
  z-index: 1;
  top: 0;
  right: 0;
`;

const DrawerOverlay = styled(animated.div)`
  z-index: 0;
  position: fixed;
  height: 100vh;
  top: 0;
  right: 0;
  left: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.4);
`;

const DrawerContent = styled.div`
  z-index: 1400;
  height: 100vh;
  width: 100%;
  overflow-x: hidden;
`;

const DrawerContentWrapper = styled(Flex)`
  height: 100vh;
  position: relative;
  overflow-y: auto;
  width: ${width};
`;

interface DrawerMenuProps {
  logo?: any;
  title?: React.ReactNode;
  navItems: { to: string; label: string }[];
}

const DrawerMenu: React.SFC<DrawerMenuProps> = ({ logo, title, navItems }) => {
  const { open, close, drawer, overlay } = useDrawer(width);

  return (
    <DrawerWrapper>
      <MenuButton onClick={open} />
      {overlay.map(
        ({ item, key, props }) =>
          item && <DrawerOverlay key={key} style={props} onClick={close} />
      )}
      {drawer.map(
        ({ item, key, props }) =>
          item && (
            <Dmenu key={key} style={props}>
              <DrawerContent>
                <DrawerContentWrapper
                  flexDirection="column"
                  bg="background.light"
                  p={3}
                >
                  <CloseButton onClick={close} />
                </DrawerContentWrapper>
              </DrawerContent>
            </Dmenu>
          )
      )}
    </DrawerWrapper>
  );
};

export { DrawerMenu };
