import * as vscode from 'vscode';
import { GoogleGenerativeAI } from '@google/generative-ai';

// Provide instructions for the AI language model
// This approach uses a few-shot technique, providing a few examples.
const CODE_LABEL = 'Here are the instructions';
const OUTPUT_LABEL = 'Here is the code:';
const PROMPT = `Write the following code into the programming langugage the prompt has requested, 
dont put them in a mark down code block, write the entire code, with proper formatting of course,
write comments that explain the code
write more in the comments if the code needs to be implemented somewhere else too
. For example:${CODE_LABEL} Write a python implementation of bubble sort
${OUTPUT_LABEL}
def bubble_sort(arr):
  """
  Bubble sort algorithm implementation in Python.

  Parameters:
    arr: The array to be sorted.

  Returns:
    The sorted array.
  """

  n = len(arr)

  # Iterate over the array n times
  for i in range(n):

    # Track if any swaps were made during this iteration
    swapped = False

    # Iterate over the unsorted portion of the array
    for j in range(0, n - i - 1):

      # Compare the current element with the next element
      if arr[j] > arr[j + 1]:
        # Swap the elements if they are out of order
        arr[j], arr[j + 1] = arr[j + 1], arr[j]
        swapped = True

    # If no swaps were made during this iteration, the array is sorted
    if not swapped:
      break

  return arr
${CODE_LABEL}write a typescript reactjs component of a button that increments the number inside, that starts with 1, whenever it is clicked, export it as button
${OUTPUT_LABEL}
import * as React from "react";

export const Button = () => {
  const [count, setCount] = React.useState(1);

  const handleClick = () => {
    setCount(count + 1);
  };

  return (
    <button onClick={handleClick}>
      {count}
    </button>
  );
};

here's how to import it: 

import { Button } from "./Button";

const App = () => {
  return (
    <div>
      <Button />
    </div>
  );
};
`;

export async function generateCode() {
  vscode.window.showInformationMessage('Generating code...');

  const modelName = vscode.workspace.getConfiguration().get<string>('google.gemini.textModel', 'models/gemini-1.0-pro-latest');

  // Get API Key from local user configuration
  const apiKey = vscode.workspace.getConfiguration().get<string>('google.gemini.apiKey');
  if (!apiKey) {
    vscode.window.showErrorMessage('API key not configured. Check your settings.');
    return;
  }

  const genai = new GoogleGenerativeAI(apiKey);
  const model = genai.getGenerativeModel({ model: modelName });

  // Text selection
  const editor = vscode.window.activeTextEditor;
  if (!editor) {
    console.debug('Abandon: no open text editor.');
    return;
  }

  const selection = editor.selection;
  const selectedCode = editor.document.getText(selection);

  // Build the full prompt using the template.
  const fullPrompt = `${PROMPT}${CODE_LABEL}${selectedCode}`;

  const result = await model.generateContent(fullPrompt);
  const response = await result.response;
  const generatedCode = response.text();

  // Insert before selection.
  editor.edit((editBuilder) => {
    editBuilder.insert(selection.end, generatedCode);
  });
}