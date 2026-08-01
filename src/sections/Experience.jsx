import React from "react";
import { motion } from "framer-motion";
import {
  FaBriefcase,
  FaMapMarkerAlt,
  FaCalendarAlt,
  FaLink,
  FaGithub,
  FaLinkedin,
  FaCertificate,
  FaCheckCircle,
} from "react-icons/fa";

const experiences = [
  {
    id: 1,
    company: "Preply",
    role: "Tutor",
    employmentType: "Freelance",
    duration: "Feb 2025 – Present",
    location: "Global",
    description:
      "Providing personalized 1-on-1 tutoring in Programming, Cyber Security, and Ethical Hacking to students worldwide. Making complex topics approachable with hands-on practice, real-world examples, and structured learning plans.",
    techStack: [
      "Java",
      "Python",
      "C/C++",
      "MySQL",
      "Cybersecurity",
      "Teaching",
    ],
    achievements: [
      "Subjects: Java, C/C++, Python, MySQL, Ethical Hacking (Basics to Intermediate), Computer Science",
      "Teaching Approach: Interactive lessons, step-by-step explanations, and practical exercises",
    ],
    companyLogo: "",
    certificate: "",
    website: "",
    github: "",
    linkedin: "",
    color: "#06b6d4",
    current: true,
  },
  {
    id: 2,
    company: "Wise Tech Labs Pvt Ltd",
    role: "Backend Developer Intern",
    employmentType: "Internship",
    duration: "May 2026 – July 2026",
    location: "Jaipur, Rajasthan, India",
    description:
      "Working as a Backend Developer Intern, contributing to server-side development and building robust, scalable backend solutions.",
    techStack: ["Java", "Spring Boot", "REST APIs", "Backend"],
    achievements: [],
    companyLogo: "",
    certificate: "",
    website: "",
    github: "",
    linkedin: "",
    color: "#3b82f6", // blue-500
    current: false,
  },
  {
    id: 3,
    company: "SSNAM Global Marketing Pvt Ltd",
    role: "Backend Developer Intern",
    employmentType: "Internship",
    duration: "May 2026 – July 2026",
    location: "Jaipur, Rajasthan, India",
    description:
      "Developing and maintaining backend systems and APIs, driving efficient data processing and business logic for the organization.",
    techStack: ["Java", "Spring Boot", "REST APIs", "PostgreSQL"],
    achievements: [],
    companyLogo: "",
    certificate: "",
    website: "",
    github: "",
    linkedin: "",
    color: "#6366f1", // indigo-500
    current: false,
  },
  {
    id: 4,
    company: "Learn and Build",
    role: "Java Intern",
    employmentType: "Internship",
    duration: "Jun 2025 – Jul 2025",
    location: "Jaipur, Rajasthan, India",
    description:
      "Focused on Core Java Programming fundamentals & project-based learning with practical implementations in real-world cases.",
    techStack: ["Java", "OOP", "JDBC", "Core Java"],
    achievements: [
      "Improved problem-solving and debugging skills through guided mentorship",
      "Collaborated with peers in a structured learning environment",
    ],
    companyLogo: "",
    certificate: "",
    website: "",
    github: "",
    linkedin: "",
    color: "#14b8a6", // teal-500
    current: false,
  },
];

