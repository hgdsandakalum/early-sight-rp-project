"use client";
import React, { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { columns } from "./_components/columns";
import { DataTable } from "./_components/data-table";
import { getAllPatient } from "@/services";
import { Patient } from "../../../../types";

const Page = () => {
  const [patients, setPatients] = useState<Patient[]>([]);

  useEffect(() => {
    const fetchPatients = async () => {
      try {
        const data = await getAllPatient();
        const transformedData: Patient[] = data.map((item: any) => ({
          id: item.patientId,
          firstName: item.firstName,
          lastName: item.lastName,
          gender: item.gender,
          email: item.email,
          age: item.age,
          mobile: item.mobile,
          conditions: item.conditions,
          nextAppointment: "2024-11-25",
          joinedDate: item.createdAt.split("T")[0],
        }));
        setPatients(transformedData);
      } catch (error) {
        console.error("Error fetching data: ", error);
      }
    };

    fetchPatients();
  }, []);

  useEffect(() => {
    console.log("patients", patients);
  }, [patients]);

  return (
    <>
      <div className="container mx-auto">
        <DataTable columns={columns} data={patients} />
      </div>
    </>
  );
};

export default Page;
