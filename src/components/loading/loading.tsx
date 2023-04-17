import React, { useEffect, useState } from "react";
import "./loading.scss";
import { loadingMessages, loadingText } from "../../models/models";
import RainBG from "../rainBG/rainBG";
import { motion } from "framer-motion";

export default function LoadingScreen() {
  const [loadingTextIndex, setLoadingTextIndex] = useState(0);

  useEffect(() => {
    setTimeout(() => {
      if (loadingTextIndex === loadingMessages.length - 1) {
        setLoadingTextIndex(0);
      } else {
        setLoadingTextIndex(loadingTextIndex + 1);
      }
    }, 400);
  }, [loadingTextIndex]);

  return (
    <motion.div
      initial={false}
      animate={{ y: 0, opacity: 1 }}
      exit={{ y: 200, opacity: 0 }}
      transition={{ ease: "easeIn", bounce: false, type: "just" }}
      className="motion__div"
    >
      <RainBG />
      <motion.div
        initial={{ y: 100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ ease: "easeIn", bounce: false, type: "just" }}
        className="loading__container"
      >
        <pre className="loading__container__text">{loadingText}</pre>
        <p className="loading__container__message">
          {loadingMessages[loadingTextIndex]}
        </p>
        <div className="loading__container__bar">
          <div id="pacman1"></div>
          <div className="loading__container__bar__blocks">
            {Array.from({ length: 10 }, (_, i) => (
              <motion.span
                key={i}
                initial={{ opacity: 1 }}
                animate={{ opacity: 0 }}
                transition={{ delay: 0.7 + 0.45 * i }}
              ></motion.span>
            ))}
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}