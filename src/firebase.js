// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getMessaging, getToken, isSupported } from "firebase/messaging";

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

export const initializeMessaging = async () => {
  // Check if messaging is supported

  console.log("hey")
  if (typeof window !== "undefined" && (await isSupported())) {
    return getMessaging(app);
  }
  return null;
};

// export const messaging =getMessaging(app)
export const generateToken = async () => {
  if (typeof window === "undefined") {
    // Prevent execution on the server side
    return;
  }

  const permission = await Notification.requestPermission();

  const messaging = await initializeMessaging()

  console.log("messaging ", messaging)
  if (permission === "granted" && messaging ) {
    try {
      const token = await getToken(messaging, {
        vapidKey: "BKMXYJz8mTaN9KDHHKsD2JL-4A_LtmrjJ28VFk0lmi5pQNygTKYL_8SHn86aC_neDU-_6JEzmKk0U_OxaF9jC4g",
      });

      console.log("token ", token)
      if (token) {
        const userId = localStorage.getItem("userId");
        if (userId) {
          const payload = { fcmToken: token };

          const response = await fetch(
            `https://retina-mobile-app-bankend.vercel.app/api/v1/save-fcm/${userId}`,
            {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify(payload),
            }
          );

          console.log("FCM token sent to server:", response);
        } else {
          console.warn("User ID not found in localStorage.");
        }
      } else {
        console.warn("No FCM token received.");
      }
    } catch (error) {
      console.error("Error getting FCM token:", error);
    }
  } else {
    console.warn("Notification permissions not granted.");
  }
};