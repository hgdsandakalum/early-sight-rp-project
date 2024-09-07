import { BACKEND_BASE_URL2 } from "@/config";
import { httpGet, httpPost } from "./http.service";
import { Patient } from "../../types";

const URL = `${BACKEND_BASE_URL2}/api`;

const addPatient = async (patient: Patient) => {
  try {
    const response = await httpPost(`${URL}/patient`, {
      firstName: patient.firstName,
      lastName: patient.lastName,
      gender: patient.gender,
      email: patient.email,
      age: patient.age,
      mobile: patient.mobile,
      conditions: patient.conditions,
    });
    const data = response?.data;
    return data;
  } catch (error: any) {
    throw error?.data?.error;
  }
};

const getAllPatient = async () => {
  try {
    const response = await httpGet(`${URL}/patient`);
    const data = response?.data;
    return data;
  } catch (error: any) {
    throw error?.data?.error;
  }
};

const getPatientByID = async (id: string) => {
  try {
    const response = await httpGet(`${URL}/patient/${id}`);
    const data = response?.data;
    return data;
  } catch (error: any) {
    throw error?.data?.error;
  }
};

const getPatientEyes = async (id: string) => {
  try {
    const response = await httpGet(`${URL}/patientEye/${id}`);
    const data = response?.data;
    return data;
  } catch (error: any) {
    throw error?.data?.error;
  }
};

const addPatientEye = async (formData: FormData) => {
  try {
    const response = await httpPost(`${URL}/patientEye/upload`, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    const data = response?.data;
    return data;
  } catch (error: any) {
    throw error?.data?.error;
  }
};

const classifyDR = async (id: string, leftEye: string, rightEye: string) => {
  try {
    const response = await httpPost(`${URL}/patient`, {
      // firstName: patient.firstName,
      // lastName: patient.lastName,
      // gender: patient.gender,
      // email: patient.email,
      // age: patient.age,
      // mobile: patient.mobile,
      // conditions: patient.conditions,
    });
    const data = response?.data;
    return data;
  } catch (error: any) {
    throw error?.data?.error;
  }
};

export {
  getAllPatient,
  addPatient,
  getPatientByID,
  getPatientEyes,
  addPatientEye,
  classifyDR,
};
