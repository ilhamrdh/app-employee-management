import { z } from 'zod';

const loginValidation = z.object({
  username: z.string().min(3).max(100),
  password: z.string().min(3).max(100),
});

export type LoginType = z.infer<typeof loginValidation>;

export default loginValidation;
