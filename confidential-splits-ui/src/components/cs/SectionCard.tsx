import React from 'react';
import { Box, Paper, Typography } from '@mui/material';
import { Kicker } from './Kicker';
import { usePointerGlow } from '../../hooks/useMotion';
import { csCardHoverShadow } from '../../config/theme';

interface SectionCardProps {
  title: string;
  subtitle?: string;
  icon?: React.ReactNode;
  action?: React.ReactNode;
  accent?: string;
  /** Editorial index shown in the kicker, e.g. "02". */
  index?: string;
  /** Uppercase kicker label. Defaults to the title. */
  kicker?: string;
  /** Enable the cursor-following glow (use sparingly — hero-level cards). */
  glow?: boolean;
  children: React.ReactNode;
  sx?: object;
}

/**
 * The one card primitive for the whole dashboard. Hairline border, layered
 * shadow, a quiet hover lift, an editorial kicker, an icon tile, and an
 * optional pointer-tracking glow. Every panel shares this rhythm so the page
 * reads as a single crafted surface rather than a stack of components.
 */
export const SectionCard: React.FC<SectionCardProps> = ({
  title,
  subtitle,
  icon,
  action,
  accent = '#5e6ad2',
  index,
  kicker,
  glow = false,
  children,
  sx,
}) => {
  const { ref, pos } = usePointerGlow<HTMLDivElement>();

  return (
    <Paper
      ref={glow ? ref : undefined}
      sx={{
        position: 'relative',
        height: '100%',
        p: { xs: 2.5, md: 3.25 },
        display: 'flex',
        flexDirection: 'column',
        overflow: 'hidden',
        borderRadius: '12px',
        animation: 'cs-rise 420ms cubic-bezier(.2,.7,.2,1) both',
        transition: 'border-color 180ms ease, box-shadow 180ms ease',
        '&:hover': {
          borderColor: '#34343a',
          boxShadow: csCardHoverShadow,
        },
        // subtle white edge highlight along the top — Linear's "rendered
        // pixel" cue for a lifted charcoal panel; never chromatic.
        '&::before': {
          content: '""',
          position: 'absolute',
          insetInline: 0,
          top: 0,
          height: 1,
          background: 'rgba(255,255,255,0.08)',
        },
        ...sx,
      }}
    >
      {glow && (
        <Box
          aria-hidden
          sx={{
            position: 'absolute',
            inset: 0,
            pointerEvents: 'none',
            opacity: 0.7,
            background: `radial-gradient(420px circle at ${pos.x * 100}% ${pos.y * 100}%, ${accent}14, transparent 60%)`,
            transition: 'background 120ms linear',
          }}
        />
      )}

      <Box sx={{ position: 'relative', zIndex: 1, display: 'flex', flexDirection: 'column', flexGrow: 1 }}>
        {(index || kicker) && <Kicker index={index} label={(kicker ?? '').toUpperCase()} color={accent} />}

        <Box sx={{ display: 'flex', alignItems: 'flex-start', gap: 1.5, mb: 2.25 }}>
          {icon && (
            <Box
              sx={{
                width: 40,
                height: 40,
                borderRadius: 2.5,
                flexShrink: 0,
                display: 'grid',
                placeItems: 'center',
                color: accent,
                bgcolor: `${accent}1a`,
                border: `1px solid ${accent}33`,
                boxShadow: `inset 0 1px 0 rgba(255,255,255,0.06)`,
              }}
            >
              {icon}
            </Box>
          )}
          <Box sx={{ flexGrow: 1, minWidth: 0 }}>
            <Typography variant="h6" sx={{ lineHeight: 1.2 }}>
              {title}
            </Typography>
            {subtitle && (
              <Typography variant="body2" color="text.secondary" sx={{ mt: 0.25, fontSize: '0.82rem' }}>
                {subtitle}
              </Typography>
            )}
          </Box>
          {action && <Box sx={{ flexShrink: 0 }}>{action}</Box>}
        </Box>

        <Box sx={{ flexGrow: 1, display: 'flex', flexDirection: 'column' }}>{children}</Box>
      </Box>
    </Paper>
  );
};
