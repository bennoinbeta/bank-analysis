import React, { useState } from 'react';
import Input from './Input';
import { DEFAULT_SIZES } from '../../../../../styles/theme';
import Icon from '../../../icons';
import { storiesOf } from '@storybook/react';
import { css } from '@emotion/react';

function ValidInvalid() {
  const [valid, setValid] = useState(false);

  return (
    <div style={{ padding: 40 }}>
      <Input invalid={valid} placeholder="Hello there" />
      <Input
        style={{ marginTop: 10 }}
        invalid={valid}
        placeholder="Hello there"
      />

      <button
        type="button"
        onClick={() => setValid(!valid)}
        style={{ marginTop: 20 }}>
        toggle
      </button>
    </div>
  );
}

const actionIcon = <Icon.Plus />;

const sizes = DEFAULT_SIZES.map((size) => (
  <Input
    placeholder={`${size} input`}
    key={size}
    style={{ marginTop: 15 }}
    size={size as any}
  />
));

const getStates = (props?: any) => (
  <div style={{ maxWidth: 300, padding: 50 }}>
    <Input placeholder="Text" {...props} />
    <Input placeholder="Tel" type="tel" style={{ marginTop: 15 }} {...props} />
    <Input
      placeholder="Number"
      type="number"
      {...props}
      style={{ marginTop: 15 }}
    />
    <Input
      placeholder="Search"
      type="search"
      {...props}
      style={{ marginTop: 15 }}
    />
    <Input
      placeholder="Email"
      type="email"
      {...props}
      style={{ marginTop: 15 }}
    />
    <Input placeholder="Url" type="url" {...props} style={{ marginTop: 15 }} />
    <Input
      placeholder="Invalid"
      leftSection={{ component: <Icon.DollarSign /> }}
      invalid
      style={{ marginTop: 15 }}
      {...props}
    />
    <Input
      placeholder="Disabled"
      disabled
      style={{ marginTop: 15 }}
      {...props}
    />
    <Input
      placeholder="With icon"
      leftSection={{ component: <Icon.Calendar /> }}
      style={{ marginTop: 15 }}
      {...props}
    />
    <Input
      style={{ marginTop: 15 }}
      placeholder="With right section"
      rightSection={{ component: actionIcon }}
      {...props}
    />
    <Input
      style={{ marginTop: 15 }}
      placeholder="Right Section width"
      rightSection={{ component: actionIcon }}
      rightSectionWidth={50}
      {...props}
    />
  </div>
);

storiesOf('core/Input', module)
  .add('Sizes', () => <div style={{ maxWidth: 300, padding: 50 }}>{sizes}</div>)
  .add('Default variant', () => <>{getStates()}</>)
  .add('Invalid toggle', () => <ValidInvalid />)
  .add('With classNames', () => (
    <Input
      styles={{
        root: css`
          border: 4px solid green;
        `,
        input: css`
          font-weight: bold;
          color: blue;
        `,
      }}
      placeholder="Styled"
    />
  ));
