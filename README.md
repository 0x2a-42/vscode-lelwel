# vscode-lelwel

This extension provides [lelwel](https://github.com/0x2a-42/lelwel) language support for VS Code/VSCodium

## Language Server Setup

Install `lelwel-ls` via cargo:

```sh
cargo install --features="lsp" lelwel
```

## Running for Development

To run and test the extension locally in development mode:

```sh
git clone https://github.com/0x2a-42/vscode-lelwel.git
cd vscode-lelwel
npm install
npm run compile
```

Then open `src/extension.ts` and press F5 (or select \*Run → Start Debugging\*) to launch a new \*Extension Development Host\* window.

Open a .llw file in that window to test the extension.
