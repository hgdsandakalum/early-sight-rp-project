"use client";
import "@/styles/global.css";
import { useEffect } from "react";
import { AntdRegistry } from "@ant-design/nextjs-registry";
import { AntdConfigProvider } from "@/providers";
import { useAppStore, useAuthStore } from "@/store";

function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const { isAuthenticated, setIsAuthenticatedAction, setUserAction } =
    useAuthStore();
  const { isLoading, setIsLoadingAction } = useAppStore();

  // const initializeAuth = () => {
  //   try {
  //     setIsLoadingAction(true);
  //     setIsAuthenticatedAction(true);
  //     console.log("isAuthenticated", isAuthenticated);
  //     if (!isAuthenticated) {
  //       console.log("isAuthenticated2", isAuthenticated);
  //       const userId = "123";
  //       const currentTimestamp = Math.floor(Date.now() / 1000);

  //       setIsAuthenticatedAction(true);
  //     }
  //   } catch (error) {
  //     console.error(error);
  //   } finally {
  //     setIsLoadingAction(false);
  //     console.log("isAuthenticated3", isAuthenticated);
  //   }
  // };

  useEffect(() => {
    // initializeAuth();
    setIsAuthenticatedAction(true);
    console.log("isAuthenticated4", isAuthenticated);
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
        <AntdRegistry>
          <AntdConfigProvider>
            {/* {isLoading && <Loader fullscreen={true} size="large" />} */}
            {children}
          </AntdConfigProvider>
        </AntdRegistry>
      </body>
    </html>
  );
}

export default RootLayout;
