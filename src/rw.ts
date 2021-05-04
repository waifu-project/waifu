import * as fs from 'fs'
import * as vscode from 'vscode'
import * as path from 'path'

const writeEmptyFile = (filePath: string)=> {
  if (fs.existsSync(filePath)) return true
  var data = '';
  fs.writeFileSync(filePath, data)
  return true;
}


export default class rw {

  static file = `./input.txt`

  static getFile = (ctx: vscode.ExtensionContext)=> {
    return path.join(ctx.extensionPath, rw.file)
  }

  static read(ctx: vscode.ExtensionContext): string {
    try {
      return fs.readFileSync(rw.getFile(ctx)).toString() 
    } catch (error) {
      console.error(error)
      return ""
    }
  }

  static write(ctx: vscode.ExtensionContext, rawstr: string): boolean {
    const file = rw.getFile(ctx)
    if (!fs.existsSync(file)) {
      writeEmptyFile(file)
    }
    fs.writeFileSync(file, rawstr)
    return true
  }

}