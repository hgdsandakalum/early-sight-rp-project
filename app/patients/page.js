import React from "react";
import { Button } from "@/components/ui/button";
import DefaultLayout from "@/components/Layouts/DefaultLayout";
import { columns } from "./_components/columns";
import { DataTable } from "./_components/data-table";

async function getData() {
  // Fetch data from your API here.
  return [
    {
      patientID: "PT2023-A103",
      patientName: "Ralph Edwards",
      gender: "M",
      email: "debbie.baker@example.com",
      conditions: ["Hypertension"],
      nextAppointment: "1/28/2024",
      joinedDate: "8/15/2022",
    },
    {
      patientID: "PT2023-A103",
      patientName: "Ralph Edwards",
      gender: "M",
      email: "debbie.baker@example.com",
      conditions: ["Hypertension"],
      nextAppointment: "1/28/2024",
      joinedDate: "8/15/2022",
    },
    {
      patientID: "PT2023-A103",
      patientName: "Ralph Edwards",
      gender: "M",
      email: "debbie.baker@example.com",
      conditions: ["Hypertension"],
      nextAppointment: "1/28/2024",
      joinedDate: "8/15/2022",
    },
    {
      patientID: "PT2023-A103",
      patientName: "Ralph Edwards",
      gender: "M",
      email: "debbie.baker@example.com",
      conditions: ["Hypertension"],
      nextAppointment: "1/28/2024",
      joinedDate: "8/15/2022",
    },
    {
      patientID: "PT2023-A103",
      patientName: "Ralph Edwards",
      gender: "M",
      email: "debbie.baker@example.com",
      conditions: ["Hypertension"],
      nextAppointment: "1/28/2024",
      joinedDate: "8/15/2022",
    },
    {
      patientID: "PT2023-A103",
      patientName: "Ralph Edwards",
      gender: "M",
      email: "debbie.baker@example.com",
      conditions: ["Hypertension", "Hypertension"],
      nextAppointment: "1/28/2024",
      joinedDate: "8/15/2022",
    },
  ];
}

const Page = async () => {
  const data = await getData();

  return (
    <>
      <DefaultLayout>
        <div className="container mx-auto">
          <DataTable columns={columns} data={data} />
        </div>
      </DefaultLayout>
    </>
  );
};

export default Page;
