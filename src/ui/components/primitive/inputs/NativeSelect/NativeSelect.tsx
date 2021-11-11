import React, { forwardRef } from 'react';
import Input, { InputBaseProps } from '../Input';
import { DefaultProps, useAgileTheme } from '../../../../../styles/theme';
import Icon from '../../../icons';
import { ExtractedStylesType, inputSizes } from '../Input/Input.styles';
import { getSizeValue } from '../../../../../styles/theme/utils/getSizeValue';

const NativeSelect = forwardRef<HTMLSelectElement, NativeSelectProps>(
  (props: NativeSelectProps, ref) => {
    const {
      data,
      placeholder,
      wrapperProps,
      rightSection,
      value,
      styles,
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
