"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
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
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
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
exports.EthService = void 0;
var ethers_1 = require("ethers");
var Token__factory_1 = require("../typechain/factories/Token__factory");
var EthService = /** @class */ (function () {
    function EthService(options) {
        this.options = options;
        this.provider = new ethers_1.ethers.providers.JsonRpcProvider(options.rpcUrl);
        this.token = Token__factory_1.Token__factory.connect(options.tokenAddress, this.provider);
    }
    EthService.prototype.getBurnRatio = function () {
        return __awaiter(this, void 0, void 0, function () {
            var total, burned, excluded, circulating;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.token.totalSupply()];
                    case 1:
                        total = _a.sent();
                        return [4 /*yield*/, this.token.balanceOf(ethers_1.ethers.constants.AddressZero)];
                    case 2:
                        burned = _a.sent();
                        return [4 /*yield*/, this.excludedBalance()];
                    case 3:
                        excluded = _a.sent();
                        circulating = total.sub(burned).sub(excluded);
                        return [2 /*return*/, {
                                total: Number(total.toString()),
                                burned: Number(burned.toString()),
                                excluded: Number(excluded.toString()),
                                circulating: Number(circulating.toString())
                            }];
                }
            });
        });
    };
    EthService.prototype.excludedBalance = function () {
        var _a;
        return __awaiter(this, void 0, void 0, function () {
            var excluded, balances;
            var _this = this;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        excluded = (_a = this.options.excluded) !== null && _a !== void 0 ? _a : [];
                        console.log(1, excluded);
                        return [4 /*yield*/, Promise.all(excluded.map(function (address) { return _this.token.balanceOf(address); }))];
                    case 1:
                        balances = _b.sent();
                        console.log(2, balances);
                        return [2 /*return*/, balances.reduce(function (acc, curr) { return acc.add(curr); }, ethers_1.BigNumber.from(0))];
                }
            });
        });
    };
    return EthService;
}());
exports.EthService = EthService;
