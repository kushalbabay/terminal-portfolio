import React, { useState, useEffect, useContext } from "react";
import { AnimatePresence } from "framer-motion";
import { CommandContext } from "../../contexts/CommandContext";
import InputLine from "../../components/inputline/inputline";
import Output from "../../components/output/output";
import LoadingScreen from "../../components/loading/loading";
import CommandHistory from "../../components/commandHistory/commandHistory";
import "./homepage.scss";

const Homepage: React.FC = () => {
  const [outputCommandStack, setOutputCommandStack] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isHistoryShown, setIsHistoryShown] = useState(false);
  const { commands, setCommands } = useContext(CommandContext);

  useEffect(() => {
    document.querySelector(".empty-space")?.scrollIntoView();
  }, [outputCommandStack]);

  const handleCommand = (command: string) => {
    if (["cls", "clr", "clear"].includes(command)) {
      setOutputCommandStack([]);
    } else if (command.toLowerCase() === "history") {
      setIsHistoryShown(true);
    } else {
      setOutputCommandStack([...outputCommandStack, command]);
    }
  };

  return (
    <div className="container">
      <AnimatePresence>
        {isLoading && <LoadingScreen setIsLoading={setIsLoading} />}
      </AnimatePresence>
      {!isLoading && (
        <>
          <div className="output-stack">
            {outputCommandStack.map((command, index) => {
              return (
                <div className="output" key={index}>
                  <Output command={command} />
                </div>
              );
            })}
          </div>
          {!isHistoryShown ? (
            <InputLine handleCommand={handleCommand} />
          ) : (
            <CommandHistory
              setCommands={setCommands}
              setIsHistoryShown={setIsHistoryShown}
              history={commands}
            />
          )}
          <div className="empty-space"> </div>
        </>
      )}
    </div>
  );
};

export default Homepage;
