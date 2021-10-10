import React from 'react';

type Props = {
  color?: string;
  width?: number | string;
  height?: number | string;
  strokeWidth?: number;
  className?: string; // Required to apply styling via Styled-Components
};

const Plus: React.FC<Props> = (props) => {
  const { width, height, color, strokeWidth, className } = props;

  return (
    <svg
      width={width}
      height={height}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      className={className}>
      <path
        d="M12 5v14M5 12h14"
        stroke={color}
        strokeWidth={strokeWidth}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};

Plus.defaultProps = {
  color: '#000000',
  width: 24,
  height: 24,
  strokeWidth: 2,
};

export default Plus;
