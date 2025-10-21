import z from "zod";

export const createTaskSchema = z
  .object({
    title: z.string().min(1),
    content: z.string().optional(),
    completed: z.boolean().default(false),
  })
  .strict();

export type createTaskSchemaType = z.infer<typeof createTaskSchema>;

export const alterTaskSchema = z
  .object({
    title: z.string().min(1).optional(),
    content: z.string().min(1).optional(),
  })
  .strict()
  .refine(
    (data) => Object.keys(data).length > 0,
    "Mandar 1 campo para alteração"
  );

export type alterTaskSchemaType = z.infer<typeof alterTaskSchema>;

export const idSchema = z
  .object({
    id: z.number(),
  })
  .strict();
