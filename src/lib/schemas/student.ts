import { z } from "zod";

export const studentFormSchema = z.object({
    profilePhoto: z.string().min(1,"Foto é obrigatório"),
    firstName: z.string().min(1,"Primeiro nome é obrigatório"),
    lastName: z.string().min(1,"Último nome é obrigatório"),
    healthInfo: z.string(),
    birthday: z.string(),
    tutor: z.string(),
    _id: z.string()
  });

export const registerStudentFormSchema = z.object({
    profilePhoto: z.string().min(1,"Foto é obrigatório"),
    firstName: z.string().min(1,"Primeiro nome é obrigatório"),
    lastName: z.string().min(1,"Último nome é obrigatório"),
    healthInfo: z.string(),
    birthday: z.string(),
    tutor: z.string(),
  });