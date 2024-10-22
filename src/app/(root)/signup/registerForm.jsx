"use client";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
// import { signIn } from "next-auth/react";

import { Button } from "../../../components/ui/button";
import Dropdown from "react-dropdown";
import "react-dropdown/style.css";

import { Select, Space, Input as InputPw } from "antd";
import { EyeInvisibleOutlined, EyeTwoTone } from "@ant-design/icons";

import { Input } from "@/components/ui/input";
import { toast } from "sonner";
import { useState } from "react";
import { useRouter } from "next/navigation";

import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

const formSchema = z.object({
  name: z.string({ required_error: "" }),
  gender: z.string({ required_error: "" }),
  age: z.coerce.number({ required_error: "", invalid_type_error: "" }),
  number: z.string({ required_error: "" }).length(10),
  address: z.string({ required_error: "" }).optional(),
  conditions: z.string({ required_error: "" }),
});

const RegisterForm = () => {
  const router = useRouter();
  const [formData, setFormData] = useState({
    username: "",
    password: "",
    name: "",
    gender: "MALE",
    email: "",
    location: "",
    occupation: "",
    phone: "",
    channelingSchedule: {
      MONDAY: {
        start: "15:30",
        end: "18:00",
      },
      TUESDAY: {
        start: "15:30",
        end: "18:00",
      },
      WEDNESDAY: {
        start: "15:30",
        end: "18:00",
      },
      FRIDAY: {
        start: "15:30",
        end: "18:00",
      },
      SATURDAY: {
        start: "15:30",
        end: "18:00",
      },
      SUNDAY: {
        start: "15:30",
        end: "18:00",
      },
    },
  });
  const [formError, setFormError] = useState("");

  const form = useForm({
    mode: "onChange",
    resolver: zodResolver(formSchema),
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const onSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch(
        "https://retina-mobile-app-bankend.vercel.app/api/v1/doctor/register",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        }
      );

      if (!response.ok) {
        const errorData = await response.json();
        setFormError(errorData.message);
        throw new Error(errorData.message || "Login failed");
      }

      const x = await response.json()

      const { data } = await response.json();

      // Store the token in localStorage or a secure cookie
      localStorage.setItem("authToken", data.token);
      localStorage.setItem("userId", data.otherDetails._id);
      localStorage.setItem("user", data.otherDetails);

      // Show success message
      toast.success("Logged in successfully");

      // Redirect to dashboard or home page
      router.push("/user/dashboard");
    } catch (error) {
      console.error("Login error:", error);
      toast.error(error.message || "An error occurred during login");
    }
  };

  return (
    <>
      <div className="sm:mx-auto sm:w-full sm:max-w-lg bg-red-50">
        {/* <img
          className="mx-auto h-10 w-auto"
          src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600"
          alt="Your Company"
        /> */}
        <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
          Create your profile
        </h2>
      </div>

      <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-md">
        <form onSubmit={onSubmit} className="space-y-6">
          <div className=" flex flex-row gap-2">
            <div className=" flex-1">
              <label
                htmlFor="name"
                className="block text-sm font-medium text-gray-700"
              >
                Name
              </label>
              <div className="mt-1">
                <input
                  type="text"
                  name="name"
                  placeholder="Name"
                  value={formData.name}
                  onChange={handleChange}
                  className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                />
              </div>
            </div>
            <div className=" flex-1">
              <label
                htmlFor="username"
                className="block text-sm font-medium text-gray-700"
              >
                Username
              </label>
              <div className="mt-1">
                <input
                  type="text"
                  name="username"
                  placeholder="Username"
                  value={formData.username}
                  onChange={handleChange}
                  className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                />
              </div>
            </div>
          </div>

          <div className=" flex flex-row gap-2">
            <div className=" flex-1">
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-700"
              >
                Email
              </label>
              <div className="mt-1">
                <input
                  type="text"
                  name="email"
                  placeholder="Email"
                  value={formData.email}
                  onChange={handleChange}
                  className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                />
              </div>
            </div>
            <div className=" flex-1">
              <label
                htmlFor="location"
                className="block text-sm font-medium text-gray-700"
              >
                Location
              </label>
              <div className="mt-1">
                <input
                  type="text"
                  name="location"
                  placeholder="Location"
                  value={formData.location}
                  onChange={handleChange}
                  className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                />
              </div>
            </div>
          </div>

          <div className=" flex flex-row gap-2">
            <div className=" flex-1">
              <label
                htmlFor="occupation"
                className="block text-sm font-medium text-gray-700"
              >
                Occupation
              </label>
              <div className="mt-1">
                <input
                  type="text"
                  name="occupation"
                  placeholder="Occupation"
                  value={formData.occupation}
                  onChange={handleChange}
                  className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                />
              </div>
            </div>
            <div className=" flex-1 ">
              <label
                htmlFor="gender"
                className="block text-sm font-medium text-gray-700"
              >
                Gender
              </label>
              <div className="mt-1 h-10">
                <Select
                  options={[
                    { value: "MALE", label: "Male" },
                    { value: "FEMALE", label: "Female" },
                    { value: "OTHER", label: "Other" },
                  ]}
                  placeholder="Gender"
                  className=" mt-1 w-full h-10"
                  onChange={(e) => {
                    setFormData({ ...formData, gender: e });
                  }}
            
                />
              </div>
            </div>
          </div>

          <div className=" flex flex-row gap-2">
            <div className=" flex-1">
              <label
                htmlFor="phone"
                className="block text-sm font-medium text-gray-700"
              >
                Phone
              </label>
              <div className="mt-1">
                <Space.Compact className=" outline-none focus:outline-none">
                  <Input
                    style={{ width: "20%" }}
                    defaultValue="0571"
                    className=" outline-none focus:outline-none"
                  />
                  <input
                    type="number"
                    name="phone"
                    placeholder="0000000000"
                    value={formData.phone}
                    onChange={handleChange}
                    className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  />
                </Space.Compact>
              </div>
            </div>
            <div className=" flex-1">
              <label
                htmlFor="password"
                className="block text-sm font-medium text-gray-700"
              >
                Password
              </label>
              <div className="mt-1 h-10">
                <InputPw.Password
                  placeholder="input password"
                  iconRender={(visible) =>
                    visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />
                  }
                  className=" h-full"
                />
              </div>
            </div>
          </div>
          {formError && (
            <div className="text-red-700 text-xs py-[2px]">{formError}</div>
          )}
          <div>
            <Button type="submit" className="flex w-full justify-center">
              Sign in
            </Button>
          </div>
        </form>

        <div className="flex flex-row justify-end">
          <span
            className=" underline cursor-pointer"
            onClick={() => {
              router.push("/signin");
            }}
          >
            Sign in
          </span>
        </div>
      </div>
    </>
  );
};

export default RegisterForm;
