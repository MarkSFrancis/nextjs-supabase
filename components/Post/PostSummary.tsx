import { ArrowRightIcon } from '@chakra-ui/icons';
import { Button, Heading, Text, VStack, Wrap } from '@chakra-ui/react';
import React, { FC } from 'react';
import { Card } from '../Card/Card';
import { usePost } from './PostContext';

export const PostSummary: FC = () => {
  const { post } = usePost();

  return (
    <Card p={4}>
      <VStack align="flex-start" spacing={4}>
        <Wrap>
          <Heading flexGrow={1}>{post.title}</Heading>
          <Text>5 minutes ago</Text>
        </Wrap>
        <Text>No posts have been listed in your area yet</Text>
        <Button type="button" rightIcon={<ArrowRightIcon />}>
          Be the first
        </Button>
      </VStack>
    </Card>
  );
};
