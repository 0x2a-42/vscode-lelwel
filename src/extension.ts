import * as path from 'path';
import { ExtensionContext } from 'vscode';

import {
  LanguageClient,
  LanguageClientOptions,
  ServerOptions
} from 'vscode-languageclient/node';


let client: LanguageClient;

export function activate(context: ExtensionContext) {
  let serverOptions: ServerOptions = {
    run: { command: 'lelwel-ls' },
    debug: { command: 'lelwel-ls' }
  };

  let clientOptions: LanguageClientOptions = {
    documentSelector: [{ scheme: 'file', language: 'lelwel' }],
  };

  client = new LanguageClient(
    'lelwelLanguageServer',
    'lelwel language server',
    serverOptions,
    clientOptions
  );

  client.start();
}

export function deactivate(): Thenable<void> | undefined {
  if (!client) {
    return undefined;
  }
  return client.stop();
}
