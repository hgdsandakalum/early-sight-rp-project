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
import {
  ArrowUpDown,
  MoreHorizontal,
  Copy,
  SquarePen,
  Trash2,
  EyeIcon,
} from "lucide-react";

const formSchema = z.object({
  name: z.string({ required_error: "" }),
  email: z.string({ required_error: "" }).email({ invalid_type_error: "" }),
  gender: z.string({ required_error: "" }),
  age: z.coerce.number({ required_error: "", invalid_type_error: "" }),
  number: z.string({ required_error: "" }).length(10),
  address: z.string({ required_error: "" }).optional(),
  conditions: z.string({ required_error: "" }),
});

export function PatientEditModal({
  open,
  data,
  setIsEditDialog,
  editPatient,
  patient,
}) {
  const [patientData, setPatientData] = useState([]);

  const form = useForm({
    mode: "onChange",
    resolver: zodResolver(formSchema),
  });

  console.log("data ", data);
  useEffect(() => {
    let conditionString = "";
    let genderString = "";

    if (Array.isArray(data.conditions)) {
      conditionString = data.conditions.join(",");
    } else {
      conditionString = data.conditions;
    }

    if (data.gender === "M") {
      genderString = "male";
    } else if (data.gender === "F") {
      genderString = "female";
    } else if (data.gender === "O") {
      genderString = "other";
    }

    setPatientData({
      name: data.name,
      email: data.email,
      gender: genderString,
      age: data.age ?? 25,
      number: data.number ?? "1234567890",
      address: data.address ?? "Colombo",
      conditions: conditionString,
    });
  }, [data]);

  function onSubmit(values) {
    console.log(values);
  }

  return (
    <div>
      <Dialog open={open} onOpenChange={setIsEditDialog}>
        <DialogTrigger
          onClick={() => editPatient(patient)}
          style={{
            flexDirection: "row",
            display: "flex",
            marginLeft: 6,
          }}
        >
          <SquarePen className="mr-2 w-5 cursor-pointer" />
          Edit
        </DialogTrigger>
        <div>
          <DialogContent
            className="!max-w-xl"
            style={{
              position: "fixed",
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%)",
            }}
          >
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="space-y-8"
              >
                <DialogHeader>
                  <DialogTitle className="!text-xl">
                    Edit Patient Details
                  </DialogTitle>
                  <DialogDescription className="py-4">
                    <div className="grid grid-cols-4 gap-4">
                      <div className="col-span-4">
                        <FormField
                          control={form.control}
                          name="name"
                          defaultValue={patientData.name}
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
                                    form.formState.errors.name &&
                                    "border-red-600"
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
                                defaultValue={patientData.gender}
                              >
                                <FormControl>
                                  <SelectTrigger className="text-black">
                                    <SelectValue placeholder="Gender" />
                                  </SelectTrigger>
                                </FormControl>
                                <SelectContent className="z-[99999] ">
                                  <SelectItem
                                    value="male"
                                    className="text-black"
                                  >
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
                          defaultValue={patientData.age}
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
                                    form.formState.errors.age &&
                                    "border-red-600"
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
                          defaultValue={patientData.number}
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
                          defaultValue={patientData.email}
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
                          defaultValue={patientData.address}
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
                          defaultValue={patientData.conditions}
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
                    <Button
                      className="w-full bg-slate-300 text-black hover:text-white"
                      onClick={() => setIsEditDialog(false)}
                    >
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
        </div>
      </Dialog>
    </div>
  );
}
