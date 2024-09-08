import axios from "axios";
import React, { useEffect, useState } from "react";
import EyeComparisonChart from "@/components/EyeComparisonChart/EyeComparisonChart"
import NearEyeComparisonChart from "@/components/NearEyeComparisonChart/NearEyeComparisonChart"
import {columns} from "@/components/DetailedEyeResultTable/columns"
import DetailedEyeResultTable from "@/components/DetailedEyeResultTable/DetailedEyeResultTable"
const PatientOverview = () => {
  const [user, setUser] = useState({
    name: "ssss",
    username: "",
    email: "",
    age: "",
    gender: "",
    phone: "",
    eye_deciease: "",
    location: "",
    occupation: "",
  });

  const fetchUserDetails = async () => {
    const urlParts = window.location.href.split("/");
    const id = urlParts[urlParts.length - 2];

    const userData = await axios.get(
      "http://192.168.8.138:3005/api/v1/auth/find-by-id/" + id
    );

    function calculateAge(dob) {
      const birthDate = new Date(dob);
      const today = new Date();

      let age = today.getFullYear() - birthDate.getFullYear();
      const monthDifference = today.getMonth() - birthDate.getMonth();
      if (
        monthDifference < 0 ||
        (monthDifference === 0 && today.getDate() < birthDate.getDate())
      ) {
        age--;
      }

      return age;
    }
    if (userData.status === 200) {
      setUser({
        ...userData.data.data,
        age: calculateAge(userData.data.data.date_of_birth),
      });
    }
  };

  useEffect(() => {
    fetchUserDetails();
  }, []);
  return (
    <div className=" mt-10">
      <div className=" shadow-2xl px-10 py-10 rounded-lg">
        <div className=" flex flex-row gap-5 ">
          <div className=" w-24 h-24 bg-blue-100 rounded-full flex items-center justify-center">
            <span className=" text-2xl font-bold">LS</span>
          </div>

          <div className=" flex flex-row justify-between gap-40">
            <div className=" flex flex-col">
              <span className=" text-base font-semibold text-zinc-500">
                Name: <span className=" text-black ml-4">{user.name}</span>
              </span>
              <span className=" text-base font-semibold  text-zinc-500">
                Email: <span className=" text-black ml-4">{user.email}</span>
              </span>
              <span className=" text-base font-semibold  text-zinc-500">
                Age:{" "}
                <span className=" text-black ml-4">{user.age} years old</span>
              </span>
              <span className=" text-base font-semibold  text-zinc-500">
                Occupation:{" "}
                <span className=" text-black ml-4">{user.occupation}</span>
              </span>
            </div>

            <div className=" flex flex-col">
              <span className=" text-base font-semibold text-zinc-500">
                Eye Deciease:{" "}
                <span className=" text-black ml-4">{user.eye_deciease}</span>
              </span>
              <span className=" text-base font-semibold  text-zinc-500">
                Phone: <span className=" text-black ml-4">{user.phone}</span>
              </span>
              <span className=" text-base font-semibold  text-zinc-500">
                Location:{" "}
                <span className=" text-black ml-4">{user.location}</span>
              </span>
              <span className=" text-base font-semibold  text-zinc-500">
                Gender: <span className=" text-black ml-4">{user.gender}</span>
              </span>
            </div>
          </div>
        </div>
      </div>

      <div>
        <EyeComparisonChart />
        <NearEyeComparisonChart />
        <DetailedEyeResultTable columns={columns}/>
      </div>
    </div>
  );
};

export default PatientOverview;
