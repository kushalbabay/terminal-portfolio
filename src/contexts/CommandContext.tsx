import React, { createContext, useState } from "react";

interface ICommandContext {
  commands: string[];
  setCommands: React.Dispatch<React.SetStateAction<string[]>>;
}

export const CommandContext = createContext<ICommandContext>({
  commands: [],
  setCommands: () => {},
});

interface ContextPropTypes {
  children: React.ReactNode;
}

const CommandProvider: React.FC<ContextPropTypes> = ({ children }) => {
  const [commands, setCommands] = useState<Array<string>>(["welcome"]);
  return (
    <CommandContext.Provider value={{ commands, setCommands }}>
      {children}
    </CommandContext.Provider>
  );
};

export default CommandProvider;
