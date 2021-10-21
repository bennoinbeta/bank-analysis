// https://www.benmvp.com/blog/forwarding-refs-polymorphic-react-component-typescript/

import React from 'react';

// Merges the 'OverrideProps' into the '_ExtendedProps'
type ExtendableProps<ExtendedProps = {}, OverrideProps = {}> = OverrideProps &
  Omit<ExtendedProps, keyof OverrideProps>;

// Extracts the props of the specified JSX Component
type PropsOf<
  C extends keyof JSX.IntrinsicElements | React.JSXElementConstructor<any>
> = JSX.LibraryManagedAttributes<C, React.ComponentPropsWithoutRef<C>>;

type InheritedProps<C extends React.ElementType, Props = {}> = ExtendableProps<
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
