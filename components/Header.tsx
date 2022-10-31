import { useUser } from '@auth0/nextjs-auth0';
import { AddLocationAltRounded, LoginRounded, LogoutRounded } from '@mui/icons-material';
import { AppBar, Chip, Stack, Toolbar, Typography, Box, Portal } from '@mui/material';
import { Link } from './Link';
import { forwardRef } from 'react';
import type { ReactNode } from 'react';
import { useLayout } from '../contexts';

type Props = { title?: ReactNode };
export const Header = forwardRef<HTMLElement, Props>(({ title = null }, headerRef) => {
  const { user } = useUser();
  const isLoggedIn = Boolean(user);

  return (
    <AppBar position="static" sx={{ zIndex: 500 }}>
      <Toolbar>
        <Link href="/">
          <Typography color="white" noWrap={true} variant="h6">
            {title}
          </Typography>
        </Link>

        <Stack alignItems="center" direction="row" gap={1} paddingLeft={4}>
          {isLoggedIn ? (
            <>
              <Link href="/new">
                <Chip clickable={true} icon={<AddLocationAltRounded />} label="Contribute" />
              </Link>
              <Chip
                clickable={true}
                component="a"
                href="/api/auth/logout"
                icon={<LogoutRounded />}
                label="Logout"
              />
            </>
          ) : (
            <Chip
              clickable={true}
              component="a"
              href="/api/auth/login"
              icon={<LoginRounded />}
              label="Login"
            />
          )}
        </Stack>
        <Box ref={headerRef} width="100%" />
      </Toolbar>
    </AppBar>
  );
});

export function HeaderActions({ children }) {
  const { header } = useLayout();

  return (
    <Portal container={header}>
      <Box alignItems="center" display="flex" justifyContent="flex-end" width="100%">
        {children}
      </Box>
    </Portal>
  );
}
