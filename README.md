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

## Getting the lelwel binary

To get or update the lelwel wasm binary, check out the lelwel repository at the desired commit, and run
```
cargo rustc --features=lsp --bin=lelwel-ls --release --target wasm32-wasip1-threads -- -Clink-arg=--initial-memory=10485760 -Clink-arg=--max-memory=10485760
```

Then, copy the generated binary from `/target/wasm32-wasip1-threads/release/lelwel-ls.wasm` to the `/server` folder. Create one if it does not exist.
