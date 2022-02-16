import { EthOptions, EthOutput } from './EthService';
import { WvsOptions, WvsOutput } from './WvsService';
export interface AppOptions {
    eth: EthOptions;
    wvs: WvsOptions;
}
export interface Output {
    eth: EthOutput;
    wvs: WvsOutput;
}
export declare class App {
    private eth;
    private wvs;
    constructor(options: AppOptions);
    calculate(): Promise<Output>;
    stringify(obj: Output, pretty: boolean): string;
    private getReplacer;
}
