import React from "react";
import AppointmentTable from "./_components/appointmentTable";
import { columns } from "./_components/columns";

const page = () => {
  return (
    <>
      <div className="container mx-auto">
        <AppointmentTable columns={columns} />
      </div>
    </>
  );
};

export default page;
