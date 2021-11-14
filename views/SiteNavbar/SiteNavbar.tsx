import {
  Box,
  Button,
  FormControl,
  FormLabel,
  HStack,
  IconButton,
  Input,
  InputGroup,
  InputRightAddon,
  VisuallyHidden,
  Wrap,
} from '@chakra-ui/react';
import React, { FC } from 'react';
import { Search2Icon, SettingsIcon } from '@chakra-ui/icons';
import NextLink from 'next/link';
import { PageContainer } from '@/components/Container/PageContainer';
import { useAuthSession } from '@/hooks/auth/useAuthSession';

export const SiteNavbar: FC = () => {
  const session = useAuthSession();

  return (
    <PageContainer px={0} py={2} mb={4}>
      <Wrap justify="space-between" spacing={4}>
        <NextLink href="/" passHref>
          <IconButton as="a" icon={<>🏠</>} aria-label="Home page" />
        </NextLink>
        <Box flexGrow={1} maxW="lg">
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
                    borderRadius={0}
                    type="submit"
                    icon={<Search2Icon />}
                    aria-label="Search"
                  />
                </InputRightAddon>
              </InputGroup>
            </FormControl>
          </form>
        </Box>
        <HStack>
          {session ? (
            <NextLink href="/auth/my-profile" passHref>
              <IconButton as="a" icon={<SettingsIcon />} aria-label="Settings" />
            </NextLink>
          ) : (
            <Button as="a" href="#" onClick={(e) => e.preventDefault()}>
              Sign in or register
            </Button>
          )}
        </HStack>
      </Wrap>
    </PageContainer>
  );
};
