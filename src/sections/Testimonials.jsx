// Importing React library so we can create and use components
import React from "react";

// Importing image assets for the testimonials section
import m1 from "../assets/m1.png"; // Male testimonial image 1
import m2 from "../assets/m2.png"; // Male testimonial image 2
import w1 from "../assets/w1.png"; // Female testimonial image 1
import w2 from "../assets/w2.png"; // Female testimonial image 2

// Importing Framer Motion for smooth animations
import { motion } from "framer-motion";

// Creating shorter variables for motion components to make code cleaner
const MH2 = motion.h2; // Animated <h2> tag
const MDiv = motion.div; // Animated <div> tag

// Array containing all testimonial data (name, role, review, image)
const testimonials = [
  {
    name: "Shubham Sharma",
    role: "SDE-III at Nykaa",
    review:
      "I've always admired his dedication and willingness to put in the work to achieve his goals. When he commits to something, he gives it his full attention and doesn't shy away from challenges. He's responsible, reliable, and genuinely eager to learn and improve. What stands out most is his persistence and positive attitude, even when things don't go as planned. I have no doubt that these qualities, along with his passion for technology, will help him succeed as a software engineer.",
    image: w2,
  },
  {
    name: "Sade Ayinde",
    role: "Senior Product Manager at Yendo",
    review:
      "BEYOND HELPFUL IN COMP. SCI. and my IT classes with the Cisco Packet Tracer. Pranav will always go above and beyond!",
    image: m1, // Points to imported image
  },
  {
    name: "Raj Gupta",
    role: "React Native Developer at Owebest Technologies Pvt Ltd",
    review:
      "From concept to execution, Pranav handled everything flawlessly. His skills of communication and quick learning are unmatched.",
    image: m2,
  },
  {
    name: "Based on 3 anonymous student reviews",
    role: "Preply",
    review:
      "Pranav's Lesson Rating out of 5.0 • Reassurance - 4.7 • Clarity - 4.3 • Progress - 4.3 • Preparation - 4.0",
    image: w1,
  },
];

// Functional component for Testimonials section
function Testimonials() {
  return (
    // Section wrapper with styling
    <section
      id="testimonials" // ID for navigation
      className="relative min-h-screen bg-black text-white flex flex-col items-center justify-center px-6 py-20"
      // Makes this section full-screen height, black background, white text, centered content
    >
      {/* Animated Section Title */}
      <motion.h2
        className="text-4xl mt-5 sm:text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-[#1cd8d2] via-[#00bf8f] to-[#302b63] z-10 mb-16"
        initial={{ opacity: 0, y: -30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.1 }}
      >
        What People Say
      </motion.h2>

      {/* Grid for all testimonial cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-10 max-w-6xl w-full">
        {/* Looping through testimonials array to create each card */}
        {testimonials.map((testi, idx) => (
          <MDiv
            key={testi.name + idx} // Unique key for React rendering
            initial={{ opacity: 0, y: 50 }} // Start invisible & slightly below
            whileInView={{ opacity: 1, y: 0 }} // Animate when in viewport
            transition={{ duration: 0.5, delay: idx * 0.2 }} // Stagger effect based on index
            viewport={{ once: true }} // Animate only the first time it's visible
            className="bg-white/10 backdrop-blur-lg border border-white/20 rounded-2xl p-6 flex flex-col items-center text-center transform transition duration-500 hover:scale-105 hover:-rotate-1"
            // Glass effect card, rounded corners, hover animation
          >
            {/* Person Image */}
            <img
              src={testi.image} // Image from array
              alt={testi.name} // Accessibility
              className="w-20 h-20 rounded-full border-2 border-white/40 mb-4 object-cover"
              // Circle image with border
              loading="lazy" // Lazy load for performance
            />

            {/* Testimonial Review Text */}
            <p className="text-gray-200 italic mb-4">"{testi.review}"</p>

            {/* Name of the person */}
            <h3 className="text-lg font-semibold">{testi.name}</h3>

            {/* Their role/job title */}
            <p className="text-sm text-gray-400">{testi.role}</p>
          </MDiv>
        ))}
      </div>
    </section>
  );
}

// Exporting the component so it can be used in App.jsx
export default Testimonials;
