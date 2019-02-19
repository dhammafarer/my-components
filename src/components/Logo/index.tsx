import * as React from "react";
import { styled } from "primithemes";

interface Props {
  variant?: string;
  opacity?: number;
  width: number;
}

const Svg = styled.svg<Props>`
  opacity: ${props => props.opacity};
  & * {
    fill: ${props => props.variant === "dark" && props.theme.colors.text.dark};
    fill: ${props =>
      props.variant === "light" && props.theme.colors.white.light};
  }
`;

export const Logo: React.SFC<Props> = ({ variant, opacity, width }) => (
  <Svg
    width={width}
    height="100%"
    variant={variant}
    opacity={opacity}
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 93.78 52.26"
    id="svg8"
  >
    <g id="layer1" transform="translate(842.28 -547.05)">
      <g id="g5442" transform="translate(-79.83 329.54)" strokeWidth=".13">
        <path
          d="M-730.4 217.51c-.7 0-1.4.2-1.93.6l-29.84 22.67s13.84-3.75 46.51-3.84c32.67-.1 46.51 3.57 46.51 3.57l-29.61-17.53a5.3 5.3 0 0 0-4.93 0l-10.33 6.12-14.47-10.98a3.2 3.2 0 0 0-1.92-.6z"
          id="path5371"
          fill="#33334c"
          strokeDasharray=".25479175,.12739588"
        />
        <path
          d="M-715.57 239.73h-.44l-11.01 8.3 13.03 8.7 12.57-9.27-11.56-7.72-2.59-.01zm-2.6.01c-7.65.06-14.36.37-20.1.79l10.11 6.74zm7.54.02l10.3 6.9 8.4-6.19c-5.36-.35-11.6-.62-18.7-.7zm20.67.85l-9.22 6.8 13 8.7 17.5-12.97s-7.35-1.51-21.28-2.53zm-50.38.08c-14.5 1.18-22.11 3.03-22.11 3.03l18.65 15.34 14.56-10.97zm40.06 7.54l-13.12 9.66 9.35 6.1c1.31.85 4.12 2.28 7.2 0l9.56-7.08zm-27.83.62l-14.66 11.05 11.22 9.23c.51.42 1.18.64 1.85.64.66 0 1.33-.22 1.84-.64l13.38-11.19z"
          id="path5373"
          fill="#248ccc"
          strokeDasharray=".25676028,.12838015"
        />
      </g>
    </g>
  </Svg>
);
