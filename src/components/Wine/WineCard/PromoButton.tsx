import * as React from "react";
import { Button } from "src/components/Button";

interface Props {
  promos: any[];
}
const PromoButton: React.SFC<Props> = ({ promos }) => {
  if (!promos || promos.length < 1) return null;
  const href = promos.length === 1 ? promos[0].fields.slug : `/promotions/`;
  const label =
    promos.length === 1 ? promos[0].frontmatter.buttonText : "See Promos";
  return (
    <Button w={1} to={href} variant="secondary" contained fontWeight={6}>
      {label}
    </Button>
  );
};

export { PromoButton };
