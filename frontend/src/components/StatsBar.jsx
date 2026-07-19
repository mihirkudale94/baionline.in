import React, { useEffect, useState, useRef } from "react";
import "./StatsBar.css";

const CounterItem = ({ label, target }) => {
  const [count, setCount] = useState(0);
  const ref = useRef(null);

  useEffect(() => {
    // Parse target to separate number from text (e.g. "2 Lakh" -> 2, "Lakh")
    const num = parseInt(target.replace(/[^0-9]/g, ""), 10) || 0;
    
    let isMounted = true;
    let observer = null;

    const startCounter = () => {
      let current = 0;
      const duration = 2000; // 2 seconds
      const steps = 50;
      const stepTime = duration / steps;
      const increment = num / steps;

      const timer = setInterval(() => {
        if (!isMounted) return clearInterval(timer);
        
        current += increment;
        if (current >= num) {
          setCount(num);
          clearInterval(timer);
        } else {
          setCount(Math.ceil(current));
        }
      }, stepTime);
    };

    // Use intersection observer to count only when in view
    const node = ref.current;
    if ("IntersectionObserver" in window) {
      observer = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting) {
          startCounter();
          if (node) observer.unobserve(node);
        }
      }, { threshold: 0.1 });

      if (node) observer.observe(node);
    } else {
      startCounter();
    }

    return () => {
      isMounted = false;
      if (observer && node) observer.unobserve(node);
    };
  }, [target]);

  const displayValue = count + (target.includes("Lakh") ? " Lakh" : "");

  return (
    <div className="stats-item" ref={ref}>
      <span className="stats-number">{displayValue}</span>
      <span className="stats-label">{label}</span>
    </div>
  );
};

const StatsBar = ({ stats }) => {
  if (!stats || stats.length === 0) return null;

  return (
    <div className="stats-bar-wrapper">
      <div className="container stats-container">
        {stats.map((stat, idx) => (
          <CounterItem key={idx} label={stat.label} target={stat.count} />
        ))}
      </div>
    </div>
  );
};

export default StatsBar;
