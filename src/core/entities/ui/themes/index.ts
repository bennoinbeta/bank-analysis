import { ThemePaths } from '../../../../styles/theme';
import dark from './theme.dark';
import light from './theme.light';

// Themes
const themes = {
  dark,
  light,
};

export default themes;

export { dark, light };

export type ThemeTypes = ThemePaths<typeof themes>;
