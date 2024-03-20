## gemini code assistant for VScode/VScodium

Source code is taken and imporved from [Google's Generative AI DOcS](https://github.com/google/generative-ai-docs/tree/main/demos/palm/node/pipet-code-agent), read more on how to get your API keys over there.

## using this extension 

- Clone the repo: 

```bash
git clone https://github.com/potatomat0/vscode-ai-assistant
cd vscode-ai-assistant
npm install
```

symlink, or move the folder to your vscode/vscode extension folder. on linux, this is usually ~/.vscode-oss/extensions for vscode-oss and ~/.vscode/extensions for vscode

```bash
ln -s /path/to/pipet-code-agent/ /path/to/.vscode-oss/extensions/ 
# or 
mv /path/to/pipet-code-agent/ /path/to/.vscode-oss/extensions/ 
```