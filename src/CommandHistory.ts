import { Command } from "./abstracts/Command";

export class CommandHistory {
    private readonly commands: Command[] = [];
    private currentCommandIndex = -1;

    execute(command: Command): void {
        command.execute();
        this.commands.splice(this.currentCommandIndex + 1);
        this.commands.push(command);
        this.currentCommandIndex++;
    }

    undo(): void {
        if (this.currentCommandIndex < 0) {
            return;
        }
        const command = this.commands[this.currentCommandIndex];
        command.undo();
        this.currentCommandIndex--;
    }

    redo(): void {
        if (this.currentCommandIndex >= this.commands.length - 1) {
            return;
        }
        const command = this.commands[this.currentCommandIndex + 1];
        command.execute();
        this.currentCommandIndex++;
    }
}