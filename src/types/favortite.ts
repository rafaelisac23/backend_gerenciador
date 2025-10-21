import z from "zod";

export const AddNewFavoriteSchema = z.object({
  taskId: z.number(),
});

export const RemoveFavoriteSchema = z.object({
  taskId: z.number(),
});

export const IsFavoriteSchema = z
  .object({
    taskId: z
      .string()
      .transform((item) => parseInt(item, 10))
      .refine((val) => !isNaN(val), {
        message: "O valor inserido não é um numero valido",
      }),
  })
  .strict();
