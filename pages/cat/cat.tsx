import { Card, Typography, useTheme } from '@mui/material';
import { useRouter } from 'next/router';
import { useMap } from 'react-leaflet';

export default function CatPage() {
  const theme = useTheme();
  const map = useMap();
  const router = useRouter();
  // const { data } = useGetCatQuery({
  //   variables: { catId: router.query.id as string },
  //   onCompleted: (res) => {
  //     if (res) {
  //       const { lat, lng } = res.cat;
  //       map.panTo([lat, lng]);
  //     }
  //   },
  // });

  return (
    <Card>
      <Typography variant="h1">{router?.query?.id}</Typography>
    </Card>
  );
}
