import React, { createContext, useContext } from "react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "../styles/toastify.css"; 


// Create a context
const ToastContext = createContext();

// Custom hook to use Toast context
export const useToast = () => useContext(ToastContext);

// ToastProvider to wrap your app and manage toasts globally
export const ToastProvider = ({ children }) => {
  // Show a toast message
  const showToast = (message, type = "info") => {
    const toastOptions = {
      position: "top-center",
      hideProgressBar: false,
      closeButton: false,
      closeOnClick: false,
      pauseOnHover: true,
      draggable: true,
      theme: "colored",
    };

    // Clear existing toasts before showing a new one
    toast.dismiss();

    switch (type) {
      case "success":
        toast.success(message, { ...toastOptions, autoClose: 1500 });
        break;
      case "error":
        toast.error(message, { ...toastOptions, autoClose: 4000 });
        break;
      default:
        toast(message, { ...toastOptions, autoClose: 4000 });
        break;
    }
  };

  // Hide all toasts
  const hideToast = () => {
    toast.dismiss(); // Dismiss all active toasts
  };

  return (
    <ToastContext.Provider value={{ showToast, hideToast }}>
      {children}
    </ToastContext.Provider>
  );
};
