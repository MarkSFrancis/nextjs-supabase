import React, { useState, useEffect, ChangeEvent } from 'react';
import { AuthSession } from '@supabase/supabase-js';
import { Box, Button, HStack, Input, VStack } from '@chakra-ui/react';
import { supabase } from '@/lib/supabase/client';
import { UploadButton } from './UploadButton';
import { Avatar } from '@/components/Profile/Avatar/Avatar';
import { DEFAULT_AVATARS_BUCKET, Profile } from '@/lib/supabase/constants';

export const Account = ({ session }: { session: AuthSession }) => {
  const [loading, setLoading] = useState<boolean>(true);
  const [uploading, setUploading] = useState<boolean>(false);
  const [avatar, setAvatar] = useState<string>();
  const [username, setUsername] = useState<string | null>(null);
  const [website, setWebsite] = useState<string | null>(null);

  function setProfile(profile: Profile) {
    setAvatar(profile.avatar_url);
    setUsername(profile.username);
    setWebsite(profile.website);
  }

  async function getProfile() {
    try {
      setLoading(true);
      const user = supabase.auth.user();

      const { data, error } = await supabase
        .from('profiles')
        .select('username, website, avatar_url')
        .eq('id', user!.id)
        .single();

      if (error) {
        throw error;
      }

      setProfile(data);
    } catch (error) {
      console.error('error', (error as Error).message);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    getProfile();
  }, [session]);

  async function signOut() {
    const { error } = await supabase.auth.signOut();
    if (error) console.error('Error logging out:', error.message);
  }

  async function uploadAvatar(event: ChangeEvent<HTMLInputElement>) {
    try {
      setUploading(true);

      if (!event.target.files || !event.target.files.length) {
        throw new Error('You must select an image to upload.');
      }

      const user = supabase.auth.user();
      const file = event.target.files[0];
      const fileExt = file.name.split('.').pop();
      const fileName = `${session?.user?.id}${Math.random()}.${fileExt}`;
      const filePath = `${fileName}`;

      const { error: uploadError } = await supabase.storage
        .from(DEFAULT_AVATARS_BUCKET)
        .upload(filePath, file);

      if (uploadError) {
        throw uploadError;
      }

      const { error: updateError } = await supabase.from('profiles').upsert({
        id: user!.id,
        avatar_url: filePath,
      });

      if (updateError) {
        throw updateError;
      }

      setAvatar(filePath);
    } catch (error) {
      alert((error as Error).message);
    } finally {
      setUploading(false);
    }
  }

  async function updateProfile() {
    try {
      setLoading(true);
      const user = supabase.auth.user();

      const updates = {
        id: user!.id,
        username,
        website,
        updated_at: new Date(),
      };

      const { error } = await supabase.from('profiles').upsert(updates, {
        returning: 'minimal', // Don't return the value after inserting
      });

      if (error) {
        throw error;
      }
    } catch (error) {
      alert((error as Error).message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <form>
      <VStack align="stretch" spacing={4}>
        <Box>
          <Box>
            <Avatar url={avatar} size={35} />
            <UploadButton onUpload={uploadAvatar} loading={uploading} />
          </Box>
        </Box>
        <Box>
          <label htmlFor="email">Email</label>
          <Input id="email" type="text" value={session.user?.email ?? ''} disabled />
        </Box>
        <Box>
          <label htmlFor="username">Name</label>
          <Input
            id="username"
            type="text"
            value={username || ''}
            onChange={(e) => setUsername(e.target.value)}
          />
        </Box>
        <Box>
          <label htmlFor="website">Website</label>
          <Input
            id="website"
            type="website"
            value={website || ''}
            onChange={(e) => setWebsite(e.target.value)}
          />
        </Box>

        <HStack spacing={4}>
          <Button type="submit" onClick={() => updateProfile()} isLoading={loading}>
            {loading ? 'Loading ...' : 'Update'}
          </Button>
          <Button colorScheme="red" variant="ghost" type="button" onClick={() => signOut()}>
            Sign Out
          </Button>
        </HStack>
      </VStack>
    </form>
  );
};