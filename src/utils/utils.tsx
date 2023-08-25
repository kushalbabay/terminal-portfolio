import { acceptedInputs, outputs } from "../models/models";

export const showCommandNotFoundMessage = (command: string) => {
  return (
    <pre>
      We could not find the command <span className="red">{command}</span>
      . <br />
      Type <span className="white">help</span> for all the available commands.
    </pre>
  );
};

export const showCommandOutput = (command: string) => {
  let output;
  switch (command) {
    case "help":
      output = outputs[command];
      break;
    default:
      output = (
        <pre>
          <span className="red">{command}</span> command is still under
          development.
          <br />
          Type <span className="white">help</span> for all the available
          commands.
        </pre>
      );
  }
  return output;
};

export const autoCompleteInput = (
  enteredInput: string,
  autoCompleteSuggestionIndex: number,
  setInputCommand: Function
) => {
  let acceptedInputsCopy = [...acceptedInputs.sort()];
  let foundIndex = -1;
  let modifiedAcceptedInputs = [
    ...acceptedInputsCopy.slice(autoCompleteSuggestionIndex),
    ...acceptedInputsCopy.slice(0, autoCompleteSuggestionIndex),
  ];

  let suggestion = modifiedAcceptedInputs.find((input) =>
    input.startsWith(enteredInput)
  );

  if (suggestion) {
    setInputCommand(suggestion);
    foundIndex = acceptedInputsCopy.indexOf(suggestion);
  }

  return foundIndex;
};
