import React from 'react';

type ExtendedProps<_ExtendedProps = {}, OverrideProps = {}> = OverrideProps &
  Omit<_ExtendedProps, keyof OverrideProps>;

type PropsOf<
  C extends keyof JSX.IntrinsicElements | React.JSXElementConstructor<any>
> = JSX.LibraryManagedAttributes<C, React.ComponentPropsWithoutRef<C>>;

type InheritedProps<C extends React.ElementType, Props = {}> = ExtendedProps<
  PropsOf<C>,
  Props
>;

type ComponentProp<C extends React.ElementType> = {
  /**
   * Tag or component to be used as root element.
   */
  component?: C;
};

type RefProp<C extends React.ElementType> = {
  /**
   * Ref reffering to the root element.
   */
  ref?: PolymorphicRef<C>;
};

export type PolymorphicRef<C extends React.ElementType> =
  React.ComponentPropsWithRef<C>['ref'];

export type PolymorphicComponentProps<
  C extends React.ElementType,
  Props extends Object = {}
> = InheritedProps<C, Props & ComponentProp<C>> & RefProp<C>;
