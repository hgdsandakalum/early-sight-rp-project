"use client";
import React, { useState } from "react";
import Image from "next/image";

const UserCard = () => {
  return (
    <div className="col-span-12 rounded-sm border border-stroke bg-white p-7 drop-shadow-md xl:col-span-4">
      <div className="mb-4 gap-4 sm:flex">
        <div className="w-[48px] h-[48px] overflow-clip flex-none order-none grow-0">
          <img
            src="https://w7.pngwing.com/pngs/340/946/png-transparent-avatar-user-computer-icons-software-developer-avatar-child-face-heroes-thumbnail.png"
            className=""
          />
        </div>
        <div className="flex flex-col">
          <span className="font-semibold">Savannah Nguyen</span>
          <span className="text-sm text-gray-500">EMP2022002</span>
        </div>
      </div>
      <div className="mt-6 mb-4 gap-12 sm:flex">
        <div className="flex flex-col">
          <span className="font-semibold">Title</span>
          <span className="text-sm text-gray-500">General Practitioner</span>
        </div>
        <div className="flex flex-col">
          <span className="font-semibold">Age</span>
          <span className="text-sm text-gray-500">23</span>
        </div>
      </div>
      <div className="flex flex-col mt-6">
        <span className="font-semibold">Main Hospital</span>
        <span className="text-sm text-gray-500">Harlem Hospital Center</span>
      </div>
      <div className="flex flex-col mt-6">
        <span className="font-semibold">Joined Date</span>
        <span className="text-sm text-gray-500">August 2, 2013</span>
      </div>
      <div className="flex flex-col mt-6">
        <span className="font-semibold">Barcode</span>
        <img
          src="https://www.pngmart.com/files/10/Barcode-PNG-Pic.png"
          className="w-[90%]"
        />
      </div>
    </div>
  );
};

export default UserCard;
