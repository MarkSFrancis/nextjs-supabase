import { Box, Button } from '@chakra-ui/react';
import React, { ChangeEventHandler } from 'react';

export type UploadButtonProps = {
  onUpload: ChangeEventHandler<HTMLInputElement>;
  loading: boolean;
};

export const UploadButton = (props: UploadButtonProps) => (
  <Box>
    <Button as="label" cursor="pointer" htmlFor="single">
      {props.loading ? 'Uploading ...' : 'Upload'}
    </Button>
    <input
      style={{
        visibility: 'hidden',
        position: 'absolute',
      }}
      type="file"
      id="single"
      accept="image/*"
      onChange={props.onUpload}
      disabled={props.loading}
    />
  </Box>
);
