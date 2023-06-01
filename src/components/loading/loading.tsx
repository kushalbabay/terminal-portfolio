import React, { useEffect, useState } from "react";
import "./loading.scss";
import { loadingMessages, loadingText } from "../../models/models";
import RainBG from "../rainBG/rainBG";
import { AnimatePresence, easeIn, motion } from "framer-motion";

interface LoadingScreenProps {
  handleFullScreen: Function;
}

const LoadingScreen: React.FC<LoadingScreenProps> = ({ handleFullScreen }) => {
  const [loadingTextIndex, setLoadingTextIndex] = useState(0);
  const [isLoadingTextShown, setIsLoadingTextShown] = useState(true);

  useEffect(() => {
    const preventKeyInputs = (e: KeyboardEvent) => {
      e.preventDefault();
    };

    window.addEventListener("keydown", preventKeyInputs);

    return () => {
      window.removeEventListener("keydown", preventKeyInputs);
    };
  }, []);

  useEffect(() => {
    setTimeout(() => {
      setIsLoadingTextShown(false);
    }, 3000);
    setTimeout(() => {
      if (loadingTextIndex === loadingMessages.length - 1) {
        setLoadingTextIndex(0);
      } else {
        setLoadingTextIndex(loadingTextIndex + 1);
      }
    }, 300);
  }, [loadingTextIndex]);

  return (
    <motion.div
      initial={false}
      animate={{ y: 0, opacity: 1 }}
      exit={{ y: 300, opacity: 0, transitionEnd: { display: "none" } }}
      transition={{ ease: "easeIn", bounce: false, type: "just" }}
      className="motion__div"
    >
      <RainBG />
      <AnimatePresence>
        {isLoadingTextShown && (
          <motion.div
            initial={{ y: 250 }}
            animate={{ y: 0 }}
            exit={{
              opacity: 0,
              scale: 0.4,
              transitionEnd: { display: "none" },
            }}
            transition={{ duration: 0.3, ease: easeIn }}
            className="loading__container"
          >
            <pre className="loading__container__text">{loadingText}</pre>
            <p className="loading__container__message">
              {loadingMessages[loadingTextIndex]}
            </p>
            <div className="loading__container__bar">
              <div id="pacman1"></div>
              <div className="loading__container__bar__blocks">
                {Array.from({ length: 7 }, (_, i) => (
                  <motion.span
                    key={i}
                    initial={{ opacity: 1 }}
                    animate={{ opacity: 0 }}
                    transition={{ delay: 0.6 + 0.4 * i }}
                  ></motion.span>
                ))}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
      <motion.div
        className="confirmation__window"
        initial={{ scale: 0.5, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.3, delay: 3.3, ease: easeIn }}
      >
        <div className="confirmation__window__box">
          <p>immerse into the experience ?</p>
          <br />
          <div className="buttons">
            <button onClick={() => handleFullScreen(true)} className="button">
              Yes
            </button>
            <button onClick={() => handleFullScreen(false)} className="button">
              No
            </button>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default LoadingScreen;
