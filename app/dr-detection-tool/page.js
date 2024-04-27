"use client";
import React, { useRef } from "react";
import { options } from "../api/auth/[...nextauth]/options";
import { getServerSession } from "next-auth/next";
import DefaultLayout from "@/components/Layouts/DefaultLayout";
import DRImageUpload from "./_components/DRImageUpload";
import DRResults from "./_components/DRResults";
import PatientCard from "./_components/PatientCard";
import LatestRetinaImages from "./_components/LatestRetinaImages";

const DRToolPage = () => {
  const buttonRef = useRef(null);
  const session = getServerSession(options);

  console.log(session);

  return (
    <>
      <DefaultLayout>
        <h2 className="font-bold py-5 text-xl sm:text-2xl">
          Diabetic Retinopathy Detection Tool
        </h2>
        <div className="grid grid-cols-12 gap-4 md:mt-6 md:gap-6 2xl:mt-7 2xl:gap-7">
          <div className="col-span-12 xl:col-span-4">
            <DRImageUpload />
          </div>
          <div className="col-span-12 xl:col-span-8">
            <DRResults />
          </div>
          <PatientCard />
          <div className="col-span-12 xl:col-span-8">
            <LatestRetinaImages />
          </div>
        </div>
      </DefaultLayout>
    </>
  );
};

export default DRToolPage;
