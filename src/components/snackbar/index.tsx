import * as React from 'react';

import MuiAlert, { AlertProps } from '@mui/material/Alert';
import LinearProgress from '@mui/material/LinearProgress';
import Snackbar from '@mui/material/Snackbar';

interface propsPage {
  state: boolean;
  type: string;
  message: string;
  count: number;
}

const Alert = React.forwardRef<HTMLDivElement, AlertProps>(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

export default function SnackbarAlert({ state = false, type = 'error', message = '', count = 0 }: propsPage) {
  const [open, setOpen] = React.useState(state);
  const [progress, setProgress] = React.useState(0);

  const handleClose = (event?: React.SyntheticEvent | Event, reason?: string) => {
    if (reason === 'clickaway') {
      return;
    }

    setOpen(false);
  };

  React.useEffect(() => {
    setProgress(0);
    setOpen(state);
  }, [state, count]);

  React.useEffect(() => {
    const timer = setInterval(() => {
      setProgress((prevProgress) => (prevProgress >= 100 ? 0 : prevProgress + 10));
    }, 300);
    return () => {
      clearInterval(timer);
    };
  }, []);

  return (
    <Snackbar
      open={open}
      autoHideDuration={3000}
      anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
      onClose={handleClose}
    >
      {(() => {
        switch (type) {
          case 'success':
            return (
              <Alert severity="success" onClose={handleClose}>
                {message}
                <LinearProgress variant="determinate" value={progress} color="success" />
              </Alert>
            );
          case 'info':
            return (
              <Alert severity="info" onClose={handleClose}>
                {message}
                <LinearProgress variant="determinate" value={progress} color="info" />
              </Alert>
            );
          case 'warning':
            return (
              <Alert severity="warning" onClose={handleClose}>
                {message}
                <LinearProgress variant="determinate" value={progress} color="warning" />
              </Alert>
            );
          case 'error':
            return (
              <Alert severity="error" onClose={handleClose}>
                {message}
                <LinearProgress variant="determinate" value={progress} color="error" />
              </Alert>
            );
          default:
            return <div></div>;
        }
      })()}
    </Snackbar>
  );
}
