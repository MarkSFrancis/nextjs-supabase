import React, { useState, useEffect, ChangeEvent } from 'react';
import { AuthSession } from '@supabase/supabase-js';
import { supabase } from '@/lib/supabase/client';
import UploadButton from '@/components/UploadButton';
import Avatar from './Avatar';
import { DEFAULT_AVATARS_BUCKET, Profile } from '@/lib/supabase/constants';

export default function Account({ session }: { session: AuthSession }) {
  const [loading, setLoading] = useState<boolean>(true);
  const [uploading, setUploading] = useState<boolean>(false);
  const [avatar, setAvatar] = useState<string | null>(null);
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

      setAvatar(null);
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
    <form className="account">
      <div>
        <label htmlFor="avatar">Avatar image</label>
        <div className="avatarField">
          <div className="avatarContainer">
            {avatar ? (
              <Avatar url={avatar} size={35} />
            ) : (
              <div className="avatarPlaceholder">?</div>
            )}
          </div>
          <UploadButton onUpload={uploadAvatar} loading={uploading} />
        </div>
      </div>
      <div>
        <label htmlFor="email">Email</label>
        <input id="email" type="text" value={session.user?.email ?? ''} disabled />
      </div>
      <div>
        <label htmlFor="username">Name</label>
        <input
          id="username"
          type="text"
          value={username || ''}
          onChange={(e) => setUsername(e.target.value)}
        />
      </div>
      <div>
        <label htmlFor="website">Website</label>
        <input
          id="website"
          type="website"
          value={website || ''}
          onChange={(e) => setWebsite(e.target.value)}
        />
      </div>

      <div>
        <button
          type="submit"
          className="button block primary"
          onClick={() => updateProfile()}
          disabled={loading}
        >
          {loading ? 'Loading ...' : 'Update'}
        </button>
      </div>

      <div>
        <button type="button" className="button block" onClick={() => signOut()}>
          Sign Out
        </button>
      </div>
    </form>
  );
}
