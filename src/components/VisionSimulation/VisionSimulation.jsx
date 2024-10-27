import React, { useMemo } from "react";
import leftEyeView from "../../assets/img/leftView.png";
import rightEyeView from "../../assets/img/rightView.png";
import Image from "next/image";

const VisionSimulation = ({ averageTestResults, eye }) => {
    console.log(averageTestResults)
    const getBlurAmountForLogmar = (logmarValue) => {
      if (logmarValue >= -0.1 && logmarValue <= 0.3) return 0;
      if (logmarValue > 0.3 && logmarValue <= 0.4) return 0;
      if (logmarValue > 0.4 && logmarValue <= 1.1) return 3;
      if (logmarValue > 1.1 && logmarValue <= 1.4) return 8;
      if (logmarValue > 1.4 && logmarValue <= 2.0) return 13;
      if (logmarValue > 2.0) return 23;
      return 0;
    };
  
    const blurAmount = useMemo(
      () => getBlurAmountForLogmar(averageTestResults),
      [averageTestResults]
    );
  
    return (
      <div style={{ display: "flex", flexDirection: "column", alignItems: "center", marginTop: 40 }}>
        <div style={{ textAlign: "center", marginBottom: 20 }}>
          <h2 style={{ fontSize: "1.25rem", fontWeight: "bold" }}>Vision Simulation of the User - {eye}</h2>
          <p>Sample vision simulation based on user’s eye test results</p>
        </div>
  
        <div style={{ display: "flex", justifyContent: "space-around", width: "100%", maxWidth: 800 }}>
          {/* Normal View */}
          <div style={{ position: "relative", width: "45%" }}>
            <Image
              src={leftEyeView}
              alt="Normal View"
              width={400}
              height={300}
              style={{ width: "100%", height: "auto", objectFit: "cover" }}
            />
            <p style={{
              position: "absolute",
              bottom: 10,
              left: "50%",
              transform: "translateX(-50%)",
              color: "red",
              fontWeight: "bold",
              fontSize: "1.2em"
            }}>Normal View</p>
          </div>
  
          {/* Blurred View */}
          <div style={{
            position: "relative",
            width: "45%",
            filter: `blur(${blurAmount}px)`
          }}>
            <Image
              src={rightEyeView}
              alt="Blurred View"
              width={400}
              height={300}
              style={{ width: "100%", height: "auto", objectFit: "cover" }}
            />
            <p style={{
              position: "absolute",
              bottom: 10,
              left: "50%",
              transform: "translateX(-50%)",
              color: "red",
              fontWeight: "bold",
              fontSize: "1.2em"
            }}>Your View</p>
          </div>
        </div>
      </div>
    );
  };

export default VisionSimulation;
