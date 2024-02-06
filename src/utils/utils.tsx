import { acceptedInputs, outputs } from "../models/models";

export const showCommandNotFoundMessage = (command: string) => {
  let suggestion = doFuzzySearch(command);
  return (
    <pre>
      We could not find the command <span className="red">{command}</span>
      . <br />
      {suggestion && (
        <>
          Did you mean <span className="white">{suggestion}</span> instead ?
          <br />
        </>
      )}
      Type <span className="white">help</span> for all the available commands.
    </pre>
  );
};

export const showCommandOutput = (command: string) => {
  let output;
  switch (command) {
    case "help":
    case "welcome":
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

export const doFuzzySearch = (keyword: string) => {
  let acceptedInputsList = acceptedInputs;
  let minDistance = Infinity;
  let closestMatch: string = "";

  for (const str of acceptedInputsList) {
    const distance = levenshteinDistance(keyword, str);
    if (distance < 2 && distance < minDistance) {
      minDistance = distance;
      closestMatch = str;
    }
  }

  return closestMatch;
};

function levenshteinDistance(a: string, b: string): number {
  const matrix = Array.from({ length: a.length + 1 }, (_, i) =>
    Array.from({ length: b.length + 1 }, (_, j) =>
      i === 0 ? j : j === 0 ? i : 0
    )
  );

  for (let i = 1; i <= a.length; i++) {
    for (let j = 1; j <= b.length; j++) {
      const cost = a[i - 1] === b[j - 1] ? 0 : 1;
      matrix[i][j] = Math.min(
        matrix[i - 1][j] + 1,
        matrix[i][j - 1] + 1,
        matrix[i - 1][j - 1] + cost
      );
    }
  }

  return matrix[a.length][b.length];
}
