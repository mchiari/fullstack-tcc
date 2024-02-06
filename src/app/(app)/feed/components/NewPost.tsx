"use client";
import { Button } from "@/components/ui/button";
import { Drawer, DrawerClose, DrawerContent, DrawerFooter, DrawerHeader, DrawerTrigger } from "@/components/ui/drawer";
import { Form, FormControl, FormField, FormItem, FormLabel } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { createPost } from "@/lib/actions/post.actions";
import { ClassInterface } from "@/lib/models/class.model";
import { newPostFormSchema } from "@/lib/schemas/post";
import { zodResolver } from "@hookform/resolvers/zod";
import { XIcon } from "lucide-react";
import React, { useEffect } from "react";
import { useFormState } from "react-dom";
import { useForm, useWatch } from "react-hook-form";
import { z } from "zod";
import AsyncSelect from "react-select/async";
import { UserInterface } from "@/lib/models/user.model";

export type NewPostProps = {
  classes: ClassInterface[];
  user: UserInterface;
};

export const NewPost: React.FC<NewPostProps> = ({ classes, user }) => {
  console.log(classes);

  const form = useForm<z.infer<typeof newPostFormSchema & { addMention: string }>>({
    resolver: zodResolver(newPostFormSchema),
    defaultValues: {
      title: "",
      content: "",
      type: "common",
      mentions: [],
      author: user._id,
    },
  });

  const getClassesDataToSearch = (classes: ClassInterface[]) => {
    let uniqueValuesMap: { [key: string]: boolean } = {};
    let arr: { label: string; value: string }[] = [];

    classes.forEach((c: ClassInterface) => {
      if (!uniqueValuesMap[c._id!]) {
        arr.push({ value: c._id!, label: c.name });
        uniqueValuesMap[c._id!] = true;
      }

    //   c.students.forEach((student) => {
    //     let tutor = student.tutor as UserInterface;
    //     if (!uniqueValuesMap[tutor._id!]) {
    //       arr.push({ value: tutor._id!, label: tutor.firstName });
    //       uniqueValuesMap[tutor._id!] = true;
    //     }
    //   });
    });

    return arr;
  };

  console.log(form.getValues());

  const [state, formAction] = useFormState(createPost, null);

  const filterMentions = (inputValue: string) => {
    return getClassesDataToSearch(classes).filter((item) =>
      item.label.toLowerCase().includes(inputValue.toLowerCase())
    );
  };

  const searchOptions = (inputValue: string) =>
    new Promise((resolve) => {
      setTimeout(() => {
        resolve(filterMentions(inputValue));
      }, 100);
    });

  return (
    <Drawer>
      <DrawerTrigger asChild>
        <Button>Novo post</Button>
      </DrawerTrigger>
      <DrawerContent>
        <DrawerHeader>
          <div className="flex justify-between items-center w-full">
            <span>Criar nova postagem</span>
            <DrawerClose>
              <XIcon />
            </DrawerClose>
          </div>
        </DrawerHeader>

        <div className="flex flex-col justify-center items-center w-full">
          <Form {...form}>
            <form action={formAction} className="flex flex-col gap-2 w-full p-6">
              <FormField
                control={form.control}
                name="title"
                render={({ field }) => (
                  <FormItem className="w-full">
                    <FormLabel>Título</FormLabel>
                    <FormControl>
                      <Input placeholder="Insira o título da postagem" {...field} />
                    </FormControl>
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="content"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Conteúdo</FormLabel>
                    <FormControl>
                      <Textarea placeholder="Descreva o conteúdo da mensagem" {...field} />
                    </FormControl>
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="mentions"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Menções</FormLabel>
                    <FormControl>
                      <AsyncSelect
                        {...field}
                        isMulti
                        placeholder="Pesquisar..."
                        cacheOptions
                        defaultOptions
                        menuPlacement="top"
                        loadOptions={searchOptions}
                      />
                    </FormControl>
                  </FormItem>
                )}
              />
                            <FormField
                control={form.control}
                name="type"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Input type="hidden" {...field} />
                    </FormControl>
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="author"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Input type="hidden" {...field} />
                    </FormControl>
                  </FormItem>
                )}
              />

              <DrawerFooter>
                <Button type="submit">Criar</Button>
              </DrawerFooter>
            </form>
          </Form>
        </div>
      </DrawerContent>
    </Drawer>
  );
};

export default NewPost;
