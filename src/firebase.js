// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getMessaging, getToken } from "firebase/messaging";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAMCmuHuKyvd5hM2m6XqlbBtAV8H0wy6fo",
  authDomain: "retina-notify.firebaseapp.com",
  projectId: "retina-notify",
  storageBucket: "retina-notify.appspot.com",
  messagingSenderId: "644292050675",
  appId: "1:644292050675:web:5597550ebe91703ad94186",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const messaging = getMessaging(app);
// BKMXYJz8mTaN9KDHHKsD2JL-4A_LtmrjJ28VFk0lmi5pQNygTKYL_8SHn86aC_neDU-_6JEzmKk0U_OxaF9jC4g

export const generateToken = async () => {
  console.log("hey")
  const permission = await Notification.requestPermission();

  if (permission === "granted") {
    const token = await getToken(messaging, {
      vapidKey:
        "BKMXYJz8mTaN9KDHHKsD2JL-4A_LtmrjJ28VFk0lmi5pQNygTKYL_8SHn86aC_neDU-_6JEzmKk0U_OxaF9jC4g",
    });

    const userid = await localStorage.getItem("userId");

    const payload = {
        fcmToken: token
    }

    console.log("token ", token)
    const response = await fetch(
      "https://retina-mobile-app-bankend.vercel.app/api/v1/save-fcm/" + userid,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      }
    );

    console.log(response)
  }
};

