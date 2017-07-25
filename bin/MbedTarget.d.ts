import { Device } from "dapjs";
import { FlashTarget } from "./FlashTarget";
/**
 * Specifies all of the parameters associated with a flashing algorithm for a particular device. These
 * can be found in the pyOCD or DAPLink sources, or compiled from the source that can be found here:
 * https://github.com/mbedmicro/FlashAlgo.
 */
export interface IFlashAlgo {
    loadAddress: number;
    pcInit: number;
    pcEraseAll: number;
    pcEraseSector: number;
    pcProgramPage: number;
    stackPointer: number;
    staticBase: number;
    instructions: number[];
    breakpointLocation: number;
    pageSize: number;
    flashStart: number;
}
export declare class MbedTarget extends FlashTarget {
    private flashAlgo;
    constructor(device: Device, flashAlgo: IFlashAlgo);
    /**
     * Initialise the flash driver on the chip. Must be called before any of the other
     * flash-related methods.
     *
     * **TODO**: check that this has been called before calling other flash methods.
     */
    flashInit(): Promise<number>;
    /**
     * Erase _all_ data stored in flash on the chip.
     */
    eraseChip(): Promise<number>;
    /**
     * Upload a program to flash memory on the chip.
     *
     * @param data Array of 32-bit integers to write to flash.
     */
    flash(data: number[]): Promise<void>;
    private resetStopOnReset();
}
export declare let FlashAlgos: Map<string, IFlashAlgo>;
