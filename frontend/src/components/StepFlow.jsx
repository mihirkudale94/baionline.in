import React from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import "./StepFlow.css";

const StepFlow = ({ steps }) => {
  return (
    <div className="step-flow-container">
      {steps.map((step, idx) => (
        <motion.div
          key={idx}
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: idx * 0.1 }}
          className="step-flow-item glass-card"
        >
          <div className="step-flow-number">{idx + 1}</div>
          <h4 className="step-flow-title">{step.title}</h4>
          {step.desc && <p className="step-flow-desc">{step.desc}</p>}
          {step.link && (
            <Link to={step.link} className="step-flow-link">Go to Form</Link>
          )}
          {idx < steps.length - 1 && <div className="step-flow-connector"></div>}
        </motion.div>
      ))}
    </div>
  );
};

export default StepFlow;
