"use client";
import React, { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { columns } from "./_components/columns";
import { DataTable } from "./_components/data-table";
import { deletePatient, getAllPatient } from "@/services";
import { Patient } from "../../../../types";
import { message } from "antd";

const Page = () => {
  const [patients, setPatients] = useState<Patient[]>([]);

  useEffect(() => {
    fetchPatients();
  }, []);

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

  const handleRemove = async (patientId: string) => {
    try {
      await deletePatient(patientId);
      message.success("Patient deleted successfully");
      fetchPatients();
    } catch (error) {
      console.error("Failed to delete patient:", error);
      message.error("Failed to delete patient. Please try again.");
    }
  };

  const columnsWithRemove = columns(handleRemove);

  return (
    <>
      <div className="container mx-auto">
        <DataTable
          columns={columnsWithRemove}
          data={patients}
          fetchPatients={fetchPatients}
        />
      </div>
    </>
  );
};

export default Page;
