import React, { useState, useEffect, useContext } from "react";
import { commandLineText } from "../../models/models";
import { autoCompleteInput } from "../../utils/utils";
import "./inputline.scss";
import { CommandContext } from "../../contexts/CommandContext";

interface IInputLineProps {
  handleCommand: Function;
}

const InputLine: React.FC<IInputLineProps> = ({ handleCommand }) => {
  const [inputCommand, setInputCommand] = useState("");
  const [autoCompleteInputKeyword, setAutoCompleteInputKeyword] = useState("");
  const [autoCompleteSuggestionIndex, setAutoCompleteSuggestionIndex] =
    useState(0);
  const [inputCommandIndex, setInputCommandIndex] = useState<number>(-1);
  const [caretDepth, setCaretDepth] = useState([2, 2, 3, 3, 1, 1]);
  const [isCaretLoading, setIsCaretLoading] = useState(false);
  const { setCommands, commands } = useContext(CommandContext);

  useEffect(() => {
    const x = setTimeout(() => {
      setCaretDepth([caretDepth.pop()!, ...caretDepth]);
    }, 90);
    return () => {
      clearTimeout(x);
    };
  }, [caretDepth]);

  useEffect(() => {
    if (commands.length) {
      handleCommand(commands[commands.length - 1].toLowerCase());
      setInputCommand("");
      setInputCommandIndex(commands.length);
    }
  }, [commands]);

  useEffect(() => {
    triggerAutoComplete();
  }, [autoCompleteInputKeyword]);

  useEffect(() => {
    if (inputCommandIndex > -1 && inputCommandIndex <= commands.length - 1) {
      setInputCommand(commands[inputCommandIndex]);
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
    if (["ArrowLeft", "ArrowRight", "Home", "End", "Tab"].includes(e.key)) {
      e.preventDefault();
      return;
    }
  };

  const handleKeyUp = (e: React.KeyboardEvent) => {
    if (isCaretLoading) e.preventDefault();
    let loadingTimeout: number;
    if (e.key === "Tab") {
      if (autoCompleteInputKeyword.length) {
        triggerAutoComplete();
      } else {
        setAutoCompleteInputKeyword(inputCommand);
      }
    } else if (e.key === "Enter") {
      if (inputCommand?.trim()) {
        setIsCaretLoading(true);
        loadingTimeout = window.setTimeout(() => {
          setIsCaretLoading(false);
          setCommands([...commands, inputCommand.trim()]);
          clearTimeout(loadingTimeout);
        }, 400 + Math.floor(Math.random() * 350));
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
      if (inputCommandIndex <= commands.length - 1) {
        setInputCommandIndex(inputCommandIndex + 1);
        if (inputCommandIndex === commands.length - 1) {
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
          onKeyUp={(e) => handleKeyUp(e)}
          onBlur={(e) => e.target.focus()}
          autoFocus
          type="text"
          value={inputCommand}
          style={{ width: (inputCommand ? inputCommand.length : 1) + "ch" }}
          onChange={(e) => setInputCommand(e.target.value)}
          className="input-line__input-field"
        />

        {isCaretLoading ? (
          <div className="caret-loader">
            <div className="col col-left">
              {Array.from({ length: 3 }).map((_, i) => (
                <span className={"dot shade-" + caretDepth[i]}></span>
              ))}
            </div>
            <div className="col col-right">
              {Array.from({ length: 3 }).map((_, i) => (
                <span className={"dot shade-" + caretDepth[i + 3]}></span>
              ))}
            </div>
          </div>
        ) : (
          <div
            style={{ left: inputCommand.length ? 0 : "-1ch" }}
            className="input-line__cursor"
          ></div>
        )}
      </div>
    </div>
  );
};

export default InputLine;
