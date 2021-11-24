import React from 'react';

import { storiesOf } from '@storybook/react';

import Icon from '../../../icons';
import NativeSelect from './NativeSelect';

const data = [
  { label: 'React', value: 'react' },
  { label: 'Angular', value: 'ng' },
  { label: 'Vue', value: 'vue' },
  { label: 'Svelte', value: 'svelte' },
];

function WrappedSelect(
  props: Omit<
    React.ComponentPropsWithoutRef<typeof NativeSelect>,
    'value' | 'onChange' | 'data'
  >
) {
  const [value, onChange] = React.useState<any>(null);

  return (
    <NativeSelect
      value={value}
      onChange={(event) => onChange(event.currentTarget.value)}
      data={data}
      {...props}
    />
  );
}

storiesOf('core/NativeSelect', module)
  .add('General usage', () => (
    <div style={{ maxWidth: 300, padding: 20 }}>
      <WrappedSelect placeholder="Your favorite library" />
    </div>
  ))
  .add('Uncontrolled', () => (
    <div style={{ maxWidth: 300, padding: 20 }}>
      <NativeSelect placeholder="Your favorite library" data={data} />
    </div>
  ))
  .add('Required', () => (
    <div style={{ maxWidth: 300, padding: 20 }}>
      <WrappedSelect required placeholder="Your favorite library" />
    </div>
  ))
  .add('Custom radius', () => (
    <div style={{ maxWidth: 300, padding: 20 }}>
      <WrappedSelect placeholder="Your favorite library" radius="xl" />
    </div>
  ))
  .add('Disabled', () => (
    <div style={{ maxWidth: 300, padding: 20 }}>
      <NativeSelect disabled placeholder="Your favorite library" data={data} />
      <NativeSelect
        style={{ marginTop: 20 }}
        disabled
        placeholder="Your favorite library"
        value="vue"
        data={data}
      />
    </div>
  ))
  .add('With icon', () => (
    <div style={{ maxWidth: 300, padding: 20 }}>
      <WrappedSelect
        leftSection={{ component: <Icon.Logo /> }}
        required
        placeholder="Your favorite library"
      />
    </div>
  ));
