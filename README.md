# Lelwel for Visual Studio Code

This extension provides [lelwel](https://github.com/0x2a-42/lelwel) language support for VS Code/VSCodium, powered by WebAssembly.


## Features

- Syntax highlighting for `.llw` files
- Language server integration via `lelwel-ls`
- Diagnostics and structure-aware feedback

## Advanced: Native Language Server

You can install the native `lelwel-ls` via cargo:

```sh
cargo install --features="lsp" lelwel
```
