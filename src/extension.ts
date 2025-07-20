import { ExtensionContext, Uri, workspace, window } from "vscode";
import {
  LanguageClient,
  LanguageClientOptions,
  ServerOptions,
} from "vscode-languageclient/node";
import { Wasm, ProcessOptions } from "@vscode/wasm-wasi/v1";
import {
  createStdioOptions,
  createUriConverters,
  startServer,
} from "@vscode/wasm-wasi-lsp";

const NATIVE_LELWEL_CONFIGURATION = "lelwel.nativeLsp";

let client: LanguageClient;

export async function activate(context: ExtensionContext) {
  await startLsp(context);

  // Enforces that startLsp cannot run concurrently
  // Used to avoid race conditions when rapidly clicking the checkbox.
  let updateClientSync = Promise.resolve();
  context.subscriptions.push(
    workspace.onDidChangeConfiguration((e) => {
      if (e.affectsConfiguration(NATIVE_LELWEL_CONFIGURATION)) {
        updateClientSync = updateClientSync.then(() => startLsp(context));
      }
    }),
  );
}

function useNativeLelwel(): boolean {
  const currentDocument = window.activeTextEditor?.document;
  const value: any = workspace
    .getConfiguration("", currentDocument?.uri)
    .get(NATIVE_LELWEL_CONFIGURATION);

  return !!value;
}

async function startLsp(context: ExtensionContext) {
  await client?.stop();

  let serverOptions: ServerOptions;
  let clientOptions: LanguageClientOptions = {
    documentSelector: [{ scheme: "file", language: "lelwel" }],
  };

  if (useNativeLelwel()) {
    serverOptions = {
      run: { command: "lelwel-ls" },
      debug: { command: "lelwel-ls" },
    };
  } else {
    const wasm: Wasm = await Wasm.load();
    const channel = window.createOutputChannel("Lelwel WASM LS");

    serverOptions = async () => {
      const options: ProcessOptions = {
        stdio: createStdioOptions(),
        mountPoints: [{ kind: "workspaceFolder" }],
      };
      const filename = Uri.joinPath(
        context.extensionUri,
        "server",
        "lelwel-ls.wasm",
      );
      const bits = await workspace.fs.readFile(filename);
      const module = await WebAssembly.compile(bits);
      const process = await wasm.createProcess(
        "lelwel-ls",
        module,
        // Must correspond to the Rust `--initial-memory` and `--max-memory` flags
        // e.g. --initial-memory=10485760 == 160 (multiplied by 65536)
        // See CONTRIBUTING.md
        { initial: 160, maximum: 2000, shared: true },
        options,
      );

      const decoder = new TextDecoder("utf-8");
      process.stderr!.onData((data) => {
        channel.append(decoder.decode(data));
      });

      return startServer(process);
    };

    clientOptions.outputChannel = channel;
    clientOptions.uriConverters = createUriConverters();
  }

  client = new LanguageClient(
    "lelwelLanguageServer",
    "lelwel language server",
    serverOptions,
    clientOptions,
  );
  try {
    await client.start();
  } catch (error) {
    client.error(`Start failed`, error, "force");
  }
}

export function deactivate(): Thenable<void> | undefined {
  if (!client) {
    return undefined;
  }
  return client.stop();
}
