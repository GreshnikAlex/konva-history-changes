import Konva from 'konva';
import { Layer } from 'konva/lib/Layer';
import { Stage } from 'konva/lib/Stage';
import { CommandHistory } from './CommandHistory';
import { DrawCommand } from './commands/DrawCommand';

export class DrawController {
    private stage: Stage;
    private layer: Layer;

    constructor(containerId: string) {
        const container = document.getElementById(containerId);
        this.stage = new Konva.Stage({
            container: containerId,
            width: container?.offsetWidth ?? 200,
            height: container?.offsetHeight ?? 200,
        });
        this.layer = new Konva.Layer();
        this.stage.add(this.layer);

        const commandHistory = new CommandHistory();

        // Обработчик события рисования
        let isDrawing = false;
        let lastLine: Konva.Line | null = null;

        this.stage.on('mousedown', () => {
            isDrawing = true;
            const pos = this.stage.getPointerPosition();
            if (!pos) {
                return;
            }
            lastLine = new Konva.Line({
                stroke: 'black',
                strokeWidth: 2,
                points: [pos.x, pos.y],
            });
            commandHistory.execute(new DrawCommand(this.layer, lastLine));
        });

        this.stage.on('mousemove', () => {
            if (!isDrawing) {
                return;
            }
            const pos = this.stage.getPointerPosition();
            if (!pos) {
                return;
            }
            const newPoints = (lastLine?.points() ?? []).concat([pos.x, pos.y]);
            lastLine?.points(newPoints);
            this.layer.draw();
        });

        this.stage.on('mouseup', () => {
            isDrawing = false;
            lastLine = null;
        });

        // Обработчик отмены действия
        document.getElementById('undo-btn')?.addEventListener('click', () => {
            commandHistory.undo();
        });

        // Обработчик повторения действия
        document.getElementById('redo-btn')?.addEventListener('click', () => {
            commandHistory.redo();
        });
    }
}