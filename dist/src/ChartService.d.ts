import { EthOutput } from './EthService';
import { WvsOutput } from './WvsService';
export interface ChartValue {
    value: number;
    percent: number;
}
export interface ChartChainData {
    burned: ChartValue;
    circulating: ChartValue;
    all: ChartValue;
}
export interface ChartOutput {
    eth: ChartChainData;
    wvs: ChartChainData;
}
export declare class ChartService {
    calculateChartData(eth: EthOutput, wvs: WvsOutput): {
        eth: ChartChainData;
        wvs: ChartChainData;
    };
    private getPercent;
    private calculateEth;
    private calculateWvs;
}
