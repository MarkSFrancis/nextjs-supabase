import { Button, Center, Heading, Text, VStack, Spinner } from '@chakra-ui/react';
import React, { FC, useEffect } from 'react';
import NextLink from 'next/link';
import { IconChevronsLeft } from '@tabler/icons';
import { useRouter } from 'next/dist/client/router';
import { Post, POSTS_TABLE } from '@/lib/supabase/constants';
import { supabase } from '@/lib/supabase/client';
import { PostProvider } from '@/components/Post/PostContext';
import { PageContainer } from '@/components/Container/PageContainer';
import { useSupabaseQuery } from '@/hooks/supabase/useSupabaseQuery';
import { PostDetails } from '@/components/Post/PostDetails';

export interface ViewPostProps {
  postId: string;
  postTitle?: string;
}

export const ViewPost: FC<ViewPostProps> = (props) => {
  const { replace } = useRouter();

  const { data: post, isLoading } = useSupabaseQuery(
    () =>
      supabase
        .from<Post>(`${POSTS_TABLE}`)
        .select('*')
        .filter('id', 'eq', props.postId)
        .maybeSingle(),
    []
  );

  useEffect(() => {
    if (!post) {
      return;
    }

    if (props.postTitle !== post.title) {
      replace(`/posts/${props.postId}/${post.title}`);
    }
  }, [props.postTitle, post]);

  if (isLoading) {
    return (
      <PageContainer>
        <Center>
          <Spinner size="lg" />
        </Center>
      </PageContainer>
    );
  }

  if (!post) {
    return (
      <PageContainer>
        <VStack align="flex-start">
          <Heading>404: Post not found</Heading>
          <Text>The requested post ({props.postTitle ?? `id: ${props.postId}`}) was not found</Text>
          <NextLink href="/" passHref>
            <Button as="a" leftIcon={<IconChevronsLeft />}>
              Back to the dashboard
            </Button>
          </NextLink>
        </VStack>
      </PageContainer>
    );
  }

  return (
    <PageContainer>
      <PostProvider value={{ post }}>
        <PostDetails />
      </PostProvider>
    </PageContainer>
  );
};
