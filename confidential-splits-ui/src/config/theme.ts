import { createTheme, alpha } from '@mui/material';

/**
 * Confidential Splits — restyled on the Linear.app design system.
 *
 * Near-black canvas (#010102) with a four-step charcoal surface ladder,
 * hairline borders instead of shadows, and a single chromatic accent —
 * Linear's signature lavender-blue — reserved for primary actions, focus
 * rings and brand marks. The muted "brand secure" lavender-gray is the one
 * permitted tint variation, used for the app's shielded/private surfaces.
 * Display type runs Inter at weight 600 with aggressive negative tracking;
 * body holds at 400. JetBrains Mono carries every on-chain value.
 */

// ---- palette tokens ---------------------------------------------------------

const canvas = '#010102';

const surface = {
  1: '#0f1011',
  2: '#141516',
  3: '#18191a',
  4: '#191a1b',
};

const hairline = {
  faint: '#23252a',
  strong: '#34343a',
  tertiary: '#3e3e44',
};

const lavender = {
  main: '#5e6ad2',
  light: '#828fff',
  dark: '#5e69d1',
  contrastText: '#ffffff',
};

// The one sanctioned tint variation of the brand hue — muted lavender-gray,
// reserved for "security" surfaces (here: the shielded/private balance card).
const brandSecure = {
  main: '#7a7fad',
  light: '#9a9fc4',
  dark: '#5f6386',
  contrastText: '#0f1011',
};

const text = {
  primary: '#f7f8f8',
  secondary: '#8a8f98',
  disabled: '#62666d',
};

export const csTokens = { canvas, surface, hairline, lavender, brandSecure, text };

// ---- shared style fragments ----------------------------------------------------

// Linear resists drop shadows on dark — depth comes from the surface ladder
// and a hairline border, plus a faint top-edge highlight for a "rendered
// pixel" feel.
const cardShadow = 'inset 0 1px 0 rgba(255,255,255,0.04)';
const cardShadowHover = 'inset 0 1px 0 rgba(255,255,255,0.07)';

