import React, { useEffect, useState } from 'react';
import styled, { css } from 'styled-components';
import Button from './Button';
import exif from 'exif-js';

const ActionContainer = styled.div`
  ${({ theme }) => css`
    display: flex;
    margin-top: ${({ theme }) => theme.spacing(1)}px;

    ${Button} {
      margin-right: ${theme.spacing(1)}px;
    }
  `}
`;

const getImageInformation = async (file, callback) => {
  const src = URL.createObjectURL(file);

  try {
    const data = await new Promise(resolve => exif.getData(file, () => resolve(exif.getAllTags(file))));

    callback({ src, ...data });
  } catch (e) {
    // exif-js often doesn't throw errors when something happens so try to catch something here?
    throw new Error(`failed to get exif data because: ${e}`);
  }
};

export default function PhotoPicker({ onChange }) {
  const [objectUrl, setObjectUrl] = useState(null);

  useEffect(() => {
    return () => URL.revokeObjectURL(objectUrl);
  }, [objectUrl]);

  return (
    <ActionContainer>
      <Button color="primary" component="label" htmlFor="photo-select">
        Select a photo
      </Button>
      <input
        type="file"
        id="photo-select"
        onChange={({ target }) => {
          getImageInformation(target.files[0], (objectUrl, ...rest) => {
            setObjectUrl(objectUrl);
            onChange(objectUrl, ...rest);
          });
        }}
        style={{ display: 'none' }}
      />
    </ActionContainer>
  );
}
