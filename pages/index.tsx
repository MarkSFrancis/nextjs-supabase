import React, { useState, useEffect } from 'react';
import Auth from '@/components/Auth/Auth';
import Account from '@/components/Account';
import ProfileList from '@/components/ProfileList';
import { supabase } from '@/lib/supabase/client';
import { Profile } from '@/lib/supabase/constants';
import { useAuthSession } from '@/lib/hooks/useAuthSession';

export default function Home() {
  const session = useAuthSession();
  const [profiles, setProfiles] = useState<Profile[]>([]);

  async function getPublicProfiles() {
    try {
      const { data, error } = await supabase
        .from<Profile>('profiles')
        .select('id, username, avatar_url, website, updated_at')
        .order('updated_at', { ascending: false });

      if (error || !data) {
        throw error ?? new Error('No data');
      }
      console.info('Public profiles:', data);
      setProfiles(data);
    } catch (error) {
      console.error('error', (error as Error).message);
    }
  }

  useEffect(() => {
    getPublicProfiles();
  }, []);

  return (
    <div className="container" style={{ padding: '50px 0 100px 0' }}>
      {!session ? (
        <Auth />
      ) : (
        <div className="row">
          <div className="col-6">
            <h3>Account</h3>
            <Account key={session.user?.id} session={session} />
          </div>
          <div className="col-6">
            <h3>Public Profiles</h3>
            <ProfileList profiles={profiles} />
          </div>
        </div>
      )}
    </div>
  );
}
