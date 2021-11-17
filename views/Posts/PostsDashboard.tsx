import React from 'react';
import { Center, Spinner } from '@chakra-ui/react';
import { useLatestPosts } from '@/hooks/posts/useLatestPosts';
import { PostList } from '@/components/Post/PostList';

export const PostsDashboard = () => {
  const { data: posts } = useLatestPosts();

  if (!posts) {
    return (
      <Center>
        <Spinner size="lg" />
      </Center>
    );
  }

  return <PostList posts={posts} />;
};
