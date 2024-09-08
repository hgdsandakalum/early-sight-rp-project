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
import { toast } from "sonner";
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
import DatePicker from "react-datepicker";

import "react-datepicker/dist/react-datepicker.css";

const formSchema = z.object({
  name: z.string({ required_error: "" }),
  email: z.string({ required_error: "" }).email({ invalid_type_error: "" }),
  gender: z.string({ required_error: "" }),
  subscriptionType: z.string({ required_error: "" }),
  subscriptionStartDate: z.date({ required_error: "" }).optional(),
  subscriptionEndDate: z.date({ required_error: "" }).optional(),
});

const AddNewSubscriptionModal = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const form = useForm({
    mode: "onChange",
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      gender: "",
      subscriptionType: "",
      subscriptionStartDate: new Date(),
      subscriptionEndDate: new Date(),
    },
  });

  const onSubmit = async (values) => {

    try {
      console.log("hey")
      const docId = await localStorage.getItem("userId")
      const response = await fetch(
        "http://localhost:3005/api/v1/doctor/invite/" + docId,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email: form.getValues("email"),
            subscriptionType: form.getValues("subscriptionType"),
            subscriptionStartDate: form.getValues("subscriptionStartDate"),
            subscriptionEndDate: form.getValues("subscriptionEndDate")
          }),
        }
      );

      if (!response.ok) {
        const errorData = await response.json();
        setFormError(errorData.message);
        throw new Error(errorData.message || "Login failed");
      }

      // const { data } = await response.json();

      toast.success("Paient invited succesfully");
      form.reset()
      setIsModalOpen(false)
      window.location.reload()
    } catch (error) {
      console.error("Login error:", error);
      toast.error(error.message || "An error occurred during login");
    }
  }
  return (
    <>
      <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
        <DialogTrigger>
          <Button onClick={() => setIsModalOpen(true)}>
            <div className="flex">
              <Plus className="mr-1" />
              <span className="hidden sm:block">Invite a new patient</span>
            </div>
          </Button>
        </DialogTrigger>
        <DialogContent className="!max-w-xl">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
              <DialogHeader>
                <DialogTitle className="!text-xl">
                  Invite New Patient
                </DialogTitle>
                <DialogDescription className="py-4">
                  <div className="grid grid-cols-4 gap-4">
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
                        name="name"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="text-black">
                              Patient Name
                            </FormLabel>
                            <FormControl>
                              <Input
                                placeholder="Email"
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
                                <SelectItem value="MALE" className="text-black">
                                  Male
                                </SelectItem>
                                <SelectItem
                                  value="FEMALE"
                                  className="text-black"
                                >
                                  Female
                                </SelectItem>
                                <SelectItem
                                  value="OTHER"
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
                    <div className="col-span-2">
                      <FormField
                        control={form.control}
                        name="subscriptionStartDate"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="text-black">
                              Subscription Start Date
                            </FormLabel>
                            <FormControl>
                              <DatePicker
                                className=" border-2 rounded-sm px-3 py-2 "
                                selected={form.getValues(
                                  "subscriptionStartDate"
                                )}
                                onChange={(date) =>
                                  form.setValue("subscriptionStartDate", date)
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
                        name="subscriptionEndDate"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="text-black">
                              Subscription End Date
                            </FormLabel>
                            <FormControl>
                              <DatePicker
                                className=" border-2 rounded-sm px-3 py-2"
                                selected={form.getValues("subscriptionEndDate")}
                                onChange={(date) =>
                                  form.setValue("subscriptionEndDate", date)
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
                        name="subscriptionType"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="text-black">
                              Subscription Type
                            </FormLabel>
                            <Select
                              onValueChange={field.onChange}
                              defaultValue={field.value}
                            >
                              <FormControl>
                                <SelectTrigger>
                                  <SelectValue placeholder="Subscription type" />
                                </SelectTrigger>
                              </FormControl>
                              <SelectContent className="z-[99999] ">
                                <SelectItem value="INHOUSE" className="text-black">
                                  Inhouse
                                </SelectItem>
                                <SelectItem
                                  value="VIDEOCONFERENCE"
                                  className="text-black"
                                >
                                  Video Conference
                                </SelectItem>
                                <SelectItem
                                  value="OTHER"
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
};

export default AddNewSubscriptionModal;
