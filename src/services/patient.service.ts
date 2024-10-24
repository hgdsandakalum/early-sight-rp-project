import { BACKEND_BASE_URL2 } from "@/config";
import { httpDelete, httpGet, httpPost, httpPut } from "./http.service";
import { Patient } from "../../types";

const URL = `${BACKEND_BASE_URL2}/api`;
const URL2 = `https://51.21.134.226/preprocess`;
const URL3 = `http://localhost:5002/predict`;

const addPatient = async (patient: Patient) => {
  try {
    const response = await httpPost(`${URL}/patient`, {
      firstName: patient.firstName,
      lastName: patient.lastName,
      gender: patient.gender,
      email: patient.email,
      age: patient.age,
      address: patient.address,
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

const updatePatient = async (id: string, patient: Patient) => {
  try {
    const response = await httpPut(`${URL}/patient/${id}`, {
      firstName: patient.firstName,
      lastName: patient.lastName,
      gender: patient.gender,
      email: patient.email,
      age: patient.age,
      address: patient.address,
      mobile: patient.mobile,
      conditions: patient.conditions,
    });

    const data = response?.data;
    return data;
  } catch (error: any) {
    throw error?.data?.error;
  }
};

const deletePatient = async (id: string) => {
  try {
    const response = await httpDelete(`${URL}/patient/${id}`);
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

const addPatientEye = async (id: string, leftEye: any, rightEye: any) => {
  // const fileToBase64 = (file: File): Promise<string> => {
  //   return new Promise((resolve, reject) => {
  //     const reader = new FileReader();
  //     reader.readAsDataURL(file);
  //     reader.onload = () => resolve(reader.result as string);
  //     reader.onerror = (error) => reject(error);
  //   });
  // };

  try {
    // const leftEyeBase64 = await fileToBase64(leftEye);
    // const rightEyeBase64 = await fileToBase64(rightEye);

    console.log("leftEye", leftEye.split(",")[1]);

    const response = await httpPost(`${URL}/patientEye/upload`, {
      patientId: id,
      leftEyeImage: leftEye.split(",")[1],
      rightEyeImage: rightEye.split(",")[1],
    });

    const data = response?.data;
    return data;
  } catch (error: any) {
    throw error?.data?.error;
  }
};

const preProcessImage = async (image: File) => {
  try {
    const formData = new FormData();
    formData.append("image", image, image.name);

    const response = await httpPost(`${URL2}`, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
      timeout: 30000,
      maxContentLength: 50 * 1024 * 1024,
    });
    const data = response?.data;
    return data;
  } catch (error: any) {
    if (error.code === "ECONNREFUSED") {
      throw new Error("Preprocessing service is not available");
    }
    if (error.response?.status === 413) {
      throw new Error("Image file is too large");
    }
    throw error?.data?.error || error.message || "Error processing image";
  }
};

const classifyImage = async (image: File) => {
  try {
    const formData = new FormData();
    formData.append("image", image, image.name);

    const response = await httpPost(`${URL3}`, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    const data = response?.data;
    const jsonString = data.result.replace(/'/g, '"');
    const parsedObject = JSON.parse(jsonString);
    // console.log("jsonString", jsonString);
    console.log("parsedObject", parsedObject);

    return parsedObject;
  } catch (error: any) {
    throw error?.data?.error;
  }
};

export {
  getAllPatient,
  addPatient,
  getPatientByID,
  updatePatient,
  deletePatient,
  getPatientEyes,
  addPatientEye,
  preProcessImage,
  classifyImage,
};
