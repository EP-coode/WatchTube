import React, { useState } from 'react';
import { ContentCopy as ContentCopyIcon } from '@mui/icons-material';
import { Box, IconButton, Snackbar } from '@mui/material';

type Props = {
  label: string;
  textToCoppy: string;
};

export default function ClipBoardCoppyLabel({ label, textToCoppy }: Props) {
  const [coppyToastOpened, setCoppyToastOpened] = useState(false);

  const handleCoppyClick = () => {
    navigator.clipboard.writeText(textToCoppy);
    setCoppyToastOpened(true);
  };

  return (
    <Box
      sx={{
        display: 'flex',
        gap: 1,
        alignItems: 'center',
        m: 1,
        flexDirection: 'row',
      }}
    >
      <span style={{ overflowWrap: 'anywhere' }}>{label}</span>
      <IconButton onClick={handleCoppyClick}>
        <ContentCopyIcon />
      </IconButton>
      <Snackbar
        open={coppyToastOpened}
        autoHideDuration={2000}
        onClose={() => setCoppyToastOpened(false)}
        message="Link coppied"
      />
    </Box>
  );
}
