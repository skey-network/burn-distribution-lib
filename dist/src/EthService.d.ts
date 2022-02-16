export interface EthOptions {
    rpcUrl: string;
    tokenAddress: string;
    excluded?: string[];
}
export interface EthOutput {
    total: number;
    burned: number;
    excluded: number;
    circulating: number;
}
export declare class EthService {
    private options;
    private token;
    private provider;
    constructor(options: EthOptions);
    getBurnRatio(): Promise<EthOutput>;
    private excludedBalance;
}
