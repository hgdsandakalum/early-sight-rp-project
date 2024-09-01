"use client";
import { useEffect } from "react";
import { useAuthStore } from "@/store";

export default function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const { isAuthenticated, setIsAuthenticatedAction, setUserAction } =
    useAuthStore();

  return <div>{children}</div>;
}
