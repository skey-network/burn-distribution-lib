"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.App = void 0;
const EthService_1 = require("./EthService");
const WvsService_1 = require("./WvsService");
class App {
    constructor(options) {
        this.eth = new EthService_1.EthService(options.eth);
        this.wvs = new WvsService_1.WvsService(options.wvs);
    }
    async calculate() {
        return {
            eth: await this.eth.getBurnRatio(),
            wvs: await this.wvs.getBurnRatio()
        };
    }
    stringify(obj, pretty) {
        return JSON.stringify(obj, this.getReplacer(pretty), 2);
    }
    getReplacer(pretty) {
        if (!pretty)
            return null;
        return (_, value) => {
            if (typeof value === 'number') {
                return (value / 10 ** 8).toFixed(2);
            }
            return value;
        };
    }
}
exports.App = App;
