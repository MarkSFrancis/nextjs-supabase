import { useRouter } from 'next/dist/client/router';
import React, { useEffect } from 'react';
import Account from '@/components/Account';
import { useAuthSession } from '@/lib/hooks/useAuthSession';

const MyProfile = () => {
  const { push } = useRouter();
  const session = useAuthSession();

  useEffect(() => {
    if (!session) {
      push('/auth/login');
    }
  }, []);

  return (
    <div className="container" style={{ padding: '50px 0 100px 0' }}>
      {!session ? (
        <></>
      ) : (
        <div className="row">
          <div className="col-6">
            <h3>Account</h3>
            <Account key={session.user?.id} session={session} />
          </div>
        </div>
      )}
    </div>
  );
};

export default MyProfile;
