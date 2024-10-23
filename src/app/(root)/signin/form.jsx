"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { Button } from "../../../components/ui/button";

import retinacarelogo from "@/assets/img/retinacarelogo.png";
import { toast } from "sonner";
import { Tabs } from "antd";

const LoginForm = () => {
  const router = useRouter();
  const [formData, setFormData] = useState({ username: "", password: "" });
  const [formDataEmail, setFormDataEmail] = useState({
    email: "",
    password: "",
  });
  const [formError, setFormError] = useState("");
  const [activeTab, setActiveTab] = useState("1");

  useEffect(() => {
    setFormData({ username: "", password: "" });
    setFormDataEmail({ email: "", password: "" });
  }, [activeTab]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleChangeEmail = (e) => {
    const { name, value } = e.target;
    setFormDataEmail((prev) => ({ ...prev, [name]: value }));
  };

  const onSubmit = async (e) => {
    e.preventDefault();

    setFormError("");

    const isEmailLogin = activeTab === "2";

    const payload = isEmailLogin ? formDataEmail : formData;

    const endpoint = isEmailLogin
      ? "https://retina-mobile-app-bankend.vercel.app/api/v1/auth/login"
      : `${process.env.NEXT_PUBLIC_USER_SERVICE_URL}/api/auth/login`;

    try {
      const response = await fetch(endpoint, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        const errorData = await response.json();
        setFormError(errorData.message);
        throw new Error(errorData.message || "Login failed");
      }

      if (isEmailLogin) {
        const { data } = await response.json();
        // Store the token in localStorage or a secure cookie
        localStorage.setItem("authToken", data.token);
        localStorage.setItem("userId", data.otherDetails._id);
        localStorage.setItem("user", data.otherDetails);
      } else {
        const { token, userId } = await response.json();
        localStorage.setItem("authToken", token);
        localStorage.setItem("userIdRC", userId);
      }

      // Show success message
      toast.success("Logged in successfully");

      // Redirect to dashboard or home page
      router.push("/user/dashboard");
    } catch (error) {
      console.error("Login error:", error);
      toast.error(error.message || "An error occurred during login");
    }
  };

  const initialItems = [
    {
      label: "Sign in with Username",
      children: (
        <form onSubmit={onSubmit} className="space-y-6">
          <div>
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
          <div className="flex flex-col gap-3">
            <Button
              type="submit"
              className="flex w-full justify-center text-white font-bold uppercase"
            >
              Sign in
            </Button>
            <Button
              className="flex w-full justify-center bg-[#cdd6e2] text-black font-bold uppercase"
              onClick={() => {
                router.push("/signup");
              }}
            >
              Register now
            </Button>
          </div>
        </form>
      ),
      key: "1",
    },
    {
      label: "Sign in with Email",
      children: (
        <form onSubmit={onSubmit} className="space-y-6">
          <div>
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
                value={formDataEmail.email}
                onChange={handleChangeEmail}
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
                value={formDataEmail.password}
                onChange={handleChangeEmail}
                className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              />
            </div>
          </div>
          {formError && (
            <div className="text-red-700 text-xs py-[2px]">{formError}</div>
          )}
          <div className="flex flex-col gap-3">
            <Button
              type="submit"
              className="flex w-full justify-center text-white font-bold uppercase"
            >
              Sign in
            </Button>
            <Button
              className="flex w-full justify-center bg-[#cdd6e2] text-black font-bold uppercase"
              onClick={() => {
                router.push("/signup");
              }}
            >
              Register now
            </Button>
          </div>
        </form>
      ),
      key: "2",
    },
  ];

  return (
    <>
      <div className="sm:mx-auto sm:w-full sm:max-w-sm">
        <Image
          className="mx-auto h-10 w-auto"
          src={retinacarelogo}
          alt="Retina Care"
        />
        <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
          Sign in to your account
        </h2>
      </div>

      <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
        <Tabs
          defaultActiveKey="1"
          activeKey={activeTab}
          onChange={setActiveTab}
          type="card"
          size="middle"
          items={initialItems}
          centered
        />
      </div>
    </>
  );
};

export default LoginForm;
