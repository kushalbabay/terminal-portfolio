import * as React from "react";
import "./inputline.scss";

const InputLine: React.FC = () => {
  return (
    <div className="input-line">
      <div className="input-line__address">C://This PC/Kushal's:</div>
      <div className="input-line__cursor"></div>
    </div>
  );
};

export default InputLine;
