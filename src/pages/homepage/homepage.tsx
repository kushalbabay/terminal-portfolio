import React, { useState, useEffect } from "react";
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
    document
      .querySelector(".empty-space")
      ?.scrollIntoView({ behavior: "smooth" });
  }, [outputStack]);

  const handleFullScreen = (isFullScreenTriggered: boolean) => {
    if (isFullScreenTriggered) {
      document.body.requestFullscreen();
      setTimeout(() => {
        setIsLoading(false);
      }, 250);
    } else {
      setIsLoading(false);
    }
  };

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
  };

  return (
    <div className="container">
      <AnimatePresence>
        {isLoading && <LoadingScreen handleFullScreen={handleFullScreen} />}
      </AnimatePresence>
      <div className="brand">
        <pre>
          {`
 █████   ████                    █████                ████   ██        
░░███   ███░                    ░░███                ░░███  ███        
 ░███  ███    █████ ████  █████  ░███████    ██████   ░███ ░░░   █████ 
 ░███████    ░░███ ░███  ███░░   ░███░░███  ░░░░░███  ░███      ███░░  
 ░███░░███    ░███ ░███ ░░█████  ░███ ░███   ███████  ░███     ░░█████ 
 ░███ ░░███   ░███ ░███  ░░░░███ ░███ ░███  ███░░███  ░███      ░░░░███
 █████ ░░████ ░░████████ ██████  ████ █████░░████████ █████     ██████ 
░░░░░   ░░░░   ░░░░░░░░ ░░░░░░  ░░░░ ░░░░░  ░░░░░░░░ ░░░░░     ░░░░░░  
                                                                       
                                                                       
                                                                       
`}
        </pre>
        {/* <pre>
          {`
                                                  
                                        
                    .............       
                  .....~^:..    ..      
                 ...7PB#BBG5J~          
                 ..?GGGBBBBPY!:         
                .:!B57^:YY~^:.:         
                 Y7B#G5P#J!!^::         
                 :?P###GG??PY!.         
                  :?PPPJ!:^7~.          
                  :!!55J7^...           
                 .?P7~!~^:..            
               ^:7BBG5~.....            
           ..:.::^P#GPJ~:..  .          
       ..:::::..:::YBBGGP^     . .      
     .::::::::::::..^?GJ:        ....   
    .::.:::::::::::::.^..............   
   ........::::::::::.:...........      
  ..........::::::::............        

          `}
        </pre> */}
        <br />
      </div>
      Built with{" "}
      <a target="_blank" href="https://www.gatsbyjs.com/" className="link">
        Gatsby.js
      </a>{" "}
      &&nbsp;<span className="red">&#10084;</span>
      <br />
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
