import React from "react";

export const acceptedInputs = [
  "help",
  "about",
  "skills",
  "contacts",
  "projects",
  "clr",
  "cls",
  "clear",
];

export const outputs = {
  help: (
    <pre>
      We could not find the command <span className="red">help</span>
      . <br />
      Type <span className="white">help</span> for the available commands.
    </pre>
  ),
};
