"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.WvsService = void 0;
const node_fetch_1 = require("node-fetch");
class WvsService {
    constructor(options) {
        this.options = options;
    }
    async getBlock(height) {
        return await this.request(`/blocks/at/${height}`);
    }
    async getGenesisTxes() {
        const block = await this.getBlock(1);
        const txes = block.transactions.filter((tx) => tx.type === 1);
        return txes;
    }
    async getBalance(address) {
        const data = await this.request(`/addresses/balance/details/${address}`);
        return data.available;
    }
    sumValues(accounts, key) {
        return accounts.reduce((acc, curr) => acc + curr[key], 0);
    }
    async getAccounts() {
        const blacklist = this.options.blacklist ?? [];
        const txes = await this.getGenesisTxes();
        return await Promise.all(txes.map(async (tx) => {
            const current = await this.getBalance(tx.recipient);
            return {
                address: tx.recipient,
                name: this.getLabel(tx.recipient),
                genesis: tx.amount,
                current,
                blacklisted: blacklist.includes(tx.recipient),
                spent: tx.amount - current
            };
        }));
    }
    async getBurnRatio() {
        const accounts = await this.getAccounts();
        const whitelisted = accounts.filter((acc) => !acc.blacklisted);
        const genesis = this.sumValues(accounts, 'genesis');
        const current = this.sumValues(accounts, 'current');
        const spent = this.sumValues(whitelisted, 'spent');
        return { genesis, current, spent, accounts };
    }
    getLabel(address) {
        const labels = this.options.labels ?? [];
        return labels.find((label) => label.address === address)?.name ?? 'unknown';
    }
    async request(path) {
        const res = await (0, node_fetch_1.default)(this.options.nodeUrl + path);
        return (await res.json());
    }
}
exports.WvsService = WvsService;
