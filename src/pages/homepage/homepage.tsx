import React, { useState } from "react";
import InputLine from "../../components/inputline/inputline";
import { acceptedInputs } from "../../models/models";
import {
  showCommandNotFoundMessage,
  showCommandOutput,
} from "../../utils/utils";
import "./homepage.scss";

const Homepage: React.FC = () => {
  const [outputStack, setOutputStack] = useState<React.ReactNode[]>([]);
  const handleCommand = (command: string) => {
    let message;
    if (!acceptedInputs.includes(command)) {
      // doFuzzySearch()
      message = showCommandNotFoundMessage(command);
      setOutputStack([...outputStack, message]);
    } else if (["cls", "clr", "clear"].includes(command)) {
      console.log("Cleared");
      setOutputStack([]);
    } else {
      message = showCommandOutput(command);
      setOutputStack([...outputStack, message]);
    }
    document.querySelector(".empty-space")?.scrollIntoView();
  };
  return (
    <div className="container">
      <div className="output-stack">
        {outputStack.map((output, index) => {
          return (
            <div className="output" key={index}>
              {output}
            </div>
          );
        })}
      </div>
      <InputLine handleCommand={handleCommand} />
      <div className="empty-space"></div>
    </div>
  );
};

export default Homepage;
