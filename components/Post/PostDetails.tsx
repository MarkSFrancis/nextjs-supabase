import { Box, Button, Divider, Heading, Icon, Text, VStack, Wrap } from '@chakra-ui/react';
import React, { FC } from 'react';
import { IconFlag, IconMapPin, IconMessages, IconShare } from '@tabler/icons';
import { useRelativeTime } from '@/hooks/useRelativeTime';
import { PageCard } from '../Card/PageCard';
import { usePost } from './PostContext';

export const PostDetails: FC = () => {
  const { post } = usePost();
  const createdTime = useRelativeTime(post.created_at);

  return (
    <PageCard p={4}>
      <VStack align="flex-start" spacing={4}>
        <Wrap width="100%" align="center">
          <Heading flexGrow={1}>{post.title}</Heading>
          <Text color="gray.600">Created {createdTime}</Text>
        </Wrap>
        <Divider />
        {post.area_description && (
          <Wrap maxW="100%" spacing={1} align="center">
            <Icon fontSize="xl">
              <IconMapPin display="inline-block" />
            </Icon>
            <Text>{post.area_description}</Text>
          </Wrap>
        )}
        {post.content && (
          <Text maxW="100%" whiteSpace="pre-line">
            {post.content}
          </Text>
        )}
        <Divider />
        <Wrap minW="100%">
          <Box flexGrow={1}>
            <Button type="button" leftIcon={<IconMessages />}>
              Contact poster
            </Button>
          </Box>
          <Button type="button" colorScheme="red" variant="outline" leftIcon={<IconFlag />}>
            Report
          </Button>
          <Button type="button" variant="outline" leftIcon={<IconShare />}>
            Share
          </Button>
        </Wrap>
      </VStack>
    </PageCard>
  );
};
