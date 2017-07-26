"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = y[op[0] & 2 ? "return" : op[0] ? "throw" : "next"]) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [0, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
var FlashTarget_1 = require("./FlashTarget");
var K64F_1 = require("./K64F");
var microbit_1 = require("./microbit");
var MbedTarget = (function (_super) {
    __extends(MbedTarget, _super);
    function MbedTarget(device, flashAlgo) {
        var _this = _super.call(this, device) || this;
        _this.flashAlgo = flashAlgo;
        return _this;
    }
    /**
     * Initialise the flash driver on the chip. Must be called before any of the other
     * flash-related methods.
     *
     * **TODO**: check that this has been called before calling other flash methods.
     */
    MbedTarget.prototype.flashInit = function () {
        return __awaiter(this, void 0, void 0, function () {
            var result;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.halt()];
                    case 1:
                        _a.sent();
                        return [4 /*yield*/, this.writeCoreRegister(9 /* R9 */, this.flashAlgo.staticBase)];
                    case 2:
                        _a.sent();
                        return [4 /*yield*/, this.runCode(this.flashAlgo.instructions, this.flashAlgo.loadAddress, this.flashAlgo.pcInit + this.flashAlgo.loadAddress + 0x20, this.flashAlgo.breakpointLocation, this.flashAlgo.stackPointer, true, 0, 0, 0)];
                    case 3:
                        result = _a.sent();
                        // the board should be reset etc. afterwards
                        // we should also probably run the flash unInit routine
                        return [2 /*return*/, result];
                }
            });
        });
    };
    /**
     * Erase _all_ data stored in flash on the chip.
     */
    MbedTarget.prototype.eraseChip = function () {
        return __awaiter(this, void 0, void 0, function () {
            var result;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.halt()];
                    case 1:
                        _a.sent();
                        return [4 /*yield*/, this.writeCoreRegister(9 /* R9 */, this.flashAlgo.staticBase)];
                    case 2:
                        _a.sent();
                        return [4 /*yield*/, this.runCode(this.flashAlgo.instructions, this.flashAlgo.loadAddress, this.flashAlgo.pcEraseAll + this.flashAlgo.loadAddress + 0x20, this.flashAlgo.breakpointLocation, this.flashAlgo.stackPointer, false, 0, 0, 0)];
                    case 3:
                        result = _a.sent();
                        return [2 /*return*/, result];
                }
            });
        });
    };
    /**
     * Upload a program to flash memory on the chip.
     *
     * @param data Array of 32-bit integers to write to flash.
     */
    MbedTarget.prototype.flash = function (data) {
        return __awaiter(this, void 0, void 0, function () {
            var ptr, writeLength, startAddress, bufferAddress, result;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.halt()];
                    case 1:
                        _a.sent();
                        return [4 /*yield*/, this.writeCoreRegister(9 /* R9 */, this.flashAlgo.staticBase)];
                    case 2:
                        _a.sent();
                        ptr = 0;
                        _a.label = 3;
                    case 3:
                        if (!(ptr < data.length)) return [3 /*break*/, 7];
                        writeLength = Math.min(data.length - ptr, this.flashAlgo.pageSize);
                        startAddress = this.flashAlgo.flashStart + ptr;
                        bufferAddress = this.flashAlgo.staticBase;
                        console.log("Writing program to memory: " + bufferAddress + " " + data.length);
                        return [4 /*yield*/, this.memory.writeBlock(bufferAddress, data.slice(ptr, ptr + this.flashAlgo.pageSize))];
                    case 4:
                        _a.sent();
                        console.log("Running flashing algorithm");
                        return [4 /*yield*/, this.runCode(this.flashAlgo.instructions, this.flashAlgo.loadAddress, this.flashAlgo.pcProgramPage + this.flashAlgo.loadAddress + 0x20, // pc
                            this.flashAlgo.breakpointLocation, // lr
                            this.flashAlgo.stackPointer, // sp
                            /* upload? */
                            ptr === 0, 
                            /* args */
                            startAddress, writeLength, bufferAddress)];
                    case 5:
                        result = _a.sent();
                        console.log("Flashed first block.");
                        _a.label = 6;
                    case 6:
                        ptr += this.flashAlgo.pageSize;
                        return [3 /*break*/, 3];
                    case 7: return [2 /*return*/];
                }
            });
        });
    };
    MbedTarget.prototype.resetStopOnReset = function () {
        return __awaiter(this, void 0, void 0, function () {
            var demcr;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        console.log("reset stop on Reset");
                        return [4 /*yield*/, this.halt()];
                    case 1:
                        _a.sent();
                        return [4 /*yield*/, this.memory.read32(3758157308 /* DEMCR */)];
                    case 2:
                        demcr = _a.sent();
                        return [4 /*yield*/, this.memory.write32(3758157308 /* DEMCR */, demcr | 1 /* DEMCR_VC_CORERESET */)];
                    case 3:
                        _a.sent();
                        return [4 /*yield*/, this.reset()];
                    case 4:
                        _a.sent();
                        return [4 /*yield*/, this.waitForHalt()];
                    case 5:
                        _a.sent();
                        return [4 /*yield*/, this.memory.write32(3758157308 /* DEMCR */, demcr)];
                    case 6:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    return MbedTarget;
}(FlashTarget_1.FlashTarget));
exports.MbedTarget = MbedTarget;
exports.FlashAlgos = new Map();
exports.FlashAlgos.set('0240', K64F_1.K64F_FLASH_ALGO);
exports.FlashAlgos.set('9900', microbit_1.MICROBIT_FLASH_ALGO);
//# sourceMappingURL=MbedTarget.js.map