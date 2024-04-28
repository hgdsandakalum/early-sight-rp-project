"use client";
import React, { useRef, useState } from "react";
import DefaultLayout from "@/components/Layouts/DefaultLayout";
import DRImageUpload from "./_components/DRImageUpload";
import DRResults from "./_components/DRResults";
import PatientCard from "./_components/PatientCard";
import LatestRetinaImages from "./_components/LatestRetinaImages";

const DRToolPage = () => {
  const [isPatient, setIsPatient] = useState(false);

  const handleIsPatient = (e) => {
    e.preventDefault();
    setIsPatient(true);
  };

  return (
    <>
      <DefaultLayout>
        <div className="grid grid-cols-12 gap-4 md:mt-2 md:gap-6 2xl:mt-3 2xl:gap-7">
          <div className="col-span-12 xl:col-span-4">
            <DRImageUpload handleIsPatient={handleIsPatient} />
          </div>
          <div className="col-span-12 xl:col-span-8">
            <DRResults />
          </div>
          {isPatient ? <PatientCard /> : <></>}
          {isPatient ? (
            <div className="col-span-12 xl:col-span-8">
              <LatestRetinaImages />
            </div>
          ) : (
            <></>
          )}
        </div>
      </DefaultLayout>
    </>
  );
};

export default DRToolPage;
