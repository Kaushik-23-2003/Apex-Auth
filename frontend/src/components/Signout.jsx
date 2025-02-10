// SignOut.js
import { useState } from 'react';
import { useToast } from '../contexts/ToastContext'; 
import { persistor } from '../redux/store'; 
import { useNavigate } from 'react-router-dom';

export const useSignOut = () => {
  const { showToast } = useToast(); 
  const navigate = useNavigate(); 
  const [isLoggingOut, setIsLoggingOut] = useState(false);

  // Handle user sign out
  const handleSignOut = async () => {
    setIsLoggingOut(true);

    try {
      const response = await fetch("http://localhost:3000/api/auth/signout", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include", // For sending cookies
      });

      const data = await response.json();

      if (response.ok) {
        showToast("Successfully logged out.", "success");
        localStorage.removeItem("token");
        persistor.purge(); // Clear persisted state
        window.location.reload(); // Optional: Reload the window to reset state
        navigate("/signin"); // Redirect to login page or homepage
      } else {
        showToast("Error logging out", "error");
        console.log(data.message);
      }
    } catch (error) {
      showToast("Error logging out", "error");
      console.log(error.message);
    } finally {
      setIsLoggingOut(false); 
    }
  };

  return { handleSignOut, isLoggingOut };
};

export default useSignOut;
