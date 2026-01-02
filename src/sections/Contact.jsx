import { useState } from "react";
import { motion } from "framer-motion";
import emailjs from "@emailjs/browser";
import ParticlesBackground from "../components/ParticlesBackground";
import Astra from "../assets/Astra.png";

const SERVICE_ID = import.meta.env.VITE_SERVICE_ID;
const TEMPLATE_ID = import.meta.env.VITE_TEMPLATE_ID;
const PUBLIC_KEY = import.meta.env.VITE_PUBLIC_KEY;

export default function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    service: "",
    budget: "",
    idea: "",
  });

  const [errors, setErrors] = useState({});
  const [status, setStatus] = useState("");

  /* ---------------- HANDLE CHANGE ---------------- */
  const handleChange = (e) => {
    const { name, value } = e.target;

    // numbers only for budget
    if (name === "budget" && !/^\d*$/.test(value)) return;

    setFormData((prev) => ({ ...prev, [name]: value }));

    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  /* ---------------- VALIDATION ---------------- */
  const validateForm = () => {
    const required = ["name", "email", "service", "budget", "idea"];
    let newErrors = {};

    required.forEach((field) => {
      if (!formData[field].trim()) {
        newErrors[field] = "This field is required";
      }
    });

    setErrors(newErrors);
    return Object.keys(newErrors).length;
  };

  /* ---------------- SUBMIT ---------------- */
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (validateForm()) return;

    setStatus("sending");

    try {
      await emailjs.send(
        SERVICE_ID,
        TEMPLATE_ID,
        {
          ...formData,
          from_name: formData.name,
          reply_to: formData.email,
        },
        PUBLIC_KEY
      );

      setStatus("success");
      setFormData({
        name: "",
        email: "",
        service: "",
        budget: "",
        idea: "",
      });
    } catch (err) {
      console.error("EmailJS Error:", err);
      setStatus("error");
    }
  };

  return (
    <section
      id="contact"
      className="w-full min-h-screen relative bg-black overflow-hidden text-white py-24"
    >
      <ParticlesBackground />

      <div className="relative z-10 max-w-6xl mx-auto px-6 flex flex-col md:flex-row items-center gap-12">
        {/* LEFT IMAGE */}
        <motion.div
          className="w-full md:w-1/2 flex justify-center"
          initial={{ opacity: 0, x: -60 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
        >
          <motion.img
            src={Astra}
            alt="Contact"
            className="w-72 md:w-[400px] rounded-3xl shadow-2xl object-cover"
            animate={{ y: [0, -12, 0] }}
            transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
          />
        </motion.div>

        {/* RIGHT FORM */}
        <motion.div
          className="w-full md:w-1/2 bg-white/10 backdrop-blur-xl p-8 rounded-3xl shadow-xl border border-white/20"
          initial={{ opacity: 0, x: 60 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-4xl font-bold mb-8 text-center">
            Let’s Work Together
          </h2>

          <form className="flex flex-col gap-5" onSubmit={handleSubmit}>
            {/* NAME */}
            <div className="flex flex-col">
              <label className="mb-1 text-sm opacity-80">
                Your Name <span className="text-red-500">*</span>
              </label>
              <input
                required
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className={`p-3 rounded-xl bg-black/40 border ${
                  errors.name ? "border-red-500" : "border-white/20"
                } focus:border-blue-500 focus:ring-2 focus:ring-blue-500/40 outline-none transition`}
              />
              {errors.name && (
                <p className="text-red-500 text-xs mt-1">{errors.name}</p>
              )}
            </div>

            {/* EMAIL */}
            <div className="flex flex-col">
              <label className="mb-1 text-sm opacity-80">
                Your Email <span className="text-red-500">*</span>
              </label>
              <input
                required
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className={`p-3 rounded-xl bg-black/40 border ${
                  errors.email ? "border-red-500" : "border-white/20"
                } focus:border-blue-500 focus:ring-2 focus:ring-blue-500/40 outline-none transition`}
              />
              {errors.email && (
                <p className="text-red-500 text-xs mt-1">{errors.email}</p>
              )}
            </div>

            {/* SERVICE NEEDED (SELECT) */}
            <div className="flex flex-col">
              <label className="mb-1 text-sm opacity-80">
                Service Needed <span className="text-red-500">*</span>
              </label>
              <select
                required
                name="service"
                value={formData.service}
                onChange={handleChange}
                className={`p-3 rounded-xl bg-black/40 border ${
                  errors.service ? "border-red-500" : "border-white/20"
                } text-white focus:border-blue-500 focus:ring-2 focus:ring-blue-500/40 outline-none transition`}
              >
                <option value="" disabled>
                  Something in mind?
                </option>
                <option value="Web Development">Web Development</option>
                <option value="Mobile Application">Mobile Application</option>
                <option value="UI/UX Design">UI / UX Design</option>
                <option value="MERN Stack">MERN Stack</option>
                <option value="Other">Other</option>
              </select>
              {errors.service && (
                <p className="text-red-500 text-xs mt-1">{errors.service}</p>
              )}
            </div>

            {/* BUDGET */}
            <div className="flex flex-col">
              <label className="mb-1 text-sm opacity-80">
                Budget <span className="text-red-500">*</span>
              </label>
              <input
                required
                type="text"
                name="budget"
                value={formData.budget}
                onChange={handleChange}
                className={`p-3 rounded-xl bg-black/40 border ${
                  errors.budget ? "border-red-500" : "border-white/20"
                } focus:border-blue-500 focus:ring-2 focus:ring-blue-500/40 outline-none transition`}
              />
              {errors.budget && (
                <p className="text-red-500 text-xs mt-1">{errors.budget}</p>
              )}
            </div>

            {/* IDEA */}
            <div className="flex flex-col">
              <label className="mb-1 text-sm opacity-80">
                Project Idea <span className="text-red-500">*</span>
              </label>
              <textarea
                required
                rows="4"
                name="idea"
                value={formData.idea}
                onChange={handleChange}
                className={`p-3 rounded-xl bg-black/40 border ${
                  errors.idea ? "border-red-500" : "border-white/20"
                } focus:border-blue-500 focus:ring-2 focus:ring-blue-500/40 outline-none transition`}
              />
              {errors.idea && (
                <p className="text-red-500 text-xs mt-1">{errors.idea}</p>
              )}
            </div>

            {/* BUTTON */}
            <button
              type="submit"
              disabled={status === "sending"}
              className="mt-4 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 transition py-3 rounded-xl font-semibold shadow-lg disabled:opacity-60"
            >
              {status === "sending" ? "Sending..." : "Send Message"}
            </button>

            {status === "success" && (
              <p className="text-green-400 text-sm text-center mt-3">
                Message sent successfully ✅
              </p>
            )}
            {status === "error" && (
              <p className="text-red-500 text-sm text-center mt-3">
                Failed to send message ❌
              </p>
            )}
          </form>
        </motion.div>
      </div>
    </section>
  );
}
