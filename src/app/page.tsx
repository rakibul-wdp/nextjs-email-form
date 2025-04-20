"use client";

import { useState } from "react";
import emailjs from "@emailjs/browser";
import { toast } from "react-toastify";

export default function Home() {
  const [userInput, setUserInput] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [errors, setErrors] = useState({
    name: "",
    email: "",
    message: "",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setUserInput((prev) => ({ ...prev, [name]: value }));
    setErrors((prev) => ({ ...prev, [name]: "" }));
  };

  const validateForm = () => {
    const newErrors = {
      name: userInput.name ? "" : "Name is required",
      email: /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(userInput.email)
        ? ""
        : "Invalid email address",
      message: userInput.message ? "" : "Message is required",
    };
    setErrors(newErrors);
    return !Object.values(newErrors).some((err) => err);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!validateForm()) return;

    const serviceID = process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID;
    const templateID = process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID;
    const userID = process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY;

    try {
      const emailParams = {
        name: userInput.name,
        email: userInput.email,
        message: userInput.message,
      };

      if (!serviceID || !templateID || !userID) {
        throw new Error("Missing EmailJS environment variables.");
      }

      const res = await emailjs.send(
        serviceID,
        templateID,
        emailParams,
        userID
      );

      if (res.status === 200) {
        toast.success("Message sent successfully!");
        setUserInput({
          name: "",
          email: "",
          message: "",
        });
      }
    } catch (error) {
      console.log(error);
      toast.error("Failed to send message. Please try again later.");
    }
  };

  return (
    <div className="min-h-screen flex items-start justify-center px-4">
      <div className="w-full max-w-md bg-white dark:bg-zinc-900 shadow-lg rounded-2xl p-8 space-y-6 border dark:border-zinc-800">
        <h2 className="text-2xl font-semibold text-center text-zinc-900 dark:text-white">
          Contact Us
        </h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block mb-1 text-sm font-medium">Your Name</label>
            <input
              type="text"
              name="name"
              value={userInput.name}
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded-lg bg-zinc-50 dark:bg-zinc-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
            {errors.name && (
              <p className="text-sm text-red-500">{errors.name}</p>
            )}
          </div>
          <div>
            <label className="block mb-1 text-sm font-medium">Your Email</label>
            <input
              type="email"
              name="email"
              value={userInput.email}
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded-lg bg-zinc-50 dark:bg-zinc-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
            {errors.email && (
              <p className="text-sm text-red-500">{errors.email}</p>
            )}
          </div>
          <div>
            <label className="block mb-1 text-sm font-medium">
              Your Message
            </label>
            <textarea
              name="message"
              rows={4}
              value={userInput.message}
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded-lg bg-zinc-50 dark:bg-zinc-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
            {errors.message && (
              <p className="text-sm text-red-500">{errors.message}</p>
            )}
          </div>
          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition cursor-pointer"
          >
            Send Message
          </button>
        </form>
      </div>
    </div>
  );
}
