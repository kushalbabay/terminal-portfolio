import React from "react";
import { commandLineText } from "../../models/models";
import "./output.scss";

interface OutputProps {
  command: string;
  children: React.ReactNode;
}

const Output: React.FC<OutputProps> = ({ command, children }) => {
  if (!command.length) {
    return <span className="address">{commandLineText}</span>;
  }
  return (
    <div className="output__container">
      <div className="input-line__address">
        <span className="address">{commandLineText}</span>
        <span className="white">{command}</span>
      </div>
      <br />
      {children}
    </div>
  );
};

export default Output;
