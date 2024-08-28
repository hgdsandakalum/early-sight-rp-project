"use client";
import { redirect } from "next/navigation";
import LoginFrom from "./form";
import { useAuthStore } from "@/store";

const LoginPage = async () => {
  const { isAuthenticated, setIsAuthenticatedAction } = useAuthStore();

  if (!isAuthenticated) {
    setIsAuthenticatedAction(true);
    console.log("isAuthenticated", isAuthenticated);
    // redirect("/user/dashboard");
  }

  return (
    <div className="flex flex-col flex-1 h-screen justify-center px-6 py-12 lg:px-8">
      <LoginFrom />
    </div>
  );
};

export default LoginPage;
