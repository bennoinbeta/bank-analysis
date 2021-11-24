import React, { forwardRef } from 'react';

import { DefaultProps, useAgileTheme } from '../../../../../styles/theme';
import { getSizeValue } from '../../../../../styles/theme/utils/getSizeValue';
import Icon from '../../../icons';
import Input, { InputBaseProps } from '../Input';
import { ExtractedStylesType, inputSizes } from '../Input/Input.styles';

const NativeSelect = forwardRef<HTMLSelectElement, NativeSelectProps>(
  (props: NativeSelectProps, ref) => {
    const {
      data,
      placeholder,
      wrapperProps,
      rightSection,
      value,
      styles = {},
      size = 'md',
      ...others
    } = props;
    const theme = useAgileTheme();

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
        {...others}
        component="select"
        ref={ref}
        value={value === null ? '' : value}
        size={size}
        styles={{
          ...styles,
          // @ts-ignore
          rightSection: { ...styles?.rightSection, pointerEvents: 'none' },
        }}
        rightSection={{
          component: (
            <Icon.ChevronUpDown
              color={theme.colors.layout.rHc}
              width={getSizeValue(size, inputSizes) / 2.5}
              height={getSizeValue(size, inputSizes) / 2.5}
            />
          ),
        }}
        __staticSelector="NativeSelect"
      >
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
