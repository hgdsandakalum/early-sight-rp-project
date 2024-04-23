"use client";
import React, { useRef } from "react";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

import { Button } from "@/components/ui/button";
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
import { options } from "../api/auth/[...nextauth]/options";
import { getServerSession } from "next-auth/next";
import { signOut } from "next-auth/react";

const DashboardPage = () => {
  const buttonRef = useRef(null);
  const session = getServerSession(options);

  console.log(session);

  return (
    <>
      <div className="flex flex-col flex-1 justify-center px-6 py-12 lg:px-8">
        {session && (
          <div className="sm:mx-auto sm:w-full sm:max-w-sm">
            logged in
            <Button onClick={() => console.log("cliecked")} ref={buttonRef}>
              Logout
            </Button>
          </div>
        )}
        {!session && (
          <div className="sm:mx-auto sm:w-full sm:max-w-sm">logged out</div>
        )}
      </div>
    </>
  );
};

export default DashboardPage;
