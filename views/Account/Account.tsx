import React, { useState, useEffect, ChangeEvent } from 'react';
import {
  Box,
  Button,
  FormControl,
  FormHelperText,
  FormLabel,
  Heading,
  HStack,
  Input,
  VStack,
} from '@chakra-ui/react';
import { LockIcon } from '@chakra-ui/icons';
import { supabase } from '@/lib/supabase/client';
import { UploadButton } from './UploadButton';
import { Avatar } from '@/components/Profile/Avatar/Avatar';
import { DEFAULT_AVATARS_BUCKET, Profile } from '@/lib/supabase/constants';
import { useAuthSession } from '@/hooks/useAuthSession';

export const Account = () => {
  const session = useAuthSession();
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
        return;
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
        <Heading size="md" as="h3">
          Your public profile
        </Heading>
        <Box>
          <Avatar isLoading={loading} url={avatar} size={100} />
          <FormControl id="avatar">
            <UploadButton onUpload={uploadAvatar} loading={uploading} />
          </FormControl>
        </Box>
        <FormControl isRequired id="email">
          <FormLabel htmlFor="email">Email</FormLabel>
          <Input type="text" value={session?.user?.email ?? ''} disabled />
          <FormHelperText display="flex" alignItems="center">
            <LockIcon mr={1} /> Your email is private
          </FormHelperText>
        </FormControl>
        <FormControl id="username">
          <FormLabel>Name</FormLabel>
          <Input type="text" value={username || ''} onChange={(e) => setUsername(e.target.value)} />
        </FormControl>
        <FormControl id="website">
          <FormLabel>Website</FormLabel>
          <Input
            type="website"
            value={website || ''}
            onChange={(e) => setWebsite(e.target.value)}
          />
        </FormControl>

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
