import z from "zod";

export const AddNewFavoriteSchema = z.object({
  taskId: z.number(),
});