function ExperienceCard({ exp }) {
  const isCurrent = exp.current;

  return (
    <article className="relative pl-12 md:pl-24 w-full">
      {/* Timeline Node */}
      <motion.div
        initial={{ scale: 0, opacity: 0 }}
        whileInView={{ scale: 1, opacity: 1 }}
        viewport={{ once: true, margin: "-50px" }}
        transition={{ duration: 0.5, delay: 0.1 }}
        className="absolute left-[20px] md:left-[40px] top-8 md:top-10 -translate-x-1/2 w-4 h-4 md:w-5 md:h-5 rounded-full z-10"
        style={{
          backgroundColor: exp.color,
          boxShadow: isCurrent
            ? `0 0 20px ${exp.color}`
            : `0 0 10px ${exp.color}40`,
          border: isCurrent ? `2px solid #ffffff` : `2px solid ${exp.color}`,
        }}
      />

      {/* Horizontal Connector Line */}
      <div className="absolute left-[20px] md:left-[40px] top-8 md:top-10 w-[28px] md:w-[56px] h-[2px] overflow-hidden z-0 mt-[7px] md:mt-[9px]">
        <motion.div
          initial={{ scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="w-full h-full origin-left"
          style={{ backgroundColor: exp.color, opacity: 0.4 }}
        />
      </div>

      {/* Experience Card */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-50px" }}
        transition={{ duration: 0.6, delay: 0.2 }}
        className={`relative group bg-[#0a0a0a]/80 backdrop-blur-md border ${
          isCurrent ? "border-cyan-500/40" : "border-white/10"
        } rounded-2xl p-6 md:p-8 hover:border-white/20 transition-all duration-500 overflow-hidden`}
        style={{
          boxShadow: isCurrent
            ? `0 0 30px ${exp.color}15`
            : "0 10px 30px rgba(0,0,0,0.5)",
        }}
      >
        {/* Dynamic Glow Behind Card on Hover */}
        <div
          className="absolute inset-0 opacity-0 group-hover:opacity-15 transition-opacity duration-500 pointer-events-none"
          style={{
            background: `radial-gradient(circle at 50% 0%, ${exp.color}, transparent 70%)`,
          }}
        />

        <div className="flex flex-col md:flex-row md:items-start justify-between gap-6 relative z-10">
          <div className="flex-1 space-y-4">
            {/* Header section */}
            <div className="flex flex-col xl:flex-row xl:items-start justify-between gap-4">
              <div>
                <div className="flex items-center gap-3 mb-2">
                  <h3 className="text-2xl font-bold text-white tracking-tight leading-tight">
                    {exp.role}
                  </h3>
                  {isCurrent && (
                    <span
                      className="px-2.5 py-0.5 rounded-full text-[10px] font-bold tracking-widest uppercase animate-pulse shrink-0"
                      style={{
                        backgroundColor: `${exp.color}20`,
                        color: exp.color,
                        border: `1px solid ${exp.color}40`,
                      }}
                    >
                      Current
                    </span>
                  )}
                </div>
                <div
                  className="flex flex-wrap items-center gap-2 text-lg font-medium"
                  style={{ color: exp.color }}
                >
                  <FaBriefcase className="w-4 h-4 shrink-0" />
                  <span>{exp.company}</span>
                  {exp.employmentType && (
                    <>
                      <span className="text-gray-600 hidden sm:inline">•</span>
                      <span className="text-gray-400 text-sm">
                        {exp.employmentType}
                      </span>
                    </>
                  )}
                </div>
              </div>

              {/* Duration and Location */}
              <div className="flex flex-col xl:items-end gap-1.5 text-sm text-gray-400 shrink-0">
                <div className="flex items-center gap-2">
                  <FaCalendarAlt className="w-3.5 h-3.5 text-gray-500" />
                  <span>{exp.duration}</span>
                </div>
                {exp.location && (
                  <div className="flex items-center gap-2">
                    <FaMapMarkerAlt className="w-3.5 h-3.5 text-gray-500" />
                    <span>{exp.location}</span>
                  </div>
                )}
              </div>
            </div>

            {/* Main Description */}
            <p className="text-gray-300 leading-relaxed text-sm md:text-base pt-1">
              {exp.description}
            </p>

            {/* Achievements List */}
            {exp.achievements?.length > 0 && (
              <div className="space-y-2.5 pt-2">
                {exp.achievements.map((achieve, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, x: -10 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.4, delay: 0.4 + i * 0.1 }}
                    className="flex items-start gap-3"
                  >
                    <FaCheckCircle
                      className="w-4 h-4 mt-1 shrink-0"
                      style={{ color: exp.color }}
                    />
                    <span className="text-gray-300 text-sm leading-relaxed">
                      {achieve}
                    </span>
                  </motion.div>
                ))}
              </div>
            )}

            {/* Tech Stack Chips */}
            {exp.techStack?.length > 0 && (
              <div className="flex flex-wrap gap-2 pt-4">
                {exp.techStack.map((tech, i) => (
                  <span
                    key={i}
                    className="px-3 py-1 rounded-full text-xs font-medium bg-white/5 border border-white/10 text-gray-300 hover:bg-white/10 hover:text-white transition-colors cursor-default"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            )}

            {/* External Links / Buttons */}
            {(exp.website || exp.github || exp.linkedin || exp.certificate) && (
              <div className="flex flex-wrap gap-3 pt-5 mt-2 border-t border-white/5">
                {exp.website && (
                  <a
                    href={exp.website}
                    target="_blank"
                    rel="noreferrer"
                    className="flex items-center gap-1.5 text-xs font-medium text-white/70 hover:text-white bg-white/5 hover:bg-white/10 px-3 py-2 rounded-lg transition-all"
                  >
                    <FaLink /> Website
                  </a>
                )}
                {exp.github && (
                  <a
                    href={exp.github}
                    target="_blank"
                    rel="noreferrer"
                    className="flex items-center gap-1.5 text-xs font-medium text-white/70 hover:text-white bg-white/5 hover:bg-white/10 px-3 py-2 rounded-lg transition-all"
                  >
                    <FaGithub /> GitHub
                  </a>
                )}
                {exp.linkedin && (
                  <a
                    href={exp.linkedin}
                    target="_blank"
                    rel="noreferrer"
                    className="flex items-center gap-1.5 text-xs font-medium text-white/70 hover:text-white bg-white/5 hover:bg-white/10 px-3 py-2 rounded-lg transition-all"
                  >
                    <FaLinkedin /> LinkedIn
                  </a>
                )}
                {exp.certificate && (
                  <a
                    href={exp.certificate}
                    target="_blank"
                    rel="noreferrer"
                    className="flex items-center gap-1.5 text-xs font-medium text-white/70 hover:text-white bg-white/5 hover:bg-white/10 px-3 py-2 rounded-lg transition-all"
                  >
                    <FaCertificate /> Certificate
                  </a>
                )}
              </div>
            )}
          </div>

          {/* Optional Company Logo */}
          {exp.companyLogo && (
            <div className="hidden md:flex shrink-0 w-16 h-16 rounded-xl overflow-hidden border border-white/10 bg-white/5 p-2 items-center justify-center">
              <img
                src={exp.companyLogo}
                alt={exp.company}
                className="w-full h-full object-contain"
              />
            </div>
          )}
        </div>
      </motion.div>
    </article>
  );
}

export default function Experience() {
  return (
    <section
      id="experience"
      aria-label="Work Experience"
      className="relative w-full min-h-screen bg-[#050505] text-white py-24 overflow-hidden"
    >
      {/* Background Ambient Glows */}
      <div className="absolute top-40 left-0 w-[500px] h-[500px] bg-blue-600/10 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-40 right-0 w-[500px] h-[500px] bg-cyan-600/10 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16 md:mb-24"
        >
          <motion.h2
            className="text-4xl mt-5 sm:text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-[#1cd8d2] via-[#00bf8f] to-[#302b63] z-10"
            initial={{ opacity: 0, y: -30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            Experience
          </motion.h2>
          <motion.p className='mt-2 mb-8 text-white/90 text-base sm:text-lg z-10'
      initial={{opacity:0 , y: -10}}
      whileInView={{opacity:1 , y:0}}
      transition={{duration:0.5 , delay:0.1 }}
      >
            My professional journey and the roles that have shaped my technical
            expertise.
          </motion.p>
        </motion.div>

        {/* Timeline Container */}
        <div className="relative">
          {/* Main Vertical Timeline Line */}
          <div className="absolute left-[20px] md:left-[40px] top-4 bottom-4 w-[2px] bg-gradient-to-b from-cyan-500/50 via-blue-500/20 to-transparent rounded-full" />

          {/* Experience Cards List */}
          <div role="list" className="flex flex-col gap-10 md:gap-16">
            {experiences.map((exp) => (
              <ExperienceCard key={exp.id} exp={exp} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
