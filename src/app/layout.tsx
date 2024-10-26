"use client";

import "@/styles/global.css";
import { useEffect } from "react";
import { AntdRegistry } from "@ant-design/nextjs-registry";
import { AntdConfigProvider } from "@/providers";
import { useAppStore, useAuthStore } from "@/store";
import { getCurrentUser } from "@/services";
import { Loader } from "@/components/loader";
import { redirect } from "next/navigation";
import { generateToken, messaging } from "../firebase";
import { onMessage } from "firebase/messaging";

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
interface RootLayoutProps {
  children: React.ReactNode;
}

function RootLayout({ children }: RootLayoutProps) {
  const { isAuthenticated, setIsAuthenticatedAction, setUserAction, user } =
    useAuthStore();
  const { isLoading, setIsLoadingAction } = useAppStore();

  const initializeAuth = async () => {
    try {
      setIsLoadingAction(true);

      const storedAuthToken = localStorage.getItem("authToken");
      const storedUserId = localStorage.getItem("userIdRC");

      const fetchUserData = async (userId: string) => {
        const userData = await getCurrentUser(userId);
        setUserAction(userData);
      };

      if (isAuthenticated) {
        await fetchUserData(storedUserId || "");
        return;
      }

      if (storedAuthToken && storedUserId) {
        setIsAuthenticatedAction(true);
        await fetchUserData(storedUserId);
      } else {
        setUserAction({
          id: 0,
          fullName: "",
          designation: "",
          username: "",
        });
      }
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoadingAction(false);
      console.log("initializeAuth");
    }
  };

  useEffect(() => {
    initializeAuth();
  }, []);

  useEffect(() => {
    console.log("user", user);
  }, [user]);

  useEffect(() => {
    generateToken();
    onMessage(messaging, (payload) => {
      toast(payload.notification?.body);
      console.log("payload ", payload);
    });
  }, []);
  return (
    <html lang="en" className="h-full bg-white">
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="google" content="notranslate" />
      </head>
      <body
        className={`
        min-h-screen h-full bg-slate-50 font-sans antialiased`}
      >
        {isLoading && <Loader fullscreen={true} size="large" />}

        <AntdRegistry>
          <AntdConfigProvider>{children}</AntdConfigProvider>
        </AntdRegistry>

        <ToastContainer />
      </body>
    </html>
  );
}

export default RootLayout;
