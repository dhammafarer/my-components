import * as React from "react";
import { Card } from "primithemes";
import Headroom from "react-headroom";

interface Props {
  logo?: React.ReactNode;
  title: string;
  navItems: { to: string; label: string }[];
}

const Header: React.SFC<Props> = props => (
  <Headroom>
    <Card p={3} bg="grey.300">
      text
    </Card>
  </Headroom>
);

export { Header };
