export interface EthOptions {
    rpcUrl: string;
    tokenAddress: string;
}
export interface EthOutput {
    total: number;
    burned: number;
    circulating: number;
}
export declare class EthService {
    private token;
    private provider;
    constructor(options: EthOptions);
    getBurnRatio(): Promise<EthOutput>;
}
