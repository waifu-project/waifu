import * as vscode from 'vscode'
import rw from './rw'
import { Scheduler } from './time'
import waifubox from './waifubox'

export function activate(context: vscode.ExtensionContext) {

	;(new Scheduler(context)).start()

	let disposable = vscode.commands.registerCommand('waifu.showUI', async () => {
		waifubox.show(context)
	})

	let changeAction = vscode.commands.registerCommand('waifu.changeTexts', ()=> {
		const pan = vscode.window.createWebviewPanel('waifu', 'waifu title', vscode.ViewColumn.Two, {
			enableScripts: true,
			retainContextWhenHidden: true,
		})
		const subtext = rw.read(context)
		pan.webview.html = `
		<!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>waifu</title>
			<style>
				.content {
					width: 100%;
					height: 88vh;
					min-height: 100%;
					resize: none;
					overflow-y: auto;
					border-radius: 3px;
					box-sizing: border-box;
					border: none;
					padding: .7em .8em;
					color: #333;
					font-size: 1.1em;
				}
			</style>
    </head>
    <body>
			<textarea class="content" id="push">${ subtext }</textarea>
    </body>
		<script>
			const vscode = acquireVsCodeApi()
			const push = document.getElementById("push")
			push.addEventListener('input', updateValue);
			function updateValue(e) {
				const value = e.target.value;
				vscode.postMessage({
					command: 'change',
					text: value
				})
			}
		</script>
    </html>
		`

		pan.webview.onDidReceiveMessage(message => {
			switch (message.command) {
				case 'change':
					const text = message.text
					rw.write(context, text)
			}
		}, undefined, context.subscriptions);

	})

	context.subscriptions.push(disposable)
	context.subscriptions.push(changeAction)
}

export function deactivate() {}
