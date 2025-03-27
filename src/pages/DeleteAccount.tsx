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

  interface FormData {
    name?: string; // Optional field
    mobileNumber: string; // Required field
  }

  const onSubmit = async (data: FormData): Promise<void> => {
    try {
      await axios.delete(
        "https://freshsabziapi.onrender.com/api/users/delete",
        {
          headers: {
            "Content-Type": "application/json",
            "Access-Control-Allow-Origin": "*",
          },
          data: data,
        }
      );

      setMessage("Your account deletion request has been received.");
      reset();
    } catch (error) {
      setMessage("Failed to submit request. Please try again.");
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
          <label>Name:</label>
          <input
            type="text"
            placeholder="Enter your name"
            {...register("name")} // No validation (optional)
          />

          <label>Phone Number:</label>
          <input
            type="tel"
            placeholder="Enter your phone number"
            {...register("mobileNumber", {
              required: "Phone number is required",
            })}
          />
          {errors.mobileNumber && (
            <p style={{ color: "red" }} className="error-message">
              {errors.mobileNumber.message}
            </p>
          )}

          <button type="submit">Submit Request</button>
        </form>
      </div>
    </div>
  );
}
