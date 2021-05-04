import * as vscode from "vscode";
import waifubox from "./waifubox";

export class Scheduler {
  public constructor(private context: vscode.ExtensionContext) {
  }

  public start() {
    setInterval(() => {
      waifubox.show(this.context)
    }, 1000 * 60 * vscode.workspace.getConfiguration().get<number>('waifu.reminderViewIntervalInMinutes', 15));
  }
}