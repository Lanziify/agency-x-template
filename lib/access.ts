import { Access, AccessArgs } from 'payload';

import { User } from '@config/payload.types';

type isAuthenticated = (args: AccessArgs<User>) => boolean;

export const authenticated: isAuthenticated = ({ req: user }) => {
  return Boolean(user);
};

export const authenticatedOrPublished: Access = ({ req: user }) => {
  if (user) return true;

  return {
    _status: {
      equals: true,
    },
  };
};
