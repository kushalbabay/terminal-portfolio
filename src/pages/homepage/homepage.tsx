import React, { useState, useEffect, useContext } from "react";
import InputLine from "../../components/inputline/inputline";
import { acceptedInputs } from "../../models/models";
import {
  doFuzzySearch,
  showCommandNotFoundMessage,
  showCommandOutput,
} from "../../utils/utils";
import "./homepage.scss";
import Output from "../../components/output/output";
import LoadingScreen from "../../components/loading/loading";
import { CommandContext } from "../../contexts/CommandContext";
import { AnimatePresence } from "framer-motion";
import CommandHistory from "../../components/commandHistory/commandHistory";

const Homepage: React.FC = () => {
  const [outputStack, setOutputStack] = useState<React.ReactNode[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isHistoryShown, setIsHistoryShown] = useState(false);
  const { commands, setCommands } = useContext(CommandContext);

  useEffect(() => {
    document.body.addEventListener("keydown", (e) => {
      if (["ArrowUp", "ArrowDown"].includes(e.key)) {
        e.preventDefault();
      }
    });
  }, []);

  useEffect(() => {
    document.querySelector(".empty-space")?.scrollIntoView();
  }, [outputStack]);

  const handleFullScreen = (isFullScreenTriggered: boolean) => {
    if (isFullScreenTriggered) {
      document.body.requestFullscreen();
    }
    setIsLoading(false);
  };

  const handleCommand = (command: string) => {
    let message;
    if (["cls", "clr", "clear"].includes(command)) {
      setOutputStack([]);
    } else if (command.toLowerCase() === "history") {
      setIsHistoryShown(true);
    } else {
      if (!acceptedInputs.includes(command)) {
        message = showCommandNotFoundMessage(command, doFuzzySearch(command));
      } else {
        message = showCommandOutput(command);
      }
      setOutputStack([
        ...outputStack,
        <Output command={command}>{message}</Output>,
      ]);
    }
  };

  return (
    <div className="container">
      <AnimatePresence>
        {isLoading && <LoadingScreen handleFullScreen={handleFullScreen} />}
      </AnimatePresence>
      {!isLoading && (
        <>
          <div className="output-stack">
            {outputStack.map((output, index) => {
              return (
                <div className="output" key={index}>
                  {output}
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
          <div className="empty-space"></div>
        </>
      )}
    </div>
  );
};

export default Homepage;
