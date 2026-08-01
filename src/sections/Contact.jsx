import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import emailjs from "@emailjs/browser";
import ParticlesBackground from "../components/ParticlesBackground.jsx";
import Astra from "../assets/Astra.png";
import { FaPaperPlane, FaCheckCircle, FaExclamationCircle } from "react-icons/fa";

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
  const [status, setStatus] = useState(""); // '', 'sending', 'success', 'error'

  const handleChange = (e) => {
    const { name, value } = e.target;

    // Budget should only accept numbers
    if (name === "budget" && value && !/^\d+$/.test(value)) return;

    setFormData((p) => ({ ...p, [name]: value }));

    // Clear error on change
    if (errors[name]) setErrors((p) => ({ ...p, [name]: "" }));
  };

  const validateForm = () => {
    const required = ["name", "email", "service", "idea"];
    const newErrors = {};

    required.forEach(
      (f) => !formData[f].trim() && (newErrors[f] = "This field is required")
    );

    // If service is selected and it's not 'Other', require budget
    if (formData.service && formData.service !== "Other" && !formData.budget.trim()) {
      newErrors.budget = "Please provide an estimated budget";
    }

    setErrors(newErrors);
    return !Object.keys(newErrors).length;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) return;

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
      setFormData({ name: "", email: "", service: "", budget: "", idea: "" });
      setTimeout(() => setStatus(""), 5000);
    } catch (err) {
      console.error("EmailJS Error:", err);
      setStatus("error");
      setTimeout(() => setStatus(""), 5000);
    }
  };

  return (
    <section
      id="contact"
      className="relative w-full min-h-screen bg-[#050505] text-white py-24 overflow-hidden flex items-center"
    >
      <ParticlesBackground />

      {/* Ambient glowing background elements */}
      <div className="absolute top-1/4 left-0 w-[500px] h-[500px] bg-blue-600/10 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-cyan-600/10 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 lg:px-8 relative z-10 w-full">
        {/* Header Section */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16 md:mb-24"
        >
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 via-blue-500 to-indigo-500 mb-4 tracking-tight">
            Let's Work Together
          </h2>
          <p className="text-gray-400 text-sm md:text-lg max-w-2xl mx-auto">
            Have a project in mind? Let's turn your ideas into reality.
          </p>
        </motion.div>

        <div className="flex flex-col lg:flex-row items-center justify-between gap-12 lg:gap-20">
          {/* Left Side: Avatar/Image */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="w-full lg:w-1/2 flex justify-center lg:justify-end relative"
          >
            {/* Soft glow behind image */}
            <div className="absolute inset-0 bg-gradient-to-tr from-cyan-500/20 to-blue-500/20 blur-3xl rounded-full scale-75 pointer-events-none" />

            <motion.img
              src={Astra}
              alt="Contact Astra"
              className="w-64 sm:w-80 lg:w-[450px] object-contain relative z-10 drop-shadow-[0_0_30px_rgba(6,182,212,0.3)]"
              animate={{ y: [0, -15, 0] }}
              transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
            />
          </motion.div>

          {/* Right Side: Contact Form Card */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
            className="w-full lg:w-1/2 max-w-xl"
          >
            <div className="bg-[#0a0a0a]/80 backdrop-blur-xl p-8 sm:p-10 rounded-3xl border border-white/10 shadow-[0_10px_40px_rgba(0,0,0,0.5)] relative overflow-hidden group">
              {/* Card internal subtle glow on hover */}
              <div className="absolute top-0 right-0 w-64 h-64 bg-cyan-500/5 rounded-full blur-3xl pointer-events-none group-hover:bg-cyan-500/10 transition-colors duration-500" />

              <form className="flex flex-col gap-6 relative z-10" onSubmit={handleSubmit}>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  {/* Name Input */}
                  <div className="flex flex-col gap-1.5">
                    <label className="text-sm font-medium text-gray-300 ml-1">
                      Name <span className="text-cyan-500">*</span>
                    </label>
                    <input
                      type="text"
                      name="name"
                      placeholder="John Doe"
                      value={formData.name}
                      onChange={handleChange}
                      className={`w-full p-3.5 rounded-xl bg-white/5 border ${
                        errors.name
                          ? "border-red-500/50 focus:border-red-500"
                          : "border-white/10 focus:border-cyan-500/50"
                      } text-white placeholder-gray-600 focus:outline-none focus:ring-1 focus:ring-cyan-500/50 transition-all`}
                    />
                    {errors.name && (
                      <p className="text-red-400 text-xs ml-1 mt-0.5">{errors.name}</p>
                    )}
                  </div>

                  {/* Email Input */}
                  <div className="flex flex-col gap-1.5">
                    <label className="text-sm font-medium text-gray-300 ml-1">
                      Email <span className="text-cyan-500">*</span>
                    </label>
                    <input
                      type="email"
                      name="email"
                      placeholder="john@example.com"
                      value={formData.email}
                      onChange={handleChange}
                      className={`w-full p-3.5 rounded-xl bg-white/5 border ${
                        errors.email
                          ? "border-red-500/50 focus:border-red-500"
                          : "border-white/10 focus:border-cyan-500/50"
                      } text-white placeholder-gray-600 focus:outline-none focus:ring-1 focus:ring-cyan-500/50 transition-all`}
                    />
                    {errors.email && (
                      <p className="text-red-400 text-xs ml-1 mt-0.5">{errors.email}</p>
                    )}
                  </div>
                </div>

                {/* Service Needed Select */}
                <div className="flex flex-col gap-1.5">
                  <label className="text-sm font-medium text-gray-300 ml-1">
                    Service Needed <span className="text-cyan-500">*</span>
                  </label>
                  <select
                    name="service"
                    value={formData.service}
                    onChange={handleChange}
                    className={`w-full p-3.5 rounded-xl bg-white/5 border ${
                      errors.service
                        ? "border-red-500/50 focus:border-red-500"
                        : "border-white/10 focus:border-cyan-500/50"
                    } text-white appearance-none focus:outline-none focus:ring-1 focus:ring-cyan-500/50 transition-all cursor-pointer`}
                    style={{
                      backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' stroke='%236b7280'%3E%3Cpath stroke-linecap='round' stroke-linejoin='round' stroke-width='2' d='M19 9l-7 7-7-7'%3E%3C/path%3E%3C/svg%3E")`,
                      backgroundRepeat: "no-repeat",
                      backgroundPosition: "right 1.2rem center",
                      backgroundSize: "1.2em",
                    }}
                  >
                    <option value="" disabled className="bg-[#0a0a0a] text-gray-400">
                      Select a service
                    </option>
                    <option value="Backend Development" className="bg-[#0a0a0a] text-white">
                      Backend Development
                    </option>
                    <option value="Mobile Application" className="bg-[#0a0a0a] text-white">
                      Mobile Application
                    </option>
                    <option value="Other" className="bg-[#0a0a0a] text-white">
                      Other
                    </option>
                  </select>
                  {errors.service && (
                    <p className="text-red-400 text-xs ml-1 mt-0.5">{errors.service}</p>
                  )}
                </div>

                {/* Budget Conditional Input */}
                <AnimatePresence>
                  {formData.service && formData.service !== "Other" && (
                    <motion.div
                      initial={{ opacity: 0, height: 0, marginTop: -24 }}
                      animate={{ opacity: 1, height: "auto", marginTop: 0 }}
                      exit={{ opacity: 0, height: 0, marginTop: -24 }}
                      className="flex flex-col gap-1.5 overflow-hidden"
                    >
                      <label className="text-sm font-medium text-gray-300 ml-1">
                        Estimated Budget (₹) <span className="text-cyan-500">*</span>
                      </label>
                      <input
                        type="text"
                        name="budget"
                        placeholder="e.g. 1000"
                        value={formData.budget}
                        onChange={handleChange}
                        className={`w-full p-3.5 rounded-xl bg-white/5 border ${
                          errors.budget
                            ? "border-red-500/50 focus:border-red-500"
                            : "border-white/10 focus:border-cyan-500/50"
                        } text-white placeholder-gray-600 focus:outline-none focus:ring-1 focus:ring-cyan-500/50 transition-all`}
                      />
                      {errors.budget && (
                        <p className="text-red-400 text-xs ml-1 mt-0.5">{errors.budget}</p>
                      )}
                    </motion.div>
                  )}
                </AnimatePresence>

                {/* Idea/Message Textarea */}
                <div className="flex flex-col gap-1.5">
                  <label className="text-sm font-medium text-gray-300 ml-1">
                    Your Idea / Message <span className="text-cyan-500">*</span>
                  </label>
                  <textarea
                    name="idea"
                    rows={4}
                    placeholder="Tell me about your project..."
                    value={formData.idea}
                    onChange={handleChange}
                    className={`w-full p-3.5 rounded-xl bg-white/5 border ${
                      errors.idea
                        ? "border-red-500/50 focus:border-red-500"
                        : "border-white/10 focus:border-cyan-500/50"
                    } text-white placeholder-gray-600 focus:outline-none focus:ring-1 focus:ring-cyan-500/50 transition-all resize-none`}
                  />
                  {errors.idea && (
                    <p className="text-red-400 text-xs ml-1 mt-0.5">{errors.idea}</p>
                  )}
                </div>

                {/* Submit Button */}
                <div className="pt-2">
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    disabled={status === "sending"}
                    type="submit"
                    className="w-full py-4 rounded-xl font-bold tracking-wide text-white bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-500 hover:to-blue-500 shadow-[0_0_20px_rgba(6,182,212,0.3)] hover:shadow-[0_0_30px_rgba(6,182,212,0.5)] transition-all disabled:opacity-70 flex items-center justify-center gap-2"
                  >
                    {status === "sending" ? (
                      <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    ) : (
                      <>
                        <FaPaperPlane className="w-4 h-4" /> Send Message
                      </>
                    )}
                  </motion.button>
                </div>

                {/* Error Status Overlay (Subtle) */}
                <AnimatePresence>
                  {status === "error" && (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0 }}
                      className="p-4 rounded-xl bg-red-500/10 border border-red-500/20 flex items-center gap-3 mt-2"
                    >
                      <FaExclamationCircle className="w-5 h-5 text-red-400 shrink-0" />
                      <p className="text-red-400 text-sm">
                        Failed to send message. Please try again later.
                      </p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </form>

              {/* Full Success Status Overlay */}
              <AnimatePresence>
                {status === "success" && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="absolute inset-0 z-20 flex flex-col items-center justify-center bg-[#0a0a0a]/95 backdrop-blur-md rounded-3xl"
                  >
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ type: "spring", bounce: 0.5 }}
                    >
                      <FaCheckCircle className="w-16 h-16 text-cyan-400 mb-4" />
                    </motion.div>
                    <h4 className="text-2xl font-bold text-white mb-2">Message Sent!</h4>
                    <p className="text-gray-400 text-center max-w-[250px]">
                      Thank you for reaching out. I'll get back to you as soon as possible.
                    </p>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
