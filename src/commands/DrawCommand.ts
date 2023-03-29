import { Command } from "@/abstracts/Command";
import Konva from "konva";

export class DrawCommand extends Command {
    private readonly layer: Konva.Layer;
    private readonly shape: Konva.Shape;

    constructor(layer: Konva.Layer, shape: Konva.Shape) {
        super();
        this.layer = layer;
        this.shape = shape;
    }

    execute(): void {
        this.layer.add(this.shape);
        this.layer.draw();
    }

    undo(): void {
        this.shape.remove();
        this.layer.draw();
    }
}