import { Box, FormLabel, IconButton, Input, Tooltip } from '@chakra-ui/react';
import { EditIcon } from '@chakra-ui/icons';
import React, { ChangeEventHandler } from 'react';

export type UploadButtonProps = {
  onUpload: ChangeEventHandler<HTMLInputElement>;
  loading: boolean;
};

export const UploadButton = (props: UploadButtonProps) => (
  <Box>
    <Tooltip label="Upload a new avatar">
      <IconButton
        as={FormLabel}
        cursor="pointer"
        isLoading={props.loading}
        icon={<EditIcon />}
        aria-label="Upload a new avatar"
        colorScheme="gray"
      />
    </Tooltip>
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
