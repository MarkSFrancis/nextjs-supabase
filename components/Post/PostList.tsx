import { Button, Heading, Text, VStack } from '@chakra-ui/react';
import React, { FC } from 'react';
import { ArrowRightIcon } from '@chakra-ui/icons';
import NextLink from 'next/link';
import { Post } from '@/lib/supabase/constants';
import { PostProvider } from './PostContext';
import { PostSummary } from './PostSummary';
import { Card } from '../Card/Card';

export interface PostListProps {
  posts: Post[];
}

export const PostList: FC<PostListProps> = (props) => {
  if (props.posts.length === 0) {
    return (
      <Card p={8}>
        <VStack align="flex-start" spacing={4}>
          <Heading>No posts found</Heading>
          <Text>No posts have been listed in your area yet</Text>
          <NextLink href="/posts/new" passHref>
            <Button as="a" type="button" rightIcon={<ArrowRightIcon />}>
              Be the first
            </Button>
          </NextLink>
        </VStack>
      </Card>
    );
  }

  return (
    <VStack align="stretch">
      {props.posts.map((p) => (
        <PostProvider key={p.id} value={{ post: p }}>
          <PostSummary />
        </PostProvider>
      ))}
    </VStack>
  );
};
