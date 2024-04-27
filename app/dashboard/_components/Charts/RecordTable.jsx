import React, { useState } from "react";
import Image from "next/image";

const brandData = [
  {
    id: "001",
    name: "Ramesh Kuma",
    doctor: "Dr.Jacob Ryan",
    date: "12 Jan 2022",
    diseases: "Fever",
  },
  {
    id: "002",
    name: "Ramesh Kuma",
    doctor: "Dr.Jacob Ryan",
    date: "12 Jan 2022",
    diseases: "Cholera",
  },
  {
    id: "003",
    name: "Ramesh Kuma",
    doctor: "Dr.Jacob Ryan",
    date: "12 Jan 2022",
    diseases: "Fever",
  },
  {
    id: "004",
    name: "Ramesh Kuma",
    doctor: "Dr.Jacob Ryan",
    date: "12 Jan 2022",
    diseases: "Cholera",
  },
  {
    id: "005",
    name: "Ramesh Kuma",
    doctor: "Dr.Jacob Ryan",
    date: "12 Jan 2022",
    diseases: "Fever",
  },
];

const RecordTable = () => {
  return (
    <div className="rounded-sm border border-stroke bg-white px-5 pb-2 pt-6 drop-shadow-md sm:px-7 xl:pb-1">
      <h4 className="mb-6 text-l sm:text-xl font-semibold text-black">
        Recent Records
      </h4>

      <div className="flex flex-col">
        <div className="grid grid-cols-3 rounded-sm bg-gray-2 sm:grid-cols-5">
          <div className="hidden sm:block p-2 xl:p-5">
            <h5 className="text-sm font-bold uppercase xsm:text-base">#</h5>
          </div>
          <div className="p-2 text-center xl:p-5">
            <h5 className="text-xs sm:text-sm font-bold uppercase">
              Patient Name
            </h5>
          </div>
          <div className="p-2 text-center xl:p-5">
            <h5 className="text-xs sm:text-sm font-bold uppercase xsm:text-base">
              Assigned Doctor
            </h5>
          </div>
          <div className="hidden p-2 text-center sm:block xl:p-5">
            <h5 className="text-sm font-bold uppercase xsm:text-base">Date</h5>
          </div>
          <div className="p-2 text-center xl:p-5">
            <h5 className="text-xs sm:text-sm font-bold uppercase xsm:text-base">
              Diseases
            </h5>
          </div>
        </div>

        {brandData.map((brand, key) => (
          <div
            className={`grid grid-cols-3 sm:grid-cols-5 ${
              key === brandData.length - 1 ? "" : "border-b border-stroke "
            }`}
            key={key}
          >
            <div className="hidden sm:flex items-center p-2 xl:p-5">
              <p className="text-black">{brand.id}</p>
            </div>

            <div className="flex items-center justify-center p-2 xl:p-5">
              <p className="text-black text-xs sm:text-sm">{brand.name}</p>
            </div>

            <div className="flex items-center justify-center p-2 xl:p-5">
              <p className="text-meta-3 text-xs sm:text-sm">{brand.doctor}</p>
            </div>

            <div className="hidden items-center justify-center p-2 sm:flex xl:p-5">
              <p className="text-black">{brand.date}</p>
            </div>

            <div className=" items-center justify-center p-2 xl:p-5">
              <p className="text-white bg-slate-700 w-full text-center py-1 rounded-sm text-xs sm:text-sm">
                {brand.diseases}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RecordTable;
