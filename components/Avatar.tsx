import React, { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabase/client';
import { DEFAULT_AVATARS_BUCKET } from '@/lib/supabase/constants';

export default function Avatar({ url, size }: { url: string | null; size: number }) {
  const [avatarUrl, setAvatarUrl] = useState<string | null>(null);

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
    if (url) downloadImage(url);
  }, [url]);

  return avatarUrl ? (
    <img
      alt="avatar"
      src={avatarUrl}
      className="avatar image"
      style={{ height: size, width: size }}
    />
  ) : (
    <div className="avatar no-image" style={{ height: size, width: size }} />
  );
}
