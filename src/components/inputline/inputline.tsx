import React, { useState, useEffect } from "react";
import { commandLineText } from "../../models/models";
import { autoCompleteInput } from "../../utils/utils";
import "./inputline.scss";

interface InputLineProps {
  handleCommand: Function;
}

const InputLine: React.FC<InputLineProps> = ({ handleCommand }) => {
  const [inputCommand, setInputCommand] = useState("");
  const [autoCompleteInputKeyword, setAutoCompleteInputKeyword] = useState("");
  const [autoCompleteSuggestionIndex, setAutoCompleteSuggestionIndex] =
    useState(0);
  const [commandStack, setCommandStack] = useState<string[]>([]);
  const [inputCommandIndex, setInputCommandIndex] = useState<number>(-1);
  const [depth, setDepth] = useState([2, 2, 3, 3, 1, 1]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const x = setTimeout(() => {
      setDepth([depth.pop()!, ...depth]);
    }, 120);
    return () => {
      clearTimeout(x);
    };
  }, [depth]);

  useEffect(() => {
    if (commandStack.length) {
      handleCommand(inputCommand.trim().toLowerCase());
      setInputCommand("");
      setInputCommandIndex(commandStack.length);
    }
  }, [commandStack]);

  useEffect(() => {
    triggerAutoComplete();
  }, [autoCompleteInputKeyword]);

  useEffect(() => {
    if (
      inputCommandIndex > -1 &&
      inputCommandIndex <= commandStack.length - 1
    ) {
      setInputCommand(commandStack[inputCommandIndex]);
    }
  }, [inputCommandIndex]);

  const triggerAutoComplete = () => {
    if (autoCompleteInputKeyword.length) {
      const autoCompleteResultIndex = autoCompleteInput(
        autoCompleteInputKeyword,
        autoCompleteSuggestionIndex + 1,
        setInputCommand
      );
      setAutoCompleteSuggestionIndex(autoCompleteResultIndex);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (isLoading) e.preventDefault();
    let loadingTimeout: number;
    if (["ArrowLeft", "ArrowRight", "Home", "End"].includes(e.key)) {
      e.preventDefault();
      return;
    }

    if (e.key === "Tab") {
      e.preventDefault();
      if (autoCompleteInputKeyword.length) {
        triggerAutoComplete();
      } else {
        setAutoCompleteInputKeyword(inputCommand);
      }
    } else if (e.key === "Enter") {
      if (inputCommand?.trim()) {
        setIsLoading(true);
        loadingTimeout = window.setTimeout(() => {
          setIsLoading(false);
          setCommandStack([...commandStack, inputCommand.trim()]);
          clearTimeout(loadingTimeout);
        }, 750);
      } else {
        handleCommand(inputCommand.trim());
        setInputCommand("");
      }
    } else if (e.key === "ArrowUp") {
      if (inputCommandIndex !== 0) {
        setInputCommandIndex(inputCommandIndex - 1);
      } else {
        e.preventDefault();
      }
    } else if (e.key === "ArrowDown") {
      if (inputCommandIndex <= commandStack.length - 1) {
        setInputCommandIndex(inputCommandIndex + 1);
        if (inputCommandIndex === commandStack.length - 1) {
          setInputCommand("");
        }
      }
    } else {
      setAutoCompleteInputKeyword("");
    }
  };

  return (
    <div className="input-container">
      <div className="input-line">
        <div className="input-line__address">{commandLineText}</div>
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

        {isLoading ? (
          <div className="caret-loader">
            <div className="col col-left">
              <span className={"dot shade-" + depth[0]}></span>
              <span className={"dot shade-" + depth[1]}></span>
              <span className={"dot shade-" + depth[2]}></span>
            </div>
            <div className="col col-right">
              <span className={"dot shade-" + depth[3]}></span>
              <span className={"dot shade-" + depth[4]}></span>
              <span className={"dot shade-" + depth[5]}></span>
            </div>
          </div>
        ) : (
          <div className="input-line__cursor"></div>
        )}
      </div>
    </div>
  );
};

export default InputLine;
