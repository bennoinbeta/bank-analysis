import React, { forwardRef } from 'react';
import Input, { InputBaseProps } from '../Input';
import { DefaultProps } from '../../../../../styles/theme';
import Icon from '../../../icons';
import { css } from '@emotion/react';
import { ExtractedStylesType } from '../Input/Input.styles';

const NativeSelect = forwardRef<HTMLSelectElement, NativeSelectProps>(
  (props: NativeSelectProps, ref) => {
    const {
      data,
      placeholder,
      wrapperProps,
      rightSection,
      value,
      styles,
      ...others
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
      <Input<'select'>
        component="select"
        ref={ref}
        value={value === null ? '' : value}
        rightSection={{
          component: <Icon.ChevronUpDown style={{ paddingRight: 10 }} />,
        }}
        {...others}>
        {options}
      </Input>
    );
  }
);

export default NativeSelect;

export interface NativeSelectProps
  extends InputBaseProps,
    DefaultProps<ExtractedStylesType>,
    Omit<React.ComponentPropsWithoutRef<'select'>, 'size'> {
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
