import React from "react";
import { outputs } from "../models/models";

export const showCommandNotFoundMessage = (command: string) => {
  return (
    <pre>
      We could not find the command <span className="red">{command}</span>
      . <br />
      Type <span className="white">help</span> for all the available commands.
    </pre>
  );
};

export const showCommandOutput = (command: string) => {
  let output;
  switch (command) {
    case "help":
      output = outputs[command];
      break;
    default:
      output = (
        <pre>
          <span className="red">{command}</span> command is still under
          development.
          <br />
          Type <span className="white">help</span> for all the available
          commands.
        </pre>
      );
  }
  return output;
};
