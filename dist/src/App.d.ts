import { ChartOutput } from './ChartService';
import { EthOptions, EthOutput } from './EthService';
import { WvsOptions, WvsOutput } from './WvsService';
export interface AppOptions {
    eth: EthOptions;
    wvs: WvsOptions;
}
export interface Output {
    eth: EthOutput;
    wvs: WvsOutput;
    chart: ChartOutput;
}
export declare class App {
    private eth;
    private wvs;
    private chart;
    constructor(options: AppOptions);
    calculate(): Promise<Output>;
    stringify(obj: Output, pretty: boolean): string;
    private getReplacer;
}
