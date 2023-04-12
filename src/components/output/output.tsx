import React, { useState, useEffect } from "react";
import { commandLineText } from "../../models/models";

interface OutputProps {
  command: string;
  children: React.ReactNode;
}

const Output: React.FC<OutputProps> = ({ command, children }) => {
  return (
    <div>
      <div className="input-line__address">
        <span style={{ marginRight: "8px" }}>{commandLineText}</span>
        {command}
      </div>
      <br />
      {children}
    </div>
  );
};

export default Output;
