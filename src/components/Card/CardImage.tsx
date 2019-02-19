import * as React from "react";
import { Image } from "src/components/Image";

interface Props {
  image: any;
  height?: number | string;
}

const CardImage: React.SFC<Props> = ({ image, height }) => {
  return <Image style={{ height: height }} fluid={image} />;
};

CardImage.defaultProps = {
  height: 250,
};

export { CardImage };
