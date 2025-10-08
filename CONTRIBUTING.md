# Running the extension for Development

To run and test the extension locally in development mode:

```sh
git clone https://github.com/0x2a-42/vscode-lelwel.git
cd vscode-lelwel
npm install
npm run compile
```

## Dependencies

- Rust with wasi threads
  - `rustup target add wasm32-wasip1-threads`
- Node.js with npm

## Get up and running straight away

* Press `F5` to open a new window with the extension loaded.
* Open a .llw file in that window to test the extension.
* Set breakpoints in the code inside `src/extension.ts` to debug the extension.
* Find output from the extension in the debug console.

## Make changes

* You can relaunch the extension from the debug toolbar after changing code in `src/extension.ts`.
* You can also reload (`Ctrl+R` or `Cmd+R` on Mac) the VS Code window with the extension to load your changes.

## Run tests

* Install the [Extension Test Runner](https://marketplace.visualstudio.com/items?itemName=ms-vscode.extension-test-runner)
* Run the "watch" task via the **Tasks: Run Task** command. Make sure this is running, or tests might not be discovered.
* Open the Testing view from the activity bar and click the Run Test" button, or use the hotkey `Ctrl/Cmd + ; A`
* See the output of the test result in the Test Results view.
* Make changes to `src/test/extension.test.ts` or create new test files inside the `test` folder.
  * The provided test runner will only consider files matching the name pattern `**.test.ts`.
  * You can create folders inside the `test` folder to structure the tests any way you want.


## Getting the lelwel binary

The lelwel binary is automatically built when you run `npm run compile`

To update it, update the git submodule and rerun `npm run compile`

## Building the extension

To build a `.vsix` from the extension, you need the [@vscode/vsce](https://code.visualstudio.com/api/working-with-extensions/publishing-extension) package. Then you build a package of it.

```bash
npm install -g @vscode/vsce
vsce package
```