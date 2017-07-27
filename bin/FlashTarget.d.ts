import { CortexM } from "dapjs";
export declare abstract class FlashTarget extends CortexM {
    abstract flashInit(): Promise<number>;
    abstract eraseChip(): Promise<number>;
    abstract flash(data: Uint32Array): Promise<void>;
}
