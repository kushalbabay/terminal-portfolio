import React, { useEffect, useState } from "react";
import "./loading.scss";
import { loadingMessages, loadingText } from "../../models/models";

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
    <div className="loading__container">
      <pre className="loading__container__text">{loadingText}</pre>
      <p className="loading__container__message">
        {loadingMessages[loadingTextIndex]}
      </p>
      <div className="loading__container__bar">
        <div id="pacman1">
          <div className="loading__container__bar__blackbar"></div>
        </div>
        <div className="loading__container__bar__blocks">
          <span></span>
          <span></span>
          <span></span>
          <span></span>
          <span></span>
          <span></span>
          <span></span>
          <span></span>
          <span></span>
          <span></span>
        </div>
      </div>
    </div>
  );
}
