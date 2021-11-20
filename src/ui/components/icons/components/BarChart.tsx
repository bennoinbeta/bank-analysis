import React from 'react';

type Props = {
  color?: string;
  width?: number | string;
  height?: number | string;
  strokeWidth?: number;
  className?: string; // Required to apply styling via Styled-Components
} & React.SVGProps<SVGSVGElement>;

const BarChart = React.forwardRef<SVGSVGElement, Props>((props, ref) => {
  const { width, height, color, strokeWidth, ...others } = props;

  return (
    <svg
      width={width}
      height={height}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      ref={ref}
      {...others}
    >
      <path
        d="M18 20V10M12 20V4M6 20v-6"
        stroke={color}
        strokeWidth={strokeWidth}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
});

BarChart.defaultProps = {
  color: '#000000',
  width: 15,
  height: 15,
  strokeWidth: 2,
};

export default BarChart;
