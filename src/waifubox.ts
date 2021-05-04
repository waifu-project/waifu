import * as vscode from 'vscode'
import fetch from 'node-fetch'
import { waifuImageType } from './interface';
import hk from './hitokoto';
import rw from './rw';

export default class waifubox {

  private baseAPI = "https://waifu.pics/api"

  private waifuTags = {
    "sfw": [
      "awoo",
      "bite",
      "blush",
      "blush",
      "bonk",
      "bully",
      "cringe",
      "cry",
      "cuddle",
      "dance",
      "glomp",
      "handhold",
      "happy",
      "highfive",
      "hug",
      "kill",
      "kiss",
      "lick",
      "megumin",
      "neko",
      "nom",
      "pat",
      "poke",
      "shinobu",
      "slap",
      "smile",
      "smile",
      "smug",
      "waifu",
      "wave",
      "wave",
      "wink",
      "yeet"
    ],
    "nsfw": [
      "waifu",
      "neko",
      "trap",
      "blowjob"
    ]
  }

  private getRandom = (items: string[]): string=> {
    return items[Math.floor(Math.random() * items.length)]
  }

  public async getImage(iType: waifuImageType): Promise<string> {
    let action: string = `sfw`
    if (iType == waifuImageType.nsfw) {
      action = `nsfw`
    }
    const oftype: string[] = (this.waifuTags as any)[action]
    const endpoint = this.getRandom(oftype)
    try {
      const api = `${ this.baseAPI }/${ action }/${ endpoint }`
      const data =  await (await fetch(api)).text()
      const { url } = JSON.parse(data)
      return url
    } catch (error) {
      console.error(error)
      return ""
    }
  }

  public static async getText(ctx: vscode.ExtensionContext): Promise<string> {
    const handleFlag = vscode.workspace.getConfiguration().get(`waifu.textUseHitokoto`)
    if (handleFlag) {
      return await hk.get()
    }
    const r = rw.read(ctx)
    const arr = r.split('\n')
    return (new waifubox).getRandom(arr)
  }

  public static async show(ctx: vscode.ExtensionContext) {

    const page = vscode.window.createWebviewPanel(`wiafu`, `waifu`, vscode.ViewColumn.Two, {
			enableScripts: true,
			retainContextWhenHidden: true,
		})

    const title = await waifubox.getText(ctx)

		const waifu = new waifubox
		const image = await waifu.getImage(0)

		page.webview.html = waifubox.generateHtml(title, image)

  }

  public static generateHtml(title: string, image: string): string {
    let html = `<!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>waifu</title>
    </head>
    <body>
      <p>${ title }</p>
      <img src="${ image }">
    </body>
    </html>`;

    return html;
  }

}