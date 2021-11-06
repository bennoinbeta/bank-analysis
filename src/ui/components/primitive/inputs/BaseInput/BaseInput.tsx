import React from 'react';
import styled from '@emotion/styled';
import {
  PolymorphicComponentProps,
  PolymorphicRef,
} from '../../../../../styles';

export type BaseInputProps = {
  leftSection?: {
    component: React.ReactNode;
    props?: React.ComponentPropsWithoutRef<'div'>;
  };
  rightSection?: {
    component: React.ReactNode;
    props?: React.ComponentPropsWithoutRef<'div'>;
  };
  wrapperProps?: React.ComponentPropsWithoutRef<'div'>;
  disabled?: boolean;
  multiline?: boolean;
};

export type InputProps<C extends React.ElementType> = PolymorphicComponentProps<
  C,
  BaseInputProps
>;

type InputComponent = <C extends React.ElementType = 'input'>(
  props: InputProps<C>
) => React.ReactElement;

const BaseInput: InputComponent = React.forwardRef(
  <C extends React.ElementType = 'input'>(
    props: InputProps<C>,
    ref: PolymorphicRef<C>
  ) => {
    const {
      component,
      className,
      invalid = false,
      required = false,
      disabled = false,
      leftSection,
      rightSection,
      wrapperProps,
      multiline = false,
      ...other
    } = props;
    const Input = StyledInput as any;

    return (
      <WrapperContainer className={className} {...wrapperProps}>
        {leftSection && (
          <LeftSectionContainer {...leftSection?.props}>
            {leftSection.component}
          </LeftSectionContainer>
        )}
        <Input
          {...other}
          as={component || 'input'} // https://stackoverflow.com/questions/52093461/styled-component-dynamic-tag-name
          ref={ref}
          aria-required={required}
          aria-invalid={invalid}
          disabled={disabled}
        />
        {rightSection && (
          <RigthSectionContainer {...rightSection?.props}>
            {rightSection.component}
          </RigthSectionContainer>
        )}
      </WrapperContainer>
    );
  }
) as any;

export default BaseInput;

const WrapperContainer = styled.div`
  background-color: ${({ theme }) => theme.colors.layout.p};

  border: solid 1 ${({ theme }) => theme.colors.layout.p};

  transition: border-color 100ms ease, box-shadow 100ms ease;

  :focus,
  :focus-within {
    outline: none;
    border-color: ${({ theme }) => theme.colors.layout.p};
  }
`;

const StyledInput = styled.div`
  display: block;
  text-align: left;

  color: ${({ theme }) => theme.colors.layout.p};
  background-color: ${({ theme }) => theme.colors.layout.p};

  width: 100%;

  :disabled {
    color: ${({ theme }) => theme.colors.layout.p};
    background-color: ${({ theme }) => theme.colors.layout.p};
    opacity: 0.6;
    cursor: not-allowed;
  }

  ::placeholder {
    opacity: 1;
    user-select: none;
    color: ${({ theme }) => theme.primitiveColors.gray};
  }
`;

const LeftSectionContainer = styled.div`
  position: absolute;
  left: 0;
  top: 0;
  bottom: 0;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const RigthSectionContainer = styled.div`
  position: absolute;
  top: 0;
  bottom: 0;
  right: 0;
  display: flex;
  align-items: center;
  justify-content: center;
`;
