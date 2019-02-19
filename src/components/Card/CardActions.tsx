import * as React from "react";
import { Box } from "primithemes";

interface Props {
  bg?: string;
}

const CardActions: React.SFC<Props> = ({ bg, children }) => {
  return (
    <Box p={3} bg={bg}>
      {children}
    </Box>
  );
};

CardActions.defaultProps = {
  bg: "grey.100",
};

export { CardActions };
