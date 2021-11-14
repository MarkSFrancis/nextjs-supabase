import React, { FC, useEffect, useState } from 'react';
import { Image } from '@chakra-ui/react';
import { supabase } from '@/lib/supabase/client';
import { DEFAULT_AVATARS_BUCKET } from '@/lib/supabase/constants';
import { AvatarContainer } from './AvatarContainer';

export interface AvatarProps {
  isLoading?: boolean;
  url: string | undefined;
  size: number;
}

export const Avatar: FC<AvatarProps> = (props) => {
  const [avatarUrl, setAvatarUrl] = useState<string>();

  async function downloadImage(path: string) {
    try {
      const { data, error } = await supabase.storage.from(DEFAULT_AVATARS_BUCKET).download(path);
      if (error) {
        throw error;
      }
      const newAvatarUrl = URL.createObjectURL(data);
      setAvatarUrl(newAvatarUrl);
    } catch (error) {
      console.error('Error downloading image: ', (error as Error).message);
    }
  }

  useEffect(() => {
    if (props.url) downloadImage(props.url);
  }, [props.url]);

  return (
    <AvatarContainer size={props.size} isLoading={props.isLoading || (!!props.url && !avatarUrl)}>
      {avatarUrl && <Image alt="avatar" src={avatarUrl} w={props.size} h={props.size} />}
    </AvatarContainer>
  );
};
