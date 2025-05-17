# vscode-lelwel

This extension provides [lelwel](https://github.com/0x2a-42/lelwel) language support for VS Code/VSCodium

## Features

- Syntax highlighting for `.llw` files
- Language server integration via `lelwel-ls`
- Diagnostics and structure-aware feedback

## Language Server Setup

Install `lelwel-ls` via cargo:

```sh
cargo install --features="lsp" lelwel
```
