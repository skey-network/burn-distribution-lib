"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.EthService = void 0;
const ethers_1 = require("ethers");
const Token__factory_1 = require("../typechain/factories/Token__factory");
class EthService {
    constructor(options) {
        this.provider = new ethers_1.ethers.providers.JsonRpcProvider(options.rpcUrl);
        this.token = Token__factory_1.Token__factory.connect(options.tokenAddress, this.provider);
    }
    async getBurnRatio() {
        const total = await this.token.totalSupply();
        const burned = await this.token.balanceOf(ethers_1.ethers.constants.AddressZero);
        const circulating = total.sub(burned);
        return {
            total: Number(total.toString()),
            burned: Number(burned.toString()),
            circulating: Number(circulating.toString())
        };
    }
}
exports.EthService = EthService;
