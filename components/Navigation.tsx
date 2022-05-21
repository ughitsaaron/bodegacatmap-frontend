import { useUser } from '@auth0/nextjs-auth0';
import {
  AddOutlined,
  FavoriteOutlined,
  LocationOn,
  LoginOutlined,
  LogoutOutlined,
} from '@mui/icons-material';
import {
  Box,
  Divider,
  Drawer,
  ListItemIcon,
  ListItemText,
  MenuItem,
  MenuList,
} from '@mui/material';
import Link from 'next/link';
import { useRouter } from 'next/router';

type Props = {
  isShowing: boolean;
  onClose: () => void;
  offsetTop: number | string;
};

export function Navigation({ isShowing, onClose, offsetTop }: Props) {
  const router = useRouter();

  return (
    <Drawer
      onBackdropClick={onClose}
      open={isShowing}
      sx={{
        flexShrink: 0,
        '& .MuiDrawer-paper': {
          top: offsetTop,
        },
      }}
    >
      <Box minWidth={200} overflow="auto">
        <MenuList>
          <Link href="/new" passHref={true}>
            <MenuItem component="a" onClick={onClose} selected={router.pathname.includes('/new')}>
              <ListItemIcon>
                <AddOutlined />
              </ListItemIcon>
              <ListItemText>Contribute</ListItemText>
            </MenuItem>
          </Link>
          <Link href="/404" passHref={true}>
            <MenuItem
              component="a"
              onClick={onClose}
              selected={router.pathname.includes('/explore')}
            >
              <ListItemIcon>
                <LocationOn />
              </ListItemIcon>
              <ListItemText>Explore</ListItemText>
            </MenuItem>
          </Link>
          <Link href="/404" passHref={true}>
            <MenuItem component="a" onClick={onClose} selected={router.pathname.includes('/saved')}>
              <ListItemIcon>
                <FavoriteOutlined />
              </ListItemIcon>
              <ListItemText>Saved</ListItemText>
            </MenuItem>
          </Link>
          <Divider />
          <AuthButton />
        </MenuList>
      </Box>
    </Drawer>
  );
}

function AuthButton() {
  const { user } = useUser();

  return (
    <MenuItem component="a" href={`/api/auth/${user ? 'logout' : 'login'}`}>
      {user ? (
        <>
          <ListItemIcon>
            <LogoutOutlined />
          </ListItemIcon>
          <ListItemText>Logout</ListItemText>
        </>
      ) : (
        <>
          <ListItemIcon>
            <LoginOutlined />
          </ListItemIcon>
          <ListItemText>Login</ListItemText>
        </>
      )}
    </MenuItem>
  );
}
