import React from 'react';

type Props = {
  color?: string;
  width?: number;
  height?: number;
  strokeWidth?: number;
};

const AlertCircle: React.FC<Props> = (props) => {
  const { width, height, color, strokeWidth } = props;

  return (
    <svg
      width={width}
      height={height}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24">
      <path
        d="M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10zM12 8v4M12 16h.01"
        stroke={color}
        strokeWidth={strokeWidth}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};

AlertCircle.defaultProps = {
  color: '#000000',
  width: 24,
  height: 24,
  strokeWidth: 2,
};

export default AlertCircle;
