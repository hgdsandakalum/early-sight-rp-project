"use client";
import React, { useState } from "react";
import QRCode from "react-qr-code";

const PatientCard = ({ patient }) => {
  return (
    <div className="col-span-12 rounded-sm border border-stroke bg-white p-7 drop-shadow-md xl:col-span-4">
      <div className="mb-4 gap-4 sm:flex">
        <div className="flex flex-col">
          <span className="font-semibold">
            {patient.firstName} {patient.lastName}
          </span>
          <span className="text-sm text-gray-500">{patient.id}</span>
        </div>
      </div>
      <div className="mt-6 mb-4 gap-12 sm:flex">
        <div className="flex flex-col">
          <span className="font-semibold ">Mobile Number</span>
          <span className="text-sm text-gray-500">{patient.mobile}</span>
        </div>
        <div className="flex flex-col">
          <span className="font-semibold">Age</span>
          <span className="text-sm text-gray-500">{patient.age}</span>
        </div>
      </div>
      <div className="flex flex-col mt-6">
        <span className="font-semibold">Email</span>
        <span className="text-sm text-gray-500">{patient.email}</span>
      </div>
      <div className="flex flex-col mt-6">
        <span className="font-semibold">Joined Date</span>
        <span className="text-sm text-gray-500">{patient.joinedDate}</span>
      </div>
      <div className="flex flex-col mt-6">
        <span className="font-semibold">QRCode</span>
        <div className="max-h-20">
          <QRCode
            size={32}
            style={{ height: "80px", maxWidth: "100%", width: "100%" }}
            value={patient?.id}
            viewBox={`0 0 256 256`}
          />
        </div>
      </div>
    </div>
  );
};

export default PatientCard;
