import React, { useState, useEffect } from "react";
import "./commandHistory.scss";
import { commandLineText } from "../../models/models";

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

  useEffect(() => {
    document.getElementById("history_container")?.focus();
  }, []);

  const handleSelectionChange = (event: React.KeyboardEvent) => {
    event.preventDefault();
    if (event.key === "ArrowUp") {
      if (selectedIndex !== 0) {
        setSelectedIndex(selectedIndex - 1);
      }
    } else if (event.key === "ArrowDown") {
      if (selectedIndex !== filteredHistory.length - 1) {
        setSelectedIndex(selectedIndex + 1);
      }
    } else if (event.key === "Enter") {
      const selectedCommand = filteredHistory[selectedIndex];
      setCommands([...history, selectedCommand]);
      setIsHistoryShown(false);
    } else if (event.key === "Escape") {
      setIsHistoryShown(false);
    }
  };

  return (
    <div
      tabIndex={0}
      onKeyUp={(e) => handleSelectionChange(e)}
      className="history__container"
      id="history_container"
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
