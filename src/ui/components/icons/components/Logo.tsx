import React from 'react';

type Props = {
  color?: string;
  width?: number | string;
  height?: number | string;
  className?: string; // Required to apply styling via Styled-Components
} & React.SVGProps<SVGSVGElement>;

const Logo = React.forwardRef<SVGSVGElement, Props>((props, ref) => {
  const { width, height, color, ...others } = props;

  return (
    <svg
      width={width}
      height={height}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      ref={ref}
      {...others}>
      <g
        clipPath="url(#prefix__clip0)"
        stroke={color}
        strokeWidth={2}
        strokeLinecap="round"
        strokeLinejoin="round">
        <path d="M6.057 11.658H18.63M8.343 8.8v4.286a2 2 0 104 0v-2.857a2 2 0 114 0v4.857" />
      </g>
      <rect
        x={1}
        y={1}
        width={22}
        height={22}
        rx={4}
        stroke={color}
        strokeWidth={2}
      />
      <defs>
        <clipPath id="prefix__clip0">
          <path
            fill="#fff"
            transform="rotate(-90 12 6.514)"
            d="M0 0h13.714v13.714H0z"
          />
        </clipPath>
      </defs>
    </svg>
  );
});

Logo.defaultProps = {
  color: '#000000',
  width: 15,
  height: 15,
};

export default Logo;
