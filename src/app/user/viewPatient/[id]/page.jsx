"use client"
import { useRouter } from "next/router";
import React from "react";
import PatientOverview from "@/components/PatientOverview/PatientOverview"

const page = () => {
  // const router = useRouter();
  // const { id } = router.query;
  // console.log(id)
  // const {  } = router.query;
  return (
    <>
      <div className="container mx-auto">
        <span className=" text-lg font-bold">Patients Overview</span>
        <PatientOverview />
      </div>
    </>
  );
};

export default page;