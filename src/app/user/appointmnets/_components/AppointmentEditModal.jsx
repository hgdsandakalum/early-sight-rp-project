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
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import {
  Form,
  FormControl,
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
  status: z.string({ required_error: "" }),
});

const AppointmentEditModal = ({ open, data, setIsEditDialog }) => {
  const [patientData, setPatientData] = useState({
    name: "",
    email: "",
    date: "",
    time: "",
    type: "",
    status: "",
    meetLink: "",
  });

  const form = useForm({
    mode: "onChange",
    resolver: zodResolver(formSchema),
  });

  useEffect(() => {
    if (data) {
      setPatientData({
        name: data?.name || "",
        email: data?.email || "",
        date: data?.date || "",
        time: data?.time || "",
        type: data?.type || "",
        status: data?.status || "",
        meetLink: data?.meetLink || "",
      });
    }
  }, [data]);

  async function onSubmit(values) {
    const appointmentId = data?.appointmnetId;
    const payload = { status: values.status };

    try {
      const response = await fetch(
        `https://retina-mobile-app-bankend.vercel.app/api/v1/channeling/${appointmentId}`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(payload),
        }
      );
      if (response.ok) {
        console.log("Appointment updated successfully");
        setIsEditDialog(false); // Close the modal on success
      } else {
        console.error("Failed to update appointment");
      }
    } catch (error) {
      console.error("Error:", error);
    }
  }

  return (
    <>
      <Dialog open={open} onOpenChange={setIsEditDialog}>
        <DialogContent
          className="!max-w-xl"
          style={{
            position: "fixed",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            zIndex: 9999,
          }}
        >
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
              <DialogHeader>
                <DialogTitle className="!text-xl">
                  Edit Appointment Data
                </DialogTitle>
                <DialogDescription className="py-4">
                  <div className="grid grid-cols-4 gap-4">
                    <div className="col-span-4">
                      <FormItem>
                        <FormLabel className="text-black">
                          Patient Name
                        </FormLabel>
                        <FormControl>
                          <Input
                            placeholder="Name"
                            value={patientData.name}
                            disabled
                          />
                        </FormControl>
                      </FormItem>
                    </div>
                    <div className="col-span-1">
                      <FormItem>
                        <FormLabel className="text-black">Date</FormLabel>
                        <FormControl>
                          <Input
                            placeholder="Date"
                            value={patientData.date}
                            disabled
                          />
                        </FormControl>
                      </FormItem>
                    </div>
                    <div className="col-span-1">
                      <FormItem>
                        <FormLabel className="text-black">Time</FormLabel>
                        <FormControl>
                          <Input
                            placeholder="Time"
                            value={patientData.time}
                            disabled
                          />
                        </FormControl>
                      </FormItem>
                    </div>
                    <div className="col-span-1">
                      <FormItem>
                        <FormLabel className="text-black">Type</FormLabel>
                        <FormControl>
                          <Input
                            placeholder="Type"
                            value={patientData.type}
                            disabled
                          />
                        </FormControl>
                      </FormItem>
                    </div>
                    <div className="col-span-4">
                      <FormItem>
                        <FormLabel className="text-black">
                          Patient Email
                        </FormLabel>
                        <FormControl>
                          <Input
                            placeholder="Email"
                            value={patientData.email}
                            disabled
                          />
                        </FormControl>
                      </FormItem>
                    </div>
                    <div className="col-span-4">
                      <FormItem>
                        <FormLabel className="text-black">
                          Meeting Link
                        </FormLabel>
                        <FormControl>
                          <Input
                            placeholder="Meet Link"
                            value={patientData.meetLink}
                            disabled
                          />
                        </FormControl>
                      </FormItem>
                    </div>

                    <div className="col-span-2">
                      <FormField
                        control={form.control}
                        name="status"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="text-black">
                              Appointment Status
                            </FormLabel>
                            <Select
                              onValueChange={field.onChange}
                              defaultValue={patientData.status}
                            >
                              <FormControl>
                                <SelectTrigger className="text-black">
                                  <SelectValue placeholder="Status" />
                                </SelectTrigger>
                              </FormControl>
                              <SelectContent className="z-[99999]">
                                <SelectItem
                                  value="CANCELLED"
                                  className="text-black"
                                >
                                  CANCELLED
                                </SelectItem>
                                <SelectItem
                                  value="COMPLETED"
                                  className="text-black"
                                >
                                  COMPLETED
                                </SelectItem>
                                <SelectItem
                                  value="SCHEDULED"
                                  className="text-black"
                                >
                                  SCHEDULED
                                </SelectItem>
                                <SelectItem
                                  value="PENDING"
                                  className="text-black"
                                >
                                  PENDING
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
                  <Button
                    className="w-full bg-slate-300 text-black hover:text-white"
                    onClick={() => setIsEditDialog(false)}
                  >
                    Close
                  </Button>
                </DialogClose>
                <Button type="submit" className="w-full text-yellow-50 mt-1 mb-1">
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

export default AppointmentEditModal;
