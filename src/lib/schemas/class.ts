import { z } from "zod";

export const classFormSchema = z.object({
    name: z.string().min(1,"Nome é obrigatório"),
    description: z.string().min(1,"Descrição é obrigatório"),
    students: z.array(z.string()),
    _id: z.string().optional()
  });



//   id 
//   name
//   students
//   description