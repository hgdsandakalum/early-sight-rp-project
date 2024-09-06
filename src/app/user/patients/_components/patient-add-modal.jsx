"use client";
import React, { useRef, useState, useEffect } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
  DialogClose,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const formSchema = z.object({
  name: z.string({ required_error: "" }),
  email: z.string({ required_error: "" }).email({ invalid_type_error: "" }),
  gender: z.string({ required_error: "" }),
  age: z.coerce.number({ required_error: "", invalid_type_error: "" }),
  // number: z.string({ required_error: "" }).regex(/^\d{10}$/, ""),
  number: z.string({ required_error: "" }).length(10),
  address: z.string({ required_error: "" }).optional(),
  conditions: z.string({ required_error: "" }),
});

export function PatientAddModal() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const form = useForm({
    mode: "onChange",
    resolver: zodResolver(formSchema),
    defaultValues: {
      address: "",
    },
  });

  // useEffect(() => {
  //   console.log(form);
  // }, [form]);

  function onSubmit(values) {
    console.log(values);
  }

  return (
    <>
      <Dialog>
        <DialogTrigger>
          <Button onClick={() => setIsModalOpen(true)}>
            <div className="flex">
              <Plus className="mr-1 text-white" />
              <span className="hidden sm:block text-white">
                Add New Patient
              </span>
            </div>
          </Button>
        </DialogTrigger>
        <DialogContent className="!max-w-xl">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
              <DialogHeader>
                <DialogTitle className="!text-xl">Add New Patient</DialogTitle>
                <DialogDescription className="py-4">
                  <div className="grid grid-cols-4 gap-4">
                    <div className="col-span-4">
                      <FormField
                        control={form.control}
                        name="name"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="text-black">
                              Patient Name
                            </FormLabel>
                            <FormControl>
                              <Input
                                placeholder="Name"
                                {...field}
                                className={
                                  form.formState.errors.name && "border-red-600"
                                }
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                    <div className="col-span-1">
                      <FormField
                        control={form.control}
                        name="gender"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="text-black">
                              Patient Gender
                            </FormLabel>
                            <Select
                              onValueChange={field.onChange}
                              defaultValue={field.value}
                            >
                              <FormControl>
                                <SelectTrigger>
                                  <SelectValue placeholder="Gender" />
                                </SelectTrigger>
                              </FormControl>
                              <SelectContent className="z-[99999] ">
                                <SelectItem value="male" className="text-black">
                                  Male
                                </SelectItem>
                                <SelectItem
                                  value="female"
                                  className="text-black"
                                >
                                  Female
                                </SelectItem>
                                <SelectItem
                                  value="other"
                                  className="text-black"
                                >
                                  Other
                                </SelectItem>
                              </SelectContent>
                            </Select>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                    <div className="col-span-1">
                      <FormField
                        control={form.control}
                        name="age"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="text-black">
                              Patient Age
                            </FormLabel>
                            <FormControl>
                              <Input
                                type="number"
                                placeholder="Age"
                                {...field}
                                className={
                                  form.formState.errors.age && "border-red-600"
                                }
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                    <div className="col-span-2">
                      <FormField
                        control={form.control}
                        name="number"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="text-black">
                              Patient Number
                            </FormLabel>
                            <FormControl>
                              <Input
                                placeholder="Number"
                                {...field}
                                className={
                                  form.formState.errors.number &&
                                  "border-red-600"
                                }
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                    <div className="col-span-4">
                      <FormField
                        control={form.control}
                        name="email"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="text-black">
                              Patient Email
                            </FormLabel>
                            <FormControl>
                              <Input
                                placeholder="Email"
                                {...field}
                                className={
                                  form.formState.errors.email &&
                                  "border-red-600"
                                }
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                    <div className="col-span-4">
                      <FormField
                        control={form.control}
                        name="address"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="text-black">
                              Patient Address
                            </FormLabel>
                            <FormControl>
                              <Input
                                placeholder="Address"
                                {...field}
                                className={
                                  form.formState.errors.address &&
                                  "border-red-600"
                                }
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                    <div className="col-span-4">
                      <FormField
                        control={form.control}
                        name="conditions"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="text-black">
                              Patient Conditions
                            </FormLabel>
                            <FormControl>
                              <Input
                                placeholder="Conditions"
                                {...field}
                                className={
                                  form.formState.errors.conditions &&
                                  "border-red-600"
                                }
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                  </div>
                </DialogDescription>
              </DialogHeader>
              <DialogFooter className="flex !justify-between">
                <DialogClose className="w-full">
                  <Button className="w-full bg-slate-300 text-black hover:text-white">
                    Close
                  </Button>
                </DialogClose>
                <Button type="submit" className="w-full">
                  Submit
                </Button>
              </DialogFooter>
            </form>
          </Form>
        </DialogContent>
      </Dialog>
    </>
  );
}
