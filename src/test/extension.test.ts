import * as assert from "assert";
import * as vscode from "vscode";
import { getDocUri, activate } from "./helper";

suite("Extension Test Suite", function () {
  this.timeout(5000);
  vscode.window.showInformationMessage("Start all tests.");
  const docUri = getDocUri("completion.llw");

  test("Completes code in a llw file", async () => {
    await testCompletion(docUri, new vscode.Position(5 - 1, 17 - 1), {
      items: [
        { label: "#1", kind: vscode.CompletionItemKind.Operator },
        { label: "'+'", kind: vscode.CompletionItemKind.Reference },
        { label: "'-'", kind: vscode.CompletionItemKind.Reference },
        { label: "?1", kind: vscode.CompletionItemKind.Operator },
        { label: "Minus", kind: vscode.CompletionItemKind.Reference },
        { label: "Plus", kind: vscode.CompletionItemKind.Reference },
        { label: "program", kind: vscode.CompletionItemKind.Reference },
      ],
    });
  });
});

// From https://github.com/microsoft/vscode-extension-samples/blob/main/lsp-sample/client/src/test/completion.test.ts
async function testCompletion(
  docUri: vscode.Uri,
  position: vscode.Position,
  expectedCompletionList: vscode.CompletionList,
) {
  await activate(docUri);

  // Move the cursor for autocomplete
  const editor = vscode.window.activeTextEditor!;
  editor.selections = [new vscode.Selection(position, position)];

  // Executing the command `vscode.executeCompletionItemProvider` to simulate triggering completion
  const actualCompletionList = (await vscode.commands.executeCommand(
    "vscode.executeCompletionItemProvider",
    docUri,
    position,
  )) as vscode.CompletionList;

  assert.ok(actualCompletionList.items.length >= 2);
  expectedCompletionList.items.forEach((expectedItem, i) => {
    const actualItem = actualCompletionList.items[i];
    // Only check the label text, the description could change
    assert.strictEqual(
      (actualItem.label as vscode.CompletionItemLabel).label,
      expectedItem.label,
    );
    assert.strictEqual(actualItem.kind, expectedItem.kind);
  });
}
