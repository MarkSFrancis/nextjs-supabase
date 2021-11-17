import React, { useCallback } from 'react';
import { VStack, FormControl, Input, FormLabel, Button, Box, Textarea } from '@chakra-ui/react';
import { ArrowRightIcon } from '@chakra-ui/icons';
import { SlimPageContainer } from '@/components/Container/SlimPageContainer';
import { PageCard } from '@/components/Card/PageCard';
import { useFormState } from '@/hooks/useFormState';
import { FormHeading } from '@/components/Typography/FormHeading';
import { useSupabaseMutation } from '@/hooks/supabase/useSupabaseMutation';
import { supabase } from '@/lib/supabase/client';
import { Post, POSTS_TABLE } from '@/lib/supabase/constants';

export const CreatePost = () => {
  const [title, setTitle] = useFormState();
  const [content, setContent] = useFormState();
  const [areaDescription, setAreaDescription] = useFormState();
  const [createState, { mutateAsync: createPostMutation }] = useSupabaseMutation<Post>();

  const createPost = useCallback(
    () =>
      createPostMutation(
        async () =>
          // eslint-disable-next-line no-return-await
          await supabase.from<Post>(POSTS_TABLE).upsert(
            {
              area_description: areaDescription,
              updated_at: new Date().toISOString(),
              content,
              title,
              author_id: supabase.auth.session()?.user?.id,
              created_at: new Date().toISOString(),
            },
            {
              returning: 'minimal',
            }
          )
      ),
    [title, content, areaDescription, createPostMutation]
  );

  return (
    <SlimPageContainer>
      <PageCard>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            createPost();
          }}
        >
          <VStack align="stretch" spacing={6}>
            <FormHeading>New post</FormHeading>
            <FormControl isRequired id="title">
              <FormLabel>Title</FormLabel>
              <Input value={title} onChange={setTitle} />
            </FormControl>
            <FormControl isRequired id="content">
              <FormLabel>Description</FormLabel>
              <Textarea value={content} onChange={setContent} />
            </FormControl>
            <FormControl id="area_description">
              <FormLabel>General location</FormLabel>
              <Input
                value={areaDescription}
                onChange={setAreaDescription}
                placeholder="E.g. Main &amp; Board St, or a neighborhood name, etc."
                autoComplete="postal-code"
              />
            </FormControl>
            <Box>
              <Button
                type="submit"
                rightIcon={<ArrowRightIcon />}
                isLoading={createState.isLoading}
              >
                Create post
              </Button>
            </Box>
          </VStack>
        </form>
      </PageCard>
    </SlimPageContainer>
  );
};
