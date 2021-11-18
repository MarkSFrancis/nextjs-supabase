import { Search2Icon } from '@chakra-ui/icons';
import {
  FormControl,
  VisuallyHidden,
  FormLabel,
  InputGroup,
  Input,
  InputRightAddon,
  IconButton,
} from '@chakra-ui/react';
import React, { FC } from 'react';

export const NavbarSearch: FC = () => (
  <form
    onSubmit={(e) => {
      e.preventDefault();
    }}
  >
    <FormControl>
      <VisuallyHidden>
        <FormLabel>Search</FormLabel>
      </VisuallyHidden>
      <InputGroup>
        <Input type="search" placeholder="Search" />
        <InputRightAddon p={0} overflow="hidden">
          <IconButton
            variant="ghost"
            borderRadius={0}
            type="submit"
            icon={<Search2Icon />}
            aria-label="Search"
          />
        </InputRightAddon>
      </InputGroup>
    </FormControl>
  </form>
);
