import { useForm } from "react-hook-form";
import { useState } from "react";
import axios from "axios";
import "./DeleteAccount.css";

export default function DeleteAccount() {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormData>();
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false); // Loading state to track progress

  interface FormData {
    name?: string; // Optional field
    mobileNumber: string; // Required field
    password: string; // Required field for password (4-digit PIN)
  }

  const onSubmit = async (data: FormData): Promise<void> => {
    setLoading(true); // Set loading to true when the request starts
    try {
      // Send mobile number and password (PIN) to the delete user endpoint
      const response = await axios.post(
        "https://freshsabziapi.onrender.com/api/users/delete", // Updated to POST to match your backend expectations
        {
          mobileNumber: data.mobileNumber,
          password: data.password, // Include the password for validation
        },
        {
          headers: {
            "Content-Type": "application/json",
            "Access-Control-Allow-Origin": "*",
          },
        }
      );

      // Show success message on successful deletion
      if (response.status === 200) {
        setMessage("Your account deletion request has been received.");
        reset();
      } else {
        setMessage("Failed to submit request. Please try again.");
      }
    } catch (error) {
      console.error("Error submitting deletion request:", error);
      setMessage("Failed to submit request. Please try again.");
    } finally {
      setLoading(false); // Set loading to false after the request finishes
    }
  };

  return (
    <div className="delete-account-container">
      <div className="delete-account-box">
        <h1>Delete Account – FreshDrop</h1>
        <p>
          To delete your FreshDrop account, please fill out the form below or
          email us at{" "}
          <a href="mailto:advikelectrotech@gmail.com">
            advikelectrotech@gmail.com
          </a>
          .
        </p>

        {message && <div className="message">{message}</div>}

        <form onSubmit={handleSubmit(onSubmit)} className="delete-account-form">
          {/* Mobile Number */}
          <label>Mobile Number:</label>
          <input
            type="tel"
            placeholder="Enter your mobile number"
            {...register("mobileNumber", {
              required: "Mobile number is required",
              pattern: {
                value: /^[0-9]{10}$/, // Regex to ensure exactly 10 digits
                message: "Mobile number must be exactly 10 digits",
              },
            })}
          />
          {errors.mobileNumber && (
            <p style={{ color: "red" }} className="error-message">
              {errors.mobileNumber.message}
            </p>
          )}

          {/* PIN */}
          <label>Enter 4 digit-PIN:</label>
          <input
            type="password"
            maxLength={4}
            minLength={4}
            placeholder="Enter your 4 digit-PIN"
            {...register("password", {
              required: "PIN is required",
              pattern: {
                value: /^[0-9]{4}$/, // Regex to ensure only 4 digits
                message: "PIN must be exactly 4 digits", // Custom error message
              },
            })}
          />
          {errors.password && (
            <p style={{ color: "red" }} className="error-message">
              {errors.password.message}
            </p>
          )}

          {/* Submit Button */}
          <button type="submit" disabled={loading}>
            {loading ? "Deleting..." : "Submit Request"}
          </button>

          {/* Loading Spinner */}
          {loading && <div className="loading-spinner">Deleting...</div>}
        </form>
      </div>
    </div>
  );
}
