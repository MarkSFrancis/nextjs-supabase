import React, { useEffect, useState } from 'react';
import {
  Avatar as ChakraAvatar,
  AvatarProps as ChakraAvatarProps,
  forwardRef,
  Spinner,
} from '@chakra-ui/react';
import { supabase } from '@/lib/supabase/client';
import { DEFAULT_AVATARS_BUCKET } from '@/lib/supabase/constants';

export interface AvatarProps extends ChakraAvatarProps {
  isLoading?: boolean;
}

export const Avatar = forwardRef<AvatarProps, typeof ChakraAvatar>((props, ref) => {
  const [isLoading, setIsLoading] = useState(true);
  const [avatarUrl, setAvatarUrl] = useState<string>();

  async function downloadImage(path: string) {
    try {
      setIsLoading(true);
      const { data, error } = await supabase.storage.from(DEFAULT_AVATARS_BUCKET).download(path);
      if (error) {
        throw error;
      }
      const newAvatarUrl = URL.createObjectURL(data);
      setAvatarUrl(newAvatarUrl);
    } catch (error) {
      console.error('Error downloading image: ', (error as Error).message);
    } finally {
      setIsLoading(false);
    }
  }

  useEffect(() => {
    if (props.src) {
      downloadImage(props.src);
    }
  }, [props.src]);

  const showImage = !props.isLoading && !isLoading;

  return (
    <ChakraAvatar
      icon={<Spinner />}
      {...props}
      name={undefined}
      alt={props.name}
      src={showImage ? avatarUrl : undefined}
      ref={ref}
    />
  );
});
