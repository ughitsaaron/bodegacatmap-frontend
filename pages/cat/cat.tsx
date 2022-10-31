import {
  Card,
  Typography,
  Box,
  ButtonBase,
  Portal,
  Divider,
  ImageList,
  IconButton,
  ImageListItem,
} from '@mui/material';
import type { ChangeEvent } from 'react';
import { AddPhotoAlternate, Close } from '@mui/icons-material';
import { Link } from '../../components';
import { useRouter } from 'next/router';
import Image from 'next/image';
import { useLayout } from '../../contexts';
import { useGetCatQuery, useCreatePhotoMutation } from '../../generated/graphql';

const IMAGE_HEIGHT = 104 / 8;
const IMAGE_WIDTH = Math.round(IMAGE_HEIGHT * (4 / 3));

function formatDate(insertedAt: string): string {
  return new Date(insertedAt).toLocaleDateString('en-us', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  });
}

type UploadResponse = {
  id: string;
  url: string;
};

export function CatPage() {
  const router = useRouter();
  const catId = router.query.id as string;
  // const map = useMap();
  const layout = useLayout();
  const { data, updateQuery } = useGetCatQuery({ variables: { catId } });

  const [executePhotoMutation] = useCreatePhotoMutation({
    update: (__cache, result) => {
      const image = result?.data.createImage;
      updateQuery((prevResult) => ({
        cat: {
          ...prevResult.cat,
          images: prevResult.cat.images.concat(image),
        },
      }));
    },
  });

  function handleUploadSuccess(data: UploadResponse) {
    executePhotoMutation({
      variables: {
        catId,
        path: data.url,
      },
    });
  }

  return (
    <Portal container={layout.content}>
      <Box display="flex" justifyContent="center">
        <Box
          bottom={0}
          display="flex"
          justifyContent="center"
          paddingBottom={2}
          position="absolute"
          width="100%"
          zIndex={1000}
        >
          {data && (
            <Card
              sx={{
                width: 3 / 5,
                display: 'flex',
                paddingY: 1,
                paddingLeft: 1,
                position: 'relative',
              }}
            >
              <Link href="/">
                <IconButton size="small" sx={{ position: 'absolute', right: 0, top: 0 }}>
                  <Close fontSize="small" />
                </IconButton>
              </Link>
              <Box overflow="scroll">
                <ImageList
                  cols={data?.cat.images.length}
                  sx={{ gridAutoFlow: 'column', paddingLeft: 1 }}
                >
                  {(data?.cat.images || [])
                    .map((photo) => (
                      <ImageListItem
                        key={photo.path}
                        sx={{
                          borderRadius: (theme) => `${theme.shape.borderRadius}px`,
                          overflow: 'clip',
                        }}
                      >
                        <Image
                          alt={photo.id}
                          height={IMAGE_HEIGHT * 8}
                          src={`/images/${IMAGE_WIDTH * 8}/${IMAGE_HEIGHT * 8}/${photo.path
                            .split('/')
                            .slice(-1)}`}
                          width={IMAGE_WIDTH * 8}
                        />
                      </ImageListItem>
                    ))
                    .concat(<PlaceholderUploadButton onUploadSuccess={handleUploadSuccess} />)}
                </ImageList>
              </Box>
              <Box paddingX={1}>
                <Divider orientation="vertical" />
              </Box>
              <Box flexShrink={0} paddingY={1} width={1 / 4}>
                <Typography variant="subtitle2">
                  {data?.cat.lat.toFixed(4)}, {data?.cat.lng.toFixed(4)}
                </Typography>
                <Box>
                  <Typography fontWeight={600} variant="caption">
                    Added by:{' '}
                  </Typography>
                  <Typography variant="caption">{data?.cat.creator.name}</Typography>
                </Box>
                <Box>
                  <Typography fontWeight={600} variant="caption">
                    Added on:{' '}
                  </Typography>
                  <Typography variant="caption">{formatDate(data?.cat.insertedAt)}</Typography>
                </Box>
              </Box>
            </Card>
          )}
        </Box>
      </Box>
    </Portal>
  );
}

type PlaceholderUploadButtonProps = {
  onUploadSuccess?: (data: UploadResponse) => void;
};

function PlaceholderUploadButton({ onUploadSuccess }: PlaceholderUploadButtonProps) {
  async function handleChange(event: ChangeEvent<HTMLInputElement>) {
    const token = await fetch('/api/auth/token', { credentials: 'include' }).then((r) => r.json());

    const body = new FormData();
    body.append('image', event.target.files[0]);
    const response = await fetch('/upload', {
      method: 'post',
      body,
      credentials: 'include',
      headers: {
        authorization: `Bearer ${token.idToken}`,
      },
    });

    if (response.status === 200) {
      const data: UploadResponse = await response.json();
      onUploadSuccess(data);
    }
  }

  return (
    <ImageListItem key="image-upload-placeholder">
      <ButtonBase
        sx={{
          border: (theme) => `1px solid ${theme.palette.grey[700]}`,
          borderRadius: (theme) => `${theme.shape.borderRadius}px`,
          backgroundColor: (theme) => {
            const greys = theme.palette.augmentColor({ color: theme.palette.grey });
            return greys.dark;
          },
          alignItems: 'center',
          display: 'flex',
          flexShrink: 0,
          height: (theme) => theme.spacing(IMAGE_HEIGHT),
          justifyContent: 'center',
          width: (theme) => theme.spacing(IMAGE_WIDTH),
        }}
      >
        <AddPhotoAlternate color="disabled" />
        <input accept="image/jpeg" hidden onChange={handleChange} type="file" />
      </ButtonBase>
    </ImageListItem>
  );
}
