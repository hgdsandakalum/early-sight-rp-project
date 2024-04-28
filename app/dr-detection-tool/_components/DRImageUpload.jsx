"use client";
import React, { useState } from "react";
import { Button } from "@/components/ui/button";

const DRImageUpload = ({ handleIsPatient }) => {
  return (
    <div className="flex flex-col gap-9 h-full">
      <div className="h-full rounded-sm border border-stroke bg-white drop-shadow-md">
        <div className="border-b border-stroke px-6 py-4">
          <h3 className="font-semibold text-black">Upload Images</h3>
        </div>
        <form action="#">
          <div className="p-6">
            <div className="mb-4">
              <label className="mb-3 block text-sm font-medium text-black">
                Patient ID <span className="text-meta-1">*</span>
              </label>
              <div className="flex gap-1">
                <input
                  type="text"
                  placeholder="Enter Patient ID"
                  className="w-full rounded border-[1px] border-stroke bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter"
                />
                <Button
                  variant="outline"
                  size="icon"
                  onClick={(e) => handleIsPatient(e)}
                  className="h-auto w-12 bg-primary p-3 hover:bg-slate-700"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="#ffffff"
                    className="w-6 h-6"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="m15.75 15.75-2.489-2.489m0 0a3.375 3.375 0 1 0-4.773-4.773 3.375 3.375 0 0 0 4.774 4.774ZM21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
                    />
                  </svg>
                </Button>
              </div>
            </div>

            <div className="mb-4">
              <label className="mb-3 block text-sm font-medium text-black">
                Left Eye
              </label>
              <input
                type="file"
                className="w-full cursor-pointer file:text-slate-600 rounded border-[1px] border-stroke bg-transparent outline-none transition file:mr-3 file:border-collapse file:cursor-pointer file:border-0 file:border-r file:border-solid file:border-stroke file:bg-slate-100 file:px-5 file:py-3 file:hover:bg-slate-700 file:hover:bg-opacity-10 focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter"
              />
            </div>

            <div className="mb-12">
              <label className="mb-3 block text-sm font-medium text-black">
                Right Eye
              </label>
              <input
                type="file"
                className="w-full cursor-pointer file:text-slate-600 rounded border-[1px] border-stroke bg-transparent outline-none transition file:mr-3 file:border-collapse file:cursor-pointer file:border-0 file:border-r file:border-solid file:border-stroke file:bg-slate-100 file:px-5 file:py-3 file:hover:bg-slate-700 file:hover:bg-opacity-10 focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter"
              />
            </div>

            <button className="flex w-full justify-center rounded bg-primary p-3 font-medium text-white hover:opacity-90">
              Submit
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default DRImageUpload;