export const theme = createTheme({
  palette: {
    mode: 'dark',
    primary: lavender,
    secondary: brandSecure,
    success: { main: '#27a644', light: '#4ec46a', dark: '#1d7a34' },
    warning: { main: '#fbbf24', light: '#fcd34d', dark: '#d97706' },
    error: { main: '#f87171', light: '#fca5a5', dark: '#dc2626' },
    info: { main: '#60a5fa', light: '#93c5fd', dark: '#2563eb' },
    background: { default: canvas, paper: surface[1] },
    text,
    divider: hairline.faint,
  },

  shape: { borderRadius: 8 },

  typography: {
    fontFamily: "'Inter', system-ui, -apple-system, 'Segoe UI', Roboto, sans-serif",
    h1: { fontFamily: "'Inter', sans-serif", fontWeight: 600, letterSpacing: '-0.0375em', lineHeight: 1.05 },
    h2: { fontFamily: "'Inter', sans-serif", fontWeight: 600, letterSpacing: '-0.032em', lineHeight: 1.1 },
    h3: { fontFamily: "'Inter', sans-serif", fontWeight: 600, letterSpacing: '-0.025em', lineHeight: 1.15 },
    h4: { fontFamily: "'Inter', sans-serif", fontWeight: 600, letterSpacing: '-0.021em', lineHeight: 1.2 },
    h5: { fontFamily: "'Inter', sans-serif", fontWeight: 500, letterSpacing: '-0.018em', lineHeight: 1.25 },
    h6: { fontFamily: "'Inter', sans-serif", fontWeight: 500, letterSpacing: '-0.01em', lineHeight: 1.3 },
    subtitle1: { fontWeight: 400, letterSpacing: '-0.01em' },
    subtitle2: { fontWeight: 600, letterSpacing: '0.01em' },
    body2: { lineHeight: 1.6 },
    button: { fontWeight: 500, letterSpacing: 0, textTransform: 'none' },
    overline: { fontWeight: 500, letterSpacing: '0.06em', fontSize: '0.72rem' },
    caption: { letterSpacing: 0 },
  },

  components: {
    MuiCssBaseline: {
      styleOverrides: {
        ':root': { colorScheme: 'dark' },

        // Flat canvas — Linear's marketing surface carries no atmospheric
        // gradients or spotlight glows, only the near-black anchor color.
        body: {
          minHeight: '100vh',
          backgroundColor: canvas,
          color: text.primary,
        },

        '::selection': { background: alpha(lavender.main, 0.35) },

        '*::-webkit-scrollbar': { width: 11, height: 11 },
        '*::-webkit-scrollbar-track': { background: 'transparent' },
        '*::-webkit-scrollbar-thumb': {
          background: alpha(lavender.light, 0.2),
          borderRadius: 8,
          border: '3px solid transparent',
          backgroundClip: 'padding-box',
        },
        '*::-webkit-scrollbar-thumb:hover': { background: alpha(lavender.light, 0.38), backgroundClip: 'padding-box' },

        // Motion vocabulary
        '@keyframes cs-rise': {
          from: { opacity: 0, transform: 'translateY(10px)' },
          to: { opacity: 1, transform: 'translateY(0)' },
        },
        '@keyframes cs-pulse': { '0%,100%': { opacity: 1 }, '50%': { opacity: 0.3 } },
        '@keyframes cs-ping': {
          '0%': { transform: 'scale(1)', opacity: 0.5 },
          '80%,100%': { transform: 'scale(2.4)', opacity: 0 },
        },
        '@media (prefers-reduced-motion: reduce)': {
          '*': { animationDuration: '0.001ms !important', animationIterationCount: '1 !important' },
        },
      },
    },

    MuiContainer: { styleOverrides: { root: { position: 'relative', zIndex: 1 } } },

    MuiPaper: {
      defaultProps: { elevation: 0 },
      styleOverrides: {
        root: {
          backgroundImage: 'none',
          backgroundColor: surface[1],
          border: `1px solid ${hairline.faint}`,
          borderRadius: 12,
          boxShadow: cardShadow,
          backgroundClip: 'padding-box',
        },
      },
    },

    MuiAppBar: {
      styleOverrides: {
        root: {
          backgroundImage: 'none',
          backgroundColor: canvas,
          borderBottom: `1px solid ${hairline.faint}`,
          boxShadow: 'none',
          color: text.primary,
        },
      },
    },

    MuiButton: {
      defaultProps: { disableElevation: true },
      styleOverrides: {
        root: {
          borderRadius: 8,
          paddingInline: 14,
          paddingBlock: 8,
          transition: 'background-color 140ms ease, border-color 140ms ease, color 140ms ease',
          '&:focus-visible': { outline: `2px solid ${alpha(lavender.dark, 0.5)}`, outlineOffset: 2 },
          '&.Mui-disabled': { opacity: 0.42 },
        },
        contained: {
          backgroundColor: lavender.main,
          boxShadow: 'none',
          '&:hover': { backgroundColor: lavender.light, boxShadow: 'none' },
          '&.MuiButton-colorSecondary': {
            color: brandSecure.contrastText,
            backgroundColor: brandSecure.main,
          },
          '&.MuiButton-colorSecondary:hover': { backgroundColor: brandSecure.light },
        },
        outlined: {
          borderColor: hairline.faint,
          color: text.primary,
          backgroundColor: surface[1],
          '&:hover': { borderColor: hairline.strong, backgroundColor: surface[2] },
        },
        text: { '&:hover': { backgroundColor: alpha(lavender.main, 0.08) } },
        sizeSmall: { paddingInline: 12, paddingBlock: 6, fontSize: '0.8rem', borderRadius: 8 },
        sizeLarge: { paddingBlock: 10, fontSize: '0.98rem', borderRadius: 8 },
      },
    },

    MuiChip: {
      styleOverrides: {
        root: {
          fontWeight: 500,
          letterSpacing: '0.01em',
          borderRadius: 9999,
          height: 26,
          border: `1px solid ${hairline.faint}`,
          backgroundColor: surface[2],
          color: text.secondary,
        },
        label: { paddingInline: 10 },
        outlined: { backgroundColor: 'transparent' },
        sizeSmall: { height: 22, fontSize: '0.72rem' },
        icon: { marginLeft: 7 },
      },
    },

    MuiDivider: { styleOverrides: { root: { borderColor: hairline.faint } } },

    MuiOutlinedInput: {
      styleOverrides: {
        root: {
          borderRadius: 8,
          backgroundColor: surface[1],
          transition: 'border-color 140ms ease, box-shadow 140ms ease',
          '& .MuiOutlinedInput-notchedOutline': { borderColor: hairline.faint },
          '&:hover .MuiOutlinedInput-notchedOutline': { borderColor: hairline.strong },
          '&.Mui-focused': { boxShadow: `0 0 0 2px ${alpha(lavender.dark, 0.5)}` },
          '&.Mui-focused .MuiOutlinedInput-notchedOutline': { borderColor: lavender.main, borderWidth: 1 },
        },
        input: { fontFamily: "'Inter', sans-serif", '&::placeholder': { color: text.disabled, opacity: 1 } },
      },
    },
    MuiInputLabel: { styleOverrides: { root: { '&.Mui-focused': { color: lavender.light } } } },

    MuiAlert: {
      styleOverrides: {
        root: {
          borderRadius: 8,
          border: `1px solid ${hairline.faint}`,
          alignItems: 'center',
          backgroundColor: surface[2],
        },
        icon: { opacity: 0.9 },
        message: { fontSize: '0.86rem' },
      },
    },

    MuiTooltip: {
      styleOverrides: {
        tooltip: {
          backgroundColor: surface[3],
          border: `1px solid ${hairline.strong}`,
          fontSize: '0.74rem',
          fontWeight: 500,
          padding: '6px 10px',
          borderRadius: 6,
          boxShadow: 'none',
        },
        arrow: { color: surface[3] },
      },
    },

    MuiLinearProgress: {
      styleOverrides: {
        root: { borderRadius: 9999, backgroundColor: alpha(lavender.light, 0.14), height: 3 },
        bar: { borderRadius: 9999, backgroundColor: lavender.main },
      },
    },

    MuiSkeleton: {
      styleOverrides: {
        root: { backgroundColor: alpha('#ffffff', 0.05), borderRadius: 8 },
      },
    },

    MuiSnackbarContent: { styleOverrides: { root: { borderRadius: 8 } } },
  },
});

// re-export for consumers that want the raw hover shadow
export const csCardHoverShadow = cardShadowHover;
