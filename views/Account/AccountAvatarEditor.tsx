import React, { useState, useEffect, ChangeEvent } from 'react';
import {
  AvatarBadge,
  Box,
  Button,
  FormControl,
  FormHelperText,
  FormLabel,
  Input,
  VStack,
  Wrap,
} from '@chakra-ui/react';
import { LockIcon } from '@chakra-ui/icons';
import { supabase } from '@/lib/supabase/client';
import { UploadButton } from './UploadButton';
import { Avatar } from '@/components/Profile/Avatar/Avatar';
import { DEFAULT_AVATARS_BUCKET, PROFILES_TABLE } from '@/lib/supabase/constants';
import { useAuthSession } from '@/hooks/auth/useAuthSession';
import { useSessionProfile } from '@/hooks/profiles/useSessionProfile';
import { FormHeading } from '@/components/Typography/FormHeading';

export const AccountAvatarEditor = () => {
  const session = useAuthSession();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [uploading, setUploading] = useState<boolean>(false);
  const [avatar, setAvatar] = useState<string>();
  const [username, setUsername] = useState<string | null>(null);

  const { isLoading: isLoadingSessionProfile, data: sessionProfile } = useSessionProfile();

  useEffect(() => {
    setAvatar(sessionProfile?.avatar_url);
    setUsername(sessionProfile?.username ?? null);
  }, [sessionProfile]);

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

      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
      const user = supabase.auth.user()!;
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

      const { error: updateError } = await supabase.from(PROFILES_TABLE).upsert({
        id: user.id,
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
      setIsLoading(true);
      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
      const user = supabase.auth.user()!;

      const updates = {
        id: user.id,
        username,
        updated_at: new Date(),
      };

      const { error } = await supabase.from(PROFILES_TABLE).upsert(updates, {
        returning: 'minimal', // Don't return the value after inserting
      });

      if (error) {
        throw error;
      }
    } catch (error) {
      alert((error as Error).message);
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <form>
      <VStack align="stretch" spacing={6}>
        <FormHeading>Your public profile</FormHeading>
        <Box>
          <Avatar isLoading={isLoading} src={avatar} size="2xl">
            <AvatarBadge border={0} textTransform="none">
              <FormControl id="avatar">
                <UploadButton
                  onUpload={uploadAvatar}
                  loading={isLoadingSessionProfile || uploading}
                />
              </FormControl>
            </AvatarBadge>
          </Avatar>
        </Box>
        <FormControl isRequired id="email">
          <FormLabel htmlFor="email">Email</FormLabel>
          <Input type="text" value={session?.user?.email ?? ''} disabled />
          <FormHelperText color="green.600" display="flex" alignItems="center">
            <LockIcon mr={1} /> Your email is private
          </FormHelperText>
        </FormControl>
        <FormControl isRequired id="username">
          <FormLabel>Name</FormLabel>
          <Input type="text" value={username || ''} onChange={(e) => setUsername(e.target.value)} />
        </FormControl>

        <Wrap spacing={4} justify="space-between">
          <Button type="submit" onClick={() => updateProfile()} isLoading={isLoading}>
            Save changes
          </Button>
          <Button colorScheme="red" variant="outline" type="button" onClick={() => signOut()}>
            Sign out
          </Button>
        </Wrap>
      </VStack>
    </form>
  );
};
