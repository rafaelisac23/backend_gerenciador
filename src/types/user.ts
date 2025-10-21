import z from "zod";

//Type do update do usuario
export const alterInformationUserSchema = z
  .object({
    name: z.string().min(2, "Nome tem que conter 2 caracteres").optional(),
  })
  .strict()
  .refine((data) => Object.keys(data).length > 0, {
    message: "Você precisa enviar pelo menos um campo para atualizar.",
  });

export type alterInformationUserSchemaType = z.infer<
  typeof alterInformationUserSchema
>;

// schema e type alterPasswordUser

export const alterPasswordUserSchema = z
  .object({
    password: z
      .string()
      .min(2, "Senha tem que conter 2 ou caracteres")
      .optional(),
  })
  .strict()
  .refine((data) => Object.keys(data).length > 0, {
    message: "Você precisa enviar pelo menos um campo para atualizar.",
  });

export type alterPasswordUserSchemaType = z.infer<
  typeof alterPasswordUserSchema
>;
