import { User } from '@prisma/client';
import { ROLE } from '../utils/constans';

export type UserResponse = {
  token?: string;
  refresh_token?: string;
  user: {
    username: string;
    role: string;
  };
};

export type RegisterRequest = {
  username: string;
  password: string;
  role: ROLE;
  employee_id: number | null;
};

export type LoginRequest = {
  username: string;
  password: string;
};

export type UpdateUserRequest = {
  username: string;
  password: string;
  role: ROLE;
  employee_id: number | null;
};

export function toUserResponse(user: User): UserResponse {
  return {
    user: {
      username: user.username,
      role: user.role,
    },
  };
}
