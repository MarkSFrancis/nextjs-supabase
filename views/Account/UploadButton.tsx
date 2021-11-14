import { Box, Button, FormLabel, Input } from '@chakra-ui/react';
import { EditIcon } from '@chakra-ui/icons';
import React, { ChangeEventHandler } from 'react';

export type UploadButtonProps = {
  onUpload: ChangeEventHandler<HTMLInputElement>;
  loading: boolean;
};

export const UploadButton = (props: UploadButtonProps) => (
  <Box>
    <Button as={FormLabel} cursor="pointer" isLoading={props.loading} leftIcon={<EditIcon />}>
      Upload
    </Button>
    <Input
      style={{
        visibility: 'hidden',
        position: 'absolute',
      }}
      type="file"
      accept="image/*"
      onChange={props.onUpload}
      disabled={props.loading}
    />
  </Box>
);
