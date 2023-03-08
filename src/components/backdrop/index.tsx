import * as React from 'react';

import { Backdrop, CircularProgress } from '@mui/material';

interface pageProps {
  open: boolean;
}

export default function BackdropLoading(props: pageProps) {
  return (
    <div>
      <Backdrop sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }} open={props.open}>
        <CircularProgress color="inherit" />
      </Backdrop>
    </div>
  );
}
