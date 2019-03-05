import * as React from "react";
import GatsbyImage from "gatsby-image";

interface ImageProps {
  fixed?: any;
  fluid?: any;
  className?: string;
  style?: object;
  critical?: boolean;
  fadeIn?: boolean;
  imgStyle?: any;
  placeholder?: any;
}

const Image: React.SFC<ImageProps> = (
  { fixed, fluid, className, critical, imgStyle, fadeIn, style, placeholder },
  ...props
) => {
  if (!(fluid || fixed))
    return (
      <div
        style={{
          background: `url(${placeholder || require("./default.jpg")})`,
          backgroundSize: "cover",
          backgroundPosition: "50% 50%",
          ...style,
        }}
        className={className}
      />
    );
  return (
    <GatsbyImage
      style={style}
      critical={critical}
      fadeIn={fadeIn}
      fluid={fluid && fluid.childImageSharp.fluid}
      fixed={fixed && fixed.childImageSharp.fixed}
      className={className}
      imgStyle={imgStyle}
      {...props}
    />
  );
};

export { Image, ImageProps };
