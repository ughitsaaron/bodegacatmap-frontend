import { forwardRef } from 'react';
import { Link as Anchor } from '@mui/material';
import type { LinkProps as MuiLinkProps } from '@mui/material';
import NextLink from 'next/link';
import type { LinkProps } from 'next/link';
export const Link = forwardRef<HTMLAnchorElement, LinkProps & MuiLinkProps>((props, ref) => {
  return <Anchor component={NextLink} ref={ref} {...props} underline="none" />;
});
