import React, { useEffect, useState } from "react";
import InputLine from "../../components/inputline/inputline";
import { acceptedInputs } from "../../models/models";
import {
  showCommandNotFoundMessage,
  showCommandOutput,
} from "../../utils/utils";
import "./homepage.scss";
import Output from "../../components/output/output";
import LoadingScreen from "../../components/loading/loading";
import { AnimatePresence } from "framer-motion";

const Homepage: React.FC = () => {
  const [outputStack, setOutputStack] = useState<React.ReactNode[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setIsLoading(false);
    }, 5000);
  }, []);

  const handleCommand = (command: string) => {
    let message;
    if (["cls", "clr", "clear"].includes(command)) {
      setOutputStack([]);
    } else {
      if (!acceptedInputs.includes(command)) {
        // doFuzzySearch()
        message = showCommandNotFoundMessage(command);
      } else {
        message = showCommandOutput(command);
      }
      setOutputStack([
        ...outputStack,
        <Output command={command}>{message}</Output>,
      ]);
    }
    document.querySelector(".empty-space")?.scrollIntoView();
  };

  return (
    <div className="container">
      <AnimatePresence>{isLoading && <LoadingScreen />}</AnimatePresence>
      <div className="brand">
        <pre>
          {`
##    ## ##     ##  ######  ##     ##    ###    ##       ####  ######  
##   ##  ##     ## ##    ## ##     ##   ## ##   ##       #### ##    ## 
##  ##   ##     ## ##       ##     ##  ##   ##  ##        ##  ##       
#####    ##     ##  ######  ######### ##     ## ##       ##    ######  
##  ##   ##     ##       ## ##     ## ######### ##                  ## 
##   ##  ##     ## ##    ## ##     ## ##     ## ##            ##    ## 
##    ##  #######   ######  ##     ## ##     ## ########       ######  
            `}
        </pre>
        Built with{" "}
        <a target="_blank" href="https://www.gatsbyjs.com/" className="link">
          Gatsby.js
        </a>{" "}
        &&nbsp;<span className="red">&#10084;</span>
        <br />
        <br />
      </div>
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
