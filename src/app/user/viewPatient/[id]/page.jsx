import React from "react";
import PatientOverview from "@/components/PatientOverview/PatientOverview";

export async function generateStaticParams() {
  try {
    const response = await fetch(
      "https://retina-mobile-app-bankend.vercel.app/api/v1/patients"
    );

    if (!response.ok) {
      throw new Error("Failed to fetch patient IDs");
    }

    const data = await response.json();

    const patientIds = data.map((patient) => ({
      id: patient._id.toString(),
    }));
    console.log("patientIds ", patientIds);
    return patientIds;
  } catch (error) {
    console.error("Error fetching patient data:", error);
    return [];
  }
}

const PatientViewPage = () => {
  return (
    <div className="container mx-auto py-6">
      <PatientOverview />
    </div>
  );
};

export default PatientViewPage;
