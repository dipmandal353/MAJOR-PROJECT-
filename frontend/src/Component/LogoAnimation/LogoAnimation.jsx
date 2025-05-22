import React, { useState, useEffect, useRef } from "react";
import { motion, useAnimation, useMotionValue } from "framer-motion";
import { useNavigate } from "react-router-dom";

const LogoAnimation = () => {
  const [animationComplete, setAnimationComplete] = useState(false);
  const containerRef = useRef(null);
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const controls = useAnimation();
  const navigate = useNavigate();

  useEffect(() => {
    const handleMouseMove = (event) => {
      const { clientX, clientY } = event;
      const { left, top, width, height } = containerRef.current.getBoundingClientRect();
      const x = (clientX - left - width / 2) / 25;
      const y = (clientY - top - height / 2) / 25;
      mouseX.set(x);
      mouseY.set(y);
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [mouseX, mouseY]);

  useEffect(() => {
    const animationSequence = async () => {
      await controls.start({
        scale: [0.5, 1],
        opacity: [0, 1],
        rotateX: [-90, 0],
        transition: { duration: 1.5, ease: "easeOut" },
      });
      await controls.start({
        rotateY: [-180, 0],
        transition: { duration: 2, ease: "easeOut" },
      });

      // Zoom-out animation
      await controls.start({
        scale: 50, // Scale to fill the screen
        transition: { duration: 2, ease: "easeInOut" },
      });

      setAnimationComplete(true);
    };

    animationSequence();
  }, [controls]);

  useEffect(() => {
    if (animationComplete) {
      navigate("/home");
    }
  }, [animationComplete, navigate]);

  return (
    <div className="logo-animation-container" ref={containerRef}>
      <motion.div
        className="logo-container"
        animate={controls}
        style={{
          rotateX: mouseY,
          rotateY: mouseX,
        }}
      >
        <motion.div className="logo">
          <img src="/src/assets/gif.gif" alt="Logo" className="logo-img" />
        </motion.div>
        <motion.div
          className="logo-border-1"
          initial={{ scale: 1.2, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.5, duration: 1.5 }}
        />
        <motion.div
          className="logo-border-2"
          initial={{ scale: 1.4, opacity: 0 }}
          animate={{ scale: 1, opacity: 0.5 }}
          transition={{ delay: 0.75, duration: 1.75 }}
        />
      </motion.div>
      <motion.h1
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1, duration: 0.8 }}
        className="title"
      >
        PrepMonk
      </motion.h1>
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5, duration: 0.8 }}
        className="tagline"
      >
        Master Your Preparation
      </motion.p>
    </div>
  );
};

export default LogoAnimation;
