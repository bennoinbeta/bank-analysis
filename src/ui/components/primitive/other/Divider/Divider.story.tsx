import Divider from './Divider';
import { DEFAULT_THEME } from '../../../../../styles/theme';
import { storiesOf } from '@storybook/react';
import Text from '../../text/Text';

const getSizes = (props?: any) => {
  return ['xs', 'sm', 'md', 'lg', 'xl', 10].map((size) => (
    <Divider
      size={size as any}
      style={{ marginTop: 15 }}
      key={size}
      {...props}
    />
  ));
};

const getColors = (props?: any) =>
  Object.keys(DEFAULT_THEME.colors).map((color) => (
    <Divider color={color} style={{ marginTop: 15 }} key={color} {...props} />
  ));

storiesOf('core/Divider', module)
  .add('General usage', () => (
    <div style={{ padding: 20 }}>
      <Divider />
      <Divider variant="dotted" style={{ marginTop: 15 }} />
      <Divider variant="dashed" style={{ marginTop: 15 }} />
    </div>
  ))
  .add('Sizes', () => <div style={{ padding: 20 }}>{getSizes()}</div>)
  .add('Colors', () => <div style={{ padding: 20 }}>{getColors()}</div>)
  .add('Vertical Divider', () => (
    <div
      style={{
        display: 'flex',
        flexDirection: 'row',
        maxWidth: 400,
        justifyContent: 'space-evenly',
        marginTop: 15,
      }}>
      <Text>Light</Text>
      <Divider orientation="vertical" />
      <Text>Outline</Text>
      <Divider orientation="vertical" />
      <Text>Filled</Text>
    </div>
  ));
