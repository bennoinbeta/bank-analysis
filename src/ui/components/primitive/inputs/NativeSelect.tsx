import React, { forwardRef } from 'react';
import BaseInput, { BaseInputProps } from './BaseInput';

export interface NativeSelectProps
  extends BaseInputProps,
    React.ComponentPropsWithoutRef<'select'> {
  placeholder?: string;
  data: (string | SelectItem)[];
}

export interface SelectItem {
  value: string;
  label?: string;
  disabled?: boolean;
  group?: string;
  [key: string]: any;
}

export const NativeSelect = forwardRef<HTMLSelectElement, NativeSelectProps>(
  (props: NativeSelectProps, ref) => {
    const {
      data,
      placeholder,
      wrapperProps,
      rightSection,
      onChange,
      value,
      ...other
    } = props;
    const formattedData = data.map((item) =>
      typeof item === 'string' ? { label: item, value: item } : item
    );

    const options = formattedData.map((item) => (
      <option key={item.value} value={item.value} disabled={item.disabled}>
        {item.label}
      </option>
    ));

    if (placeholder) {
      options.unshift(
        <option key="placeholder" value="" disabled hidden>
          {placeholder}
        </option>
      );
    }

    return (
      <BaseInput<'select'>
        {...other}
        component="select"
        onChange={onChange}
        ref={ref}
        value={value === null ? '' : value}>
        {options}
      </BaseInput>
    );
  }
);
