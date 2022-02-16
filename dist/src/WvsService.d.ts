import { IBlock } from '@waves/node-api-js/cjs/api-node/blocks';
import { GenesisTransaction } from '@waves/ts-types';
export interface Label {
    name: string;
    address: string;
}
export interface Account {
    address: string;
    name: string;
    genesis: number;
    current: number;
    blacklisted: boolean;
    spent: number;
}
export interface WvsOptions {
    nodeUrl: string;
    labels?: Label[];
    blacklist?: string[];
}
export interface WvsOutput {
    genesis: number;
    current: number;
    spent: number;
    feeSpent: number;
    accounts: Account[];
}
export declare class WvsService {
    private options;
    constructor(options: WvsOptions);
    getBlock(height: number): Promise<IBlock>;
    getGenesisTxes(): Promise<GenesisTransaction<number>[]>;
    getBalance(address: string): Promise<number>;
    private sumValues;
    getAccounts(): Promise<Account[]>;
    getBurnRatio(): Promise<WvsOutput>;
    private getLabel;
    private request;
    private get fetch();
}
