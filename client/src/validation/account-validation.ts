import { z } from 'zod';

const accountValidation = z.object({
  name: z.string().min(1).max(100),
  position: z.string().min(1).max(100),
  salary: z.preprocess(Number, z.number()),
  department_id: z.preprocess(Number, z.number()),
});

export type AccountType = z.infer<typeof accountValidation>;

export default accountValidation;
