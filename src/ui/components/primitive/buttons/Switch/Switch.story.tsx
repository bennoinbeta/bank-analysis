import React from 'react';

import { storiesOf } from '@storybook/react';

import { DEFAULT_SIZES } from '../../../../../styles/theme';
import Switch, { SwitchProps } from './Switch';

function SwitchWrapper(props: Omit<SwitchProps, 'value' | 'onChange'>) {
  const [value, onChange] = React.useState(true);
  return (
    <Switch
      checked={value}
      onChange={(event) => onChange(event.currentTarget.checked)}
      {...props}
    />
  );
}

const sizes = DEFAULT_SIZES.map((size) => (
  <Switch
    key={size}
    size={size as any}
    label={`Switch ${size}`}
    style={{ marginTop: 15 }}
  />
));

storiesOf('core/Switch', module)
  .add('Themes', () => (
    <div style={{ padding: 15 }}>
      <Switch color={'blue'} />
      <Switch color={'red'} />
    </div>
  ))
  .add('Sizes', () => <div style={{ padding: 15 }}>{sizes}</div>)
  .add('Controlled', () => (
    <SwitchWrapper label="Controlled" style={{ padding: 15 }} />
  ))
  .add('Styled', () => (
    <SwitchWrapper
      label="Styled"
      style={{ padding: 15 }}
      styles={(theme) => ({
        root: {
          backgroundColor: theme.colors.denotive.error,
          '&:hover': { backgroundColor: theme.colors.denotive.success },
        },
      })}
    />
  ))
  .add('Autofocus', () => (
    <SwitchWrapper label="Autofocus" style={{ padding: 15 }} autoFocus />
  ))
  .add('Disabled', () => (
    <div style={{ padding: 15 }}>
      <Switch label="Disabled" disabled />
      <Switch
        checked
        label="Disabled checked"
        disabled
        style={{ marginTop: 15 }}
      />
    </div>
  ));
