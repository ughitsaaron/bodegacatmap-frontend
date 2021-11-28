import {
  AppBar,
  Toolbar,
  Typography,
  Box,
  Button,
  useTheme,
  Stack,
  BottomNavigation,
  BottomNavigationAction,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  ListSubheader,
  Divider,
} from '@mui/material';
import dynamic from 'next/dynamic';
import { useUser } from '@auth0/nextjs-auth0';
import { times } from 'lodash';
import { useGetCatsQuery } from '../generated/graphql';

const Map = dynamic(
  async () => {
    const { Map } = await import('../components/Map');
    return Map;
  },
  { ssr: false }
);

const EmojiMarker = dynamic(
  async () => {
    const { EmojiMarker } = await import('../components/EmojiMarker');
    return EmojiMarker;
  },
  { ssr: false }
);

export default function Home(props) {
  const { user, error, isLoading } = useUser();
  const theme = useTheme();

  const { data } = useGetCatsQuery();

  return (
    <Box
      bgcolor={theme.palette.background.default}
      component={Stack}
      height="100vh"
      overflow="hidden"
      width="100vw"
    >
      <AppBar position="static" sx={{ zIndex: 1 }}>
        <Toolbar>
          <Typography sx={{ flexGrow: 1 }} variant="h6">
            Bodega Cats of NYC
          </Typography>
          {user ? (
            <Button href="/api/auth/logout" size="small" variant="contained">
              Log Out
            </Button>
          ) : (
            <Button href="/api/auth/login" size="small" variant="contained">
              Log In
            </Button>
          )}
        </Toolbar>
      </AppBar>
      <Box flexGrow={1} position="relative" width="100%" zIndex={0}>
        <Map>
          {!error &&
            !isLoading &&
            data?.cats.map((marker) => (
              <EmojiMarker
                draggable={false}
                key={marker.id}
                label="cat"
                position={[marker.lat, marker.lng]}
                symbol="🐈‍⬛"
              />
            ))}
        </Map>
      </Box>
      <List
        sx={{
          maxHeight: theme.spacing(30),
          overflowY: 'auto',
          paddingTop: 0,
        }}
      >
        {times(10, (n) => (
          <>
            <ListItem alignItems="flex-start" key={n}>
              <ListItemAvatar sx={{ paddingRight: theme.spacing(2) }}>
                <Box
                  borderRadius={theme.shape.borderRadius}
                  component="img"
                  height={theme.spacing(6)}
                  src="https://images2.minutemediacdn.com/image/upload/c_crop,h_1126,w_1673,x_163,y_0/v1554740199/shape/mentalfloss/561421-14094266871_89d6f06f89_k-flickr.jpg?itok=Tbv3YwaP"
                  width={theme.spacing(6)}
                />
              </ListItemAvatar>
              <ListItemText primary={`item ${n}`} secondary="2.45 miles away" />
            </ListItem>
            <Divider component="li" variant="inset" />
          </>
        ))}
      </List>
    </Box>
  );
}
