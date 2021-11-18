import React from 'react';
import { useRouter } from 'next/dist/client/router';
import { Spinner } from '@chakra-ui/react';
import { ViewPost } from '@/views/Posts/ViewPost';

const ViewPostPage = () => {
  const { query } = useRouter();

  if (query.postId === undefined) {
    return <Spinner />;
  }

  return <ViewPost postId={query.postId as string} />;
};

export default ViewPostPage;
