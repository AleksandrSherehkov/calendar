import { z } from 'zod';

export const taskSchema = z.object({
  name: z.string().min(1, { message: 'це поле обов\u02BCязкове' }),
  description: z.string().min(1, { message: 'це поле обов\u02BCязкове' }),
});
