"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ChartService = void 0;
var ChartService = /** @class */ (function () {
    function ChartService() {
    }
    ChartService.prototype.calculateChartData = function (eth, wvs) {
        return {
            eth: this.calculateEth(eth),
            wvs: this.calculateWvs(wvs)
        };
    };
    ChartService.prototype.getPercent = function (n, of) {
        return (n / of) * 100;
    };
    ChartService.prototype.calculateEth = function (eth) {
        var all = eth.total - eth.excluded;
        return {
            burned: {
                value: eth.burned,
                percent: this.getPercent(eth.burned, all)
            },
            circulating: {
                value: eth.circulating,
                percent: this.getPercent(eth.circulating, all)
            },
            all: {
                value: all,
                percent: 100
            }
        };
    };
    ChartService.prototype.calculateWvs = function (wvs) {
        var all = wvs.genesis - wvs.feeSpent;
        return {
            burned: {
                value: wvs.spent,
                percent: this.getPercent(wvs.spent, all)
            },
            circulating: {
                value: all - wvs.spent,
                percent: this.getPercent(all - wvs.spent, all)
            },
            all: {
                value: all,
                percent: 100
            }
        };
    };
    return ChartService;
}());
exports.ChartService = ChartService;
