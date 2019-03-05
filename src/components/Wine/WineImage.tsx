import * as React from "react";
import { Image, ImageProps } from "src/components/Image";

const WineImage: React.SFC<ImageProps> = props => {
  if (!props.fixed || props.fluid) {
    return (
      <div style={{ ...props.style, textAlign: "center" }}>
        <img
          src={require("./wine-placeholder.png")}
          style={{ width: "auto", height: "100%" }}
        />
      </div>
    );
  }
  return <Image {...props} />;
};

export { WineImage };
