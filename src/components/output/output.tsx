import React from "react";
import { acceptedInputs, commandLineText } from "../../models/models";
import "./output.scss";
import {
  showCommandNotFoundMessage,
  showCommandOutput,
} from "../../utils/utils";

interface OutputProps {
  command: string;
}

const Output: React.FC<OutputProps> = ({ command }) => {
  let message;
  if (!command.length) {
    return <span className="address">{commandLineText}</span>;
  }
  if (!acceptedInputs.includes(command)) {
    message = showCommandNotFoundMessage(command);
  } else {
    message = showCommandOutput(command);
  }
  return (
    <div className="output__container">
      <div className="input-line__address">
        <span className="address">{commandLineText}</span>
        <span className="white">{command}</span>
      </div>
      <br />
      {message}
    </div>
  );
};

export default Output;
