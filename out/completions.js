"use strict";
/*---------------------------------------------------------
 * Copyright (C) Microsoft Corporation. All rights reserved.
 *--------------------------------------------------------*/
Object.defineProperty(exports, "__esModule", { value: true });
exports.activate = void 0;
const vscode = require("vscode");
function activate(context) {
    const provider1 = vscode.languages.registerCompletionItemProvider('egg', {
        provideCompletionItems(document, position, token, context) {
            // a simple completion item which inserts `Hello World!`
            const simpleCompletion = new vscode.CompletionItem('Hello World!');
            // a completion item that inserts its text as snippet,
            // the `insertText`-property is a `SnippetString` which will be
            // honored by the editor.
            //const snippetCompletion = new vscode.CompletionItem('<Scalar>');
            //snippetCompletion.insertText = new vscode.SnippetString('<Scalar> ${1|alpha,fps,minfilter,magfilter,wrap|}');
            //snippetCompletion.documentation = new vscode.MarkdownString("Inserts a snippet that lets you select the _appropriate_ part of the day for your greeting.");
            // a completion item that retriggers IntelliSense when being accepted,
            // the `command`-property is set which the editor will execute after
            // completion has been inserted. Also, the `insertText` is set so that
            // a space is inserted after `new`
            const scalarCompletion = new vscode.CompletionItem('Scalar');
            scalarCompletion.kind = vscode.CompletionItemKind.Keyword;
            scalarCompletion.insertText = 'Scalar';
            //scalarCompletion.command = { command: 'editor.action.triggerSuggest', title: 'Re-trigger completions...' };
            const linePrefix = document.lineAt(position).text;
            console.log(linePrefix);
            if (linePrefix.trimStart().startsWith('<Scalar>')) {
                // a completion item that can be accepted by a commit character,
                // the `commitCharacters`-property is set which means that the completion will
                // be inserted and then the character will be typed.
                const scalarAlphaCompletion = new vscode.CompletionItem('alpha');
                scalarAlphaCompletion.insertText = new vscode.SnippetString('alpha {${1| dual , blend , blend_no_occlude , ms , ms_mask , binary , on , off |}}');
                scalarAlphaCompletion.documentation = new vscode.MarkdownString('This specifies whether and what type of transparency will be performed.\nIf alpha-type is OFF, it means not to enable transparency, even if the image contains an alpha channel or the format is RGBA.\nIf alpha-type is ON, it means to enable the default transparency, even if the image filename does not contain an alpha channel.');
                const scalarFpsCompletion = new vscode.CompletionItem('fps');
                scalarFpsCompletion.insertText = new vscode.SnippetString('fps { ${1} }');
                const scalarMinfilterCompletion = new vscode.CompletionItem('minfilter');
                scalarMinfilterCompletion.insertText = new vscode.SnippetString('minfilter { ${1} }');
                const scalarMagfilterCompletion = new vscode.CompletionItem('magfilter');
                scalarMagfilterCompletion.insertText = new vscode.SnippetString('magfilter { ${1} }');
                // return all completion items as array
                return [
                    scalarAlphaCompletion,
                    scalarFpsCompletion,
                    scalarMinfilterCompletion,
                    scalarMagfilterCompletion
                ];
            }
            return [scalarCompletion];
        }
    });
    const provider2 = vscode.languages.registerCompletionItemProvider('plaintext', {
        provideCompletionItems(document, position) {
            // get all text until the `position` and check if it reads `console.`
            // and if so then complete if `log`, `warn`, and `error`
            const linePrefix = document.lineAt(position).text.substr(0, position.character);
            if (!linePrefix.endsWith('console.')) {
                return undefined;
            }
            return [
                new vscode.CompletionItem('log', vscode.CompletionItemKind.Method),
                new vscode.CompletionItem('warn', vscode.CompletionItemKind.Method),
                new vscode.CompletionItem('error', vscode.CompletionItemKind.Method),
            ];
        }
    }, '.' // triggered whenever a '.' is being typed
    );
    context.subscriptions.push(provider1, provider2);
}
exports.activate = activate;
//# sourceMappingURL=completions.js.map