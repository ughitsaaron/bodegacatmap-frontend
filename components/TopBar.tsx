import { AppBar, Box, Button, Stack, Toolbar } from '@mui/material';
import Link from 'next/link';
import type { ComponentRef, ReactNode } from 'react';
import { forwardRef } from 'react';

type Props = {
  menu?: ReactNode;
  title?: ReactNode;
};

export const TopBar = forwardRef<ComponentRef<typeof Toolbar>, Props>(
  ({ menu = null, title = null }, forwardedRef) => {
    return (
      <AppBar position="fixed" sx={{ background: 'transparent' }} variant={null}>
        <Stack direction="row" justifyContent="space-between">
          <Box paddingX={2}>
            <Link href="/" passHref={true} shallow={true}>
              <Button>{title}</Button>
            </Link>
          </Box>

          <Box flexBasis="100%">
            <Link href="/new" passHref={true} shallow={true}>
              <Button>Contribute</Button>
            </Link>
          </Box>
        </Stack>
        {/* <Toolbar ref={forwardedRef} variant="dense">
          <Box paddingRight={2}>{menu}</Box>
        </Toolbar> */}
      </AppBar>
    );
  }
);
