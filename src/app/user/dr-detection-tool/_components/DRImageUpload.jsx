"use client";
import React, { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Modal, message } from "antd";
import { addPatientEye, preProcessImage } from "@/services";
import { Scanner } from "@yudiel/react-qr-scanner";

const DRImageUpload = ({
  handleIsPatient,
  setPatientProcessedEyes,
  getPrediction,
  setPatientEyesResult,
  setIsLoading,
  isLoading,
}) => {
  const [patientId, setPatientId] = useState("");
  const [leftEyeImage, setLeftEyeImage] = useState(null);
  const [rightEyeImage, setRightEyeImage] = useState(null);
  const [isSubmitDisable, setIsSubmitDisable] = useState(true);
  const [isQrModalOpen, setIsQrModalOpen] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [isScanning, setIsScanning] = useState(false);

  useEffect(() => {
    if (!isQrModalOpen) {
      setIsScanning(false);
    } else {
      setIsScanning(true);
    }
  }, [isQrModalOpen]);

  const handleInputChange = (e) => {
    setPatientId(e.target.value);
  };

  const handleFileChange = (e, eye) => {
    const file = e.target.files[0];
    if (eye === "left") {
      setLeftEyeImage(file);
    } else {
      setRightEyeImage(file);
    }
  };

  const handleQrScan = (data) => {
    if (data && isScanning) {
      const scannedValue = data[0].rawValue;
      console.log("scannedValue", scannedValue);
      setPatientId(scannedValue);
      handleIsPatient(scannedValue);
      setIsScanning(false);
      setIsQrModalOpen(false);
      setIsSubmitDisable(true);
      message.success("QR code scanned successfully");
    }
  };

  const handleQrError = (err) => {
    if (isScanning) {
      console.error(err);
      message.error("Failed to read QR code");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setErrorMessage("");

    if (!patientId || !leftEyeImage || !rightEyeImage) {
      setErrorMessage("Please fill in all fields");
      setIsLoading(false);
      return;
    }

    try {
      const preProcessImageLeft = await preProcessImage(leftEyeImage);
      const preProcessImageRight = await preProcessImage(rightEyeImage);

      const data = await addPatientEye(
        patientId,
        preProcessImageLeft.base64,
        preProcessImageRight.base64
      );

      setPatientProcessedEyes({
        leftEyeImage: preProcessImageLeft.base64,
        rightEyeImage: preProcessImageRight.base64,
      });

      const predictLeft = await getPrediction(preProcessImageLeft.base64);
      const predictRight = await getPrediction(preProcessImageRight.base64);

      console.log(
        "predictLeft",
        predictLeft.predicted_index,
        predictLeft.prediction_scores
      );

      setPatientEyesResult({
        leftEyeImage: predictLeft,
        rightEyeImage: predictRight,
      });

      setErrorMessage("Images uploaded successfully");
      handleIsPatient(patientId);
    } catch (error) {
      console.error("Error uploading images:", error);
      setErrorMessage(error || "Error uploading images");
    } finally {
      setIsLoading(false);
    }
  };

  const handleQrModalOpen = () => {
    setIsQrModalOpen(true);
    setIsScanning(true);
  };

  const handleQrModalClose = () => {
    setIsQrModalOpen(false);
    setIsScanning(false);
  };

  return (
    <div className="flex flex-col gap-9 h-full">
      <div className="h-full rounded-sm border border-stroke bg-white drop-shadow-md">
        <div className="border-b border-stroke px-6 py-4">
          <h3 className="font-semibold text-black">Upload Images</h3>
        </div>
        <form onSubmit={handleSubmit}>
          <div className="p-6">
            <div className="mb-4">
              <label className="mb-3 block text-sm font-medium text-black">
                Patient ID <span className="text-meta-1">*</span>
              </label>
              <div className="flex gap-1">
                <input
                  type="text"
                  onChange={handleInputChange}
                  value={patientId}
                  placeholder="Enter Patient ID"
                  className="w-full rounded border-[1px] border-stroke bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter"
                />
                <Button
                  variant="outline"
                  size="icon"
                  onClick={handleQrModalOpen}
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
                onChange={(e) => handleFileChange(e, "left")}
                className="w-full cursor-pointer file:text-slate-600 rounded border-[1px] border-stroke bg-transparent outline-none transition file:mr-3 file:border-collapse file:cursor-pointer file:border-0 file:border-r file:border-solid file:border-stroke file:bg-slate-100 file:px-5 file:py-3 file:hover:bg-slate-700 file:hover:bg-opacity-10 focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter"
              />
            </div>

            <div className="mb-12">
              <label className="mb-3 block text-sm font-medium text-black">
                Right Eye
              </label>
              <input
                type="file"
                onChange={(e) => handleFileChange(e, "right")}
                className="w-full cursor-pointer file:text-slate-600 rounded border-[1px] border-stroke bg-transparent outline-none transition file:mr-3 file:border-collapse file:cursor-pointer file:border-0 file:border-r file:border-solid file:border-stroke file:bg-slate-100 file:px-5 file:py-3 file:hover:bg-slate-700 file:hover:bg-opacity-10 focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter"
              />
            </div>

            <button
              disabled={isSubmitDisable}
              className={`${
                isSubmitDisable ? "cursor-not-allowed " : ""
              }flex w-full justify-center rounded bg-primary p-3 font-medium text-white hover:opacity-90`}
            >
              {isLoading ? "Uploading..." : "Submit"}
            </button>
            {errorMessage && (
              <p className="mt-4 text-center text-sm text-red-500">
                {errorMessage}
              </p>
            )}
          </div>
        </form>
      </div>
      <Modal
        title="Scan QR Code"
        open={isQrModalOpen}
        onCancel={handleQrModalClose}
        footer={null}
        destroyOnClose={true}
      >
        <div className="p-4 w-[500px] h-[500px]">
          {isQrModalOpen && isScanning && (
            <Scanner
              onScan={(result) => handleQrScan(result)}
              onError={handleQrError}
              scanDelay={300}
              style={{ width: "100%" }}
            />
          )}
        </div>
      </Modal>
    </div>
  );
};

export default DRImageUpload;
