import React, { forwardRef } from '@chakra-ui/react';
import { useProfile } from './ProfileContext';
import { Avatar, AvatarProps } from './Avatar/Avatar';

export const ProfileAvatar = forwardRef<Omit<AvatarProps, 'src'>, typeof Avatar>((props, ref) => {
  const { profile } = useProfile();

  return <Avatar src={profile.avatar_url} name={profile.username} {...props} ref={ref} />;
});
