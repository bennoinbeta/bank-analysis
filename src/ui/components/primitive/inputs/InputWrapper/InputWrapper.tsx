import React from 'react';
import Text from '../../text/Text';

export type InputWrapperBaseProps = {
  label?: React.ReactNode;
  labelElement?: 'label' | 'div';
  labelProps?: React.ComponentPropsWithoutRef<'label'>;
  description?: React.ReactNode;
  descriptionProps?: React.ComponentPropsWithoutRef<'div'>;
  error?: React.ReactNode;
  errorProps?: React.ComponentPropsWithoutRef<'div'>;
  required?: boolean;
};

export interface InputWrapperProps
  extends InputWrapperBaseProps,
    React.ComponentPropsWithoutRef<'div'> {}

const InputWrapper = React.forwardRef<HTMLDivElement, InputWrapperProps>(
  (props: InputWrapperProps, ref) => {
    const {
      label,
      labelProps,
      labelElement,
      description,
      descriptionProps,
      error,
      errorProps,
      children,
      ...other
    } = props;

    return (
      <div ref={ref} {...other}>
        {label && <p>{label}</p>}

        {description && (
          <Text {...descriptionProps} color="gray">
            {description}
          </Text>
        )}

        {children}

        {typeof error !== 'boolean' && error && (
          <Text {...errorProps}>{error}</Text>
        )}
      </div>
    );
  }
);

export default InputWrapper;
