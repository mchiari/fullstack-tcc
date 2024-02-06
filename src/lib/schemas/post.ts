import { z } from "zod";

export const newPostFormSchema = z.object({
    title: z.string().min(1, "Nome é obrigatório"),
    content: z.string().min(1, "Descrição é obrigatório"),
    type: z.string().min(1),
    mentions: z.array(z.string()),
    author: z.string(),
    _id: z.string().optional(),
  });
  
