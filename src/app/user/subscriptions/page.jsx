import React from "react";
import SubscriptionsTable from "./_components/subscriptionsTable";
import { columns } from "./_components/columns";

const page = async () => {
  return (
    <>
      <div className="container mx-auto">
        <SubscriptionsTable columns={columns} />
      </div>
    </>
  );
};

export default page;
