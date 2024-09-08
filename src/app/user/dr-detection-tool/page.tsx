"use client";
import React, { useState, useEffect } from "react";
import DRImageUpload from "./_components/DRImageUpload";
import DRResults from "./_components/DRResults";
import PatientCard from "./_components/PatientCard";
import LatestRetinaImages from "./_components/LatestRetinaImages";
import { getPatientByID, getPatientEyes, classifyImage } from "@/services";
import { Patient } from "../../../../types";

const DRToolPage = () => {
  const [isPatient, setIsPatient] = useState(false);
  const [patient, setPatient] = useState<Patient>();
  const [patientEyes, setPatientEyes] = useState({
    leftEyeImage: "",
    rightEyeImage: "",
  });
  const [patientProcessedEyes, setPatientProcessedEyes] = useState({
    leftEyeImage: "",
    rightEyeImage: "",
  });
  const [patientEyesResult, setPatientEyesResult] = useState({
    leftEyeImage: "",
    rightEyeImage: "",
  });
  const [isLoading, setIsLoading] = useState(false);

  const handleIsPatient = async (id: string) => {
    await fetchPatient(id);
    await fetchPatientEyes(id);
  };

  const fetchPatient = async (id: string) => {
    try {
      const data = await getPatientByID(id);
      const transformedData: Patient = {
        id: data.patientId,
        firstName: data.firstName,
        lastName: data.lastName,
        gender: data.gender,
        email: data.email,
        age: data.age,
        mobile: data.mobile,
        conditions: data.conditions,
        nextAppointment: "2024-11-25",
        joinedDate: data.createdAt.split("T")[0],
      };
      setPatient(transformedData);
      setIsPatient(true);
      console.log("transformedData", transformedData);
    } catch (error) {
      console.error("Error fetching data: ", error);
    }
  };

  const fetchPatientEyes = async (id: string) => {
    try {
      const data = await getPatientEyes(id);
      setPatientEyes({
        leftEyeImage: data.patientEyeData.leftEyeImage,
        rightEyeImage: data.patientEyeData.rightEyeImage,
      });
      console.log("data", data.patientEyeData);
    } catch (error) {
      console.error("Error fetching data: ", error);
    }
  };

  const getPrediction = async (image: string) => {
    try {
      const byteCharacters = atob(image.split(",")[1]);
      const byteNumbers = new Array(byteCharacters.length);

      for (let i = 0; i < byteCharacters.length; i++) {
        byteNumbers[i] = byteCharacters.charCodeAt(i);
      }

      const byteArray = new Uint8Array(byteNumbers);

      // Create a blob from the binary data
      const blob = new Blob([byteArray], { type: "image/png" });

      const file = new File([blob], "image.png", { type: "image/png" });

      const data = await classifyImage(file);

      return data;
    } catch (error) {
      console.error("Error fetching data: ", error);
    }
  };

  return (
    <>
      <div className="grid grid-cols-12 gap-4 md:mt-2 md:gap-6 2xl:mt-3 2xl:gap-7">
        <div className="col-span-12 xl:col-span-4">
          <DRImageUpload
            handleIsPatient={handleIsPatient}
            setPatientProcessedEyes={setPatientProcessedEyes}
            getPrediction={getPrediction}
            setPatientEyesResult={setPatientEyesResult}
            setIsLoading={setIsLoading}
            isLoading={isLoading}
          />
        </div>
        <div className="col-span-12 xl:col-span-8">
          <DRResults
            patientProcessedEyes={patientProcessedEyes}
            patientEyesResult={patientEyesResult}
            isLoading={isLoading}
          />
        </div>
        {isPatient && (
          <>
            <PatientCard patient={patient} />
            <div className="col-span-12 xl:col-span-8">
              <LatestRetinaImages patientEyes={patientEyes} />
            </div>
          </>
        )}
      </div>
    </>
  );
};

export default DRToolPage;
