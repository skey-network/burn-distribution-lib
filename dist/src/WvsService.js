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
exports.WvsService = void 0;
var node_fetch_1 = require("node-fetch");
var WvsService = /** @class */ (function () {
    function WvsService(options) {
        this.options = options;
    }
    WvsService.prototype.getBlock = function (height) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.request("/blocks/at/".concat(height))];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    WvsService.prototype.getGenesisTxes = function () {
        return __awaiter(this, void 0, void 0, function () {
            var block, txes;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.getBlock(1)];
                    case 1:
                        block = _a.sent();
                        txes = block.transactions.filter(function (tx) { return tx.type === 1; });
                        return [2 /*return*/, txes];
                }
            });
        });
    };
    WvsService.prototype.getBalance = function (address) {
        return __awaiter(this, void 0, void 0, function () {
            var data;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.request("/addresses/balance/details/".concat(address))];
                    case 1:
                        data = _a.sent();
                        return [2 /*return*/, data.available];
                }
            });
        });
    };
    WvsService.prototype.sumValues = function (accounts, key) {
        return accounts.reduce(function (acc, curr) { return acc + curr[key]; }, 0);
    };
    WvsService.prototype.getAccounts = function () {
        var _a;
        return __awaiter(this, void 0, void 0, function () {
            var blacklist, txes;
            var _this = this;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        blacklist = (_a = this.options.blacklist) !== null && _a !== void 0 ? _a : [];
                        return [4 /*yield*/, this.getGenesisTxes()];
                    case 1:
                        txes = _b.sent();
                        return [4 /*yield*/, Promise.all(txes.map(function (tx) { return __awaiter(_this, void 0, void 0, function () {
                                var current;
                                return __generator(this, function (_a) {
                                    switch (_a.label) {
                                        case 0: return [4 /*yield*/, this.getBalance(tx.recipient)];
                                        case 1:
                                            current = _a.sent();
                                            return [2 /*return*/, {
                                                    address: tx.recipient,
                                                    name: this.getLabel(tx.recipient),
                                                    genesis: tx.amount,
                                                    current: current,
                                                    blacklisted: blacklist.includes(tx.recipient),
                                                    spent: tx.amount - current
                                                }];
                                    }
                                });
                            }); }))];
                    case 2: return [2 /*return*/, _b.sent()];
                }
            });
        });
    };
    WvsService.prototype.getBurnRatio = function () {
        return __awaiter(this, void 0, void 0, function () {
            var accounts, whitelisted, genesis, current, spent;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.getAccounts()];
                    case 1:
                        accounts = _a.sent();
                        whitelisted = accounts.filter(function (acc) { return !acc.blacklisted; });
                        genesis = this.sumValues(accounts, 'genesis');
                        current = this.sumValues(accounts, 'current');
                        spent = this.sumValues(whitelisted, 'spent');
                        return [2 /*return*/, { genesis: genesis, current: current, spent: spent, accounts: accounts }];
                }
            });
        });
    };
    WvsService.prototype.getLabel = function (address) {
        var _a, _b, _c;
        var labels = (_a = this.options.labels) !== null && _a !== void 0 ? _a : [];
        return (_c = (_b = labels.find(function (label) { return label.address === address; })) === null || _b === void 0 ? void 0 : _b.name) !== null && _c !== void 0 ? _c : 'unknown';
    };
    WvsService.prototype.request = function (path) {
        return __awaiter(this, void 0, void 0, function () {
            var res;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.fetch(this.options.nodeUrl + path)];
                    case 1:
                        res = _a.sent();
                        return [4 /*yield*/, res.json()];
                    case 2: return [2 /*return*/, (_a.sent())];
                }
            });
        });
    };
    Object.defineProperty(WvsService.prototype, "fetch", {
        get: function () {
            if (globalThis.fetch)
                return globalThis.fetch.bind(globalThis);
            return node_fetch_1.default;
        },
        enumerable: false,
        configurable: true
    });
    return WvsService;
}());
exports.WvsService = WvsService;
