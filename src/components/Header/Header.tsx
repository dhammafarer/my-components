import * as React from "react";
import { Card } from "primithemes";

interface Props {
  logo?: React.ReactNode;
  title: string;
  navItems: { to: string; label: string }[];
}

const Header: React.SFC<Props> = props => <Card p={3}>header</Card>;

export { Header };
