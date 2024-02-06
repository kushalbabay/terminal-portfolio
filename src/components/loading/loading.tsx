import React, { useEffect, useState } from "react";
import "./loading.scss";
import { loadingMessages, loadingText } from "../../models/models";
import RainBG from "../rainBG/rainBG";
import { AnimatePresence, easeIn, motion } from "framer-motion";

interface LoadingScreenProps {
  setIsLoading: Function;
}

const LoadingScreen: React.FC<LoadingScreenProps> = ({ setIsLoading }) => {
  const [loadingTextIndex, setLoadingTextIndex] = useState(0);
  const [isLoadingTextShown, setIsLoadingTextShown] = useState(true);
  const [depth, setDepth] = useState([2, 1, 0, 0, 0, 0, 0, 1, 1]);

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
    const x = setTimeout(() => {
      setDepth([depth.pop()!, ...depth]);
    }, 150);
    return () => {
      clearTimeout(x);
    };
  }, [depth]);

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

  const handleFullScreen = (isFullScreenTriggered: boolean) => {
    if (isFullScreenTriggered) {
      document.body.requestFullscreen();
    }
    setIsLoading(false);
  };

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
            initial={{ y: 350 }}
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
              {Array.from({ length: 9 }, (_, i) => (
                <Block key={i} state={depth[i]} />
              ))}
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

interface BlockProps {
  state: number;
}

function Block({ state }: BlockProps) {
  let depth = state < 3 ? state : state % 3;
  return (
    <div className={"outer outer-" + depth}>
      <div className={"mid mid-" + depth}>
        <div className={"inner inner-" + depth}></div>
      </div>
    </div>
  );
}
