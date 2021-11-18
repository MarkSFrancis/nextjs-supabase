import { ArrowRightIcon } from '@chakra-ui/icons';
import { Button, Divider, Heading, Icon, Text, VStack, Wrap } from '@chakra-ui/react';
import React, { FC } from 'react';
import { IconMapPin } from '@tabler/icons';
import { useRelativeTime } from '@/hooks/useRelativeTime';
import { Card } from '../Card/Card';
import { usePost } from './PostContext';

export const PostSummary: FC = () => {
  const { post } = usePost();
  const createdTime = useRelativeTime(post.created_at);

  return (
    <Card p={4}>
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
            <Text isTruncated>{post.area_description}</Text>
          </Wrap>
        )}
        {post.content && (
          <Text maxW="100%" isTruncated>
            {post.content}
          </Text>
        )}
        <Button type="button" rightIcon={<ArrowRightIcon />}>
          Find out more
        </Button>
      </VStack>
    </Card>
  );
};
