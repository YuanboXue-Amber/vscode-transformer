// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import * as vscode from 'vscode';
import * as Prism from 'prismjs';
import {transformStylesObject} from 'v9helper-transform-style-object';
import * as v9helper from 'v9helper'

// this method is called when your extension is activated
// your extension is activated the very first time the command is executed
export function activate(context: vscode.ExtensionContext) {

	
	// Use the console to output diagnostic information (console.log) and errors (console.error)
	// This line of code will only be executed once when your extension is activated
	console.log('Congratulations, your extension "transformer" is now active!');

	// The command has been defined in the package.json file
	// Now provide the implementation of the command with registerCommand
	// The commandId parameter must match the command field in package.json
	// let disposable = 
	
	// vscode.commands.registerCommand('transformer.t', () => {
	// 	const editor = vscode.window.activeTextEditor;
    
	// 	console.log('filename:', vscode.window.activeTextEditor?.document.fileName)
	// 	main({ inputFilename: vscode.window.activeTextEditor?.document.fileName, exportName: 'result', isTransformAllThemes: true})
	// 	var selection = editor?.selection;
	// 	var text = editor?.document.getText(selection);
		
	// 	const panel = vscode.window.createWebviewPanel('transformer', 'Transformer', vscode.ViewColumn.Beside, {
	// 		retainContextWhenHidden: true,
	// 		enableScripts: true
	// 	});

		
	// 	panel.webview.html = getWebviewContent(`${transformStylesObject(text)}`, panel, context);

	// 	vscode.window.onDidChangeTextEditorSelection((ev) => {
	// 		panel.webview.html = getWebviewContent(`${transformStylesObject(ev.textEditor.document.getText(ev.textEditor.selection))}`, panel, context);
	// 	});

	// });

	let disposable = vscode.commands.registerCommand('transformer.helloWorld', async () => {
		// console.log(vscode.window.activeTextEditor?.document.uri);
		const fn = v9helper.main({
			exportName: 'default',
			inputFilename: vscode.window.activeTextEditor?.document.uri.path,
			isTransformAllThemes: true
		})
		console.log('command: ', fn);
		console.log('v9helper', v9helper)
	  });

	context.subscriptions.push(disposable);
	
}

function getWebviewContent(text: string, panel:vscode.WebviewPanel, context:vscode.ExtensionContext) {
	const prismStyles = panel.webview.asWebviewUri(vscode.Uri.joinPath(
		context.extensionUri, 'src/styles', 'prism.css'));
	const styles = panel.webview.asWebviewUri(vscode.Uri.joinPath(
			context.extensionUri, 'src/styles', 'styles.css'));

	
	return `<!DOCTYPE html>
<html lang="en">
<head>
		<meta charset="UTF-8">
		<meta name="viewport" content="width=device-width, initial-scale=1.0">
		<link href="${prismStyles}" rel="stylesheet" />  
		<link href="${styles}" rel="stylesheet" />  
		<title>makeStyles</title>
</head>
<body>
	<main>
		<div class="actions">
			<button class="btn" onclick="copyData(code)">&#x274F; Click to copy</button>
		</div>
		<pre class="code" id="code">${Prism.highlight(text, Prism.languages.javascript, 'javascript')}</pre>
	</main>
	<script>
		function copyData(containerid) {
			var range = document.createRange();
			range.selectNode(containerid); //changed here
			window.getSelection().removeAllRanges(); 
			window.getSelection().addRange(range); 
			document.execCommand("copy");
			window.getSelection().removeAllRanges();
		}
	</script>
</body>
</html>`;
}



// this method is called when your extension is deactivated
export function deactivate() {}
