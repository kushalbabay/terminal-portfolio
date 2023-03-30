import React, { useState, useEffect } from "react";
import "./inputline.scss";

interface InputLineProps {
  handleCommand: Function;
}

const InputLine: React.FC<InputLineProps> = ({ handleCommand }) => {
  const [inputCommand, setInputCommand] = useState("");
  const [commandStack, setCommandStack] = useState<string[]>([]);
  const [inputCommandIndex, setInputCommandIndex] = useState<number>(-1);

  useEffect(() => {
    if (commandStack.length) {
      handleCommand(inputCommand);
      setInputCommand("");
      setInputCommandIndex(commandStack.length);
    }
  }, [commandStack]);

  useEffect(() => {
    if (
      inputCommandIndex > -1 &&
      inputCommandIndex <= commandStack.length - 1
    ) {
      setInputCommand(commandStack[inputCommandIndex]);
    }
  }, [inputCommandIndex]);

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.code === "Tab") {
      e.preventDefault();
      //autoCompleteInput()
    }
    if (e.code === "Enter" && inputCommand?.trim()) {
      setCommandStack([...commandStack, inputCommand]);
    }
    if (e.code === "ArrowUp" && inputCommandIndex !== 0) {
      setInputCommandIndex(inputCommandIndex - 1);
    }
    if (e.code === "ArrowDown") {
      if (inputCommandIndex <= commandStack.length - 1) {
        setInputCommandIndex(inputCommandIndex + 1);
        if (inputCommandIndex === commandStack.length - 1) {
          setInputCommand("");
        }
      }
    }
  };

  return (
    <div className="input-line">
      <div className="input-line__address">C://This PC/Kushal's:</div>
      <input
        onKeyDown={(e) => handleKeyDown(e)}
        onBlur={(e) => e.target.focus()}
        autoFocus
        type="text"
        value={inputCommand}
        style={{ width: inputCommand?.length + "ch" }}
        onChange={(e) => setInputCommand(e.target.value)}
        className="input-line__input-field"
      />
      <div className="input-line__cursor"></div>
    </div>
  );
};

export default InputLine;
