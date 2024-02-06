import React, { useState, useEffect, useRef } from "react";
import "./commandHistory.scss";
import { KeyCodes, commandLineText } from "../../models/models";

interface IComamndHistoryProps {
  history: Array<string>;
  setIsHistoryShown: Function;
  setCommands: React.Dispatch<React.SetStateAction<string[]>>;
}

const CommandHistory: React.FC<IComamndHistoryProps> = ({
  history,
  setCommands,
  setIsHistoryShown,
}) => {
  const filteredHistory = history
    .filter((option) => option !== "history")
    .slice(-10);
  const [selectedIndex, setSelectedIndex] = useState(
    filteredHistory.length - 1
  );
  const historyContainer = useRef<HTMLDivElement>(null);

  useEffect(() => {
    historyContainer.current?.focus();
  }, []);

  const handleSelectionChange = (event: React.KeyboardEvent) => {
    event.preventDefault();
    switch (event.key) {
      case KeyCodes.Enter:
        const selectedCommand = filteredHistory[selectedIndex];
        setCommands([...history, selectedCommand]);
        setIsHistoryShown(false);
        break;
      case KeyCodes.Escape:
        setIsHistoryShown(false);
        break;
      case KeyCodes.ArrowUp:
        if (selectedIndex !== 0) {
          setSelectedIndex(selectedIndex - 1);
        }
        break;
      case KeyCodes.ArrowDown:
        if (selectedIndex !== filteredHistory.length - 1) {
          setSelectedIndex(selectedIndex + 1);
        }
    }
  };

  return (
    <div
      tabIndex={0}
      onKeyUp={(e) => handleSelectionChange(e)}
      className="history__container"
      id="history_container"
      ref={historyContainer}
    >
      <div className="input-line__address">
        <span className="address">{commandLineText}</span>
        <span className="white">history</span>
      </div>
      {filteredHistory.map((option, i) => (
        <span
          className={"history__item " + (i === selectedIndex ? "selected" : "")}
          key={i}
        >
          {i === selectedIndex && "["}
          {option}
          {i === selectedIndex && "]"}
        </span>
      ))}
    </div>
  );
};

export default CommandHistory;
