import { AddLocation, AddLocationAlt } from '@mui/icons-material';
import { useMap } from 'react-leaflet';
import { useCreateCatMutation, LatLngFragmentDoc } from '../../generated/graphql';
import type { LatLngFragment } from '../../generated/graphql';
import { Box, Chip } from '@mui/material';
import { useRouter } from 'next/router';
import { HeaderActions } from '../../components/Header';

export function NewPage() {
  const map = useMap();
  const { push } = useRouter();
  const [createCat, { loading, error, data }] = useCreateCatMutation({
    update: (cache, { data, errors }) => {
      if (!errors) {
        cache.modify({
          fields: {
            cats: (cats) => {
              const id = cache.identify({ __typename: 'Cat', id: data?.createCat.id });
              const ref = cache.writeFragment<LatLngFragment>({
                id,
                data: data?.createCat,
                fragment: LatLngFragmentDoc,
              });

              return [...cats, ref];
            },
          },
        });
      }
    },
  });

  async function handleOnSave() {
    const { lat, lng } = map.getCenter();
    const result = await createCat({ variables: { lat, lng } });
    push(`/cat/${result.data.createCat.id}`);
  }

  return (
    <>
      <Box
        alignItems="center"
        display={loading ? 'none' : 'flex'}
        height="100%"
        justifyContent="center"
        position="relative"
        zIndex={405}
      >
        <AddLocation fontSize="large" htmlColor="black" />
      </Box>
      <HeaderActions>
        <Chip
          clickable={true}
          color="primary"
          disabled={loading && !error && !data}
          icon={<AddLocationAlt />}
          label="Add map location"
          onClick={handleOnSave}
        />
      </HeaderActions>
    </>
  );
}
