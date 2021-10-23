import { css, SerializedStyles } from '@emotion/react';
import { ThemeInterface } from '../../../../../core/entities/ui/ui.types';
import { useTheme } from '../../../../hooks/useTheme';

function createStyles<Params = void>(
  serializedStyles: (
    theme: ThemeInterface,
    params: Params
  ) => Record<string, SerializedStyles> | Record<string, SerializedStyles>
) {
  const getSerializedStyles =
    typeof serializedStyles === 'function'
      ? serializedStyles
      : () => serializedStyles;

  function useStyles(
    params: Params,
    classNames: Partial<Record<string, string>> | null = null,
    name?: string
  ) {
    const theme = useTheme();
    const _serializedStyles = getSerializedStyles(theme, params);

    // TODO https://github.com/emotion-js/emotion/blob/main/packages/react/src/class-names.js
    console.log(_serializedStyles);

    // TODO
  }

  return useStyles;
}

export default createStyles<any>((theme, { color, variant, size, inherit }) => {
  return {
    root: css`
      color: ${color != null ? color : theme.colors.on_background};
      font-family: ${inherit ? 'inherit' : 'roboto'};
      font-size: ${inherit ? 'inherit' : size};
      line-height: ${inherit ? 'inherit' : size * 1.2};
      text-decoration: none;

      -webkit-tap-highlight-color: transparent;

      :hover {
        text-decoration: ${variant === 'link' ? 'underline' : 'none'};
      }
    `,

    gradient: css``,
  };
});
