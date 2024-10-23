"use client";
import React, { useState, useEffect } from "react";
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
import { message, Modal, Select } from "antd";
import { Patient } from "../../../../../types";
import { updatePatient } from "@/services";

const formSchema = z.object({
  firstName: z.string().min(1, "Name is required"),
  lastName: z.string().min(1, "Name is required"),
  email: z.string().email("Invalid email address").min(1, "Email is required"),
  gender: z.string().min(1, "Gender is required"),
  age: z.coerce
    .number()
    .positive("Age must be a positive number")
    .int("Age must be an integer"),
  mobile: z.string().length(10, "Phone number must be 10 digits"),
  address: z.string().optional(),
  conditions: z.string().min(1, "Conditions are required"),
});

interface PatientEditModalProps {
  open: boolean;
  data: Patient;
  setIsEditDialog: (open: boolean) => void;
  fetchPatients: () => void;
}

export function PatientEditModal({
  open,
  data,
  setIsEditDialog,
  fetchPatients,
}: PatientEditModalProps) {
  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      gender: "male",
      age: 0,
      mobile: "",
      address: "",
      conditions: "",
    },
  });

  useEffect(() => {
    if (data) {
      let genderValue = "male";
      if (data.gender === "F") {
        genderValue = "female";
      } else if (data.gender === "O") {
        genderValue = "other";
      }

      form.reset({
        firstName: data.firstName || "",
        lastName: data.lastName || "",
        email: data.email || "",
        gender: genderValue,
        age: data.age || 0,
        mobile: data.mobile || "",
        address: data.address || "",
        conditions: Array.isArray(data.conditions)
          ? data.conditions.join(", ")
          : data.conditions || "",
      });
    }
  }, [data, form]);

  const handleCancel = () => {
    setIsEditDialog(false);
    form.reset();
  };

  const onSubmit = async (values: any) => {
    try {
      await updatePatient(data.id, values);
      message.success("Patient updated successfully");
      setIsEditDialog(false);
      if (fetchPatients) {
        fetchPatients();
      }
    } catch (error) {
      console.error("Error updating patient: ", error);
      message.error("Failed to update patient. Please try again.");
    }
  };

  return (
    <Modal
      title="Edit Patient"
      open={open}
      onCancel={handleCancel}
      footer={false}
    >
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <div className="py-4">
            <div className="grid grid-cols-4 gap-4">
              <div className="col-span-2">
                <FormField
                  control={form.control}
                  name="firstName"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Patient First Name</FormLabel>
                      <FormControl>
                        <Input placeholder="First Name" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <div className="col-span-2">
                <FormField
                  control={form.control}
                  name="lastName"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Patient Last Name</FormLabel>
                      <FormControl>
                        <Input placeholder="Last Name" {...field} />
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
                      <FormLabel>Patient Gender</FormLabel>
                      <Select
                        className="w-full !h-10"
                        value={field.value}
                        style={{ height: "40px" }}
                        onChange={field.onChange}
                        options={[
                          { value: "male", label: "Male" },
                          { value: "female", label: "Female" },
                          { value: "other", label: "Other" },
                        ]}
                      />
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
                      <FormLabel>Patient Age</FormLabel>
                      <FormControl>
                        <Input type="number" placeholder="Age" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <div className="col-span-2">
                <FormField
                  control={form.control}
                  name="mobile"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Patient Number</FormLabel>
                      <FormControl>
                        <Input placeholder="Number" {...field} />
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
                      <FormLabel>Patient Email</FormLabel>
                      <FormControl>
                        <Input placeholder="Email" {...field} />
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
                      <FormLabel>Patient Address</FormLabel>
                      <FormControl>
                        <Input placeholder="Address" {...field} />
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
                      <FormLabel>Patient Conditions</FormLabel>
                      <FormControl>
                        <Input placeholder="Conditions" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <div className="col-span-4">
                <div className="grid grid-cols-3 gap-4">
                  <Button
                    type="button"
                    variant="outline"
                    onClick={handleCancel}
                    className="w-full"
                  >
                    Close
                  </Button>
                  <Button
                    type="submit"
                    className="w-full col-span-2 text-white"
                  >
                    Update
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </form>
      </Form>
    </Modal>
  );
}
