import { z } from "zod";
import { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
// import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";

import { Button } from "../../../components/ui/button";

import { Input } from "@/components/ui/input";
import { toast } from "sonner";

const LoginForm = () => {
  const router = useRouter();
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [formError, setFormError] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const onSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch("https://retina-mobile-app-bankend.vercel.app/api/v1/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        const errorData = await response.json();
        setFormError(errorData.message);
        throw new Error(errorData.message || "Login failed");
      }

      const { data} = await response.json();

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
      <div className="sm:mx-auto sm:w-full sm:max-w-sm">
        <img
          className="mx-auto h-10 w-auto"
          src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600"
          alt="Your Company"
        />
        <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
          Sign in to your account
        </h2>
      </div>

      <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
        <form onSubmit={onSubmit} className="space-y-6">
          <div>
            <label
              htmlFor="username"
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
          <div>
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-700"
            >
              Password
            </label>
            <div className="mt-1">
              <input
                type="password"
                name="password"
                placeholder="Password"
                value={formData.password}
                onChange={handleChange}
                className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              />
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
              router.push("/signup");
            }}
          >
            Register now
          </span>
        </div>
      </div>
    </>
  );
};

export default LoginForm;
