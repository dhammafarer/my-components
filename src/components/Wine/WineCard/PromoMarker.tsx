import * as React from "react";
import { styled } from "primithemes";

const Marker = styled.div`
  z-index: 3;
  position: absolute;
  top: 11%;
  right: 11%;
  background: ${props => props.theme.colors.secondary.main};
  color: ${props => props.theme.colors.white.light};
  padding: ${props => props.theme.sizes[2]} 0;
  text-align: center;
  width: 300px;
  border: ${props => props.theme.borders[2]};
  border-color: white;
  opacity: 0.9;
  letter-spacing: ${props => props.theme.letterSpacings[2]};
  font-weight: 600;
  text-transform: uppercase;
  font-family: ${props => props.theme.fonts.sans};
  transform: translateX(50%) rotate(45deg);
  box-shadow: ${props => props.theme.shadows[1]};
  ${props => props.theme.devices[2]} {
    top: 8%;
    right: 15%;
  }
`;

const PromoMarker: React.SFC<{}> = () => <Marker>Promo</Marker>;

export { PromoMarker };
