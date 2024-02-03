import { z } from "zod";

export const loginFormSchema = z.object({
  email: z.string().email().min(1,"E-mail é obrigatório"),
  password: z.string().min(1,"Senha é obrigatório"),
});

export const registerFormSchema = z.object({
  profilePhoto: z.string().min(1,"Foto é obrigatório"),
  email: z.string().email().min(1,"E-mail é obrigatório"),
  password: z.string().min(1,"Senha é obrigatório"),
  firstName: z.string().min(1,"Primeiro nome é obrigatório"),
  lastName: z.string().min(1,"Último nome é obrigatório"),
  cpf: z.string().min(1,"CPFé obrigatório"),
  role: z.string().optional()
});