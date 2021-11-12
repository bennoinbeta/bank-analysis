export interface PrimaryColorVariation {
  pM2: string; // Primary -2 Color
  pM1: string; // Primary -1 Color
  p0: string; // Primary 0 Color
  pP1: string; // Primary +1 Color
  pP2: string; // Primary +2 Color
}

export interface LayoutColors {
  p: string; // Primary Color
  lc: string; // Low Contrast Color
  hc: string; // High Contrast Color
  rHc: string; // Reduced High Contrast Color
  bg: string; // Background Color
}

export interface DenotiveColors {
  error: string;
  on_error: string;
  success: string;
  on_success: string;
}

export interface DisabledColors {
  d1: string; // Disabled State 1 Color
  d2: string; // Disabled State 2 Color
}

export interface InteractiveColors {
  primary: PrimaryColorVariation;
}

export interface Colors {
  layout: LayoutColors;
  denotive: DenotiveColors;
  disabled: DisabledColors;
  interactive: InteractiveColors;
}
