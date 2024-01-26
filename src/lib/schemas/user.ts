import { z } from "zod";

export const userFormSchema = z.object({
    profilePhoto: z.string().min(1,"Foto é obrigatório"),
    email: z.string().email().min(1,"E-mail é obrigatório"),
    password: z.string().optional(),
    firstName: z.string().min(1,"Primeiro nome é obrigatório"),
    lastName: z.string().min(1,"Último nome é obrigatório"),
    cpf: z.string().min(1,"CPFé obrigatório"),
    role: z.string().optional(),
    _id: z.string()
  });
  