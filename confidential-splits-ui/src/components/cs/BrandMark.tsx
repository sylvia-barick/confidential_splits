import React from 'react';
import { Box, Typography } from '@mui/material';

interface BrandMarkProps {
  tagline?: boolean;
  size?: number;
  compact?: boolean;
}

/**
 * Logo lock-up: a crisp bordered monogram tile + the wordmark, optionally
 * with a tagline. Deliberately restrained — no gradient blob.
 */
export const BrandMark: React.FC<BrandMarkProps> = ({ tagline = false, size = 34, compact = false }) => (
  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.25 }}>
    <Box
      sx={{
        width: size,
        height: size,
        borderRadius: 2,
        flexShrink: 0,
        display: 'grid',
        placeItems: 'center',
        position: 'relative',
        bgcolor: 'rgba(94,106,210,0.12)',
        border: '1px solid rgba(94,106,210,0.35)',
        overflow: 'hidden',
      }}
    >
      <img
        src="/logo.png"
        alt="Confidential Splits"
        style={{ width: '68%', height: '68%', objectFit: 'contain', position: 'relative', zIndex: 1 }}
      />
    </Box>
    <Box sx={{ lineHeight: 1.05 }}>
      <Typography
        component="span"
        sx={{
          fontFamily: "'Inter', sans-serif",
          fontWeight: 600,
          fontSize: compact ? '0.98rem' : '1.1rem',
          letterSpacing: '-0.02em',
          display: 'block',
          color: 'text.primary',
        }}
      >
        Confidential&nbsp;Splits
      </Typography>
      {tagline && (
        <Typography component="span" sx={{ fontSize: '0.72rem', color: 'text.secondary', letterSpacing: '0.02em' }}>
          Private group settlements on Midnight
        </Typography>
      )}
    </Box>
  </Box>
);
