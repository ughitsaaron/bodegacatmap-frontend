import AddIcon from '@mui/icons-material/Add';
import { ComponentRef, useRef } from 'react';
import { useMap } from 'react-leaflet';
import { useCreateCatMutationMutation } from '../../generated/graphql';

const ICON_DIMENSION = 35;

// @refresh reset
export default function NewPage() {
  const [createCat] = useCreateCatMutationMutation();

  function handleOnSave() {
    // const { lat, lng } = map.getCenter();
    // createCat({ variables: { lat, lng } });
  }

  // const handleFileInput = () => {
  //   inputRef?.current?.click();
  // };

  // const handleChange: ChangeEventHandler<HTMLInputElement> = async (event) => {
  //   const formData = new FormData();
  //   formData.append('image', event?.target?.files[0]);
  //   await fetch('/image', { method: 'POST', body: formData });
  // };

  return <NewMarker />;
}

function NewMarker() {
  const iconRef = useRef<ComponentRef<typeof AddIcon>>(null);
  const map = useMap();

  const mapContainerRect = map.getContainer().getBoundingClientRect();
  const mapOffsetTop = mapContainerRect.top;
  const mapHeight = mapContainerRect.height;

  const x = mapContainerRect.right / 2 - ICON_DIMENSION / 2;
  const y = mapOffsetTop + mapHeight / 2 - ICON_DIMENSION / 2;

  return (
    <AddIcon
      fontSize="large"
      htmlColor="black"
      ref={iconRef}
      sx={{ transform: `translate3d(${x}px, ${y}px, 0)` }}
    />
  );
}
