import { title } from "process";
import z from "zod";

export const createTaskSchema = z
  .object({
    title: z.string().min(1),
    content: z.string().optional(),
    completed: z.boolean().default(false),
  })
  .strict();

export type createTaskSchemaType = z.infer<typeof createTaskSchema>;
