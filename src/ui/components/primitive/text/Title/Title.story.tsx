import React from 'react';

import { css } from '@emotion/react';
import styled from '@emotion/styled';
import { storiesOf } from '@storybook/react';

import { styleSheet } from '../../../../../styles';
import Title from './Title';

const StyledTitle = styled(Title)`
  color: red;
  font-weight: bold;
`;

const useStylesTitle = styleSheet.withoutParams().create({
  root: css`
    color: #61dafb;
    font-weight: bold;
  `,
});

storiesOf('core/Title', module)
  .add('General usage', () => (
    <div style={{ padding: 20 }}>
      <Title element={'h1'}>h1 title</Title>
      <Title element={'h2'}>h2 title</Title>
      <Title element={'h3'}>h3 title</Title>
      <Title element={'h4'}>h4 title</Title>
      <Title element={'h5'}>h5 title</Title>
      <Title element={'h6'}>h6 title</Title>
    </div>
  ))
  .add('Styled component', () => {
    const { classes } = useStylesTitle();

    return (
      <div>
        <StyledTitle>Styled with styled components</StyledTitle>

        <Title
          css={css`
            color: chocolate;
            font-weight: bold;
          `}
        >
          Styled with emotion
        </Title>

        <Title style={{ color: 'blue', fontWeight: 'bold' }}>
          Styled with style property
        </Title>

        <Title
          styles={(theme) => {
            return {
              root: { color: theme.primitiveColors.red, fontWeight: 'bold' },
            };
          }}
        >
          Styled root with styles property
        </Title>

        <Title
          styles={(theme) => ({
            root: css`
              color: ${theme.primitiveColors.green};
              font-weight: bold;
            `,
          })}
        >
          Styled root with emotion
        </Title>

        <Title styles={{ root: classes.root }}>
          Styled root with class name
        </Title>
      </div>
    );
  });
