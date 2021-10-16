import React from 'react';

type Props = {
  color?: string;
  width?: number | string;
  height?: number | string;
  strokeWidth?: number;
  className?: string; // Required to apply styling via Styled-Components
};

const Calendar: React.FC<Props> = (props) => {
  const { width, height, color, strokeWidth } = props;

  return (
    <svg
      width={width}
      height={height}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      {...props}>
      <path
        d="M19 4H5a2 2 0 00-2 2v14a2 2 0 002 2h14a2 2 0 002-2V6a2 2 0 00-2-2zM16 2v4M8 2v4M3 10h18"
        stroke={color}
        strokeWidth={strokeWidth}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};

Calendar.defaultProps = {
  color: '#000000',
  width: 24,
  height: 24,
  strokeWidth: 2,
};

export default Calendar;
